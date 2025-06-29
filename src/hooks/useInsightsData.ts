
import { useState, useMemo } from 'react';
import { 
  Company, 
  Clinic, 
  StaffMember, 
  Treatment, 
  Product, 
  Customer, 
  Review,
  FilterContext,
  KPIData,
  DateRange
} from '@/types/insights';

// Mock data generator for the insights system
const generateMockData = () => {
  const companies: Company[] = [
    {
      id: 'comp-1',
      name: 'SkinStory Stockholm',
      clinics: [],
      totalRevenue: 2500000,
      totalCustomers: 850
    },
    {
      id: 'comp-2',
      name: 'SkinStory Göteborg',
      clinics: [],
      totalRevenue: 1800000,
      totalCustomers: 620
    }
  ];

  const clinics: Clinic[] = [
    {
      id: 'clinic-1',
      name: 'SkinStory Östermalm',
      companyId: 'comp-1',
      address: 'Östermalm, Stockholm',
      phone: '08-123 45 67',
      email: 'ostermalm@skinstory.se',
      staff: [],
      rooms: [],
      revenue: 1200000,
      customerCount: 420,
      rating: 4.8,
      reviewCount: 156
    },
    {
      id: 'clinic-2',
      name: 'SkinStory Södermalm',
      companyId: 'comp-1',
      address: 'Södermalm, Stockholm',
      phone: '08-234 56 78',
      email: 'sodermalm@skinstory.se',
      staff: [],
      rooms: [],
      revenue: 1300000,
      customerCount: 430,
      rating: 4.7,
      reviewCount: 189
    },
    {
      id: 'clinic-3',
      name: 'SkinStory Nordstan',
      companyId: 'comp-2',
      address: 'Nordstan, Göteborg',
      phone: '031-345 67 89',
      email: 'nordstan@skinstory.se',
      staff: [],
      rooms: [],
      revenue: 1800000,
      customerCount: 620,
      rating: 4.9,
      reviewCount: 234
    }
  ];

  const staff: StaffMember[] = [
    {
      id: 'staff-1',
      name: 'Lisa Svensson',
      role: 'Terapeut',
      clinicId: 'clinic-1',
      specializations: ['HydraFacial', 'Microneedling', 'Anti-aging'],
      certifications: ['Dermapen Certified', 'HydraFacial Master'],
      rating: 4.9,
      reviewCount: 89,
      treatmentsPerformed: 145,
      revenue: 285000,
      workSchedule: {
        monday: [{ start: '09:00', end: '17:00' }],
        tuesday: [{ start: '09:00', end: '17:00' }],
        wednesday: [{ start: '09:00', end: '17:00' }],
        thursday: [{ start: '09:00', end: '17:00' }],
        friday: [{ start: '09:00', end: '15:00' }],
        saturday: [],
        sunday: []
      }
    },
    {
      id: 'staff-2',
      name: 'Anna Nilsson',
      role: 'Terapeut',
      clinicId: 'clinic-2',
      specializations: ['Chemical Peeling', 'Acne Treatment', 'Rosacea'],
      certifications: ['Advanced Chemical Peels', 'Acne Specialist'],
      rating: 4.8,
      reviewCount: 67,
      treatmentsPerformed: 132,
      revenue: 268000,
      workSchedule: {
        monday: [{ start: '10:00', end: '18:00' }],
        tuesday: [{ start: '10:00', end: '18:00' }],
        wednesday: [{ start: '10:00', end: '18:00' }],
        thursday: [{ start: '10:00', end: '18:00' }],
        friday: [{ start: '10:00', end: '16:00' }],
        saturday: [{ start: '10:00', end: '14:00' }],
        sunday: []
      }
    },
    {
      id: 'staff-3',
      name: 'Maria Larsson',
      role: 'Chef',
      clinicId: 'clinic-3',
      specializations: ['Management', 'Customer Service', 'All Treatments'],
      certifications: ['Management Certification', 'Customer Excellence'],
      rating: 4.7,
      reviewCount: 45,
      treatmentsPerformed: 98,
      revenue: 195000,
      workSchedule: {
        monday: [{ start: '08:00', end: '16:00' }],
        tuesday: [{ start: '08:00', end: '16:00' }],
        wednesday: [{ start: '08:00', end: '16:00' }],
        thursday: [{ start: '08:00', end: '16:00' }],
        friday: [{ start: '08:00', end: '16:00' }],
        saturday: [],
        sunday: []
      }
    }
  ];

  const treatments: Treatment[] = [
    {
      id: 'treat-1',
      name: 'HydraFacial',
      category: 'Ansiktsbehandling',
      subcategory: 'Deep Cleansing',
      duration: 60,
      price: 1200,
      description: 'Djuprengörande ansiktsbehandling',
      equipment: ['HydraFacial MD'],
      problemAreas: ['Torr hud', 'Pormaskar', 'Ojämn hudton'],
      popularity: 95,
      rating: 4.8,
      reviewCount: 234,
      profitMargin: 65
    },
    {
      id: 'treat-2',
      name: 'Microneedling',
      category: 'Anti-aging',
      subcategory: 'Kollagenstimulering',
      duration: 75,
      price: 1800,
      description: 'Stimulerar kollagenproduktion',
      equipment: ['Dermapen 4'],
      problemAreas: ['Finlinjer', 'Ärrbildning', 'Pigmentfläckar'],
      popularity: 87,
      rating: 4.7,
      reviewCount: 189,
      profitMargin: 72
    },
    {
      id: 'treat-3',
      name: 'Chemical Peeling',
      category: 'Hudförnyelse',
      subcategory: 'Exfoliering',
      duration: 45,
      price: 950,
      description: 'Kemisk exfoliering för hudförnyelse',
      equipment: ['Chemical Solutions'],
      problemAreas: ['Pigmentfläckar', 'Akneärr', 'Solskador'],
      popularity: 78,
      rating: 4.6,
      reviewCount: 145,
      profitMargin: 58
    }
  ];

  const products: Product[] = [
    {
      id: 'prod-1',
      name: 'Vitamin C Serum',
      category: 'Serum',
      brand: 'SkinCeuticals',
      price: 850,
      cost: 320,
      stockLevel: 45,
      reorderPoint: 15,
      supplier: 'Beauty Supply AB',
      popularity: 92,
      rating: 4.7
    },
    {
      id: 'prod-2',
      name: 'Retinol Night Cream',
      category: 'Nattkräm',
      brand: 'Obagi',
      price: 680,
      cost: 280,
      stockLevel: 28,
      reorderPoint: 10,
      supplier: 'Professional Beauty',
      popularity: 85,
      rating: 4.5
    },
    {
      id: 'prod-3',
      name: 'Hyaluronic Acid Moisturizer',
      category: 'Fuktgivare',
      brand: 'Dermalogica',
      price: 520,
      cost: 220,
      stockLevel: 67,
      reorderPoint: 20,
      supplier: 'Beauty Supply AB',
      popularity: 88,
      rating: 4.6
    }
  ];

  return {
    companies,
    clinics,
    staff,
    treatments,
    products,
    customers: [] as Customer[],
    reviews: [] as Review[]
  };
};

