import { useParams } from 'react-router-dom';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import { TicketBadge } from '../../components/ui/TicketBadge';

/**
 * SCR-07 (a/b/c/d): Man hinh Ve cho Truc tiep cua Khach hang
 * Tham chieu: Design/Stitch/SCR-07a_Live_Tracking_WAITING.html .. SCR-07d_Live_Tracking_CANCELLED.html
 */
export function LiveTrackingPage() {
  const { ticketId } = useParams<{ ticketId: string }>();

  // TODO 1: Goi GET /public/tickets/{ticketId} (X-Device-Token) de lay trang thai ban dau
  // TODO 2: Subscribe WS /topic/ticket/{ticketId} & /topic/queue/{queueId}
  // TODO 3: Doi giao dien theo status:
  //   - WAITING: Dem so nhom phia truoc + nut "Huy luot cho" (POST /cancel)
  //   - CALLED: Nen xanh la, rung navigator.vibrate, phat Audio Chime, nut "TOI DANG DEN" (POST /ack)
  //   - NO_SHOW: Nen cam, dem nguoc 15:00 -> 00:00 theo cancelScheduledAt - serverNow
  //   - CANCELLED / EXPIRED: Nen xam + nut quet ma lay so moi

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] px-4 py-6">
      <div className="mx-auto max-w-md">
        <div className="mb-4 flex justify-end">
          <ThemeToggle />
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center">
          <TicketBadge ticketNumber="A-024" size="xl" />
          <p className="mt-2 text-xs text-slate-500">Ticket ID: {ticketId}</p>
          <p className="mt-4 text-sm text-slate-500">
            TODO: Render 4 trang thai WAITING / CALLED / NO_SHOW / CANCELLED tu SCR-07a..d
          </p>
        </div>
      </div>
    </div>
  );
}
