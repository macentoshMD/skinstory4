import { useState } from 'react';
import { CustomerPortalLayout } from '@/components/portal/CustomerPortalLayout';
import TreatmentTimeline from '@/components/portal/TreatmentTimeline';
import TreatmentPlanHeader from '@/components/portal/treatment-plan/TreatmentPlanHeader';
import ProblemDescriptionCard from '@/components/portal/treatment-plan/ProblemDescriptionCard';
import TreatmentOverviewCard from '@/components/portal/treatment-plan/TreatmentOverviewCard';
import PricingModal from '@/components/portal/treatment-plan/PricingModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calendar, Zap, Play, CheckCircle, Clock, Pause } from 'lucide-react';

const CustomerPortalTreatmentPlan = () => {
  const [showStartModal, setShowStartModal] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState<number | null>(null);

  // Mock treatment plans data for multiple problems
  const treatmentPlansData = [
    {
      id: 1,
      problem: {
        name: 'Akne',
        description: 'Inflammatorisk akne med komedoner och papler främst i T-zonen. Förhöjd talgproduktion och tilltäppta porer.',
        severity: 'Måttlig',
        areas: ['Panna', 'Kinder', 'Haka']
      },
      treatmentStatus: 'aktiv',
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
    },
    {
      id: 2,
      problem: {
        name: 'Ojämn hudton',
        description: 'Lätt pigmentering och rodnader efter akne.',
        severity: 'Lindrig',
        areas: ['Kinder', 'Panna']
      },
      treatmentStatus: 'slutförd',
      goals: {
        title: 'BEHANDLINGSMÅL',
        description: 'Jämna ut hudton och minska pigmentfläckar'
      },
      plan: {
        duration: '8 veckor',
        clinicSessions: 4,
        homeProducts: 3,
        expectedResults: '85-90% förbättring'
      },
      pricing: {
        commitTotal: '8 500 kr',
        commitMonthly: '2 833 kr/månad i 3 månader',
        payAsYouGoTotal: '11 200 kr',
        savings: '2 700 kr'
      }
    },
    {
      id: 3,
      problem: {
        name: 'Förstorade porer',
        description: 'Synliga porer främst i T-zonen.',
        severity: 'Måttlig',
        areas: ['Näsa', 'Kinder']
      },
      treatmentStatus: 'pending',
      goals: {
        title: 'BEHANDLINGSMÅL',
        description: 'Minska porernas synlighet och förbättra hudtextur'
      },
      plan: {
        duration: '10 veckor',
        clinicSessions: 5,
        homeProducts: 4,
        expectedResults: '60-70% förbättring'
      },
      pricing: {
        commitTotal: '10 500 kr',
        commitMonthly: '3 500 kr/månad i 3 månader',
        payAsYouGoTotal: '13 800 kr',
        savings: '3 300 kr'
      }
    }
  ];

  // Determine default expanded state: expand all if only 1 plan, collapse if multiple
  const defaultExpandedValue = treatmentPlansData.length === 1 ? treatmentPlansData[0].id.toString() : undefined;

  const getTreatmentStatusBadge = (treatmentStatus: string) => {
    switch (treatmentStatus) {
      case 'aktiv':
        return { text: 'Aktiv', color: 'bg-green-100 text-green-800 border-green-200', icon: <Play className="h-3 w-3" /> };
      case 'pågående':
        return { text: 'Pågående', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: <Clock className="h-3 w-3" /> };
      case 'slutförd':
        return { text: 'Slutförd', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: <CheckCircle className="h-3 w-3" /> };
      case 'pending':
        return { text: 'Väntar', color: 'bg-orange-100 text-orange-800 border-orange-200', icon: <Pause className="h-3 w-3" /> };
      default:
        return { text: 'Okänd', color: 'bg-gray-100 text-gray-800 border-gray-200', icon: <Clock className="h-3 w-3" /> };
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Lindrig':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Måttlig':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Svår':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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

  const selectedTreatmentData = treatmentPlansData.find(plan => plan.id === selectedProblemId);

  return (
    <CustomerPortalLayout>
      <div className="space-y-8">
        <TreatmentPlanHeader 
          problemName="Behandlingsplaner" 
          onBack={handleBack}
        />

        {/* Collapsible Treatment Plans List */}
        <Accordion 
          type="multiple" 
          defaultValue={defaultExpandedValue ? [defaultExpandedValue] : []}
          className="space-y-4"
        >
          {treatmentPlansData.map((treatmentPlan) => {
            const statusBadge = getTreatmentStatusBadge(treatmentPlan.treatmentStatus);
            
            return (
              <AccordionItem key={treatmentPlan.id} value={treatmentPlan.id.toString()} className="border-0">
                <div className="space-y-6">
                  <AccordionTrigger className="hover:no-underline p-0">
                    <div className="w-full text-left">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h2 className="text-xl font-bold text-gray-900">
                            {treatmentPlan.problem.name}
                          </h2>
                          <Badge className={getSeverityColor(treatmentPlan.problem.severity)}>
                            {treatmentPlan.problem.severity}
                          </Badge>
                          <Badge variant="outline" className={`${statusBadge.color} flex items-center gap-1`}>
                            {statusBadge.icon}
                            {statusBadge.text}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{treatmentPlan.problem.description}</p>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="p-0">
                    <div className="space-y-6">
                      <ProblemDescriptionCard 
                        problem={treatmentPlan.problem}
                        goals={treatmentPlan.goals}
                      />

                      <TreatmentOverviewCard plan={treatmentPlan.plan} />

                      <TreatmentTimeline />

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                          size="lg" 
                          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                          onClick={() => handleStartTreatment(treatmentPlan.id)}
                          disabled={treatmentPlan.treatmentStatus === 'slutförd'}
                        >
                          <Zap className="h-5 w-5 mr-2" />
                          {treatmentPlan.treatmentStatus === 'slutförd' ? 'Behandling slutförd' : 
                           treatmentPlan.treatmentStatus === 'pending' ? 'Starta behandlingsplan' : 
                           'Hantera behandlingsplan'}
                        </Button>

                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50"
                          onClick={() => handleShowDetailedPlan(treatmentPlan.id)}
                        >
                          <Calendar className="h-5 w-5 mr-2" />
                          Visa detaljerad plan
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>

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