export const useInsightsData = () => {
  const [filterContext, setFilterContext] = useState<FilterContext>({
    geographic: { companies: [], clinics: [], rooms: [] },
    temporal: {
      from: new Date(),
      to: new Date(),
      label: 'Idag'
    },
    personnel: { roles: [], specializations: [], certifications: [], staffIds: [], performanceRange: [0, 100] },
    services: { treatmentCategories: [], treatments: [], products: [], priceRange: [0, 5000], equipment: [] },
    customer: { segments: [], loyaltyRange: [0, 100], spendingRange: [0, 50000], visitRange: [0, 100] },
    performance: { revenueRange: [0, 10000000], ratingRange: [0, 5], utilizationRange: [0, 100] },
    reviews: { ratingRange: [0, 5], verified: null, dateRange: { from: new Date(), to: new Date(), label: 'Alla' } }
  });

  const data = useMemo(() => generateMockData(), []);

  const filteredData = useMemo(() => {
    // Apply filters to data based on filterContext
    let filteredClinics = data.clinics;
    let filteredStaff = data.staff;
    let filteredTreatments = data.treatments;
    let filteredProducts = data.products;

    // Geographic filtering
    if (filterContext.geographic.companies.length > 0) {
      filteredClinics = filteredClinics.filter(clinic => 
        filterContext.geographic.companies.includes(clinic.companyId)
      );
    }
    if (filterContext.geographic.clinics.length > 0) {
      filteredClinics = filteredClinics.filter(clinic => 
        filterContext.geographic.clinics.includes(clinic.id)
      );
      filteredStaff = filteredStaff.filter(staff => 
        filterContext.geographic.clinics.includes(staff.clinicId)
      );
    }

    // Personnel filtering
    if (filterContext.personnel.roles.length > 0) {
      filteredStaff = filteredStaff.filter(staff => 
        filterContext.personnel.roles.includes(staff.role)
      );
    }

    // Service filtering
    if (filterContext.services.treatmentCategories.length > 0) {
      filteredTreatments = filteredTreatments.filter(treatment => 
        filterContext.services.treatmentCategories.includes(treatment.category)
      );
    }

    return {
      ...data,
      clinics: filteredClinics,
      staff: filteredStaff,
      treatments: filteredTreatments,
      products: filteredProducts
    };
  }, [data, filterContext]);

  const kpiData: KPIData = useMemo(() => {
    const clinics = filteredData.clinics;
    const staff = filteredData.staff;
    const treatments = filteredData.treatments;

    return {
      totalRevenue: clinics.reduce((sum, clinic) => sum + clinic.revenue, 0),
      totalCustomers: clinics.reduce((sum, clinic) => sum + clinic.customerCount, 0),
      averageRating: clinics.reduce((sum, clinic) => sum + clinic.rating, 0) / clinics.length || 0,
      totalBookings: staff.reduce((sum, member) => sum + member.treatmentsPerformed, 0),
      utilizationRate: 85, // Mock calculation
      customerSatisfaction: clinics.reduce((sum, clinic) => sum + clinic.rating, 0) / clinics.length || 0,
      repeatCustomerRate: 68, // Mock value
      averageTransactionValue: treatments.reduce((sum, treatment) => sum + treatment.price, 0) / treatments.length || 0
    };
  }, [filteredData]);

  return {
    data: filteredData,
    filterContext,
    setFilterContext,
    kpiData
  };
};
