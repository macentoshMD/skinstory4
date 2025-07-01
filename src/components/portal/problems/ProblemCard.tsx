import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProblemStatusBadge from './ProblemStatusBadge';
import ProblemDetailsSection from './ProblemDetailsSection';
import SymptomAnalysisSection from './SymptomAnalysisSection';
import TreatmentPlanLinkSection from './TreatmentPlanLinkSection';
import ProblemImagesSection from './ProblemImagesSection';
import { getProblemSeverityColor } from '@/utils/problemHelpers';
import { Problem } from '@/types/problem';
import { AlertCircle } from 'lucide-react';

interface ProblemCardProps {
  problem: Problem;
  isMainProblem: boolean;
}

const ProblemCard = ({ problem, isMainProblem }: ProblemCardProps) => {
  return (
    <AccordionItem value={problem.id.toString()} className="border-0">
      <Card className="overflow-hidden">
        <AccordionTrigger className="hover:no-underline p-0">
          <CardHeader className="pb-4 w-full">
            <div className="flex items-start justify-between w-full">
              <div className="space-y-2 text-left">
                <CardTitle className="flex items-center gap-3">
                  {isMainProblem && (
                    <div className="p-1.5 rounded-lg bg-primary/10">
                      <AlertCircle className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  {problem.name}
                  <Badge className={getProblemSeverityColor(problem.severity)}>
                    {problem.severity}
                  </Badge>
                  <ProblemStatusBadge status={problem.status} />
                  {isMainProblem && (
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                      Huvudproblem
                    </Badge>
                  )}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{problem.description}</p>
                <p className="text-xs text-muted-foreground">{problem.type}</p>
              </div>
            </div>
          </CardHeader>
        </AccordionTrigger>

        <AccordionContent className="p-0">
          <CardContent className="space-y-6 pt-0">
            <ProblemDetailsSection problem={problem} />
            <SymptomAnalysisSection problem={problem} />
            
            {problem.hasLinkedTreatmentPlan && (
              <TreatmentPlanLinkSection />
            )}

            <ProblemImagesSection problem={problem} />
          </CardContent>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
};

export default ProblemCard;