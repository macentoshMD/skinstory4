import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, TrendingUp, Clock, DollarSign, BarChart, Activity, ArrowRight } from "lucide-react";
import { DateRangeFilter, DateRange } from '@/components/DateRangeFilter';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Initialize with "today" as default
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
    label: 'Idag'
  });

  // Mock function to generate data based on date range
  const getDataForPeriod = (dateRange: DateRange) => {
    const daysDiff = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    // Generate mock data based on period length
    const multiplier = daysDiff;
    
    return {
      kpiData: {
        revenue: `${(18500 + Math.floor(Math.random() * 10000)) * Math.max(1, Math.floor(multiplier / 7))} kr`,
        newCustomers: Math.max(1, Math.floor((8 + Math.floor(Math.random() * 10)) * Math.max(1, multiplier / 7))),
        avgCustomerValue: `${2850 + Math.floor(Math.random() * 500)} kr`,
        conversionRate: 75 + Math.floor(Math.random() * 10)
      },
      salesData: {
        monthlySales: `${380000 + Math.floor(Math.random() * 200000)} kr`,
        monthlyGoal: "520 000 kr",
        productVsTreatment: { products: 35, treatments: 65 },
        avgTransaction: `${1650 + Math.floor(Math.random() * 400)} kr`
      },
      // Keep other data same for now
      customerInsights: {
        demographics: { age2535: 45, age3645: 35, age4555: 20 },
        loyalty: { returning: 68, new: 32 },
        satisfaction: 4.7,
        commonIssues: ["Torr hud", "Finlinjer", "Pigmentfläckar"]
      },
      staffMetrics: {
        topTherapist: "Lisa Svensson",
        avgTreatmentTime: 75,
        utilizationRate: 85,
        treatments: { lisa: 28, anna: 24, maria: 22 }
      },
      inventory: {
        machinesInUse: 3,
        totalMachines: 4,
        popularTreatments: ["HydraFacial", "Microneedling", "Chemical Peeling"],
        stockLevel: 92
      },
      finance: {
        cashFlow: "+125 000 kr",
        operatingMargin: 35,
        customerAcquisitionCost: "480 kr",
        lifetimeValue: "12 500 kr"
      },
      operations: {
        bookingCapacity: 85,
        peakHours: "10:00-14:00",
        cancellationRate: 12,
        followUpRate: 88
      },
      recentActivities: [
        { type: 'booking', description: 'Anna Andersson bokade HydraFacial', time: '09:15', status: 'Bekräftad' },
        { type: 'order', description: 'Beställning hudkräm levererad', time: '08:45', status: 'Levererad' },
        { type: 'customer', description: 'Ny kund Erik Johansson registrerad', time: '08:30', status: 'Aktiv' },
        { type: 'booking', description: 'Maria Larsson avbokade behandling', time: '08:15', status: 'Avbokad' }
      ]
    };
  };

  const currentData = getDataForPeriod(currentDateRange);

  const handleDateRangeChange = (newRange: DateRange) => {
    setCurrentDateRange(newRange);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Calendar className="h-4 w-4" />;
      case 'order': return <Clock className="h-4 w-4" />;
      case 'customer': return <Users className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'bekräftad':
      case 'aktiv':
        return 'bg-green-100 text-green-800';
      case 'levererad':
        return 'bg-blue-100 text-blue-800';
      case 'avbokad':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">SkinStory Dashboard</h1>
        <p className="text-gray-600 mt-2">Komplett översikt över din hudvårdsklinik</p>
      </div>

      {/* Date Range Filter */}
      <DateRangeFilter 
        currentRange={currentDateRange}
        onDateRangeChange={handleDateRangeChange}
      />

      {/* Sektion 1: Viktiga KPI:er */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inkomst</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{currentData.kpiData.revenue}</div>
            <p className="text-xs text-muted-foreground">+15% från föregående period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nya kunder</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{currentData.kpiData.newCustomers}</div>
            <p className="text-xs text-muted-foreground">+3 från föregående period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Genomsnittligt kundvärde</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{currentData.kpiData.avgCustomerValue}</div>
            <p className="text-xs text-muted-foreground">+8% denna månad</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Konverteringsgrad</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{currentData.kpiData.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Konsultation → Behandling</p>
          </CardContent>
        </Card>
      </div>

      {/* Sektion 2: Recent Activities & Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Senaste aktiviteter</CardTitle>
              <CardDescription>Nyligen genomförda aktiviteter</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to="/aktiviteter">
                Se alla <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentData.recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {activity.description}
                    </div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                  <Badge className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Månadens försäljning</CardTitle>
            <CardDescription>Nuvarande vs målsättning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">{currentData.salesData.monthlySales}</span>
                <span className="text-sm text-gray-500">av {currentData.salesData.monthlyGoal}</span>
              </div>
              <Progress value={93} className="h-2" />
              <div className="text-sm text-green-600">93% av målet uppnått</div>
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
                  <span className="font-medium">{currentData.customerInsights.satisfaction}/5.0</span>
                </div>
                <Progress value={currentData.customerInsights.satisfaction * 20} className="h-2" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Vanligaste kundproblem:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentData.customerInsights.commonIssues.map((issue, index) => (
                    <Badge key={index} variant="secondary">{issue}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm">
                  <span className="font-medium">{currentData.customerInsights.loyalty.returning}%</span> återkommande kunder
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
                  <span className="font-medium">{currentData.staffMetrics.utilizationRate}%</span>
                </div>
                <Progress value={currentData.staffMetrics.utilizationRate} className="h-2" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Behandlingar denna vecka:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Lisa S.</span>
                    <span className="font-medium">{currentData.staffMetrics.treatments.lisa}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Anna N.</span>
                    <span className="font-medium">{currentData.staffMetrics.treatments.anna}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Maria L.</span>
                    <span className="font-medium">{currentData.staffMetrics.treatments.maria}</span>
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
                  <span className="font-medium">{currentData.operations.bookingCapacity}%</span>
                </div>
                <Progress value={currentData.operations.bookingCapacity} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Peak-tid:</span>
                  <div className="font-medium">{currentData.operations.peakHours}</div>
                </div>
                <div>
                  <span className="text-gray-600">Avbokningar:</span>
                  <div className="font-medium">{currentData.operations.cancellationRate}%</div>
                </div>
              </div>
              <div>
                <span className="text-gray-600">Uppföljningsgrad:</span>
                <span className="font-medium ml-2">{currentData.operations.followUpRate}%</span>
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
                  <span className="font-medium">{currentData.inventory.machinesInUse}/{currentData.inventory.totalMachines}</span>
                </div>
                <Progress value={(currentData.inventory.machinesInUse / currentData.inventory.totalMachines) * 100} className="h-2" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Populäraste behandlingar:</h4>
                <div className="space-y-1">
                  {currentData.inventory.popularTreatments.map((treatment, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{treatment}</span>
                      <Badge variant="outline">{index === 0 ? "Mest populär" : `#${index + 1}`}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Lagerstatus:</span>
                <span className="font-medium ml-2 text-green-600">{currentData.inventory.stockLevel}%</span>
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
