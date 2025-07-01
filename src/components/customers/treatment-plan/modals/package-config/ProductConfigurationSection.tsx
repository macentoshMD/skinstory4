import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductPackage } from '@/types/consultation';

interface ProductConfigurationSectionProps {
  package: ProductPackage;
  selectedConfigurations: {
    [productId: string]: {
      selectedSize?: string;
      selectedStrength?: string;
      selectedPeelingkorn?: string;
    };
  };
  onConfigurationChange: (productId: string, field: string, value: string) => void;
}

export function ProductConfigurationSection({ 
  package: pkg, 
  selectedConfigurations, 
  onConfigurationChange 
}: ProductConfigurationSectionProps) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Konfigurera produkter i paketet:</h4>
      {pkg.products.map((product) => (
        <div key={product.productId} className="border rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h5 className="font-medium">{product.name}</h5>
              <p className="text-sm text-gray-600">Antal: {product.quantity}</p>
              <p className="text-xs text-gray-500">Räcker: {product.duration}</p>
            </div>
          </div>

          {/* Configuration Options */}
          <div className="space-y-4">
            {/* Strength Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Välj styrka</label>
              <Select 
                value={selectedConfigurations[product.productId]?.selectedStrength || product.attributes?.strength || "Level 2"}
                onValueChange={(value) => onConfigurationChange(product.productId, 'selectedStrength', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Välj styrka" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="Level 1">Level 1 (Mild)</SelectItem>
                  <SelectItem value="Level 2">Level 2 (Standard)</SelectItem>
                  <SelectItem value="Level 3">Level 3 (Stark)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Size Selection for Mask and Day Cream */}
            {(product.name.includes('Mask') || product.name.includes('Day Cream')) && (
              <div>
                <label className="block text-sm font-medium mb-2">Välj storlek</label>
                <Select 
                  value={selectedConfigurations[product.productId]?.selectedSize || product.size}
                  onValueChange={(value) => onConfigurationChange(product.productId, 'selectedSize', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Välj storlek" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-50">
                    <SelectItem value="60ml">60ml</SelectItem>
                    <SelectItem value="120ml">120ml</SelectItem>
                    {product.name.includes('Day Cream') && (
                      <SelectItem value="240ml">240ml</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Peelingkorn Selection for Cleanser */}
            {product.name.includes('Cleanser') && (
              <div>
                <label className="block text-sm font-medium mb-2">Peelingkorn</label>
                <Select 
                  value={selectedConfigurations[product.productId]?.selectedPeelingkorn || (product.attributes?.peelingkorn ? 'yes' : 'no')}
                  onValueChange={(value) => onConfigurationChange(product.productId, 'selectedPeelingkorn', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Välj peelingkorn" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-50">
                    <SelectItem value="no">Utan peelingkorn</SelectItem>
                    <SelectItem value="yes">Med peelingkorn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}