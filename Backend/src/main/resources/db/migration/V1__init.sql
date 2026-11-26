-- ============================================================================
-- QR-WAIT Database Migration V1__init.sql (PostgreSQL 15+ / Flyway)
-- Tuong thich 100% voi PostgreSQL Local & Supabase Cloud (Quan tri qua pgAdmin 4)
-- ============================================================================

-- 1. Organizations (Tenant doanh nghiep)
CREATE TABLE organizations (
    id          UUID PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    logo_url    VARCHAR(500),
    timezone    VARCHAR(50)  NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',
    is_active   BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- 2. Branches (Chi nhanh vat ly & Cau hinh GPS/TTS)
CREATE TABLE branches (
    id                 UUID PRIMARY KEY,
    organization_id    UUID             NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name               VARCHAR(100)     NOT NULL,
    address            VARCHAR(255)     NOT NULL,
    latitude           DOUBLE PRECISION NOT NULL CHECK (latitude BETWEEN -90.0 AND 90.0),
    longitude          DOUBLE PRECISION NOT NULL CHECK (longitude BETWEEN -180.0 AND 180.0),
    is_geo_enabled     BOOLEAN          NOT NULL DEFAULT FALSE,
    gps_radius_meters  INTEGER          NOT NULL DEFAULT 100 CHECK (gps_radius_meters BETWEEN 30 AND 500),
    tts_enabled        BOOLEAN          NOT NULL DEFAULT TRUE,
    is_active          BOOLEAN          NOT NULL DEFAULT TRUE,
    created_at         TIMESTAMPTZ      NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_branches_org ON branches(organization_id);

-- 3. Queues (Hang cho dich vu & QR Token co dinh/doi theo ca)
CREATE TABLE queues (
    id                    UUID PRIMARY KEY,
    branch_id             UUID         NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name                  VARCHAR(100) NOT NULL,
    prefix                VARCHAR(5)   NOT NULL,
    avg_service_minutes   INTEGER      NOT NULL DEFAULT 10 CHECK (avg_service_minutes >= 1),
    min_party_size        INTEGER      NOT NULL DEFAULT 1 CHECK (min_party_size >= 1),
    max_party_size        INTEGER      NOT NULL DEFAULT 20,
    status                VARCHAR(20)  NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'PAUSED', 'CLOSED')),
    qr_token              VARCHAR(64)  NOT NULL UNIQUE,
    rotate_qr_on_session  BOOLEAN      NOT NULL DEFAULT FALSE,
    current_sequence      INTEGER      NOT NULL DEFAULT 0 CHECK (current_sequence >= 0),
    created_at            TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_party_size CHECK (max_party_size >= min_party_size),
    CONSTRAINT uq_queue_branch_prefix UNIQUE (branch_id, prefix)
);
CREATE INDEX idx_queues_branch ON queues(branch_id);

-- 4. Queue Sessions (Phien lam viec de Reset so ve 001 & luu lich su ca)
CREATE TABLE queue_sessions (
    id              UUID PRIMARY KEY,
    queue_id        UUID        NOT NULL REFERENCES queues(id) ON DELETE CASCADE,
    session_number  INTEGER     NOT NULL CHECK (session_number >= 1),
    started_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ended_at        TIMESTAMPTZ,
    status          VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'CLOSED')),
    CONSTRAINT uq_queue_session_num UNIQUE (queue_id, session_number)
);
CREATE INDEX idx_queue_sessions_active ON queue_sessions(queue_id, status);

