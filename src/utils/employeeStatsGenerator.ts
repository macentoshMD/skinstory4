import { ExtendedActivityLog } from '@/types/activity';

export interface Order {
  date: Date;
  orderId: string;
  item: string;
  brand: string;
  amount: number;
  commission: number;
  status: 'Beställd' | 'På väg' | 'Mottagen';
  channel: 'online' | 'inhouse';
}

export interface EmployeeStats {
  // Core metrics
  totalTreatments: number;
  totalConsultations: number;
  totalSales: number;
  totalRevenue: number;
  activeCustomers: number;
  totalCustomers: number;
  noShows: number;
  
  // Sales breakdown
  sales: {
    inhouseProducts: number;
    onlineProducts: number;
    total: number;
  };
  
  // Commission tracking
  commission: {
    total: number;
    entries: number;
  };
  
  // Orders and counts
  orders: Order[];
  counts: {
    treatments: number;
    consultations: number;
    recommendationsGiven: number;
    recommendationsPurchased: number;
    noShows: number;
    activePlanCustomers: number;
    aftercareCustomers: number;
    onlineOrders: number;
  };
  
  // Problem solving with proof
  problemsSolvedWithProof: number;
  
  // Treatment breakdowns
  treatmentsByType: { [key: string]: number };
  problemsHandled: { [key: string]: number };
  brandsWorkedWith: { [key: string]: number };
  
  // Performance metrics
  conversionRate: number;
  averageOrderValue: number;
  customerSatisfaction: number;
  recommendationConversion: number;
  
  // Ranking
  ranking: {
    position: number;
    outOf: number;
  };
  
  // Time periods
  thisMonth: {
    treatments: number;
    consultations: number;
    sales: number;
    revenue: number;
    commission: number;
  };
  
  thisYear: {
    treatments: number;
    consultations: number;
    sales: number;
    revenue: number;
    commission: number;
  };
  
  // Achievements and milestones
  achievements: Achievement[];
  nextMilestones: Milestone[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'treatment' | 'sales' | 'customer' | 'expertise' | 'special';
  earnedDate: Date;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  category: 'treatment' | 'sales' | 'customer' | 'expertise';
  current: number;
  target: number;
  reward: string;
}

const treatmentAchievements = [
  { type: 'Dermapen', levels: [50, 100, 250, 500], name: 'Dermapen Specialist' },
  { type: 'Laser', levels: [25, 50, 150, 300], name: 'Laser Expert' },
  { type: 'IPL', levels: [30, 75, 200, 400], name: 'IPL Master' },
  { type: 'HydraFacial', levels: [40, 100, 250, 500], name: 'HydraFacial Pro' },
  { type: 'Chemical Peeling', levels: [20, 50, 125, 250], name: 'Peel Specialist' },
  { type: 'Microneedling', levels: [30, 80, 200, 400], name: 'Microneedling Pro' },
];

const salesAchievements = [
  { levels: [10000, 25000, 50000, 100000], name: 'Försäljningsmästare' },
  { levels: [5000, 15000, 35000, 75000], name: 'Intäktsbyggare' },
  { levels: [50, 100, 250, 500], name: 'Online-ordrar Champion' },
];

export function generateEmployeeStats(activities: ExtendedActivityLog[]): EmployeeStats {
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisYear = new Date(now.getFullYear(), 0, 1);
  
  // Core activities
  const treatmentActivities = activities.filter(a => a.activity_type === 'treatment_completed');
  const consultationActivities = activities.filter(a => a.activity_type === 'consultation_completed');
  const salesActivities = activities.filter(a => a.activity_type === 'recommendation_purchased');
  const paymentActivities = activities.filter(a => a.activity_type.startsWith('payment_'));
  const noShowActivities = activities.filter(a => a.activity_type === 'booking_no_show');
  
  // Recommendation activities
  const recommendationGivenActivities = activities.filter(a => 
    a.activity_type === 'recommendation_given_product' || a.activity_type === 'recommendation_given_treatment'
  );
  
  // Problem solved with proof
  const problemsSolvedWithProof = activities.filter(a => 
    a.activity_type === 'problem_solved' && a.details?.has_before_after_photos === true
  ).length;
  
  // Sales breakdown
  const inhouseProducts = paymentActivities
    .filter(a => a.details?.sale_channel === 'inhouse')
    .reduce((sum, a) => sum + ((a.details?.amount_cents || 0) / 100), 0);
  
  const onlineProducts = salesActivities
    .filter(a => a.details?.sale_channel === 'online')
    .reduce((sum, a) => sum + ((a.details?.amount_cents || 0) / 100), 0);
  
  const totalSalesValue = inhouseProducts + onlineProducts;
  
  // Commission tracking
  const commissionActivities = activities.filter(a => a.details?.commission_cents);
  const totalCommission = commissionActivities
    .reduce((sum, a) => sum + ((a.details?.commission_cents || 0) / 100), 0);
  
  // Orders
  const orders: Order[] = [];
  salesActivities.forEach(activity => {
    if (activity.details?.order_id && activity.details?.sale_channel) {
      orders.push({
        date: activity.timestamp,
        orderId: activity.details.order_id,
        item: activity.details.item_name || activity.target?.name || 'Okänd produkt',
        brand: activity.details.brand || 'Okänt varumärke',
        amount: (activity.details.amount_cents || 0) / 100,
        commission: (activity.details.commission_cents || 0) / 100,
        status: activity.details.order_status || 'Beställd',
        channel: activity.details.sale_channel
      });
    }
  });
  
  // Customer status tracking
  const customerStatusActivities = activities.filter(a => a.activity_type.startsWith('customer_status_'));
  const activePlanCustomers = new Set(
    customerStatusActivities
      .filter(a => a.details?.new_value === 'under_treatment')
      .map(a => a.target?.name)
  ).size;
  
  const aftercareCustomers = new Set(
    customerStatusActivities
      .filter(a => a.details?.new_value === 'maintenance')
      .map(a => a.target?.name)
  ).size;
  
  // Treatment breakdown
  const treatmentsByType: { [key: string]: number } = {};
  treatmentActivities.forEach(activity => {
    const treatment = activity.details?.treatment_type || activity.metadata?.service || 'Okänd behandling';
    treatmentsByType[treatment] = (treatmentsByType[treatment] || 0) + 1;
  });
  
  // Problems handled
  const problemsHandled: { [key: string]: number } = {};
  consultationActivities.forEach(activity => {
    const problem = activity.details?.problem_category || 'Allmän konsultation';
    problemsHandled[problem] = (problemsHandled[problem] || 0) + 1;
  });
  
  // Brands worked with
  const brandsWorkedWith: { [key: string]: number } = {};
  [...salesActivities, ...paymentActivities].forEach(activity => {
    const brand = activity.details?.brand || activity.details?.product_category || 'Diverse';
    brandsWorkedWith[brand] = (brandsWorkedWith[brand] || 0) + 1;
  });
  
  // Time period metrics
  const thisMonthActivities = activities.filter(a => new Date(a.timestamp) >= thisMonth);
  const thisYearActivities = activities.filter(a => new Date(a.timestamp) >= thisYear);
  
  const thisMonthStats = calculatePeriodStats(thisMonthActivities);
  const thisYearStats = calculatePeriodStats(thisYearActivities);
  
  // Customer metrics
  const uniqueCustomers = new Set(activities.map(a => a.target?.name).filter(Boolean)).size;
  const activeCustomers = new Set(
    activities
      .filter(a => new Date(a.timestamp) >= new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000))
      .map(a => a.target?.name)
      .filter(Boolean)
  ).size;
  
