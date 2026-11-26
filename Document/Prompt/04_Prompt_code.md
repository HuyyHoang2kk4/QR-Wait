# PROMPT 04 — XÂY DỰNG DETAILED DESIGN & KHUNG MÃ NGUỒN (SKELETON PROJECT) CHO QR WAIT

Hiện tại chúng ta đã có đầy đủ bộ tài liệu đặc tả đã phê duyệt gồm:
- `Document/BRD/BRD_QR_Wait.md` (v1.3)
- `Document/SRS/SRS_QR_Wait.md` (v1.2)
- Bộ giao diện thiết kế (Prototype & mã HTML/PNG) từ Stitch (`Design/Stitch/` hoặc project `QR-Wait` trên Stitch).

Bước tiếp theo, tôi muốn bạn đóng vai **Solution Architect kiêm Tech Lead** cùng tôi xây dựng **Tài liệu Thiết kế Chi tiết (`Document/DetailedDesign/Detailed_Design_QR_Wait.md`)** phục vụ trực tiếp cho việc lập trình và deploy hoàn chỉnh hệ thống **QR Wait**.

> **Lưu ý phạm vi bắt buộc:** Bám sát 100% phạm vi mới nhất trong BRD v1.3 & SRS v1.2 (Không Billing/Gói cước; Tạm dừng Open API & Webhooks `M11`; Hỗ trợ QR cố định + Đổi QR theo Ca/nút bấm + GPS Radius; Đồng hồ 2 phút không khóa thao tác lúc gọi số + Đồng bộ 2 chiều; Tự hủy No-Show sau 15 phút; TV Display có chuông Ding Dong + TTS Bật/Tắt qua Audio Queue).

---

## PHẦN 1: YÊU CẦU ĐỐI VỚI TÀI LIỆU DETAILED DESIGN

Tài liệu thiết kế chi tiết cần bao gồm đầy đủ 6 nội dung chính sau:

### 1. Kiến trúc Tổng thể Hệ thống (Modular Monolith)
- Lựa chọn kiến trúc **Modular Monolith** (Monolith phân tách module rõ ràng theo nghiệp vụ `M1`–`M10`) thay vì Microservice để tối ưu tốc độ phát triển trong 10 ngày, đảm bảo WebSocket realtime mượt mà trong cùng một tiến trình và chạy ổn định trên hạ tầng tiết kiệm chi phí (RAM 512MB, chi phí 0đ – < 100k/tháng).
- Sơ đồ kiến trúc tổng quan kết nối giữa: Frontend React (Vercel/Cloudflare Pages) $\leftrightarrow$ Backend Spring Boot + WebSocket (Koyeb/Render/Railway) $\leftrightarrow$ PostgreSQL (Local pgAdmin 4 / Supabase Cloud) & Cloud Object Storage (Supabase Storage / Cloudinary cho Logo).

### 2. Tech Stack Chuẩn hóa của Dự án
- **Backend:** Java 17 LTS, Spring Boot 3.x (Spring Web, Spring Security JWT + Google OAuth2 SSO, Spring Data JPA, Spring WebSocket STOMP/SockJS, Flyway SQL Migration, **Caffeine In-Memory Cache** thay cho Redis riêng, Spring `@Scheduled`, thư viện tạo PDF/QR như ZXing + OpenPDF/iText). Tối ưu JVM memory (`-Xmx350m -Xms256m`).
- **Frontend:** React (TypeScript, Vite, TailwindCSS), PWA Responsive cho Mobile/Tablet/Desktop, `@stomp/stompjs` + `sockjs-client`, HTML5 Geolocation API, HTML5 Web Audio API + Web Speech API (`vi-VN`) / Audio Queue.
- **Database & Storage:** PostgreSQL 15+ (quản trị trực quan bằng **pgAdmin 4**, migration tự động bằng **Flyway** `V1__init.sql`), Cloud Object Storage (Supabase Storage / Cloudinary) cho lưu ảnh Logo.

### 3. Tiêu chuẩn Viết mã (Coding Convention) & Bảo mật (Security)
- Chuẩn cấu trúc Backend Spring Boot theo phân tầng: `Controller` $\rightarrow$ `Service` $\rightarrow$ `Repository` $\rightarrow$ `Entity` / `DTO` (MapStruct hoặc mapper rõ ràng), `GlobalExceptionHandler` chuẩn hóa toàn bộ mã lỗi `ERR_*` theo Mục 13.2 của SRS.
- Chuẩn cấu trúc Frontend React (Hooks, Feature-based components, Axios interceptor tự refresh JWT, bảo vệ route theo vai trò `OWNER`/`MANAGER`/`STAFF`).
- **Bảo mật & Chống xung đột bắt buộc:**
  - Zero-PII cho khách hàng (chỉ lưu `display_name` & `device_token` UUID).
  - Khóa đa tầng chống xung đột: `SELECT ... FOR UPDATE SKIP LOCKED` (đa quầy gọi đồng thời) + `@Version` Optimistic Locking (chống double-click và xung đột Khách hủy vs Nhân viên gọi).
  - Kiểm tra `ScreenToken` cho TV Display (Read-only) và `qr_token` khi quét QR.

