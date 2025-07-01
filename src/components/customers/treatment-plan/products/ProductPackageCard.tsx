import { Badge } from '@/components/ui/badge';
import { ProductPackage } from '@/types/consultation';
import { DurationIndicator } from './DurationIndicator';
interface ProductPackageCardProps {
  package: ProductPackage;
  onSelect: () => void;
}
export function ProductPackageCard({
  package: pkg,
  onSelect
}: ProductPackageCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'need':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'good':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'nice':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'need':
        return 'MÅSTE HA';
      case 'good':
        return 'BRA ATT HA';
      case 'nice':
        return 'TREVLIGT';
      default:
        return priority;
    }
  };
  const getBrandColor = (brand: string) => {
    const colors: {
      [key: string]: string;
    } = {
      'DAHL': 'bg-blue-500',
      'La Roche-Posay': 'bg-green-500',
      'SkinCeuticals': 'bg-purple-500',
      'The Ordinary': 'bg-orange-500',
      'CeraVe': 'bg-teal-500'
    };
    return colors[brand] || 'bg-gray-500';
  };
  const discountAmount = pkg.originalPrice && pkg.discountPercent ? pkg.originalPrice * (pkg.discountPercent / 100) : 0;
  
  return (
    <div className="bg-background border border-border rounded-lg p-4 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer group duration-200 h-full flex flex-col" onClick={onSelect}>
      {/* Package Image */}
      <div className={`w-full aspect-square rounded-lg mb-4 flex items-center justify-center text-white font-bold text-lg overflow-hidden ${getBrandColor(pkg.brand)}`}>
        {pkg.image ? (
          <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm">PAKET</span>
        )}
      </div>

      {/* Package Info - Flex grow to fill space */}
      <div className="space-y-3 flex-1 flex flex-col">
        {/* Brand and Package Badge */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-primary">{pkg.brand}</p>
          <Badge variant="outline" className="text-xs bg-accent text-accent-foreground">
            PAKET
          </Badge>
        </div>

        {/* Package Name */}
        <h3 className="font-semibold text-sm group-hover:text-primary line-clamp-2 min-h-[2.5rem]">
          {pkg.name}
        </h3>
        
        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2">
          {pkg.description}
        </p>

        {/* Duration */}
        <DurationIndicator duration={pkg.duration} costPerMonth={pkg.costPerMonth} />

        {/* Products in Package */}
        <div className="space-y-2 flex-1">
          <h4 className="text-xs font-medium text-foreground">Innehåller:</h4>
          <div className="space-y-1">
            {pkg.products.slice(0, 2).map((product, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground line-clamp-1">{product.name}</span>
                <span className="text-xs text-muted-foreground shrink-0">({product.size})</span>
              </div>
            ))}
            {pkg.products.length > 2 && (
              <div className="text-xs text-muted-foreground">
                +{pkg.products.length - 2} fler produkter
              </div>
            )}
          </div>
        </div>

        {/* Pricing - Always at bottom */}
        <div className="mt-auto pt-3 border-t border-border">
          <div className="space-y-2">
            {pkg.discountPercent && pkg.originalPrice && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground line-through">
                  {pkg.originalPrice} kr
                </span>
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  -{pkg.discountPercent}%
                </Badge>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="font-bold text-lg text-primary">
                {pkg.totalPrice} kr
              </div>
              {discountAmount > 0 && (
                <div className="text-xs text-green-600 dark:text-green-400">
                  Spara {Math.round(discountAmount)} kr
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}