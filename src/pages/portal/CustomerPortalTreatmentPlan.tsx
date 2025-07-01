import { CustomerPortalLayout } from '@/components/portal/CustomerPortalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Clock, 
  Droplets, 
  Sun, 
  Moon, 
  Package,
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react';

const CustomerPortalTreatmentPlan = () => {
  // Mock treatment plan data
  const treatmentPlan = {
    clinicTreatments: [
      {
        id: 1,
        name: 'LED-ljusterapi',
        nextSession: '2024-07-15',
        sessionsCompleted: 4,
        totalSessions: 8,
        frequency: 'Varannan vecka',
        duration: '45 minuter',
        therapist: 'Maria Svensson',
        status: 'active',
        problems: ['Akne', 'Inflammation']
      },
      {
        id: 2,
        name: 'Kemisk peeling',
        nextSession: '2024-07-22',
        sessionsCompleted: 2,
        totalSessions: 6,
        frequency: 'Var 3:e vecka',
        duration: '60 minuter',
        therapist: 'Anna Nilsson',
        status: 'active',
        problems: ['Ojämn hudton', 'Pigmentering']
      }
    ],
    homeRoutine: {
      morning: [
        {
          step: 1,
          product: 'Gentle Cleanser',
          instruction: 'Rengör ansiktet med ljummet vatten',
          duration: '2 minuter'
        },
        {
          step: 2,
          product: 'Vitamin C Serum',
          instruction: 'Applicera 3-4 droppar på ren hud',
          duration: '1 minut'
        },
        {
          step: 3,
          product: 'Moisturizer SPF 50',
          instruction: 'Fukta och skydda mot UV-strålning',
          duration: '1 minut'
        }
      ],
      evening: [
        {
          step: 1,
          product: 'Oil Cleanser',
          instruction: 'Ta bort makeup och smuts',
          duration: '2 minuter'
        },
        {
          step: 2,
          product: 'Gentle Cleanser',
          instruction: 'Djuprengör porerna',
          duration: '2 minuter'
        },
        {
          step: 3,
          product: 'Retinol Serum',
          instruction: 'Applicera varannan kväll på ren hud',
          duration: '1 minut',
          frequency: 'Varannan kväll'
        },
        {
          step: 4,
          product: 'Night Moisturizer',
          instruction: 'Fukta och reparera huden över natten',
          duration: '1 minut'
        }
      ],
      weekly: [
        {
          name: 'Exfoliering',
          product: 'BHA Exfoliant',
          frequency: '2 gånger per vecka',
          instruction: 'Applicera på kvällen efter rengöring'
        },
        {
          name: 'Fuktmask',
          product: 'Hydrating Mask',
          frequency: '1 gång per vecka',
          instruction: 'Lämna på i 15-20 minuter'
        }
      ]
    },
    products: [
      {
        id: 1,
        name: 'Gentle Cleanser',
        brand: 'SkinCare Pro',
        category: 'Rengöring',
        status: 'in-stock',
        lastOrdered: '2024-06-15',
        estimatedEmpty: '2024-08-15'
      },
      {
        id: 2,
        name: 'Vitamin C Serum',
        brand: 'SkinCare Pro',
        category: 'Serum',
        status: 'low-stock',
        lastOrdered: '2024-06-01',
        estimatedEmpty: '2024-07-20'
      },
      {
        id: 3,
        name: 'Retinol Serum',
        brand: 'Advanced Skin',
        category: 'Serum',
        status: 'in-stock',
        lastOrdered: '2024-06-10',
        estimatedEmpty: '2024-09-10'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProductStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-800';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <CustomerPortalLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Min Behandlingsplan</h1>
          <p className="text-muted-foreground mt-2">Din personliga väg till friskare hud</p>
        </div>

        <Tabs defaultValue="clinic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="clinic" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Klinikvård
            </TabsTrigger>
            <TabsTrigger value="home" className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              Hemmavård
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Produkter
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clinic" className="space-y-6">
            <div className="grid gap-6">
              {treatmentPlan.clinicTreatments.map((treatment) => {
                const progress = (treatment.sessionsCompleted / treatment.totalSessions) * 100;
                
                return (
                  <Card key={treatment.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-3">
                            {treatment.name}
                            <Badge className={getStatusColor(treatment.status)}>
                              Aktiv
                            </Badge>
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            Behandlas av {treatment.therapist}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          <div>
                            <div className="font-medium">Nästa session</div>
                            <div className="text-muted-foreground">{formatDate(treatment.nextSession)}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-green-500" />
                          <div>
                            <div className="font-medium">Varaktighet</div>
                            <div className="text-muted-foreground">{treatment.duration}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Droplets className="h-4 w-4 text-purple-500" />
                          <div>
                            <div className="font-medium">Frekvens</div>
                            <div className="text-muted-foreground">{treatment.frequency}</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Genomförda sessioner</span>
                          <span>{treatment.sessionsCompleted} av {treatment.totalSessions}</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-2">Behandlar:</div>
                        <div className="flex flex-wrap gap-2">
                          {treatment.problems.map((problem, index) => (
                            <Badge key={index} variant="outline">
                              {problem}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full md:w-auto">
                        Boka nästa session
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="home" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Morning Routine */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-yellow-500" />
                    Morgonrutin
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {treatmentPlan.homeRoutine.morning.map((step) => (
                    <div key={step.step} className="flex gap-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{step.product}</div>
                        <div className="text-xs text-muted-foreground">{step.instruction}</div>
                        <div className="text-xs text-yellow-700 mt-1">{step.duration}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Evening Routine */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Moon className="h-5 w-5 text-blue-500" />
                    Kvällsrutin
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {treatmentPlan.homeRoutine.evening.map((step) => (
                    <div key={step.step} className="flex gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{step.product}</div>
                        <div className="text-xs text-muted-foreground">{step.instruction}</div>
                        <div className="text-xs text-blue-700 mt-1">
                          {step.frequency || step.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Weekly Treatments */}
            <Card>
              <CardHeader>
                <CardTitle>Veckobehandlingar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {treatmentPlan.homeRoutine.weekly.map((treatment, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{treatment.name}</h4>
                        <Badge variant="outline">{treatment.frequency}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{treatment.product}</p>
                      <p className="text-xs text-gray-600">{treatment.instruction}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="grid gap-4">
              {treatmentPlan.products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{product.name}</h3>
                          <Badge className={getProductStatusColor(product.status)}>
                            {product.status === 'in-stock' && 'I lager'}
                            {product.status === 'low-stock' && 'Lågt lager'}
                            {product.status === 'out-of-stock' && 'Slut i lager'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{product.brand} • {product.category}</p>
                        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                          <div>Senast beställd: {formatDate(product.lastOrdered)}</div>
                          <div>Beräknas ta slut: {formatDate(product.estimatedEmpty)}</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {product.status === 'low-stock' && (
                          <Button size="sm" className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Beställ nu
                          </Button>
                        )}
                        {product.status === 'in-stock' && (
                          <Button size="sm" variant="outline">
                            Beställ mer
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900">Produktpåminnelser</h3>
                    <p className="text-sm text-blue-800 mt-1">
                      Du får automatiska påminnelser när dina produkter börjar ta slut. 
                      Håll alltid rätt produkter hemma för bästa resultat.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalTreatmentPlan;