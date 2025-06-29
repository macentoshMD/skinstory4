
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, TrendingUp, Clock, DollarSign, BarChart } from "lucide-react";

const Dashboard = () => {
  // Enhanced mock data for comprehensive business overview
  const kpiData = {
    todayRevenue: "28 450 kr",
    newCustomersWeek: 12,
    avgCustomerValue: "2 850 kr",
    conversionRate: 78
  };

  const salesData = {
    monthlySales: "485 000 kr",
    monthlyGoal: "520 000 kr",
    productVsTreatment: { products: 35, treatments: 65 },
    avgTransaction: "1 850 kr"
  };

  const customerInsights = {
    demographics: { age2535: 45, age3645: 35, age4555: 20 },
    loyalty: { returning: 68, new: 32 },
    satisfaction: 4.7,
    commonIssues: ["Torr hud", "Finlinjer", "Pigmentfläckar"]
  };

  const staffMetrics = {
    topTherapist: "Lisa Svensson",
    avgTreatmentTime: 75,
    utilizationRate: 85,
    treatments: { lisa: 28, anna: 24, maria: 22 }
  };

  const inventory = {
    machinesInUse: 3,
    totalMachines: 4,
    popularTreatments: ["HydraFacial", "Microneedling", "Chemical Peeling"],
    stockLevel: 92
  };

  const finance = {
    cashFlow: "+125 000 kr",
    operatingMargin: 35,
    customerAcquisitionCost: "480 kr",
    lifetimeValue: "12 500 kr"
  };

  const operations = {
    bookingCapacity: 85,
    peakHours: "10:00-14:00",
    cancellationRate: 12,
    followUpRate: 88
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">SkinStory Dashboard</h1>
        <p className="text-gray-600 mt-2">Komplett översikt över din hudvårdsklinik</p>
      </div>

      {/* Sektion 1: Viktiga KPI:er */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dagens inkomst</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{kpiData.todayRevenue}</div>
            <p className="text-xs text-muted-foreground">+15% från igår</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nya kunder denna vecka</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{kpiData.newCustomersWeek}</div>
            <p className="text-xs text-muted-foreground">+3 från förra veckan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Genomsnittligt kundvärde</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{kpiData.avgCustomerValue}</div>
            <p className="text-xs text-muted-foreground">+8% denna månad</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Konverteringsgrad</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{kpiData.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Konsultation → Behandling</p>
          </CardContent>
        </Card>
      </div>

      {/* Sektion 2: Försäljning & Ekonomi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Månadens försäljning</CardTitle>
            <CardDescription>Nuvarande vs målsättning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">{salesData.monthlySales}</span>
                <span className="text-sm text-gray-500">av {salesData.monthlyGoal}</span>
              </div>
              <Progress value={93} className="h-2" />
              <div className="text-sm text-green-600">93% av målet uppnått</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ekonomisk översikt</CardTitle>
            <CardDescription>Kassaflöde och marginaler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Kassaflöde:</span>
                <span className="font-medium text-green-600">{finance.cashFlow}</span>
              </div>
              <div className="flex justify-between">
                <span>Rörelsemarginal:</span>
                <span className="font-medium">{finance.operatingMargin}%</span>
              </div>
              <div className="flex justify-between">
                <span>Kundlivstidsvärde:</span>
                <span className="font-medium">{finance.lifetimeValue}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sektion 3: Kundinsikter & Personal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Kundinsikter</CardTitle>
            <CardDescription>Demografi och vanliga frågor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Kundnöjdhet</span>
                  <span className="font-medium">{customerInsights.satisfaction}/5.0</span>
                </div>
                <Progress value={customerInsights.satisfaction * 20} className="h-2" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Vanligaste kundproblem:</h4>
                <div className="flex flex-wrap gap-2">
                  {customerInsights.commonIssues.map((issue, index) => (
                    <Badge key={index} variant="secondary">{issue}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm">
                  <span className="font-medium">{customerInsights.loyalty.returning}%</span> återkommande kunder
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personal & Produktivitet</CardTitle>
            <CardDescription>Teamets prestationer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Kapacitetsutnyttjande</span>
                  <span className="font-medium">{staffMetrics.utilizationRate}%</span>
                </div>
                <Progress value={staffMetrics.utilizationRate} className="h-2" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Behandlingar denna vecka:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Lisa S.</span>
                    <span className="font-medium">{staffMetrics.treatments.lisa}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Anna N.</span>
                    <span className="font-medium">{staffMetrics.treatments.anna}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Maria L.</span>
                    <span className="font-medium">{staffMetrics.treatments.maria}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sektion 4: Operativa insights & Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Operativa insights</CardTitle>
            <CardDescription>Bokningar och kapacitet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Bokningskapacitet</span>
                  <span className="font-medium">{operations.bookingCapacity}%</span>
                </div>
                <Progress value={operations.bookingCapacity} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Peak-tid:</span>
                  <div className="font-medium">{operations.peakHours}</div>
                </div>
                <div>
                  <span className="text-gray-600">Avbokningar:</span>
                  <div className="font-medium">{operations.cancellationRate}%</div>
                </div>
              </div>
              <div>
                <span className="text-gray-600">Uppföljningsgrad:</span>
                <span className="font-medium ml-2">{operations.followUpRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maskiner & Behandlingar</CardTitle>
            <CardDescription>Utrustning och popularitet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Maskiner i bruk</span>
                  <span className="font-medium">{inventory.machinesInUse}/{inventory.totalMachines}</span>
                </div>
                <Progress value={(inventory.machinesInUse / inventory.totalMachines) * 100} className="h-2" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Populäraste behandlingar:</h4>
                <div className="space-y-1">
                  {inventory.popularTreatments.map((treatment, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{treatment}</span>
                      <Badge variant="outline">{index === 0 ? "Mest populär" : `#${index + 1}`}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Lagerstatus:</span>
                <span className="font-medium ml-2 text-green-600">{inventory.stockLevel}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sektion 5: Dagens schema (behålls från ursprunglig design) */}
      <Card>
        <CardHeader>
          <CardTitle>Dagens schema</CardTitle>
          <CardDescription>Kommande bokningar och aktiviteter</CardDescription>
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
  );
};

export default Dashboard;
