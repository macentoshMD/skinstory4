import { CustomerPortalLayout } from '@/components/portal/CustomerPortalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  AlertCircle,
  Droplets
} from 'lucide-react';

const CustomerPortalDashboard = () => {
  // First-time login state - customer just had consultation
  const mockData = {
    isFirstLogin: true,
    customerName: 'Anna',
    consultationDate: '2024-07-01',
    skinScore: 65,
    mainProblem: {
      name: 'Akne',
      severity: 'Måttlig',
      areas: ['Panna', 'Kinder', 'Haka'],
      description: 'Inflammatorisk akne med komedoner och papler främst i T-zonen. Förhöjd talgproduktion och tilltäppta porer.',
      treatmentGoal: 'Minska inflammation, rena porer och förbättra hudtextur'
    }
  };

  return (
    <CustomerPortalLayout>
      <div className="space-y-8">
        {/* Welcome Message for First Login */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Välkommen {mockData.customerName}!
          </h1>
          <p className="text-lg text-muted-foreground">
            Din hudanalys är klar och din personliga behandlingsplan är redo
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Konsultation genomförd {new Date(mockData.consultationDate).toLocaleDateString('sv-SE')}
          </div>
        </div>

        {/* Skin Score Card */}
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Din Hudpoäng</h2>
              <div className="text-6xl font-bold">{mockData.skinScore}%</div>
              <p className="text-purple-100">
                Baserat på din hudanalys och konsultation
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Problem Details Card */}
        <Card className="border-2 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="text-xl flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-purple-600" />
              Ditt Huvudproblem: {mockData.mainProblem.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">ALLVARLIGHETSGRAD</h4>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    {mockData.mainProblem.severity}
                  </Badge>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">DRABBADE OMRÅDEN</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockData.mainProblem.areas.map((area, index) => (
                      <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">PROBLEMBESKRIVNING</h4>
                  <p className="text-sm text-gray-700">{mockData.mainProblem.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">BEHANDLINGSMÅL</h4>
                  <p className="text-sm text-gray-700">{mockData.mainProblem.treatmentGoal}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <Button 
                size="lg" 
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                Starta behandlingsplan
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Visa behandlingsplan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Nästa steg
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500 text-white text-xs flex items-center justify-center font-bold mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium">Bekanta dig med din behandlingsplan</p>
                  <p className="text-sm text-muted-foreground">Läs igenom rekommendationerna och förstå behandlingsstegen</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-600 text-xs flex items-center justify-center font-bold mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Boka din första behandling</p>
                  <p className="text-sm text-muted-foreground">Välj tid som passar dig för att påbörja din hudresa</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalDashboard;