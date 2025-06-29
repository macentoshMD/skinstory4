
export interface Company {
  id: string;
  name: string;
  clinics: Clinic[];
  totalRevenue: number;
  totalCustomers: number;
}

export interface Clinic {
  id: string;
  name: string;
  companyId: string;
  address: string;
  phone: string;
  email: string;
  staff: StaffMember[];
  rooms: Room[];
  revenue: number;
  customerCount: number;
  rating: number;
  reviewCount: number;
}

export interface Room {
  id: string;
  name: string;
  clinicId: string;
  equipment: string[];
  capacity: number;
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Terapeut' | 'Receptionist' | 'Chef' | 'Assistent';
  clinicId: string;
  specializations: string[];
  certifications: string[];
  rating: number;
  reviewCount: number;
  treatmentsPerformed: number;
  revenue: number;
  workSchedule: WorkSchedule;
}

export interface WorkSchedule {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface Treatment {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  duration: number;
  price: number;
  description: string;
  equipment: string[];
  problemAreas: string[];
  popularity: number;
  rating: number;
  reviewCount: number;
  profitMargin: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  cost: number;
  stockLevel: number;
  reorderPoint: number;
  supplier: string;
  popularity: number;
  rating: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  segment: 'VIP' | 'Regular' | 'New' | 'Inactive';
  loyaltyLevel: number;
  totalSpent: number;
  visitCount: number;
  lastVisit: Date;
  averageSpending: number;
  preferredTreatments: string[];
  clinicId: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  date: Date;
  customerId: string;
  targetType: 'clinic' | 'staff' | 'treatment' | 'product';
  targetId: string;
  verified: boolean;
}

export interface FinancialRecord {
  id: string;
  date: Date;
  type: 'revenue' | 'expense' | 'refund';
  amount: number;
  category: string;
  clinicId: string;
  description: string;
}

export interface FilterContext {
  geographic: GeographicFilter;
  temporal: DateRange;
  personnel: PersonnelFilter;
  services: ServiceFilter;
  customer: CustomerFilter;
  performance: PerformanceFilter;
  reviews: ReviewFilter;
}

export interface GeographicFilter {
  companies: string[];
  clinics: string[];
  rooms: string[];
}

export interface PersonnelFilter {
  roles: string[];
  specializations: string[];
  certifications: string[];
  staffIds: string[];
  performanceRange: [number, number];
}

export interface ServiceFilter {
  treatmentCategories: string[];
  treatments: string[];
  products: string[];
  priceRange: [number, number];
  equipment: string[];
}

export interface CustomerFilter {
  segments: string[];
  loyaltyRange: [number, number];
  spendingRange: [number, number];
  visitRange: [number, number];
}

export interface PerformanceFilter {
  revenueRange: [number, number];
  ratingRange: [number, number];
  utilizationRange: [number, number];
}

export interface ReviewFilter {
  ratingRange: [number, number];
  verified: boolean | null;
  dateRange: DateRange;
}

export interface DateRange {
  from: Date;
  to: Date;
  label: string;
}

export interface KPIData {
  totalRevenue: number;
  totalCustomers: number;
  averageRating: number;
  totalBookings: number;
  utilizationRate: number;
  customerSatisfaction: number;
  repeatCustomerRate: number;
  averageTransactionValue: number;
}
