export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  staffId: string;
  staffName: string;
  treatmentType: string;
  treatmentCategory: 'facial' | 'laser' | 'consultation' | 'microneedling' | 'other';
  startTime: Date;
  endTime: Date;
  duration: number; // minutes
  bufferTime?: number; // minutes
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  price?: number;
  room?: string;
  isFirstVisit?: boolean;
  reminderSent?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingFormData {
  status: Booking['status'];
  notes: string;
  price?: number;
  room?: string;
  reminderSent: boolean;
}

export type CalendarView = 'day' | 'week';

export interface CalendarEvent {
  booking: Booking;
  top: number;
  height: number;
  color: string;
}