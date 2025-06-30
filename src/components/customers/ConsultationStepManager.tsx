
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
    setStep(3); // Go to contraindications
  };

  const handleContraindicationsSubmit = () => {
    console.log('Contraindications submitted');
    setStep(4); // Go to diagnosis method
  };

  const handleDiagnosisMethodSelect = (diagnosisMethod: string) => {
    if (diagnosisMethod === 'manual') {
      setStep(5); // Go to problem selection
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
    setStep(6); // Go to problem details
  };

  const handleProblemDetailsSubmit = (diagnosisData: any) => {
    console.log('Problem details submitted:', diagnosisData);
    setStep(7); // Go to area selection
  };

  const handleAreaSelectionSubmit = (selectedAreas: string[], selectedZones: string[]) => {
    console.log('Areas selected:', { selectedAreas, selectedZones });
    setStep(8); // Go to general details
  };

  const handleGeneralDetailsSubmit = (saveConsultation: () => void, onClose: () => void) => {
    saveConsultation();
    onClose();
  };

  const getDialogTitle = () => {
    switch (step) {
      case 1: return 'Starta Konsultation - Personnummer';
      case 2: return 'Starta Konsultation - Kundformulär';
      case 3: return 'Kontraindikationer';
      case 4: return 'Diagnosmetod';
      case 5: return 'Välj Hudproblem';
      case 6: return 'Problem Detaljer';
      case 7: return 'Välj Behandlingsområden';
      case 8: return 'Generell Information';
      default: return 'Konsultation';
    }
  };

  return {
    step,
    setStep,
    handlePersonalNumberSubmit,
    handlePersonalNumberSkip,
    handleCustomerFormSubmit,
    handleContraindicationsSubmit,
    handleDiagnosisMethodSelect,
    handleProblemSelectionSubmit,
    handleProblemDetailsSubmit,
    handleAreaSelectionSubmit,
    handleGeneralDetailsSubmit,
    getDialogTitle
  };
}
