
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, MapPin } from 'lucide-react';
import { format, addWeeks } from 'date-fns';
import { sv } from 'date-fns/locale';
import { DetailedTreatmentRecommendation } from '@/types/consultation';
import { TreatmentMethod, ConfiguredTreatment, FollowUpAppointment } from '@/types/treatment-methods';

interface EnhancedServiceConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: DetailedTreatmentRecommendation | null;
  method: TreatmentMethod | null;
  onConfirm: (configuredTreatment: ConfiguredTreatment, followUps: FollowUpAppointment[]) => void;
}

export function EnhancedServiceConfigurationModal({
  isOpen,
  onClose,
  service,
  method,
  onConfirm
}: EnhancedServiceConfigurationModalProps) {
  const [selectedHandpiece, setSelectedHandpiece] = useState<string>('');
  const [numberOfSessions, setNumberOfSessions] = useState<number[]>([4]);
  const [intervalWeeks, setIntervalWeeks] = useState<number[]>([2]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date>();
  const [followUpType, setFollowUpType] = useState<'clinic' | 'online'>('clinic');
  const [evaluationType, setEvaluationType] = useState<'clinic' | 'online'>('clinic');

  useEffect(() => {
    if (service) {
      setSelectedHandpiece(service.availableHandpieces[0] || '');
      setNumberOfSessions([service.sessions]);
      setIntervalWeeks([2]);
      setSelectedAreas([]);
      setDiscount(0);
      setStartDate(new Date());
    }
  }, [service]);

  if (!service || !method) return null;

  const pricePerTreatment = service.price;
  const subtotal = pricePerTreatment * numberOfSessions[0];
  const discountAmount = subtotal * discount / 100;
  const totalPrice = subtotal - discountAmount;

  // Calculate end date and appointment dates
  const endDate = startDate ? addWeeks(startDate, numberOfSessions[0] * intervalWeeks[0]) : new Date();
  const followUpDate = endDate ? addWeeks(endDate, 2) : new Date();
  const evaluationDate = endDate ? addWeeks(endDate, 4) : new Date();

  const handleConfirm = () => {
    if (!startDate) return;

    const configuredTreatment: ConfiguredTreatment = {
      id: `configured-${service.id}-${Date.now()}`,
      methodId: method.id,
      serviceId: service.id,
      serviceName: service.name,
      configuration: {
        equipment: selectedHandpiece,
        parameters: {},
        areas: selectedAreas,
        sessionDates: [],
        completedSessions: 0,
        numberOfSessions: numberOfSessions[0],
        intervalWeeks: intervalWeeks[0]
      },
      pricing: {
        pricePerSession: pricePerTreatment,
        totalPrice,
        discount,
        discountAmount,
        subtotal
      }
    };

    const followUps: FollowUpAppointment[] = [
      {
        id: `followup-${Date.now()}`,
        date: followUpDate,
        type: followUpType,
        purpose: 'follow-up',
        notes: 'Kontroll av behandlingsresultat',
        completed: false
      },
      {
        id: `evaluation-${Date.now()}`,
        date: evaluationDate,
        type: evaluationType,
        purpose: 'evaluation',
        notes: 'Slutlig utvärdering av behandling',
        completed: false
      }
    ];

    onConfirm(configuredTreatment, followUps);
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="text-2xl">{method.icon}</span>
            <div>
              <div>Konfigurera Behandling</div>
              <div className="text-sm font-normal text-gray-600">{method.name} - {service.name}</div>
            </div>
          </DialogTitle>
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

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Equipment Selection */}
              {service.availableHandpieces.length > 0 && (
                <div>
                  <Label className="text-sm font-medium mb-2 block">Utrustning ({method.name})</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {service.availableHandpieces.map(handpiece => (
                      <button
                        key={handpiece}
                        onClick={() => setSelectedHandpiece(handpiece)}
                        className={`p-3 border rounded-lg text-sm transition-colors text-left ${
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
                <Label className="text-sm font-medium mb-2 block">
                  Antal sessioner: {numberOfSessions[0]}
                </Label>
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
                <Label className="text-sm font-medium mb-2 block">
                  Intervall: {intervalWeeks[0]} veckor
                </Label>
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

              {/* Start Date */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Startdatum</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, 'PPP', { locale: sv }) : 'Välj startdatum'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {startDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    Beräknat slutdatum: {format(endDate, 'PPP', { locale: sv })}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Treatment Areas */}
              {service.treatmentAreas.length > 0 && (
                <div>
                  <Label className="text-sm font-medium mb-2 block">Behandlingsområden</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {service.treatmentAreas.map(area => (
                      <div key={area} className="flex items-center space-x-2">
                        <Checkbox
                          id={area}
                          checked={selectedAreas.includes(area)}
                          onCheckedChange={() => handleAreaToggle(area)}
                        />
                        <Label htmlFor={area} className="text-sm">{area}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Discount */}
              <div>
                <Label htmlFor="discount" className="text-sm font-medium mb-2 block">
                  Rabatt (%)
                </Label>
                <Input
                  id="discount"
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Math.max(0, Math.min(100, Number(e.target.value))))}
                  min="0"
                  max="100"
                  placeholder="0"
                />
              </div>

              {/* Follow-up Booking */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Uppföljning</Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">
                      {startDate ? format(followUpDate, 'PPP', { locale: sv }) : 'Välj startdatum först'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={followUpType === 'clinic' ? 'default' : 'outline'}
                      onClick={() => setFollowUpType('clinic')}
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      Klinik
                    </Button>
                    <Button
                      size="sm"
                      variant={followUpType === 'online' ? 'default' : 'outline'}
                      onClick={() => setFollowUpType('online')}
                    >
                      Online
                    </Button>
                  </div>
                </div>
              </div>

              {/* Evaluation Booking */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Utvärdering</Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">
                      {startDate ? format(evaluationDate, 'PPP', { locale: sv }) : 'Välj startdatum först'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={evaluationType === 'clinic' ? 'default' : 'outline'}
                      onClick={() => setEvaluationType('clinic')}
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      Klinik
                    </Button>
                    <Button
                      size="sm"
                      variant={evaluationType === 'online' ? 'default' : 'outline'}
                      onClick={() => setEvaluationType('online')}
                    >
                      Online
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium mb-3">Prissammanfattning</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Pris per behandling:</span>
                <span>{pricePerTreatment.toLocaleString('sv-SE')} kr</span>
              </div>
              <div className="flex justify-between">
                <span>{numberOfSessions[0]} sessioner à {pricePerTreatment.toLocaleString('sv-SE')} kr:</span>
                <span>{subtotal.toLocaleString('sv-SE')} kr</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Rabatt ({discount}%):</span>
                  <span>-{discountAmount.toLocaleString('sv-SE')} kr</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-bold text-base">
                <span>Totalt:</span>
                <span>{totalPrice.toLocaleString('sv-SE')} kr</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Avbryt
          </Button>
          <Button onClick={handleConfirm} disabled={!startDate}>
            Skapa Behandlingsplan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
