import React from 'react';
import { Booking } from '@/types/booking';
import { AppointmentCard } from './AppointmentCard';
import { getBookingsForDate } from '@/utils/calendar';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

interface DayViewProps {
  date: Date;
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
}

export const DayView: React.FC<DayViewProps> = ({
  date,
  bookings,
  onBookingClick
}) => {
  const dayBookings = getBookingsForDate(bookings, date);
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  return (
    <div className="bg-background border rounded-lg overflow-hidden">
      <div className="p-4 bg-muted/50 border-b">
        <h2 className="font-semibold text-lg">
          Schema för {format(date, 'EEEE d MMMM', { locale: sv })}
        </h2>
        <p className="text-sm text-muted-foreground">
          {dayBookings.length} bokningar
        </p>
      </div>

      <div className="flex">
        {/* Time column */}
        <div className="w-20 border-r bg-muted/20">
          {hours.map((hour) => (
            <div key={hour} className="h-16 border-b border-border/50 flex items-start justify-center pt-2">
              <span className="text-xs text-muted-foreground">
                {String(hour).padStart(2, '0')}:00
              </span>
            </div>
          ))}
        </div>

        {/* Appointments column */}
        <div className="flex-1 relative">
          {hours.map((hour) => (
            <div key={hour} className="h-16 border-b border-border/50" />
          ))}
          
          {/* Appointments positioned absolutely */}
          <div className="absolute inset-0 p-2">
            <div className="space-y-2">
              {dayBookings.map((booking) => (
                <AppointmentCard
                  key={booking.id}
                  booking={booking}
                  onClick={() => onBookingClick(booking)}
                  className="w-full"
                />
              ))}
            </div>
          </div>

          {dayBookings.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Inga bokningar idag</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Klicka på "Ny bokning" för att lägga till en
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};