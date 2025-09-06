import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOrderCart } from '@/contexts/OrderCartContext';

interface StickyOrderButtonProps {
  onOpenCart: () => void;
}

export function StickyOrderButton({ onOpenCart }: StickyOrderButtonProps) {
  const { getTotalItems, getTotalValue } = useOrderCart();
  
  const totalItems = getTotalItems();
  
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button 
        size="lg" 
        onClick={onOpenCart}
        className="shadow-lg hover:shadow-xl transition-shadow bg-primary hover:bg-primary/90 rounded-full px-6 py-3"
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        <span className="mr-2">Beställ</span>
        <Badge variant="secondary" className="bg-background text-primary">
          {totalItems}
        </Badge>
        <span className="ml-2 font-semibold">
          {getTotalValue().toFixed(0)} kr
        </span>
      </Button>
    </div>
  );
}