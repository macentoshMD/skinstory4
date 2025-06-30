
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ConsultationHeader } from './ConsultationHeader';
import { StepWrapper } from './StepWrapper';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface FinalConfirmationStepProps {
  customerName: string;
  selectedProblems: string[];
  selectedAreas: string[];
  riskLevel: string;
  onBack: () => void;
  onFinish: () => void;
}

export function FinalConfirmationStep({
  customerName,
  selectedProblems,
  selectedAreas,
  riskLevel,
  onBack,
  onFinish
}: FinalConfirmationStepProps) {
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
    <div className="space-y-6">
      <ConsultationHeader
        onBack={onBack}
        onContinue={onFinish}
        canContinue={true}
        currentStep={9}
        totalSteps={9}
        continueText="Slutför konsultation"
      />

      <StepWrapper 
        title="Slutför Konsultation"
        subtitle={`Sammanfattning för ${customerName}`}
      >
        <div className="space-y-6">
          {/* Customer Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Konsultationssammanfattning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Identifierade hudproblem:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProblems.map(problem => (
                    <Badge key={problem} variant="outline" className="bg-blue-50">
                      {problem}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Behandlingsområden:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAreas.map(area => (
                    <Badge key={area} variant="outline" className="bg-purple-50">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {riskLevel === 'high' ? (
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
                Riskbedömning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={getRiskColor()}>
                {getRiskText()}
              </Badge>
              
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

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Nästa steg</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✓ Konsultation sparas i kundens journal</li>
                <li>✓ Behandlingsplan skapas baserat på bedömning</li>
                <li>✓ Uppföljning schemaläggs vid behov</li>
                {riskLevel === 'high' && (
                  <li className="text-red-600">⚠️ Läkarkonsultation krävs före behandling</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </StepWrapper>
    </div>
  );
}
