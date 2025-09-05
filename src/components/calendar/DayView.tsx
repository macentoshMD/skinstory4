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

export const DayView: React.FC<DayViewProps> = ({ date, onNewBooking }) => {
  // Arbetstider 9-19 (10 timmar)
  const hours = Array.from({ length: 10 }, (_, i) => i + 9);
  
  // Skapa 10-minuters slots för varje timme (6 per timme)
  const timeSlots = hours.flatMap(hour => 
    Array.from({ length: 6 }, (_, i) => {
      const minute = i * 10;
      const isHourStart = minute === 0;
      return {
        hour,
        minute,
        time: isHourStart 
          ? `${hour.toString().padStart(2, '0')}:00`
          : minute.toString().padStart(2, '0'),
        isHourStart,
        fullTime: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      };
    })
  );

  const handleSlotClick = (slot: typeof timeSlots[0]) => {
    const slotDateTime = new Date(date);
    slotDateTime.setHours(slot.hour, slot.minute, 0, 0);
    onNewBooking?.(slotDateTime);
  };

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
                className="border-b border-muted hover:bg-muted/30 cursor-pointer"
                onClick={() => handleSlotClick(slot)}
              >
                {/* Tid kolumn */}
                <td className="w-20 p-2 text-sm text-muted-foreground border-r border-border align-top">
                  <span className={`font-medium ${slot.isHourStart ? 'text-foreground' : ''}`}>
                    {slot.time}
                  </span>
                </td>
                
                {/* Boknings område */}
                <td className="h-12 p-1 relative">
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