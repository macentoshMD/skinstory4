
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Customer } from '@/types/customer';
import { SkinStoryTab } from './SkinStoryTab';

interface CustomerProfileTabsProps {
  customer: Customer;
}

export function CustomerProfileTabs({ customer }: CustomerProfileTabsProps) {
  return (
    <Tabs defaultValue="skin-story" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="skin-story">Skin Story</TabsTrigger>
        <TabsTrigger value="problem-tickets">Problem tickets</TabsTrigger>
        <TabsTrigger value="recommendation">Recommendation</TabsTrigger>
        <TabsTrigger value="contraindications">Contraindications</TabsTrigger>
        <TabsTrigger value="customer">Customer</TabsTrigger>
      </TabsList>
      
      <TabsContent value="skin-story" className="mt-6">
        <SkinStoryTab customer={customer} />
      </TabsContent>
      
      <TabsContent value="problem-tickets" className="mt-6">
        <div className="p-8 text-center text-gray-500">
          Problem tickets kommer här
        </div>
      </TabsContent>
      
      <TabsContent value="recommendation" className="mt-6">
        <div className="p-8 text-center text-gray-500">
          Rekommendationer kommer här
        </div>
      </TabsContent>
      
      <TabsContent value="contraindications" className="mt-6">
        <div className="p-8 text-center text-gray-500">
          Kontraindikationer kommer här
        </div>
      </TabsContent>
      
      <TabsContent value="customer" className="mt-6">
        <div className="p-8 text-center text-gray-500">
          Kunduppgifter kommer här
        </div>
      </TabsContent>
    </Tabs>
  );
}
