import React, { useEffect, useState, useRef } from 'react';
import { Booking } from '@/types/booking';
import { AppointmentCard } from './AppointmentCard';
import { 
  buildDayLayout, 
  getCurrentTimePosition, 
  getTimeFromPosition,
  snapTo10Min,
  getMinutesFromDayStart,
  createTimeFromMinutes,
  TREATMENT_DURATIONS,
  BUFFER_TIME 
} from '@/utils/calendar';
import { format, addMinutes } from 'date-fns';
import { sv } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { 
  ContextMenu, 
  ContextMenuContent, 
  ContextMenuItem, 
  ContextMenuTrigger 
} from "@/components/ui/context-menu";
import { Plus } from "lucide-react";

interface DayViewProps {
  date: Date;
  bookings: Booking[];
  onBookingClick: (booking: Booking) => void;
  onNewBooking: (startTime: Date) => void;
  onUpdateBooking: (bookingId: string, updates: Partial<Booking>) => void;
}

export const DayView: React.FC<DayViewProps> = ({ 
  date, 
  bookings, 
  onBookingClick, 
  onNewBooking, 
  onUpdateBooking 
}) => {
  const [currentTime, setCurrentTime] = useState(getCurrentTimePosition());
  const [dragState, setDragState] = useState<{
    bookingId: string;
    isDragging: boolean;
    isResizing: boolean;
    startY: number;
    originalTop: number;
    originalHeight: number;
  } | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  
  const hours = Array.from({ length: 10 }, (_, i) => i + 9); // 9 AM to 7 PM
  const layouts = buildDayLayout(bookings, date);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTimePosition());
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!calendarRef.current) return;
    
    const rect = calendarRef.current.getBoundingClientRect();
    const clickTime = getTimeFromPosition(e.clientY, rect.top);
    const snappedTime = snapTo10Min(clickTime);
    
    // Set the date part from the current day
    const newTime = new Date(date);
    newTime.setHours(snappedTime.getHours(), snappedTime.getMinutes(), 0, 0);
    
    onNewBooking(newTime);
  };

  const handleMouseDown = (e: React.MouseEvent, bookingId: string, action: 'drag' | 'resize') => {
    e.preventDefault();
    const layout = layouts.find(l => l.booking.id === bookingId);
    if (!layout) return;

    setDragState({
      bookingId,
      isDragging: action === 'drag',
      isResizing: action === 'resize',
      startY: e.clientY,
      originalTop: layout.top,
      originalHeight: layout.height
    });
  };

  useEffect(() => {
    if (!dragState) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!calendarRef.current) return;
      
      const deltaY = e.clientY - dragState.startY;
      const deltaMinutes = Math.round(deltaY / 10) * 10; // Snap to 10-minute increments
      
      if (dragState.isDragging) {
        const newTop = Math.max(0, Math.min(600 - dragState.originalHeight, dragState.originalTop + deltaY));
        const snappedTop = Math.round(newTop / 10) * 10;
        
        // Visual feedback could be added here
      } else if (dragState.isResizing) {
        const newHeight = Math.max(20, dragState.originalHeight + deltaY); // Min 20 minutes
        const snappedHeight = Math.round(newHeight / 10) * 10;
        
        // Visual feedback could be added here
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!dragState || !calendarRef.current) {
        setDragState(null);
        return;
      }

      const deltaY = e.clientY - dragState.startY;
      const booking = layouts.find(l => l.booking.id === dragState.bookingId)?.booking;
      if (!booking) {
        setDragState(null);
        return;
      }

      if (dragState.isDragging) {
        const deltaMinutes = Math.round(deltaY / 10) * 10;
        const newStartMinutes = Math.max(0, Math.min(600 - booking.duration - BUFFER_TIME, 
          getMinutesFromDayStart(booking.startTime) + deltaMinutes));
        const snappedMinutes = Math.round(newStartMinutes / 10) * 10;
        
        const newStartTime = createTimeFromMinutes(date, snappedMinutes);
        const newEndTime = addMinutes(newStartTime, booking.duration + BUFFER_TIME);
        
        onUpdateBooking(booking.id, {
          startTime: newStartTime,
          endTime: newEndTime
        });
      } else if (dragState.isResizing) {
        const deltaMinutes = Math.round(deltaY / 10) * 10;
        const newDuration = Math.max(20, Math.min(180, booking.duration + deltaMinutes));
        const snappedDuration = Math.round(newDuration / 10) * 10;
        
        const newEndTime = addMinutes(booking.startTime, snappedDuration + BUFFER_TIME);
        
        onUpdateBooking(booking.id, {
          duration: snappedDuration,
          endTime: newEndTime
        });
      }
      
      setDragState(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState, layouts, date, onUpdateBooking]);

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

      {/* Appointments column */}
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="flex-1 relative" ref={calendarRef}>
            <div className="h-16 border-b border-border flex items-center px-4">
              <h3 className="font-medium">
                {format(date, 'EEEE d MMMM', { locale: sv })}
              </h3>
            </div>
            
            <div 
              className="relative select-none" 
              style={{ height: '600px' }}
              onContextMenu={handleContextMenu}
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
              
              {/* Current time line */}
              {currentTime.isVisible && (
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
              
              {/* Appointments */}
                {layouts.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Inga bokningar för denna dag</p>
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
                          onMouseDown={handleMouseDown ? (e, action) => handleMouseDown(e, layout.booking.id, action) : undefined}
                          className="h-full"
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
                          Förberedelse
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
          <ContextMenuItem onClick={() => onNewBooking(date)}>
            <Plus className="h-4 w-4 mr-2" />
            Ny bokning här
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};