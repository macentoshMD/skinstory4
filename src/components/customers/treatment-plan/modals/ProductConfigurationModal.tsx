import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedAdditives, setSelectedAdditives] = useState<string[]>([]);
  const [withMicrobeads, setWithMicrobeads] = useState<boolean>(false);
  const [withPeelingkorn, setWithPeelingkorn] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      setSelectedStrength(product.availableOptions.strength?.[0] || '');
      setSelectedSPF(product.availableOptions.spf?.[0]);
      setSelectedSize(product.sizes?.[0]?.size || '');
      setSelectedAdditives([]);
      setWithMicrobeads(false);
      setWithPeelingkorn(false);
    }
  }, [product]);

  if (!product) return null;

  const calculateFinalPrice = () => {
    // Base price from selected size or default price
    let price = product.sizes?.find(s => s.size === selectedSize)?.price || product.price;
    
    // Strength modifier
    if (selectedStrength && product.availableOptions.strength) {
      const strengthIndex = product.availableOptions.strength.indexOf(selectedStrength);
      price += strengthIndex * 50;
    }
    
    // SPF modifier
    if (selectedSPF && selectedSPF > 30) {
      price += 100;
    }
    
    // Microbeads modifier
    if (withMicrobeads) {
      price += 150;
    }
    
    // Peelingkorn modifier
    if (withPeelingkorn) {
      price += 100;
    }
    
    // Additives modifier
    price += selectedAdditives.length * 75;
    
    return price;
  };

  const finalPrice = calculateFinalPrice();

  const handleConfirm = () => {
    const configuredProduct: DetailedProductRecommendation = {
      ...product,
      configuration: {
        selectedStrength: selectedStrength || undefined,
        selectedSPF,
        selectedSize: selectedSize || undefined,
        selectedAdditives,
        withMicrobeads,
        withPeelingkorn,
        finalPrice
      }
    };
    onConfirm(configuredProduct);
    onClose();
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Konfigurera Produkt</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Info with Image */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex gap-4">
              <div className={`w-20 h-20 rounded-lg flex items-center justify-center text-white font-bold ${getBrandColor(product.brand)}`}>
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-sm">{product.brand}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{product.name}</h3>
                  <Badge>{product.brand}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{product.description}</p>
                <p className="text-xs text-gray-500">{product.usage}</p>
              </div>
            </div>
          </div>

          {/* Size Selection (if available) */}
          {product.sizes && product.sizes.length > 1 && (
            <div>
              <label className="block text-sm font-medium mb-2">Storlek</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Välj storlek" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map(size => (
                    <SelectItem key={size.size} value={size.size}>
                      {size.size} - {size.price} kr
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Strength Selection */}
          {product.availableOptions.strength && product.availableOptions.strength.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Styrka</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
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

          {/* Additives Selection */}
          {product.availableOptions.additives && product.availableOptions.additives.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Tillsatser</label>
              <div className="space-y-2">
                {product.availableOptions.additives.map(additive => (
                  <div key={additive} className="flex items-center justify-between">
                    <span className="text-sm">{additive}</span>
                    <Switch
                      checked={selectedAdditives.includes(additive)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedAdditives(prev => [...prev, additive]);
                        } else {
                          setSelectedAdditives(prev => prev.filter(a => a !== additive));
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Microbeads Option */}
          {product.availableOptions.microbeads && (
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Med mikrobeads</label>
                <p className="text-xs text-gray-500">Exfolierande mikrobeads för djuprengöring (+150 kr)</p>
              </div>
              <Switch
                checked={withMicrobeads}
                onCheckedChange={setWithMicrobeads}
              />
            </div>
          )}

          {/* Peelingkorn Option */}
          {product.availableOptions.peelingkorn && (
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Med peelingkorn</label>
                <p className="text-xs text-gray-500">Naturliga peelingkorn för mild exfoliering (+100 kr)</p>
              </div>
              <Switch
                checked={withPeelingkorn}
                onCheckedChange={setWithPeelingkorn}
              />
            </div>
          )}

          {/* Price Summary */}
          <div className="border-t pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Grundpris ({selectedSize || 'standard'}):</span>
                <span>{product.sizes?.find(s => s.size === selectedSize)?.price || product.price} kr</span>
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
              
              {withPeelingkorn && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Peelingkorn:</span>
                  <span>+100 kr</span>
                </div>
              )}
              
              {selectedAdditives.length > 0 && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tillsatser ({selectedAdditives.length}):</span>
                  <span>+{selectedAdditives.length * 75} kr</span>
                </div>
              )}
              
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-medium">Totalt:</span>
                <span className="text-xl font-bold text-blue-600">{finalPrice} kr</span>
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
