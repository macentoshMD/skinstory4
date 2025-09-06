import { ShoppingCart, X, Trash2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useOrderCart, CartItem } from '@/contexts/OrderCartContext';
import { useState } from 'react';

interface OrderCartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderCartSidebar({ isOpen, onClose }: OrderCartSidebarProps) {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalValue } = useOrderCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuantityChange = (id: string, newQuantity: string) => {
    const quantity = parseInt(newQuantity) || 0;
    updateQuantity(id, quantity);
  };

  const handleSubmitOrder = async () => {
    if (cartItems.length === 0) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart after successful order
    clearCart();
    setIsSubmitting(false);
    onClose();
    
    // Here you would typically show a success message
    alert('Beställning skickad!');
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'sales': return 'Försäljning';
      case 'treatment': return 'Behandling';
      case 'consumables': return 'Förbrukning';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sales': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'treatment': return 'bg-green-50 text-green-700 border-green-200';
      case 'consumables': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-96 bg-background border-l shadow-lg">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Beställning</h2>
              {getTotalItems() > 0 && (
                <Badge variant="secondary">{getTotalItems()}</Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Beställningen är tom</p>
                <p className="text-sm">Lägg till produkter från tabellen</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.brand}</p>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getCategoryColor(item.category)}`}
                        >
                          {getCategoryLabel(item.category)}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      {item.packSize} {item.unit}/förpackning • {item.pricePerUnit} kr/styck
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs">Antal:</span>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                          className="w-16 h-7 text-xs"
                        />
                        <span className="text-xs text-muted-foreground">förp</span>
                      </div>
                      <div className="text-sm font-medium">
                        {(item.pricePerUnit * item.packSize * item.quantity).toFixed(0)} kr
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center">
                <Button variant="ghost" size="sm" onClick={clearCart}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Rensa allt
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Totalt antal förpackningar:</span>
                  <span className="font-medium">{getTotalItems()}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Totalt belopp:</span>
                  <span>{getTotalValue().toFixed(0)} kr</span>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Skickar beställning..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Skicka beställning
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}