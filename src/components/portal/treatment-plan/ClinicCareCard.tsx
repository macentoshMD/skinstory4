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
      <CardContent className="space-y-4">
        {/* Quick Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">{totalSessions}</div>
            <p className="text-xs text-muted-foreground">Sessioner</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">{totalClinicPrice.toLocaleString('sv-SE')} kr</div>
            <p className="text-xs text-muted-foreground">Totalkostnad</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-lg font-bold text-purple-600">{treatments[0]?.interval || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">Intervall</p>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-lg font-bold text-orange-600">{treatments[0]?.areas.length || 0}</div>
            <p className="text-xs text-muted-foreground">Områden</p>
          </div>
        </div>

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
              
              <div className="flex flex-wrap gap-2">
                {treatment.areas.map(area => (
                  <Badge key={area} className="bg-blue-200 text-blue-800 text-xs">
                    {area}
                  </Badge>
                ))}
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