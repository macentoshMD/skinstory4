
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Home, Building2 } from 'lucide-react';
import { TreatmentPlan } from '@/types/consultation';

interface TreatmentPlanCardProps {
  treatmentPlan?: TreatmentPlan;
}

export function TreatmentPlanCard({ treatmentPlan }: TreatmentPlanCardProps) {
  if (!treatmentPlan) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-indigo-600" />
          Behandlingsplan & Rekommendationer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Homecare */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Home className="h-4 w-4" />
              Hemmavård
            </h4>
            <div className="space-y-2 text-sm">
              <p>Morgonrutin: {treatmentPlan.homecare.morning.length} produkter</p>
              <p>Kvällsrutin: {treatmentPlan.homecare.evening.length} produkter</p>
              <p>Veckobehandlingar: {treatmentPlan.homecare.weekly.length} produkter</p>
              <Badge variant="outline" className="bg-green-50">
                Totalt: {treatmentPlan.totalHomecarePrice} kr
              </Badge>
            </div>
          </div>

          {/* Cliniccare */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Klinikvård
            </h4>
            <div className="space-y-2 text-sm">
              <p>Behandlingar: {treatmentPlan.cliniccare.treatments.length} st</p>
              <p>Schema: {treatmentPlan.cliniccare.schedule}</p>
              <p>Uppföljning: {treatmentPlan.cliniccare.followUp}</p>
              <Badge variant="outline" className="bg-purple-50">
                Totalt: {treatmentPlan.totalClinicPrice} kr
              </Badge>
            </div>
          </div>
        </div>

        {treatmentPlan.notes && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Behandlingsanteckningar:</h4>
            <p className="text-sm text-gray-700">{treatmentPlan.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
