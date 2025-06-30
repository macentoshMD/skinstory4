
import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateExtendedMockActivities } from '@/utils/mockActivityGenerator';
import { generateCustomersFromActivities } from '@/utils/customerDataGenerator';
import { CustomerProfileHeader } from '@/components/customers/CustomerProfileHeader';
import { CustomerProfileTabs } from '@/components/customers/CustomerProfileTabs';
import { DateRange } from '@/types/insights';

const CustomerProfile = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  console.log('CustomerProfile - customerId:', customerId);

  // Generate customers to find the specific one
  const dateRange: DateRange = {
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
    label: 'Senaste 30 dagarna'
  };
  
  const customers = useMemo(() => {
    const activities = generateExtendedMockActivities(dateRange);
    const generatedCustomers = generateCustomersFromActivities(activities);
    console.log('Generated customers:', generatedCustomers.length, generatedCustomers.map(c => ({ id: c.id, name: c.name })));
    return generatedCustomers;
  }, [dateRange]);

  const customer = customers.find(c => c.id.toString() === customerId);
  console.log('Found customer:', customer);

  if (!customer) {
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
            Tillbaka till kunder
          </Button>
        </div>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Kund hittades inte</h2>
          <p className="text-gray-600 mb-4">Kund-ID: {customerId}</p>
          <p className="text-gray-600 mb-6">Den begärda kunden kunde inte hittas i systemet.</p>
          <Button onClick={() => navigate('/kunder')}>
            Gå tillbaka till kundlistan
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Left sidebar with customer info */}
        <div className="w-80 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4 border-b border-gray-200">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/kunder')}
              className="flex items-center gap-2 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
          <CustomerProfileHeader customer={customer} />
        </div>

        {/* Right content area */}
        <div className="flex-1">
          <CustomerProfileTabs customer={customer} />
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
