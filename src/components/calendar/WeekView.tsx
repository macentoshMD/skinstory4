import React from 'react';
import { Booking } from '@/types/booking';
import { AppointmentCard } from './AppointmentCard';
import { getBookingsForWeek, getBookingsForDate } from '@/utils/calendar';
import { format, addDays, startOfWeek, isSameDay, isToday } from 'date-fns';
import { sv } from 'date-fns/locale';

interface WeekViewProps {
  date: Date;
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  date,
  bookings,
  onBookingClick
}) => {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // Monday start
  const weekBookings = getBookingsForWeek(bookings, weekStart);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  return (
    <div className="bg-background border rounded-lg overflow-hidden">
      <div className="p-4 bg-muted/50 border-b">
        <h2 className="font-semibold text-lg">
          Veckovy
        </h2>
        <p className="text-sm text-muted-foreground">
          {weekBookings.length} bokningar denna vecka
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header with days */}
          <div className="flex border-b bg-muted/20">
            <div className="w-20 border-r"></div>
            {weekDays.map((day) => (
              <div key={day.toISOString()} className="flex-1 min-w-32 border-r border-border/50">
                <div className={`p-3 text-center ${isToday(day) ? 'bg-primary/10' : ''}`}>
                  <div className="font-medium text-sm">
                    {format(day, 'EEE', { locale: sv })}
                  </div>
                  <div className={`text-lg ${isToday(day) ? 'text-primary font-semibold' : ''}`}>
                    {format(day, 'd')}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {getBookingsForDate(bookings, day).length} bokningar
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Time grid */}
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

            {/* Days columns */}
            {weekDays.map((day) => (
              <div key={day.toISOString()} className="flex-1 min-w-32 border-r border-border/50 relative">
                {/* Hour grid */}
                {hours.map((hour) => (
                  <div key={hour} className="h-16 border-b border-border/50" />
                ))}
                
                {/* Appointments for this day */}
                <div className="absolute inset-0 p-1 overflow-hidden">
                  <div className="space-y-1">
                    {getBookingsForDate(bookings, day).map((booking) => (
                      <AppointmentCard
                        key={booking.id}
                        booking={booking}
                        onClick={() => onBookingClick(booking)}
                        className="text-xs"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};