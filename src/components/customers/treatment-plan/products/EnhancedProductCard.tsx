
import { Badge } from '@/components/ui/badge';
import { DetailedProductRecommendation } from '@/types/consultation';
import { DurationIndicator } from './DurationIndicator';

interface EnhancedProductCardProps {
  product: DetailedProductRecommendation;
  onSelect: () => void;
}

export function EnhancedProductCard({ product, onSelect }: EnhancedProductCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'need': return 'bg-red-100 text-red-800 border-red-200';
      case 'good': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'nice': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'need': return 'MÅSTE HA';
      case 'good': return 'BRA ATT HA';
      case 'nice': return 'TREVLIGT';
      default: return priority;
    }
  };

  const getBrandColor = (brand: string) => {
    const colors: { [key: string]: string } = {
      'DAHL': 'bg-blue-500',
      'La Roche-Posay': 'bg-green-500',
      'SkinCeuticals': 'bg-purple-500',
      'The Ordinary': 'bg-orange-500',
      'CeraVe': 'bg-teal-500'
    };
    return colors[brand] || 'bg-gray-500';
  };

  const basePrice = product.sizes?.[0]?.price || product.price;

  return (
    <div
      className="bg-background border border-border rounded-lg p-4 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer group duration-200 h-full flex flex-col"
      onClick={onSelect}
    >
      {/* Product Image */}
      <div className={`w-full aspect-square rounded-lg mb-4 flex items-center justify-center text-white font-bold text-lg overflow-hidden ${getBrandColor(product.brand)}`}>
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm">{product.brand}</span>
        )}
      </div>

      {/* Product Info - Flex grow to fill space */}
      <div className="space-y-3 flex-1 flex flex-col">
        {/* Brand and Priority */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-primary">{product.brand}</p>
          <Badge className={getPriorityColor(product.priority)} variant="outline">
            {getPriorityText(product.priority)}
          </Badge>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-sm group-hover:text-primary line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-3 flex-1">
          {product.description}
        </p>

        {/* Type Badge */}
        <div className="flex justify-start">
          <Badge variant="secondary" className="text-xs">
            {product.type}
          </Badge>
        </div>

        {/* Duration */}
        <DurationIndicator 
          duration={product.duration} 
          costPerMonth={product.costPerMonth}
        />

        {/* Pricing - Always at bottom */}
        <div className="mt-auto pt-3 border-t border-border">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <div className="font-bold text-lg text-primary">
                från {basePrice} kr
              </div>
              {product.sizes && product.sizes.length > 1 && (
                <div className="text-xs text-muted-foreground">
                  {product.sizes.length} storlekar
                </div>
              )}
            </div>
            
            {/* Available Options Indicators */}
            <div className="flex flex-col items-end space-y-1">
              {product.availableOptions.strength && (
                <Badge variant="outline" className="text-xs">
                  {product.availableOptions.strength.length} styrkor
                </Badge>
              )}
              {product.availableOptions.spf && (
                <Badge variant="outline" className="text-xs">
                  SPF
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
