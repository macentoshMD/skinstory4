import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ConsultationHeader } from './ConsultationHeader';
import { StepWrapper } from './StepWrapper';
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
  const selectedProblem = diagnosisData.selectedProblems[0];
  
  console.log('ProblemDetailsStep - Selected problem:', selectedProblem);
  console.log('ProblemDetailsStep - Current symptoms:', diagnosisData.symptoms);
  console.log('ProblemDetailsStep - Selected subcategory:', diagnosisData.problemSubcategory);
  
  // Get subcategories for the selected problem
  const availableSubcategories = PROBLEM_SUBCATEGORIES.filter(
    sub => sub.parentProblemId === selectedProblem
  );
  
  // Get symptoms for the selected problem
  const availableSymptoms = PROBLEM_SYMPTOMS.filter(
    symptom => symptom.problemIds.includes(selectedProblem)
  );

  console.log('Available subcategories:', availableSubcategories);
  console.log('Available symptoms:', availableSymptoms);

  // Clean up invalid symptoms when component loads or selected problem changes
  useEffect(() => {
    const validSymptomIds = availableSymptoms.map(s => s.id);
    const invalidSymptoms = diagnosisData.symptoms.filter(s => !validSymptomIds.includes(s.symptomId));
    
    if (invalidSymptoms.length > 0) {
      console.log('Found invalid symptoms, cleaning up:', invalidSymptoms);
      // Remove invalid symptoms by only keeping valid ones
      const validSymptoms = diagnosisData.symptoms.filter(s => validSymptomIds.includes(s.symptomId));
      // Reset symptoms to only valid ones
      validSymptoms.forEach(symptom => {
        onSymptomSeverityChange(symptom.symptomId, symptom.severity);
      });
    }
  }, [selectedProblem, availableSymptoms, diagnosisData.symptoms, onSymptomSeverityChange]);

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
    const hasSubcategory = diagnosisData.problemSubcategory !== '';
    const hasValidSymptoms = diagnosisData.symptoms.length > 0 && 
                           diagnosisData.symptoms.every(s => s.severity > 0);
    
    console.log('Form validation:', {
      hasSubcategory,
      hasValidSymptoms,
      symptomsCount: diagnosisData.symptoms.length,
      symptoms: diagnosisData.symptoms
    });
    
    return hasSubcategory && hasValidSymptoms;
  };

  return (
    <div className="space-y-6">
      <ConsultationHeader
        onBack={onBack}
        onContinue={onContinue}
        canContinue={isFormValid()}
        currentStep={6}
        totalSteps={8}
        continueText="Nästa"
      />

      <StepWrapper 
        title="Problem Detaljer"
        subtitle="Ge mer detaljerad information om det valda problemet"
      >
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
      </StepWrapper>
    </div>
  );
}
