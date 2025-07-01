import { Card, CardContent } from '@/components/ui/card';
import { Problem } from '@/types/problem';
import { AlertCircle } from 'lucide-react';

interface ProblemSummaryCardProps {
  problemsData: Problem[];
}

const ProblemSummaryCard = ({ problemsData }: ProblemSummaryCardProps) => {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900">Problemöversikt</h3>
            <p className="text-sm text-blue-800 mt-1">
              Du har totalt {problemsData.length} registrerade hudproblem. 
              {problemsData.filter(p => p.status === 'Löst').length > 0 && 
                ` ${problemsData.filter(p => p.status === 'Löst').length} problem är lösta.`
              }
              {problemsData.filter(p => p.hasLinkedTreatmentPlan).length > 0 && 
                ` ${problemsData.filter(p => p.hasLinkedTreatmentPlan).length} problem har aktiva behandlingsplaner.`
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProblemSummaryCard;