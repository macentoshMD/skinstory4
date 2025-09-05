import { SalaryData, WorkHoursSummary, CommissionEntry } from '@/types/salary';
import { ExtendedActivityLog } from '@/types/activity';
import { WorkScheduleEntry } from '@/pages/WorkSchedule';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, isWeekend } from 'date-fns';
import { sv } from 'date-fns/locale';
import { isRedDay } from '@/utils/swedishHolidays';

const HOURLY_RATES = {
  regular: 185, // SEK per hour
  weekend: 220, // SEK per hour (weekend/holiday)
  overtime: 277, // SEK per hour (150% of regular)
};

const COMMISSION_RATES = {
  treatments: 15, // 15% commission on treatments
  products: 8, // 8% commission on product sales
  online: 5, // 5% commission on online sales
};

export function calculateSalaryData(
  activities: ExtendedActivityLog[],
  scheduleEntries: Record<string, WorkScheduleEntry>,
  currentMonth: Date
): SalaryData {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  
  // Filter activities for this month
  const monthActivities = activities.filter(
    activity => {
      const activityDate = new Date(activity.timestamp);
      return activityDate >= monthStart && activityDate <= monthEnd;
    }
  );

  // Calculate work hours
  const workHours = calculateWorkHours(scheduleEntries, currentMonth);
  
  // Calculate commission
  const commission = calculateCommission(monthActivities);
  
  // Calculate bonuses
  const bonuses = calculateBonuses(monthActivities, workHours);
  
  // Calculate base salary
  const baseSalary = {
    hourlyRate: HOURLY_RATES.regular,
    regularHours: workHours.regularHours,
    weekendHours: workHours.weekendHours,
    overtimeHours: workHours.overtimeHours,
    regularPay: workHours.regularHours * HOURLY_RATES.regular,
    weekendPay: workHours.weekendHours * HOURLY_RATES.weekend,
    overtimePay: workHours.overtimeHours * HOURLY_RATES.overtime,
    totalHourlyPay: 0,
  };
  
  baseSalary.totalHourlyPay = baseSalary.regularPay + baseSalary.weekendPay + baseSalary.overtimePay;
  
  // Calculate gross and net
  const gross = {
    total: 0,
    breakdown: {
      basePay: baseSalary.totalHourlyPay,
      commission: commission.total,
      bonuses: bonuses.total,
    },
  };
  
  gross.total = gross.breakdown.basePay + gross.breakdown.commission + gross.breakdown.bonuses;
  
  // Calculate deductions (approximate Swedish tax rates)
  const deductions = {
    tax: gross.total * 0.32, // Approximate income tax
    socialSecurity: gross.total * 0.07, // Employee social security
    other: 0,
    total: 0,
  };
  deductions.total = deductions.tax + deductions.socialSecurity + deductions.other;
  
  const net = {
    total: gross.total - deductions.total,
  };

  return {
    period: {
      month: currentMonth.getMonth() + 1,
      year: currentMonth.getFullYear(),
      monthName: format(currentMonth, 'MMMM yyyy', { locale: sv }),
    },
    baseSalary,
    commission,
    bonuses,
    deductions,
    gross,
    net,
  };
}

function calculateWorkHours(
  scheduleEntries: Record<string, WorkScheduleEntry>,
  currentMonth: Date
): WorkHoursSummary {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  });

  const calculateDayHours = (startTime: string, endTime: string, breakDuration: number): number => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    const totalMinutes = endMinutes - startMinutes - breakDuration;
    
    return Math.max(0, totalMinutes / 60);
  };

  const workHours = monthDays.reduce(
    (acc, day) => {
      const dateString = format(day, 'yyyy-MM-dd');
      const entry = scheduleEntries[dateString];
      
      if (!entry?.isWorkDay) return acc;
      
      const dayHours = calculateDayHours(entry.startTime, entry.endTime, entry.breakDuration);
      const isWeekendOrHoliday = isWeekend(day) || isRedDay(day);
      
      if (isWeekendOrHoliday) {
        acc.weekendHours += dayHours;
        acc.weekendDays += 1;
      } else {
        const regularHours = Math.min(dayHours, 8);
        const overtimeHours = Math.max(dayHours - 8, 0);
        
        acc.regularHours += regularHours;
        acc.overtimeHours += overtimeHours;
        acc.workDays += 1;
      }
      
      acc.totalHours += dayHours;
      return acc;
    },
    {
      regularHours: 0,
      weekendHours: 0,
      overtimeHours: 0,
      totalHours: 0,
      workDays: 0,
      weekendDays: 0,
    }
  );

  return workHours;
}

