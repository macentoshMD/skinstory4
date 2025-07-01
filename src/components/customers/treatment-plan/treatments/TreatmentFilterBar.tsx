import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';

interface TreatmentFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedProblems: string[];
  onProblemToggle: (problem: string) => void;
  selectedMethods: string[];
  onMethodToggle: (method: string) => void;
  selectedModels: string[];
  onModelToggle: (model: string) => void;
  availableProblems: string[];
  availableMethods: string[];
  availableModels: string[];
  onClearFilters: () => void;
  totalCount: number;
  filteredCount: number;
}

export function TreatmentFilterBar({
  searchTerm,
  onSearchChange,
  selectedProblems,
  onProblemToggle,
  selectedMethods,
  onMethodToggle,
  selectedModels,
  onModelToggle,
  availableProblems,
  availableMethods,
  availableModels,
  onClearFilters,
  totalCount,
  filteredCount
}: TreatmentFilterBarProps) {
  const hasActiveFilters = selectedProblems.length > 0 || selectedMethods.length > 0 || selectedModels.length > 0 || searchTerm.length > 0;

  const getProblemDisplayName = (problem: string) => {
    const names: { [key: string]: string } = {
      'acne': 'Akne',
      'rosacea': 'Rosacea',
      'pigment': 'Pigmentfläckar',
      'wrinkles': 'Rynkor',
      'scars': 'Ärr'
    };
    return names[problem] || problem;
  };

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Sök behandlingar..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Problem Filters */}
      <div>
        <h4 className="text-sm font-medium mb-2">Problem:</h4>
        <div className="flex flex-wrap gap-2">
          {availableProblems.map(problem => (
            <Badge
              key={problem}
              variant={selectedProblems.includes(problem) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/20"
              onClick={() => onProblemToggle(problem)}
            >
              {getProblemDisplayName(problem)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Method Filters */}
      <div>
        <h4 className="text-sm font-medium mb-2">Metod:</h4>
        <div className="flex flex-wrap gap-2">
          {availableMethods.map(method => (
            <Badge
              key={method}
              variant={selectedMethods.includes(method) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/20"
              onClick={() => onMethodToggle(method)}
            >
              {method}
            </Badge>
          ))}
        </div>
      </div>

      {/* Model Filters */}
      <div>
        <h4 className="text-sm font-medium mb-2">Modell:</h4>
        <div className="flex flex-wrap gap-2">
          {availableModels.map(model => (
            <Badge
              key={model}
              variant={selectedModels.includes(model) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/20"
              onClick={() => onModelToggle(model)}
            >
              {model}
            </Badge>
          ))}
        </div>
      </div>

      {/* Filter Summary and Clear */}
      <div className="flex items-center justify-between pt-2 border-t">
        <div className="text-sm text-gray-600">
          Visar {filteredCount} av {totalCount} behandlingar
        </div>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4 mr-1" />
            Rensa filter
          </Button>
        )}
      </div>
    </div>
  );
}