
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, X, AlertTriangle, Info } from 'lucide-react';
import { ConsultationHeader } from './ConsultationHeader';
import { StepWrapper } from './StepWrapper';

interface ContraIndicationResponse {
  categoryId: string;
  hasIssues: boolean;
  specificItems: string[];
  details?: string;
}

interface ContraIndicationsStepProps {
  selectedContraindications: string[];
  selectedProblems: string[];
  onContraindicationToggle: (contraindicationId: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const ACNE_CONTRAINDICATION_CATEGORIES = [
  {
    id: 'medications',
    title: 'Mediciner',
    icon: '💊',
    description: 'Tar du några av följande mediciner?',
    items: [
      'Retinoider (Roaccutan, Isotretinoin)',
      'Tetracyklin-antibiotika',
      'Ljuskänsliga mediciner',
      'Kortisonbehandling',
      'Blodförtunnande mediciner'
    ]
  },
  {
    id: 'pregnancy_nursing',
    title: 'Graviditet & Amning',
    icon: '🤰',
    description: 'Är någon av följande tillämplig?',
    items: [
      'Gravid',
      'Ammar',
      'Planerar graviditet inom 6 månader',
      'Använder hormonella preventivmedel'
    ]
  },
  {
    id: 'allergies',
    title: 'Allergi & Känslighet',
    icon: '⚠️',
    description: 'Har du några av följande allergier eller känsligheter?',
    items: [
      'Kontakteksem',
      'Känd allergi mot hudvårdsprodukter',
      'Extremt känslig hud',
      'Autoimmun hudsjukdom'
    ]
  },
  {
    id: 'skin_status',
    title: 'Aktuell Hudstatus',
    icon: '🌈',
    description: 'Har du någon av följande hudförhållanden just nu?',
    items: [
      'Aktiv inflammation/infektion',
      'Öppna sår i behandlingsområdet',
      'Akut eksem eller dermatit',
      'Misstänkta hudförändringar'
    ]
  },
  {
    id: 'recent_treatments',
    title: 'Tidigare Behandlingar',
    icon: '🕐',
    description: 'Har du genomgått någon av dessa behandlingar senaste 3 månaderna?',
    items: [
      'Kemisk peeling',
      'Laserbehandling',
      'IPL-behandling',
      'Microneedling',
      'Professionell extraktion'
    ]
  }
];

export function ModernContraIndicationsStep({
  selectedContraindications,
  onContraindicationToggle,
  onBack,
  onContinue
}: ContraIndicationsStepProps) {
  const [responses, setResponses] = useState<ContraIndicationResponse[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [autocompleteInputs, setAutocompleteInputs] = useState<Record<string, string>>({});

  const handleCategoryResponse = (categoryId: string, hasIssues: boolean) => {
    setResponses(prev => {
      const existing = prev.find(r => r.categoryId === categoryId);
      if (existing) {
        return prev.map(r => 
          r.categoryId === categoryId 
            ? { ...r, hasIssues, specificItems: hasIssues ? r.specificItems : [] }
            : r
        );
      }
      return [...prev, { categoryId, hasIssues, specificItems: [] }];
    });

    if (hasIssues) {
      setExpandedCategories(prev => new Set([...prev, categoryId]));
    } else {
      setExpandedCategories(prev => {
        const newSet = new Set(prev);
        newSet.delete(categoryId);
        return newSet;
      });
      // Clear any selected items for this category
      const category = ACNE_CONTRAINDICATION_CATEGORIES.find(c => c.id === categoryId);
      if (category) {
        category.items.forEach(item => {
          if (selectedContraindications.includes(item)) {
            onContraindicationToggle(item);
          }
        });
      }
    }
  };

  const handleItemSelect = (categoryId: string, item: string) => {
    // Toggle the contraindication
    onContraindicationToggle(item);
    
    // Update responses
    setResponses(prev => 
      prev.map(r => 
        r.categoryId === categoryId
          ? {
              ...r,
              specificItems: r.specificItems.includes(item)
                ? r.specificItems.filter(i => i !== item)
                : [...r.specificItems, item]
            }
          : r
      )
    );
  };

  const handleAutocompleteSelect = (categoryId: string, value: string) => {
    const category = ACNE_CONTRAINDICATION_CATEGORIES.find(c => c.id === categoryId);
    if (category && value.trim()) {
      const matchingItem = category.items.find(item => 
        item.toLowerCase().includes(value.toLowerCase())
      );
      
      if (matchingItem) {
        handleItemSelect(categoryId, matchingItem);
        setAutocompleteInputs(prev => ({ ...prev, [categoryId]: '' }));
      }
    }
  };

  const getCategoryResponse = (categoryId: string) => {
    return responses.find(r => r.categoryId === categoryId);
  };

  const getRiskLevel = () => {
    const totalSelected = selectedContraindications.length;
    const criticalItems = ['Gravid', 'Ammar', 'Retinoider (Roaccutan, Isotretinoin)', 'Aktiv inflammation/infektion'];
    const hasCritical = selectedContraindications.some(item => 
      criticalItems.some(critical => item.includes(critical.split(' ')[0]))
    );
    
    if (hasCritical) return 'high';
    if (totalSelected >= 3) return 'medium';
    if (totalSelected > 0) return 'low';
    return 'none';
  };

  const riskLevel = getRiskLevel();

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
        title="Säkerhetskontroll för Aknebehandling"
        subtitle="Besvara bara de kategorier som är relevanta för dig"
      >
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            För att säkerställa en trygg aknebehandling behöver vi kontrollera några viktiga faktorer. 
            Svara "Nej" på alla kategorier som inte är relevanta för dig.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6">
          {ACNE_CONTRAINDICATION_CATEGORIES.map((category) => {
            const response = getCategoryResponse(category.id);
            const isExpanded = expandedCategories.has(category.id);
            
            return (
              <Card key={category.id} className={`border-2 ${
                response?.hasIssues ? 'border-orange-200 bg-orange-50' : 'border-gray-200'
              }`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={response?.hasIssues === true ? 'default' : 'outline'}
                        onClick={() => handleCategoryResponse(category.id, true)}
                        className={`${
                          response?.hasIssues === true 
                            ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                            : 'hover:bg-orange-50 hover:border-orange-300'
                        }`}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Ja
                      </Button>
                      <Button
                        size="sm"
                        variant={response?.hasIssues === false ? 'default' : 'outline'}
                        onClick={() => handleCategoryResponse(category.id, false)}
                        className={`${
                          response?.hasIssues === false 
                            ? 'bg-green-600 hover:bg-green-700 text-white' 
                            : 'hover:bg-green-50 hover:border-green-300'
                        }`}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Nej
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && response?.hasIssues && (
                  <CardContent className="pt-0 border-t border-gray-200">
                    <div className="space-y-4">
                      <Label className="text-sm font-medium">Välj vad som gäller dig:</Label>
                      
                      <div className="grid gap-2">
                        {category.items.map((item) => (
                          <div
                            key={item}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              selectedContraindications.includes(item)
                                ? 'border-orange-300 bg-orange-100'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                            onClick={() => handleItemSelect(category.id, item)}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{item}</span>
                              {selectedContraindications.includes(item) && (
                                <CheckCircle className="w-4 h-4 text-orange-600" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4">
                        <Label htmlFor={`autocomplete-${category.id}`} className="text-sm">
                          Eller sök efter något annat:
                        </Label>
                        <Input
                          id={`autocomplete-${category.id}`}
                          placeholder="Skriv för att söka..."
                          value={autocompleteInputs[category.id] || ''}
                          onChange={(e) => {
                            setAutocompleteInputs(prev => ({
                              ...prev,
                              [category.id]: e.target.value
                            }));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleAutocompleteSelect(category.id, e.currentTarget.value);
                            }
                          }}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {selectedContraindications.length > 0 && (
          <div className="mt-6 space-y-4">
            <div>
              <h4 className="font-medium mb-2">Identifierade faktorer:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedContraindications.map(item => (
                  <Badge key={item} variant="outline" className="bg-orange-50 text-orange-800 border-orange-200">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            <Alert className={`${
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
                {riskLevel === 'high' && 'Viktiga faktorer identifierade. Vi kommer att diskutera detta vidare och eventuellt behöva konsultera läkare.'}
                {riskLevel === 'medium' && 'Några faktorer att ta hänsyn till. Vi anpassar behandlingen därefter.'}
                {riskLevel === 'low' && 'Inga allvarliga hinder för aknebehandling identifierade.'}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {selectedContraindications.length === 0 && responses.length > 0 && (
          <Alert className="mt-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Inga kontraindikationer identifierade. Du kan fortsätta med aknebehandlingen.
            </AlertDescription>
          </Alert>
        )}
      </StepWrapper>
    </div>
  );
}
