import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';

interface TreatmentFilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
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

const PROBLEM_LABELS: { [key: string]: string } = {
  'acne': 'Akne',
  'rosacea': 'Rosacea',
  'pigment': 'Pigmentfläckar',
  'wrinkles': 'Rynkor',
  'scars': 'Ärr'
};

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
  const activeTags = [
    ...selectedProblems.map(p => ({ type: 'problem', value: p, label: PROBLEM_LABELS[p] || p })),
    ...selectedMethods.map(m => ({ type: 'method', value: m, label: m })),
    ...selectedModels.map(m => ({ type: 'model', value: m, label: m }))
  ];

  const handleProblemSelect = (value: string) => {
    if (value === 'all') {
      selectedProblems.forEach(problem => onProblemToggle(problem));
    } else {
      onProblemToggle(value);
    }
  };

  const handleMethodSelect = (value: string) => {
    if (value === 'all') {
      selectedMethods.forEach(method => onMethodToggle(method));
    } else {
      onMethodToggle(value);
    }
  };

  const handleModelSelect = (value: string) => {
    if (value === 'all') {
      selectedModels.forEach(model => onModelToggle(model));
    } else {
      onModelToggle(value);
    }
  };

  const getSelectedProblemsLabel = () => {
    if (selectedProblems.length === 0) return 'Välj problem';
    if (selectedProblems.length === 1) return PROBLEM_LABELS[selectedProblems[0]] || selectedProblems[0];
    return `${selectedProblems.length} problem valda`;
  };

  const getSelectedMethodsLabel = () => {
    if (selectedMethods.length === 0) return 'Välj metod';
    if (selectedMethods.length === 1) return selectedMethods[0];
    return `${selectedMethods.length} metoder valda`;
  };

  const getSelectedModelsLabel = () => {
    if (selectedModels.length === 0) return 'Välj modell';
    if (selectedModels.length === 1) return selectedModels[0];
    return `${selectedModels.length} modeller valda`;
  };

  return (
    <div className="space-y-6 bg-background">
      {/* Search and Filter Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Sök behandlingar..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-10 bg-background border-border"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-3">
          {/* Problem Filter */}
          <Select onValueChange={handleProblemSelect}>
            <SelectTrigger className="w-[160px] h-10 bg-background border-border">
              <SelectValue placeholder={getSelectedProblemsLabel()} />
            </SelectTrigger>
            <SelectContent>
              {availableProblems.map(problem => (
                <SelectItem key={problem} value={problem}>
                  {PROBLEM_LABELS[problem] || problem}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Method Filter */}
          <Select onValueChange={handleMethodSelect}>
            <SelectTrigger className="w-[160px] h-10 bg-background border-border">
              <SelectValue placeholder={getSelectedMethodsLabel()} />
            </SelectTrigger>
            <SelectContent>
              {availableMethods.map(method => (
                <SelectItem key={method} value={method}>
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Model Filter */}
          <Select onValueChange={handleModelSelect}>
            <SelectTrigger className="w-[160px] h-10 bg-background border-border">
              <SelectValue placeholder={getSelectedModelsLabel()} />
            </SelectTrigger>
            <SelectContent>
              {availableModels.map(model => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear Filters Button */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={onClearFilters}
            className="h-10 px-4"
          >
            Rensa filter
          </Button>
        </div>
      </div>

      {/* Active Filter Tags */}
      {activeTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeTags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
              onClick={() => {
                if (tag.type === 'problem') onProblemToggle(tag.value);
                else if (tag.type === 'method') onMethodToggle(tag.value);
                else if (tag.type === 'model') onModelToggle(tag.value);
              }}
            >
              {tag.label}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
        </div>
      )}

      {/* Results Counter */}
      <div className="text-sm text-muted-foreground">
        <span className="font-medium">Treatments found - {filteredCount}</span>
        <span className="ml-1">av {totalCount} totalt</span>
      </div>
    </div>
  );
}