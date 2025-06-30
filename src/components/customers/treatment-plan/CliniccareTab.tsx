
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TreatmentCard } from './TreatmentCard';
import { TreatmentRecommendation, TreatmentPlan } from '@/types/consultation';

interface CliniccareTabProps {
  treatmentPlan: TreatmentPlan;
  mockTreatments: TreatmentRecommendation[];
  onTreatmentToggle: (treatment: TreatmentRecommendation) => void;
}

export function CliniccareTab({ treatmentPlan, mockTreatments, onTreatmentToggle }: CliniccareTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Klinikvård - Behandlingsplan</span>
            <Badge variant="outline" className="bg-purple-50">
              Totalt: {treatmentPlan.totalClinicPrice} kr
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {mockTreatments.map(treatment => (
              <TreatmentCard
                key={treatment.id}
                treatment={treatment}
                isSelected={treatmentPlan.cliniccare.treatments.some(t => t.id === treatment.id)}
                onToggle={() => onTreatmentToggle(treatment)}
              />
            ))}
          </div>

          <Separator />

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Behandlingsschema</h4>
              <p className="text-sm text-gray-700">{treatmentPlan.cliniccare.schedule}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Uppföljning</h4>
              <p className="text-sm text-gray-700">{treatmentPlan.cliniccare.followUp}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
