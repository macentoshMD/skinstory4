import React from 'react';
import { Booking } from '@/types/booking';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

interface DayViewProps {
  date: Date;
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
  onNewBooking: (startTime: Date) => void;
  onUpdateBooking: (bookingId: string, updates: Partial<Booking>) => void;
}

export const DayView: React.FC<DayViewProps> = ({ date }) => {
  // Arbetstider 9-19 (10 timmar)
  const hours = Array.from({ length: 10 }, (_, i) => i + 9);
  
  // Skapa 30-minuters slots för varje timme (2 per timme)
  const timeSlots = hours.flatMap(hour => 
    Array.from({ length: 2 }, (_, i) => ({
      hour,
      minute: i * 30,
      time: `${hour.toString().padStart(2, '0')}:${(i * 30).toString().padStart(2, '0')}`
    }))
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-4">
        <h2 className="text-lg font-semibold">
          {format(date, 'EEEE d MMMM yyyy', { locale: sv })}
        </h2>
      </div>

      {/* Kalendertabell */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <tbody>
            {timeSlots.map((slot, index) => (
              <tr 
                key={`${slot.hour}-${slot.minute}`}
                className="border-b border-muted hover:bg-muted/30"
              >
                {/* Tid kolumn */}
                <td className="w-20 p-3 text-sm text-muted-foreground border-r border-border align-top">
                  <span className="font-medium">{slot.time}</span>
                </td>
                
                {/* Boknings område */}
                <td className="h-16 p-1 relative">
                  {/* Tom för nu - här kommer bokningar senare */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};