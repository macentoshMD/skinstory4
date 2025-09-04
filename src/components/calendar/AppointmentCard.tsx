import React from 'react';
import { Booking } from '@/types/booking';
import { getTreatmentColor, formatTimeRange, getStatusText } from '@/utils/calendar';
import { Badge } from '@/components/ui/badge';
import { Clock, User, MapPin, Phone } from 'lucide-react';

interface AppointmentCardProps {
  booking: Booking;
  onClick: () => void;
  className?: string;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  booking,
  onClick,
  className = ''
}) => {
  const colorClass = getTreatmentColor(booking.treatmentCategory);

  return (
    <div
      className={`
        border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md
        ${colorClass} ${className}
      `}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate">
            {booking.treatmentType}
          </h3>
          <div className="flex items-center gap-1 text-xs mt-1">
            <Clock className="h-3 w-3" />
            <span>{formatTimeRange(booking.startTime, booking.endTime)}</span>
            <span className="text-muted-foreground">({booking.duration} min)</span>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">
          {getStatusText(booking.status)}
        </Badge>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-1 text-xs">
          <User className="h-3 w-3" />
          <span className="font-medium">{booking.customerName}</span>
          {booking.isFirstVisit && (
            <Badge variant="outline" className="text-xs ml-1">Ny</Badge>
          )}
        </div>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <User className="h-3 w-3" />
          <span>{booking.staffName}</span>
        </div>
        
        {booking.room && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{booking.room}</span>
          </div>
        )}

        {booking.customerPhone && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Phone className="h-3 w-3" />
            <span>{booking.customerPhone}</span>
          </div>
        )}
      </div>

      {booking.price && (
        <div className="mt-2 pt-2 border-t border-current/20">
          <span className="text-xs font-medium">{booking.price} kr</span>
        </div>
      )}
    </div>
  );
};