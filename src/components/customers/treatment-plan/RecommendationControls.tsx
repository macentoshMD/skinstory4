
import { Button } from '@/components/ui/button';
import { Sparkles, Trash2 } from 'lucide-react';

interface RecommendationControlsProps {
  onGenerateRecommendations: () => void;
  onClearRecommendations: () => void;
}

export function RecommendationControls({ 
  onGenerateRecommendations, 
  onClearRecommendations 
}: RecommendationControlsProps) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-3">
      <Button
        onClick={onGenerateRecommendations}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
      >
        <Sparkles className="h-4 w-4 mr-2" />
        Generera AI-rekommendationer
      </Button>
      <Button
        onClick={onClearRecommendations}
        variant="outline"
        className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Rensa alla rekommendationer
      </Button>
      <div className="text-sm text-gray-600 mt-2 sm:mt-0 sm:ml-4 sm:self-center">
        Skapa automatiska rekommendationer baserat på diagnos och hudanalys
      </div>
    </div>
  );
}
