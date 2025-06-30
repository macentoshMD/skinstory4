
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ConsultationHeader } from './ConsultationHeader';
import { StepWrapper } from './StepWrapper';

interface PersonalNumberStepProps {
  personalNumber: string;
  onPersonalNumberChange: (value: string) => void;
  onSubmit: () => void;
  onSkip: () => void;
}

export function PersonalNumberStep({ 
  personalNumber, 
  onPersonalNumberChange, 
  onSubmit,
  onSkip
}: PersonalNumberStepProps) {
  return (
    <div className="space-y-6">
      <ConsultationHeader
        onContinue={onSubmit}
        canGoBack={false}
        canContinue={true}
        currentStep={1}
        totalSteps={8}
        continueText="Hämta information"
      />

      <StepWrapper 
        title="Personnummer" 
        subtitle="Ange personnummer för att hämta kundinformation"
      >
        <div className="max-w-md mx-auto space-y-4">
          <div>
            <Label htmlFor="personalNumber">Personnummer</Label>
            <Input
              id="personalNumber"
              placeholder="YYYYMMDD-XXXX"
              value={personalNumber}
              onChange={(e) => onPersonalNumberChange(e.target.value)}
              className="mt-2"
            />
          </div>
          <Button 
            onClick={onSkip} 
            variant="outline" 
            className="w-full"
          >
            Skippa och fortsätt manuellt
          </Button>
        </div>
      </StepWrapper>
    </div>
  );
}
