
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
