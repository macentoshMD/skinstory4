import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProblemSelection } from './ProblemSelection';
import { PersonalNumberStep } from './PersonalNumberStep';
import { CustomerFormStep } from './CustomerFormStep';
import { DiagnosisMethodStep } from './DiagnosisMethodStep';
import { ProblemDetailsStep } from './ProblemDetailsStep';
import { GeneralDetailsStep } from './GeneralDetailsStep';
import { CustomerFormData, DiagnosisData } from '@/types/consultation';

interface ConsultationFlowProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
}

export function ConsultationFlow({ isOpen, onClose, customerName }: ConsultationFlowProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CustomerFormData>({
    personalNumber: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    gender: '',
    language: '',
    howFoundUs: ''
  });

  const [diagnosisData, setDiagnosisData] = useState<DiagnosisData>({
    method: '',
    selectedProblems: [],
    aiPhoto: undefined,
    problemSeverity: '',
    problemSubcategory: '',
    symptoms: [],
    skinScore: 0,
    generalDetails: {
      whenProblemStartsYear: '',
      whenProblemStartsMonth: '',
      skinStatusAtMoment: '',
      treatProblemBefore: '',
      skinTexture: '',
      skinSensitivity: '',
      birthControlPills: '',
      makeupRoutine: '',
      occupation: '',
      lifestyle: ''
    }
  });

  const handlePersonalNumberSubmit = () => {
    const [firstName, lastName] = customerName.split(' ');
    setFormData(prev => ({
      ...prev,
      firstName: firstName || '',
      lastName: lastName || '',
      email: `${firstName?.toLowerCase()}.${lastName?.toLowerCase()}@email.se`,
      phone: '+46 70 123 45 67'
    }));
    setStep(2);
  };

  const handleCustomerFormSubmit = () => {
    console.log('Customer form submitted:', formData);
    setStep(3);
  };

  const handleDiagnosisMethodSelect = () => {
    if (diagnosisData.method === 'manual') {
      setStep(4);
    } else if (diagnosisData.method === 'ai') {
      // AI diagnosis - stay on current step (coming soon)
    }
  };

  const handleProblemToggle = (problemId: string) => {
    setDiagnosisData(prev => ({
      ...prev,
      selectedProblems: prev.selectedProblems.includes(problemId)
        ? prev.selectedProblems.filter(id => id !== problemId)
        : [...prev.selectedProblems, problemId]
    }));
  };

  const handleProblemSelectionSubmit = () => {
    console.log('Problems selected:', diagnosisData.selectedProblems);
    setStep(5);
  };

  const handleProblemDetailsSubmit = () => {
    console.log('Problem details submitted:', diagnosisData);
    setStep(6);
  };

  const handleGeneralDetailsSubmit = () => {
    console.log('General details submitted:', diagnosisData.generalDetails);
    console.log('Full consultation data:', { customer: formData, diagnosis: diagnosisData });
    onClose();
  };

  const updateFormData = (field: keyof CustomerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateDiagnosisMethod = (method: 'ai' | 'manual') => {
    setDiagnosisData(prev => ({ ...prev, method }));
  };

  const updateProblemSubcategory = (subcategory: string) => {
    setDiagnosisData(prev => ({ ...prev, problemSubcategory: subcategory }));
  };

  const updateSymptomSeverity = (symptomId: string, severity: number) => {
    setDiagnosisData(prev => ({
      ...prev,
      symptoms: prev.symptoms.some(s => s.symptomId === symptomId)
        ? prev.symptoms.map(s => s.symptomId === symptomId ? { ...s, severity } : s)
        : [...prev.symptoms, { symptomId, severity }]
    }));
  };

  const updateSkinScore = (score: number) => {
    setDiagnosisData(prev => ({ ...prev, skinScore: score }));
  };

  const updateGeneralDetails = (field: keyof typeof diagnosisData.generalDetails, value: string) => {
    setDiagnosisData(prev => ({
      ...prev,
      generalDetails: { ...prev.generalDetails, [field]: value }
    }));
  };

  const getDialogTitle = () => {
    switch (step) {
      case 4: return 'Välj Hudproblem';
      case 5: return 'Problem Detaljer';
      case 6: return 'Generell Information';
      default: return `Starta Konsultation - Steg ${step} av ${step <= 3 ? 3 : 6}`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${step === 4 || step === 5 || step === 6 ? 'max-w-5xl' : 'max-w-2xl'} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <PersonalNumberStep
            personalNumber={formData.personalNumber}
            onPersonalNumberChange={(value) => updateFormData('personalNumber', value)}
            onSubmit={handlePersonalNumberSubmit}
          />
        )}

        {step === 2 && (
          <CustomerFormStep
            formData={formData}
            onFormDataChange={updateFormData}
            onBack={() => setStep(1)}
            onSubmit={handleCustomerFormSubmit}
          />
        )}

        {step === 3 && (
          <DiagnosisMethodStep
            selectedMethod={diagnosisData.method}
            onMethodChange={updateDiagnosisMethod}
            onBack={() => setStep(2)}
            onContinue={handleDiagnosisMethodSelect}
          />
        )}

        {step === 4 && (
          <div className="p-0">
            <ProblemSelection
              selectedProblems={diagnosisData.selectedProblems}
              onProblemToggle={handleProblemToggle}
              onBack={() => setStep(3)}
              onContinue={handleProblemSelectionSubmit}
            />
          </div>
        )}

        {step === 5 && (
          <div className="p-0">
            <ProblemDetailsStep
              diagnosisData={diagnosisData}
              onBack={() => setStep(4)}
              onContinue={handleProblemDetailsSubmit}
              onSubcategoryChange={updateProblemSubcategory}
              onSymptomSeverityChange={updateSymptomSeverity}
              onSkinScoreChange={updateSkinScore}
            />
          </div>
        )}

        {step === 6 && (
          <div className="p-0">
            <GeneralDetailsStep
              generalDetails={diagnosisData.generalDetails}
              onBack={() => setStep(5)}
              onContinue={handleGeneralDetailsSubmit}
              onGeneralDetailsChange={updateGeneralDetails}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
