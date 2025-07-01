import { CustomerPortalLayout } from '@/components/portal/CustomerPortalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  User,
  Star,
  Download,
  Image as ImageIcon
} from 'lucide-react';

const CustomerPortalHistory = () => {
  // Mock treatment history data
  const treatmentHistory = [
    {
      id: 1,
      date: '2024-07-01',
      time: '14:00',
      treatment: 'LED-ljusterapi',
      therapist: 'Maria Svensson',
      duration: '45 minuter',
      location: 'Östermalm',
      status: 'completed',
      rating: 5,
      notes: 'Mycket bra behandling. Kunden rapporterade minskning av inflammation.',
      beforePhoto: '/placeholder-before.jpg',
      afterPhoto: '/placeholder-after.jpg',
      nextSession: '2024-07-15'
    },
    {
      id: 2,
      date: '2024-06-24',
      time: '15:30',
      treatment: 'Kemisk peeling',
      therapist: 'Anna Nilsson',
      duration: '60 minuter',
      location: 'Östermalm',
      status: 'completed',
      rating: 5,
      notes: 'Mild hudreaktion som förväntat. Eftervård instruktioner givna.',
      beforePhoto: '/placeholder-before.jpg',
      afterPhoto: '/placeholder-after.jpg',
      nextSession: '2024-07-15'
    },
    {
      id: 3,
      date: '2024-06-17',
      time: '13:15',
      treatment: 'LED-ljusterapi',
      therapist: 'Maria Svensson',
      duration: '45 minuter',
      location: 'Östermalm',
      status: 'completed',
      rating: 4,
      notes: 'Fortsatt förbättring. Kunden följer hemmavårdsrutinen väl.',
      beforePhoto: '/placeholder-before.jpg',
      afterPhoto: '/placeholder-after.jpg',
      nextSession: '2024-06-24'
    },
    {
      id: 4,
      date: '2024-06-10',
      time: '11:00',
      treatment: 'Hudkonsultation',
      therapist: 'Maria Svensson',
      duration: '60 minuter',
      location: 'Östermalm',
      status: 'completed',
      rating: 5,
      notes: 'Uppföljning av behandlingsplan. Justering av hemmavårdsrutinen.',
      beforePhoto: '/placeholder-before.jpg',
      afterPhoto: '/placeholder-after.jpg',
      nextSession: '2024-06-17'
    },
    {
      id: 5,
      date: '2024-06-03',
      time: '16:00',
      treatment: 'LED-ljusterapi',
      therapist: 'Maria Svensson',
      duration: '45 minuter',
      location: 'Östermalm',
      status: 'completed',
      rating: 5,
      notes: 'Andra LED-sessionen. Synlig förbättring av hudtonen.',
      beforePhoto: '/placeholder-before.jpg',
      afterPhoto: '/placeholder-after.jpg',
      nextSession: '2024-06-10'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Genomförd</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Inställd</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800">Bokad</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const totalTreatments = treatmentHistory.length;
  const averageRating = treatmentHistory.reduce((sum, t) => sum + t.rating, 0) / totalTreatments;

  return (
    <CustomerPortalLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Behandlingshistorik</h1>
            <p className="text-muted-foreground mt-2">Din fullständiga behandlingsresa</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Ladda ner rapport
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{totalTreatments}</div>
              <div className="text-sm text-muted-foreground">Totala behandlingar</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                {renderStars(Math.round(averageRating))}
              </div>
              <div className="text-sm text-muted-foreground">Genomsnittligt betyg</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600">
                {Math.round(((totalTreatments - 1) / totalTreatments) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Närvarofrekvens</div>
            </CardContent>
          </Card>
        </div>

        {/* Treatment History */}
        <div className="space-y-6">
          {treatmentHistory.map((treatment) => (
            <Card key={treatment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CardTitle>{treatment.treatment}</CardTitle>
                      {getStatusBadge(treatment.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(treatment.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {treatment.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {treatment.therapist}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {renderStars(treatment.rating)}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Behandlingsdetaljer</h4>
                      <div className="text-sm space-y-1">
                        <div>Varaktighet: {treatment.duration}</div>
                        <div>Plats: {treatment.location}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Terapeutens anteckningar</h4>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        {treatment.notes}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3">Före/Efter bilder</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-gray-400" />
                          </div>
                          <div className="text-xs text-center text-muted-foreground">Före</div>
                        </div>
                        <div className="space-y-2">
                          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-gray-400" />
                          </div>
                          <div className="text-xs text-center text-muted-foreground">Efter</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    Visa fullständiga bilder
                  </Button>
                  <Button variant="outline" size="sm">
                    Ladda ner rapport
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Timeline Summary */}
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-purple-900 mb-2">Behandlingsresumé</h3>
            <p className="text-sm text-purple-800">
              Du har genomfört {totalTreatments} behandlingar sedan {formatDate(treatmentHistory[treatmentHistory.length - 1].date)}. 
              Din genomsnittliga bedömning är {averageRating.toFixed(1)} stjärnor, vilket visar att du är nöjd med behandlingarna.
              Fortsätt med din nuvarande plan för att uppnå optimala resultat.
            </p>
          </CardContent>
        </Card>
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalHistory;