
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Info } from 'lucide-react';
import { ConsultationHeader } from './ConsultationHeader';
import { StepWrapper } from './StepWrapper';
import { CONTRAINDICATION_CATEGORIES } from '@/data/contraindications';
import { getRelevantContraindications, getContraindicationContext, categorizeContraindications } from '@/utils/contraindicationFiltering';

interface ContraIndicationsStepProps {
  selectedContraindications: string[];
  selectedProblems: string[];
  onContraindicationToggle: (contraindicationId: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function ContraIndicationsStep({
  selectedContraindications,
  selectedProblems,
  onContraindicationToggle,
  onBack,
  onContinue
}: ContraIndicationsStepProps) {
  const relevantContraindications = getRelevantContraindications(selectedProblems);
  const contextMessage = getContraindicationContext(selectedProblems);
  const categorizedContraindications = categorizeContraindications(relevantContraindications);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskLevel = () => {
    const selectedItems = relevantContraindications.filter(item => 
      selectedContraindications.includes(item.id)
    );
    
    if (selectedItems.some(item => item.severity === 'high')) return 'high';
    if (selectedItems.some(item => item.severity === 'medium')) return 'medium';
    if (selectedItems.length > 0) return 'low';
    return 'none';
  };

  const riskLevel = getRiskLevel();

  const renderContraindicationSection = (title: string, items: any[], severity: string) => {
    if (items.length === 0) return null;

    const getSectionColor = () => {
      switch (severity) {
        case 'high': return 'border-red-200 bg-red-50';
        case 'medium': return 'border-yellow-200 bg-yellow-50';
        case 'low': return 'border-blue-200 bg-blue-50';
        default: return 'border-gray-200 bg-gray-50';
      }
    };

    return (
      <Card className={`border ${getSectionColor()}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            {severity === 'high' && <AlertTriangle className="h-5 w-5 text-red-600" />}
            {severity === 'medium' && <Info className="h-5 w-5 text-yellow-600" />}
            {severity === 'low' && <Info className="h-5 w-5 text-blue-600" />}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-white/50">
              <Checkbox
                id={item.id}
                checked={selectedContraindications.includes(item.id)}
                onCheckedChange={() => onContraindicationToggle(item.id)}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <label htmlFor={item.id} className="font-medium text-sm cursor-pointer">
                    <span className="mr-2">{item.emoji}</span>
                    {item.name}
                  </label>
                  <Badge variant="outline" className={getSeverityColor(item.severity)}>
                    {item.severity === 'high' ? 'Kritisk' : 
                     item.severity === 'medium' ? 'Viktigt' : 'Observera'}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <ConsultationHeader
        onBack={onBack}
        onContinue={onContinue}
        canContinue={true}
        currentStep={8}
        totalSteps={9}
        continueText="Fortsätt"
      />

      <StepWrapper 
        title="Kontraindikationer"
        subtitle="Medicinska faktorer som kan påverka behandlingen"
      >
        {/* Context Information */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            {contextMessage}
          </AlertDescription>
        </Alert>

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
              {riskLevel === 'high' && 'Högrisk faktorer identifierade. Konsultera med läkare innan behandling.'}
              {riskLevel === 'medium' && 'Viktiga faktorer identifierade. Extra försiktighet krävs vid behandling.'}
              {riskLevel === 'low' && 'Faktorer att ta hänsyn till identifierade. Informera kunden om eventuella risker.'}
            </AlertDescription>
          </Alert>
        )}

        {/* Categorized Contraindications */}
        <div className="space-y-6">
          {renderContraindicationSection(
            "Kritiska faktorer", 
            categorizedContraindications.critical, 
            'high'
          )}
          
          {renderContraindicationSection(
            "Viktiga faktorer", 
            categorizedContraindications.important, 
            'medium'
          )}
          
          {renderContraindicationSection(
            "Faktorer att observera", 
            categorizedContraindications.awareness, 
            'low'
          )}
        </div>

        {/* Summary Information */}
        <Alert className="mt-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Endast relevanta kontraindikationer för dina valda hudproblem visas här. 
            Var ärlig med dina svar för att säkerställa säker behandling.
          </AlertDescription>
        </Alert>
      </StepWrapper>
    </div>
  );
}
