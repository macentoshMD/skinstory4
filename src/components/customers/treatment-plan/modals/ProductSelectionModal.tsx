
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DetailedProductRecommendation } from '@/types/consultation';

interface ProductSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableProducts: DetailedProductRecommendation[];
  onProductSelect: (product: DetailedProductRecommendation) => void;
}

export function ProductSelectionModal({ 
  isOpen, 
  onClose, 
  availableProducts, 
  onProductSelect 
}: ProductSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredProducts = availableProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = brandFilter === 'all' || product.brand === brandFilter;
    const matchesType = typeFilter === 'all' || product.type === typeFilter;
    
    return matchesSearch && matchesBrand && matchesType;
  });

  const brands = [...new Set(availableProducts.map(p => p.brand))];
  const types = [...new Set(availableProducts.map(p => p.type))];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'essential': return 'bg-red-100 text-red-800 border-red-200';
      case 'recommended': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'optional': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'essential': return 'Nödvändig';
      case 'recommended': return 'Rekommenderad';
      case 'optional': return 'Valfri';
      default: return priority;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Välj Produkter</DialogTitle>
        </DialogHeader>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Sök produkter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={brandFilter} onValueChange={setBrandFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Märke" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla märken</SelectItem>
              {brands.map(brand => (
                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Typ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla typer</SelectItem>
              {types.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="border rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => onProductSelect(product)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-sm group-hover:text-blue-600">{product.name}</h3>
                <Badge className={getPriorityColor(product.priority)}>
                  {getPriorityText(product.priority)}
                </Badge>
              </div>
              <p className="text-xs text-gray-600 mb-1">{product.brand}</p>
              <p className="text-xs text-gray-700 mb-3 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{product.price} kr</span>
                <span className="text-xs text-gray-500">{product.usage}</span>
              </div>
            </div>
          ))}
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
