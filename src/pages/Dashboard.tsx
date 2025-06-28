
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, TrendingUp, Clock } from "lucide-react";

const Dashboard = () => {
  // Mock data for skin care clinic
  const todayBookings = 12;
  const weeklyBookings = 48;
  const totalCustomers = 156;
  const averageRating = 4.8;
  const popularTreatments = [
    { name: "HydraFacial", count: 15, revenue: "22 500 kr" },
    { name: "Microneedling", count: 12, revenue: "18 000 kr" },
    { name: "Chemical Peeling", count: 8, revenue: "12 000 kr" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">SkinStory Dashboard</h1>
        <p className="text-gray-600 mt-2">Översikt över din hudvårdsklinik</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bokningar idag</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{todayBookings}</div>
            <p className="text-xs text-muted-foreground">+2 från igår</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Veckans bokningar</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{weeklyBookings}</div>
            <p className="text-xs text-muted-foreground">+12% från förra veckan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktiva kunder</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">+8 nya denna månad</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kundnöjdhet</CardTitle>
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{averageRating}</div>
            <p className="text-xs text-muted-foreground">Genomsnittligt betyg</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Populära behandlingar</CardTitle>
            <CardDescription>Mest bokade behandlingar denna vecka</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularTreatments.map((treatment, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{treatment.name}</div>
                    <div className="text-sm text-gray-500">{treatment.count} bokningar</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">{treatment.revenue}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dagens schema</CardTitle>
            <CardDescription>Kommande bokningar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">09:00 - HydraFacial</div>
                  <div className="text-sm text-gray-500">Anna Andersson med Lisa S.</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">10:30 - Microneedling</div>
                  <div className="text-sm text-gray-500">Erik Johansson med Maria L.</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium">14:00 - Konsultation</div>
                  <div className="text-sm text-gray-500">Maria Larsson med Anna S.</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
