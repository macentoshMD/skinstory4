
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { DiagnosisData, PROBLEM_SUBCATEGORIES, PROBLEM_SYMPTOMS, SymptomSeverity, calculateSkinScore } from '@/types/consultation';
import { useEffect } from 'react';

interface ProblemDetailsStepProps {
  diagnosisData: DiagnosisData;
  onBack: () => void;
  onContinue: () => void;
  onSubcategoryChange: (subcategory: string) => void;
  onSymptomSeverityChange: (symptomId: string, severity: number) => void;
  onSkinScoreChange: (score: number) => void;
}

export function ProblemDetailsStep({
  diagnosisData,
  onBack,
  onContinue,
  onSubcategoryChange,
  onSymptomSeverityChange,
  onSkinScoreChange
}: ProblemDetailsStepProps) {
  const selectedProblem = diagnosisData.selectedProblems[0]; // Assuming single problem selection for now
  
  // Get subcategories for the selected problem
  const availableSubcategories = PROBLEM_SUBCATEGORIES.filter(
    sub => sub.parentProblemId === selectedProblem
  );
  
  // Get symptoms for the selected problem
  const availableSymptoms = PROBLEM_SYMPTOMS.filter(
    symptom => symptom.problemIds.includes(selectedProblem)
  );

  const getSymptomSeverity = (symptomId: string): number => {
    const symptom = diagnosisData.symptoms.find(s => s.symptomId === symptomId);
    return symptom?.severity || 0;
  };

  // Automatically calculate skin score when symptoms change
  useEffect(() => {
    const calculatedScore = calculateSkinScore(diagnosisData.symptoms);
    if (calculatedScore !== diagnosisData.skinScore) {
      onSkinScoreChange(calculatedScore);
    }
  }, [diagnosisData.symptoms, diagnosisData.skinScore, onSkinScoreChange]);

  const isFormValid = () => {
    return diagnosisData.problemSubcategory && 
           diagnosisData.symptoms.length > 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Tillbaka
        </Button>
        
        <div className="flex-1 mx-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
          </div>
        </div>
        
        <Button 
          onClick={onContinue} 
          disabled={!isFormValid()}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Nästa
        </Button>
      </div>

      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Problem Detaljer</h2>
        <p className="text-gray-600">Ge mer detaljerad information om det valda problemet</p>
      </div>

      {/* Problem Subcategory */}
      {availableSubcategories.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Problemtyp</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {availableSubcategories.map((subcategory) => (
              <Card 
                key={subcategory.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  diagnosisData.problemSubcategory === subcategory.id 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onSubcategoryChange(subcategory.id)}
              >
                <CardContent className="p-4 text-center">
                  <h4 className="font-medium text-sm">{subcategory.name}</h4>
                  {diagnosisData.problemSubcategory === subcategory.id && (
                    <div className="mt-2">
                      <div className="w-5 h-5 bg-blue-500 rounded-full mx-auto flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Symptoms */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Symptom & Svårighetsgrad</h3>
        <p className="text-gray-600 text-sm">Välj symptom och betygsätt svårighetsgraden från 1-5</p>
        <div className="space-y-4 max-w-4xl mx-auto">
          {availableSymptoms.map((symptom) => (
            <Card key={symptom.id} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">{symptom.name}</Label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((severity) => (
                      <button
                        key={severity}
                        onClick={() => onSymptomSeverityChange(symptom.id, severity)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors ${
                          getSymptomSeverity(symptom.id) === severity
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'border-gray-300 hover:border-blue-300'
                        }`}
                      >
                        {severity}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Automatic Skin Score Display as Percentage */}
      <div className="space-y-4 max-w-md mx-auto">
        <h3 className="text-xl font-semibold text-center">Hudpoäng (Automatiskt beräknad)</h3>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {diagnosisData.skinScore}%
          </div>
          <div className="text-sm text-gray-600">
            Poäng baserat på symptom och svårighetsgrad
          </div>
        </div>
      </div>
    </div>
  );
}
