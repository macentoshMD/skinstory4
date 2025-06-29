
import { useState } from "react";
import { CustomerStats } from "@/components/customers/CustomerStats";
import { CustomerTable } from "@/components/customers/CustomerTable";
import { AddCustomerDialog } from "@/components/customers/AddCustomerDialog";
import { generateExtendedMockActivities } from "@/utils/mockActivityGenerator";
import { DateRange } from "@/types/insights";

const Customers = () => {
  // Generate activities for the last 30 days to get realistic customer data
  const dateRange: DateRange = {
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
    label: 'Senaste 30 dagarna'
  };
  
  const activities = generateExtendedMockActivities(dateRange);
  
  // Extract unique customers from activities and calculate their stats
  const customerMap = new Map();
  
  activities.forEach(activity => {
    const customerName = activity.actor.type === 'customer' ? activity.actor.name : 
                        activity.target?.type === 'customer' ? activity.target.name : null;
    
    if (customerName && !customerMap.has(customerName)) {
      // Get customer activities
      const customerActivities = activities.filter(a => 
        (a.actor.type === 'customer' && a.actor.name === customerName) ||
        (a.target?.type === 'customer' && a.target.name === customerName)
      );
      
      // Calculate total value from payments
      const totalValue = customerActivities
        .filter(a => a.category === 'ekonomi' && a.details.amount_cents)
        .reduce((sum, a) => sum + (a.details.amount_cents || 0), 0);
      
      // Get latest activity
      const latestActivity = customerActivities.sort((a, b) => 
        b.timestamp.getTime() - a.timestamp.getTime()
      )[0];
      
      // Determine status based on activity patterns
      const hasRecentBooking = customerActivities.some(a => 
        a.category === 'bokningar' && 
        a.timestamp.getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
      );
      
      const hasRecentPayment = customerActivities.some(a => 
        a.category === 'ekonomi' && 
        a.timestamp.getTime() > Date.now() - 14 * 24 * 60 * 60 * 1000
      );
      
      let status = 'Inaktiv';
      if (hasRecentBooking) status = 'Aktiv';
      else if (hasRecentPayment) status = 'Potentiell';
      
      customerMap.set(customerName, {
        id: customerMap.size + 1,
        name: customerName,
        company: activity.metadata.company,
        email: `${customerName.toLowerCase().replace(' ', '.')}@email.se`,
        phone: `+46 70 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 90) + 10}${Math.floor(Math.random() * 90) + 10}`,
        status: status,
        lastActivity: latestActivity.timestamp.toISOString().split('T')[0],
        value: totalValue > 0 ? `${(totalValue / 100).toLocaleString('sv-SE')} kr` : '0 kr'
      });
    }
  });
  
  const customers = Array.from(customerMap.values());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kunder</h1>
          <p className="text-gray-600 mt-2">Hantera dina kunder och kundrelationer</p>
        </div>
        <AddCustomerDialog />
      </div>

      <CustomerStats customers={customers} />
      <CustomerTable customers={customers} />
    </div>
  );
};

export default Customers;
