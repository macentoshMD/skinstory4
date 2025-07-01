import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Camera, User, Bot } from 'lucide-react';
import { ConsultationHeader } from './ConsultationHeader';
import { StepWrapper } from './StepWrapper';
import { useEffect } from 'react';

interface DiagnosisMethodStepProps {
  selectedMethod: 'ai' | 'manual' | '';
  onMethodChange: (method: 'ai' | 'manual') => void;
  onBack: () => void;
  onContinue: () => void;
}

export function DiagnosisMethodStep({ 
  selectedMethod, 
  onMethodChange, 
  onBack, 
  onContinue 
}: DiagnosisMethodStepProps) {
  const handleQuickSelect = () => {
    onMethodChange('manual');
    setTimeout(() => onContinue(), 300);
  };

  // Auto-select manual method after 1 second if nothing is selected
  useEffect(() => {
    if (!selectedMethod) {
      const timer = setTimeout(() => {
        onMethodChange('manual');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedMethod, onMethodChange]);

  return (
    <div className="space-y-6">
      <ConsultationHeader
        onBack={onBack}
        onContinue={onContinue}
        canContinue={!!selectedMethod}
        currentStep={4}
        totalSteps={8}
        continueText={selectedMethod === 'manual' ? 'Välj problem' : 'Fortsätt'}
      />

      <StepWrapper 
        title="Diagnosmetod" 
        subtitle="Välj hur du vill diagnostisera hudproblemen"
      >
        <div className="flex justify-end mb-4">
          <Button 
            onClick={handleQuickSelect}
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            🚀 Välj Manuell
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Välj diagnosmetod</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedMethod}
              onValueChange={(value) => onMethodChange(value as 'ai' | 'manual')}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <RadioGroupItem value="ai" id="ai-diagnosis" />
                <div className="flex items-center space-x-3 flex-1">
                  <Bot className="h-8 w-8 text-blue-600" />
                  <div>
                    <Label htmlFor="ai-diagnosis" className="text-base font-medium cursor-pointer">
                      AI Diagnos
                    </Label>
                    <p className="text-sm text-gray-600">Ta foto för automatisk hudanalys</p>
                    <p className="text-xs text-orange-600 font-medium">Kommer snart</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <RadioGroupItem value="manual" id="manual-diagnosis" />
                <div className="flex items-center space-x-3 flex-1">
                  <User className="h-8 w-8 text-green-600" />
                  <div>
                    <Label htmlFor="manual-diagnosis" className="text-base font-medium cursor-pointer">
                      Manuell diagnos
                    </Label>
                    <p className="text-sm text-gray-600">Välj problem manuellt från listan</p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {selectedMethod === 'ai' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-orange-600">AI Diagnos - Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">AI-baserad hudanalys kommer snart!</p>
                <p className="text-sm text-gray-500">
                  Funktionen för att ta foto och få automatisk diagnos är under utveckling.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </StepWrapper>
    </div>
  );
}
