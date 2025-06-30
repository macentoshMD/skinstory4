
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Info } from 'lucide-react';
import { ConsultationHeader } from './ConsultationHeader';
import { StepWrapper } from './StepWrapper';
import { CONTRAINDICATIONS, CONTRAINDICATION_CATEGORIES } from '@/data/contraindications';

interface ContraIndicationsStepProps {
  selectedContraindications: string[];
  onContraindicationToggle: (contraindicationId: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function ContraIndicationsStep({
  selectedContraindications,
  onContraindicationToggle,
  onBack,
  onContinue
}: ContraIndicationsStepProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskLevel = () => {
    const selectedItems = CONTRAINDICATIONS.filter(item => 
      selectedContraindications.includes(item.id)
    );
    
    if (selectedItems.some(item => item.severity === 'high')) return 'high';
    if (selectedItems.some(item => item.severity === 'medium')) return 'medium';
    if (selectedItems.length > 0) return 'low';
    return 'none';
  };

  const riskLevel = getRiskLevel();

  return (
    <div className="space-y-6">
      <ConsultationHeader
        onBack={onBack}
        onContinue={onContinue}
        canContinue={true}
        currentStep={3}
        totalSteps={8}
        continueText="Fortsätt"
      />

      <StepWrapper 
        title="Kontraindikationer"
        subtitle="Medicinska tillstånd och faktorer som kan påverka behandlingen"
      >
        {/* Risk Assessment */}
        {riskLevel !== 'none' && (
          <Alert className={`mb-6 ${
            riskLevel === 'high' ? 'border-red-200 bg-red-50' :
            riskLevel === 'medium' ? 'border-yellow-200 bg-yellow-50' :
            'border-blue-200 bg-blue-50'
          }`}>
            <AlertTriangle className={`h-4 w-4 ${
              riskLevel === 'high' ? 'text-red-600' :
              riskLevel === 'medium' ? 'text-yellow-600' :
              'text-blue-600'
            }`} />
            <AlertDescription className={
              riskLevel === 'high' ? 'text-red-800' :
              riskLevel === 'medium' ? 'text-yellow-800' :
              'text-blue-800'
            }>
              {riskLevel === 'high' && 'Högrisk kontraindikationer identifierade. Konsultera med läkare innan behandling.'}
              {riskLevel === 'medium' && 'Mediumrisk faktorer identifierade. Extra försiktighet krävs.'}
              {riskLevel === 'low' && 'Lågrisk faktorer identifierade. Informera kunden om eventuella risker.'}
            </AlertDescription>
          </Alert>
        )}

        {/* Categories */}
        <div className="space-y-6">
          {CONTRAINDICATION_CATEGORIES.map(category => {
            const categoryItems = CONTRAINDICATIONS.filter(item => 
              item.mainCategory === category.id
            );

            return (
              <Card key={category.id} className="border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{category.emoji}</span>
                    <span>{category.name}</span>
                  </CardTitle>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categoryItems.map(item => (
                    <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                      <Checkbox
                        id={item.id}
                        checked={selectedContraindications.includes(item.id)}
                        onCheckedChange={() => onContraindicationToggle(item.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <label htmlFor={item.id} className="font-medium text-sm cursor-pointer">
                            {item.name}
                          </label>
                          <Badge variant="outline" className={getSeverityColor(item.severity)}>
                            {item.severity === 'high' ? 'Hög risk' : 
                             item.severity === 'medium' ? 'Medel risk' : 'Låg risk'}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Information */}
        <Alert className="mt-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Dessa frågor hjälper oss att bedöma säkerheten för behandlingen. 
            Var ärlig med dina svar för att säkerställa bästa möjliga resultat.
          </AlertDescription>
        </Alert>
      </StepWrapper>
    </div>
  );
}
