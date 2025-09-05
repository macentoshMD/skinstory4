import { Booking } from '@/types/booking';

export const mockBookings: Booking[] = [
  // Konsultation - 20 min + 10 min paus = 30 min
  {
    id: '1',
    customerId: 'cust-1',
    customerName: 'Anna Svensson',
    staffId: 'staff-1',
    staffName: 'Dr. Emma Karlsson',
    treatmentType: 'Konsultation',
    treatmentCategory: 'consultation',
    startTime: new Date(new Date().setHours(9, 30, 0, 0)), // 09:30 idag
    endTime: new Date(new Date().setHours(10, 0, 0, 0)), // 10:00 idag
    duration: 30, // 20 min + 10 min paus
    price: 800,
    status: 'confirmed',
    isFirstVisit: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  // Aknebehandling - 60 min + 10 min paus = 70 min
  {
    id: '2',
    customerId: 'cust-2',
    customerName: 'Maria Andersson',
    staffId: 'staff-2',
    staffName: 'Terapeut Lisa Berg',
    treatmentType: 'Aknebehandling',
    treatmentCategory: 'facial',
    startTime: new Date(new Date().setHours(10, 30, 0, 0)), // 10:30 idag
    endTime: new Date(new Date().setHours(11, 40, 0, 0)), // 11:40 idag
    duration: 70, // 60 min + 10 min paus
    price: 1200,
    status: 'confirmed',
    isFirstVisit: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  // Laserbehandling - 90 min + 10 min paus = 100 min
  {
    id: '3',
    customerId: 'cust-3',
    customerName: 'Sara Johansson',
    staffId: 'staff-3',
    staffName: 'Terapeut Anna Lindgren',
    treatmentType: 'Laserbehandling',
    treatmentCategory: 'laser',
    startTime: new Date(new Date().setHours(13, 0, 0, 0)), // 13:00 idag
    endTime: new Date(new Date().setHours(14, 40, 0, 0)), // 14:40 idag
    duration: 100, // 90 min + 10 min paus
    price: 2500,
    status: 'confirmed',
    isFirstVisit: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  // Konsultation imorgon
  {
    id: '4',
    customerId: 'cust-4',
    customerName: 'Emma Nilsson',
    staffId: 'staff-1',
    staffName: 'Dr. Emma Karlsson',
    treatmentType: 'Konsultation',
    treatmentCategory: 'consultation',
    startTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 + new Date().setHours(14, 20, 0, 0) - new Date().setHours(0, 0, 0, 0)), // 14:20 imorgon
    endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 + new Date().setHours(14, 50, 0, 0) - new Date().setHours(0, 0, 0, 0)), // 14:50 imorgon
    duration: 30,
    price: 800,
    status: 'confirmed',
    isFirstVisit: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];