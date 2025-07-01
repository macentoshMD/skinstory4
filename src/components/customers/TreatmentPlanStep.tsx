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
import { PackageConfigurationModal } from './treatment-plan/modals/PackageConfigurationModal';
import { TreatmentPlan, DetailedTreatmentRecommendation, DetailedProductRecommendation, ProductPackage } from '@/types/consultation';
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

// Enhanced mock data with new priority system and duration
const MOCK_DETAILED_TREATMENTS: DetailedTreatmentRecommendation[] = [
  {
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
  }
];

// Enhanced product data with new DAHL products
const MOCK_DETAILED_PRODUCTS: DetailedProductRecommendation[] = [
  // DAHL Balancing Cleanser
  {
    id: 'balancing-cleanser',
    name: 'Balancing Cleanser',
    brand: 'DAHL',
    type: 'cleanser',
    problems: ['acne', 'rosacea', 'blandhy'],
    usage: 'Kväll',
    price: 395,
    priority: 'need',
    description: 'Balanserande rengöring för aknebenägen hud',
    duration: '2-3 månader',
    costPerMonth: 175,
    sizes: [
      { size: '120ml', price: 395, duration: '2-3 månader' },
      { size: '240ml', price: 595, duration: '4-5 månader' }
    ],
    availableOptions: {
      strength: ['Level 1', 'Level 2', 'Level 3'],
      peelingkorn: true
    }
  },
  // Balancing Day Cream
  {
    id: 'balancing-day-cream',
    name: 'Balancing Day Cream',
    brand: 'DAHL',
    type: 'moisturizer',
    problems: ['acne', 'rosacea', 'blandhy'],
    usage: 'Morgon, dag, kväll',
    price: 395,
    priority: 'need',
    description: 'Balanserande dagkräm för aknebenägen hud',
    duration: '3-4 månader',
    costPerMonth: 145,
    sizes: [
      { size: '120ml', price: 395, duration: '3-4 månader' },
      { size: '240ml', price: 595, duration: '6-7 månader' }
    ],
    availableOptions: {}
  },
  // DAHL Activator
  {
    id: 'activator',
    name: 'Activator',
    brand: 'DAHL',
    type: 'serum',
    problems: ['acne', 'rosacea'],
    usage: 'Enligt rutin',
    price: 395,
    priority: 'need',
    description: 'Aktiverande serum för aknebehandling',
    duration: '4-6 månader',
    costPerMonth: 80,
    sizes: [
      { size: '60ml', price: 395, duration: '4-6 månader' }
    ],
    availableOptions: {
      strength: ['Level 1', 'Level 2', 'Level 3']
    }
  },
  // Balancing Sulfur Mask
  {
    id: 'balancing-sulfur-mask',
    name: 'Balancing Sulfur Mask',
    brand: 'DAHL',
    type: 'treatment',
    problems: ['acne', 'rosacea'],
    usage: 'Var fjärde dag',
    price: 380,
    priority: 'good',
    description: 'Balanserande svavelmask för aknebenägen hud',
    duration: '4-6 månader',
    costPerMonth: 80,
    sizes: [
      { size: '60ml', price: 380, duration: '4-6 månader' },
      { size: '120ml', price: 650, duration: '8-10 månader' }
    ],
    availableOptions: {}
  },
  // Balancing Night Cream
  {
    id: 'balancing-night-cream',
    name: 'Balancing Night Cream',
    brand: 'DAHL',
    type: 'moisturizer',
    problems: ['acne', 'rosacea'],
    usage: 'Kväll',
    price: 495,
    priority: 'good',
    description: 'Balanserande nattkräm för aknebenägen hud',
    duration: '3-4 månader',
    costPerMonth: 165,
    sizes: [
      { size: '60ml', price: 495, duration: '3-4 månader' }
    ],
    availableOptions: {}
  },
  // ... keep existing code (original products)
  {
    id: 'dahl-cleanse-gel',
    name: 'Gentle Cleansing Gel',
    brand: 'DAHL',
    type: 'cleanser',
    problems: ['acne', 'känslig-hud'],
    usage: 'Morgon och kväll',
    price: 450,
    priority: 'need',
    description: 'Mild rengöring för känslig aknebenägen hud med salicylsyra',
    duration: '3-4 månader',
    costPerMonth: 125,
    sizes: [
      { size: '150ml', price: 450, duration: '3-4 månader' },
      { size: '250ml', price: 650, duration: '5-6 månader' }
    ],
    availableOptions: {
      strength: ['Mild', 'Medium', 'Strong'],
      additives: ['Salicylsyra', 'Niacinamide']
    }
  },
  {
    id: 'dahl-acne-serum',
    name: 'Acne Control Serum',
    brand: 'DAHL',
    type: 'serum',
    problems: ['acne'],
    usage: 'Kvällsrutinen',
    price: 780,
    priority: 'need',
    description: 'Kraftfullt serum med retinol och niacinamide för aknebenägen hud',
    duration: '4-5 månader',
    costPerMonth: 175,
    sizes: [
      { size: '30ml', price: 780, duration: '4-5 månader' },
      { size: '50ml', price: 1200, duration: '6-7 månader' }
    ],
    availableOptions: {
      strength: ['0.25%', '0.5%', '1%'],
      additives: ['Hyaluronsyra', 'Peptider']
    }
  },
  {
    id: 'laroche-toleriane-cleanser',
    name: 'Toleriane Caring Wash',
    brand: 'La Roche-Posay',
    type: 'cleanser',
    problems: ['känslig-hud', 'rosacea'],
    usage: 'Morgon och kväll',
    price: 189,
    priority: 'good',
    description: 'Extra mild rengöring för mycket känslig hud',
    duration: '2-3 månader',
    costPerMonth: 75,
    sizes: [
      { size: '200ml', price: 189, duration: '2-3 månader' },
      { size: '400ml', price: 320, duration: '4-5 månader' }
    ],
    availableOptions: {
      additives: ['Prebiotika', 'Ceramider']
    }
  },
  {
    id: 'laroche-anthelios-sunscreen',
    name: 'Anthelios Ultra Fluid',
    brand: 'La Roche-Posay',
    type: 'sunscreen',
    problems: ['acne', 'pigmentflackar', 'känslig-hud'],
    usage: 'Varje morgon',
    price: 225,
    priority: 'need',
    description: 'Bred spektrum solskydd för aknebenägen hud',
    duration: '2-3 månader',
    costPerMonth: 90,
    sizes: [
      { size: '50ml', price: 225, duration: '2-3 månader' },
      { size: '100ml', price: 380, duration: '4-5 månader' }
    ],
    availableOptions: {
      spf: [30, 50, 60],
      microbeads: true,
      additives: ['Antioxidanter', 'Niacinamide']
    }
  },
  {
    id: 'skinceuticals-ce-ferulic',
    name: 'CE Ferulic',
    brand: 'SkinCeuticals',
    type: 'serum',
    problems: ['anti-age', 'pigmentflackar'],
    usage: 'Morgonrutinen',
    price: 1750,
    priority: 'good',
    description: 'Antioxidantserum med vitamin C, E och ferulasyra',
    duration: '6-8 månader',
    costPerMonth: 250,
    sizes: [
      { size: '30ml', price: 1750, duration: '6-8 månader' }
    ],
    availableOptions: {
      strength: ['15%', '20%']
    }
  }
];

