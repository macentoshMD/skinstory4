import { ExtendedActivityLog } from '@/types/activity';

export interface EmployeeStats {
  // Core metrics
  totalTreatments: number;
  totalConsultations: number;
  totalSales: number;
  totalRevenue: number;
  activeCustomers: number;
  totalCustomers: number;
  noShows: number;
  
  // Treatment breakdowns
  treatmentsByType: { [key: string]: number };
  problemsHandled: { [key: string]: number };
  brandsWorkedWith: { [key: string]: number };
  
  // Performance metrics
  conversionRate: number;
  averageOrderValue: number;
  customerSatisfaction: number;
  
  // Time periods
  thisMonth: {
    treatments: number;
    consultations: number;
    sales: number;
    revenue: number;
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
  { type: 'Chemical Peel', levels: [20, 50, 125, 250], name: 'Peel Specialist' },
];

const salesAchievements = [
  { levels: [10000, 25000, 50000, 100000], name: 'Sales Champion' },
  { levels: [5000, 15000, 35000, 75000], name: 'Revenue Builder' },
];

export function generateEmployeeStats(activities: ExtendedActivityLog[]): EmployeeStats {
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  // Core metrics
  const treatmentActivities = activities.filter(a => a.activity_type === 'treatment_completed');
  const consultationActivities = activities.filter(a => a.activity_type === 'consultation_completed');
  const salesActivities = activities.filter(a => a.activity_type === 'recommendation_purchased');
  const noShowActivities = activities.filter(a => a.activity_type === 'booking_no_show');
  
  const totalRevenue = activities
    .filter(a => ['treatment_completed', 'recommendation_purchased'].includes(a.activity_type))
    .reduce((sum, a) => sum + ((a.details?.amount_cents || 0) / 100), 0);
  
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
  salesActivities.forEach(activity => {
    const brand = activity.details?.product_category || activity.metadata?.company || 'Diverse';
    brandsWorkedWith[brand] = (brandsWorkedWith[brand] || 0) + 1;
  });
  
  // This month metrics
  const thisMonthActivities = activities.filter(a => new Date(a.timestamp) >= thisMonth);
  const thisMonthTreatments = thisMonthActivities.filter(a => a.activity_type === 'treatment_completed').length;
  const thisMonthConsultations = thisMonthActivities.filter(a => a.activity_type === 'consultation_completed').length;
  const thisMonthSales = thisMonthActivities.filter(a => a.activity_type === 'recommendation_purchased').length;
  const thisMonthRevenue = thisMonthActivities
    .filter(a => ['treatment_completed', 'recommendation_purchased'].includes(a.activity_type))
    .reduce((sum, a) => sum + ((a.details?.amount_cents || 0) / 100), 0);
  
  // Customer metrics
  const uniqueCustomers = new Set(activities.map(a => a.target?.name)).size;
  const activeCustomers = new Set(
    activities
      .filter(a => new Date(a.timestamp) >= new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000))
      .map(a => a.target?.name)
  ).size;
  
  // Generate achievements
  const achievements = generateAchievements(treatmentsByType, totalRevenue, treatmentActivities.length);
  const nextMilestones = generateNextMilestones(treatmentsByType, totalRevenue, treatmentActivities.length);
  
  return {
    totalTreatments: treatmentActivities.length,
    totalConsultations: consultationActivities.length,
    totalSales: salesActivities.length,
    totalRevenue,
    activeCustomers,
    totalCustomers: uniqueCustomers,
    noShows: noShowActivities.length,
    treatmentsByType,
    problemsHandled,
    brandsWorkedWith,
    conversionRate: consultationActivities.length > 0 ? (treatmentActivities.length / consultationActivities.length) * 100 : 0,
    averageOrderValue: salesActivities.length > 0 ? totalRevenue / salesActivities.length : 0,
    customerSatisfaction: 4.2 + Math.random() * 0.6, // Mock satisfaction score
    thisMonth: {
      treatments: thisMonthTreatments,
      consultations: thisMonthConsultations,
      sales: thisMonthSales,
      revenue: thisMonthRevenue,
    },
    achievements,
    nextMilestones,
  };
}

function generateAchievements(treatmentsByType: { [key: string]: number }, revenue: number, totalTreatments: number): Achievement[] {
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
  salesAchievements.forEach(achievementType => {
    achievementType.levels.forEach((level, index) => {
      if (revenue >= level) {
        const levelNames = ['bronze', 'silver', 'gold', 'platinum'] as const;
        achievements.push({
          id: `sales-${level}`,
          title: `${achievementType.name} ${levelNames[index]}`,
          description: `${level.toLocaleString()} kr i försäljning`,
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

function generateNextMilestones(treatmentsByType: { [key: string]: number }, revenue: number, totalTreatments: number): Milestone[] {
  const milestones: Milestone[] = [];
  
  // Treatment milestones
  treatmentAchievements.forEach(achievementType => {
    const current = treatmentsByType[achievementType.type] || 0;
    const nextLevel = achievementType.levels.find(level => level > current);
    if (nextLevel) {
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
      reward: 'Försäljningsbonus',
    });
  }
  
  return milestones.slice(0, 4); // Show top 4 upcoming milestones
}