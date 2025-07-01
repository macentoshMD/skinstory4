
import { Badge } from '@/components/ui/badge';
import { ProductPackage } from '@/types/consultation';
import { DurationIndicator } from './DurationIndicator';

interface ProductPackageCardProps {
  package: ProductPackage;
  onSelect: () => void;
}

export function ProductPackageCard({ package: pkg, onSelect }: ProductPackageCardProps) {
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

  const discountAmount = pkg.originalPrice && pkg.discountPercent 
    ? pkg.originalPrice * (pkg.discountPercent / 100)
    : 0;

  return (
    <div
      className="border rounded-lg p-4 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group transform hover:scale-105 duration-200"
      onClick={onSelect}
    >
      {/* Package Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-medium text-lg group-hover:text-blue-600">{pkg.name}</h3>
            <Badge className={getPriorityColor(pkg.priority)}>
              {getPriorityText(pkg.priority)}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 font-medium mb-1">{pkg.brand}</p>
          <p className="text-sm text-gray-700 mb-2">{pkg.description}</p>
          
          <DurationIndicator 
            duration={pkg.duration} 
            costPerMonth={pkg.costPerMonth}
          />
        </div>
      </div>

      {/* Package Image */}
      <div className={`w-full h-24 rounded-lg mb-3 flex items-center justify-center text-white font-bold ${getBrandColor(pkg.brand)}`}>
        {pkg.image ? (
          <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span className="text-sm">PAKET</span>
        )}
      </div>

      {/* Products in Package */}
      <div className="space-y-2 mb-3">
        <h4 className="text-sm font-medium text-gray-700">Innehåller:</h4>
        <div className="space-y-1">
          {pkg.products.slice(0, 3).map((product, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-gray-600">{product.name} ({product.size})</span>
              <span className="text-gray-500">{product.duration}</span>
            </div>
          ))}
          {pkg.products.length > 3 && (
            <div className="text-xs text-gray-500">
              +{pkg.products.length - 3} fler produkter
            </div>
          )}
        </div>
      </div>

      {/* Pricing */}
      <div className="flex items-center justify-between pt-2 border-t">
        <div className="space-y-1">
          {pkg.discountPercent && pkg.originalPrice && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 line-through">
                {pkg.originalPrice} kr
              </span>
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                -{pkg.discountPercent}%
              </Badge>
            </div>
          )}
          <div className="font-bold text-lg text-blue-600">
            {pkg.totalPrice} kr
          </div>
          {discountAmount > 0 && (
            <div className="text-xs text-green-600">
              Spara {Math.round(discountAmount)} kr
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
