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
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
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
  const [discount, setDiscount] = useState<number>(0);
  const [treatmentDate, setTreatmentDate] = useState<Date>();
  const [evaluationDate, setEvaluationDate] = useState<Date>();
  useEffect(() => {
    if (service) {
      setSelectedHandpiece(service.availableHandpieces[0] || '');
      setNumberOfSessions([service.sessions]);
      setIntervalWeeks([2]);
      setSelectedAreas([]);
      setDiscount(0);
      setTreatmentDate(undefined);
      setEvaluationDate(undefined);
    }
  }, [service]);
  if (!service) return null;
  const pricePerTreatment = service.price;
  const subtotal = pricePerTreatment * numberOfSessions[0];
  const discountAmount = subtotal * discount / 100;
  const totalPrice = subtotal - discountAmount;
  const handleConfirm = () => {
    const configuredService: DetailedTreatmentRecommendation = {
      ...service,
      configuration: {
        selectedHandpiece,
        numberOfSessions: numberOfSessions[0],
        intervalWeeks: intervalWeeks[0],
        selectedAreas,
        totalPrice,
        discount,
        treatmentDate,
        evaluationDate,
        pricePerTreatment,
        subtotal,
        discountAmount
      }
    };
    onConfirm(configuredService);
    onClose();
  };
  const handleAreaToggle = (area: string) => {
    setSelectedAreas(prev => prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]);
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Handpiece Selection */}
              {service.availableHandpieces.length > 0 && <div>
                  <Label className="text-sm font-medium mb-2 block">Handpiece</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {service.availableHandpieces.map(handpiece => <button key={handpiece} onClick={() => setSelectedHandpiece(handpiece)} className={`p-3 border rounded-lg text-sm transition-colors text-left ${selectedHandpiece === handpiece ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'}`}>
                        {handpiece}
                      </button>)}
                  </div>
                </div>}

              {/* Number of Sessions */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Antal sessioner: {numberOfSessions[0]}
                </Label>
                <Slider value={numberOfSessions} onValueChange={setNumberOfSessions} max={12} min={1} step={1} className="w-full" />
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
                <Slider value={intervalWeeks} onValueChange={setIntervalWeeks} max={8} min={1} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 vecka</span>
                  <span>8 veckor</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Treatment Areas */}
              {service.treatmentAreas.length > 0 && <div>
                  <Label className="text-sm font-medium mb-2 block">Behandlingsområden</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {service.treatmentAreas.map(area => <div key={area} className="flex items-center space-x-2">
                        <Checkbox id={area} checked={selectedAreas.includes(area)} onCheckedChange={() => handleAreaToggle(area)} />
                        <Label htmlFor={area} className="text-sm">{area}</Label>
                      </div>)}
                  </div>
                </div>}

              {/* Discount */}
              <div>
                <Label htmlFor="discount" className="text-sm font-medium mb-2 block">
                  Rabatt (%)
                </Label>
                <Input id="discount" type="number" value={discount} onChange={e => setDiscount(Math.max(0, Math.min(100, Number(e.target.value))))} min="0" max="100" placeholder="0" />
              </div>

              {/* Treatment Booking Date */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Uppföljning</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {treatmentDate ? format(treatmentDate, 'PPP', {
                      locale: sv
                    }) : 'Välj datum'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={treatmentDate} onSelect={setTreatmentDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Evaluation Booking Date */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Utvärdering</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {evaluationDate ? format(evaluationDate, 'PPP', {
                      locale: sv
                    }) : 'Välj datum'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={evaluationDate} onSelect={setEvaluationDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium mb-3">Prissammanfattning</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Pris per behandling:</span>
                <span>{pricePerTreatment} kr</span>
              </div>
              <div className="flex justify-between">
                <span>{numberOfSessions[0]} sessioner à {pricePerTreatment} kr:</span>
                <span>{subtotal} kr</span>
              </div>
              {discount > 0 && <div className="flex justify-between text-green-600">
                  <span>Rabatt ({discount}%):</span>
                  <span>-{discountAmount} kr</span>
                </div>}
              <div className="border-t pt-2 flex justify-between font-bold text-base">
                <span>Totalt:</span>
                <span>{totalPrice} kr</span>
              </div>
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
    </Dialog>;
}