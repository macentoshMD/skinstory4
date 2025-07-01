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

        {/* Skin Score Card */}
        <Card className="border-0 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground mb-12">
          <CardContent className="p-12 text-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Din Hudpoäng</h2>
              <div className="text-7xl font-bold">{mockData.skinScore}%</div>
              <p className="text-primary-foreground/80 text-lg">
                Baserat på din hudanalys och konsultation
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Problem Details Card */}
        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
              Ditt Huvudproblem: {mockData.mainProblem.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">Allvarlighetsgrad</h4>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {mockData.mainProblem.severity}
                  </Badge>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">Drabbade områden</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockData.mainProblem.areas.map((area, index) => (
                      <Badge key={index} variant="outline" className="bg-muted">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">Problembeskrivning</h4>
                  <p className="text-sm text-foreground leading-relaxed">{mockData.mainProblem.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">Behandlingsmål</h4>
                  <p className="text-sm text-foreground leading-relaxed">{mockData.mainProblem.treatmentGoal}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border/60">
              <Button 
                size="lg" 
                className="flex-1 h-12"
                onClick={() => window.location.href = '/portal/behandlingsplan'}
              >
                <TrendingUp className="h-5 w-5 mr-2" />
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
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border border-border/60 shadow-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              Nästa steg
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-semibold flex-shrink-0 mt-1">
                  1
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">Bekanta dig med din behandlingsplan</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">Läs igenom rekommendationerna och förstå behandlingsstegen</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground text-sm flex items-center justify-center font-semibold flex-shrink-0 mt-1">
                  2
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-muted-foreground">Boka din första behandling</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">Välj tid som passar dig för att påbörja din hudresa</p>
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