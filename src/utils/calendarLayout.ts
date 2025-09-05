import { Booking } from '@/types/booking';
import { format, addDays, startOfWeek, startOfDay, differenceInMinutes, isSameDay, addMinutes, isSameWeek } from 'date-fns';

// Simple layout interface
export interface BookingLayout {
  booking: Booking;
  column: number;
  columnCount: number;
  top: number;
  height: number;
}

// Business hours: 9 AM to 7 PM (10 hours = 600 minutes)
export const BUSINESS_HOURS_START = 9; // 9 AM
export const BUSINESS_HOURS_END = 19; // 7 PM
export const BUSINESS_MINUTES = (BUSINESS_HOURS_END - BUSINESS_HOURS_START) * 60; // 600 minutes

// Convert time to minutes from business day start
export function getMinutesFromStart(date: Date): number {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return (hours - BUSINESS_HOURS_START) * 60 + minutes;
}

// Convert minutes to pixels (1px = 1 minute)
export function minutesToPixels(minutes: number): number {
  return minutes;
}

// Get current time position for "now" line
export function getCurrentTimePosition(): { top: number; isVisible: boolean } {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Only show during business hours
  const isVisible = currentHour >= BUSINESS_HOURS_START && currentHour < BUSINESS_HOURS_END;
  
  if (!isVisible) {
    return { top: 0, isVisible: false };
  }
  
  const minutesFromStart = getMinutesFromStart(now);
  const top = minutesToPixels(minutesFromStart);
  
  return { top, isVisible };
}

// Simple collision-free layout algorithm
export function buildDayLayout(bookings: Booking[], date: Date): BookingLayout[] {
  // Filter bookings for the specific date
  const dayBookings = bookings.filter(booking => isSameDay(booking.startTime, date));
  
  if (dayBookings.length === 0) return [];
  
  // Sort bookings by start time
  const sortedBookings = [...dayBookings].sort((a, b) => 
    a.startTime.getTime() - b.startTime.getTime()
  );
  
  const layouts: BookingLayout[] = [];
  const columns: Array<{ endTime: number; bookings: Booking[] }> = [];
  
  // Process each booking
  for (const booking of sortedBookings) {
    const startMinutes = getMinutesFromStart(booking.startTime);
    const endMinutes = getMinutesFromStart(booking.endTime);
    
    // Find first available column where this booking doesn't overlap
    let columnIndex = -1;
    
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].endTime <= startMinutes) {
        columnIndex = i;
        break;
      }
    }
    
    // If no available column found, create new one
    if (columnIndex === -1) {
      columnIndex = columns.length;
      columns.push({ endTime: endMinutes, bookings: [booking] });
    } else {
      // Update existing column
      columns[columnIndex].endTime = endMinutes;
      columns[columnIndex].bookings.push(booking);
    }
    
    layouts.push({
      booking,
      column: columnIndex,
      columnCount: 1, // Will be updated after processing
      top: minutesToPixels(startMinutes),
      height: minutesToPixels(booking.duration),
    });
  }
  
  // Update column counts
  const totalColumns = columns.length;
  layouts.forEach(layout => {
    layout.columnCount = totalColumns;
  });
  
  return layouts;
}

// Filter bookings by date
export function getBookingsForDate(bookings: Booking[], date: Date): Booking[] {
  return bookings.filter(booking => isSameDay(booking.startTime, date));
}

// Filter bookings by week
export function getBookingsForWeek(bookings: Booking[], weekStart: Date): Booking[] {
  const weekEnd = addDays(weekStart, 6);
  return bookings.filter(booking => 
    booking.startTime >= weekStart && booking.startTime <= weekEnd
  );
}

// Format time range
export function formatTimeRange(startTime: Date, endTime: Date): string {
  return `${format(startTime, 'HH:mm')} - ${format(endTime, 'HH:mm')}`;
}

// Treatment category colors
export function getTreatmentColor(category: Booking['treatmentCategory']): string {
  const colors = {
    facial: 'bg-blue-50 border-blue-200 text-blue-800',
    laser: 'bg-purple-50 border-purple-200 text-purple-800',
    consultation: 'bg-green-50 border-green-200 text-green-800',
    microneedling: 'bg-orange-50 border-orange-200 text-orange-800',
    other: 'bg-gray-50 border-gray-200 text-gray-800'
  };
  return colors[category] || colors.other;
}

// Status colors
export function getStatusColor(status: Booking['status']): string {
  const colors = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
    no_show: 'bg-gray-100 text-gray-800'
  };
  return colors[status];
}

// Status text
export function getStatusText(status: Booking['status']): string {
  const texts = {
    confirmed: 'Bekräftad',
    pending: 'Väntar',
    completed: 'Klar',
    cancelled: 'Avbokad',
    no_show: 'Utebliven'
  };
  return texts[status];
}