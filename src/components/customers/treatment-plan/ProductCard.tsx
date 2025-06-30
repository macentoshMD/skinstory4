
import { Badge } from '@/components/ui/badge';
import { ProductRecommendation } from '@/types/consultation';

interface ProductCardProps {
  product: ProductRecommendation;
  isSelected: boolean;
  onToggle: () => void;
}

export function ProductCard({ product, isSelected, onToggle }: ProductCardProps) {
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
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
        isSelected ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h5 className="font-medium">{product.name}</h5>
            <Badge className={getPriorityColor(product.priority)}>
              {getPriorityText(product.priority)}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
          <p className="text-sm text-gray-700">{product.description}</p>
          <p className="text-xs text-gray-500 mt-1">{product.usage}</p>
        </div>
        <div className="text-right">
          <span className="font-medium">{product.price} kr</span>
        </div>
      </div>
    </div>
  );
}
