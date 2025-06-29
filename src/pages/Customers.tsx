
import { useMemo } from "react";
import { EnhancedCustomerStats } from "@/components/customers/EnhancedCustomerStats";
import { EnhancedCustomerTable } from "@/components/customers/EnhancedCustomerTable";
import { AddCustomerDialog } from "@/components/customers/AddCustomerDialog";
import { generateExtendedMockActivities } from "@/utils/mockActivityGenerator";
import { generateCustomersFromActivities } from "@/utils/customerDataGenerator";
import { DateRange } from "@/types/insights";

const Customers = () => {
  // Generate activities for the last 30 days to get realistic customer data
  const dateRange: DateRange = {
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
    label: 'Senaste 30 dagarna'
  };
  
  const customers = useMemo(() => {
    const activities = generateExtendedMockActivities(dateRange);
    return generateCustomersFromActivities(activities);
  }, [dateRange]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kunder</h1>
          <p className="text-gray-600 mt-2">Hantera dina kunder och kundrelationer</p>
        </div>
        <AddCustomerDialog />
      </div>

      <EnhancedCustomerStats customers={customers} />
      <EnhancedCustomerTable customers={customers} />
    </div>
  );
};

export default Customers;
