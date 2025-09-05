import React, { useEffect, useState } from 'react';
import { Booking } from '@/types/booking';
import { AppointmentCard } from './AppointmentCard';
import { 
  getBookingsForWeek, 
  buildDayLayout, 
  getCurrentTimePosition,
  BUSINESS_HOURS_START,
  BUSINESS_HOURS_END
} from '@/utils/calendarLayout';
import { format, addDays, startOfWeek } from 'date-fns';
import { sv } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface WeekViewProps {
  date: Date;
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
  onNewBooking: (startTime: Date) => void;
  onUpdateBooking: (bookingId: string, updates: Partial<Booking>) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({ 
  date, 
  bookings, 
  onBookingClick
}) => {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // Monday
  const weekBookings = getBookingsForWeek(bookings, weekStart);
  const [currentTime, setCurrentTime] = useState(getCurrentTimePosition());
  
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: BUSINESS_HOURS_END - BUSINESS_HOURS_START }, (_, i) => i + BUSINESS_HOURS_START);
  
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

      {/* Days grid */}
      <div className="flex-1 grid grid-cols-7">
        {days.map((day) => {
          const layouts = buildDayLayout(weekBookings, day);
          const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
          
          return (
            <div key={day.toISOString()} className="border-r border-border last:border-r-0 relative">
              {/* Day header */}
              <div className={cn(
                "h-16 border-b border-border flex flex-col items-center justify-center",
                isToday && "bg-primary/5"
              )}>
                <span className="text-sm font-medium text-muted-foreground">
                  {format(day, 'EEE', { locale: sv })}
                </span>
                <span className={cn(
                  "text-lg",
                  isToday ? "font-bold text-primary" : "text-foreground"
                )}>
                  {format(day, 'd')}
                </span>
              </div>
              
              {/* Day grid */}
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
                    style={{ top: `${i * 10.67}px` }}
                  />
                ))}
                
                {/* Current time indicator (only for today) */}
                {isToday && currentTime.isVisible && (
                  <div
                    className="absolute w-full z-20 pointer-events-none"
                    style={{ top: `${(currentTime.top / 600) * 640}px` }}
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full -ml-1"></div>
                      <div className="flex-1 h-0.5 bg-red-500"></div>
                    </div>
                  </div>
                )}
                
                {/* Appointments */}
                {layouts.length === 0 ? (
                  <div className="flex items-center justify-center h-full p-2">
                    <p className="text-muted-foreground text-xs text-center">
                      Inga bokningar
                    </p>
                  </div>
                ) : (
                  layouts.map((layout) => {
                    const isPast = layout.booking.endTime < new Date();
                    const columnWidth = 96 / layout.columnCount; // Leave some margin
                    const leftOffset = (layout.column * columnWidth) + 2; // 2% left margin
                    
                    return (
                      <div
                        key={layout.booking.id}
                        className="absolute px-0.5"
                        style={{
                          top: `${(layout.top / 600) * 640}px`,
                          left: `${leftOffset}%`,
                          width: `${columnWidth}%`,
                          height: `${(layout.height / 600) * 640}px`,
                          minHeight: '32px',
                          zIndex: 10
                        }}
                      >
                        <AppointmentCard
                          booking={layout.booking}
                          onClick={() => onBookingClick(layout.booking)}
                          className="h-full text-xs"
                          isPast={isPast}
                        />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};