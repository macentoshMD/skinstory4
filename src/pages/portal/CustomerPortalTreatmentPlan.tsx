import { useState } from 'react';
import { CustomerPortalLayout } from '@/components/portal/CustomerPortalLayout';
import TreatmentPlanHeader from '@/components/portal/treatment-plan/TreatmentPlanHeader';
import TreatmentPlansList from '@/components/portal/treatment-plan/TreatmentPlansList';
import PricingModal from '@/components/portal/treatment-plan/PricingModal';
import { mockTreatmentPlansData } from '@/data/mockTreatmentPlans';

const CustomerPortalTreatmentPlan = () => {
  const [showStartModal, setShowStartModal] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState<number | null>(null);

  const handleBack = () => {
    window.history.back();
  };

  const handleStartTreatment = (problemId: number) => {
    setSelectedProblemId(problemId);
    setShowStartModal(true);
  };

  const handleShowDetailedPlan = (problemId: number) => {
    console.log('Show detailed plan for problem:', problemId);
  };

  const selectedTreatmentData = mockTreatmentPlansData.find(plan => plan.id === selectedProblemId);

  return (
    <CustomerPortalLayout>
      <div className="space-y-8">
        <TreatmentPlanHeader 
          problemName="Behandlingsplaner" 
          onBack={handleBack}
        />

        <TreatmentPlansList
          treatmentPlans={mockTreatmentPlansData}
          onStartTreatment={handleStartTreatment}
          onShowDetailedPlan={handleShowDetailedPlan}
        />

        {/* Pricing Modal - shows for selected treatment plan */}
        {selectedTreatmentData && (
          <PricingModal 
            isOpen={showStartModal}
            onClose={() => setShowStartModal(false)}
            pricing={selectedTreatmentData.pricing}
          />
        )}
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalTreatmentPlan;