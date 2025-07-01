
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
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
  totalCount: number;
  filteredCount: number;
}

const PROBLEM_LABELS: { [key: string]: string } = {
  'acne': 'Akne',
  'rosacea': 'Rosacea',
  'pigmentflackar': 'Pigmentfläckar',
  'anti-age': 'Anti-age',
  'känslig-hud': 'Känslig hud'
};

const TYPE_LABELS: { [key: string]: string } = {
  'package': 'Paket',
  'cleanser': 'Rengöring',
  'moisturizer': 'Återfuktande',
  'serum': 'Serum',
  'treatment': 'Mask',
  'toner': 'Ansiktsvatten',
  'sunscreen': 'Solskydd'
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
  onClearFilters,
  totalCount,
  filteredCount
}: ProductFilterBarProps) {
  const hasActiveFilters = selectedProblems.length > 0 || selectedBrands.length > 0 || selectedTypes.length > 0;

  const handleProblemSelect = (value: string) => {
    if (value === 'all') {
      selectedProblems.forEach(problem => onProblemToggle(problem));
    } else {
      onProblemToggle(value);
    }
  };

  const handleBrandSelect = (value: string) => {
    if (value === 'all') {
      selectedBrands.forEach(brand => onBrandToggle(brand));
    } else {
      onBrandToggle(value);
    }
  };

  const handleTypeSelect = (value: string) => {
    if (value === 'all') {
      selectedTypes.forEach(productType => onTypeToggle(productType));
    } else {
      onTypeToggle(value);
    }
  };

  const getSelectedProblemsLabel = () => {
    if (selectedProblems.length === 0) return 'Välj problem';
    if (selectedProblems.length === 1) return PROBLEM_LABELS[selectedProblems[0]] || selectedProblems[0];
    return `${selectedProblems.length} problem valda`;
  };

  const getSelectedBrandsLabel = () => {
    if (selectedBrands.length === 0) return 'Välj märke';
    if (selectedBrands.length === 1) return selectedBrands[0];
    return `${selectedBrands.length} märken valda`;
  };

  const getSelectedTypesLabel = () => {
    if (selectedTypes.length === 0) return 'Välj typ';
    if (selectedTypes.length === 1) return TYPE_LABELS[selectedTypes[0]] || selectedTypes[0];
    return `${selectedTypes.length} typer valda`;
  };

  return (
    <div className="space-y-6 bg-background">
      {/* Search and Filter Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Sök produkter och paket..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-10 bg-background border-border"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-3">
          {/* Problem Filter */}
          <Select onValueChange={handleProblemSelect}>
            <SelectTrigger className="w-40 h-10 bg-background border-border">
              <SelectValue placeholder={getSelectedProblemsLabel()} />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-50">
              <SelectItem value="all">Alla problem</SelectItem>
              {availableProblems.map(problem => (
                <SelectItem 
                  key={problem} 
                  value={problem}
                  className={`hover:bg-muted ${selectedProblems.includes(problem) ? 'bg-accent font-medium' : ''}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{PROBLEM_LABELS[problem] || problem}</span>
                    {selectedProblems.includes(problem) && (
                      <span className="ml-2 text-primary">✓</span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Brand Filter */}
          <Select onValueChange={handleBrandSelect}>
            <SelectTrigger className="w-40 h-10 bg-background border-border">
              <SelectValue placeholder={getSelectedBrandsLabel()} />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-50">
              <SelectItem value="all">Alla märken</SelectItem>
              {availableBrands.map(brand => (
                <SelectItem 
                  key={brand} 
                  value={brand}
                  className={`hover:bg-muted ${selectedBrands.includes(brand) ? 'bg-accent font-medium' : ''}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{brand}</span>
                    {selectedBrands.includes(brand) && (
                      <span className="ml-2 text-primary">✓</span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Type Filter */}
          <Select onValueChange={handleTypeSelect}>
            <SelectTrigger className="w-40 h-10 bg-background border-border">
              <SelectValue placeholder={getSelectedTypesLabel()} />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-50">
              <SelectItem value="all">Alla typer</SelectItem>
              {availableTypes.map(productType => (
                <SelectItem 
                  key={productType} 
                  value={productType}
                  className={`hover:bg-muted ${selectedTypes.includes(productType) ? 'bg-accent font-medium' : ''}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{TYPE_LABELS[productType] || productType}</span>
                    {selectedTypes.includes(productType) && (
                      <span className="ml-2 text-primary">✓</span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button variant="outline" onClick={onClearFilters} size="sm" className="h-10">
              Rensa filter
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedProblems.map(problem => (
            <Badge key={problem} variant="secondary" className="flex items-center gap-1 px-3 py-1">
              {PROBLEM_LABELS[problem] || problem}
              <X 
                className="h-3 w-3 cursor-pointer hover:text-destructive" 
                onClick={() => onProblemToggle(problem)}
              />
            </Badge>
          ))}
          {selectedBrands.map(brand => (
            <Badge key={brand} variant="secondary" className="flex items-center gap-1 px-3 py-1">
              {brand}
              <X 
                className="h-3 w-3 cursor-pointer hover:text-destructive" 
                onClick={() => onBrandToggle(brand)}
              />
            </Badge>
          ))}
          {selectedTypes.map(productType => (
            <Badge key={productType} variant="secondary" className="flex items-center gap-1 px-3 py-1">
              {TYPE_LABELS[productType] || productType}
              <X 
                className="h-3 w-3 cursor-pointer hover:text-destructive" 
                onClick={() => onTypeToggle(productType)}
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Products Found Counter */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Products found - {filteredCount}</span>
          {filteredCount !== totalCount && (
            <span className="ml-2">av {totalCount} totalt</span>
          )}
        </div>
      </div>
    </div>
  );
}
