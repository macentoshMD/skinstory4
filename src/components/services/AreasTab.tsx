import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BODY_REGIONS, TREATMENT_AREAS, TREATMENT_ZONES } from "@/types/treatment-areas-index";
import { Plus, Search, Filter, Edit, Trash2, ChevronDown, ChevronRight, MapPin, Star, Target } from "lucide-react";

interface AreasTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function AreasTab({ searchTerm, setSearchTerm }: AreasTabProps) {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [expandedAreas, setExpandedAreas] = useState<string[]>([]);

  const filteredRegions = BODY_REGIONS.filter(region => {
    if (selectedRegion !== "all" && region.id !== selectedRegion) return false;
    
    const regionAreas = TREATMENT_AREAS.filter(area => area.regionId === region.id);
    return regionAreas.some(area => {
      const matchesSearch = area.name.toLowerCase().includes(searchTerm.toLowerCase());
      const areaZones = TREATMENT_ZONES.filter(zone => zone.areaId === area.id);
      const hasMatchingZones = areaZones.some(zone => 
        zone.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchesSearch || hasMatchingZones;
    });
  });

  const toggleAreaExpansion = (areaId: string) => {
    setExpandedAreas(prev => 
      prev.includes(areaId) 
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
    );
  };

  const getRegionColor = (regionId: string) => {
    switch (regionId) {
      case 'head':
        return 'bg-blue-100 text-blue-800';
      case 'upper-body':
        return 'bg-green-100 text-green-800';
      case 'lower-body':
        return 'bg-purple-100 text-purple-800';
      case 'intim':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalAreas = TREATMENT_AREAS.length;
  const totalZones = TREATMENT_ZONES.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Sök områden och zoner..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="pl-10" 
            />
          </div>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla regioner</SelectItem>
              {BODY_REGIONS.map(region => (
                <SelectItem key={region.id} value={region.id}>
                  <div className="flex items-center gap-2">
                    <span>{region.icon}</span>
                    <span>{region.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Nytt område
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ny zon
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalAreas}</p>
                <p className="text-sm text-muted-foreground">Områden</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalZones}</p>
                <p className="text-sm text-muted-foreground">Zoner</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Filter className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{filteredRegions.length}</p>
                <p className="text-sm text-muted-foreground">Regioner</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Target className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{BODY_REGIONS.length}</p>
                <p className="text-sm text-muted-foreground">Regioner totalt</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Behandlingsområden och Zoner</CardTitle>
          <CardDescription>
            Hierarkisk vy av kroppsregioner, områden och specifika behandlingszoner
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRegions.map(region => {
              const regionAreas = TREATMENT_AREAS.filter(area => area.regionId === region.id);
              const filteredAreas = regionAreas.filter(area => {
                const matchesSearch = area.name.toLowerCase().includes(searchTerm.toLowerCase());
                if (matchesSearch) return true;
                
                const areaZones = TREATMENT_ZONES.filter(zone => zone.areaId === area.id);
                return areaZones.some(zone => 
                  zone.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
              });

              if (filteredAreas.length === 0) return null;

              return (
                <div key={region.id} className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{region.icon}</span>
                    <div>
                      <h3 className="font-semibold text-lg">{region.name}</h3>
                      <p className="text-sm text-muted-foreground">{region.description}</p>
                    </div>
                    <Badge className={getRegionColor(region.id)}>
                      {filteredAreas.length} områden
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    {filteredAreas.map(area => {
                      const areaZones = TREATMENT_ZONES.filter(zone => zone.areaId === area.id);
                      const filteredZones = areaZones.filter(zone => 
                        searchTerm === "" || zone.name.toLowerCase().includes(searchTerm.toLowerCase())
                      );
                      const isExpanded = expandedAreas.includes(area.id);

                      return (
                        <Collapsible key={area.id} open={isExpanded} onOpenChange={() => toggleAreaExpansion(area.id)}>
                          <div className="flex items-center justify-between p-3 bg-muted/50 rounded border">
                            <CollapsibleTrigger asChild>
                              <Button variant="ghost" className="flex items-center gap-2 p-0 h-auto">
                                {isExpanded ? 
                                  <ChevronDown className="h-4 w-4" /> : 
                                  <ChevronRight className="h-4 w-4" />
                                }
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{area.name}</span>
                                <Badge variant="outline" className="ml-2">
                                  {areaZones.length} zoner
                                </Badge>
                              </Button>
                            </CollapsibleTrigger>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <CollapsibleContent className="mt-2">
                            <div className="ml-6 space-y-2">
                              {filteredZones.map(zone => (
                                <div key={zone.id} className="flex items-center justify-between p-2 bg-background border rounded">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-muted rounded-full" />
                                    <span>{zone.name}</span>
                                    {zone.description && (
                                      <span className="text-sm text-muted-foreground">
                                        - {zone.description}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex gap-1">
                                    <Button variant="ghost" size="sm">
                                      <Edit className="h-3 w-3" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                              {filteredZones.length === 0 && searchTerm && (
                                <p className="text-sm text-muted-foreground italic">
                                  Inga zoner matchar sökningen
                                </p>
                              )}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            
            {filteredRegions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Inga områden eller zoner matchar din sökning</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
