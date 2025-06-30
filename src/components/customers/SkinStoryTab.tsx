
import { useState } from 'react';
import { Plus, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Customer } from '@/types/customer';
import { ConsultationFlow } from './ConsultationFlow';

interface SkinStoryTabProps {
  customer: Customer;
}

export function SkinStoryTab({ customer }: SkinStoryTabProps) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Get saved consultations for this customer
  const savedConsultations = JSON.parse(localStorage.getItem('customer-consultations') || '{}');
  const customerConsultations = savedConsultations[customer.id.toString()] || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Skin Story</h2>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            onClick={() => setIsConsultationOpen(true)}
          >
            <Play className="h-4 w-4" />
            Starta konsultation
          </Button>
          <Button size="sm" variant="outline" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Lägg till
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">
          Current activity - {customerConsultations.length > 0 ? customerConsultations.length : 1}
        </h3>
        
        {customerConsultations.length > 0 ? (
          <div className="space-y-4">
            {customerConsultations.map((consultation: any, index: number) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="bg-green-100 rounded-lg p-4 flex items-center justify-center min-w-[80px] min-h-[80px]">
                        <span className="text-2xl font-bold text-green-600">
                          {new Date(consultation.completedAt).getDate()}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold">Skin Consultation - Akne</h4>
                        <p className="text-gray-600">Östermalm - {customer.userAssigned}</p>
                        <p className="text-gray-600">
                          {new Date(consultation.completedAt).toLocaleDateString('sv-SE')} - 
                          {new Date(consultation.completedAt).toLocaleTimeString('sv-SE', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                        <div className="flex gap-2 mt-2">
                          {consultation.selectedAreas.map((areaId: string) => (
                            <span key={areaId} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {areaId}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="bg-gray-600 text-white hover:bg-gray-700">
                        Visa detaljer
                      </Button>
                      <Button variant="outline" size="sm" className="bg-gray-600 text-white hover:bg-gray-700">
                        Skapa behandlingsplan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
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
                    <p className="text-sm text-orange-600 font-medium">Väntar på att genomföras</p>
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
        )}
      </div>

      <ConsultationFlow 
        isOpen={isConsultationOpen} 
        onClose={() => setIsConsultationOpen(false)}
        customerName={customer.name}
        customerId={customer.id.toString()}
      />
    </div>
  );
}
