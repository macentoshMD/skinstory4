import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import { EmployeeEconomyTab } from "@/components/economy/EmployeeEconomyTab";
import { TreatmentEconomyTab } from "@/components/economy/TreatmentEconomyTab";
import { ConsumablesEconomyTab } from "@/components/economy/ConsumablesEconomyTab";
import { NoShowsEconomyTab } from "@/components/economy/NoShowsEconomyTab";
import { DollarSign, TrendingUp, Users, AlertTriangle, FileText, Plus } from "lucide-react";
import { EconomyFilters } from "@/types/economy";
import { calculateEconomySummary } from "@/utils/economyCalculations";
import { mockEmployeeEconomyData, mockTreatmentEconomyData, mockNoShowData } from "@/data/mockEconomyData";

const Economy = () => {
  const [activeTab, setActiveTab] = useState("employees");
  const [filters, setFilters] = useState<EconomyFilters>({
    dateRange: {
      from: new Date(2025, 8, 1),
      to: new Date(2025, 8, 30),
      label: "September 2025",
    },
    showMonthly: true,
  });

  const formatCurrency = (amount: number) => `${amount.toLocaleString()} kr`;

  // Calculate overall summary
  const summary = calculateEconomySummary(
    mockEmployeeEconomyData,
    mockTreatmentEconomyData,
    mockNoShowData
  );

  const currentRange = {
    ...filters.dateRange,
    label: filters.dateRange.label || "Vald period"
  };

  const handleDateRangeChange = (range: { from: Date; to: Date; label: string }) => {
    setFilters(prev => ({
      ...prev,
      dateRange: { from: range.from, to: range.to, label: range.label }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Ekonomiöversikt</h1>
          <p className="text-muted-foreground mt-2">Komplett ekonomisk översikt för kliniken</p>
        </div>
        <div className="flex gap-3">
          <DateRangeFilter 
            onDateRangeChange={handleDateRangeChange}
            currentRange={currentRange}
          />
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Exportera rapport
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Ny post
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total omsättning</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(summary.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Från {summary.treatmentSessions} behandlingar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totala kostnader</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(summary.totalCosts)}
            </div>
            <p className="text-xs text-muted-foreground">
              {summary.employeeCount} anställda
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bruttovinst</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(summary.grossProfit)}
            </div>
            <p className="text-xs text-muted-foreground">
              {summary.profitMargin.toFixed(1)}% marginal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">No-shows</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(summary.noShowsValue)}
            </div>
            <p className="text-xs text-muted-foreground">
              {summary.noShowsTotal} uteblivna behandlingar
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="employees">Anställda</TabsTrigger>
          <TabsTrigger value="treatments">Behandlingar</TabsTrigger>
          <TabsTrigger value="consumables">Förbrukning</TabsTrigger>
          <TabsTrigger value="noshows">No-shows</TabsTrigger>
        </TabsList>

        <TabsContent value="employees">
          <EmployeeEconomyTab data={mockEmployeeEconomyData} />
        </TabsContent>

        <TabsContent value="treatments">
          <TreatmentEconomyTab data={mockTreatmentEconomyData} />
        </TabsContent>

        <TabsContent value="consumables">
          <ConsumablesEconomyTab />
        </TabsContent>

        <TabsContent value="noshows">
          <NoShowsEconomyTab data={mockNoShowData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Economy;