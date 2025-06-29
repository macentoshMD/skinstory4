
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DateRangeFilter, DateRange } from '@/components/DateRangeFilter';
import { FilterPanel } from '@/components/insights/FilterPanel';
import { KPICards } from '@/components/insights/KPICards';
import { DataVisualization } from '@/components/insights/DataVisualization';
import { useInsightsData } from '@/hooks/useInsightsData';
import { Download, RefreshCw, BarChart3 } from 'lucide-react';

const Insights = () => {
  const { data, filterContext, setFilterContext, kpiData } = useInsightsData();

  const handleDateRangeChange = (newRange: DateRange) => {
    setFilterContext({
      ...filterContext,
      temporal: newRange
    });
  };

  const handleExport = () => {
    console.log('Exporterar insights data...', { data, filterContext });
    // Implementation for export functionality would go here
  };

  const handleRefresh = () => {
    console.log('Uppdaterar data...');
    // Force refresh of data
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            Insikter Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Omfattande analys och filtrering av hela SkinStory-systemet
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Uppdatera
          </Button>
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportera
          </Button>
        </div>
      </div>

      {/* Date Range Filter */}
      <DateRangeFilter 
        currentRange={filterContext.temporal}
        onDateRangeChange={handleDateRangeChange}
      />

      {/* Advanced Filters */}
      <FilterPanel
        filterContext={filterContext}
        onFilterChange={setFilterContext}
        data={{
          companies: data.companies,
          clinics: data.clinics,
          staff: data.staff,
          treatments: data.treatments
        }}
      />

      {/* KPI Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Nyckeltal (KPI)</h2>
        <KPICards kpiData={kpiData} />
      </div>

      {/* Data Visualization */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Dataanalys & Visualisering</h2>
        <DataVisualization
          clinics={data.clinics}
          staff={data.staff}
          treatments={data.treatments}
        />
      </div>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Sammanfattning</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-700">Företag</div>
              <div className="text-2xl font-bold text-blue-800">
                {data.companies.length}
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="font-semibold text-green-700">Kliniker</div>
              <div className="text-2xl font-bold text-green-800">
                {data.clinics.length}
              </div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="font-semibold text-purple-700">Personal</div>
              <div className="text-2xl font-bold text-purple-800">
                {data.staff.length}
              </div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="font-semibold text-orange-700">Behandlingar</div>
              <div className="text-2xl font-bold text-orange-800">
                {data.treatments.length}
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Aktiva filter:</h4>
            <p className="text-sm text-gray-600">
              {filterContext.geographic.companies.length === 0 && 
               filterContext.geographic.clinics.length === 0 && 
               filterContext.personnel.roles.length === 0 && 
               filterContext.services.treatmentCategories.length === 0
                ? 'Inga filter tillämpade - visar all data'
                : `Visar filtrerad data baserat på ${
                    [
                      filterContext.geographic.companies.length > 0 ? `${filterContext.geographic.companies.length} företag` : '',
                      filterContext.geographic.clinics.length > 0 ? `${filterContext.geographic.clinics.length} klinik(er)` : '',
                      filterContext.personnel.roles.length > 0 ? `${filterContext.personnel.roles.length} roll(er)` : '',
                      filterContext.services.treatmentCategories.length > 0 ? `${filterContext.services.treatmentCategories.length} kategori(er)` : ''
                    ].filter(Boolean).join(', ')
                  }`
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Insights;
