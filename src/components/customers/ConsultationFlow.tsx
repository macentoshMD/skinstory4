
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProblemSelection } from './ProblemSelection';
import { PersonalNumberStep } from './PersonalNumberStep';
import { CustomerFormStep } from './CustomerFormStep';
import { DiagnosisMethodStep } from './DiagnosisMethodStep';
import { ProblemDetailsStep } from './ProblemDetailsStep';
import { AreaSelectionStep } from './AreaSelectionStep';
import { GeneralDetailsStep } from './GeneralDetailsStep';
import { ContraIndicationsStep } from './ContraIndicationsStep';
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
    contraindicationsData,
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
    updateContraindicationToggle,
    initializeCustomerData,
    saveConsultation
  } = consultationData;

  const {
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
  } = stepManager;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${step >= 5 ? 'max-w-5xl' : 'max-w-2xl'} max-h-[90vh] overflow-y-auto`}>
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
          <div className="p-0">
            <ContraIndicationsStep
              selectedContraindications={contraindicationsData.selectedContraindications}
              onContraindicationToggle={updateContraindicationToggle}
              onBack={() => setStep(2)}
              onContinue={handleContraindicationsSubmit}
            />
          </div>
        )}

        {step === 4 && (
          <DiagnosisMethodStep
            selectedMethod={diagnosisData.method}
            onMethodChange={updateDiagnosisMethod}
            onBack={() => setStep(3)}
            onContinue={() => handleDiagnosisMethodSelect(diagnosisData.method)}
          />
        )}

        {step === 5 && (
          <div className="p-0">
            <ProblemSelection
              selectedProblems={diagnosisData.selectedProblems}
              onProblemToggle={handleProblemToggle}
              onBack={() => setStep(4)}
              onContinue={() => handleProblemSelectionSubmit(diagnosisData.selectedProblems)}
            />
          </div>
        )}

        {step === 6 && (
          <div className="p-0">
            <ProblemDetailsStep
              diagnosisData={diagnosisData}
              onBack={() => setStep(5)}
              onContinue={() => handleProblemDetailsSubmit(diagnosisData)}
              onSubcategoryChange={updateProblemSubcategory}
              onSymptomSeverityChange={updateSymptomSeverity}
              onSkinScoreChange={updateSkinScore}
            />
          </div>
        )}

        {step === 7 && (
          <div className="p-0">
            <AreaSelectionStep
              selectedAreas={selectedAreas}
              selectedZones={selectedZones}
              onAreasChange={setSelectedAreas}
              onZonesChange={setSelectedZones}
              onBack={() => setStep(6)}
              onContinue={() => handleAreaSelectionSubmit(selectedAreas, selectedZones)}
            />
          </div>
        )}

        {step === 8 && (
          <div className="p-0">
            <GeneralDetailsStep
              generalDetails={diagnosisData.generalDetails}
              onBack={() => setStep(7)}
              onContinue={() => handleGeneralDetailsSubmit(saveConsultation, onClose)}
              onGeneralDetailsChange={updateGeneralDetails}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
