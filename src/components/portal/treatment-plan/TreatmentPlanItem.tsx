import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TreatmentTimeline from '@/components/portal/TreatmentTimeline';
import TreatmentOverviewCard from './TreatmentOverviewCard';
import ClinicCareCard from './ClinicCareCard';
import HomeCareCard from './HomeCareCard';
import TreatmentStatusBadge from './TreatmentStatusBadge';
import { getSeverityColor, getButtonTextForStatus } from '@/utils/treatmentPlanHelpers';
import { TreatmentPlan } from '@/types/treatment-plan';
import { Calendar, Zap, TrendingUp } from 'lucide-react';

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
      <Card className="overflow-hidden">
        <AccordionTrigger className="hover:no-underline p-0">
          <CardHeader className="pb-4 w-full">
            <div className="flex items-start justify-between w-full">
              <div className="space-y-2 text-left">
                <CardTitle className="flex items-center gap-3">
                  {treatmentPlan.problem.name}
                  <Badge className={getSeverityColor(treatmentPlan.problem.severity)}>
                    {treatmentPlan.problem.severity}
                  </Badge>
                  <TreatmentStatusBadge status={treatmentPlan.treatmentStatus} />
                </CardTitle>
                <p className="text-sm text-muted-foreground">{treatmentPlan.problem.description}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">
                  {treatmentPlan.plan.expectedResults}
                </span>
              </div>
            </div>
          </CardHeader>
        </AccordionTrigger>

        <AccordionContent className="p-0">
          <CardContent className="space-y-6 pt-0">
            <TreatmentOverviewCard plan={treatmentPlan.plan} />
            
            <ClinicCareCard 
              treatments={treatmentPlan.clinicCare.treatments}
              totalSessions={treatmentPlan.clinicCare.totalSessions}
              schedule={treatmentPlan.clinicCare.schedule}
            />

            <HomeCareCard 
              productPackages={treatmentPlan.homeCare.productPackages}
              methods={treatmentPlan.homeCare.methods}
              instructions={treatmentPlan.homeCare.instructions}
            />

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
          </CardContent>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
};

export default TreatmentPlanItem;