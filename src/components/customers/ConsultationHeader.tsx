
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ConsultationHeaderProps {
  onBack?: () => void;
  onContinue: () => void;
  canGoBack?: boolean;
  canContinue?: boolean;
  currentStep: number;
  totalSteps: number;
  continueText?: string;
  backText?: string;
}

export function ConsultationHeader({
  onBack,
  onContinue,
  canGoBack = true,
  canContinue = true,
  currentStep,
  totalSteps,
  continueText = 'Fortsätt',
  backText = 'Tillbaka'
}: ConsultationHeaderProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        {canGoBack && onBack && (
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {backText}
          </Button>
        )}
        {!canGoBack && <div className="w-20"></div>}
      </div>
      
      <div className="flex-1 mx-8">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-center mt-2 text-sm text-gray-600">
          Steg {currentStep} av {totalSteps}
        </div>
      </div>
      
      <Button 
        onClick={onContinue} 
        disabled={!canContinue}
        className="bg-blue-500 hover:bg-blue-600 min-w-20"
      >
        {continueText}
      </Button>
    </div>
  );
}
