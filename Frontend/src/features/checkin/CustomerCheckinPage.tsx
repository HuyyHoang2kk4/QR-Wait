import { useParams } from 'react-router-dom';
import { ThemeToggle } from '../../components/ui/ThemeToggle';

/**
 * SCR-06: Man hinh Khach hang quet QR lay so tu phuc vu
 * Tham chieu giao dien: Design/Stitch/SCR-06_Customer_Checkin.html
 */
export function CustomerCheckinPage() {
  const { qrToken } = useParams<{ qrToken: string }>();

  // TODO 1: Lay deviceToken = getOrCreateDeviceToken() va goi GET /public/checkin/{qrToken} (Header X-Device-Token)
  // TODO 2: Neu response co activeTicketId -> tu dong navigate(`/ticket/${activeTicketId}`) (FR-018, BRL-009)
  // TODO 3: Neu qrToken bi thu hoi (410 ERR_QR_CODE_REVOKED) hoac PAUSED/CLOSED (423) -> hien thong bao tuong ung
  // TODO 4: Neu isGeoEnabled == true -> goi navigator.geolocation.getCurrentPosition truoc khi POST /public/tickets

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] px-4 py-6">
      <div className="mx-auto max-w-md">
        <div className="mb-4 flex justify-end">
          <ThemeToggle />
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h1 className="text-lg font-bold">Lấy số thứ tự (SCR-06)</h1>
          <p className="mt-2 text-xs text-slate-500">QR Token: {qrToken}</p>
          <p className="mt-4 text-sm text-slate-500">
            TODO: Ghep form Ten (bat buoc), Ghi chu, chon Party Size 1..5+ & nut LAY SO NGAY tu SCR-06_Customer_Checkin.html
          </p>
        </div>
      </div>
    </div>
  );
}
