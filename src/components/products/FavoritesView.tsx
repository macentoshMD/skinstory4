import React, { useState } from 'react';
import { Search, ShoppingCart, Minus, Plus, Trash2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useOrderCart } from '@/contexts/OrderCartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { InventoryItem } from './ProductInventoryTable';

interface FavoritesViewProps {
  items: InventoryItem[];
  category: 'sales' | 'treatment' | 'consumables';
  treatmentType?: 'all' | 'injections' | 'apparatus' | 'preparations' | 'other';
}

export function FavoritesView({ items, category, treatmentType = 'all' }: FavoritesViewProps) {
  const { addToCart } = useOrderCart();
  const { favorites, removeFromFavorites } = useFavorites();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState("");

  // Get favorite items with their details, filtered by category
  const favoriteItems = favorites.map(fav => {
    const item = items.find(item => item.id === fav.productId);
    const variant = item?.variants.find(v => v.id === fav.variantId);
    return item && variant ? { item, variant } : null;
  }).filter(Boolean).filter(favorite => {
    if (!favorite) return false;
    const { item } = favorite;
    
    // Filter by category
    const matchesCategory = item.category === category;
    
    // Filter by treatment type if category is treatment
    const matchesTreatmentType = category !== 'treatment' || 
      treatmentType === 'all' || 
      item.treatmentType === treatmentType;
    
    return matchesCategory && matchesTreatmentType;
  });

  const filteredFavorites = favoriteItems.filter(favorite => {
    if (!favorite) return false;
    const { item, variant } = favorite;
    return item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
           variant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           variant.supplier.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleQuantityChange = (variantId: string, value: string) => {
    const quantity = parseInt(value) || 0;
    setQuantities(prev => ({ ...prev, [variantId]: quantity }));
  };

  const handleAddToCart = (item: InventoryItem, variant: any) => {
    const quantity = quantities[variant.id] || 0;
    if (quantity > 0) {
      addToCart({
        id: variant.id,
        name: `${item.name} - ${variant.name}`,
        brand: item.brand,
        category: item.category,
        pricePerUnit: variant.pricePerUnit,
        packSize: variant.packSize,
        unit: variant.unit,
      }, quantity);
      
      setQuantities(prev => ({ ...prev, [variant.id]: 0 }));
    }
  };

  const adjustQuantity = (variantId: string, delta: number) => {
    const currentQuantity = quantities[variantId] || 0;
    const newQuantity = Math.max(0, currentQuantity + delta);
    setQuantities(prev => ({ ...prev, [variantId]: newQuantity }));
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'sales':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Försäljning</Badge>;
      case 'treatment':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Behandling</Badge>;
      case 'consumables':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Förbrukning</Badge>;
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };

  const getTreatmentTypeBadge = (treatmentType?: string) => {
    if (!treatmentType) return null;
    
    const typeLabels = {
      'injections': 'Injektioner',
      'machines': 'Maskiner', 
      'hydrafacial': 'HydraFacial',
      'other': 'Övrigt'
    };
    
    return (
      <Badge variant="secondary" className="ml-2 text-xs">
        {typeLabels[treatmentType as keyof typeof typeLabels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Sök i mina vanliga beställningar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredFavorites.length} favoriter
        </div>
      </div>

      {/* Empty State */}
      {favoriteItems.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Inga vanliga beställningar i denna kategori</h3>
          <p className="text-muted-foreground mb-4">
            Lägg till produkter från "Alla artiklar" för att skapa din personliga beställningslista
          </p>
        </div>
      )}

      {/* Favorites Table */}
      {favoriteItems.length > 0 && (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produkt</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Förpackning</TableHead>
                <TableHead className="text-right">Pris/förp</TableHead>
                <TableHead className="text-right">Pris/styck</TableHead>
                <TableHead className="text-center">Beställ</TableHead>
                <TableHead className="text-center">Lägg till</TableHead>
                <TableHead className="text-center">Ta bort</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFavorites.map((favorite) => {
                if (!favorite) return null;
                const { item, variant } = favorite;
                
                return (
                  <TableRow key={`${item.id}-${variant.id}`}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          <span 
                            className="hover:underline cursor-help"
                            onMouseEnter={(e) => {
                              if (item.image) {
                                const tooltip = document.createElement('div');
                                tooltip.className = 'fixed z-50 p-2 bg-popover border rounded-md shadow-lg pointer-events-none';
                                tooltip.innerHTML = `<img src="${item.image}" alt="${item.name}" class="w-48 h-32 object-cover rounded" />`;
                                document.body.appendChild(tooltip);
                                
                                const rect = e.currentTarget.getBoundingClientRect();
                                tooltip.style.left = `${rect.right + 10}px`;
                                tooltip.style.top = `${rect.top}px`;
                                
                                e.currentTarget.setAttribute('data-tooltip', 'true');
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (e.currentTarget.getAttribute('data-tooltip')) {
                                const tooltips = document.querySelectorAll('.fixed.z-50.p-2.bg-popover');
                                tooltips.forEach(tooltip => tooltip.remove());
                                e.currentTarget.removeAttribute('data-tooltip');
                              }
                            }}
                          >
                            {item.name} - {variant.name}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">{item.brand}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {variant.description}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Leverantör: {variant.supplier}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getCategoryBadge(item.category)}
                        {getTreatmentTypeBadge(item.treatmentType)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{variant.packSize} {variant.unit}/förp</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-medium">
                        {(variant.pricePerUnit * variant.packSize).toFixed(0)} kr
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="text-sm">
                        {variant.pricePerUnit.toFixed(2)} kr
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center gap-1 justify-center">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => adjustQuantity(variant.id, -1)}
                          disabled={!quantities[variant.id] || quantities[variant.id] <= 0}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input
                          type="number"
                          min="0"
                          value={quantities[variant.id] || ''}
                          onChange={(e) => handleQuantityChange(variant.id, e.target.value)}
                          className="w-16 h-8 text-center text-sm"
                          placeholder="0"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => adjustQuantity(variant.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(item, variant)}
                        disabled={!quantities[variant.id] || quantities[variant.id] <= 0}
                        className="h-8"
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Lägg till
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => removeFromFavorites(item.id, variant.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}