import { Accordion } from '@/components/ui/accordion';
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
  // Determine default expanded state: expand all if only 1 plan, collapse if multiple
  const defaultExpandedValue = treatmentPlans.length === 1 ? treatmentPlans[0].id.toString() : undefined;

  return (
    <Accordion 
      type="multiple" 
      defaultValue={defaultExpandedValue ? [defaultExpandedValue] : []}
      className="space-y-4"
    >
      {treatmentPlans.map((treatmentPlan) => (
        <TreatmentPlanItem
          key={treatmentPlan.id}
          treatmentPlan={treatmentPlan}
          onStartTreatment={onStartTreatment}
          onShowDetailedPlan={onShowDetailedPlan}
        />
      ))}
    </Accordion>
  );
};

export default TreatmentPlansList;