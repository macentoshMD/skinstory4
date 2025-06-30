
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
    setStep(3); // Go to diagnosis method
  };

  const handleDiagnosisMethodSelect = (diagnosisMethod: string) => {
    if (diagnosisMethod === 'manual') {
      setStep(4); // Go to problem selection
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
    setStep(5); // Go to problem details
  };

  const handleProblemDetailsSubmit = (diagnosisData: any) => {
    console.log('Problem details submitted:', diagnosisData);
    setStep(6); // Go to area selection
  };

  const handleAreaSelectionSubmit = (selectedAreas: string[], selectedZones: string[]) => {
    console.log('Areas selected:', { selectedAreas, selectedZones });
    setStep(7); // Go to general details
  };

  const handleGeneralDetailsSubmit = () => {
    console.log('General details submitted');
    setStep(8); // Go to contraindications
  };

  const handleContraindicationsSubmit = () => {
    console.log('Contraindications submitted');
    setStep(9); // Go to final step
  };

  const handleFinalSubmit = (saveConsultation: () => void, onClose: () => void) => {
    saveConsultation();
    onClose();
  };

  const getDialogTitle = () => {
    switch (step) {
      case 1: return 'Starta Konsultation - Personnummer';
      case 2: return 'Starta Konsultation - Kundformulär';
      case 3: return 'Diagnosmetod';
      case 4: return 'Välj Hudproblem';
      case 5: return 'Problem Detaljer';
      case 6: return 'Välj Behandlingsområden';
      case 7: return 'Generell Information';
      case 8: return 'Kontraindikationer';
      case 9: return 'Slutför Konsultation';
      default: return 'Konsultation';
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
    handleContraindicationsSubmit,
    handleFinalSubmit,
    getDialogTitle
  };
}
