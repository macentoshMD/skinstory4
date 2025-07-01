import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ClinicCareCard from './ClinicCareCard';
import HomeCareCard from './HomeCareCard';
import TreatmentStatusBadge from './TreatmentStatusBadge';
import { getSeverityColor } from '@/utils/treatmentPlanHelpers';
import { TreatmentPlan } from '@/types/treatment-plan';
import { Clock, Users, TrendingUp, ChevronDown, CreditCard, Calendar } from 'lucide-react';
import { useState } from 'react';

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
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Varaktighet</span>
                </div>
                <div className="font-semibold">{treatmentPlan.plan.duration}</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Sessioner</span>
                </div>
                <div className="font-semibold">{treatmentPlan.plan.clinicSessions}</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-500">Förväntat resultat</span>
                </div>
                <div className="font-semibold text-green-600">{treatmentPlan.plan.expectedResults}</div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Primary Action - Payment Options */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">Välj betalningsalternativ</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* Commit Option */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border-2 border-purple-200 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-green-600 text-white px-4 py-1">SPARA {treatmentPlan.pricing.savings}</Badge>
              </div>
              <div className="text-center space-y-3 pt-2">
                <h4 className="font-semibold text-purple-800">Betala direkt</h4>
                <div className="text-3xl font-bold text-purple-600">{treatmentPlan.pricing.commitTotal}</div>
                <p className="text-sm text-purple-700">{treatmentPlan.pricing.commitMonthly}</p>
                <Button 
                  size="lg" 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => onStartTreatment(treatmentPlan.id)}
                  disabled={treatmentPlan.treatmentStatus === 'slutförd'}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Välj detta alternativ
                </Button>
              </div>
            </div>

            {/* Pay as you go */}
            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <div className="text-center space-y-3">
                <h4 className="font-semibold text-gray-800">Betala per tillfälle</h4>
                <div className="text-3xl font-bold text-gray-600">{treatmentPlan.pricing.payAsYouGoTotal}</div>
                <p className="text-sm text-gray-600">Ingen förskottsbetalning</p>
                <Button 
                  variant="outline"
                  size="lg" 
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => onStartTreatment(treatmentPlan.id)}
                  disabled={treatmentPlan.treatmentStatus === 'slutförd'}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Välj detta alternativ
                </Button>
              </div>
            </div>
          </div>
        </div>

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
            />

            <HomeCareCard 
              productPackages={treatmentPlan.homeCare.productPackages}
              methods={treatmentPlan.homeCare.methods}
              instructions={treatmentPlan.homeCare.instructions}
            />
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default TreatmentPlanItem;