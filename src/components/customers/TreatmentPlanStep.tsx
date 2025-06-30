import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Home, Building2, DollarSign } from 'lucide-react';
import { ConsultationHeader } from './ConsultationHeader';
import { StepWrapper } from './StepWrapper';
import { RecommendationControls } from './treatment-plan/RecommendationControls';
import { HomecareTab } from './treatment-plan/HomecareTab';
import { CliniccareTab } from './treatment-plan/CliniccareTab';
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
    description: 'Accelererar cellförnyelse och förbättrer hudtextur'
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
        <RecommendationControls
          onGenerateRecommendations={generateRecommendations}
          onClearRecommendations={clearAllRecommendations}
        />

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
          <HomecareTab
            treatmentPlan={treatmentPlan}
            mockProducts={MOCK_PRODUCTS}
            onProductToggle={toggleProduct}
          />
        )}

        {/* Cliniccare Tab */}
        {activeTab === 'cliniccare' && (
          <CliniccareTab
            treatmentPlan={treatmentPlan}
            mockTreatments={MOCK_TREATMENTS}
            onTreatmentToggle={toggleTreatment}
          />
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
