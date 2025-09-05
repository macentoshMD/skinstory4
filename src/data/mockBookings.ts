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
    startTime: new Date(2024, 11, 5, 9, 30), // 09:30
    endTime: new Date(2024, 11, 5, 10, 0), // 10:00
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
    startTime: new Date(2024, 11, 5, 10, 30), // 10:30
    endTime: new Date(2024, 11, 5, 11, 40), // 11:40
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
    startTime: new Date(2024, 11, 5, 13, 0), // 13:00
    endTime: new Date(2024, 11, 5, 14, 40), // 14:40
    duration: 100, // 90 min + 10 min paus
    price: 2500,
    status: 'confirmed',
    isFirstVisit: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  // Konsultation nästa dag
  {
    id: '4',
    customerId: 'cust-4',
    customerName: 'Emma Nilsson',
    staffId: 'staff-1',
    staffName: 'Dr. Emma Karlsson',
    treatmentType: 'Konsultation',
    treatmentCategory: 'consultation',
    startTime: new Date(2024, 11, 6, 14, 20), // 14:20
    endTime: new Date(2024, 11, 6, 14, 50), // 14:50
    duration: 30,
    price: 800,
    status: 'confirmed',
    isFirstVisit: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];