import { CustomerPortalLayout } from '@/components/portal/CustomerPortalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const CustomerPortalProblems = () => {
  // Mock data for skin problems
  const problemsData = [
    {
      id: 1,
      name: 'Akne',
      severity: 'Måttlig',
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
      status: 'Stabil',
      progress: 60,
      trend: 'stable',
      description: 'Lätt pigmentering och rodnader efter akne',
      areas: ['Kinder', 'Panna'],
      firstDiagnosed: '2023-02-15',
      lastAssessed: '2024-07-01',
      treatmentStarted: '2023-04-15',
      images: {
        before: '/placeholder-before.jpg',
        current: '/placeholder-current.jpg'
      }
    },
    {
      id: 3,
      name: 'Förstorade porer',
      severity: 'Måttlig',
      status: 'Ingen förändring',
      progress: 30,
      trend: 'stable',
      description: 'Synliga porer främst i T-zonen',
      areas: ['Näsa', 'Kinder'],
      firstDiagnosed: '2023-02-15',
      lastAssessed: '2024-07-01',
      treatmentStarted: '2023-05-01',
      images: {
        before: '/placeholder-before.jpg',
        current: '/placeholder-current.jpg'
      }
    }
  ];

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
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
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

        {/* Overall Progress */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Övergripande förbättring</h2>
                <p className="text-sm text-muted-foreground">Genomsnittlig progress för alla problem</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-purple-600">{overallProgress}%</div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  Förbättras
                </div>
              </div>
            </div>
            <Progress value={overallProgress} className="mt-4 h-3" />
          </CardContent>
        </Card>

        {/* Problems List */}
        <div className="space-y-6">
          {problemsData.map((problem) => (
            <Card key={problem.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-3">
                      {problem.name}
                      <Badge className={getSeverityColor(problem.severity)}>
                        {problem.severity}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{problem.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(problem.trend)}
                    <span className={`text-sm font-medium ${getStatusColor(problem.status)}`}>
                      {problem.status}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
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
                      {problem.areas.map((area, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
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
            </Card>
          ))}
        </div>

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