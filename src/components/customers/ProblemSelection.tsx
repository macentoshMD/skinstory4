import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ConsultationHeader } from './ConsultationHeader';
import { StepWrapper } from './StepWrapper';

interface ProblemSelectionProps {
  selectedProblems: string[];
  onProblemToggle: (problemId: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const MAIN_PROBLEMS = [
  {
    id: 'acne',
    name: 'Acne',
    image: '/lovable-uploads/f90177a4-8fea-4b08-8d2e-de8b1dde2168.png'
  },
  {
    id: 'rosacea',
    name: 'Rosacea',
    image: '/lovable-uploads/f90177a4-8fea-4b08-8d2e-de8b1dde2168.png'
  },
  {
    id: 'perioral-dermatit',
    name: 'Perioral dermatit',
    image: '/lovable-uploads/f90177a4-8fea-4b08-8d2e-de8b1dde2168.png'
  },
  {
    id: 'seborre',
    name: 'Seborré',
    image: '/lovable-uploads/f90177a4-8fea-4b08-8d2e-de8b1dde2168.png'
  },
  {
    id: 'milier',
    name: 'Milier',
    image: '/lovable-uploads/f90177a4-8fea-4b08-8d2e-de8b1dde2168.png'
  },
  {
    id: 'torr-kanslig-hy',
    name: 'Torr & Känslig hy',
    image: '/lovable-uploads/f90177a4-8fea-4b08-8d2e-de8b1dde2168.png'
  },
  {
    id: 'blandhy',
    name: 'Blandhy',
    image: '/lovable-uploads/f90177a4-8fea-4b08-8d2e-de8b1dde2168.png'
  },
  {
    id: 'aknearr',
    name: 'Akneärr',
    image: '/lovable-uploads/f90177a4-8fea-4b08-8d2e-de8b1dde2168.png'
  },
  {
    id: 'ytliga-blodkarl',
    name: 'Ytliga Blodkärl',
    image: '/lovable-uploads/f90177a4-8fea-4b08-8d2e-de8b1dde2168.png'
  },
  {
    id: 'stora-porer',
    name: 'Stora porer',
    image: '/lovable-uploads/f90177a4-8fea-4b08-8d2e-de8b1dde2168.png'
  },
  {
    id: 'pigmentflackar',
    name: 'Pigmentfläckar',
    image: '/lovable-uploads/f90177a4-8fea-4b08-8d2e-de8b1dde2168.png'
  },
  {
    id: 'mogen-hy',
    name: 'Mogen Hy',
    image: '/lovable-uploads/f90177a4-8fea-4b08-8d2e-de8b1dde2168.png'
  },
  {
    id: 'hudforandringar',
    name: 'Hudförändringar',
    image: '/lovable-uploads/f90177a4-8fea-4b08-8d2e-de8b1dde2168.png'
  },
  {
    id: 'bristningar',
    name: 'Bristningar',
    image: '/lovable-uploads/f90177a4-8fea-4b08-8d2e-de8b1dde2168.png'
  },
  {
    id: 'oonskat-har',
    name: 'Oönskat hår',
    image: '/lovable-uploads/f90177a4-8fea-4b08-8d2e-de8b1dde2168.png'
  }
];

export function ProblemSelection({ selectedProblems, onProblemToggle, onBack, onContinue }: ProblemSelectionProps) {
  const handleQuickSelect = () => {
    // Välj de vanligaste problemen automatiskt
    const commonProblems = ['acne', 'stora-porer', 'blandhy'];
    commonProblems.forEach(problem => {
      if (!selectedProblems.includes(problem)) {
        onProblemToggle(problem);
      }
    });
    
    setTimeout(() => onContinue(), 300);
  };

  return (
    <div className="space-y-6">
      <ConsultationHeader
        onBack={onBack}
        onContinue={onContinue}
        canContinue={selectedProblems.length > 0}
        currentStep={5}
        totalSteps={8}
        continueText="Fortsätt"
      />

      <StepWrapper 
        title="Hudproblem" 
        subtitle="Välj de hudproblem som kunden har"
      >
        <div className="flex justify-end mb-4">
          <Button 
            onClick={handleQuickSelect}
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            🚀 Välj Vanliga Problem
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {MAIN_PROBLEMS.map((problem) => (
            <Card 
              key={problem.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedProblems.includes(problem.id) 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onProblemToggle(problem.id)}
            >
              <CardContent className="p-4 text-center">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center">
                    <span className="text-2xl">🔬</span>
                  </div>
                </div>
                <h3 className="font-medium text-sm text-gray-900">{problem.name}</h3>
                
                {selectedProblems.includes(problem.id) && (
                  <div className="mt-2">
                    <div className="w-5 h-5 bg-blue-500 rounded-full mx-auto flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </StepWrapper>
    </div>
  );
}
