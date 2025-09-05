export interface SalaryData {
  period: {
    month: number;
    year: number;
    monthName: string;
  };
  
  // Base salary and work hours
  baseSalary: {
    hourlyRate: number;
    regularHours: number;
    weekendHours: number;
    overtimeHours: number;
    regularPay: number;
    weekendPay: number;
    overtimePay: number;
    totalHourlyPay: number;
  };
  
  // Commission breakdown
  commission: {
    treatments: {
      amount: number;
      count: number;
      rate: number; // percentage
    };
    products: {
      amount: number;
      count: number;
      rate: number; // percentage
    };
    online: {
      amount: number;
      count: number;
      rate: number; // percentage
    };
    total: number;
  };
  
  // Bonuses
  bonuses: {
    performance: number;
    achievement: number;
    monthly: number;
    other: number;
    total: number;
  };
  
  // Deductions
  deductions: {
    tax: number;
    socialSecurity: number;
    other: number;
    total: number;
  };
  
  // Summary
  gross: {
    total: number;
    breakdown: {
      basePay: number;
      commission: number;
      bonuses: number;
    };
  };
  
  net: {
    total: number;
  };
}

export interface WorkHoursSummary {
  regularHours: number;
  weekendHours: number;
  overtimeHours: number;
  totalHours: number;
  workDays: number;
  weekendDays: number;
}

export interface CommissionEntry {
  date: Date;
  type: 'treatment' | 'product' | 'online';
  description: string;
  baseAmount: number;
  rate: number;
  commission: number;
}