
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterContext } from '@/types/insights';
import { X, Filter } from 'lucide-react';

interface FilterPanelProps {
  filterContext: FilterContext;
  onFilterChange: (context: FilterContext) => void;
  data: {
    companies: Array<{ id: string; name: string; }>;
    clinics: Array<{ id: string; name: string; companyId: string; }>;
    staff: Array<{ id: string; name: string; role: string; specializations: string[]; }>;
    treatments: Array<{ id: string; name: string; category: string; }>;
  };
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ 
  filterContext, 
  onFilterChange, 
  data 
}) => {
  const updateFilter = (section: keyof FilterContext, updates: any) => {
    onFilterChange({
      ...filterContext,
      [section]: { ...filterContext[section], ...updates }
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      geographic: { companies: [], clinics: [], rooms: [] },
      temporal: filterContext.temporal, // Keep date range
      personnel: { roles: [], specializations: [], certifications: [], staffIds: [], performanceRange: [0, 100] },
      services: { treatmentCategories: [], treatments: [], products: [], priceRange: [0, 5000], equipment: [] },
      customer: { segments: [], loyaltyRange: [0, 100], spendingRange: [0, 50000], visitRange: [0, 100] },
      performance: { revenueRange: [0, 10000000], ratingRange: [0, 5], utilizationRange: [0, 100] },
      reviews: { ratingRange: [0, 5], verified: null, dateRange: filterContext.reviews.dateRange }
    });
  };

  const getActiveFilterCount = () => {
    return filterContext.geographic.companies.length +
           filterContext.geographic.clinics.length +
           filterContext.personnel.roles.length +
           filterContext.personnel.specializations.length +
           filterContext.services.treatmentCategories.length +
           filterContext.services.treatments.length;
  };

  const uniqueRoles = [...new Set(data.staff.map(s => s.role))];
  const uniqueSpecializations = [...new Set(data.staff.flatMap(s => s.specializations))];
  const uniqueCategories = [...new Set(data.treatments.map(t => t.category))];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <CardTitle>Avancerade filter</CardTitle>
          {getActiveFilterCount() > 0 && (
            <Badge variant="secondary">
              {getActiveFilterCount()} aktiva
            </Badge>
          )}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearAllFilters}
          disabled={getActiveFilterCount() === 0}
        >
          Rensa alla
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Geographic Filters */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Geografisk filtrering</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium mb-1 block">Företag</label>
              <Select 
                value={filterContext.geographic.companies[0] || 'all'} 
                onValueChange={(value) => {
                  const companies = value === 'all' ? [] : [value];
                  updateFilter('geographic', { companies });
                  // Clear clinic filter when company changes
                  if (value !== filterContext.geographic.companies[0]) {
                    updateFilter('geographic', { companies, clinics: [] });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Välj företag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla företag</SelectItem>
                  {data.companies.map(company => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium mb-1 block">Klinik</label>
              <Select 
                value={filterContext.geographic.clinics[0] || 'all'} 
                onValueChange={(value) => {
                  const clinics = value === 'all' ? [] : [value];
                  updateFilter('geographic', { clinics });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Välj klinik" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla kliniker</SelectItem>
                  {data.clinics
                    .filter(clinic => 
                      filterContext.geographic.companies.length === 0 || 
                      filterContext.geographic.companies.includes(clinic.companyId)
                    )
                    .map(clinic => (
                    <SelectItem key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Personnel Filters */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Personal</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium mb-1 block">Roll</label>
              <Select 
                value={filterContext.personnel.roles[0] || 'all'} 
                onValueChange={(value) => {
                  const roles = value === 'all' ? [] : [value];
                  updateFilter('personnel', { roles });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Välj roll" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla roller</SelectItem>
                  {uniqueRoles.map(role => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium mb-1 block">Specialisering</label>
              <Select 
                value={filterContext.personnel.specializations[0] || 'all'} 
                onValueChange={(value) => {
                  const specializations = value === 'all' ? [] : [value];
                  updateFilter('personnel', { specializations });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Välj specialisering" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla specialiseringar</SelectItem>
                  {uniqueSpecializations.map(spec => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Service Filters */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Tjänster</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium mb-1 block">Behandlingskategori</label>
              <Select 
                value={filterContext.services.treatmentCategories[0] || 'all'} 
                onValueChange={(value) => {
                  const treatmentCategories = value === 'all' ? [] : [value];
                  updateFilter('services', { treatmentCategories });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Välj kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla kategorier</SelectItem>
                  {uniqueCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium mb-1 block">Prisintervall</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filterContext.services.priceRange[0]}
                  onChange={(e) => {
                    const newRange: [number, number] = [
                      parseInt(e.target.value) || 0, 
                      filterContext.services.priceRange[1]
                    ];
                    updateFilter('services', { priceRange: newRange });
                  }}
                  className="w-20"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filterContext.services.priceRange[1]}
                  onChange={(e) => {
                    const newRange: [number, number] = [
                      filterContext.services.priceRange[0],
                      parseInt(e.target.value) || 5000
                    ];
                    updateFilter('services', { priceRange: newRange });
                  }}
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {getActiveFilterCount() > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Aktiva filter</h4>
            <div className="flex flex-wrap gap-2">
              {filterContext.geographic.companies.map(companyId => {
                const company = data.companies.find(c => c.id === companyId);
                return company ? (
                  <Badge key={companyId} variant="secondary" className="flex items-center gap-1">
                    {company.name}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => updateFilter('geographic', { 
                        companies: filterContext.geographic.companies.filter(id => id !== companyId) 
                      })}
                    />
                  </Badge>
                ) : null;
              })}
              
              {filterContext.personnel.roles.map(role => (
                <Badge key={role} variant="secondary" className="flex items-center gap-1">
                  {role}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => updateFilter('personnel', { 
                      roles: filterContext.personnel.roles.filter(r => r !== role) 
                    })}
                  />
                </Badge>
              ))}
              
              {filterContext.services.treatmentCategories.map(category => (
                <Badge key={category} variant="secondary" className="flex items-center gap-1">
                  {category}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => updateFilter('services', { 
                      treatmentCategories: filterContext.services.treatmentCategories.filter(c => c !== category) 
                    })}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
