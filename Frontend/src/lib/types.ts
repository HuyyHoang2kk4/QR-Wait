export type UserRole = 'SUPER_ADMIN' | 'OWNER' | 'MANAGER' | 'STAFF';

export type QueueStatus = 'OPEN' | 'PAUSED' | 'CLOSED';

export type TicketStatus =
  | 'WAITING'
  | 'CALLED'
  | 'SERVING'
  | 'COMPLETED'
  | 'NO_SHOW'
  | 'CANCELLED'
  | 'EXPIRED';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export interface ApiErrorResponse {
  success: false;
  errorCode: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

export interface UserSummary {
  id: string;
  organizationId: string | null;
  displayName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  branchIds: string[];
}
