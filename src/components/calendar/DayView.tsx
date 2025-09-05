import React, { useEffect, useState } from 'react';
import { Booking } from '@/types/booking';
import { AppointmentCard } from './AppointmentCard';
import { getBookingsForDate, calculateEventPosition, getCurrentTimePosition } from '@/utils/calendar';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface DayViewProps {
  date: Date;
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
}

export const DayView: React.FC<DayViewProps> = ({ date, bookings, onBookingClick }) => {
  const dayBookings = getBookingsForDate(bookings, date);
  const [currentTime, setCurrentTime] = useState(getCurrentTimePosition());
  
  const hours = Array.from({ length: 10 }, (_, i) => i + 9); // 9 AM to 6 PM
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTimePosition());
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full">
      {/* Time column */}
      <div className="w-20 border-r border-gray-200">
        <div className="h-16"></div> {/* Header space */}
        {hours.map((hour) => (
          <div key={hour} className="h-16 border-b border-gray-100 flex items-start justify-end pr-2 pt-1">
            <span className="text-sm text-gray-500">
              {format(new Date().setHours(hour, 0), 'HH:mm')}
            </span>
          </div>
        ))}
      </div>

      {/* Appointments column */}
      <div className="flex-1 relative">
        <div className="h-16 border-b border-gray-200 flex items-center px-4">
          <h3 className="font-medium">
            {format(date, 'EEEE d MMMM', { locale: sv })}
          </h3>
        </div>
        
        <div className="relative" style={{ height: '600px' }}> {/* 10 hours * 60px */}
          {/* Hour grid lines */}
          {hours.map((hour) => (
            <div
              key={hour}
              className="absolute w-full h-16 border-b border-gray-100"
              style={{ top: `${(hour - 9) * 60}px` }}
            />
          ))}
          
          {/* Current time line */}
          {currentTime.isVisible && (
            <div
              className="absolute w-full z-20 pointer-events-none"
              style={{ top: `${currentTime.top}px` }}
            >
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full -ml-1.5"></div>
                <div className="flex-1 h-0.5 bg-red-500"></div>
              </div>
            </div>
          )}
          
          {/* Appointments */}
          {dayBookings.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Inga bokningar för denna dag</p>
            </div>
          ) : (
            dayBookings.map((booking) => {
              const position = calculateEventPosition(booking, date);
              const isPast = booking.endTime < new Date();
              
              return (
                <div key={booking.id} className="absolute left-2 right-2">
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
                      className={cn("h-full", isPast && "opacity-75")}
                      isPast={isPast}
                    />
                  </div>
                  
                  {/* Buffer time */}
                  {booking.bufferTime && (
                    <div
                      className="bg-gray-100 border border-gray-200 rounded p-1 text-xs text-gray-500 flex items-center justify-center"
                      style={{
                        top: `${position.top + position.height}px`,
                        height: `${position.bufferHeight}px`
                      }}
                    >
                      Förberedelse ({booking.bufferTime}min)
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};