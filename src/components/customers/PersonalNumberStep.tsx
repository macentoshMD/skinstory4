
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
    <div className="space-y-4">
      <div className="text-center py-6">
        <h3 className="text-lg font-semibold mb-4">Ange personnummer för att hämta kundinformation</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="personalNumber">Personnummer</Label>
            <Input
              id="personalNumber"
              placeholder="YYYYMMDD-XXXX"
              value={personalNumber}
              onChange={(e) => onPersonalNumberChange(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Button onClick={onSubmit} className="flex-1">
              Hämta information
            </Button>
            <Button onClick={onSkip} variant="outline" className="flex-1">
              Skippa
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
