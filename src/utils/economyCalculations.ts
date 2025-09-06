import { EmployeeEconomyData, TreatmentEconomyData, ConsumableEconomyData, NoShowData, EconomySummary } from '@/types/economy';
import { ExtendedActivityLog } from '@/types/activity';
import { SalaryData } from '@/types/salary';

// Salary constants from salary calculations
const HOURLY_RATES = {
  regular: 350,
  weekend: 525, // 1.5x regular
  overtime: 467, // 1.33x regular
};

export function calculateEmployeeEconomy(
  activities: ExtendedActivityLog[], 
  salaryData: SalaryData,
  employeeId: string,
  employeeName: string,
  position: string
): EmployeeEconomyData {
  // Calculate work hours from salary data
  const workHours = {
    regularHours: salaryData.baseSalary.regularHours,
    weekendHours: salaryData.baseSalary.weekendHours,
    overtimeHours: salaryData.baseSalary.overtimeHours,
    totalHours: salaryData.baseSalary.regularHours + salaryData.baseSalary.weekendHours + salaryData.baseSalary.overtimeHours,
    workDays: Math.ceil(salaryData.baseSalary.regularHours / 8), // Approximate work days
    weekendDays: Math.ceil(salaryData.baseSalary.weekendHours / 8),
  };

  // Filter activities for this employee
  const employeeActivities = activities.filter(activity => activity.actor.name === employeeName);

  // Calculate sales from activities
  const treatmentActivities = employeeActivities.filter(a => a.activity_type === 'treatment_completed');
  const productActivities = employeeActivities.filter(a => a.activity_type === 'order_created_b2c');
  const onlineActivities = employeeActivities.filter(a => a.activity_type === 'order_created_b2c' && a.details.sale_channel === 'online');

  const sales = {
    treatments: {
      revenue: treatmentActivities.reduce((sum, a) => sum + ((a.details.amount_cents || 0) / 100), 0),
      count: treatmentActivities.length,
    },
    products: {
      revenue: productActivities.reduce((sum, a) => sum + ((a.details.amount_cents || 0) / 100), 0),
      count: productActivities.length,
    },
    online: {
      revenue: onlineActivities.reduce((sum, a) => sum + ((a.details.amount_cents || 0) / 100), 0),
      count: onlineActivities.length,
    },
    totalRevenue: 0,
  };
  
  sales.totalRevenue = sales.treatments.revenue + sales.products.revenue;

  // Calculate costs
  const costs = {
    salary: salaryData.baseSalary.totalHourlyPay,
    benefits: salaryData.bonuses.total,
    commission: salaryData.commission.total,
    totalCost: salaryData.gross.total,
  };

  // Calculate profitability
  const contribution = sales.totalRevenue - costs.totalCost;
  const profitability = {
    contribution,
    margin: sales.totalRevenue > 0 ? (contribution / sales.totalRevenue) * 100 : 0,
  };

  return {
    employeeId,
    employeeName,
    position,
    workHours,
    sales,
    costs,
    profitability,
  };
}

export function calculateTreatmentEconomy(
  activities: ExtendedActivityLog[],
  treatmentName: string
): TreatmentEconomyData {
  const treatmentActivities = activities.filter(
    a => a.activity_type === 'treatment_completed' && a.details.treatment_type?.includes(treatmentName)
  );

  const sessionsCount = treatmentActivities.length;
  const totalRevenue = treatmentActivities.reduce((sum, a) => sum + ((a.details.amount_cents || 0) / 100), 0);
  const averagePrice = sessionsCount > 0 ? totalRevenue / sessionsCount : 0;

  // Estimated costs (these would come from real data in production)
  const estimatedMaterialCostPerSession = averagePrice * 0.15; // 15% of revenue
  const estimatedLaborCostPerSession = averagePrice * 0.35; // 35% of revenue
  const estimatedEquipmentCostPerSession = averagePrice * 0.05; // 5% of revenue

  const costs = {
    materials: sessionsCount * estimatedMaterialCostPerSession,
    labor: sessionsCount * estimatedLaborCostPerSession,
    equipment: sessionsCount * estimatedEquipmentCostPerSession,
    totalCosts: sessionsCount * (estimatedMaterialCostPerSession + estimatedLaborCostPerSession + estimatedEquipmentCostPerSession),
  };

  const grossProfit = totalRevenue - costs.totalCosts;
  const profitMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;

  return {
    treatmentId: treatmentName.toLowerCase().replace(/\s+/g, '-'),
    treatmentName,
    category: getCategoryFromTreatment(treatmentName),
    equipment: getEquipmentFromTreatment(treatmentName),
    brand: getBrandFromTreatment(treatmentName),
    statistics: {
      sessionsCount,
      totalRevenue,
      averagePrice,
    },
    costs,
    profitability: {
      grossProfit,
      profitMargin,
    },
  };
}

