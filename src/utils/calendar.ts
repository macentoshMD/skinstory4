import { Booking, CalendarEvent } from '@/types/booking';
import { format, addDays, startOfWeek, startOfDay, differenceInMinutes, isSameDay, addMinutes, isSameWeek } from 'date-fns';
import { sv } from 'date-fns/locale';

// Standard treatment durations (in minutes)
export const TREATMENT_DURATIONS = {
  consultation: 20,
  facial: 50,
  laser: 90,
  microneedling: 60,
  other: 50
} as const;

// Standard buffer time after each treatment
export const BUFFER_TIME = 10; // minutes

export const generateMockBookings = (startDate: Date, days: number = 7): Booking[] => {
  const bookings: Booking[] = [];
  const treatmentTypes = [
    { type: 'Konsultation', category: 'consultation' as const },
    { type: 'Ansiktsbehandling', category: 'facial' as const },
    { type: 'Laser hårborttagning', category: 'laser' as const },
    { type: 'Microneedling', category: 'microneedling' as const },
    { type: 'Kemisk peeling', category: 'facial' as const }
  ];

  const customers = [
    'Anna Andersson', 'Erik Eriksson', 'Maria Johansson', 'Lars Larsson',
    'Emma Nilsson', 'Johan Olsson', 'Sara Persson', 'Magnus Svensson'
  ];

  const staff = [
    'Dr. Lindström', 'Syster Bergman', 'Dr. Karlsson', 'Syster Nordström'
  ];

  const rooms = ['Rum 1', 'Rum 2', 'Rum 3', 'Laser rum'];
  const statuses: Booking['status'][] = ['confirmed', 'pending', 'completed', 'cancelled'];

  for (let day = 0; day < days; day++) {
    const currentDate = addDays(startDate, day);
    const bookingsPerDay = Math.floor(Math.random() * 8) + 2; // 2-10 bookings per day

    for (let i = 0; i < bookingsPerDay; i++) {
      const treatment = treatmentTypes[Math.floor(Math.random() * treatmentTypes.length)];
      const duration = TREATMENT_DURATIONS[treatment.category];
      
      const startHour = 9 + Math.floor(Math.random() * 8); // 9 AM to 5 PM start times
      const startMinute = Math.floor(Math.random() * 6) * 10; // 0, 10, 20, 30, 40, 50
      
      const startTime = new Date(currentDate);
      startTime.setHours(startHour, startMinute, 0, 0);
      
      const endTime = addMinutes(startTime, duration + BUFFER_TIME);
      
      // Skip if booking would end after 7 PM
      if (endTime.getHours() > 19) continue;

      const customer = customers[Math.floor(Math.random() * customers.length)];
      const staffMember = staff[Math.floor(Math.random() * staff.length)];
      const room = rooms[Math.floor(Math.random() * rooms.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const price = 800 + Math.floor(Math.random() * 1200); // 800-2000 kr

      bookings.push({
        id: `booking-${day}-${i}`,
        customerId: `customer-${customers.indexOf(customer)}`,
        customerName: customer,
        customerPhone: `070-${Math.floor(Math.random() * 9000000) + 1000000}`,
        customerEmail: `${customer.toLowerCase().replace(' ', '.')}@example.com`,
        staffId: `staff-${staff.indexOf(staffMember)}`,
        staffName: staffMember,
        treatmentType: treatment.type,
        treatmentCategory: treatment.category,
        startTime,
        endTime,
        duration,
        bufferTime: BUFFER_TIME,
        status,
        notes: Math.random() > 0.7 ? 'Speciella behov diskuterade' : undefined,
        price,
        room,
        isFirstVisit: Math.random() > 0.7,
        reminderSent: Math.random() > 0.5,
        createdAt: new Date(),
        updatedAt: new Date()
      });
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
    facial: 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100',
    laser: 'bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100',
    consultation: 'bg-green-50 border-green-200 text-green-800 hover:bg-green-100',
    microneedling: 'bg-orange-50 border-orange-200 text-orange-800 hover:bg-orange-100',
    other: 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100'
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

// Legacy functions removed - use calendarLayout.ts for new calendar system