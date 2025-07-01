
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ProductPackage } from '@/types/consultation';
import { PackageInfoCard } from './package-config/PackageInfoCard';
import { ProductConfigurationSection } from './package-config/ProductConfigurationSection';
import { PriceSummaryCard } from './package-config/PriceSummaryCard';

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
      selectedPeelingkorn?: string;
    };
  }>({});

  useEffect(() => {
    if (pkg) {
      // Initialize with default configurations
      const defaultConfigs: typeof selectedConfigurations = {};
      pkg.products.forEach(product => {
        defaultConfigs[product.productId] = {
          selectedSize: product.size,
          selectedStrength: product.attributes?.strength || 'Level 2',
          selectedPeelingkorn: product.attributes?.peelingkorn ? 'yes' : 'no'
        };
      });
      setSelectedConfigurations(defaultConfigs);
    }
  }, [pkg]);

  if (!pkg) return null;

  const calculateFinalPrice = () => {
    // For now, return the original price. In a real implementation,
    // you would calculate based on size changes and other modifications
    return pkg.totalPrice;
  };

  const finalPrice = calculateFinalPrice();

  const handleConfigurationChange = (productId: string, field: string, value: string) => {
    setSelectedConfigurations(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value
      }
    }));
  };

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
          <PackageInfoCard package={pkg} />

          {/* Products Configuration */}
          <ProductConfigurationSection
            package={pkg}
            selectedConfigurations={selectedConfigurations}
            onConfigurationChange={handleConfigurationChange}
          />

          {/* Price Summary */}
          <PriceSummaryCard package={pkg} finalPrice={finalPrice} />
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
