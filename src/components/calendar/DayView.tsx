import React, { useEffect, useState } from 'react';
import { Booking } from '@/types/booking';
import { AppointmentCard } from './AppointmentCard';
import { 
  buildDayLayout, 
  getCurrentTimePosition,
  BUSINESS_HOURS_START,
  BUSINESS_HOURS_END
} from '@/utils/calendarLayout';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface DayViewProps {
  date: Date;
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
  onNewBooking: (startTime: Date) => void;
  onUpdateBooking: (bookingId: string, updates: Partial<Booking>) => void;
}

export const DayView: React.FC<DayViewProps> = ({ 
  date, 
  bookings, 
  onBookingClick
}) => {
  const [currentTime, setCurrentTime] = useState(getCurrentTimePosition());
  
  const hours = Array.from({ length: BUSINESS_HOURS_END - BUSINESS_HOURS_START }, (_, i) => i + BUSINESS_HOURS_START);
  const layouts = buildDayLayout(bookings, date);
  
  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTimePosition());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full">
      {/* Time column */}
      <div className="w-20 border-r border-border shrink-0">
        {/* Header space */}
        <div className="h-16 border-b border-border"></div>
        
        {/* Time labels */}
        {hours.map((hour) => (
          <div key={hour} className="h-16 relative">
            <div className="absolute -top-2 right-2 text-sm text-muted-foreground">
              {format(new Date().setHours(hour, 0), 'HH:mm')}
            </div>
            {/* Hour line */}
            <div className="absolute top-4 w-full border-b border-border" />
            {/* 10-minute grid lines */}
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="absolute w-6 right-0 border-b border-muted/50"
                style={{ top: `${(i + 1) * 9.6}px` }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Appointments area */}
      <div className="flex-1 relative">
        {/* Header */}
        <div className="h-16 border-b border-border flex items-center px-4">
          <h3 className="font-medium">
            {format(date, 'EEEE d MMMM', { locale: sv })}
          </h3>
        </div>
        
        {/* Calendar grid */}
        <div 
          className="relative"
          style={{ height: '640px' }} // 10 hours * 64px per hour
        >
          {/* 10-minute grid lines */}
          {Array.from({ length: 60 }, (_, i) => (
            <div
              key={i}
              className={cn(
                "absolute w-full border-b",
                i % 6 === 0 ? "border-border" : "border-muted/30"
              )}
              style={{ top: `${i * 10.67}px` }} // 640px / 60 intervals
            />
          ))}
          
          {/* Current time indicator */}
          {currentTime.isVisible && format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') && (
            <div
              className="absolute w-full z-20 pointer-events-none"
              style={{ top: `${(currentTime.top / 600) * 640}px` }}
            >
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full -ml-1.5"></div>
                <div className="flex-1 h-0.5 bg-red-500"></div>
              </div>
            </div>
          )}
          
          {/* Appointments */}
          {layouts.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Inga bokningar denna dag</p>
            </div>
          ) : (
            layouts.map((layout) => {
              const isPast = layout.booking.endTime < new Date();
              const columnWidth = 96 / layout.columnCount; // Leave some margin
              const leftOffset = (layout.column * columnWidth) + 2; // 2% left margin
              
              return (
                <div
                  key={layout.booking.id}
                  className="absolute px-1"
                  style={{
                    top: `${(layout.top / 600) * 640}px`,
                    left: `${leftOffset}%`,
                    width: `${columnWidth}%`,
                    height: `${(layout.height / 600) * 640}px`,
                    minHeight: '40px',
                    zIndex: 10
                  }}
                >
                  <AppointmentCard
                    booking={layout.booking}
                    onClick={() => onBookingClick(layout.booking)}
                    className="h-full"
                    isPast={isPast}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};