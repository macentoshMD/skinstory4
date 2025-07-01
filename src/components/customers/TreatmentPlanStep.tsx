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
// Enhanced product data with problem mapping and images
const MOCK_DETAILED_PRODUCTS: DetailedProductRecommendation[] = [{
  id: 'dahl-cleanse-gel',
  name: 'Gentle Cleansing Gel',
  brand: 'DAHL',
  type: 'cleanser',
  problems: ['acne', 'känslig-hud'],
  usage: 'Morgon och kväll',
  price: 450,
  priority: 'essential',
  description: 'Mild rengöring för känslig aknebenägen hud med salicylsyra',
  sizes: [
    { size: '150ml', price: 450 },
    { size: '250ml', price: 650 }
  ],
  availableOptions: {
    strength: ['Mild', 'Medium', 'Strong'],
    additives: ['Salicylsyra', 'Niacinamide']
  }
}, {
  id: 'dahl-acne-serum',
  name: 'Acne Control Serum',
  brand: 'DAHL',
  type: 'serum',
  problems: ['acne'],
  usage: 'Kvällsrutinen',
  price: 780,
  priority: 'essential',
  description: 'Kraftfullt serum med retinol och niacinamide för aknebenägen hud',
  sizes: [
    { size: '30ml', price: 780 },
    { size: '50ml', price: 1200 }
  ],
  availableOptions: {
    strength: ['0.25%', '0.5%', '1%'],
    additives: ['Hyaluronsyra', 'Peptider']
  }
}, {
  id: 'laroche-toleriane-cleanser',
  name: 'Toleriane Caring Wash',
  brand: 'La Roche-Posay',
  type: 'cleanser',
  problems: ['känslig-hud', 'rosacea'],
  usage: 'Morgon och kväll',
  price: 189,
  priority: 'recommended',
  description: 'Extra mild rengöring för mycket känslig hud',
  sizes: [
    { size: '200ml', price: 189 },
    { size: '400ml', price: 320 }
  ],
  availableOptions: {
    additives: ['Prebiotika', 'Ceramider']
  }
}, {
  id: 'laroche-anthelios-sunscreen',
  name: 'Anthelios Ultra Fluid',
  brand: 'La Roche-Posay',
  type: 'sunscreen',
  problems: ['acne', 'pigmentflackar', 'känslig-hud'],
  usage: 'Varje morgon',
  price: 225,
  priority: 'essential',
  description: 'Bred spektrum solskydd för aknebenägen hud',
  sizes: [
    { size: '50ml', price: 225 },
    { size: '100ml', price: 380 }
  ],
  availableOptions: {
    spf: [30, 50, 60],
    microbeads: true,
    additives: ['Antioxidanter', 'Niacinamide']
  }
}, {
  id: 'skinceuticals-ce-ferulic',
  name: 'CE Ferulic',
  brand: 'SkinCeuticals',
  type: 'serum',
  problems: ['anti-age', 'pigmentflackar'],
  usage: 'Morgonrutinen',
  price: 1750,
  priority: 'recommended',
  description: 'Antioxidantserum med vitamin C, E och ferulasyra',
  sizes: [
    { size: '30ml', price: 1750 }
  ],
  availableOptions: {
    strength: ['15%', '20%']
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

  const getBrandColor = (brand: string) => {
    const colors: { [key: string]: string } = {
      'DAHL': 'text-blue-600',
      'La Roche-Posay': 'text-green-600',
      'SkinCeuticals': 'text-purple-600',
      'The Ordinary': 'text-orange-600'
    };
    return colors[brand] || 'text-gray-600';
  };

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
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{product.name}</h4>
                          <Badge variant="outline" className={getBrandColor(product.brand)}>
                            {product.brand}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{product.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{product.usage}</span>
                          <span>•</span>
                          <span>{product.type}</span>
                        </div>
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
                    
                    {product.configuration && <div className="text-sm space-y-1 bg-gray-50 p-3 rounded">
                        {product.configuration.selectedSize && <p><span className="font-medium">Storlek:</span> {product.configuration.selectedSize}</p>}
                        {product.configuration.selectedStrength && <p><span className="font-medium">Styrka:</span> {product.configuration.selectedStrength}</p>}
                        {product.configuration.selectedSPF && <p><span className="font-medium">SPF:</span> {product.configuration.selectedSPF}</p>}
                        {product.configuration.selectedAdditives && product.configuration.selectedAdditives.length > 0 && (
                          <p><span className="font-medium">Tillsatser:</span> {product.configuration.selectedAdditives.join(', ')}</p>
                        )}
                        {product.configuration.withMicrobeads && <p><span className="font-medium">Med mikrobeads</span></p>}
                        <p className="font-bold text-blue-600 pt-1">Pris: {product.configuration.finalPrice} kr</p>
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

      <ProductSelectionModal 
        isOpen={productModalOpen} 
        onClose={() => setProductModalOpen(false)} 
        availableProducts={MOCK_DETAILED_PRODUCTS} 
        onProductSelect={handleProductSelect}
        selectedProblems={selectedProblems}
      />

      <ProductConfigurationModal isOpen={!!productConfigModal} onClose={() => setProductConfigModal(null)} product={productConfigModal} onConfirm={handleProductConfirm} />
    </div>;
}