### 4. Thiết kế Cơ sở Dữ liệu (Flyway DDL) & Đặc tả API (OpenAPI 3 + WebSocket STOMP)
- Viết hoàn chỉnh script SQL DDL PostgreSQL cho Flyway (`V1__init.sql`) gồm 9 bảng theo đúng ERD Mục 9 SRS: `organizations`, `branches`, `queues`, `queue_sessions`, `counters`, `users`, `tickets`, `ticket_audit_logs`, `screen_tokens` (kèm các Index tối ưu hiệu năng truy vấn hàng chờ FIFO và job No-Show).
- Đặc tả toàn bộ **REST API nội bộ** (phục vụ Frontend React, **không** viết Public Open API/Webhooks `M11`) theo chuẩn OpenAPI 3 (Endpoint, Method, Request/Response DTO, HTTP Status Codes).
- Đặc tả đầy đủ các **WebSocket STOMP Channels & Payloads** (`/topic/ticket/{ticketId}`, `/topic/queue/{queueId}`, `/topic/branch/{branchId}/tv`, `/topic/staff/{branchId}`).

### 5. Thiết kế Chi tiết các API & Thuật toán Xử lý Cốt lõi
Mô tả chi tiết bằng **Sequence Diagram (Mermaid)**, **Method Signature**, và **thuật toán xử lý** cho các luồng trọng tâm:
1. Check-in lấy số FIFO (`validate qr_token`, `Haversine GPS check`, `device_token anti-spam redirect`, `Party Size check`).
2. Nhân viên Gọi tiếp theo (`SKIP LOCKED` + `@Version`, kích hoạt đồng hồ 2 phút, bắn WebSocket tới Khách & TV).
3. Đồng bộ 2 chiều xác nhận đến nơi (`ACK_ARRIVAL` vs `Start Serving`).
4. Xử lý No-Show 15 phút (`@Scheduled` cron quét tự động hủy & giải phóng `device_token`, API Restore trong 15p).
5. Mở phiên hàng chờ mới (`QueueSession` reset sequence về `001`) & Đổi mã QR mới (`rotateQrToken`).
6. TV Display Audio Queue (phát tuần tự chuông Ding Dong $\rightarrow$ đọc TTS Tiếng Việt, công tắc Bật/Tắt TTS).
7. Thống kê Analytics & Xuất CSV streaming chuẩn UTF-8 BOM.

### 6. Cấu trúc Thư mục Monorepo Repository
Thiết kế cây thư mục Monorepo sạch sẽ cho toàn dự án `QR-Wait`:
```text
QR-Wait/
├── backend/              # Java 17 + Spring Boot 3 + Flyway + Dockerfile
├── frontend/             # React (Vite + TypeScript + TailwindCSS) PWA
├── Document/             # BRD, SRS, Prompt, DetailedDesign
├── Design/               # Mã HTML & PNG export từ Stitch
└── docker-compose.yml    # Chạy local full-stack hoặc deploy VPS
```

---

## PHẦN 2: YÊU CẦU TẠO SKELETON PROJECT (SAU KHI DUYỆT DETAILED DESIGN)

Sau khi tài liệu `Document/DetailedDesign/Detailed_Design_QR_Wait.md` được tôi phê duyệt, hãy thực hiện bước tiếp theo:
- Dựa trực tiếp vào `Document/DetailedDesign/Detailed_Design_QR_Wait.md` để tạo **Skeleton Project** đúng chuẩn cấu trúc Monorepo (`backend/` và `frontend/`).
- Khởi tạo đầy đủ cấu trúc package, class, interface, DTO, Entity, Repository, Service, Controller, Migration SQL (`V1__init.sql`), React routes/pages/services/hooks và các file cấu hình (`pom.xml`, `application.yml`, `Dockerfile`, `package.json`, `vite.config.ts`).
- **Quy tắc cho Skeleton:** Các method nghiệp vụ được tạo ra với **đầy đủ signature, kiểu tham số, kiểu trả về và annotation chuẩn**, bên trong chưa cần cài đặt code logic chi tiết mà chứa **comment / Javadoc mô tả chi tiết từng bước thuật toán, điều kiện kiểm tra và quy tắc khóa DB (`BRL-001` đến `BRL-011`)** để lập trình viên (hoặc các bước code tiếp theo) dựa vào đó triển khai hoàn chỉnh 100% không sai lệch.

> **Quy trình thực hiện:** Chưa viết code hay tạo file skeleton ngay. Hãy viết tài liệu **`Document/DetailedDesign/Detailed_Design_QR_Wait.md`** trước để tôi review và phê duyệt, sau đó mới tạo Skeleton Project.
