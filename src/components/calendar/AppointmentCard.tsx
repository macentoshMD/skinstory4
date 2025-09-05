import React from 'react';
import { Booking } from '@/types/booking';
import { getTreatmentColor, formatTimeRange, getStatusText } from '@/utils/calendar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, MapPin } from 'lucide-react';
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
  onMouseDown,
  className = "",
  isPast = false
}) => {
  const treatmentColor = getTreatmentColor(booking.treatmentCategory);
  
  // Calculate end time without buffer for display
  const displayEndTime = new Date(booking.startTime.getTime() + booking.duration * 60000);
  const timeRange = formatTimeRange(booking.startTime, displayEndTime);
  const statusText = getStatusText(booking.status);

  return (
    <div 
      className={cn(
        "relative p-2 rounded-md border cursor-pointer transition-all hover:shadow-sm bg-card text-card-foreground",
        treatmentColor,
        className
      )}
      onClick={onClick}
      onMouseDown={onMouseDown ? (e) => onMouseDown(e, 'drag') : undefined}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-1">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate leading-tight">
            {booking.treatmentType}
          </h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
            <Clock className="h-3 w-3" />
            <span>{timeRange}</span>
          </div>
        </div>
        <Badge 
          variant="secondary" 
          className="text-xs ml-1 shrink-0"
        >
          {statusText}
        </Badge>
      </div>

      {/* Customer Info */}
      <div className="space-y-0.5">
        <div className="flex items-center gap-1 text-xs">
          <User className="h-3 w-3" />
          <span className="font-medium truncate">{booking.customerName}</span>
          {booking.isFirstVisit && (
            <Badge variant="outline" className="text-xs px-1 py-0">Ny</Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{booking.staffName}</span>
          {booking.room && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{booking.room}</span>
            </div>
          )}
        </div>
        
        {booking.price && (
          <div className="text-xs font-medium text-right">
            {booking.price.toLocaleString()} kr
          </div>
        )}
      </div>
      
      {/* Quick actions for past bookings that aren't completed */}
      {isPast && booking.status === 'confirmed' && (
        <div className="flex gap-1 mt-1">
          <Button 
            size="sm" 
            variant="outline"
            className="h-5 text-xs px-2 py-0 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
            onClick={(e) => {
              e.stopPropagation();
              // Will be handled by parent
            }}
          >
            Betald
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="h-5 text-xs px-2 py-0 bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
            onClick={(e) => {
              e.stopPropagation();
              // Will be handled by parent
            }}
          >
            No show
          </Button>
        </div>
      )}
      
      {/* Resize handle */}
      {onMouseDown && !isPast && (
        <div
          className="absolute bottom-0 left-0 right-0 h-1 cursor-ns-resize opacity-0 hover:opacity-100 transition-opacity bg-primary/20"
          onMouseDown={(e) => {
            e.stopPropagation();
            onMouseDown(e, 'resize');
          }}
        />
      )}
    </div>
  );
};