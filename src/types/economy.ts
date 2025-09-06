export interface EmployeeEconomyData {
  employeeId: string;
  employeeName: string;
  position: string;
  workHours: {
    regularHours: number;
    weekendHours: number;
    overtimeHours: number;
    totalHours: number;
    workDays: number;
    weekendDays: number;
  };
  sales: {
    treatments: {
      revenue: number;
      count: number;
    };
    products: {
      revenue: number;
      count: number;
    };
    online: {
      revenue: number;
      count: number;
    };
    totalRevenue: number;
  };
  costs: {
    salary: number;
    benefits: number;
    commission: number;
    totalCost: number;
  };
  profitability: {
    contribution: number;
    margin: number;
  };
}

export interface TreatmentEconomyData {
  treatmentId: string;
  treatmentName: string;
  category: string;
  equipment?: string;
  brand?: string;
  statistics: {
    sessionsCount: number;
    totalRevenue: number;
    averagePrice: number;
  };
  costs: {
    materials: number;
    equipment: number;
    labor: number;
    totalCosts: number;
  };
  profitability: {
    grossProfit: number;
    profitMargin: number;
  };
}

export interface ConsumableEconomyData {
  month: string;
  purchases: {
    categoryId: string;
    categoryName: string;
    totalSpent: number;
    itemCount: number;
    averageCost: number;
    topSuppliers: Array<{
      supplier: string;
      amount: number;
      percentage: number;
    }>;
  }[];
  totalPurchases: number;
}

export interface NoShowData {
  id: string;
  date: Date;
  customerName: string;
  customerId: string;
  treatmentName: string;
  treatmentValue: number;
  status: 'billed' | 'waived' | 'pending';
  reason?: string;
  billedAmount?: number;
  invoiceSent: boolean;
  paid: boolean;
  staffMember: string;
}

export interface EconomyFilters {
  dateRange: {
    from: Date;
    to: Date;
    label?: string;
  };
  employeeIds?: string[];
  treatmentCategories?: string[];
  showMonthly: boolean;
}

export interface EconomySummary {
  totalRevenue: number;
  totalCosts: number;
  grossProfit: number;
  profitMargin: number;
  employeeCount: number;
  treatmentSessions: number;
  noShowsTotal: number;
  noShowsValue: number;
}