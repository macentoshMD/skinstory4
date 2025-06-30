
import { Plus, Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Customer } from '@/types/customer';

interface SkinStoryTabProps {
  customer: Customer;
}

export function SkinStoryTab({ customer }: SkinStoryTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Skin Story</h2>
        <Button size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Lägg till
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Current activity - 1</h3>
        
        <Card className="border border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-medium">Skin Consultation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Datum:</span>
                <span className="font-medium">{customer.lastActivity}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Tid:</span>
                <span className="font-medium">10:30</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Specialist:</span>
                <span className="font-medium">{customer.userAssigned}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  Create a ticket
                </Button>
                <Button variant="outline" size="sm">
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
