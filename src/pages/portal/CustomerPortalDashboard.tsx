import { CustomerPortalLayout } from '@/components/portal/CustomerPortalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle,
  TrendingUp,
  Calendar,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

const CustomerPortalDashboard = () => {
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

        {/* Treatment Plan Call to Action */}
        <Card className="border-0 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground mb-12 cursor-pointer hover:from-primary/90 hover:to-primary/70 transition-all duration-300" onClick={() => window.location.href = '/portal/behandlingsplan'}>
          <CardContent className="p-12 text-center">
            <div className="space-y-6">
              <div className="p-3 rounded-full bg-primary-foreground/20 w-fit mx-auto">
                <AlertCircle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold">Din behandlingsplan för Akne är klar!</h2>
              <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
                Baserat på din konsultation har vi skapat en personlig behandlingsplan för att behandla din akne
              </p>
              <div className="flex items-center justify-center gap-3 text-primary-foreground/80">
                <span className="text-lg font-medium">Se din behandlingsplan</span>
                <ArrowRight className="h-6 w-6" />
              </div>
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