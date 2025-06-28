
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Välkommen till din SaaS MVP dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Översikt</CardTitle>
            <CardDescription>Grundläggande statistik</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">0</div>
            <p className="text-sm text-gray-500">Total användare</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Aktivitet</CardTitle>
            <CardDescription>Senaste aktiviteter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">0</div>
            <p className="text-sm text-gray-500">Aktiva sessioner</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Status</CardTitle>
            <CardDescription>Systemstatus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">Online</div>
            <p className="text-sm text-gray-500">Alla system fungerar</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Snabbstart</CardTitle>
          <CardDescription>Kom igång med din SaaS-applikation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">1</span>
              </div>
              <div>
                <p className="font-medium">Konfigurera ditt konto</p>
                <p className="text-sm text-gray-500">Ställ in grundläggande inställningar</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-sm">2</span>
              </div>
              <div>
                <p className="font-medium text-gray-400">Lägg till ditt första projekt</p>
                <p className="text-sm text-gray-400">Skapa och hantera projekt</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-sm">3</span>
              </div>
              <div>
                <p className="font-medium text-gray-400">Bjud in teammedlemmar</p>
                <p className="text-sm text-gray-400">Samarbeta med ditt team</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
