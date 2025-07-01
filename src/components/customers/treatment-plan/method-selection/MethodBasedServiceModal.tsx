
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TreatmentMethod } from '@/types/treatment-methods';
import { DetailedTreatmentRecommendation } from '@/types/consultation';

interface MethodBasedServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  method: TreatmentMethod | null;
  availableServices: DetailedTreatmentRecommendation[];
  onServiceSelect: (service: DetailedTreatmentRecommendation) => void;
}

export function MethodBasedServiceModal({
  isOpen,
  onClose,
  method,
  availableServices,
  onServiceSelect
}: MethodBasedServiceModalProps) {
  if (!method) return null;

  // Filter services based on the selected method
  const methodServices = availableServices.filter(service => 
    method.availableServices.some(methodService => 
      service.id.includes(methodService) || service.name.toLowerCase().includes(methodService)
    )
  );

  const handleServiceSelect = (service: DetailedTreatmentRecommendation) => {
    onServiceSelect(service);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="text-2xl">{method.icon}</span>
            <div>
              <div>Välj Behandling - {method.name}</div>
              <div className="text-sm font-normal text-gray-600">{method.description}</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {methodServices.length > 0 ? (
            methodServices.map(service => (
              <div
                key={service.id}
                className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                onClick={() => handleServiceSelect(service)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{service.name}</h4>
                    <Badge className="mt-1">{service.category}</Badge>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{service.price} kr</div>
                    <div className="text-sm text-gray-500">per behandling</div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Rekommenderade sessioner:</span>
                    <span className="ml-2">{service.sessions}</span>
                  </div>
                  <div>
                    <span className="font-medium">Frekvens:</span>
                    <span className="ml-2">{service.frequency}</span>
                  </div>
                </div>
                
                {service.availableHandpieces.length > 0 && (
                  <div className="mt-3">
                    <span className="text-xs font-medium text-gray-500">Tillgängliga handpieces:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {service.availableHandpieces.map(handpiece => (
                        <Badge key={handpiece} variant="outline" className="text-xs">
                          {handpiece}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              Inga behandlingar hittades för metoden {method.name}.
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Tillbaka
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
