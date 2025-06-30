
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { GeneralDetailsData } from '@/types/consultation';

interface GeneralDetailsCardProps {
  generalDetails: GeneralDetailsData;
}

export function GeneralDetailsCard({ generalDetails }: GeneralDetailsCardProps) {
  const getSkinStatusText = (status: string) => {
    switch (status) {
      case 'worse': return 'Sämre';
      case 'same': return 'Samma';
      case 'better': return 'Bättre';
      default: return 'Ej angivet';
    }
  };

  const getSkinTextureText = (texture: string) => {
    switch (texture) {
      case 'dry': return 'Torr';
      case 'oily': return 'Fet';
      case 'combination': return 'Blandhud';
      default: return 'Ej angivet';
    }
  };

  const getSkinSensitivityText = (sensitivity: string) => {
    switch (sensitivity) {
      case 'low': return 'Låg';
      case 'medium': return 'Medel';
      case 'high': return 'Hög';
      default: return 'Ej angivet';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-orange-600" />
          Allmän Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p><span className="font-medium">Problem började:</span> {generalDetails.whenProblemStartsMonth} {generalDetails.whenProblemStartsYear}</p>
            <p><span className="font-medium">Nuvarande hudstatus:</span> {getSkinStatusText(generalDetails.skinStatusAtMoment)}</p>
            <p><span className="font-medium">Tidigare behandling:</span> {generalDetails.treatProblemBefore === 'yes' ? 'Ja' : 'Nej'}</p>
          </div>
          <div className="space-y-2">
            <p><span className="font-medium">Hudtextur:</span> {getSkinTextureText(generalDetails.skinTexture)}</p>
            <p><span className="font-medium">Hudkänslighet:</span> {getSkinSensitivityText(generalDetails.skinSensitivity)}</p>
          </div>
        </div>
        
        {generalDetails.treatProblemBefore === 'yes' && generalDetails.treatmentDetails && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Tidigare behandlingsdetaljer:</h4>
            <p className="text-sm text-gray-700">{generalDetails.treatmentDetails}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
