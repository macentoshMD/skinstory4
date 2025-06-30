
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { DetailedTreatmentRecommendation } from '@/types/consultation';

interface ServiceConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: DetailedTreatmentRecommendation | null;
  onConfirm: (configuredService: DetailedTreatmentRecommendation) => void;
}

export function ServiceConfigurationModal({ 
  isOpen, 
  onClose, 
  service, 
  onConfirm 
}: ServiceConfigurationModalProps) {
  const [selectedHandpiece, setSelectedHandpiece] = useState<string>('');
  const [numberOfSessions, setNumberOfSessions] = useState<number[]>([4]);
  const [intervalWeeks, setIntervalWeeks] = useState<number[]>([2]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  useEffect(() => {
    if (service) {
      setSelectedHandpiece(service.availableHandpieces[0] || '');
      setNumberOfSessions([service.sessions]);
      setIntervalWeeks([2]);
      setSelectedAreas([]);
    }
  }, [service]);

  if (!service) return null;

  const totalPrice = service.price * numberOfSessions[0];

  const handleConfirm = () => {
    const configuredService: DetailedTreatmentRecommendation = {
      ...service,
      configuration: {
        selectedHandpiece,
        numberOfSessions: numberOfSessions[0],
        intervalWeeks: intervalWeeks[0],
        selectedAreas,
        totalPrice
      }
    };
    onConfirm(configuredService);
    onClose();
  };

  const handleAreaToggle = (area: string) => {
    setSelectedAreas(prev => 
      prev.includes(area) 
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Konfigurera Behandling</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Info */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{service.name}</h3>
              <Badge>{service.category}</Badge>
            </div>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>

          {/* Handpiece Selection */}
          {service.availableHandpieces.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Handpiece</label>
              <div className="grid grid-cols-2 gap-2">
                {service.availableHandpieces.map(handpiece => (
                  <button
                    key={handpiece}
                    onClick={() => setSelectedHandpiece(handpiece)}
                    className={`p-3 border rounded-lg text-sm transition-colors ${
                      selectedHandpiece === handpiece
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {handpiece}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Number of Sessions */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Antal sessioner: {numberOfSessions[0]}
            </label>
            <Slider
              value={numberOfSessions}
              onValueChange={setNumberOfSessions}
              max={12}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>12</span>
            </div>
          </div>

          {/* Interval */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Intervall: {intervalWeeks[0]} veckor
            </label>
            <Slider
              value={intervalWeeks}
              onValueChange={setIntervalWeeks}
              max={8}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 vecka</span>
              <span>8 veckor</span>
            </div>
          </div>

          {/* Treatment Areas */}
          {service.treatmentAreas.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Behandlingsområden</label>
              <div className="grid grid-cols-2 gap-2">
                {service.treatmentAreas.map(area => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={area}
                      checked={selectedAreas.includes(area)}
                      onCheckedChange={() => handleAreaToggle(area)}
                    />
                    <label htmlFor={area} className="text-sm">{area}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {service.price} kr × {numberOfSessions[0]} sessioner
              </span>
              <span className="text-lg font-bold">{totalPrice} kr</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Avbryt
          </Button>
          <Button onClick={handleConfirm}>
            Bekräfta
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
