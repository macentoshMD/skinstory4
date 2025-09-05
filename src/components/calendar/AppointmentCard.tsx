import React from 'react';
import { Booking } from '@/types/booking';
import { getTreatmentColor, formatTimeRange, getStatusText } from '@/utils/calendar';
import { Badge } from '@/components/ui/badge';
import { Clock, User, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppointmentCardProps {
  booking: Booking;
  onClick: () => void;
  onMouseDown?: (e: React.MouseEvent, action: 'drag' | 'resize') => void;
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
  const timeRange = formatTimeRange(booking.startTime, booking.endTime);
  const statusText = getStatusText(booking.status);

  return (
    <div className="relative">
      <div
        className={cn(
          "p-3 rounded-lg border-l-4 cursor-pointer transition-all hover:shadow-md",
          treatmentColor,
          className
        )}
        onClick={onClick}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">
              {booking.treatmentType}
            </h3>
            <div className="flex items-center gap-1 text-xs mt-1">
              <Clock className="h-3 w-3" />
              <span>{timeRange}</span>
              <span className="text-muted-foreground">({booking.duration} min)</span>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {statusText}
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
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{booking.staffName}</span>
          {booking.room && (
            <span className="text-gray-500">{booking.room}</span>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm mt-1">
          {booking.customerPhone && (
            <span className="text-gray-500">{booking.customerPhone}</span>
          )}
          {booking.price && (
            <span className="font-medium">{booking.price} kr</span>
          )}
        </div>
      </div>
      
      {/* Quick status update for past bookings */}
      {isPast && booking.status !== 'completed' && booking.status !== 'no_show' && (
        <div className="absolute top-2 right-2 flex gap-1">
          <button
            className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Update booking status to completed
            }}
          >
            Betald
          </button>
          <button
            className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Update booking status to no_show
            }}
          >
            No show
          </button>
        </div>
      )}
    </div>
  );
};