export function calculateConsumablesEconomy(
  activities: ExtendedActivityLog[],
  month: string
): ConsumableEconomyData {
  // Filter for product purchases/inventory activities
  const purchaseActivities = activities.filter(
    a => a.activity_type === 'order_created_b2b' || a.activity_type === 'order_delivered_b2b'
  );

  // Group by category
  const categoriesMap = new Map<string, {
    totalSpent: number;
    itemCount: number;
    suppliers: Map<string, number>;
  }>();

  purchaseActivities.forEach(activity => {
    const category = activity.details.product_category || 'Övrigt';
    if (!categoriesMap.has(category)) {
      categoriesMap.set(category, {
        totalSpent: 0,
        itemCount: 0,
        suppliers: new Map(),
      });
    }

    const categoryData = categoriesMap.get(category)!;
    categoryData.totalSpent += (activity.details.amount_cents || 0) / 100;
    categoryData.itemCount += 1;

    // Track suppliers (mock data)
    const supplier = 'Leverantör AB'; // This would come from real data
    categoryData.suppliers.set(supplier, (categoryData.suppliers.get(supplier) || 0) + ((activity.details.amount_cents || 0) / 100));
  });

  const purchases = Array.from(categoriesMap.entries()).map(([categoryName, data]) => {
    const totalSpent = data.totalSpent;
    const suppliers = Array.from(data.suppliers.entries())
      .map(([supplier, amount]) => ({
        supplier,
        amount,
        percentage: totalSpent > 0 ? (amount / totalSpent) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3); // Top 3 suppliers

    return {
      categoryId: categoryName.toLowerCase().replace(/\s+/g, '-'),
      categoryName,
      totalSpent,
      itemCount: data.itemCount,
      averageCost: data.itemCount > 0 ? totalSpent / data.itemCount : 0,
      topSuppliers: suppliers,
    };
  });

  const totalPurchases = purchases.reduce((sum, p) => sum + p.totalSpent, 0);

  return {
    month,
    purchases,
    totalPurchases,
  };
}

export function calculateEconomySummary(
  employeeData: EmployeeEconomyData[],
  treatmentData: TreatmentEconomyData[],
  noShows: NoShowData[]
): EconomySummary {
  const totalRevenue = employeeData.reduce((sum, emp) => sum + emp.sales.totalRevenue, 0);
  const totalCosts = employeeData.reduce((sum, emp) => sum + emp.costs.totalCost, 0);
  const grossProfit = totalRevenue - totalCosts;
  const profitMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;

  const treatmentSessions = treatmentData.reduce((sum, treatment) => sum + treatment.statistics.sessionsCount, 0);
  const noShowsValue = noShows.reduce((sum, noShow) => sum + noShow.treatmentValue, 0);

  return {
    totalRevenue,
    totalCosts,
    grossProfit,
    profitMargin,
    employeeCount: employeeData.length,
    treatmentSessions,
    noShowsTotal: noShows.length,
    noShowsValue,
  };
}

// Helper functions
function getCategoryFromTreatment(treatmentName: string): string {
  const name = treatmentName.toLowerCase();
  if (name.includes('laser')) return 'Laser';
  if (name.includes('microneedling')) return 'Microneedling';
  if (name.includes('hydrafacial')) return 'Ansiktsbehandling';
  if (name.includes('peeling')) return 'Peeling';
  if (name.includes('konsultation')) return 'Konsultation';
  return 'Övrigt';
}

function getEquipmentFromTreatment(treatmentName: string): string | undefined {
  const name = treatmentName.toLowerCase();
  if (name.includes('dermapen')) return 'DermaPen';
  if (name.includes('hydrafacial')) return 'HydraFacial MD';
  if (name.includes('laser')) return 'Laser System Pro';
  return undefined;
}

function getBrandFromTreatment(treatmentName: string): string | undefined {
  const name = treatmentName.toLowerCase();
  if (name.includes('hydrafacial')) return 'HydraFacial';
  if (name.includes('dermapen')) return 'DermaPen';
  return undefined;
}