import { useState } from 'react';
import { CustomerPortalLayout } from '@/components/portal/CustomerPortalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  Home,
  Building2,
  Star,
  Shield,
  UserCheck,
  Zap,
  X,
  ArrowLeft
} from 'lucide-react';

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

  return (
    <CustomerPortalLayout>
      <div className="space-y-8">
        {/* Back Navigation */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Behandlingsplan - {treatmentData.problem.name}</h1>
        </div>

        {/* Problem Description Card */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-3">{treatmentData.problem.name}</h2>
                  <p className="text-gray-700 mb-4">{treatmentData.problem.description}</p>
                </div>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 ml-4">
                  {treatmentData.problem.severity}
                </Badge>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">DRABBADE OMRÅDEN</h4>
                <div className="flex flex-wrap gap-2">
                  {treatmentData.problem.areas.map((area, index) => (
                    <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold text-lg text-purple-800 mb-2">{treatmentData.goals.title}</h3>
                <p className="text-gray-700">{treatmentData.goals.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Treatment Plan Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Behandlingsöversikt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{treatmentData.plan.duration}</div>
                <p className="text-sm text-muted-foreground">Varaktighet</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{treatmentData.plan.clinicSessions}</div>
                <p className="text-sm text-muted-foreground">Klinikbesök</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{treatmentData.plan.homeProducts}</div>
                <p className="text-sm text-muted-foreground">Hemprodukter</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{treatmentData.plan.expectedResults}</div>
                <p className="text-sm text-muted-foreground">Förväntat resultat</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Dialog open={showStartModal} onOpenChange={setShowStartModal}>
            <DialogTrigger asChild>
              <Button size="lg" className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                <Zap className="h-5 w-5 mr-2" />
                Starta behandlingsplan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Välj betalningsalternativ</DialogTitle>
                <p className="text-muted-foreground">Hur vill du betala för din behandlingsplan?</p>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Commit Option */}
                <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-600 text-white px-4 py-1">REKOMMENDERAT</Badge>
                  </div>
                  <CardHeader className="text-center pt-8">
                    <CardTitle className="text-xl text-purple-800">Commit</CardTitle>
                    <div className="text-3xl font-bold text-purple-600">{treatmentData.pricing.commitTotal}</div>
                    <p className="text-sm text-purple-700">
                      Eller {treatmentData.pricing.commitMonthly}
                    </p>
                    <p className="text-sm font-semibold text-green-700">
                      Spara {treatmentData.pricing.savings}!
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-center text-purple-700 mb-4">
                      Betala en gång - få hela behandlingsplanen med alla fördelar. Inga extra kostnader, inga överraskningar.
                    </p>
                    <div className="space-y-3">
                      {commitBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="text-sm">{benefit.text}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 mt-6">
                      Fortsätt med Commit
                    </Button>
                  </CardContent>
                </Card>

                {/* Pay-as-you-go Option */}
                <Card className="border-2 border-gray-200">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">Pay-as-you-go</CardTitle>
                    <div className="text-3xl font-bold">{treatmentData.pricing.payAsYouGoTotal}</div>
                    <p className="text-sm text-muted-foreground">
                      Betala per behandling
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-center text-muted-foreground mb-4">
                      Börja din behandling steg för steg. Prova det innan du fullständigt commitar.
                    </p>
                    <div className="space-y-3">
                      {payAsYouGoBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3">
                          {benefit.included ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <X className="h-5 w-5 text-red-500" />
                          )}
                          <span className={`text-sm ${!benefit.included ? 'text-muted-foreground line-through' : ''}`}>
                            {benefit.text}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-6">
                      Fortsätt med Pay-as-you-go
                    </Button>
                  </CardContent>
                </Card>
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

          <Button variant="outline" size="lg" className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50">
            <Calendar className="h-5 w-5 mr-2" />
            Visa detaljerad plan
          </Button>
        </div>
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalTreatmentPlan;