import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Home, Building2, Star, Clock, DollarSign, Sparkles, Trash2 } from 'lucide-react';
import { ConsultationHeader } from './ConsultationHeader';
import { StepWrapper } from './StepWrapper';
import { TreatmentPlan, ProductRecommendation, TreatmentRecommendation } from '@/types/consultation';

interface TreatmentPlanStepProps {
  treatmentPlan: TreatmentPlan;
  onTreatmentPlanChange: (plan: TreatmentPlan) => void;
  selectedProblems: string[];
  skinScore: number;
  riskLevel: string;
  onBack: () => void;
  onContinue: () => void;
}

// Mock product database
const MOCK_PRODUCTS: ProductRecommendation[] = [
  {
    id: 'cleanse-1',
    name: 'Gentle Cleansing Gel',
    brand: 'SkinCeuticals',
    type: 'cleanser',
    usage: 'Morgon och kväll',
    price: 450,
    priority: 'essential',
    description: 'Mild rengöring för känslig aknebenägen hud'
  },
  {
    id: 'serum-1',
    name: 'Niacinamide 10% + Zinc',
    brand: 'The Ordinary',
    type: 'serum',
    usage: 'Kvällsrutinen',
    price: 89,
    priority: 'essential',
    description: 'Minskar synligheten av porer och kontrollerar talgproduktion'
  },
  {
    id: 'serum-2',
    name: 'Retinol 0.5%',
    brand: 'Paula\'s Choice',
    type: 'treatment',
    usage: '2-3 gånger per vecka',
    price: 395,
    priority: 'recommended',
    description: 'Accelererar cellförnyelse och förbättrar hudtextur'
  },
  {
    id: 'moisturizer-1',
    name: 'Ultra Facial Cream',
    brand: 'Kiehl\'s',
    type: 'moisturizer',
    usage: 'Morgon och kväll',
    price: 350,
    priority: 'essential',
    description: 'Återfuktar utan att täppa till porer'
  },
  {
    id: 'sunscreen-1',
    name: 'Anthelios Fluid SPF 50+',
    brand: 'La Roche-Posay',
    type: 'sunscreen',
    usage: 'Varje morgon',
    price: 225,
    priority: 'essential',
    description: 'Bred spektrum solskydd för aknebenägen hud'
  }
];

const MOCK_TREATMENTS: TreatmentRecommendation[] = [
  {
    id: 'treatment-1',
    name: 'HydraFacial MD',
    sessions: 4,
    frequency: 'Var 3:e vecka',
    price: 1200,
    priority: 'essential',
    contraindications: [],
    description: 'Djuprengöring och återfuktning för aknebenägen hud'
  },
  {
    id: 'treatment-2',
    name: 'LED-ljusterapi',
    sessions: 8,
    frequency: '2 gånger per vecka',
    price: 500,
    priority: 'recommended',
    contraindications: ['Ljuskänsliga mediciner'],
    description: 'Antiinflammatorisk behandling som accelererar läkning'
  },
  {
    id: 'treatment-3',
    name: 'Kemisk peeling (Salicylsyra)',
    sessions: 6,
    frequency: 'Var 2:a vecka',
    price: 800,
    priority: 'recommended',
    contraindications: ['Retinoider', 'Graviditet'],
    description: 'Exfolierar och rengör porer på djupet'
  }
];

