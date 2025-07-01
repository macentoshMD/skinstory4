import TreatmentPlanItem from './TreatmentPlanItem';
import { TreatmentPlan } from '@/types/treatment-plan';

interface TreatmentPlansListProps {
  treatmentPlans: TreatmentPlan[];
  onStartTreatment: (problemId: number) => void;
  onShowDetailedPlan: (problemId: number) => void;
}

const TreatmentPlansList = ({ 
  treatmentPlans, 
  onStartTreatment, 
  onShowDetailedPlan 
}: TreatmentPlansListProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Dina behandlingsplaner</h2>
        <p className="text-gray-600 text-lg">Välj en behandlingsplan för att komma igång</p>
      </div>
      
      <div className="space-y-8">
        {treatmentPlans.map(plan => (
          <TreatmentPlanItem
            key={plan.id}
            treatmentPlan={plan}
            onStartTreatment={onStartTreatment}
            onShowDetailedPlan={onShowDetailedPlan}
          />
        ))}
      </div>
    </div>
  );
};

export default TreatmentPlansList;