
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Customer } from '@/types/customer';

interface SkinStoryTabProps {
  customer: Customer;
}

export function SkinStoryTab({ customer }: SkinStoryTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Skin Story</h2>
        <Button size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Lägg till
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Current activity - 1</h3>
        
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-center min-w-[80px] min-h-[80px]">
                  <span className="text-2xl font-bold text-gray-600">
                    {new Date(customer.lastActivity).getDate()}
                  </span>
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold">Skin Consultation</h4>
                  <p className="text-gray-600">Östermalm - {customer.userAssigned}</p>
                  <p className="text-gray-600">11:00 - 11:20</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-gray-600 text-white hover:bg-gray-700">
                  Create a ticket
                </Button>
                <Button variant="outline" size="sm" className="bg-gray-600 text-white hover:bg-gray-700">
                  Can't be completed
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
