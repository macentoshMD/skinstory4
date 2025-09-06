import { useState } from 'react';
import { Search, Package, ShoppingCart, Minus, Plus, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useOrderCart } from '@/contexts/OrderCartContext';

export interface InventoryItem {
  id: string;
  name: string;
  brand: string;
  category: 'sales' | 'treatment' | 'consumables';
  pricePerUnit: number;
  packSize: number;
  unit: string;
  currentStock: number;
  minStock: number;
  supplier: string;
  description: string;
  inStock: boolean;
}

interface ProductInventoryTableProps {
  items: InventoryItem[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function ProductInventoryTable({ items, searchTerm, onSearchChange }: ProductInventoryTableProps) {
  const { addToCart } = useOrderCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuantityChange = (id: string, value: string) => {
    const quantity = parseInt(value) || 0;
    setQuantities(prev => ({ ...prev, [id]: quantity }));
  };

  const handleAddToCart = (item: InventoryItem) => {
    const quantity = quantities[item.id] || 0;
    if (quantity > 0) {
      addToCart({
        id: item.id,
        name: item.name,
        brand: item.brand,
        category: item.category,
        pricePerUnit: item.pricePerUnit,
        packSize: item.packSize,
        unit: item.unit,
      }, quantity);
      
      // Clear the quantity input
      setQuantities(prev => ({ ...prev, [item.id]: 0 }));
    }
  };

  const adjustQuantity = (id: string, delta: number) => {
    const currentQuantity = quantities[id] || 0;
    const newQuantity = Math.max(0, currentQuantity + delta);
    setQuantities(prev => ({ ...prev, [id]: newQuantity }));
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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Sök produkter, varumärken eller leverantörer..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredItems.length} produkter
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produkt</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Förpackning</TableHead>
              <TableHead className="text-right">Pris/förp</TableHead>
              <TableHead className="text-right">Pris/styck</TableHead>
              <TableHead className="text-center">Lager</TableHead>
              <TableHead className="text-center">Beställ</TableHead>
              <TableHead className="text-center">Lägg till</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id} className={!item.inStock ? "opacity-60" : ""}>
                <TableCell>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">{item.brand}</div>
                    <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {getCategoryBadge(item.category)}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{item.packSize} {item.unit}/förp</div>
                    <div className="text-muted-foreground">Leverantör: {item.supplier}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="font-medium">{(item.pricePerUnit * item.packSize).toFixed(0)} kr</div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="text-sm">{item.pricePerUnit.toFixed(2)} kr</div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`font-medium ${
                      item.currentStock <= item.minStock ? 'text-destructive' : 'text-foreground'
                    }`}>
                      {item.currentStock}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Min: {item.minStock}
                    </div>
                    {item.currentStock <= item.minStock && (
                      <AlertTriangle className="h-3 w-3 text-destructive" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => adjustQuantity(item.id, -1)}
                      disabled={!quantities[item.id] || quantities[item.id] <= 0}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Input
                      type="number"
                      min="0"
                      value={quantities[item.id] || ''}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="w-16 h-8 text-center text-sm"
                      placeholder="0"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => adjustQuantity(item.id, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(item)}
                    disabled={!quantities[item.id] || quantities[item.id] <= 0}
                    className="h-8"
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Lägg till
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}