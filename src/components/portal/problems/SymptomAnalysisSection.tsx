import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getProblemSeverityColor } from '@/utils/problemHelpers';
import { Problem } from '@/types/problem';
import { Droplets } from 'lucide-react';

interface SymptomAnalysisSectionProps {
  problem: Problem;
}

const SymptomAnalysisSection = ({ problem }: SymptomAnalysisSectionProps) => {
  return (
    <div className="border-t pt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Droplets className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">Symptomanalys</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {problem.symptoms.map((symptom) => (
          <div key={symptom.id} className="p-4 bg-muted/30 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">{symptom.name}</h4>
              <Badge 
                variant="outline" 
                className={getProblemSeverityColor(symptom.severity)}
              >
                {symptom.severity}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Svårighetsgrad</span>
                <span className="font-semibold">{symptom.score}%</span>
              </div>
              <Progress value={symptom.score} className="h-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SymptomAnalysisSection;