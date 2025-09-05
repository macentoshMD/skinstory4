import React, { useEffect, useState } from 'react';
import { Booking } from '@/types/booking';
import { AppointmentCard } from './AppointmentCard';
import { getBookingsForWeek, getBookingsForDate, calculateEventPosition, getCurrentTimePosition } from '@/utils/calendar';
import { format, addDays, startOfWeek } from 'date-fns';
import { sv } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface WeekViewProps {
  date: Date;
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({ date, bookings, onBookingClick }) => {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // Monday
  const weekBookings = getBookingsForWeek(bookings, weekStart);
  const [currentTime, setCurrentTime] = useState(getCurrentTimePosition());
  
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 10 }, (_, i) => i + 9); // 9 AM to 6 PM
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTimePosition());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full">
      {/* Time column */}
      <div className="w-20 border-r border-gray-200">
        <div className="h-16"></div>
        {hours.map((hour) => (
          <div key={hour} className="h-16 border-b border-gray-100 flex items-start justify-end pr-2 pt-1">
            <span className="text-sm text-gray-500">
              {format(new Date().setHours(hour, 0), 'HH:mm')}
            </span>
          </div>
        ))}
      </div>

      {/* Days columns */}
      <div className="flex-1 grid grid-cols-7">
        {days.map((day) => {
          const dayBookings = getBookingsForDate(weekBookings, day);
          const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
          
          return (
            <div key={day.toISOString()} className="border-r border-gray-200 last:border-r-0 relative">
              {/* Day header */}
              <div className={cn(
                "h-16 border-b border-gray-200 flex flex-col items-center justify-center",
                isToday && "bg-blue-50"
              )}>
                <span className="text-sm font-medium">
                  {format(day, 'EEE', { locale: sv })}
                </span>
                <span className={cn(
                  "text-lg",
                  isToday ? "font-bold text-blue-600" : "text-gray-700"
                )}>
                  {format(day, 'd')}
                </span>
              </div>
              
              {/* Day appointments */}
              <div className="relative" style={{ height: '600px' }}>
                {/* Hour grid lines */}
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="absolute w-full h-16 border-b border-gray-100"
                    style={{ top: `${(hour - 9) * 60}px` }}
                  />
                ))}
                
                {/* Current time line (only for today) */}
                {isToday && currentTime.isVisible && (
                  <div
                    className="absolute w-full z-20 pointer-events-none"
                    style={{ top: `${currentTime.top}px` }}
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full -ml-1"></div>
                      <div className="flex-1 h-0.5 bg-red-500"></div>
                    </div>
                  </div>
                )}
                
                {/* Appointments */}
                {dayBookings.map((booking) => {
                  const position = calculateEventPosition(booking, day);
                  const isPast = booking.endTime < new Date();
                  
                  return (
                    <div key={booking.id} className="absolute left-1 right-1">
                      {/* Main booking */}
                      <div
                        className="relative"
                        style={{
                          top: `${position.top}px`,
                          height: `${position.height}px`
                        }}
                      >
                        <AppointmentCard
                          booking={booking}
                          onClick={() => onBookingClick(booking)}
                          className={cn("h-full text-xs", isPast && "opacity-75")}
                          isPast={isPast}
                        />
                      </div>
                      
                      {/* Buffer time */}
                      {booking.bufferTime && (
                        <div
                          className="bg-gray-100 border border-gray-200 rounded text-xs text-gray-500 flex items-center justify-center"
                          style={{
                            top: `${position.top + position.height}px`,
                            height: `${position.bufferHeight}px`
                          }}
                        >
                          {booking.bufferTime}min
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};