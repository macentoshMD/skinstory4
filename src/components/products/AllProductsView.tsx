import React, { useState } from 'react';
import { Search, Package, ShoppingCart, Minus, Plus, ChevronDown, ChevronRight, Heart, HeartOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useOrderCart } from '@/contexts/OrderCartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { InventoryItem } from './ProductInventoryTable';

interface AllProductsViewProps {
  items: InventoryItem[];
  category: 'sales' | 'treatment' | 'consumables';
  treatmentType?: 'all' | 'injections' | 'apparatus' | 'preparations' | 'other';
}

export function AllProductsView({ items, category, treatmentType = 'all' }: AllProductsViewProps) {
  const { addToCart } = useOrderCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");

  // Filter items by category first
  const categoryItems = items.filter(item => item.category === category);

  // Get filter options - brands for sales/treatment, categories for consumables
  const filterOptions = [...new Set(
    categoryItems.map(item => 
      category === 'consumables' ? (item.categoryType || 'Okategoriserad') : item.brand
    )
  )].sort();

  const filteredItems = categoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.variants.some(variant => 
        variant.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        variant.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesBrand = selectedBrand === "all" || 
      (category === 'consumables' ? 
        (item.categoryType || 'Okategoriserad') === selectedBrand : 
        item.brand === selectedBrand);
    
    // Filter by treatment type if category is treatment
    const matchesTreatmentType = category !== 'treatment' || 
      treatmentType === 'all' || 
      item.treatmentType === treatmentType;
    
    return matchesSearch && matchesBrand && matchesTreatmentType;
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

  const toggleExpanded = (itemId: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const toggleFavorite = (productId: string, variantId: string) => {
    if (isFavorite(productId, variantId)) {
      removeFromFavorites(productId, variantId);
    } else {
      addToFavorites(productId, variantId);
    }
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
      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Sök alla produkter, varumärken eller leverantörer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        

        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder={category === 'consumables' ? "Alla kategorier" : "Alla varumärken"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {category === 'consumables' ? "Alla kategorier" : "Alla varumärken"}
            </SelectItem>
            {filterOptions.map(option => (
              <SelectItem key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="text-sm text-muted-foreground">
          {filteredItems.length} produkter
        </div>
      </div>

      {/* Products Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead>Produkt</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Beskrivning</TableHead>
              <TableHead className="text-right">Från pris</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <React.Fragment key={item.id}>
                <TableRow className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => toggleExpanded(item.id)}
                    >
                      {expandedRows.has(item.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell onClick={() => toggleExpanded(item.id)}>
                     <div>
                       <div className="font-medium text-foreground group-hover:text-primary transition-colors">
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
                           {item.name}
                         </span>
                       </div>
                       <div className="text-sm text-muted-foreground">{item.brand}</div>
                     </div>
                  </TableCell>
                  <TableCell onClick={() => toggleExpanded(item.id)}>
                    <div className="flex items-center">
                      {getCategoryBadge(item.category)}
                      {getTreatmentTypeBadge(item.treatmentType)}
                    </div>
                  </TableCell>
                  <TableCell onClick={() => toggleExpanded(item.id)}>
                    <div className="text-sm text-muted-foreground">
                      {item.shortDescription}
                    </div>
                  </TableCell>
                  <TableCell className="text-right" onClick={() => toggleExpanded(item.id)}>
                    <div className="font-medium">
                      {Math.min(...item.variants.map(v => v.pricePerUnit * v.packSize)).toFixed(0)} kr
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.variants.length} variant{item.variants.length !== 1 ? 'er' : ''}
                    </div>
                  </TableCell>
                </TableRow>
                
                {expandedRows.has(item.id) && (
                  <TableRow>
                    <TableCell colSpan={5} className="p-0">
                      <div className="bg-muted/30 p-4 space-y-3">
                        {item.variants.map((variant) => (
                          <div 
                            key={variant.id} 
                            className="bg-background rounded-lg p-4 border flex items-center justify-between"
                          >
                            <div className="flex-1 grid grid-cols-5 gap-4 items-center">
                              <div>
                                <div className="font-medium">{variant.name}</div>
                                <div className="text-sm text-muted-foreground">{variant.description}</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Leverantör: {variant.supplier}
                                </div>
                              </div>
                              <div className="text-sm">
                                <div>{variant.packSize} {variant.unit}/förp</div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">
                                  {(variant.pricePerUnit * variant.packSize).toFixed(0)} kr/förp
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {variant.pricePerUnit.toFixed(2)} kr/{variant.unit}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => toggleFavorite(item.id, variant.id)}
                                >
                                  {isFavorite(item.id, variant.id) ? (
                                    <Heart className="h-4 w-4 fill-current text-red-500" />
                                  ) : (
                                    <Heart className="h-4 w-4" />
                                  )}
                                </Button>
                                <div className="flex items-center gap-1">
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
                              </div>
                              <div>
                                <Button
                                  size="sm"
                                  onClick={() => handleAddToCart(item, variant)}
                                  disabled={!quantities[variant.id] || quantities[variant.id] <= 0}
                                  className="h-8"
                                >
                                  <ShoppingCart className="h-3 w-3 mr-1" />
                                  Lägg till
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}