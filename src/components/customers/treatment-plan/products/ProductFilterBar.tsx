
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, X } from 'lucide-react';

interface ProductFilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedProblems: string[];
  onProblemToggle: (problem: string) => void;
  selectedBrands: string[];
  onBrandToggle: (brand: string) => void;
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
  availableProblems: string[];
  availableBrands: string[];
  availableTypes: string[];
  onClearFilters: () => void;
}

const PROBLEM_LABELS: { [key: string]: string } = {
  'acne': 'Akne',
  'rosacea': 'Rosacea',
  'pigmentflackar': 'Pigmentfläckar',
  'anti-age': 'Anti-age',
  'känslig-hud': 'Känslig hud'
};

const TYPE_LABELS: { [key: string]: string } = {
  'cleanser': 'Rengöring',
  'serum': 'Serum',
  'moisturizer': 'Fuktkräm',
  'sunscreen': 'Solskydd',
  'treatment': 'Behandling',
  'package': 'Paket'
};

export function ProductFilterBar({
  searchTerm,
  onSearchChange,
  selectedProblems,
  onProblemToggle,
  selectedBrands,
  onBrandToggle,
  selectedTypes,
  onTypeToggle,
  availableProblems,
  availableBrands,
  availableTypes,
  onClearFilters
}: ProductFilterBarProps) {
  const hasActiveFilters = selectedProblems.length > 0 || selectedBrands.length > 0 || selectedTypes.length > 0;

  return (
    <div className="space-y-4 mb-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Sök produkter..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter:</span>
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

      {/* Problem Filter */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Problem</h4>
        <div className="flex flex-wrap gap-2">
          {availableProblems.map(problem => (
            <Badge
              key={problem}
              variant={selectedProblems.includes(problem) ? "default" : "outline"}
              className="cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={() => onProblemToggle(problem)}
            >
              {PROBLEM_LABELS[problem] || problem}
              {selectedProblems.includes(problem) && (
                <span className="ml-1 text-xs">✓</span>
              )}
            </Badge>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Märke</h4>
        <div className="flex flex-wrap gap-2">
          {availableBrands.map(brand => (
            <Badge
              key={brand}
              variant={selectedBrands.includes(brand) ? "default" : "outline"}
              className="cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={() => onBrandToggle(brand)}
            >
              {brand}
              {selectedBrands.includes(brand) && (
                <span className="ml-1 text-xs">✓</span>
              )}
            </Badge>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Typ</h4>
        <div className="flex flex-wrap gap-2">
          {availableTypes.map(type => (
            <Badge
              key={type}
              variant={selectedTypes.includes(type) ? "default" : "outline"}
              className="cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={() => onTypeToggle(type)}
            >
              {TYPE_LABELS[type] || type}
              {selectedTypes.includes(type) && (
                <span className="ml-1 text-xs">✓</span>
              )}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