  // Performance calculations
  const conversionRate = consultationActivities.length > 0 ? 
    (treatmentActivities.length / consultationActivities.length) * 100 : 0;
  
  const recommendationConversion = recommendationGivenActivities.length > 0 ?
    (salesActivities.length / recommendationGivenActivities.length) * 100 : 0;
  
  const averageOrderValue = orders.length > 0 ? 
    orders.reduce((sum, order) => sum + order.amount, 0) / orders.length : 0;
  
  // Mock ranking (stable seed based on performance)
  const performanceScore = treatmentActivities.length + (totalSalesValue / 1000) + (totalCommission / 100);
  const mockPosition = Math.max(1, Math.floor(performanceScore % 20) + 1);
  
  // Generate achievements and milestones
  const achievements = generateAchievements(treatmentsByType, totalSalesValue, treatmentActivities.length, orders.length);
  const nextMilestones = generateNextMilestones(treatmentsByType, totalSalesValue, treatmentActivities.length, orders.length);
  
  return {
    totalTreatments: treatmentActivities.length,
    totalConsultations: consultationActivities.length,
    totalSales: salesActivities.length,
    totalRevenue: treatmentActivities.reduce((sum, a) => sum + ((a.details?.amount_cents || 0) / 100), 0) + totalSalesValue,
    activeCustomers,
    totalCustomers: uniqueCustomers,
    noShows: noShowActivities.length,
    
    sales: {
      inhouseProducts,
      onlineProducts,
      total: totalSalesValue
    },
    
    commission: {
      total: totalCommission,
      entries: commissionActivities.length
    },
    
    orders,
    
    counts: {
      treatments: treatmentActivities.length,
      consultations: consultationActivities.length,
      recommendationsGiven: recommendationGivenActivities.length,
      recommendationsPurchased: salesActivities.length,
      noShows: noShowActivities.length,
      activePlanCustomers,
      aftercareCustomers,
      onlineOrders: orders.filter(o => o.channel === 'online').length
    },
    
    problemsSolvedWithProof,
    treatmentsByType,
    problemsHandled,
    brandsWorkedWith,
    
    conversionRate,
    recommendationConversion,
    averageOrderValue,
    customerSatisfaction: 4.2 + Math.random() * 0.6,
    
    ranking: {
      position: mockPosition,
      outOf: 25
    },
    
    thisMonth: thisMonthStats,
    thisYear: thisYearStats,
    
    achievements,
    nextMilestones,
  };
}

