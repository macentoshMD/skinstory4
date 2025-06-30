
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface RiskAssessmentCardProps {
  riskLevel: string;
  selectedContraindications: string[];
}

export function RiskAssessmentCard({ riskLevel, selectedContraindications }: RiskAssessmentCardProps) {
  const getRiskColor = () => {
    switch (riskLevel) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getRiskText = () => {
    switch (riskLevel) {
      case 'high': return 'Hög risk - Läkarkonsultation rekommenderas';
      case 'medium': return 'Måttlig risk - Extra försiktighet krävs';
      case 'low': return 'Låg risk - Informera om faktorer';
      default: return 'Ingen känd risk';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {riskLevel === 'high' ? (
            <AlertTriangle className="h-5 w-5 text-red-600" />
          ) : (
            <CheckCircle className="h-5 w-5 text-green-600" />
          )}
          Riskbedömning & Kontraindikationer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Badge className={getRiskColor()}>
          {getRiskText()}
        </Badge>
        
        {selectedContraindications.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Identifierade faktorer:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedContraindications.map(contraindication => (
                <Badge key={contraindication} variant="outline" className="bg-yellow-50 text-yellow-800">
                  {contraindication.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {riskLevel === 'high' && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Rekommendation:</strong> Konsultera med läkare innan behandling påbörjas. 
              Vissa kontraindikationer kräver medicinsk bedömning.
            </p>
          </div>
        )}
        
        {riskLevel === 'medium' && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Rekommendation:</strong> Anpassa behandlingen baserat på identifierade faktorer. 
              Följ upp noga och informera kunden om risker.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
