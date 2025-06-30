
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useConsultationStepManager() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const handlePersonalNumberSubmit = (initializeCustomerData: () => void) => {
    initializeCustomerData();
    setStep(2);
  };

  const handlePersonalNumberSkip = () => {
    setStep(2);
  };

  const handleCustomerFormSubmit = (formData: any) => {
    console.log('Customer form submitted:', formData);
    setStep(3);
  };

  const handleDiagnosisMethodSelect = (diagnosisMethod: string) => {
    if (diagnosisMethod === 'manual') {
      setStep(4);
    } else if (diagnosisMethod === 'ai') {
      toast({
        title: "AI-diagnos",
        description: "AI-diagnostik kommer snart. Använd manuell metod för tillfället.",
        variant: "default"
      });
    }
  };

  const handleProblemSelectionSubmit = (selectedProblems: string[]) => {
    console.log('Problems selected:', selectedProblems);
    setStep(5);
  };

  const handleProblemDetailsSubmit = (diagnosisData: any) => {
    console.log('Problem details submitted:', diagnosisData);
    setStep(6);
  };

  const handleAreaSelectionSubmit = (selectedAreas: string[], selectedZones: string[]) => {
    console.log('Areas selected:', { selectedAreas, selectedZones });
    setStep(7);
  };

  const handleGeneralDetailsSubmit = (saveConsultation: () => void, onClose: () => void) => {
    saveConsultation();
    onClose();
  };

  const getDialogTitle = () => {
    switch (step) {
      case 4: return 'Välj Hudproblem';
      case 5: return 'Problem Detaljer';
      case 6: return 'Välj Behandlingsområden';
      case 7: return 'Generell Information';
      default: return `Starta Konsultation - Steg ${step} av ${step <= 3 ? 3 : 7}`;
    }
  };

  return {
    step,
    setStep,
    handlePersonalNumberSubmit,
    handlePersonalNumberSkip,
    handleCustomerFormSubmit,
    handleDiagnosisMethodSelect,
    handleProblemSelectionSubmit,
    handleProblemDetailsSubmit,
    handleAreaSelectionSubmit,
    handleGeneralDetailsSubmit,
    getDialogTitle
  };
}