function calculateCommission(activities: ExtendedActivityLog[]) {
  const treatmentActivities = activities.filter(a => a.activity_type === 'treatment_completed');
  const productActivities = activities.filter(a => 
    a.activity_type === 'recommendation_purchased' && a.details?.sale_channel === 'inhouse'
  );
  const onlineActivities = activities.filter(a => 
    a.activity_type === 'recommendation_purchased' && a.details?.sale_channel === 'online'
  );

  const treatments = {
    amount: treatmentActivities.reduce((sum, a) => sum + ((a.details?.amount_cents || 0) / 100), 0),
    count: treatmentActivities.length,
    rate: COMMISSION_RATES.treatments,
  };
  
  const products = {
    amount: productActivities.reduce((sum, a) => sum + ((a.details?.amount_cents || 0) / 100), 0),
    count: productActivities.length,
    rate: COMMISSION_RATES.products,
  };
  
  const online = {
    amount: onlineActivities.reduce((sum, a) => sum + ((a.details?.amount_cents || 0) / 100), 0),
    count: onlineActivities.length,
    rate: COMMISSION_RATES.online,
  };

  return {
    treatments: {
      ...treatments,
      commission: treatments.amount * (treatments.rate / 100),
    },
    products: {
      ...products,
      commission: products.amount * (products.rate / 100),
    },
    online: {
      ...online,
      commission: online.amount * (online.rate / 100),
    },
    total: (treatments.amount * (treatments.rate / 100)) + 
           (products.amount * (products.rate / 100)) + 
           (online.amount * (online.rate / 100)),
  };
}

function calculateBonuses(activities: ExtendedActivityLog[], workHours: WorkHoursSummary) {
  // Performance bonus based on treatments
  const treatmentCount = activities.filter(a => a.activity_type === 'treatment_completed').length;
  const performanceBonus = treatmentCount >= 50 ? 5000 : treatmentCount >= 30 ? 2500 : 0;
  
  // Achievement bonus for hitting milestones
  const achievementBonus = workHours.totalHours >= 160 ? 1500 : 0;
  
  // Monthly bonus (fixed)
  const monthlyBonus = 3000;
  
  const bonuses = {
    performance: performanceBonus,
    achievement: achievementBonus,
    monthly: monthlyBonus,
    other: 0,
    total: performanceBonus + achievementBonus + monthlyBonus,
  };

  return bonuses;
}

export function generateCommissionEntries(activities: ExtendedActivityLog[]): CommissionEntry[] {
  const entries: CommissionEntry[] = [];
  
  activities.forEach(activity => {
    if (activity.activity_type === 'treatment_completed') {
      const amount = (activity.details?.amount_cents || 0) / 100;
      entries.push({
        date: activity.timestamp,
        type: 'treatment',
        description: `${activity.metadata?.service || 'Behandling'} - ${activity.target?.name || 'Kund'}`,
        baseAmount: amount,
        rate: COMMISSION_RATES.treatments,
        commission: amount * (COMMISSION_RATES.treatments / 100),
      });
    }
    
    if (activity.activity_type === 'recommendation_purchased') {
      const amount = (activity.details?.amount_cents || 0) / 100;
      const isOnline = activity.details?.sale_channel === 'online';
      const rate = isOnline ? COMMISSION_RATES.online : COMMISSION_RATES.products;
      
      entries.push({
        date: activity.timestamp,
        type: isOnline ? 'online' : 'product',
        description: `${activity.details?.item_name || 'Produkt'} - ${activity.target?.name || 'Kund'}`,
        baseAmount: amount,
        rate,
        commission: amount * (rate / 100),
      });
    }
  });
  
  return entries.sort((a, b) => b.date.getTime() - a.date.getTime());
}