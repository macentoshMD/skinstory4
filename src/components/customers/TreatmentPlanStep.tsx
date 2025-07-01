import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Settings, Trash2, DollarSign, Calendar } from 'lucide-react';
import { ConsultationHeader } from './ConsultationHeader';
import { StepWrapper } from './StepWrapper';
import { RecommendationControls } from './treatment-plan/RecommendationControls';
import { MethodSelectionModal } from './treatment-plan/method-selection/MethodSelectionModal';
import { MethodBasedServiceModal } from './treatment-plan/method-selection/MethodBasedServiceModal';
import { EnhancedServiceConfigurationModal } from './treatment-plan/enhanced-config/EnhancedServiceConfigurationModal';
import { SkinPlanCard } from './treatment-plan/skin-plan/SkinPlanCard';
import { ProductSelectionModal } from './treatment-plan/modals/ProductSelectionModal';
import { ProductConfigurationModal } from './treatment-plan/modals/ProductConfigurationModal';
import { TreatmentPlan, DetailedTreatmentRecommendation, DetailedProductRecommendation } from '@/types/consultation';
import { TreatmentMethod, SkinPlan, ConfiguredTreatment, FollowUpAppointment } from '@/types/treatment-methods';
import { Badge } from '@/components/ui/badge';
interface TreatmentPlanStepProps {
  treatmentPlan: TreatmentPlan;
  onTreatmentPlanChange: (plan: TreatmentPlan) => void;
  selectedProblems: string[];
  skinScore: number;
  riskLevel: string;
  onBack: () => void;
  onContinue: () => void;
}

