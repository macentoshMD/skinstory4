
import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateExtendedMockActivities } from '@/utils/mockActivityGenerator';
import { generateCustomersFromActivities } from '@/utils/customerDataGenerator';
import { CustomerProfileTabs } from '@/components/customers/CustomerProfileTabs';
import { DateRange } from '@/types/insights';

const CustomerProfile = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  // Generate customers to find the specific one
  const dateRange: DateRange = {
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
    label: 'Senaste 30 dagarna'
  };
  
  const customers = useMemo(() => {
    const activities = generateExtendedMockActivities(dateRange);
    return generateCustomersFromActivities(activities);
  }, [dateRange]);

  const customer = customers.find(c => c.id.toString() === customerId);

  if (!customer) {
    return <div>Kund hittades inte</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/kunder')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Tillbaka
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
          <p className="text-gray-600">{customer.email} • {customer.phone}</p>
        </div>
      </div>

      <CustomerProfileTabs customer={customer} />
    </div>
  );
};

export default CustomerProfile;