export function TreatmentPlanStep({
  treatmentPlan,
  onTreatmentPlanChange,
  selectedProblems,
  skinScore,
  riskLevel,
  onBack,
  onContinue
}: TreatmentPlanStepProps) {
  const [activeTab, setActiveTab] = useState<'homecare' | 'cliniccare'>('homecare');

  // Generate AI recommendations based on problems and skin score
  const generateRecommendations = () => {
    const hasAcne = selectedProblems.some(p => p.toLowerCase().includes('acne'));
    const severity = skinScore > 70 ? 'severe' : skinScore > 40 ? 'medium' : 'light';
    
    let recommendedProducts = MOCK_PRODUCTS.filter(product => {
      if (hasAcne) return true; // All products are acne-focused in this mock
      return product.priority === 'essential';
    });

    let recommendedTreatments = MOCK_TREATMENTS.filter(treatment => {
      // Filter based on contraindications and severity
      if (riskLevel === 'high') return treatment.priority === 'essential';
      return severity === 'severe' || treatment.priority === 'essential';
    });

    const newPlan: TreatmentPlan = {
      homecare: {
        morning: recommendedProducts.filter(p => p.usage.includes('Morgon')),
        evening: recommendedProducts.filter(p => p.usage.includes('kväll')),
        weekly: recommendedProducts.filter(p => p.usage.includes('vecka'))
      },
      cliniccare: {
        treatments: recommendedTreatments,
        schedule: severity === 'severe' ? 'Intensivperiod: 3 månader' : 'Standardbehandling: 2 månader',
        followUp: 'Kontroll efter 4-6 veckor'
      },
      notes: `Anpassad behandlingsplan baserat på ${selectedProblems.join(', ')} med svårighetsgrad ${severity}.`,
      totalHomecarePrice: recommendedProducts.reduce((sum, p) => sum + p.price, 0),
      totalClinicPrice: recommendedTreatments.reduce((sum, t) => sum + (t.price * t.sessions), 0)
    };

    onTreatmentPlanChange(newPlan);
  };

  const toggleProduct = (product: ProductRecommendation, timeOfDay: 'morning' | 'evening' | 'weekly') => {
    const currentProducts = treatmentPlan.homecare[timeOfDay];
    const exists = currentProducts.some(p => p.id === product.id);
    
    const newProducts = exists 
      ? currentProducts.filter(p => p.id !== product.id)
      : [...currentProducts, product];

    const newPlan = {
      ...treatmentPlan,
      homecare: {
        ...treatmentPlan.homecare,
        [timeOfDay]: newProducts
      }
    };

    // Recalculate total price
    const allProducts = [...newPlan.homecare.morning, ...newPlan.homecare.evening, ...newPlan.homecare.weekly];
    newPlan.totalHomecarePrice = allProducts.reduce((sum, p) => sum + p.price, 0);

    onTreatmentPlanChange(newPlan);
  };

  const toggleTreatment = (treatment: TreatmentRecommendation) => {
    const currentTreatments = treatmentPlan.cliniccare.treatments;
    const exists = currentTreatments.some(t => t.id === treatment.id);
    
    const newTreatments = exists 
      ? currentTreatments.filter(t => t.id !== treatment.id)
      : [...currentTreatments, treatment];

    const newPlan = {
      ...treatmentPlan,
      cliniccare: {
        ...treatmentPlan.cliniccare,
        treatments: newTreatments
      }
    };

    // Recalculate total price
    newPlan.totalClinicPrice = newTreatments.reduce((sum, t) => sum + (t.price * t.sessions), 0);

    onTreatmentPlanChange(newPlan);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'essential': return 'bg-red-100 text-red-800 border-red-200';
      case 'recommended': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'optional': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'essential': return 'Nödvändig';
      case 'recommended': return 'Rekommenderad';
      case 'optional': return 'Valfri';
      default: return priority;
    }
  };

  const clearAllRecommendations = () => {
    const clearedPlan: TreatmentPlan = {
      homecare: {
        morning: [],
        evening: [],
        weekly: []
      },
      cliniccare: {
        treatments: [],
        schedule: '',
        followUp: ''
      },
      notes: treatmentPlan.notes, // Keep the notes
      totalHomecarePrice: 0,
      totalClinicPrice: 0
    };

    onTreatmentPlanChange(clearedPlan);
  };

  return (
    <div className="space-y-6">
      <ConsultationHeader
        onBack={onBack}
        onContinue={onContinue}
        canContinue={true}
        currentStep={10}
        totalSteps={11}
        continueText="Slutför behandlingsplan"
      />

      <StepWrapper 
        title="Behandlingsplan & Rekommendationer"
        subtitle="Personliga rekommendationer för hemmavård och klinikvård"
      >
        {/* AI Recommendation and Clear Buttons */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={generateRecommendations}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generera AI-rekommendationer
          </Button>
          <Button
            onClick={clearAllRecommendations}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Rensa alla rekommendationer
          </Button>
          <div className="text-sm text-gray-600 mt-2 sm:mt-0 sm:ml-4 sm:self-center">
            Skapa automatiska rekommendationer baserat på diagnos och hudanalys
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === 'homecare' ? 'default' : 'outline'}
            onClick={() => setActiveTab('homecare')}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Hemmavård
          </Button>
          <Button
            variant={activeTab === 'cliniccare' ? 'default' : 'outline'}
            onClick={() => setActiveTab('cliniccare')}
            className="flex items-center gap-2"
          >
            <Building2 className="h-4 w-4" />
            Klinikvård
          </Button>
        </div>

        {/* Homecare Tab */}
        {activeTab === 'homecare' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Hemmavård - Produktrekommendationer</span>
                  <Badge variant="outline" className="bg-green-50">
                    Totalt: {treatmentPlan.totalHomecarePrice} kr
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Morning Routine */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Morgonrutin
                  </h4>
                  <div className="grid gap-3">
                    {MOCK_PRODUCTS.filter(p => p.usage.includes('Morgon')).map(product => {
                      const isSelected = treatmentPlan.homecare.morning.some(p => p.id === product.id);
                      return (
                        <div
                          key={product.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            isSelected ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => toggleProduct(product, 'morning')}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="font-medium">{product.name}</h5>
                                <Badge className={getPriorityColor(product.priority)}>
                                  {getPriorityText(product.priority)}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
                              <p className="text-sm text-gray-700">{product.description}</p>
                              <p className="text-xs text-gray-500 mt-1">{product.usage}</p>
                            </div>
                            <div className="text-right">
                              <span className="font-medium">{product.price} kr</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Evening Routine */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Kvällsrutin
                  </h4>
                  <div className="grid gap-3">
                    {MOCK_PRODUCTS.filter(p => p.usage.includes('kväll')).map(product => {
                      const isSelected = treatmentPlan.homecare.evening.some(p => p.id === product.id);
                      return (
                        <div
                          key={product.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            isSelected ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => toggleProduct(product, 'evening')}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="font-medium">{product.name}</h5>
                                <Badge className={getPriorityColor(product.priority)}>
                                  {getPriorityText(product.priority)}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
                              <p className="text-sm text-gray-700">{product.description}</p>
                              <p className="text-xs text-gray-500 mt-1">{product.usage}</p>
                            </div>
                            <div className="text-right">
                              <span className="font-medium">{product.price} kr</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Weekly Treatments */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Veckobehandlingar
                  </h4>
                  <div className="grid gap-3">
                    {MOCK_PRODUCTS.filter(p => p.usage.includes('vecka')).map(product => {
                      const isSelected = treatmentPlan.homecare.weekly.some(p => p.id === product.id);
                      return (
                        <div
                          key={product.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            isSelected ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => toggleProduct(product, 'weekly')}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="font-medium">{product.name}</h5>
                                <Badge className={getPriorityColor(product.priority)}>
                                  {getPriorityText(product.priority)}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
                              <p className="text-sm text-gray-700">{product.description}</p>
                              <p className="text-xs text-gray-500 mt-1">{product.usage}</p>
                            </div>
                            <div className="text-right">
                              <span className="font-medium">{product.price} kr</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Cliniccare Tab */}
        {activeTab === 'cliniccare' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Klinikvård - Behandlingsplan</span>
                  <Badge variant="outline" className="bg-purple-50">
                    Totalt: {treatmentPlan.totalClinicPrice} kr
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  {MOCK_TREATMENTS.map(treatment => {
                    const isSelected = treatmentPlan.cliniccare.treatments.some(t => t.id === treatment.id);
                    const hasContraindications = treatment.contraindications.length > 0;
                    
                    return (
                      <div
                        key={treatment.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          isSelected ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                        } ${hasContraindications ? 'border-l-4 border-l-yellow-400' : ''}`}
                        onClick={() => toggleTreatment(treatment)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-medium">{treatment.name}</h5>
                              <Badge className={getPriorityColor(treatment.priority)}>
                                {getPriorityText(treatment.priority)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{treatment.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>{treatment.sessions} sessioner</span>
                              <span>{treatment.frequency}</span>
                            </div>
                            {hasContraindications && (
                              <Alert className="mt-2 border-yellow-200 bg-yellow-50">
                                <AlertDescription className="text-yellow-800 text-xs">
                                  Kontraindikationer: {treatment.contraindications.join(', ')}
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>
                          <div className="text-right">
                            <span className="font-medium">{treatment.price} kr/session</span>
                            <p className="text-xs text-gray-500">
                              Totalt: {treatment.price * treatment.sessions} kr
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Behandlingsschema</h4>
                    <p className="text-sm text-gray-700">{treatmentPlan.cliniccare.schedule}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Uppföljning</h4>
                    <p className="text-sm text-gray-700">{treatmentPlan.cliniccare.followUp}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Behandlingsanteckningar</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={treatmentPlan.notes}
              onChange={(e) => onTreatmentPlanChange({ ...treatmentPlan, notes: e.target.value })}
              placeholder="Lägg till personliga anteckningar om behandlingsplanen..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Summary */}
        <Alert className="border-blue-200 bg-blue-50">
          <DollarSign className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <div className="flex justify-between items-center">
              <span>
                <strong>Sammanfattning:</strong> Hemmavård ({treatmentPlan.totalHomecarePrice} kr) + 
                Klinikvård ({treatmentPlan.totalClinicPrice} kr)
              </span>
              <span className="font-bold">
                Totalt: {treatmentPlan.totalHomecarePrice + treatmentPlan.totalClinicPrice} kr
              </span>
            </div>
          </AlertDescription>
        </Alert>
      </StepWrapper>
    </div>
  );
}
