
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
      className="border rounded-lg p-4 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group transform hover:scale-105 duration-200"
      onClick={onSelect}
    >
      {/* Product Image Placeholder */}
      <div className={`w-full h-32 rounded-lg mb-3 flex items-center justify-center text-white font-bold text-lg ${getBrandColor(product.brand)}`}>
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span>{product.brand}</span>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-sm group-hover:text-blue-600 line-clamp-2">{product.name}</h3>
          <Badge className={getPriorityColor(product.priority)}>
            {getPriorityText(product.priority)}
          </Badge>
        </div>

        <p className="text-xs text-gray-600 font-medium">{product.brand}</p>
        
        <p className="text-xs text-gray-700 line-clamp-2">{product.description}</p>

        {/* Usage and Type */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">{product.usage}</span>
          <Badge variant="outline" className="text-xs">
            {product.type}
          </Badge>
        </div>

        {/* Duration */}
        <DurationIndicator 
          duration={product.duration} 
          costPerMonth={product.costPerMonth}
        />

        {/* Pricing */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="space-y-1">
            <div className="font-bold text-lg text-blue-600">
              från {basePrice} kr
            </div>
            {product.sizes && product.sizes.length > 1 && (
              <div className="text-xs text-gray-500">
                {product.sizes.length} storlekar
              </div>
            )}
          </div>
          
          {/* Available Options Indicators */}
          <div className="flex flex-col items-end space-y-1">
            {product.availableOptions.strength && (
              <Badge variant="secondary" className="text-xs">
                {product.availableOptions.strength.length} styrkor
              </Badge>
            )}
            {product.availableOptions.spf && (
              <Badge variant="secondary" className="text-xs">
                SPF tillgänglig
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
