import React from 'react';
import { Booking } from '@/types/booking';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { sv } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface MonthViewProps {
  date: Date;
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
  onNewBooking: (startTime: Date) => void;
  onUpdateBooking: (bookingId: string, updates: Partial<Booking>) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({ date }) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Måndag
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekdays = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];

  // Dela upp dagarna i veckor
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-4">
        <h2 className="text-lg font-semibold">
          {format(date, 'MMMM yyyy', { locale: sv })}
        </h2>
      </div>

      {/* Kalendertabell */}
      <div className="flex-1">
        <table className="w-full h-full">
          {/* Veckodagar header */}
          <thead>
            <tr className="border-b border-border">
              {weekdays.map(day => (
                <th key={day} className="p-3 text-sm font-medium text-muted-foreground text-center">
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          {/* Veckor */}
          <tbody>
            {weeks.map((week, weekIndex) => (
              <tr key={weekIndex} className="border-b border-border">
                {week.map(day => {
                  const isCurrentMonth = isSameMonth(day, date);
                  const isDayToday = isToday(day);
                  
                  return (
                    <td 
                      key={day.toISOString()}
                      className={cn(
                        "p-2 align-top border-r border-border last:border-r-0 hover:bg-muted/30 cursor-pointer",
                        "h-24", // Fast höjd för alla celler
                        !isCurrentMonth && "bg-muted/20"
                      )}
                    >
                      {/* Datum */}
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-sm mb-1",
                        isDayToday && "bg-primary text-primary-foreground font-bold",
                        !isCurrentMonth && "text-muted-foreground"
                      )}>
                        {format(day, 'd')}
                      </div>
                      
                      {/* Bokningar kommer här senare */}
                      <div className="space-y-1">
                        {/* Tom för nu - här kommer bokningar senare */}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};