// Enhanced mock data with configuration options
const MOCK_DETAILED_TREATMENTS: DetailedTreatmentRecommendation[] = [{
  id: 'treatment-1',
  name: 'HydraFacial MD',
  sessions: 4,
  frequency: 'Var 3:e vecka',
  price: 1200,
  priority: 'essential',
  contraindications: [],
  description: 'Djuprengöring och återfuktning för aknebenägen hud',
  category: 'Ansiktsbehandling',
  availableHandpieces: ['Standard tip', 'Sensitive tip', 'Deep cleansing tip'],
  treatmentAreas: ['Ansikte', 'Hals', 'Dekolletage', 'Rygg']
}, {
  id: 'treatment-2',
  name: 'LED-ljusterapi',
  sessions: 8,
  frequency: '2 gånger per vecka',
  price: 500,
  priority: 'recommended',
  contraindications: ['Ljuskänsliga mediciner'],
  description: 'Antiinflammatorisk behandling som accelererar läkning',
  category: 'Ljusterapi',
  availableHandpieces: ['Red light panel', 'Blue light panel', 'Combined panel'],
  treatmentAreas: ['Ansikte', 'Rygg', 'Bröst']
}, {
  id: 'treatment-3',
  name: 'Kemisk peeling (Salicylsyra)',
  sessions: 6,
  frequency: 'Var 2:a vecka',
  price: 800,
  priority: 'recommended',
  contraindications: ['Retinoider', 'Graviditet'],
  description: 'Exfolierar och rengör porer på djupet',
  category: 'Kemisk peeling',
  availableHandpieces: [],
  treatmentAreas: ['Ansikte', 'Hals', 'Rygg', 'Bröst']
}];
const MOCK_DETAILED_PRODUCTS: DetailedProductRecommendation[] = [{
  id: 'cleanse-1',
  name: 'Gentle Cleansing Gel',
  brand: 'SkinCeuticals',
  type: 'cleanser',
  usage: 'Morgon och kväll',
  price: 450,
  priority: 'essential',
  description: 'Mild rengöring för känslig aknebenägen hud',
  availableOptions: {
    strength: ['Mild', 'Medium', 'Strong']
  }
}, {
  id: 'serum-1',
  name: 'Niacinamide 10% + Zinc',
  brand: 'The Ordinary',
  type: 'serum',
  usage: 'Kvällsrutinen',
  price: 89,
  priority: 'essential',
  description: 'Minskar synligheten av porer och kontrollerar talgproduktion',
  availableOptions: {
    strength: ['5%', '10%', '15%']
  }
}, {
  id: 'sunscreen-1',
  name: 'Anthelios Fluid SPF 50+',
  brand: 'La Roche-Posay',
  type: 'sunscreen',
  usage: 'Varje morgon',
  price: 225,
  priority: 'essential',
  description: 'Bred spektrum solskydd för aknebenägen hud',
  availableOptions: {
    spf: [25, 30, 50],
    microbeads: true
  }
}];
export function TreatmentPlanStep({
  treatmentPlan,
  onTreatmentPlanChange,
  selectedProblems,
  skinScore,
  riskLevel,
  onBack,
  onContinue
}: TreatmentPlanStepProps) {
  const [skinPlans, setSkinPlans] = useState<SkinPlan[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<DetailedProductRecommendation[]>([]);
  const [notes, setNotes] = useState<string>('');

  // Modal states
  const [methodModalOpen, setMethodModalOpen] = useState(false);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [serviceConfigModal, setServiceConfigModal] = useState<{
    service: DetailedTreatmentRecommendation;
    method: TreatmentMethod;
  } | null>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [productConfigModal, setProductConfigModal] = useState<DetailedProductRecommendation | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<TreatmentMethod | null>(null);
  const generateRecommendations = () => {
    const hasAcne = selectedProblems.some(p => p.toLowerCase().includes('acne'));
    const severity = skinScore > 70 ? 'severe' : skinScore > 40 ? 'medium' : 'light';
    let recommendedTreatments = MOCK_DETAILED_TREATMENTS.filter(treatment => {
      if (riskLevel === 'high') return treatment.priority === 'essential';
      return severity === 'severe' || treatment.priority === 'essential';
    });
    let recommendedProducts = MOCK_DETAILED_PRODUCTS.filter(product => {
      if (hasAcne) return true;
      return product.priority === 'essential';
    });

    // You can now use recommendedTreatments and recommendedProducts to update your state or UI
    // For example:
    // setSelectedServices(recommendedTreatments);
    // setSelectedProducts(recommendedProducts);
  };
  const clearAllRecommendations = () => {
    setSkinPlans([]);
    setSelectedProducts([]);
    setNotes('');
  };
  const handleMethodSelect = (method: TreatmentMethod) => {
    setSelectedMethod(method);
    setServiceModalOpen(true);
    setMethodModalOpen(false);
  };
  const handleServiceSelect = (service: DetailedTreatmentRecommendation) => {
    if (selectedMethod) {
      setServiceConfigModal({
        service,
        method: selectedMethod
      });
      setServiceModalOpen(false);
    }
  };
  const handleServiceConfirm = (configuredTreatment: ConfiguredTreatment, followUps: FollowUpAppointment[]) => {
    const newSkinPlan: SkinPlan = {
      id: `plan-${Date.now()}`,
      startDate: configuredTreatment.configuration.sessionDates[0] || new Date(),
      endDate: new Date(Date.now() + configuredTreatment.configuration.numberOfSessions * configuredTreatment.configuration.intervalWeeks * 7 * 24 * 60 * 60 * 1000),
      totalSessions: configuredTreatment.configuration.numberOfSessions,
      intervalWeeks: configuredTreatment.configuration.intervalWeeks,
      treatments: [configuredTreatment],
      followUpDates: followUps,
      status: 'planned',
      notes: ''
    };
    setSkinPlans(prev => [...prev, newSkinPlan]);
    setServiceConfigModal(null);
  };
  const handleProductSelect = (product: DetailedProductRecommendation) => {
    setProductConfigModal(product);
    setProductModalOpen(false);
  };
  const handleProductConfirm = (configuredProduct: DetailedProductRecommendation) => {
    setSelectedProducts(prev => [...prev, configuredProduct]);
    setProductConfigModal(null);
  };
  const removeSkinPlan = (skinPlanId: string) => {
    setSkinPlans(prev => prev.filter(plan => plan.id !== skinPlanId));
  };
  const editSkinPlan = (skinPlan: SkinPlan) => {
    // TODO: Implement edit functionality
    console.log('Edit skin plan:', skinPlan);
  };
  const removeProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };
  const totalTreatmentPrice = skinPlans.reduce((sum, plan) => sum + plan.treatments.reduce((treatmentSum, treatment) => treatmentSum + treatment.pricing.totalPrice, 0), 0);
  const totalProductPrice = selectedProducts.reduce((sum, product) => sum + (product.configuration?.finalPrice || product.price), 0);
  return <div className="space-y-6">
      <ConsultationHeader onBack={onBack} onContinue={onContinue} canContinue={true} currentStep={10} totalSteps={11} continueText="Slutför behandlingsplan" />

      <StepWrapper title="Behandlingsplan & Rekommendationer" subtitle="Skapa personliga behandlingsplaner med metodfokus">
        <RecommendationControls onGenerateRecommendations={generateRecommendations} onClearRecommendations={clearAllRecommendations} />

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Treatment Plans Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Behandlingar</span>
                </div>
                <Button onClick={() => setMethodModalOpen(true)} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Lägg till plan
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {skinPlans.length === 0 ? <p className="text-gray-500 text-center py-8">
                  Inga behandlingsplaner skapade. Klicka på "Lägg till plan" för att börja.
                </p> : skinPlans.map(plan => <SkinPlanCard key={plan.id} skinPlan={plan} onEdit={editSkinPlan} onDelete={removeSkinPlan} />)}
            </CardContent>
          </Card>

          {/* Products Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Produkter</span>
                <Button onClick={() => setProductModalOpen(true)} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Lägg till
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedProducts.length === 0 ? <p className="text-gray-500 text-center py-8">Inga produkter valda</p> : selectedProducts.map(product => <div key={product.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.brand}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setProductConfigModal(product)}>
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => removeProduct(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {product.configuration && <div className="text-sm text-gray-600 space-y-1">
                        {product.configuration.selectedStrength && <p>Styrka: {product.configuration.selectedStrength}</p>}
                        {product.configuration.selectedSPF && <p>SPF: {product.configuration.selectedSPF}</p>}
                        {product.configuration.withMicrobeads && <p>Med mikrobeads</p>}
                        <p className="font-medium">Pris: {product.configuration.finalPrice} kr</p>
                      </div>}
                  </div>)}
            </CardContent>
          </Card>
        </div>

        {/* Notes Section */}
        <Card>
          <CardHeader>
            <CardTitle>Anteckningar</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="Lägg till anteckningar om behandlingsplanen..." value={notes} onChange={e => setNotes(e.target.value)} rows={4} />
          </CardContent>
        </Card>

        {/* Summary */}
        <Alert className="border-blue-200 bg-blue-50 px-0 my-[30px]">
          <DollarSign className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <div className="flex justify-between items-center">
              <span>
                <strong>Sammanfattning:</strong> Behandlingsplaner ({totalTreatmentPrice.toLocaleString('sv-SE')} kr) + 
                Produkter ({totalProductPrice.toLocaleString('sv-SE')} kr)
              </span>
              <span className="font-bold">
                Totalt: {(totalTreatmentPrice + totalProductPrice).toLocaleString('sv-SE')} kr
              </span>
            </div>
          </AlertDescription>
        </Alert>
      </StepWrapper>

      {/* Modals */}
      <MethodSelectionModal isOpen={methodModalOpen} onClose={() => setMethodModalOpen(false)} onMethodSelect={handleMethodSelect} selectedProblems={selectedProblems} />

      <MethodBasedServiceModal isOpen={serviceModalOpen} onClose={() => setServiceModalOpen(false)} method={selectedMethod} availableServices={MOCK_DETAILED_TREATMENTS} onServiceSelect={handleServiceSelect} />

      <EnhancedServiceConfigurationModal isOpen={!!serviceConfigModal} onClose={() => setServiceConfigModal(null)} service={serviceConfigModal?.service || null} method={serviceConfigModal?.method || null} onConfirm={handleServiceConfirm} />

      <ProductSelectionModal isOpen={productModalOpen} onClose={() => setProductModalOpen(false)} availableProducts={MOCK_DETAILED_PRODUCTS} onProductSelect={handleProductSelect} />

      <ProductConfigurationModal isOpen={!!productConfigModal} onClose={() => setProductConfigModal(null)} product={productConfigModal} onConfirm={handleProductConfirm} />
    </div>;
}