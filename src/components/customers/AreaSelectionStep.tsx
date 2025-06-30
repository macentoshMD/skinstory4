
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, MapPin } from 'lucide-react';
import { TREATMENT_AREAS, TREATMENT_ZONES } from '@/types/treatment-areas-index';

interface AreaSelectionStepProps {
  selectedAreas: string[];
  selectedZones: string[];
  onAreasChange: (areas: string[]) => void;
  onZonesChange: (zones: string[]) => void;
  onBack: () => void;
  onContinue: () => void;
}

// Områden som är relevanta för akne
const ACNE_RELEVANT_AREAS = ['face', 'neck', 'chest', 'back', 'shoulders'];

export function AreaSelectionStep({ 
  selectedAreas, 
  selectedZones,
  onAreasChange, 
  onZonesChange,
  onBack, 
  onContinue 
}: AreaSelectionStepProps) {
  const [expandedAreas, setExpandedAreas] = useState<string[]>(['face']); // Face expanded by default

  const relevantAreas = TREATMENT_AREAS.filter(area => 
    ACNE_RELEVANT_AREAS.includes(area.id)
  );

  const toggleAreaExpansion = (areaId: string) => {
    setExpandedAreas(prev => 
      prev.includes(areaId) 
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
    );
  };

  const handleAreaToggle = (areaId: string, checked: boolean) => {
    if (checked) {
      onAreasChange([...selectedAreas, areaId]);
    } else {
      onAreasChange(selectedAreas.filter(id => id !== areaId));
      // Also remove all zones for this area
      const areaZones = TREATMENT_ZONES.filter(zone => zone.areaId === areaId);
      const zonesToRemove = areaZones.map(zone => zone.id);
      onZonesChange(selectedZones.filter(zoneId => !zonesToRemove.includes(zoneId)));
    }
  };

  const handleZoneToggle = (zoneId: string, checked: boolean) => {
    if (checked) {
      onZonesChange([...selectedZones, zoneId]);
    } else {
      onZonesChange(selectedZones.filter(id => id !== zoneId));
    }
  };

  const canContinue = selectedAreas.length > 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold mb-2">Välj Behandlingsområden</h2>
        <p className="text-gray-600">
          Välj de områden där akne förekommer. Du kan sedan specificera exakta zoner inom varje område.
        </p>
      </div>

      <div className="grid gap-4">
        {relevantAreas.map(area => {
          const isAreaSelected = selectedAreas.includes(area.id);
          const isExpanded = expandedAreas.includes(area.id);
          const areaZones = TREATMENT_ZONES.filter(zone => zone.areaId === area.id);
          const selectedAreaZones = selectedZones.filter(zoneId => 
            areaZones.some(zone => zone.id === zoneId)
          );

          return (
            <Card key={area.id} className={`transition-all ${isAreaSelected ? 'ring-2 ring-blue-500' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={area.id}
                      checked={isAreaSelected}
                      onCheckedChange={(checked) => handleAreaToggle(area.id, !!checked)}
                    />
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {area.name}
                      </CardTitle>
                      {area.description && (
                        <CardDescription>{area.description}</CardDescription>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedAreaZones.length > 0 && (
                      <Badge variant="secondary">
                        {selectedAreaZones.length} zoner valda
                      </Badge>
                    )}
                    {isAreaSelected && areaZones.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleAreaExpansion(area.id)}
                      >
                        {isExpanded ? 'Dölj zoner' : 'Visa zoner'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              {isAreaSelected && isExpanded && areaZones.length > 0 && (
                <CardContent className="pt-0">
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3 text-sm text-gray-600">
                      Specifika zoner inom {area.name.toLowerCase()}:
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {areaZones.map(zone => (
                        <div key={zone.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={zone.id}
                            checked={selectedZones.includes(zone.id)}
                            onCheckedChange={(checked) => handleZoneToggle(zone.id, !!checked)}
                          />
                          <label
                            htmlFor={zone.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {zone.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Tillbaka
        </Button>
        <Button 
          onClick={onContinue} 
          disabled={!canContinue}
          className="bg-green-600 hover:bg-green-700"
        >
          Fortsätt till behandlingsplan
        </Button>
      </div>
    </div>
  );
}
