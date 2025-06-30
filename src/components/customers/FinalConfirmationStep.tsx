
import { ConsultationHeader } from './ConsultationHeader';
import { StepWrapper } from './StepWrapper';
import { CustomerInfoCard } from './final-confirmation/CustomerInfoCard';
import { DiagnosisCard } from './final-confirmation/DiagnosisCard';
import { TreatmentAreasCard } from './final-confirmation/TreatmentAreasCard';
import { GeneralDetailsCard } from './final-confirmation/GeneralDetailsCard';
import { PhotoDocumentationCard } from './final-confirmation/PhotoDocumentationCard';
import { TreatmentPlanCard } from './final-confirmation/TreatmentPlanCard';
import { RiskAssessmentCard } from './final-confirmation/RiskAssessmentCard';
import { NextStepsCard } from './final-confirmation/NextStepsCard';
import { DiagnosisData, PhotoDocumentation, TreatmentPlan } from '@/types/consultation';

interface FinalConfirmationStepProps {
  customerName: string;
  customerData: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    gender: string;
    personalNumber: string;
  };
  diagnosisData: DiagnosisData;
  selectedAreas: string[];
  selectedZones: string[];
  riskLevel: string;
  selectedContraindications: string[];
  photos?: PhotoDocumentation[];
  treatmentPlan?: TreatmentPlan;
  onBack: () => void;
  onFinish: () => void;
}

export function FinalConfirmationStep({
  customerName,
  customerData,
  diagnosisData,
  selectedAreas,
  selectedZones,
  riskLevel,
  selectedContraindications,
  photos = [],
  treatmentPlan,
  onBack,
  onFinish
}: FinalConfirmationStepProps) {
  return (
    <div className="space-y-6">
      <ConsultationHeader
        onBack={onBack}
        onContinue={onFinish}
        canContinue={true}
        currentStep={11}
        totalSteps={11}
        continueText="Slutför konsultation"
      />

      <StepWrapper 
        title="Slutför Konsultation"
        subtitle={`Detaljerad sammanfattning för ${customerName}`}
      >
        <div className="space-y-6">
          <CustomerInfoCard customerData={customerData} />
          <DiagnosisCard diagnosisData={diagnosisData} />
          <TreatmentAreasCard selectedAreas={selectedAreas} selectedZones={selectedZones} />
          <GeneralDetailsCard generalDetails={diagnosisData.generalDetails} />
          <PhotoDocumentationCard photos={photos} />
          <TreatmentPlanCard treatmentPlan={treatmentPlan} />
          <RiskAssessmentCard riskLevel={riskLevel} selectedContraindications={selectedContraindications} />
          <NextStepsCard riskLevel={riskLevel} />
        </div>
      </StepWrapper>
    </div>
  );
}
