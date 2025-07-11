import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ConsultationHeader } from './ConsultationHeader';
import { StepWrapper } from './StepWrapper';
import { GeneralDetailsData } from '@/types/consultation';

interface GeneralDetailsStepProps {
  generalDetails: GeneralDetailsData;
  onBack: () => void;
  onContinue: () => void;
  onGeneralDetailsChange: (field: keyof GeneralDetailsData, value: string) => void;
}

export function GeneralDetailsStep({
  generalDetails,
  onBack,
  onContinue,
  onGeneralDetailsChange
}: GeneralDetailsStepProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const isFormValid = () => {
    const baseValidation = Boolean(generalDetails.whenProblemStartsYear) &&
           Boolean(generalDetails.whenProblemStartsMonth) &&
           Boolean(generalDetails.skinStatusAtMoment) &&
           Boolean(generalDetails.treatProblemBefore) &&
           Boolean(generalDetails.skinTexture) &&
           Boolean(generalDetails.skinSensitivity);
    
    if (generalDetails.treatProblemBefore === 'yes') {
      return baseValidation && generalDetails.treatmentDetails.trim().length > 0;
    }
    
    return baseValidation;
  };

  const RadioGroup = ({ 
    title, 
    field, 
    options 
  }: { 
    title: string; 
    field: keyof GeneralDetailsData; 
    options: Array<{ value: string; label: string; color?: string }> 
  }) => (
    <div className="space-y-3">
      <Label className="text-base font-medium">{title}</Label>
      <div className="flex gap-2">
        {options.map((option) => (
          <Button
            key={option.value}
            variant={generalDetails[field] === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => onGeneralDetailsChange(field, option.value)}
            className={`flex-1 ${
              generalDetails[field] === option.value 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'hover:bg-gray-50'
            }`}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <ConsultationHeader
        onBack={onBack}
        onContinue={onContinue}
        canContinue={isFormValid()}
        currentStep={7}
        totalSteps={9}
        continueText="Fortsätt"
      />

      <StepWrapper 
        title="Generell Information"
        subtitle="Fyll i allmän information om kundens hud och livsstil"
      >
        <div className="space-y-6">
          {/* When problem starts */}
          <Card className="p-4">
            <CardContent className="p-0 space-y-4">
              <Label className="text-base font-medium">När började problemet?</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">År</Label>
                  <Select 
                    value={generalDetails.whenProblemStartsYear} 
                    onValueChange={(value) => onGeneralDetailsChange('whenProblemStartsYear', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Välj år" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Månad</Label>
                  <Select 
                    value={generalDetails.whenProblemStartsMonth} 
                    onValueChange={(value) => onGeneralDetailsChange('whenProblemStartsMonth', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Välj månad" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map(month => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skin status at the moment */}
          <Card className="p-4">
            <CardContent className="p-0">
              <RadioGroup
                title="Hudstatus för tillfället"
                field="skinStatusAtMoment"
                options={[
                  { value: 'worse', label: 'Sämre' },
                  { value: 'same', label: 'Samma' },
                  { value: 'better', label: 'Bättre' }
                ]}
              />
            </CardContent>
          </Card>

          {/* Treat problem before */}
          <Card className="p-4">
            <CardContent className="p-0 space-y-4">
              <RadioGroup
                title="Behandlat problemet tidigare"
                field="treatProblemBefore"
                options={[
                  { value: 'yes', label: 'Ja' },
                  { value: 'no', label: 'Nej' }
                ]}
              />
              
              {/* Conditional text input when "Ja" is selected */}
              {generalDetails.treatProblemBefore === 'yes' && (
                <div className="space-y-2 mt-4">
                  <Label className="text-sm font-medium text-gray-700">
                    Beskriv hur problemet behandlats tidigare
                  </Label>
                  <Textarea
                    placeholder="Beskriv vilka behandlingar, produkter eller metoder som använts tidigare..."
                    value={generalDetails.treatmentDetails}
                    onChange={(e) => onGeneralDetailsChange('treatmentDetails', e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skin texture */}
          <Card className="p-4">
            <CardContent className="p-0">
              <RadioGroup
                title="Hudtextur"
                field="skinTexture"
                options={[
                  { value: 'dry', label: 'Torr' },
                  { value: 'oily', label: 'Fet' },
                  { value: 'combination', label: 'Blandhud' }
                ]}
              />
            </CardContent>
          </Card>

          {/* Skin sensitivity */}
          <Card className="p-4">
            <CardContent className="p-0">
              <RadioGroup
                title="Hudkänslighet"
                field="skinSensitivity"
                options={[
                  { value: 'low', label: 'Låg' },
                  { value: 'medium', label: 'Medel' },
                  { value: 'high', label: 'Hög' }
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </StepWrapper>
    </div>
  );
}
