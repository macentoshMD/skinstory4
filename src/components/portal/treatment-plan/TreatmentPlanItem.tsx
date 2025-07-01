import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ClinicCareCard from './ClinicCareCard';
import HomeCareCard from './HomeCareCard';
import TreatmentStatusBadge from './TreatmentStatusBadge';
import BeforeAfterSection from './BeforeAfterSection';
import TimelineSection from './TimelineSection';
import ValuePropositionSection from './ValuePropositionSection';
import PhasesSection from './PhasesSection';
import ReasoningSection from './ReasoningSection';
import PricingBreakdownSection from './PricingBreakdownSection';
import { getSeverityColor } from '@/utils/treatmentPlanHelpers';
import { TreatmentPlan } from '@/types/treatment-plan';
import { Clock, Building2, User, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import PaymentOptionModal from './PaymentOptionModal';

interface TreatmentPlanItemProps {
  treatmentPlan: TreatmentPlan;
  onStartTreatment: (problemId: number) => void;
  onShowDetailedPlan: (problemId: number) => void;
}

const TreatmentPlanItem = ({ 
  treatmentPlan, 
  onStartTreatment, 
  onShowDetailedPlan 
}: TreatmentPlanItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    type: 'treatment' | 'product';
    itemName: string;
  }>({ isOpen: false, type: 'treatment', itemName: '' });

  const handleBookTreatment = () => {
    setPaymentModal({
      isOpen: true,
      type: 'treatment',
      itemName: treatmentPlan.problem.name
    });
  };

  const handleOrderProducts = () => {
    setPaymentModal({
      isOpen: true,
      type: 'product',
      itemName: treatmentPlan.homeCare.productPackages[0]?.name || 'Produkter'
    });
  };

  const handlePaymentSelection = (paymentType: 'commit' | 'payAsYouGo') => {
    // Close modal and handle payment logic
    setPaymentModal({ isOpen: false, type: 'treatment', itemName: '' });
    onStartTreatment(treatmentPlan.id);
  };

  return (
    <Card className="overflow-hidden bg-white">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        {/* Clean Header */}
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-6 cursor-pointer hover:bg-gray-50/50 transition-colors">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-3xl font-bold text-gray-900">
                      {treatmentPlan.problem.name}
                    </CardTitle>
                    {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                  </div>
                  <p className="text-gray-600 text-lg max-w-2xl">{treatmentPlan.problem.description}</p>
                </div>
                <TreatmentStatusBadge status={treatmentPlan.treatmentStatus} />
              </div>
              
              {/* Simple Overview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">Klinik</span>
                    </div>
                    <div className="font-semibold">AcneSpecialisten</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">Din Terapeut</span>
                    </div>
                    <div className="font-semibold">Cazzandra</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">Varaktighet</span>
                    </div>
                    <div className="font-semibold">{treatmentPlan.plan.duration}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-6 pt-0">
        {/* Timeline Section */}
        <TimelineSection 
          timeline={treatmentPlan.timeline}
          duration={treatmentPlan.plan.duration}
        />

        {/* Value Proposition */}
        <ValuePropositionSection 
          title={treatmentPlan.valueProposition.title}
          features={treatmentPlan.valueProposition.features}
        />

        {/* Phases Section */}
        <PhasesSection phases={treatmentPlan.phases} />

        {/* Reasoning Section */}
        <ReasoningSection 
          title={treatmentPlan.reasoning.title}
          description={treatmentPlan.reasoning.description}
          successRate={treatmentPlan.reasoning.successRate}
        />

        {/* Pricing Breakdown */}
        <PricingBreakdownSection 
          clinicCost={treatmentPlan.pricing.clinicCost}
          homeCost={treatmentPlan.pricing.homeCost}
          commitTotal={treatmentPlan.pricing.commitTotal}
          weeklyEquivalent={treatmentPlan.pricing.weeklyEquivalent}
        />

        {/* Clinic Care and Home Care Details */}
        <ClinicCareCard 
          treatments={treatmentPlan.clinicCare.treatments}
          totalSessions={treatmentPlan.clinicCare.totalSessions}
          schedule={treatmentPlan.clinicCare.schedule}
          onBookTreatment={handleBookTreatment}
        />

        <HomeCareCard 
          productPackages={treatmentPlan.homeCare.productPackages}
          methods={treatmentPlan.homeCare.methods}
          instructions={treatmentPlan.homeCare.instructions}
          onOrderProducts={handleOrderProducts}
        />

        {/* Before & After Section - Moved to bottom and made collapsible */}
        <BeforeAfterSection 
          expectedImprovement={treatmentPlan.beforeAfter.expectedImprovement}
          timeframe={treatmentPlan.beforeAfter.timeframe}
          description={treatmentPlan.beforeAfter.description}
        />

          </CardContent>
        </CollapsibleContent>
      </Collapsible>

      {/* Payment Option Modal */}
      <PaymentOptionModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ ...paymentModal, isOpen: false })}
        onSelectPayment={handlePaymentSelection}
        type={paymentModal.type}
        itemName={paymentModal.itemName}
        pricing={treatmentPlan.pricing}
      />
    </Card>
  );
};

export default TreatmentPlanItem;