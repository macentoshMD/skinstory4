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
  // Mock data - in real app this would come from API/context
  const mockData = {
    nextAppointment: {
      date: '2024-07-15',
      time: '14:00',
      treatment: 'Laser behandling - Akne',
      location: 'Östermalm'
    },
    activeTreatments: 3,
    completedSessions: 4,
    totalSessions: 8,
    skinScore: 75,
    problems: ['Akne', 'Ojämn hudton'],
    recentActivity: [
      {
        date: '2024-07-01',
        type: 'Behandling',
        description: 'LED-terapi genomförd',
        status: 'completed'
      },
      {
        date: '2024-06-28',
        type: 'Hemmavård',
        description: 'Morgonrutin utförd',
        status: 'completed'
      },
      {
        date: '2024-06-25',
        type: 'Konsultation',
        description: 'Uppföljning med hudterapeut',
        status: 'completed'
      }
    ]
  };

  const progressPercentage = (mockData.completedSessions / mockData.totalSessions) * 100;

  return (
    <CustomerPortalLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Välkommen tillbaka!</h1>
          <p className="text-muted-foreground">Här är en översikt av din hudresa</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Hudpoäng</p>
                  <p className="text-3xl font-bold">{mockData.skinScore}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Aktiva behandlingar</p>
                  <p className="text-3xl font-bold">{mockData.activeTreatments}</p>
                </div>
                <Droplets className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Genomförda</p>
                  <p className="text-3xl font-bold">{mockData.completedSessions}/{mockData.totalSessions}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Problem</p>
                  <p className="text-3xl font-bold">{mockData.problems.length}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Next Appointment */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Calendar className="h-5 w-5" />
                Nästa bokade tid
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{mockData.nextAppointment.treatment}</h3>
                    <p className="text-muted-foreground">{mockData.nextAppointment.location}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(mockData.nextAppointment.date).toLocaleDateString('sv-SE')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {mockData.nextAppointment.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Visa detaljer
              </Button>
            </CardContent>
          </Card>

          {/* Treatment Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Behandlingsframsteg</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Genomförda sessioner</span>
                  <span>{mockData.completedSessions} av {mockData.totalSessions}</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Aktiva problem:</h4>
                <div className="flex flex-wrap gap-2">
                  {mockData.problems.map((problem, index) => (
                    <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                      {problem}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Visa fullständig plan
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Senaste aktivitet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{activity.description}</p>
                        <p className="text-sm text-muted-foreground">{activity.type}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString('sv-SE')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalDashboard;