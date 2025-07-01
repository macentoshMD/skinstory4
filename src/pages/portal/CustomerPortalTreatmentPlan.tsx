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
  X
} from 'lucide-react';

const CustomerPortalTreatmentPlan = () => {
  const [showStartModal, setShowStartModal] = useState(false);

  // Mock treatment plan data
  const treatmentPlan = {
    problemName: 'Akne',
    duration: '12 veckor',
    totalSessions: 8,
    clinicSessions: 6,
    homeCareDays: 84,
    
    clinicTreatments: [
      {
        week: 1,
        treatment: 'Laser - Problem Skin - 5X',
        duration: '45 min',
        price: '9 995 kr'
      },
      {
        week: 3,
        treatment: 'Balancing Cleanser',
        duration: '30 min',
        price: '395 kr'
      },
      {
        week: 5,
        treatment: 'Activator',
        duration: '30 min',
        price: '395 kr'
      },
      {
        week: 7,
        treatment: 'Balancing Sulfur Mask',
        duration: '45 min',
        price: '495 kr'
      },
      {
        week: 9,
        treatment: 'Balancing Day Cream',
        duration: '30 min',
        price: '395 kr'
      },
      {
        week: 11,
        treatment: 'Pore cleansing',
        duration: '60 min',
        price: '999 kr'
      }
    ],

    homeCarePlan: [
      {
        product: 'Balancing Cleanser',
        usage: 'Morgon & kväll',
        duration: '12 veckor',
        price: '395 kr'
      },
      {
        product: 'Activator',
        usage: 'Morgon',
        duration: '12 veckor',
        price: '395 kr'
      },
      {
        product: 'Balancing Sulfur Mask',
        usage: '2x per vecka',
        duration: '12 veckor',
        price: '495 kr'
      },
      {
        product: 'Balancing Day Cream',
        usage: 'Morgon',
        duration: '12 veckor',
        price: '395 kr'
      },
      {
        product: 'Balancing Sun Cream',
        usage: 'Vid behov',
        duration: '12 veckor',
        price: '295 kr'
      }
    ],

    pricing: {
      commitTotal: '12 969 kr',
      payAsYouGoTotal: '18 745 kr',
      savings: '5 776 kr'
    }
  };

  const commitBenefits = [
    { icon: Home, text: 'Personal Home Care plan', included: true },
    { icon: Building2, text: 'Personal Clinic Care plan', included: true },
    { icon: Shield, text: 'Results guarantee', included: true },
    { icon: UserCheck, text: 'Personal therapist', included: true },
    { icon: Star, text: 'Priority booking', included: true }
  ];

  const payAsYouGoBenefits = [
    { icon: Home, text: 'Personal Home Care plan', included: true },
    { icon: Building2, text: 'Personal Clinic Care plan', included: true },
    { icon: Shield, text: 'Results guarantee', included: false },
    { icon: UserCheck, text: 'Personal therapist', included: false },
    { icon: Star, text: 'Priority booking', included: false }
  ];

  return (
    <CustomerPortalLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Din Behandlingsplan</h1>
          <p className="text-muted-foreground">
            Personlig plan för {treatmentPlan.problemName} - {treatmentPlan.duration}
          </p>
        </div>

        {/* Plan Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600">{treatmentPlan.totalSessions}</div>
              <p className="text-muted-foreground">Totala sessioner</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{treatmentPlan.clinicSessions}</div>
              <p className="text-muted-foreground">Klinikbehandlingar</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600">{treatmentPlan.homeCareDays}</div>
              <p className="text-muted-foreground">Dagar hemmavård</p>
            </CardContent>
          </Card>
        </div>

        {/* Clinic Treatments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Klinikbehandlingar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {treatmentPlan.clinicTreatments.map((treatment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">V{treatment.week}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{treatment.treatment}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {treatment.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{treatment.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Home Care Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-green-600" />
              Hemmavårdsplan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {treatmentPlan.homeCarePlan.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">{product.product}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{product.usage}</span>
                      <span>•</span>
                      <span>{product.duration}</span>
                    </div>
                  </div>
                  <div className="font-semibold">{product.price}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Start Treatment Button */}
        <div className="text-center">
          <Dialog open={showStartModal} onOpenChange={setShowStartModal}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-12">
                <Zap className="h-5 w-5 mr-2" />
                Starta behandlingsplan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Välj betalningsalternativ</DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Commit Option */}
                <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl text-purple-800">Commit</CardTitle>
                    <div className="text-3xl font-bold text-purple-600">{treatmentPlan.pricing.commitTotal}</div>
                    <p className="text-sm text-purple-700">
                      Spara {treatmentPlan.pricing.savings} jämfört med pay-as-you-go
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
                      Välj Commit
                    </Button>
                  </CardContent>
                </Card>

                {/* Pay-as-you-go Option */}
                <Card className="border-2 border-gray-200">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">Pay-as-you-go</CardTitle>
                    <div className="text-3xl font-bold">{treatmentPlan.pricing.payAsYouGoTotal}</div>
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
                      Välj Pay-as-you-go
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalTreatmentPlan;