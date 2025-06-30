
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProblemSelection } from './ProblemSelection';
import { PersonalNumberStep } from './PersonalNumberStep';
import { CustomerFormStep } from './CustomerFormStep';
import { DiagnosisMethodStep } from './DiagnosisMethodStep';
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
    aiPhoto: undefined
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

  const handleDiagnosisSubmit = () => {
    console.log('Diagnosis submitted:', diagnosisData);
    console.log('Full consultation data:', { customer: formData, diagnosis: diagnosisData });
    onClose();
  };

  const updateFormData = (field: keyof CustomerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateDiagnosisMethod = (method: 'ai' | 'manual') => {
    setDiagnosisData(prev => ({ ...prev, method }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${step === 4 ? 'max-w-5xl' : 'max-w-2xl'} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle>
            {step === 4 ? 'Välj Hudproblem' : `Starta Konsultation - Steg ${step} av ${step === 4 ? 4 : 3}`}
          </DialogTitle>
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
              onContinue={handleDiagnosisSubmit}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
