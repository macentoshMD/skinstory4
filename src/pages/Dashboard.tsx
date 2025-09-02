import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DateRangeFilter, DateRange } from '@/components/DateRangeFilter';
import { ClinicOverviewCards } from '@/components/insights/ClinicOverviewCards';
import { TreatmentRevenueChart } from '@/components/insights/TreatmentRevenueChart';
import { ProductServiceSalesChart } from '@/components/insights/ProductServiceSalesChart';
import { StaffRevenueRanking } from '@/components/insights/StaffRevenueRanking';
import { CustomerAnalyticsCharts } from '@/components/insights/CustomerAnalyticsCharts';
import { ProductOrdersTable } from '@/components/insights/ProductOrdersTable';
import { KPICards } from '@/components/insights/KPICards';
import { useInsightsData } from '@/hooks/useInsightsData';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  Activity,
  BarChart3,
  PieChart,
  Building2
} from "lucide-react";

const Dashboard = () => {
  // Initialize with "today" as default
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
    label: 'Idag'
  });

  const { kpiData } = useInsightsData();

  const handleDateRangeChange = (newRange: DateRange) => {
    setCurrentDateRange(newRange);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">SkinStory Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Komplett översikt över alla kliniker och verksamheten
        </p>
      </div>

      {/* Date Range Filter */}
      <DateRangeFilter 
        currentRange={currentDateRange}
        onDateRangeChange={handleDateRangeChange}
      />

      {/* KPI Overview */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Nyckeltal</h2>
        </div>
        <KPICards kpiData={kpiData} />
      </div>

      <Separator className="my-8" />

      {/* Clinic Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Klinikstatus</h2>
          </div>
          <Badge variant="outline" className="text-sm">
            3 aktiva kliniker
          </Badge>
        </div>
        <ClinicOverviewCards />
      </div>

      <Separator className="my-8" />

      {/* Revenue Analysis */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <PieChart className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Intäktsanalys</h2>
        </div>
        
        {/* Treatment Revenue Breakdown */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Behandlingsintäkter</h3>
          <TreatmentRevenueChart />
        </div>
        
        {/* Product vs Service Sales */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Produkt- och tjänsteförsäljning</h3>
          <ProductServiceSalesChart />
        </div>
      </div>

      <Separator className="my-8" />

      {/* Staff Performance */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Personalprestation</h2>
        </div>
        <StaffRevenueRanking />
      </div>

      <Separator className="my-8" />

      {/* Customer Analytics */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Kundanalys</h2>
        </div>
        <CustomerAnalyticsCharts />
      </div>

      <Separator className="my-8" />

      {/* Product Orders & Inventory */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Produktbeställningar & Lager</h2>
        </div>
        <ProductOrdersTable />
      </div>

      {/* Summary Stats */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Sammanfattning för {currentDateRange.label}</span>
          </CardTitle>
          <CardDescription>
            Övergripande prestanda för alla kliniker
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">
                {kpiData.totalRevenue.toLocaleString('sv-SE')} kr
              </div>
              <div className="text-sm text-muted-foreground">Total omsättning</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-secondary-foreground">
                {kpiData.totalBookings}
              </div>
              <div className="text-sm text-muted-foreground">Genomförda behandlingar</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-accent-foreground">
                {kpiData.totalCustomers}
              </div>
              <div className="text-sm text-muted-foreground">Betjänade kunder</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-muted-foreground">
                {kpiData.averageRating.toFixed(1)}/5.0
              </div>
              <div className="text-sm text-muted-foreground">Genomsnittligt betyg</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;