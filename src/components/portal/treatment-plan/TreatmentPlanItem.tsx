import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TreatmentTimeline from '@/components/portal/TreatmentTimeline';
import ProblemDescriptionCard from './ProblemDescriptionCard';
import TreatmentOverviewCard from './TreatmentOverviewCard';
import TreatmentStatusBadge from './TreatmentStatusBadge';
import { getSeverityColor, getButtonTextForStatus } from '@/utils/treatmentPlanHelpers';
import { TreatmentPlan } from '@/types/treatment-plan';
import { Calendar, Zap } from 'lucide-react';

interface TreatmentPlanItemProps {
  treatmentPlan: TreatmentPlan;
  onStartTreatment: (problemId: number) => void;
  onShowDetailedPlan: (problemId: number) => void;
}

const TreatmentPlanItem = ({ 
  treatmentPlan, 
  onStartTreatment, 
  onShowDetailedPlan 
}: TreatmentPlanItemProps) => {
  return (
    <AccordionItem value={treatmentPlan.id.toString()} className="border-0">
      <div className="space-y-6">
        <AccordionTrigger className="hover:no-underline p-0">
          <div className="w-full text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900">
                  {treatmentPlan.problem.name}
                </h2>
                <Badge className={getSeverityColor(treatmentPlan.problem.severity)}>
                  {treatmentPlan.problem.severity}
                </Badge>
                <TreatmentStatusBadge status={treatmentPlan.treatmentStatus} />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{treatmentPlan.problem.description}</p>
          </div>
        </AccordionTrigger>

        <AccordionContent className="p-0">
          <div className="space-y-6">
            <ProblemDescriptionCard 
              problem={treatmentPlan.problem}
              goals={treatmentPlan.goals}
            />

            <TreatmentOverviewCard plan={treatmentPlan.plan} />

            <TreatmentTimeline />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                onClick={() => onStartTreatment(treatmentPlan.id)}
                disabled={treatmentPlan.treatmentStatus === 'slutförd'}
              >
                <Zap className="h-5 w-5 mr-2" />
                {getButtonTextForStatus(treatmentPlan.treatmentStatus)}
              </Button>

              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50"
                onClick={() => onShowDetailedPlan(treatmentPlan.id)}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Visa detaljerad plan
              </Button>
            </div>
          </div>
        </AccordionContent>
      </div>
    </AccordionItem>
  );
};

export default TreatmentPlanItem;