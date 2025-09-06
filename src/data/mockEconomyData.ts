import { EmployeeEconomyData, TreatmentEconomyData, NoShowData } from '@/types/economy';

export const mockEmployeeEconomyData: EmployeeEconomyData[] = [
  {
    employeeId: 'emp-1',
    employeeName: 'Dr. Emma Karlsson',
    position: 'Klinikchef',
    workHours: {
      regularHours: 160,
      weekendHours: 16,
      overtimeHours: 8,
      totalHours: 184,
      workDays: 20,
      weekendDays: 2,
    },
    sales: {
      treatments: {
        revenue: 89500,
        count: 42,
      },
      products: {
        revenue: 23400,
        count: 18,
      },
      online: {
        revenue: 5600,
        count: 8,
      },
      totalRevenue: 118500,
    },
    costs: {
      salary: 64400,
      benefits: 3200,
      commission: 8320,
      totalCost: 75920,
    },
    profitability: {
      contribution: 42580,
      margin: 35.9,
    },
  },
  {
    employeeId: 'emp-2',
    employeeName: 'Terapeut Lisa Berg',
    position: 'Hudterapeut',
    workHours: {
      regularHours: 152,
      weekendHours: 12,
      overtimeHours: 4,
      totalHours: 168,
      workDays: 19,
      weekendDays: 1.5,
    },
    sales: {
      treatments: {
        revenue: 67300,
        count: 35,
      },
      products: {
        revenue: 18900,
        count: 14,
      },
      online: {
        revenue: 3200,
        count: 5,
      },
      totalRevenue: 89400,
    },
    costs: {
      salary: 53200,
      benefits: 2100,
      commission: 6240,
      totalCost: 61540,
    },
    profitability: {
      contribution: 27860,
      margin: 31.2,
    },
  },
  {
    employeeId: 'emp-3',
    employeeName: 'Terapeut Anna Lindgren',
    position: 'Laserterapeut',
    workHours: {
      regularHours: 148,
      weekendHours: 8,
      overtimeHours: 0,
      totalHours: 156,
      workDays: 18.5,
      weekendDays: 1,
    },
    sales: {
      treatments: {
        revenue: 78900,
        count: 28,
      },
      products: {
        revenue: 15600,
        count: 11,
      },
      online: {
        revenue: 2800,
        count: 4,
      },
      totalRevenue: 97300,
    },
    costs: {
      salary: 54600,
      benefits: 2400,
      commission: 7200,
      totalCost: 64200,
    },
    profitability: {
      contribution: 33100,
      margin: 34.0,
    },
  },
];

export const mockTreatmentEconomyData: TreatmentEconomyData[] = [
  {
    treatmentId: 'microneedling-dermapen',
    treatmentName: 'Microneedling med DermaPen',
    category: 'Microneedling',
    equipment: 'DermaPen',
    brand: 'DermaPen',
    statistics: {
      sessionsCount: 28,
      totalRevenue: 143000,
      averagePrice: 5107,
    },
    costs: {
      materials: 47000,
      equipment: 7150,
      labor: 50050,
      totalCosts: 104200,
    },
    profitability: {
      grossProfit: 38800,
      profitMargin: 27.1,
    },
  },
  {
    treatmentId: 'hydrafacial-md',
    treatmentName: 'HydraFacial MD',
    category: 'Ansiktsbehandling',
    equipment: 'HydraFacial MD',
    brand: 'HydraFacial',
    statistics: {
      sessionsCount: 45,
      totalRevenue: 135000,
      averagePrice: 3000,
    },
    costs: {
      materials: 20250,
      equipment: 6750,
      labor: 47250,
      totalCosts: 74250,
    },
    profitability: {
      grossProfit: 60750,
      profitMargin: 45.0,
    },
  },
  {
    treatmentId: 'laser-hair-removal',
    treatmentName: 'Laser Hårborttagning',
    category: 'Laser',
    equipment: 'Laser System Pro',
    brand: 'Candela',
    statistics: {
      sessionsCount: 32,
      totalRevenue: 128000,
      averagePrice: 4000,
    },
    costs: {
      materials: 19200,
      equipment: 6400,
      labor: 44800,
      totalCosts: 70400,
    },
    profitability: {
      grossProfit: 57600,
      profitMargin: 45.0,
    },
  },
  {
    treatmentId: 'chemical-peeling',
    treatmentName: 'Kemisk Peeling',
    category: 'Peeling',
    statistics: {
      sessionsCount: 22,
      totalRevenue: 66000,
      averagePrice: 3000,
    },
    costs: {
      materials: 9900,
      equipment: 0,
      labor: 23100,
      totalCosts: 33000,
    },
    profitability: {
      grossProfit: 33000,
      profitMargin: 50.0,
    },
  },
  {
    treatmentId: 'consultation',
    treatmentName: 'Konsultation',
    category: 'Konsultation',
    statistics: {
      sessionsCount: 38,
      totalRevenue: 30400,
      averagePrice: 800,
    },
    costs: {
      materials: 0,
      equipment: 0,
      labor: 10640,
      totalCosts: 10640,
    },
    profitability: {
      grossProfit: 19760,
      profitMargin: 65.0,
    },
  },
];

export const mockNoShowData: NoShowData[] = [
  {
    id: 'ns-1',
    date: new Date(2025, 8, 3),
    customerName: 'Sara Karlsson',
    customerId: 'cust-12',
    treatmentName: 'HydraFacial MD',
    treatmentValue: 3000,
    status: 'billed',
    billedAmount: 1500,
    invoiceSent: true,
    paid: false,
    staffMember: 'Dr. Emma Karlsson',
  },
  {
    id: 'ns-2',
    date: new Date(2025, 8, 4),
    customerName: 'Magnus Andersson',
    customerId: 'cust-15',
    treatmentName: 'Laser Hårborttagning',
    treatmentValue: 4000,
    status: 'waived',
    reason: 'Familjenödsituation',
    billedAmount: 0,
    invoiceSent: false,
    paid: false,
    staffMember: 'Terapeut Anna Lindgren',
  },
  {
    id: 'ns-3',
    date: new Date(2025, 8, 5),
    customerName: 'Lisa Johansson',
    customerId: 'cust-18',
    treatmentName: 'Microneedling med DermaPen',
    treatmentValue: 5000,
    status: 'pending',
    billedAmount: 0,
    invoiceSent: false,
    paid: false,
    staffMember: 'Terapeut Lisa Berg',
  },
  {
    id: 'ns-4',
    date: new Date(2025, 8, 6),
    customerName: 'Johan Berg',
    customerId: 'cust-22',
    treatmentName: 'Kemisk Peeling',
    treatmentValue: 3000,
    status: 'billed',
    billedAmount: 500,
    invoiceSent: true,
    paid: true,
    staffMember: 'Dr. Emma Karlsson',
  },
  {
    id: 'ns-5',
    date: new Date(2025, 8, 7),
    customerName: 'Anna Svensson',
    customerId: 'cust-25',
    treatmentName: 'Konsultation',
    treatmentValue: 800,
    status: 'billed',
    billedAmount: 400,
    invoiceSent: true,
    paid: false,
    staffMember: 'Dr. Emma Karlsson',
  },
];