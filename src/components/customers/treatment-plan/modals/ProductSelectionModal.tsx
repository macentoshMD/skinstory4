import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DetailedProductRecommendation, ProductPackage } from '@/types/consultation';
import { ProductFilterBar } from '../products/ProductFilterBar';
import { EnhancedProductCard } from '../products/EnhancedProductCard';
import { ProductPackageCard } from '../products/ProductPackageCard';

interface ProductSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableProducts: DetailedProductRecommendation[];
  availablePackages?: ProductPackage[];
  onProductSelect: (product: DetailedProductRecommendation) => void;
  onPackageSelect?: (pkg: ProductPackage) => void;
  selectedProblems?: string[];
}

export function ProductSelectionModal({ 
  isOpen, 
  onClose, 
  availableProducts, 
  availablePackages = [],
  onProductSelect,
  onPackageSelect,
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

  // Combine products and packages for unified filtering
  const allItems = [
    ...availableProducts.map(p => ({ ...p, itemType: 'product' as const })),
    ...availablePackages.map(p => ({ ...p, itemType: 'package' as const, type: 'package' }))
  ];

  // Get available filter options from all items
  const availableProblems = [...new Set(allItems.flatMap(item => item.problems))];
  const availableBrands = [...new Set(allItems.map(item => item.brand))];
  const availableTypes = [...new Set(allItems.map(item => item.type))];

  // Unified filter logic for all items
  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProblems = selectedProblemFilters.length === 0 || 
                           selectedProblemFilters.some(problem => item.problems.includes(problem));
    
    const matchesBrands = selectedBrands.length === 0 || selectedBrands.includes(item.brand);
    const matchesTypes = selectedTypes.length === 0 || selectedTypes.includes(item.type);
    
    return matchesSearch && matchesProblems && matchesBrands && matchesTypes;
  });

  // Separate filtered items back into products and packages for rendering
  const filteredProducts = filteredItems.filter(item => item.itemType === 'product') as (DetailedProductRecommendation & { itemType: 'product' })[];
  const filteredPackages = filteredItems.filter(item => item.itemType === 'package') as (ProductPackage & { itemType: 'package' })[];

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
            Visar {filteredItems.length} av {allItems.length} produkter och paket
            {filteredProducts.length > 0 && filteredPackages.length > 0 && (
              <span className="ml-2 text-gray-500">
                ({filteredProducts.length} produkter, {filteredPackages.length} paket)
              </span>
            )}
          </div>

          {/* Unified Products/Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {filteredItems.map(item => (
              item.itemType === 'package' ? (
                <ProductPackageCard
                  key={item.id}
                  package={item as ProductPackage}
                  onSelect={() => onPackageSelect?.(item as ProductPackage)}
                />
              ) : (
                <EnhancedProductCard
                  key={item.id}
                  product={item as DetailedProductRecommendation}
                  onSelect={() => onProductSelect(item as DetailedProductRecommendation)}
                />
              )
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Inga produkter eller paket hittades med de valda filtren
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
