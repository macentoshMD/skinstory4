import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Settings, Trash2, DollarSign } from 'lucide-react';
import { ConsultationHeader } from './ConsultationHeader';
import { StepWrapper } from './StepWrapper';
import { RecommendationControls } from './treatment-plan/RecommendationControls';
import { ServiceSelectionModal } from './treatment-plan/modals/ServiceSelectionModal';
import { ServiceConfigurationModal } from './treatment-plan/modals/ServiceConfigurationModal';
import { ProductSelectionModal } from './treatment-plan/modals/ProductSelectionModal';
import { ProductConfigurationModal } from './treatment-plan/modals/ProductConfigurationModal';
import { TreatmentPlan, DetailedTreatmentRecommendation, DetailedProductRecommendation } from '@/types/consultation';
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
  const [selectedServices, setSelectedServices] = useState<DetailedTreatmentRecommendation[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<DetailedProductRecommendation[]>([]);

  // Modal states
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [serviceConfigModal, setServiceConfigModal] = useState<DetailedTreatmentRecommendation | null>(null);
  const [productConfigModal, setProductConfigModal] = useState<DetailedProductRecommendation | null>(null);
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
    setSelectedServices(recommendedTreatments);
    setSelectedProducts(recommendedProducts);
  };
  const clearAllRecommendations = () => {
    setSelectedServices([]);
    setSelectedProducts([]);
  };
  const handleServiceSelect = (service: DetailedTreatmentRecommendation) => {
    setServiceConfigModal(service);
    setServiceModalOpen(false);
  };
  const handleServiceConfirm = (configuredService: DetailedTreatmentRecommendation) => {
    setSelectedServices(prev => [...prev, configuredService]);
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
  const removeService = (serviceId: string) => {
    setSelectedServices(prev => prev.filter(s => s.id !== serviceId));
  };
  const removeProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };
  const totalTreatmentPrice = selectedServices.reduce((sum, service) => sum + (service.configuration?.totalPrice || service.price * service.sessions), 0);
  const totalProductPrice = selectedProducts.reduce((sum, product) => sum + (product.configuration?.finalPrice || product.price), 0);
  return <div className="space-y-6">
      <ConsultationHeader onBack={onBack} onContinue={onContinue} canContinue={true} currentStep={10} totalSteps={11} continueText="Slutför behandlingsplan" />

      <StepWrapper title="Behandlingsplan & Rekommendationer" subtitle="Personliga rekommendationer för behandlingar och produkter">
        <RecommendationControls onGenerateRecommendations={generateRecommendations} onClearRecommendations={clearAllRecommendations} />

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Treatments Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Behandlingar</span>
                <Button onClick={() => setServiceModalOpen(true)} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Lägg till
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedServices.length === 0 ? <p className="text-gray-500 text-center py-8">Inga behandlingar valda</p> : selectedServices.map(service => <div key={service.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setServiceConfigModal(service)}>
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => removeService(service.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {service.configuration && <div className="text-sm text-gray-600 space-y-1">
                        <p>Handpiece: {service.configuration.selectedHandpiece}</p>
                        <p>Sessioner: {service.configuration.numberOfSessions}</p>
                        <p>Intervall: {service.configuration.intervalWeeks} veckor</p>
                        <p className="font-medium">Pris: {service.configuration.totalPrice} kr</p>
                      </div>}
                  </div>)}
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

        {/* Notes */}
        <Card>
          
          
        </Card>

        {/* Summary */}
        <Alert className="border-blue-200 bg-blue-50 px-0 my-[30px]">
          <DollarSign className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <div className="flex justify-between items-center">
              <span>
                <strong>Sammanfattning:</strong> Behandlingar ({totalTreatmentPrice} kr) + 
                Produkter ({totalProductPrice} kr)
              </span>
              <span className="font-bold">
                Totalt: {totalTreatmentPrice + totalProductPrice} kr
              </span>
            </div>
          </AlertDescription>
        </Alert>
      </StepWrapper>

      {/* Modals */}
      <ServiceSelectionModal isOpen={serviceModalOpen} onClose={() => setServiceModalOpen(false)} availableServices={MOCK_DETAILED_TREATMENTS} onServiceSelect={handleServiceSelect} />

      <ServiceConfigurationModal isOpen={!!serviceConfigModal} onClose={() => setServiceConfigModal(null)} service={serviceConfigModal} onConfirm={handleServiceConfirm} />

      <ProductSelectionModal isOpen={productModalOpen} onClose={() => setProductModalOpen(false)} availableProducts={MOCK_DETAILED_PRODUCTS} onProductSelect={handleProductSelect} />

      <ProductConfigurationModal isOpen={!!productConfigModal} onClose={() => setProductConfigModal(null)} product={productConfigModal} onConfirm={handleProductConfirm} />
    </div>;
}