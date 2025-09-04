import { Booking, CalendarEvent } from '@/types/booking';
import { format, addDays, startOfWeek, startOfDay, differenceInMinutes, isSameDay } from 'date-fns';
import { sv } from 'date-fns/locale';

export const generateMockBookings = (startDate: Date, days: number = 7): Booking[] => {
  const bookings: Booking[] = [];
  const treatments = [
    { name: 'HydraFacial', category: 'facial' as const, duration: 60, price: 1200 },
    { name: 'Ansiktsbehandling', category: 'facial' as const, duration: 45, price: 800 },
    { name: 'Microneedling', category: 'microneedling' as const, duration: 90, price: 1800 },
    { name: 'Konsultation', category: 'consultation' as const, duration: 30, price: 500 },
    { name: 'Laser Hair Removal', category: 'laser' as const, duration: 45, price: 1500 },
    { name: 'IPL Behandling', category: 'laser' as const, duration: 60, price: 1400 }
  ];

  const customers = [
    { name: 'Anna Andersson', phone: '070-123 45 67', email: 'anna@example.com' },
    { name: 'Erik Johansson', phone: '070-234 56 78', email: 'erik@example.com' },
    { name: 'Maria Larsson', phone: '070-345 67 89', email: 'maria@example.com' },
    { name: 'Johan Petersson', phone: '070-456 78 90', email: 'johan@example.com' },
    { name: 'Lisa Nilsson', phone: '070-567 89 01', email: 'lisa@example.com' },
    { name: 'Peter Svensson', phone: '070-678 90 12', email: 'peter@example.com' }
  ];

  const staff = [
    { id: 'staff1', name: 'Lisa S.' },
    { id: 'staff2', name: 'Anna N.' },
    { id: 'staff3', name: 'Maria L.' },
    { id: 'staff4', name: 'Emma K.' }
  ];

  const statuses: Booking['status'][] = ['confirmed', 'pending', 'completed', 'no_show'];
  const rooms = ['Rum 1', 'Rum 2', 'Rum 3', 'Konsultationsrum'];

  for (let dayOffset = 0; dayOffset < days; dayOffset++) {
    const currentDate = addDays(startDate, dayOffset);
    const appointmentsPerDay = Math.floor(Math.random() * 6) + 3; // 3-8 appointments per day

    for (let i = 0; i < appointmentsPerDay; i++) {
      const treatment = treatments[Math.floor(Math.random() * treatments.length)];
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const staffMember = staff[Math.floor(Math.random() * staff.length)];
      
      const startHour = 9 + Math.floor(Math.random() * 8); // 9-16
      const startMinute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45
      
      const startTime = new Date(currentDate);
      startTime.setHours(startHour, startMinute, 0, 0);
      
      const endTime = new Date(startTime.getTime() + treatment.duration * 60000);
      
      const booking: Booking = {
        id: `booking-${dayOffset}-${i}`,
        customerId: `customer-${Math.floor(Math.random() * 100)}`,
        customerName: customer.name,
        customerPhone: customer.phone,
        customerEmail: customer.email,
        staffId: staffMember.id,
        staffName: staffMember.name,
        treatmentType: treatment.name,
        treatmentCategory: treatment.category,
        startTime,
        endTime,
        duration: treatment.duration,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        notes: Math.random() > 0.7 ? 'Speciella instruktioner för behandlingen' : undefined,
        price: treatment.price,
        room: rooms[Math.floor(Math.random() * rooms.length)],
        isFirstVisit: Math.random() > 0.7,
        reminderSent: Math.random() > 0.3,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      bookings.push(booking);
    }
  }

  return bookings.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
};

export const getBookingsForDate = (bookings: Booking[], date: Date): Booking[] => {
  return bookings.filter(booking => isSameDay(booking.startTime, date));
};

export const getBookingsForWeek = (bookings: Booking[], weekStart: Date): Booking[] => {
  const weekEnd = addDays(weekStart, 6);
  return bookings.filter(booking => 
    booking.startTime >= weekStart && booking.startTime <= weekEnd
  );
};

export const getTreatmentColor = (category: Booking['treatmentCategory']): string => {
  const colors = {
    facial: 'bg-blue-100 border-blue-300 text-blue-800',
    laser: 'bg-purple-100 border-purple-300 text-purple-800',
    consultation: 'bg-green-100 border-green-300 text-green-800',
    microneedling: 'bg-orange-100 border-orange-300 text-orange-800',
    other: 'bg-gray-100 border-gray-300 text-gray-800'
  };
  return colors[category] || colors.other;
};

export const getStatusColor = (status: Booking['status']): string => {
  const colors = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
    no_show: 'bg-gray-100 text-gray-800'
  };
  return colors[status];
};

export const getStatusText = (status: Booking['status']): string => {
  const texts = {
    confirmed: 'Bekräftad',
    pending: 'Väntar',
    completed: 'Genomförd',
    cancelled: 'Avbokad',
    no_show: 'Utebliven'
  };
  return texts[status];
};

export const formatTimeRange = (startTime: Date, endTime: Date): string => {
  return `${format(startTime, 'HH:mm')} - ${format(endTime, 'HH:mm')}`;
};

export const formatWeekRange = (weekStart: Date): string => {
  const weekEnd = addDays(weekStart, 6);
  return `${format(weekStart, 'd MMM', { locale: sv })} - ${format(weekEnd, 'd MMM yyyy', { locale: sv })}`;
};

export const calculateEventPosition = (booking: Booking, dayStart: Date): { top: number; height: number } => {
  const startOfDayTime = startOfDay(dayStart).getTime();
  const bookingStartTime = booking.startTime.getTime();
  const minutesFromStart = Math.max(0, (bookingStartTime - startOfDayTime) / (1000 * 60));
  
  // Each hour is 60px, so each minute is 1px
  const top = (minutesFromStart - 9 * 60); // Start from 9 AM
  const height = booking.duration;
  
  return { top: Math.max(0, top), height };
};