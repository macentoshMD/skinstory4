import React from 'react';
import { Booking } from '@/types/booking';
import { format, isSameDay } from 'date-fns';
import { sv } from 'date-fns/locale';
import { AppointmentCard } from './AppointmentCard';

interface DayViewProps {
  date: Date;
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
  onNewBooking: (startTime: Date) => void;
  onUpdateBooking: (bookingId: string, updates: Partial<Booking>) => void;
}

export const DayView: React.FC<DayViewProps> = ({ date, bookings, onNewBooking, onBookingClick }) => {
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

  // Filtrera bokningar för denna dag
  const dayBookings = bookings.filter(booking => {
    const match = isSameDay(booking.startTime, date);
    console.log('Debug - Booking:', booking.treatmentType, 'Date match:', match);
    return match;
  });

  console.log('Debug - Total bookings:', bookings.length, 'Day bookings:', dayBookings.length);
  console.log('Debug - Current date object:', date);
  console.log('Debug - Day bookings:', dayBookings);

  // Funktion för att hitta bokningar för en specifik slot
  const getBookingForSlot = (slot: typeof timeSlots[0]) => {
    return dayBookings.find(booking => {
      const bookingHour = booking.startTime.getHours();
      const bookingMinute = booking.startTime.getMinutes();
      return bookingHour === slot.hour && bookingMinute === slot.minute;
    });
  };

  // Funktion för att beräkna hur många slots en bokning ska spanna
  const getBookingHeight = (booking: Booking) => {
    return Math.ceil(booking.duration / 10); // Antal 10-minuters slots
  };

  const handleSlotClick = (slot: typeof timeSlots[0]) => {
    const slotDateTime = new Date(date);
    slotDateTime.setHours(slot.hour, slot.minute, 0, 0);
    onNewBooking?.(slotDateTime);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Debug information */}
      <div className="bg-yellow-100 p-2 text-xs">
        Debug: Totalt {bookings.length} bokningar, {dayBookings.length} för denna dag
      </div>
      
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
                <td className="w-20 p-1 text-xs text-muted-foreground border-r border-border align-top">
                  <span className={`font-medium ${slot.isHourStart ? 'text-foreground' : ''}`}>
                    {slot.time}
                  </span>
                </td>
                
                {/* Boknings område */}
                <td className="h-4 p-1 relative">
                  {(() => {
                    const booking = getBookingForSlot(slot);
                    if (booking) {
                      const height = getBookingHeight(booking);
                      return (
                        <div 
                          className="absolute inset-0 z-10"
                          style={{ 
                            height: `${height * 16 + (height - 1) * 1}px` // 16px höjd per slot + border
                          }}
                        >
                          <AppointmentCard
                            booking={booking}
                            onClick={() => onBookingClick?.(booking)}
                            className="h-full"
                          />
                        </div>
                      );
                    }
                    return null;
                  })()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};