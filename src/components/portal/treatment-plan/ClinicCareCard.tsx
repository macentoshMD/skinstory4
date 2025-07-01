import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Clock, Target } from 'lucide-react';
import { ClinicTreatment } from '@/types/treatment-plan';

interface ClinicCareCardProps {
  treatments: ClinicTreatment[];
  totalSessions: number;
  schedule: string;
}

const ClinicCareCard = ({ treatments, totalSessions, schedule }: ClinicCareCardProps) => {
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
      <CardContent className="space-y-6">
        {/* Treatments List */}
        <div className="space-y-4">
          {treatments.map(treatment => (
            <div key={treatment.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{treatment.name}</h4>
                  <p className="text-sm text-muted-foreground">{treatment.method}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{treatment.price * treatment.sessions} kr</div>
                  <div className="text-sm text-muted-foreground">
                    {treatment.price} kr × {treatment.sessions} sessioner
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Antal sessioner:</span>
                  <p className="text-muted-foreground">{treatment.sessions} st</p>
                </div>
                <div>
                  <span className="font-medium">Intervall:</span>
                  <p className="text-muted-foreground">{treatment.interval}</p>
                </div>
                <div>
                  <span className="font-medium">Utrustning:</span>
                  <p className="text-muted-foreground">{treatment.equipment}</p>
                </div>
              </div>

              <div>
                <span className="font-medium text-sm">Behandlingsområden:</span>
                <div className="flex gap-2 mt-1">
                  {treatment.areas.map(area => (
                    <Badge key={area} variant="secondary" className="text-xs">
                      {area}
                    </Badge>
                  ))}
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

        {/* Price Summary */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Totalt klinikvård:</span>
            <span className="text-xl font-bold text-blue-600">{totalClinicPrice.toLocaleString('sv-SE')} kr</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicCareCard;