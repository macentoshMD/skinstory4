import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProblemSelection } from './ProblemSelection';
import { PersonalNumberStep } from './PersonalNumberStep';
import { CustomerFormStep } from './CustomerFormStep';
import { DiagnosisMethodStep } from './DiagnosisMethodStep';
import { ProblemDetailsStep } from './ProblemDetailsStep';
import { AreaSelectionStep } from './AreaSelectionStep';
import { GeneralDetailsStep } from './GeneralDetailsStep';
import { useConsultationData } from '@/hooks/useConsultationData';
import { useConsultationStepManager } from './ConsultationStepManager';

interface ConsultationFlowProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
  customerId?: string;
}

export function ConsultationFlow({ isOpen, onClose, customerName, customerId }: ConsultationFlowProps) {
  const consultationData = useConsultationData(customerName, customerId);
  const stepManager = useConsultationStepManager();

  const {
    formData,
    diagnosisData,
    selectedAreas,
    selectedZones,
    setSelectedAreas,
    setSelectedZones,
    updateFormData,
    updateDiagnosisMethod,
    updateProblemSubcategory,
    updateSymptomSeverity,
    updateSkinScore,
    updateGeneralDetails,
    handleProblemToggle,
    initializeCustomerData,
    saveConsultation
  } = consultationData;

  const {
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
  } = stepManager;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${step >= 4 ? 'max-w-5xl' : 'max-w-2xl'} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <PersonalNumberStep
            personalNumber={formData.personalNumber}
            onPersonalNumberChange={(value) => updateFormData('personalNumber', value)}
            onSubmit={() => handlePersonalNumberSubmit(initializeCustomerData)}
            onSkip={handlePersonalNumberSkip}
          />
        )}

        {step === 2 && (
          <CustomerFormStep
            formData={formData}
            onFormDataChange={updateFormData}
            onBack={() => setStep(1)}
            onSubmit={() => handleCustomerFormSubmit(formData)}
          />
        )}

        {step === 3 && (
          <DiagnosisMethodStep
            selectedMethod={diagnosisData.method}
            onMethodChange={updateDiagnosisMethod}
            onBack={() => setStep(2)}
            onContinue={() => handleDiagnosisMethodSelect(diagnosisData.method)}
          />
        )}

        {step === 4 && (
          <div className="p-0">
            <ProblemSelection
              selectedProblems={diagnosisData.selectedProblems}
              onProblemToggle={handleProblemToggle}
              onBack={() => setStep(3)}
              onContinue={() => handleProblemSelectionSubmit(diagnosisData.selectedProblems)}
            />
          </div>
        )}

        {step === 5 && (
          <div className="p-0">
            <ProblemDetailsStep
              diagnosisData={diagnosisData}
              onBack={() => setStep(4)}
              onContinue={() => handleProblemDetailsSubmit(diagnosisData)}
              onSubcategoryChange={updateProblemSubcategory}
              onSymptomSeverityChange={updateSymptomSeverity}
              onSkinScoreChange={updateSkinScore}
            />
          </div>
        )}

        {step === 6 && (
          <div className="p-0">
            <AreaSelectionStep
              selectedAreas={selectedAreas}
              selectedZones={selectedZones}
              onAreasChange={setSelectedAreas}
              onZonesChange={setSelectedZones}
              onBack={() => setStep(5)}
              onContinue={() => handleAreaSelectionSubmit(selectedAreas, selectedZones)}
            />
          </div>
        )}

        {step === 7 && (
          <div className="p-0">
            <GeneralDetailsStep
              generalDetails={diagnosisData.generalDetails}
              onBack={() => setStep(6)}
              onContinue={() => handleGeneralDetailsSubmit(saveConsultation, onClose)}
              onGeneralDetailsChange={updateGeneralDetails}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
