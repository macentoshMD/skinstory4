import { useState } from 'react';
import { CustomerPortalLayout } from '@/components/portal/CustomerPortalLayout';
import TreatmentTimeline from '@/components/portal/TreatmentTimeline';
import TreatmentPlanHeader from '@/components/portal/treatment-plan/TreatmentPlanHeader';
import ProblemDescriptionCard from '@/components/portal/treatment-plan/ProblemDescriptionCard';
import TreatmentOverviewCard from '@/components/portal/treatment-plan/TreatmentOverviewCard';
import PricingModal from '@/components/portal/treatment-plan/PricingModal';
import { Button } from '@/components/ui/button';
import { Calendar, Zap } from 'lucide-react';

const CustomerPortalTreatmentPlan = () => {
  const [showStartModal, setShowStartModal] = useState(false);

  // Mock treatment plan data for Acne
  const treatmentData = {
    problem: {
      name: 'Akne',
      description: 'Inflammatorisk akne med komedoner och papler främst i T-zonen. Förhöjd talgproduktion och tilltäppta porer.',
      severity: 'Måttlig',
      areas: ['Panna', 'Kinder', 'Haka']
    },
    goals: {
      title: 'BEHANDLINGSMÅL',
      description: 'Minska inflammation, rena porer och förbättra hudtextur'
    },
    plan: {
      duration: '12 veckor',
      clinicSessions: 6,
      homeProducts: 5,
      expectedResults: '70-80% förbättring'
    },
    pricing: {
      commitTotal: '12 969 kr',
      commitMonthly: '4 323 kr/månad i 3 månader',
      payAsYouGoTotal: '18 745 kr',
      savings: '5 776 kr'
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleShowDetailedPlan = () => {
    // Navigate to detailed plan view
    console.log('Show detailed plan');
  };

  return (
    <CustomerPortalLayout>
      <div className="space-y-8">
        <TreatmentPlanHeader 
          problemName={treatmentData.problem.name} 
          onBack={handleBack}
        />

        <ProblemDescriptionCard 
          problem={treatmentData.problem}
          goals={treatmentData.goals}
        />

        <TreatmentOverviewCard plan={treatmentData.plan} />

        <TreatmentTimeline />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            size="lg" 
            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
            onClick={() => setShowStartModal(true)}
          >
            <Zap className="h-5 w-5 mr-2" />
            Starta behandlingsplan
          </Button>

          <Button 
            variant="outline" 
            size="lg" 
            className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50"
            onClick={handleShowDetailedPlan}
          >
            <Calendar className="h-5 w-5 mr-2" />
            Visa detaljerad plan
          </Button>
        </div>

        <PricingModal 
          isOpen={showStartModal}
          onClose={() => setShowStartModal(false)}
          pricing={treatmentData.pricing}
        />
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalTreatmentPlan;