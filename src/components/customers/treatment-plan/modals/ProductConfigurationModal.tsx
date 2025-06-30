
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { DetailedProductRecommendation } from '@/types/consultation';

interface ProductConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: DetailedProductRecommendation | null;
  onConfirm: (configuredProduct: DetailedProductRecommendation) => void;
}

export function ProductConfigurationModal({ 
  isOpen, 
  onClose, 
  product, 
  onConfirm 
}: ProductConfigurationModalProps) {
  const [selectedStrength, setSelectedStrength] = useState<string>('');
  const [selectedSPF, setSelectedSPF] = useState<number | undefined>();
  const [withMicrobeads, setWithMicrobeads] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      setSelectedStrength(product.availableOptions.strength?.[0] || '');
      setSelectedSPF(product.availableOptions.spf?.[0]);
      setWithMicrobeads(false);
    }
  }, [product]);

  if (!product) return null;

  const calculateFinalPrice = () => {
    let price = product.price;
    if (selectedStrength && product.availableOptions.strength) {
      const strengthIndex = product.availableOptions.strength.indexOf(selectedStrength);
      price += strengthIndex * 50; // Example price modifier
    }
    if (selectedSPF && selectedSPF > 30) {
      price += 100; // Higher SPF costs more
    }
    if (withMicrobeads) {
      price += 150; // Microbeads add cost
    }
    return price;
  };

  const finalPrice = calculateFinalPrice();

  const handleConfirm = () => {
    const configuredProduct: DetailedProductRecommendation = {
      ...product,
      configuration: {
        selectedStrength: selectedStrength || undefined,
        selectedSPF,
        withMicrobeads,
        finalPrice
      }
    };
    onConfirm(configuredProduct);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Konfigurera Produkt</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Info */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{product.name}</h3>
              <Badge>{product.brand}</Badge>
            </div>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-xs text-gray-500 mt-1">{product.usage}</p>
          </div>

          {/* Strength Selection */}
          {product.availableOptions.strength && product.availableOptions.strength.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Styrka</label>
              <div className="grid grid-cols-2 gap-2">
                {product.availableOptions.strength.map(strength => (
                  <button
                    key={strength}
                    onClick={() => setSelectedStrength(strength)}
                    className={`p-3 border rounded-lg text-sm transition-colors ${
                      selectedStrength === strength
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {strength}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SPF Selection */}
          {product.availableOptions.spf && product.availableOptions.spf.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">SPF</label>
              <div className="grid grid-cols-3 gap-2">
                {product.availableOptions.spf.map(spf => (
                  <button
                    key={spf}
                    onClick={() => setSelectedSPF(spf)}
                    className={`p-3 border rounded-lg text-sm transition-colors ${
                      selectedSPF === spf
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    SPF {spf}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Microbeads Option */}
          {product.availableOptions.microbeads && (
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Med mikrobeads</label>
                <p className="text-xs text-gray-500">Exfolierande mikrobeads för djuprengöring</p>
              </div>
              <Switch
                checked={withMicrobeads}
                onCheckedChange={setWithMicrobeads}
              />
            </div>
          )}

          {/* Price Summary */}
          <div className="border-t pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Grundpris:</span>
                <span>{product.price} kr</span>
              </div>
              {selectedStrength && product.availableOptions.strength && selectedStrength !== product.availableOptions.strength[0] && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Styrka ({selectedStrength}):</span>
                  <span>+{product.availableOptions.strength.indexOf(selectedStrength) * 50} kr</span>
                </div>
              )}
              {selectedSPF && selectedSPF > 30 && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Hög SPF:</span>
                  <span>+100 kr</span>
                </div>
              )}
              {withMicrobeads && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Mikrobeads:</span>
                  <span>+150 kr</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-medium">Totalt:</span>
                <span className="text-lg font-bold">{finalPrice} kr</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Avbryt
          </Button>
          <Button onClick={handleConfirm}>
            Bekräfta
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
