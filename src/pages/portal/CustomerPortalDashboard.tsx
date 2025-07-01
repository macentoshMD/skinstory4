import { CustomerPortalLayout } from '@/components/portal/CustomerPortalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle,
  TrendingUp,
  Calendar,
  AlertCircle,
  ArrowRight,
  Activity,
  Play
} from 'lucide-react';

const CustomerPortalDashboard = () => {
  const navigate = useNavigate();
  
  // First-time login state - customer just had consultation
  const mockData = {
    customerName: 'Anna',
    consultationDate: '2024-07-01',
    skinScore: 65
  };

  return (
    <CustomerPortalLayout>
      <div className="space-y-8">
        {/* Welcome Message for First Login */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            Välkommen {mockData.customerName}!
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Din hudanalys är klar och din personliga behandlingsplan är redo
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
            Konsultation genomförd {new Date(mockData.consultationDate).toLocaleDateString('sv-SE')}
          </div>
        </div>

        {/* Timeline Steps */}
        <div className="space-y-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">Din hudresa</h2>
          
          {/* Step 1 - Consultation Complete */}
          <div className="relative">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <Card className="flex-1 border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-green-800">Konsultation</h3>
                      <p className="text-sm text-green-600">Genomförd {new Date(mockData.consultationDate).toLocaleDateString('sv-SE')}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Klar</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200"></div>
          </div>

          {/* Step 2 - My Problems */}
          <div className="relative">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <Card className="flex-1 border-blue-200 bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors" onClick={() => navigate('/portal/problem')}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-blue-800">Mina Problem</h3>
                      <p className="text-sm text-blue-600">Se din hudanalys och identifierade problem</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200"></div>
          </div>

          {/* Step 3 - View Treatment Plans */}
          <div className="relative">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <Card className="flex-1 border-purple-200 bg-purple-50 cursor-pointer hover:bg-purple-100 transition-colors" onClick={() => navigate('/portal/behandlingsplan')}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-purple-800">Se Behandlingsplan</h3>
                      <p className="text-sm text-purple-600">Granska din personliga plan för Akne</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200"></div>
          </div>

          {/* Step 4 - Start Treatment (CTA) */}
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Play className="h-6 w-6 text-white" />
            </div>
            <Card className="flex-1 border-green-200 bg-gradient-to-r from-green-50 to-green-100 cursor-pointer hover:from-green-100 hover:to-green-150 transition-all shadow-md hover:shadow-lg">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <h3 className="font-bold text-green-800 text-xl">Starta din behandlingsplan</h3>
                  <p className="text-green-700">Dags att påbörja din hudresa med personlig behandling</p>
                  <div className="space-y-3">
                    <Button 
                      size="lg" 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                      onClick={() => navigate('/portal/behandlingsplan')}
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Starta behandling nu
                    </Button>
                    <p className="text-xs text-green-600">
                      Välj betalningsalternativ och boka din första session
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalDashboard;