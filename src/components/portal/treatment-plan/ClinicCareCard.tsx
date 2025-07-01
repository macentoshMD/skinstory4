import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Clock, Target, Calendar, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ClinicTreatment } from '@/types/treatment-plan';

interface ClinicCareCardProps {
  treatments: ClinicTreatment[];
  totalSessions: number;
  schedule: string;
  onBookTreatment?: () => void;
}

const ClinicCareCard = ({ treatments, totalSessions, schedule, onBookTreatment }: ClinicCareCardProps) => {
  const totalClinicPrice = treatments.reduce((sum, treatment) => sum + (treatment.price * treatment.sessions), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-600" />
          Klinikvård
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {totalSessions} sessioner
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">

        {/* Treatments List */}
        <div className="space-y-3">
          {treatments.map(treatment => (
            <div key={treatment.id} className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-lg text-blue-900">{treatment.name}</h4>
                  <p className="text-sm text-blue-700">{treatment.method}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-blue-900">{treatment.price * treatment.sessions} kr</div>
                  <div className="text-xs text-blue-600">
                    {treatment.price} kr × {treatment.sessions} sessioner
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>

        {/* Schedule Information */}
        <div className="border-t pt-4">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold">Behandlingsschema</h4>
              <p className="text-sm text-muted-foreground mt-1">{schedule}</p>
            </div>
          </div>
        </div>

        {/* Price Summary & Actions */}
        <div className="border-t pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Totalt klinikvård:</span>
            <span className="text-xl font-bold text-blue-600">{totalClinicPrice.toLocaleString('sv-SE')} kr</span>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => onBookTreatment?.()}>
              <Calendar className="h-4 w-4 mr-2" />
              Boka
            </Button>
            <Button variant="outline" className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50">
              <Info className="h-4 w-4 mr-2" />
              Info
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicCareCard;