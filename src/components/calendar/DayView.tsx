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
  const dayBookings = bookings.filter(booking => isSameDay(booking.startTime, date));

  // Funktion för att hitta bokningar för en specifik slot
  const getBookingForSlot = (slot: typeof timeSlots[0]) => {
    return dayBookings.find(booking => {
      const bookingHour = booking.startTime.getHours();
      const bookingMinute = booking.startTime.getMinutes();
      return bookingHour === slot.hour && bookingMinute === slot.minute;
    });
  };

  // Funktion för att kontrollera om en slot är täckt av en bokning
  const isSlotCoveredByBooking = (slot: typeof timeSlots[0]) => {
    return dayBookings.some(booking => {
      const bookingStart = booking.startTime;
      const bookingEnd = booking.endTime;
      
      const slotTime = new Date(date);
      slotTime.setHours(slot.hour, slot.minute, 0, 0);
      
      return slotTime >= bookingStart && slotTime < bookingEnd;
    });
  };

  // Funktion för att beräkna hur många slots en bokning ska spanna
  const getBookingHeight = (booking: Booking) => {
    const startTime = booking.startTime;
    const endTime = booking.endTime;
    const durationInMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    return Math.ceil(durationInMinutes / 10); // Antal 10-minuters slots
  };

  const handleSlotClick = (slot: typeof timeSlots[0]) => {
    // Kontrollera om sloten redan är upptagen
    if (isSlotCoveredByBooking(slot)) return;
    
    const slotDateTime = new Date(date);
    slotDateTime.setHours(slot.hour, slot.minute, 0, 0);
    onNewBooking?.(slotDateTime);
  };

  // Beräkna nuvarande tid för att visa röd linje
  const getCurrentTimePosition = () => {
    const now = new Date();
    if (!isSameDay(now, date)) return null;
    
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Kontrollera om tiden är inom arbetstid (9-19)
    if (currentHour < 9 || currentHour >= 19) return null;
    
    // Beräkna position baserat på slots
    const totalMinutesFromStart = (currentHour - 9) * 60 + currentMinute;
    const slotIndex = Math.floor(totalMinutesFromStart / 10);
    const offsetInSlot = (totalMinutesFromStart % 10) / 10;
    
    return {
      slotIndex,
      offsetPercent: offsetInSlot * 100
    };
  };

  const currentTimePos = getCurrentTimePosition();

  return (
    <div className="h-full flex flex-col">

      {/* Kalendertabell */}
      <div className="flex-1 overflow-auto relative">
        <table className="w-full">
          <tbody>
            {timeSlots.map((slot, index) => {
              const booking = getBookingForSlot(slot);
              const isCovered = isSlotCoveredByBooking(slot);
              
              return (
                <tr 
                  key={`${slot.hour}-${slot.minute}`}
                  className={`border-b border-muted relative ${
                    isCovered ? 'cursor-default' : 'hover:bg-muted/30 cursor-pointer'
                  }`}
                  onClick={() => handleSlotClick(slot)}
                >
                  {/* Tid kolumn */}
                  <td className="w-20 p-1 text-xs text-muted-foreground border-r border-border align-top">
                    <span className={`font-medium ${slot.isHourStart ? 'text-foreground' : ''}`}>
                      {slot.time}
                    </span>
                  </td>
                  
                  {/* Boknings område */}
                  <td className="h-4 p-0 relative">
                    {/* Nuvarande tid indikator */}
                    {currentTimePos && currentTimePos.slotIndex === index && (
                      <div 
                        className="absolute left-0 right-0 h-0.5 bg-red-500 z-20"
                        style={{ 
                          top: `${currentTimePos.offsetPercent}%`,
                        }}
                      >
                        <div className="absolute -left-1 -top-1 w-2 h-2 bg-red-500 rounded-full"></div>
                      </div>
                    )}
                    
                    {/* Boknings kort - bara på första sloten */}
                    {booking && (
                      <div 
                        className="absolute inset-0 z-10 m-0.5"
                        style={{ 
                          height: `${getBookingHeight(booking) * 17 - 4}px` // 17px per slot inkl border
                        }}
                      >
                        <AppointmentCard
                          booking={booking}
                          onClick={() => onBookingClick?.(booking)}
                          className="h-full"
                        />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};