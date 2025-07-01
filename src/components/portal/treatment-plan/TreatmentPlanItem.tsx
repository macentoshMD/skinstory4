import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ClinicCareCard from './ClinicCareCard';
import HomeCareCard from './HomeCareCard';
import TreatmentStatusBadge from './TreatmentStatusBadge';
import { getSeverityColor } from '@/utils/treatmentPlanHelpers';
import { TreatmentPlan } from '@/types/treatment-plan';
import { Clock, Users, TrendingUp, ChevronDown, CreditCard, Calendar, Building2, User } from 'lucide-react';
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
  const [showDetails, setShowDetails] = useState(false);
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
      {/* Clean Header */}
      <CardHeader className="pb-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold text-gray-900">
                {treatmentPlan.problem.name}
              </CardTitle>
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

      <CardContent className="space-y-6">

        {/* Collapsible Details */}
        <Collapsible open={showDetails} onOpenChange={setShowDetails}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900">
              {showDetails ? 'Dölj detaljer' : 'Visa behandlingsdetaljer'}
              <ChevronDown className={`h-4 w-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-6 pt-4">
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
      </CardContent>
    </Card>
  );
};

export default TreatmentPlanItem;