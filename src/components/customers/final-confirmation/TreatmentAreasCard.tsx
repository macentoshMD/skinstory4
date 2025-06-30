
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

interface TreatmentAreasCardProps {
  selectedAreas: string[];
  selectedZones: string[];
}

export function TreatmentAreasCard({ selectedAreas, selectedZones }: TreatmentAreasCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-purple-600" />
          Behandlingsområden
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Valda områden:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedAreas.map(area => (
              <Badge key={area} variant="outline" className="bg-purple-50">
                {area}
              </Badge>
            ))}
          </div>
        </div>
        
        {selectedZones.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Specifika zoner:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedZones.map(zone => (
                <Badge key={zone} variant="outline" className="bg-indigo-50">
                  {zone}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
