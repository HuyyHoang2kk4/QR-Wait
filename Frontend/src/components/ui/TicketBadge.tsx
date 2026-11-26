interface TicketBadgeProps {
  ticketNumber: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const SIZE_CLASSES: Record<NonNullable<TicketBadgeProps['size']>, string> = {
  sm: 'text-sm font-bold',
  md: 'text-lg font-extrabold',
  lg: 'text-3xl font-black',
  xl: 'text-5xl font-black',
};

/**
 * Hien thi ma ve luon nam tren 1 dong duy nhat (whitespace-nowrap) theo SRS 7.1.
 */
export function TicketBadge({ ticketNumber, size = 'md' }: TicketBadgeProps) {
  return (
    <span className={`whitespace-nowrap tabular-nums tracking-tight ${SIZE_CLASSES[size]}`}>
      #{ticketNumber.replace(/^#/, '')}
    </span>
  );
}
