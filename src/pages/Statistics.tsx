
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, TrendingUp, Users, Calendar, Star, Trophy, Award, 
  Target, AlertTriangle, CheckCircle, Zap, Heart 
} from "lucide-react";
import { generateExtendedMockActivities } from "@/utils/mockActivityGenerator";
import { generateEmployeeStats } from "@/utils/employeeStatsGenerator";
import { StatCard } from "@/components/statistics/StatCard";
import { AchievementCard } from "@/components/statistics/AchievementCard";
import { MilestoneCard } from "@/components/statistics/MilestoneCard";
import { TopListCard } from "@/components/statistics/TopListCard";

const Statistics = () => {
  const { activities, stats } = useMemo(() => {
    const now = new Date();
    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);
    const dateRange = { 
      from: threeMonthsAgo, 
      to: now, 
      label: "Senaste 3 månaderna" 
    };
    
    const mockActivities = generateExtendedMockActivities(dateRange);
    const employeeStats = generateEmployeeStats(mockActivities);
    
    return { activities: mockActivities, stats: employeeStats };
  }, []);

  const treatmentItems = Object.entries(stats.treatmentsByType).map(([name, value]) => ({
    name,
    value,
    percentage: (value / stats.totalTreatments) * 100
  }));

  const problemItems = Object.entries(stats.problemsHandled).map(([name, value]) => ({
    name,
    value,
    percentage: (value / stats.totalConsultations) * 100
  }));

  const brandItems = Object.entries(stats.brandsWorkedWith).map(([name, value]) => ({
    name,
    value,
    percentage: (value / stats.totalSales) * 100
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Min Statistik</h1>
        <p className="text-muted-foreground mt-2">Din personliga prestation och framsteg</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Översikt</TabsTrigger>
          <TabsTrigger value="achievements">Utmärkelser</TabsTrigger>
          <TabsTrigger value="breakdowns">Detaljerad analys</TabsTrigger>
          <TabsTrigger value="goals">Mål & Milstolpar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Main KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Totala behandlingar"
              value={stats.totalTreatments}
              subtitle="Alla genomförda behandlingar"
              icon={BarChart3}
              trend={{ value: 12, label: "från förra månaden", positive: true }}
            />
            <StatCard
              title="Konsultationer"
              value={stats.totalConsultations}
              subtitle="Genomförda konsultationer"
              icon={Users}
              trend={{ value: 8, label: "från förra månaden", positive: true }}
            />
            <StatCard
              title="Försäljning"
              value={`${Math.round(stats.totalRevenue).toLocaleString()} kr`}
              subtitle="Total omsättning"
              icon={TrendingUp}
              trend={{ value: 15, label: "från förra månaden", positive: true }}
            />
            <StatCard
              title="Aktiva kunder"
              value={stats.activeCustomers}
              subtitle="Senaste 90 dagarna"
              icon={Heart}
              badge={{ text: `${stats.totalCustomers} totalt` }}
            />
          </div>

          {/* This Month Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Denna månad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.thisMonth.treatments}</div>
                  <p className="text-sm text-muted-foreground">Behandlingar</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.thisMonth.consultations}</div>
                  <p className="text-sm text-muted-foreground">Konsultationer</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.thisMonth.sales}</div>
                  <p className="text-sm text-muted-foreground">Försäljningar</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(stats.thisMonth.revenue).toLocaleString()} kr
                  </div>
                  <p className="text-sm text-muted-foreground">Intäkter</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Konverteringsgrad"
              value={`${stats.conversionRate.toFixed(1)}%`}
              subtitle="Konsultation → Behandling"
              icon={Target}
              badge={{ text: stats.conversionRate > 70 ? "Excellent" : "Good", variant: stats.conversionRate > 70 ? "default" : "secondary" }}
            />
            <StatCard
              title="Genomsnittligt ordervärde"
              value={`${Math.round(stats.averageOrderValue).toLocaleString()} kr`}
              subtitle="Per försäljning"
              icon={TrendingUp}
            />
            <StatCard
              title="Kundnöjdhet"
              value={`${stats.customerSatisfaction.toFixed(1)}/5.0`}
              subtitle="Genomsnittligt betyg"
              icon={Star}
              badge={{ text: stats.customerSatisfaction > 4.5 ? "Utmärkt" : "Bra" }}
            />
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Dina utmärkelser</h2>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium">{stats.achievements.length} utmärkelser</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>

          {stats.achievements.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Inga utmärkelser än</h3>
                <p className="text-muted-foreground">
                  Fortsätt arbeta så kommer du att tjäna dina första utmärkelser snart!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="breakdowns" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopListCard
              title="Mest genomförda behandlingar"
              items={treatmentItems}
              valueFormatter={(v) => `${v} st`}
              showPercentage={true}
            />
            <TopListCard
              title="Problem du hanterat"
              items={problemItems}
              valueFormatter={(v) => `${v} fall`}
              showPercentage={true}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopListCard
              title="Varumärken du arbetat med"
              items={brandItems}
              valueFormatter={(v) => `${v} produkter`}
              showPercentage={true}
            />
            <Card>
              <CardHeader>
                <CardTitle>Kvalitetsmått</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>NoShows</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{stats.noShows}</span>
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Fullbordade behandlingar</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{stats.totalTreatments}</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Genomförandegrad</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {((stats.totalTreatments / (stats.totalTreatments + stats.noShows)) * 100).toFixed(1)}%
                    </span>
                    <Zap className="h-4 w-4 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Kommande milstolpar</h2>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">{stats.nextMilestones.length} aktiva mål</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.nextMilestones.map((milestone) => (
              <MilestoneCard key={milestone.id} milestone={milestone} />
            ))}
          </div>

          {stats.nextMilestones.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Alla mål uppnådda!</h3>
                <p className="text-muted-foreground">
                  Fantastiskt arbete! Nya mål kommer att läggas till snart.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;
