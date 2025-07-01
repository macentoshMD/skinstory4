import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Home, 
  Building2, 
  CheckCircle, 
  Droplets,
  Zap,
  TrendingUp
} from 'lucide-react';

interface TimelineEvent {
  week: number;
  date: string;
  type: 'clinic' | 'home' | 'evaluation';
  title: string;
  description: string;
  expectedResult?: string;
  products?: string[];
  icon: any;
  isCompleted?: boolean;
}

const TreatmentTimeline = () => {
  const timelineEvents: TimelineEvent[] = [
    {
      week: 0,
      date: '1 Jul',
      type: 'clinic',
      title: 'Konsultation & Start',
      description: 'Initial konsultation och start av hemvård',
      products: ['Gentle Cleanser', 'BHA Serum'],
      icon: CheckCircle,
      isCompleted: true
    },
    {
      week: 2,
      date: '15 Jul',
      type: 'clinic',
      title: 'Första behandling',
      description: 'Första klinikbehandling och utvärdering',
      expectedResult: 'Initial hudförbättring',
      icon: Building2
    },
    {
      week: 4,
      date: '29 Jul',
      type: 'clinic',
      title: 'Andra behandling',
      description: 'Andra klinikbehandling',
      products: ['Gentle Peeling'],
      expectedResult: '20-30% förbättring',
      icon: Building2
    },
    {
      week: 6,
      date: '12 Aug',
      type: 'evaluation',
      title: 'Första resultatutvärdering',
      description: 'Bedömning av framsteg och justering av plan',
      expectedResult: '30-40% förbättring',
      icon: TrendingUp
    },
    {
      week: 8,
      date: '26 Aug',
      type: 'clinic',
      title: 'Fjärde behandling',
      description: 'Fortsatt klinikbehandling',
      products: ['Hydrating Moisturizer'],
      expectedResult: '40-50% förbättring',
      icon: Building2
    },
    {
      week: 10,
      date: '9 Sep',
      type: 'clinic',
      title: 'Femte behandling',
      description: 'Näst sista klinikbehandling',
      expectedResult: '50-60% förbättring',
      icon: Building2
    },
    {
      week: 12,
      date: '23 Sep',
      type: 'evaluation',
      title: 'Slututvärdering',
      description: 'Slutlig bedömning och framtidsplan',
      expectedResult: '70-80% förbättring',
      products: ['Maintenance Serum'],
      icon: CheckCircle
    }
  ];

  const getProgressForWeek = (week: number) => {
    if (week <= 2) return 15;
    if (week <= 4) return 30;
    if (week <= 6) return 40;
    if (week <= 8) return 50;
    if (week <= 10) return 60;
    return 80;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'clinic':
        return 'bg-primary text-primary-foreground';
      case 'home':
        return 'bg-accent text-accent-foreground';
      case 'evaluation':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'clinic':
        return 'Klinik';
      case 'home':
        return 'Hemvård';
      case 'evaluation':
        return 'Utvärdering';
      default:
        return '';
    }
  };

  return (
    <Card className="border border-border/60 shadow-sm">
      <CardHeader className="pb-6">
        <CardTitle className="text-xl flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          Behandlingstidslinje - 12 veckor
        </CardTitle>
        <p className="text-sm text-muted-foreground ml-11">
          Din personliga behandlingsresa från start till mål
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Progress Overview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Förväntad förbättring</span>
            <span className="font-semibold">70-80%</span>
          </div>
          <Progress value={80} className="h-3" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
          
          <div className="space-y-8">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const progress = getProgressForWeek(event.week);
              
              return (
                <div key={index} className="relative flex items-start gap-6">
                  {/* Timeline dot and icon */}
                  <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 border-background ${getTypeColor(event.type)}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-card border border-border/60 rounded-lg p-6 shadow-sm">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            <Badge variant="outline" className={getTypeColor(event.type)}>
                              {getTypeLabel(event.type)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Vecka {event.week}</span>
                            <span>{event.date}</span>
                          </div>
                        </div>
                        {event.isCompleted && (
                          <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                            Genomfört
                          </Badge>
                        )}
                      </div>
                      
                      {/* Description */}
                      <p className="text-muted-foreground mb-4">{event.description}</p>
                      
                      {/* Progress and Results */}
                      {event.expectedResult && (
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Förväntad förbättring</span>
                            <span className="font-semibold text-primary">{event.expectedResult}</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}
                      
                      {/* Products */}
                      {event.products && event.products.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                            Nya produkter
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {event.products.map((product, productIndex) => (
                              <Badge key={productIndex} variant="secondary" className="bg-muted">
                                <Home className="h-3 w-3 mr-1" />
                                {product}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Summary */}
        <div className="pt-6 border-t border-border/60">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">6</div>
              <p className="text-sm text-muted-foreground">Klinikbesök</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-accent">5</div>
              <p className="text-sm text-muted-foreground">Hemprodukter</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-secondary">3</div>
              <p className="text-sm text-muted-foreground">Utvärderingar</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TreatmentTimeline;