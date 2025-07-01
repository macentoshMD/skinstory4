import { CustomerPortalLayout } from '@/components/portal/CustomerPortalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Play,
  Pause,
  AlertCircle,
  Droplets,
  Calendar,
  Zap
} from 'lucide-react';

const CustomerPortalProblems = () => {
  // Mock data for main problem and symptoms from dashboard
  const mockData = {
    customerName: 'Anna',
    consultationDate: '2024-07-01',
    skinScore: 65,
    mainProblem: {
      name: 'Akne',
      subtype: 'Acne Vulgaris (Tonårsacne)',
      severity: 'Måttlig',
      areas: ['Panna', 'Kinder', 'Haka'],
      description: 'Inflammatorisk akne med komedoner och papler främst i T-zonen. Förhöjd talgproduktion och tilltäppta porer.',
      treatmentGoal: 'Minska inflammation, rena porer och förbättra hudtextur'
    },
    symptoms: [
      { name: 'Papler (Inflammerade knölar)', score: 70, severity: 'Måttlig' },
      { name: 'Komedoner öppna (Pormaskar)', score: 80, severity: 'Hög' },
      { name: 'Komedoner stängda (Vita finnar)', score: 60, severity: 'Måttlig' },
      { name: 'Förstorade porer', score: 75, severity: 'Hög' },
      { name: 'Fet hud', score: 85, severity: 'Hög' }
    ]
  };

  // Mock data for skin problems with treatment status
  const problemsData = [
    {
      id: 1,
      name: 'Akne',
      severity: 'Måttlig',
      treatmentStatus: 'aktiv', // aktiv, pågående, slutförd, pending
      status: 'Förbättras',
      progress: 75,
      trend: 'up',
      description: 'Inflammatorisk akne främst i T-zonen',
      areas: ['Panna', 'Näsa', 'Haka'],
      firstDiagnosed: '2023-02-15',
      lastAssessed: '2024-07-01',
      treatmentStarted: '2023-03-01',
      images: {
        before: '/placeholder-before.jpg',
        current: '/placeholder-current.jpg'
      }
    },
    {
      id: 2,
      name: 'Ojämn hudton',
      severity: 'Lindrig',
      treatmentStatus: 'slutförd',
      status: 'Slutförd',
      progress: 90,
      trend: 'up',
      description: 'Lätt pigmentering och rodnader efter akne',
      areas: ['Kinder', 'Panna'],
      firstDiagnosed: '2023-02-15',
      lastAssessed: '2024-07-01',
      treatmentStarted: '2023-04-15',
      treatmentCompleted: '2024-06-15',
      images: {
        before: '/placeholder-before.jpg',
        current: '/placeholder-current.jpg'
      }
    },
    {
      id: 3,
      name: 'Förstorade porer',
      severity: 'Måttlig',
      treatmentStatus: 'pending',
      status: 'Väntar på behandling',
      progress: 0,
      trend: 'stable',
      description: 'Synliga porer främst i T-zonen',
      areas: ['Näsa', 'Kinder'],
      firstDiagnosed: '2023-02-15',
      lastAssessed: '2024-07-01',
      treatmentStarted: null,
      images: {
        before: '/placeholder-before.jpg',
        current: '/placeholder-current.jpg'
      }
    },
    {
      id: 4,
      name: 'Rosacea',
      severity: 'Lindrig',
      treatmentStatus: 'pågående',
      status: 'Pågående behandling',
      progress: 45,
      trend: 'up',
      description: 'Lätta rodnader och irritation',
      areas: ['Kinder', 'Näsa'],
      firstDiagnosed: '2024-03-15',
      lastAssessed: '2024-07-01',
      treatmentStarted: '2024-04-01',
      images: {
        before: '/placeholder-before.jpg',
        current: '/placeholder-current.jpg'
      }
    }
  ];

  // Determine default expanded state: expand all if only 1 problem, collapse if multiple
  const defaultExpandedValue = problemsData.length === 1 ? problemsData[0].id.toString() : undefined;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Lindrig':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Måttlig':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Svår':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTreatmentStatusBadge = (treatmentStatus: string) => {
    switch (treatmentStatus) {
      case 'aktiv':
        return { text: 'Aktiv', color: 'bg-green-100 text-green-800 border-green-200', icon: <Play className="h-3 w-3" /> };
      case 'pågående':
        return { text: 'Pågående', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: <Clock className="h-3 w-3" /> };
      case 'slutförd':
        return { text: 'Slutförd', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: <CheckCircle className="h-3 w-3" /> };
      case 'pending':
        return { text: 'Väntar', color: 'bg-orange-100 text-orange-800 border-orange-200', icon: <Pause className="h-3 w-3" /> };
      default:
        return { text: 'Okänd', color: 'bg-gray-100 text-gray-800 border-gray-200', icon: <AlertTriangle className="h-3 w-3" /> };
    }
  };

  const getStatusIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Förbättras':
        return 'text-green-600';
      case 'Försämras':
        return 'text-red-600';
      case 'Stabil':
        return 'text-gray-600';
      case 'Slutförd':
        return 'text-purple-600';
      case 'Väntar på behandling':
        return 'text-orange-600';
      case 'Pågående behandling':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Ej startad';
    return new Date(dateString).toLocaleDateString('sv-SE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const overallProgress = Math.round(
    problemsData.reduce((sum, problem) => sum + problem.progress, 0) / problemsData.length
  );

  return (
    <CustomerPortalLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mina Hudproblem</h1>
            <p className="text-muted-foreground mt-2">Följ utvecklingen av dina hudproblem över tid</p>
          </div>
        </div>

        {/* Collapsible Problems List */}
        <Accordion 
          type="multiple" 
          defaultValue={defaultExpandedValue ? [defaultExpandedValue] : []}
          className="space-y-4"
        >
          {problemsData.map((problem, index) => {
            const statusBadge = getTreatmentStatusBadge(problem.treatmentStatus);
            const isMainProblem = problem.name === 'Akne'; // Main problem integration
            
            return (
              <AccordionItem key={problem.id} value={problem.id.toString()} className="border-0">
                <Card className="overflow-hidden">
                  <AccordionTrigger className="hover:no-underline p-0">
                    <CardHeader className="pb-4 w-full">
                      <div className="flex items-start justify-between w-full">
                        <div className="space-y-2 text-left">
                          <CardTitle className="flex items-center gap-3">
                            {isMainProblem ? (
                              <>
                                <div className="p-1.5 rounded-lg bg-primary/10">
                                  <AlertCircle className="h-4 w-4 text-primary" />
                                </div>
                                Ditt Huvudproblem: {problem.name}
                              </>
                            ) : (
                              problem.name
                            )}
                            <Badge className={getSeverityColor(problem.severity)}>
                              {problem.severity}
                            </Badge>
                            <Badge variant="outline" className={`${statusBadge.color} flex items-center gap-1`}>
                              {statusBadge.icon}
                              {statusBadge.text}
                            </Badge>
                            {isMainProblem && (
                              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                {mockData.mainProblem.subtype}
                              </Badge>
                            )}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {isMainProblem ? mockData.mainProblem.description : problem.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {getStatusIcon(problem.trend)}
                          <span className={`text-sm font-medium ${getStatusColor(problem.status)}`}>
                            {problem.status}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                  </AccordionTrigger>

                  <AccordionContent className="p-0">
                    <CardContent className="space-y-6 pt-0">
                      {/* Main Problem Treatment Goal (only for Akne) */}
                      {isMainProblem && (
                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                          <h4 className="font-semibold text-sm text-primary mb-2 uppercase tracking-wide">Behandlingsmål</h4>
                          <p className="text-sm text-foreground leading-relaxed">{mockData.mainProblem.treatmentGoal}</p>
                        </div>
                      )}

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Förbättring</span>
                          <span>{problem.progress}%</span>
                        </div>
                        <Progress value={problem.progress} className="h-2" />
                      </div>

                      {/* Problem Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <label className="font-medium text-muted-foreground">Behandlingsområden</label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {(isMainProblem ? mockData.mainProblem.areas : problem.areas).map((area, areaIndex) => (
                              <Badge key={areaIndex} variant="outline" className="text-xs">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label className="font-medium text-muted-foreground">Första diagnos</label>
                          <p className="mt-1">{formatDate(problem.firstDiagnosed)}</p>
                        </div>
                        
                        <div>
                          <label className="font-medium text-muted-foreground">Behandling startad</label>
                          <p className="mt-1">{formatDate(problem.treatmentStarted)}</p>
                        </div>
                        
                        <div>
                          <label className="font-medium text-muted-foreground">Senast utvärderad</label>
                          <p className="mt-1">{formatDate(problem.lastAssessed)}</p>
                        </div>
                      </div>

                      {/* Symptom Analysis (only for main problem - Akne) */}
                      {isMainProblem && (
                        <div className="border-t pt-6">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Droplets className="h-5 w-5 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold">Symptomanalys</h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {mockData.symptoms.map((symptom, symptomIndex) => (
                              <div key={symptomIndex} className="p-4 bg-muted/30 rounded-lg space-y-3">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-sm">{symptom.name}</h4>
                                  <Badge 
                                    variant="outline" 
                                    className={`${
                                      symptom.severity === 'Hög' 
                                        ? 'bg-destructive/10 text-destructive border-destructive/20' 
                                        : symptom.severity === 'Måttlig'
                                        ? 'bg-accent text-accent-foreground border-accent/20'
                                        : 'bg-primary/10 text-primary border-primary/20'
                                    }`}
                                  >
                                    {symptom.severity}
                                  </Badge>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Poäng</span>
                                    <span className="font-semibold">{symptom.score}%</span>
                                  </div>
                                  <Progress value={symptom.score} className="h-2" />
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="p-4 bg-muted/20 rounded-lg">
                            <p className="text-sm text-muted-foreground text-center">
                              Symptompoängen baseras på din konsultation och hjälper till att skräddarsy din behandlingsplan
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons (only for main problem) */}
                      {isMainProblem && (
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/60">
                          <Button 
                            size="lg" 
                            className="flex-1 h-12"
                            onClick={() => window.location.href = '/portal/behandlingsplan'}
                          >
                            <Zap className="h-5 w-5 mr-2" />
                            Starta behandlingsplan
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="lg" 
                            className="flex-1 h-12"
                            onClick={() => window.location.href = '/portal/behandlingsplan'}
                          >
                            <Calendar className="h-5 w-5 mr-2" />
                            Visa behandlingsplan
                          </Button>
                        </div>
                      )}

                      {/* Treatment Completion Date for completed treatments */}
                      {problem.treatmentStatus === 'slutförd' && problem.treatmentCompleted && (
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-800">
                              Behandling slutförd: {formatDate(problem.treatmentCompleted)}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Before/After Images Placeholder */}
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-3">Före/Efter bilder</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                              <div className="text-center text-gray-500">
                                <div className="text-sm font-medium">Före behandling</div>
                                <div className="text-xs">{formatDate(problem.treatmentStarted)}</div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                              <div className="text-center text-gray-500">
                                <div className="text-sm font-medium">Senaste bild</div>
                                <div className="text-xs">{formatDate(problem.lastAssessed)}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            );
          })}
        </Accordion>

        {/* Summary */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900">Sammanfattning</h3>
                <p className="text-sm text-blue-800 mt-1">
                  Du visar positiv utveckling i {problemsData.filter(p => p.trend === 'up').length} av {problemsData.length} problem. 
                  Fortsätt med din nuvarande behandlingsplan för bästa resultat.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalProblems;