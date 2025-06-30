
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Stethoscope } from 'lucide-react';
import { DiagnosisData } from '@/types/consultation';

interface DiagnosisCardProps {
  diagnosisData: DiagnosisData;
}

export function DiagnosisCard({ diagnosisData }: DiagnosisCardProps) {
  const formatSymptoms = () => {
    return diagnosisData.symptoms.map(symptom => {
      const symptomName = symptom.symptomId.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      return `${symptomName} (${symptom.severity}/5)`;
    }).join(', ');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-green-600" />
          Diagnos & Problemanalys
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Identifierade hudproblem:</h4>
          <div className="flex flex-wrap gap-2">
            {diagnosisData.selectedProblems.map(problem => (
              <Badge key={problem} variant="outline" className="bg-blue-50">
                {problem}
              </Badge>
            ))}
          </div>
        </div>
        
        {diagnosisData.problemSubcategory && (
          <div>
            <h4 className="font-medium mb-2">Problemkategori:</h4>
            <Badge variant="outline" className="bg-purple-50">
              {diagnosisData.problemSubcategory}
            </Badge>
          </div>
        )}

        {diagnosisData.symptoms.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Identifierade symptom:</h4>
            <p className="text-sm text-gray-700">{formatSymptoms()}</p>
          </div>
        )}

        <div className="flex items-center gap-4">
          <div>
            <h4 className="font-medium">Hudpoäng:</h4>
            <div className="text-2xl font-bold text-blue-600">{diagnosisData.skinScore}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
