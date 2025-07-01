
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DetailedProductRecommendation } from '@/types/consultation';
import { ProductFilterBar } from '../products/ProductFilterBar';
import { EnhancedProductCard } from '../products/EnhancedProductCard';

interface ProductSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableProducts: DetailedProductRecommendation[];
  onProductSelect: (product: DetailedProductRecommendation) => void;
  selectedProblems?: string[];
}

export function ProductSelectionModal({ 
  isOpen, 
  onClose, 
  availableProducts, 
  onProductSelect,
  selectedProblems = []
}: ProductSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProblemFilters, setSelectedProblemFilters] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Auto-set problem filters based on diagnosis
  useEffect(() => {
    if (selectedProblems.length > 0) {
      setSelectedProblemFilters(selectedProblems);
    }
  }, [selectedProblems]);

  const availableProblems = [...new Set(availableProducts.flatMap(p => p.problems))];
  const availableBrands = [...new Set(availableProducts.map(p => p.brand))];
  const availableTypes = [...new Set(availableProducts.map(p => p.type))];

  const filteredProducts = availableProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProblems = selectedProblemFilters.length === 0 || 
                           selectedProblemFilters.some(problem => product.problems.includes(problem));
    
    const matchesBrands = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesTypes = selectedTypes.length === 0 || selectedTypes.includes(product.type);
    
    return matchesSearch && matchesProblems && matchesBrands && matchesTypes;
  });

  const handleProblemToggle = (problem: string) => {
    setSelectedProblemFilters(prev => 
      prev.includes(problem) 
        ? prev.filter(p => p !== problem)
        : [...prev, problem]
    );
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedProblemFilters(selectedProblems); // Keep auto-set problems
    setSelectedBrands([]);
    setSelectedTypes([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Välj Produkter</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Enhanced Filter Bar */}
          <ProductFilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedProblems={selectedProblemFilters}
            onProblemToggle={handleProblemToggle}
            selectedBrands={selectedBrands}
            onBrandToggle={handleBrandToggle}
            selectedTypes={selectedTypes}
            onTypeToggle={handleTypeToggle}
            availableProblems={availableProblems}
            availableBrands={availableBrands}
            availableTypes={availableTypes}
            onClearFilters={handleClearFilters}
          />

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Visar {filteredProducts.length} av {availableProducts.length} produkter
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {filteredProducts.map(product => (
              <EnhancedProductCard
                key={product.id}
                product={product}
                onSelect={() => onProductSelect(product)}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Inga produkter hittades med de valda filtren
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Avbryt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
