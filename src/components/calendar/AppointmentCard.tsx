import React from 'react';
import { Booking } from '@/types/booking';
import { getTreatmentColor, formatTimeRange, getStatusText } from '@/utils/calendarLayout';
import { Badge } from '@/components/ui/badge';
import { Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppointmentCardProps {
  booking: Booking;
  onClick: () => void;
  className?: string;
  isPast?: boolean;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ 
  booking, 
  onClick, 
  className = "",
  isPast = false
}) => {
  const treatmentColor = getTreatmentColor(booking.treatmentCategory);
  const displayEndTime = new Date(booking.startTime.getTime() + booking.duration * 60000);
  const timeRange = formatTimeRange(booking.startTime, displayEndTime);
  const statusText = getStatusText(booking.status);

  return (
    <div 
      className={cn(
        "p-2 rounded border cursor-pointer transition-all hover:shadow-sm",
        treatmentColor,
        isPast && "opacity-70",
        className
      )}
      onClick={onClick}
    >
      {/* Treatment and time */}
      <div className="flex items-start justify-between mb-1">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-xs truncate">
            {booking.treatmentType}
          </h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{timeRange}</span>
          </div>
        </div>
        {booking.isFirstVisit && (
          <Badge variant="outline" className="text-xs ml-1 px-1 py-0">
            Ny
          </Badge>
        )}
      </div>

      {/* Customer */}
      <div className="flex items-center gap-1 text-xs mb-1">
        <User className="h-3 w-3" />
        <span className="font-medium truncate">{booking.customerName}</span>
      </div>

      {/* Staff and price */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="truncate">{booking.staffName}</span>
        {booking.price && (
          <span className="font-medium">
            {booking.price.toLocaleString()} kr
          </span>
        )}
      </div>
    </div>
  );
};