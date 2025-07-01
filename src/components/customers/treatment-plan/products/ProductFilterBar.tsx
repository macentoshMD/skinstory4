
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
      selectedTypes.forEach(type => onTypeToggle(type));
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
    <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg border">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Sök produkter..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-white"
        />
      </div>

      {/* Filter Header */}
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

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Problem Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Problem</label>
          <Select onValueChange={handleProblemSelect}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder={getSelectedProblemsLabel()} />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              <SelectItem value="all">Alla problem</SelectItem>
              {availableProblems.map(problem => (
                <SelectItem 
                  key={problem} 
                  value={problem}
                  className={selectedProblems.includes(problem) ? 'bg-blue-50 font-medium' : ''}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{PROBLEM_LABELS[problem] || problem}</span>
                    {selectedProblems.includes(problem) && (
                      <span className="ml-2 text-blue-600">✓</span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Brand Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Märke</label>
          <Select onValueChange={handleBrandSelect}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder={getSelectedBrandsLabel()} />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              <SelectItem value="all">Alla märken</SelectItem>
              {availableBrands.map(brand => (
                <SelectItem 
                  key={brand} 
                  value={brand}
                  className={selectedBrands.includes(brand) ? 'bg-blue-50 font-medium' : ''}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{brand}</span>
                    {selectedBrands.includes(brand) && (
                      <span className="ml-2 text-blue-600">✓</span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Typ</label>
          <Select onValueChange={handleTypeSelect}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder={getSelectedTypesLabel()} />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              <SelectItem value="all">Alla typer</SelectItem>
              {availableTypes.map(productType => (
                <SelectItem 
                  key={productType} 
                  value={productType}
                  className={selectedTypes.includes(productType) ? 'bg-blue-50 font-medium' : ''}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{TYPE_LABELS[productType] || productType}</span>
                    {selectedTypes.includes(productType) && (
                      <span className="ml-2 text-blue-600">✓</span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          <span className="text-xs text-gray-600">Aktiva filter:</span>
          {selectedProblems.map(problem => (
            <span key={problem} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {PROBLEM_LABELS[problem] || problem}
              <button
                onClick={() => onProblemToggle(problem)}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {selectedBrands.map(brand => (
            <span key={brand} className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              {brand}
              <button
                onClick={() => onBrandToggle(brand)}
                className="hover:bg-green-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {selectedTypes.map(productType => (
            <span key={productType} className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              {TYPE_LABELS[productType] || productType}
              <button
                onClick={() => onTypeToggle(productType))
                className="hover:bg-purple-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