// New product packages with Start and Standard options
const MOCK_PRODUCT_PACKAGES: ProductPackage[] = [
  // Single Acne Package
  {
    id: 'produktpaket-mot-akne',
    name: 'Produktpaket mot Akne',
    description: 'Komplett hudvårdsrutin specifikt utvecklat för aknebenägen hud',
    brand: 'DAHL',
    problems: ['acne'],
    priority: 'need',
    duration: '3-4 månader',
    costPerMonth: 450,
    totalPrice: 1650,
    originalPrice: 1980,
    discountPercent: 17,
    products: [
      {
        productId: 'balancing-cleanser',
        name: 'Balancing Cleanser',
        size: '120ml',
        quantity: 1,
        duration: '2-3 månader',
        attributes: { strength: 'Level 2', peelingkorn: false }
      },
      {
        productId: 'activator',
        name: 'Activator',
        size: '60ml',
        quantity: 1,
        duration: '4-6 månader',
        attributes: { strength: 'Level 2' }
      },
      {
        productId: 'balancing-sulfur-mask',
        name: 'Balancing Sulfur Mask',
        size: '60ml',
        quantity: 1,
        duration: '4-6 månader'
      },
      {
        productId: 'balancing-day-cream',
        name: 'Balancing Day Cream',
        size: '120ml',
        quantity: 1,
        duration: '3-4 månader'
      }
    ]
  },
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
  const [skinPlans, setSkinPlans] = useState<SkinPlan[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<DetailedProductRecommendation[]>([]);
  const [selectedPackages, setSelectedPackages] = useState<ProductPackage[]>([]);
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
  const [packageConfigModal, setPackageConfigModal] = useState<ProductPackage | null>(null);
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
      return product.priority === 'need'; // Changed from 'essential' to 'need'
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

  const handlePackageSelect = (pkg: ProductPackage) => {
    setPackageConfigModal(pkg);
    setProductModalOpen(false);
  };

  const handleProductConfirm = (configuredProduct: DetailedProductRecommendation) => {
    setSelectedProducts(prev => [...prev, configuredProduct]);
    setProductConfigModal(null);
  };

  const handlePackageConfirm = (configuredPackage: ProductPackage) => {
    setSelectedPackages(prev => [...prev, configuredPackage]);
    setPackageConfigModal(null);
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
  const removePackage = (packageId: string) => {
    setSelectedPackages(prev => prev.filter(p => p.id !== packageId));
  };

  const totalTreatmentPrice = skinPlans.reduce((sum, plan) => sum + plan.treatments.reduce((treatmentSum, treatment) => treatmentSum + treatment.pricing.totalPrice, 0), 0);
  const totalProductPrice = selectedProducts.reduce((sum, product) => sum + (product.configuration?.finalPrice || product.price), 0);
  const totalPackagePrice = selectedPackages.reduce((sum, pkg) => sum + (pkg.configuration?.finalPrice || pkg.totalPrice), 0);

  const getBrandColor = (brand: string) => {
    const colors: { [key: string]: string } = {
      'DAHL': 'text-blue-600',
      'La Roche-Posay': 'text-green-600',
      'SkinCeuticals': 'text-purple-600',
      'The Ordinary': 'text-orange-600'
    };
    return colors[brand] || 'text-gray-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'need': return 'text-red-600';
      case 'good': return 'text-orange-600';
      case 'nice': return 'text-gray-600';
      default: return 'text-gray-600';
    }
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

          {/* Products & Packages Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Produkter & Paket</span>
                <Button onClick={() => setProductModalOpen(true)} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Lägg till
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedProducts.length === 0 && selectedPackages.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Inga produkter eller paket valda</p>
              ) : (
                <>
                  {/* Individual Products */}
                  {selectedProducts.map(product => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{product.name}</h4>
                            <Badge variant="outline" className={getBrandColor(product.brand)}>
                              {product.brand}
                            </Badge>
                            <Badge variant="outline" className={getPriorityColor(product.priority)}>
                              {product.priority === 'need' ? 'MÅSTE HA' : product.priority === 'good' ? 'BRA ATT HA' : 'TREVLIGT'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{product.description}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{product.usage}</span>
                            <span>•</span>
                            <span>{product.type}</span>
                            <span>•</span>
                            <span>{Math.round(product.costPerMonth)} kr/mån</span>
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
                      
                      {product.configuration && (
                        <div className="text-sm space-y-1 bg-gray-50 p-3 rounded">
                          {product.configuration.selectedSize && <p><span className="font-medium">Storlek:</span> {product.configuration.selectedSize}</p>}
                          {product.configuration.selectedStrength && <p><span className="font-medium">Styrka:</span> {product.configuration.selectedStrength}</p>}
                          {product.configuration.selectedSPF && <p><span className="font-medium">SPF:</span> {product.configuration.selectedSPF}</p>}
                          {product.configuration.selectedAdditives && product.configuration.selectedAdditives.length > 0 && (
                            <p><span className="font-medium">Tillsatser:</span> {product.configuration.selectedAdditives.join(', ')}</p>
                          )}
                          {product.configuration.withMicrobeads && <p><span className="font-medium">Med mikrobeads</span></p>}
                          <p className="font-bold text-blue-600 pt-1">Pris: {product.configuration.finalPrice} kr</p>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Product Packages */}
                  {selectedPackages.map(pkg => (
                    <div key={pkg.id} className="border rounded-lg p-4 bg-blue-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{pkg.name}</h4>
                            <Badge variant="outline" className={getBrandColor(pkg.brand)}>
                              {pkg.brand}
                            </Badge>
                            <Badge variant="outline" className={getPriorityColor(pkg.priority)}>
                              {pkg.priority === 'need' ? 'MÅSTE HA' : pkg.priority === 'good' ? 'BRA ATT HA' : 'TREVLIGT'}
                            </Badge>
                            <Badge className="bg-blue-500 text-white">PAKET</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{pkg.description}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{pkg.duration}</span>
                            <span>•</span>
                            <span>{Math.round(pkg.costPerMonth)} kr/mån</span>
                            <span>•</span>
                            <span>{pkg.products.length} produkter</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setPackageConfigModal(pkg)}>
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => removePackage(pkg.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-sm space-y-1 bg-white p-3 rounded">
                        <p className="font-medium mb-2">Paketinnehåll:</p>
                        {pkg.products.map((product, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span>{product.name} ({product.size})</span>
                            <span className="text-gray-500">{product.duration}</span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="font-bold text-blue-600">Totalt: {pkg.configuration?.finalPrice || pkg.totalPrice} kr</span>
                          {pkg.discountPercent && (
                            <span className="text-green-600 text-xs">Spara {pkg.discountPercent}%</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
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
                Produkter ({totalProductPrice.toLocaleString('sv-SE')} kr) + 
                Paket ({totalPackagePrice.toLocaleString('sv-SE')} kr)
              </span>
              <span className="font-bold">
                Totalt: {(totalTreatmentPrice + totalProductPrice + totalPackagePrice).toLocaleString('sv-SE')} kr
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
        availablePackages={MOCK_PRODUCT_PACKAGES}
        onProductSelect={handleProductSelect}
        onPackageSelect={handlePackageSelect}
        selectedProblems={selectedProblems}
      />

      <ProductConfigurationModal isOpen={!!productConfigModal} onClose={() => setProductConfigModal(null)} product={productConfigModal} onConfirm={handleProductConfirm} />

      <PackageConfigurationModal isOpen={!!packageConfigModal} onClose={() => setPackageConfigModal(null)} package={packageConfigModal} onConfirm={handlePackageConfirm} />
    </div>;
}
