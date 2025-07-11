
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProblemSelection } from './ProblemSelection';
import { PersonalNumberStep } from './PersonalNumberStep';
import { CustomerFormStep } from './CustomerFormStep';
import { DiagnosisMethodStep } from './DiagnosisMethodStep';
import { ProblemDetailsStep } from './ProblemDetailsStep';
import { AreaSelectionStep } from './AreaSelectionStep';
import { GeneralDetailsStep } from './GeneralDetailsStep';
import { ModernContraIndicationsStep } from './ModernContraIndicationsStep';
import { PhotoDocumentationStep } from './PhotoDocumentationStep';
import { TreatmentPlanStep } from './TreatmentPlanStep';
import { FinalConfirmationStep } from './FinalConfirmationStep';
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
    photos,
    treatmentPlan,
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
    updatePhotos,
    updateTreatmentPlan,
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
    handleContraindicationsSubmit,
    handlePhotoDocumentationSubmit,
    handleTreatmentPlanSubmit,
    handleFinalSubmit,
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
              onContinue={handleGeneralDetailsSubmit}
              onGeneralDetailsChange={updateGeneralDetails}
            />
          </div>
        )}

        {step === 8 && (
          <div className="p-0">
            <ModernContraIndicationsStep
              selectedContraindications={contraindicationsData.selectedContraindications}
              selectedProblems={diagnosisData.selectedProblems}
              onContraindicationToggle={updateContraindicationToggle}
              onBack={() => setStep(7)}
              onContinue={handleContraindicationsSubmit}
            />
          </div>
        )}

        {step === 9 && (
          <div className="p-0">
            <PhotoDocumentationStep
              photos={photos}
              onPhotosChange={updatePhotos}
              onBack={() => setStep(8)}
              onContinue={handlePhotoDocumentationSubmit}
            />
          </div>
        )}

        {step === 10 && (
          <div className="p-0">
            <TreatmentPlanStep
              treatmentPlan={treatmentPlan}
              onTreatmentPlanChange={updateTreatmentPlan}
              selectedProblems={diagnosisData.selectedProblems}
              skinScore={diagnosisData.skinScore}
              riskLevel={contraindicationsData.riskLevel}
              onBack={() => setStep(9)}
              onContinue={handleTreatmentPlanSubmit}
            />
          </div>
        )}

        {step === 11 && (
          <div className="p-0">
            <FinalConfirmationStep
              customerName={customerName}
              customerData={formData}
              diagnosisData={diagnosisData}
              selectedAreas={selectedAreas}
              selectedZones={selectedZones}
              riskLevel={contraindicationsData.riskLevel}
              selectedContraindications={contraindicationsData.selectedContraindications}
              onBack={() => setStep(10)}
              onFinish={() => handleFinalSubmit(saveConsultation, onClose)}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