function calculatePeriodStats(activities: ExtendedActivityLog[]) {
  const treatments = activities.filter(a => a.activity_type === 'treatment_completed').length;
  const consultations = activities.filter(a => a.activity_type === 'consultation_completed').length;
  const sales = activities.filter(a => a.activity_type === 'recommendation_purchased').length;
  
  const revenue = activities
    .filter(a => ['treatment_completed', 'recommendation_purchased', 'payment_cash', 'payment_klarna', 'payment_card', 'payment_swish'].includes(a.activity_type))
    .reduce((sum, a) => sum + ((a.details?.amount_cents || 0) / 100), 0);
  
  const commission = activities
    .filter(a => a.details?.commission_cents)
    .reduce((sum, a) => sum + ((a.details?.commission_cents || 0) / 100), 0);
  
  return { treatments, consultations, sales, revenue, commission };
}

function generateAchievements(treatmentsByType: { [key: string]: number }, revenue: number, totalTreatments: number, totalOrders: number): Achievement[] {
  const achievements: Achievement[] = [];
  
  // Treatment achievements
  treatmentAchievements.forEach(achievementType => {
    const count = treatmentsByType[achievementType.type] || 0;
    achievementType.levels.forEach((level, index) => {
      if (count >= level) {
        const levelNames = ['bronze', 'silver', 'gold', 'platinum'] as const;
        achievements.push({
          id: `${achievementType.type}-${level}`,
          title: `${achievementType.name} ${levelNames[index]}`,
          description: `${level} ${achievementType.type} behandlingar genomförda`,
          icon: 'Award',
          category: 'treatment',
          earnedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
          level: levelNames[index],
        });
      }
    });
  });
  
  // Sales achievements
  salesAchievements.forEach((achievementType, typeIndex) => {
    achievementType.levels.forEach((level, index) => {
      let qualifies = false;
      let description = '';
      
      if (typeIndex === 0) { // Revenue based
        qualifies = revenue >= level;
        description = `${level.toLocaleString()} kr i försäljning`;
      } else if (typeIndex === 1) { // Revenue builder
        qualifies = revenue >= level;
        description = `${level.toLocaleString()} kr total intäkt`;
      } else if (typeIndex === 2) { // Online orders
        qualifies = totalOrders >= level;
        description = `${level} online-ordrar genomförda`;
      }
      
      if (qualifies) {
        const levelNames = ['bronze', 'silver', 'gold', 'platinum'] as const;
        achievements.push({
          id: `sales-${typeIndex}-${level}`,
          title: `${achievementType.name} ${levelNames[index]}`,
          description,
          icon: 'TrendingUp',
          category: 'sales',
          earnedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
          level: levelNames[index],
        });
      }
    });
  });
  
  // Special achievements
  if (totalTreatments >= 100) {
    achievements.push({
      id: 'treatment-milestone-100',
      title: 'Behandlingsexpert',
      description: '100 behandlingar genomförda',
      icon: 'Star',
      category: 'special',
      earnedDate: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000),
      level: 'gold',
    });
  }
  
  return achievements.sort((a, b) => b.earnedDate.getTime() - a.earnedDate.getTime());
}

function generateNextMilestones(treatmentsByType: { [key: string]: number }, revenue: number, totalTreatments: number, totalOrders: number): Milestone[] {
  const milestones: Milestone[] = [];
  
  // Treatment milestones
  treatmentAchievements.forEach(achievementType => {
    const current = treatmentsByType[achievementType.type] || 0;
    const nextLevel = achievementType.levels.find(level => level > current);
    if (nextLevel && milestones.length < 2) {
      milestones.push({
        id: `${achievementType.type}-next`,
        title: `Nästa ${achievementType.name} nivå`,
        description: `Genomför ${nextLevel - current} till ${achievementType.type} behandlingar`,
        category: 'treatment',
        current,
        target: nextLevel,
        reward: 'Certifikat + badge',
      });
    }
  });
  
  // Revenue milestones
  const revenueTargets = [10000, 25000, 50000, 100000, 250000];
  const nextRevenueTarget = revenueTargets.find(target => target > revenue);
  if (nextRevenueTarget) {
    milestones.push({
      id: 'revenue-next',
      title: 'Försäljningsmål',
      description: `Nå ${nextRevenueTarget.toLocaleString()} kr i total försäljning`,
      category: 'sales',
      current: revenue,
      target: nextRevenueTarget,
      reward: 'Försäljningsbonus + provision',
    });
  }
  
  // Orders milestone
  const orderTargets = [50, 100, 250, 500];
  const nextOrderTarget = orderTargets.find(target => target > totalOrders);
  if (nextOrderTarget) {
    milestones.push({
      id: 'orders-next',
      title: 'Online-ordrar mål',
      description: `Genomför ${nextOrderTarget - totalOrders} till online-ordrar`,
      category: 'sales',
      current: totalOrders,
      target: nextOrderTarget,
      reward: 'Online-försäljningsbonus',
    });
  }
  
  return milestones.slice(0, 4); // Show top 4 upcoming milestones
}