
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductPackage } from '@/types/consultation';
import { DurationIndicator } from '../products/DurationIndicator';

interface PackageConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  package: ProductPackage | null;
  onConfirm: (configuredPackage: ProductPackage) => void;
}

export function PackageConfigurationModal({ 
  isOpen, 
  onClose, 
  package: pkg, 
  onConfirm 
}: PackageConfigurationModalProps) {
  const [selectedConfigurations, setSelectedConfigurations] = useState<{
    [productId: string]: {
      selectedSize?: string;
      selectedStrength?: string;
      selectedAdditives?: string[];
    };
  }>({});

  useEffect(() => {
    if (pkg) {
      // Initialize with default configurations
      const defaultConfigs: typeof selectedConfigurations = {};
      pkg.products.forEach(product => {
        defaultConfigs[product.productId] = {
          selectedSize: product.size,
          selectedStrength: product.attributes?.strength,
          selectedAdditives: product.attributes?.additives || []
        };
      });
      setSelectedConfigurations(defaultConfigs);
    }
  }, [pkg]);

  if (!pkg) return null;

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

  const calculateFinalPrice = () => {
    // For now, return the original price. In a real implementation,
    // you would calculate based on size changes and other modifications
    return pkg.totalPrice;
  };

  const finalPrice = calculateFinalPrice();

  const handleConfirm = () => {
    const configuredPackage: ProductPackage = {
      ...pkg,
      configuration: {
        selectedProducts: selectedConfigurations,
        finalPrice
      }
    };
    onConfirm(configuredPackage);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Konfigurera Produktpaket</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Package Info */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex gap-4">
              <div className={`w-20 h-20 rounded-lg flex items-center justify-center text-white font-bold ${getBrandColor(pkg.brand)}`}>
                {pkg.image ? (
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-sm">PAKET</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-lg">{pkg.name}</h3>
                  <Badge className={getPriorityColor(pkg.priority)}>
                    {getPriorityText(pkg.priority)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{pkg.description}</p>
                <p className="text-xs text-gray-500 mb-2">{pkg.brand}</p>
                <DurationIndicator 
                  duration={pkg.duration} 
                  costPerMonth={pkg.costPerMonth}
                />
              </div>
            </div>
          </div>

          {/* Products Configuration */}
          <div className="space-y-4">
            <h4 className="font-medium">Konfigurera produkter i paketet:</h4>
            {pkg.products.map((product, index) => (
              <div key={product.productId} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h5 className="font-medium">{product.name}</h5>
                    <p className="text-sm text-gray-600">Antal: {product.quantity}</p>
                    <p className="text-xs text-gray-500">Räcker: {product.duration}</p>
                  </div>
                </div>

                {/* Strength Selection - Primary focus */}
                <div className="space-y-4">
                  {product.attributes?.strength && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Välj styrka</label>
                      <Select 
                        value={selectedConfigurations[product.productId]?.selectedStrength || product.attributes.strength}
                        onValueChange={(value) => {
                          setSelectedConfigurations(prev => ({
                            ...prev,
                            [product.productId]: {
                              ...prev[product.productId],
                              selectedStrength: value
                            }
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Välj styrka" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Level 1">Level 1 (Mild)</SelectItem>
                          <SelectItem value="Level 2">Level 2 (Standard)</SelectItem>
                          <SelectItem value="Level 3">Level 3 (Stark)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {!product.attributes?.strength && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Välj styrka</label>
                      <Select 
                        value={selectedConfigurations[product.productId]?.selectedStrength || "Level 2"}
                        onValueChange={(value) => {
                          setSelectedConfigurations(prev => ({
                            ...prev,
                            [product.productId]: {
                              ...prev[product.productId],
                              selectedStrength: value
                            }
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Välj styrka" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Level 1">Level 1 (Mild)</SelectItem>
                          <SelectItem value="Level 2">Level 2 (Standard)</SelectItem>
                          <SelectItem value="Level 3">Level 3 (Stark)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="border-t pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Paketpris:</span>
                <span>{pkg.totalPrice} kr</span>
              </div>
              
              {pkg.originalPrice && pkg.discountPercent && (
                <>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Ordinarie pris:</span>
                    <span className="line-through">{pkg.originalPrice} kr</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Rabatt ({pkg.discountPercent}%):</span>
                    <span>-{Math.round(pkg.originalPrice * (pkg.discountPercent / 100))} kr</span>
                  </div>
                </>
              )}
              
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-medium">Totalt:</span>
                <span className="text-xl font-bold text-blue-600">{finalPrice} kr</span>
              </div>
              
              <div className="text-sm text-gray-600 text-right">
                ({Math.round(pkg.costPerMonth)} kr/månad)
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Avbryt
          </Button>
          <Button onClick={handleConfirm}>
            Bekräfta paket
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
