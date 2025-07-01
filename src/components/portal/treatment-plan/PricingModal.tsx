import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PaymentOptionCard from './PaymentOptionCard';
import { Shield } from 'lucide-react';

interface PricingData {
  commitTotal: string;
  commitMonthly: string;
  payAsYouGoTotal: string;
  savings: string;
}

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  pricing: PricingData;
}

const PricingModal = ({ isOpen, onClose, pricing }: PricingModalProps) => {
  const commitBenefits = [
    { text: 'Personal Home Care plan', included: true },
    { text: 'Personal Clinic Care plan', included: true },
    { text: 'Results guarantee', included: true },
    { text: 'Personal therapist', included: true },
    { text: 'Priority booking', included: true }
  ];

  const payAsYouGoBenefits = [
    { text: 'Personal Home Care plan', included: true },
    { text: 'Personal Clinic Care plan', included: true },
    { text: 'Results guarantee', included: false },
    { text: 'Personal therapist', included: false },
    { text: 'Priority booking', included: false }
  ];

  const handleCommitSelect = () => {
    // Handle commit payment selection
    console.log('Commit selected');
    onClose();
  };

  const handlePayAsYouGoSelect = () => {
    // Handle pay-as-you-go payment selection
    console.log('Pay-as-you-go selected');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Välj betalningsalternativ</DialogTitle>
          <p className="text-muted-foreground">Hur vill du betala för din behandlingsplan?</p>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <PaymentOptionCard
            type="commit"
            title="Commit"
            price={pricing.commitTotal}
            subtitle={`Eller ${pricing.commitMonthly}`}
            savings={pricing.savings}
            description="Betala en gång - få hela behandlingsplanen med alla fördelar. Inga extra kostnader, inga överraskningar."
            benefits={commitBenefits}
            isRecommended={true}
            onSelect={handleCommitSelect}
          />

          <PaymentOptionCard
            type="payAsYouGo"
            title="Pay-as-you-go"
            price={pricing.payAsYouGoTotal}
            subtitle="Betala per behandling"
            description="Börja din behandling steg för steg. Prova det innan du fullständigt commitar."
            benefits={payAsYouGoBenefits}
            onSelect={handlePayAsYouGoSelect}
          />
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900">Vårt löfte till dig</h4>
              <p className="text-sm text-blue-800 mt-1">
                Med Commit-alternativet garanterar vi resultat. Ser du inte förbättring efter 8 veckor får du pengarna tillbaka.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;