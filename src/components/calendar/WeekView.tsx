import React from 'react';
import { Booking } from '@/types/booking';
import { format, addDays, startOfWeek } from 'date-fns';
import { sv } from 'date-fns/locale';

interface WeekViewProps {
  date: Date;
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
  onNewBooking: (startTime: Date) => void;
  onUpdateBooking: (bookingId: string, updates: Partial<Booking>) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({ date, onNewBooking }) => {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // Måndag
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
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

  const handleSlotClick = (slot: typeof timeSlots[0], day: Date) => {
    const slotDateTime = new Date(day);
    slotDateTime.setHours(slot.hour, slot.minute, 0, 0);
    onNewBooking?.(slotDateTime);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border">
        {/* Veckotitel */}
        <div className="p-4">
          <h2 className="text-lg font-semibold">
            Vecka {format(weekStart, 'w', { locale: sv })} - {format(weekStart, 'MMMM yyyy', { locale: sv })}
          </h2>
        </div>
        
        {/* Dag headers */}
        <div className="flex">
          <div className="w-20 border-r border-border"></div> {/* Tom för tid kolumn */}
          {days.map(day => {
            const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
            return (
              <div key={day.toISOString()} className="flex-1 p-2 text-center border-r border-border last:border-r-0">
                <div className="text-sm text-muted-foreground">
                  {format(day, 'EEE', { locale: sv })}
                </div>
                <div className={`text-lg ${isToday ? 'font-bold text-primary' : ''}`}>
                  {format(day, 'd')}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Kalendertabell */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <tbody>
            {timeSlots.map((slot) => (
              <tr 
                key={`${slot.hour}-${slot.minute}`}
                className="border-b border-muted"
              >
                {/* Tid kolumn */}
                <td className="w-20 p-2 text-sm text-muted-foreground border-r border-border align-top">
                  <span className={`font-medium ${slot.isHourStart ? 'text-foreground' : ''}`}>
                    {slot.time}
                  </span>
                </td>
                
                {/* Dag kolumner */}
                {days.map(day => (
                  <td 
                    key={day.toISOString()} 
                    className="h-6 p-1 border-r border-border last:border-r-0 relative cursor-pointer hover:bg-muted/30"
                    onClick={() => handleSlotClick(slot, day)}
                  >
                    {/* Tom för nu - här kommer bokningar senare */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};