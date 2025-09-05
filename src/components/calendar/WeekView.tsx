import React, { useEffect, useState } from 'react';
import { Booking } from '@/types/booking';
import { AppointmentCard } from './AppointmentCard';
import { 
  getBookingsForWeek, 
  buildDayLayout, 
  getCurrentTimePosition,
  getTimeFromPosition,
  snapTo10Min 
} from '@/utils/calendar';
import { format, addDays, startOfWeek } from 'date-fns';
import { sv } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { 
  ContextMenu, 
  ContextMenuContent, 
  ContextMenuItem, 
  ContextMenuTrigger 
} from "@/components/ui/context-menu";
import { Plus } from "lucide-react";

interface WeekViewProps {
  date: Date;
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
  onNewBooking: (startTime: Date) => void;
  onUpdateBooking: (bookingId: string, updates: Partial<Booking>) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({ 
  date, 
  bookings, 
  onBookingClick, 
  onNewBooking, 
  onUpdateBooking 
}) => {
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

  const handleContextMenu = (e: React.MouseEvent, day: Date) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeY = e.clientY - rect.top - 64; // Account for header height
    const minutes = Math.max(0, Math.min(600, relativeY)); // Clamp to business hours
    const snappedMinutes = Math.round(minutes / 10) * 10;
    
    const clickTime = new Date(day);
    clickTime.setHours(9 + Math.floor(snappedMinutes / 60), snappedMinutes % 60, 0, 0);
    
    onNewBooking(clickTime);
  };

  return (
    <div className="flex h-full">
      {/* Time column */}
      <div className="w-20 border-r border-border">
        <div className="h-16"></div> {/* Header space */}
        {hours.map((hour) => (
          <div key={hour} className="h-16 relative">
            <div className="absolute top-0 right-2 text-sm text-muted-foreground">
              {format(new Date().setHours(hour, 0), 'HH:mm')}
            </div>
            <div className="absolute top-4 w-full border-b border-border" />
            {/* 10-minute grid lines */}
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="absolute w-8 right-0 border-b border-muted"
                style={{ top: `${(i + 1) * 10}px` }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Days columns */}
      <div className="flex-1 grid grid-cols-7">
        {days.map((day) => {
          const layouts = buildDayLayout(weekBookings, day);
          const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
          
          return (
            <ContextMenu key={day.toISOString()}>
              <ContextMenuTrigger asChild>
                <div className="border-r border-border last:border-r-0 relative">
                  {/* Day header */}
                  <div className={cn(
                    "h-16 border-b border-border flex flex-col items-center justify-center",
                    isToday && "bg-primary/5"
                  )}>
                    <span className="text-sm font-medium text-muted-foreground">
                      {format(day, 'EEE', { locale: sv })}
                    </span>
                    <span className={cn(
                      "text-lg",
                      isToday ? "font-bold text-primary" : "text-foreground"
                    )}>
                      {format(day, 'd')}
                    </span>
                  </div>
                  
                  {/* Day appointments */}
                  <div 
                    className="relative" 
                    style={{ height: '600px' }}
                    onContextMenu={(e) => handleContextMenu(e, day)}
                  >
                    {/* 10-minute grid */}
                    {Array.from({ length: 60 }, (_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "absolute w-full border-b",
                          i % 6 === 0 ? "border-border" : "border-muted"
                        )}
                        style={{ top: `${i * 10}px` }}
                      />
                    ))}
                    
                    {/* Current time line (only for today) */}
                    {isToday && currentTime.isVisible && (
                      <div
                        className="absolute w-full z-20 pointer-events-none"
                        style={{ top: `${currentTime.top}px` }}
                      >
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-destructive rounded-full -ml-1.5"></div>
                          <div className="flex-1 h-0.5 bg-destructive"></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Appointments with collision-free layout */}
                    {layouts.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground text-xs">Inga bokningar</p>
                      </div>
                    ) : (
                      layouts.map((layout) => {
                        const isPast = layout.booking.endTime < new Date();
                        const columnWidth = Math.floor((100 - 4) / layout.columnCount); // Leave 4% total margin
                        const leftMargin = layout.column * columnWidth + 2; // 2% left margin
                        
                        return (
                          <div key={layout.booking.id}>
                            {/* Main booking */}
                            <div
                              className="absolute"
                              style={{
                                top: `${layout.top}px`,
                                left: `${leftMargin}%`,
                                width: `${columnWidth}%`,
                                height: `${layout.height}px`,
                                zIndex: 10
                              }}
                            >
                              <AppointmentCard
                                booking={layout.booking}
                                onClick={() => onBookingClick(layout.booking)}
                                className="h-full text-xs"
                                isPast={isPast}
                              />
                            </div>
                            
                            {/* Buffer time */}
                            {layout.booking.bufferTime && (
                              <div
                                className="absolute bg-muted/30 border border-muted-foreground/20 rounded-sm text-xs text-muted-foreground flex items-center justify-center"
                                style={{
                                  top: `${layout.top + layout.height}px`,
                                  left: `${leftMargin}%`,
                                  width: `${columnWidth}%`,
                                  height: `${layout.bufferHeight}px`,
                                  zIndex: 5
                                }}
                              >
                                Förb.
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onClick={() => handleContextMenu({ 
                  preventDefault: () => {},
                  currentTarget: { getBoundingClientRect: () => ({ top: 0 }) },
                  clientY: 100 
                } as any, day)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ny bokning
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          );
        })}
      </div>
    </div>
  );
};