-- 5. Counters (Quay phuc vu vat ly)
CREATE TABLE counters (
    id          UUID PRIMARY KEY,
    branch_id   UUID        NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name        VARCHAR(50) NOT NULL,
    is_active   BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_counters_branch ON counters(branch_id);

-- Bang lien ket Quay <-> Hang cho (FR-011)
CREATE TABLE counter_queues (
    counter_id  UUID NOT NULL REFERENCES counters(id) ON DELETE CASCADE,
    queue_id    UUID NOT NULL REFERENCES queues(id) ON DELETE CASCADE,
    PRIMARY KEY (counter_id, queue_id)
);

-- 6. Users (Tai khoan Owner, Manager, Staff, Super Admin)
CREATE TABLE users (
    id               UUID PRIMARY KEY,
    organization_id  UUID REFERENCES organizations(id) ON DELETE CASCADE,
    display_name     VARCHAR(100) NOT NULL,
    email            VARCHAR(100) NOT NULL UNIQUE,
    password_hash    VARCHAR(255) NOT NULL,
    role             VARCHAR(30)  NOT NULL CHECK (role IN ('SUPER_ADMIN', 'OWNER', 'MANAGER', 'STAFF')),
    is_active        BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_users_org ON users(organization_id);

-- Bang phan cong Chi nhanh cho Manager / Staff (FR-003)
CREATE TABLE user_branches (
    user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    branch_id  UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, branch_id)
);

-- Bang quan ly Refresh Token de thu hoi phien tuc thi khi khoa nhan vien (FR-004)
CREATE TABLE refresh_tokens (
    id          UUID PRIMARY KEY,
    user_id     UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash  VARCHAR(128) NOT NULL UNIQUE,
    expires_at  TIMESTAMPTZ  NOT NULL,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);

-- 7. Tickets (Ve cho luot - Zero PII)
CREATE TABLE tickets (
    id                   UUID PRIMARY KEY,
    queue_id             UUID        NOT NULL REFERENCES queues(id) ON DELETE CASCADE,
    session_id           UUID        NOT NULL REFERENCES queue_sessions(id) ON DELETE CASCADE,
    counter_id           UUID        REFERENCES counters(id) ON DELETE SET NULL,
    staff_id             UUID        REFERENCES users(id) ON DELETE SET NULL,
    ticket_number        VARCHAR(20) NOT NULL,
    sequence_number      INTEGER     NOT NULL CHECK (sequence_number >= 1),
    display_name         VARCHAR(50) NOT NULL,
    notes                VARCHAR(255),
    party_size           INTEGER     NOT NULL CHECK (party_size >= 1),
    is_walkin            BOOLEAN     NOT NULL DEFAULT FALSE,
    status               VARCHAR(20) NOT NULL DEFAULT 'WAITING'
                         CHECK (status IN ('WAITING', 'CALLED', 'SERVING', 'COMPLETED', 'NO_SHOW', 'CANCELLED', 'EXPIRED')),
    device_token         VARCHAR(64),
    recall_count         INTEGER     NOT NULL DEFAULT 0 CHECK (recall_count BETWEEN 0 AND 3),
    last_recalled_at     TIMESTAMPTZ,
    is_acknowledged      BOOLEAN     NOT NULL DEFAULT FALSE,
    is_restored          BOOLEAN     NOT NULL DEFAULT FALSE,
    version              BIGINT      NOT NULL DEFAULT 0,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    called_at            TIMESTAMPTZ,
    serving_at           TIMESTAMPTZ,
    completed_at         TIMESTAMPTZ,
    noshow_at            TIMESTAMPTZ,
    cancel_scheduled_at  TIMESTAMPTZ,
    cancelled_at         TIMESTAMPTZ,
    cancellation_reason  VARCHAR(50)
);

-- Index toi uu FIFO Call Next (uu tien ve phuc hoi is_restored DESC, sau do sequence_number ASC)
CREATE INDEX idx_tickets_fifo_waiting
    ON tickets(queue_id, session_id, is_restored DESC, sequence_number ASC, created_at ASC)
    WHERE status = 'WAITING';

-- Index Partial Unique dam bao 1 thiet bi chi co toi da 1 ve Active tren 1 hang cho (BRL-009)
CREATE UNIQUE INDEX uq_tickets_active_device_per_queue
    ON tickets(queue_id, device_token)
    WHERE device_token IS NOT NULL AND status IN ('WAITING', 'CALLED', 'SERVING', 'NO_SHOW');

-- Index toi uu Scheduled Cron quet No-Show het han 15 phut (FR-033)
CREATE INDEX idx_tickets_noshow_timeout
    ON tickets(cancel_scheduled_at)
    WHERE status = 'NO_SHOW';

-- Index toi uu Analytics & Xuat CSV theo khoang thoi gian (M10)
CREATE INDEX idx_tickets_analytics
    ON tickets(queue_id, created_at DESC, status);

-- 8. Ticket Audit Logs (Lich su chuyen trang thai phuc vu truy vet & bao cao)
CREATE TABLE ticket_audit_logs (
    id             UUID PRIMARY KEY,
    ticket_id      UUID        NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    staff_id       UUID        REFERENCES users(id) ON DELETE SET NULL,
    from_status    VARCHAR(20) NOT NULL,
    to_status      VARCHAR(20) NOT NULL,
    transition_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    note           VARCHAR(255)
);
CREATE INDEX idx_audit_logs_ticket ON ticket_audit_logs(ticket_id, transition_at DESC);

-- 9. Screen Tokens (Secret URL cho TV Display Read-only)
CREATE TABLE screen_tokens (
    id          UUID PRIMARY KEY,
    branch_id   UUID        NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    token       VARCHAR(64) NOT NULL UNIQUE,
    is_active   BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_screen_tokens_branch ON screen_tokens(branch_id, is_active);
