
import { Button } from '@/components/ui/button';
import { Package, Package2 } from 'lucide-react';

interface ProductToggleProps {
  showPackages: boolean;
  onToggle: (showPackages: boolean) => void;
}

export function ProductToggle({ showPackages, onToggle }: ProductToggleProps) {
  return (
    <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
      <Button
        variant={!showPackages ? "default" : "ghost"}
        size="sm"
        onClick={() => onToggle(false)}
        className="flex items-center gap-2"
      >
        <Package2 className="h-4 w-4" />
        Enskilda produkter
      </Button>
      <Button
        variant={showPackages ? "default" : "ghost"}
        size="sm"
        onClick={() => onToggle(true)}
        className="flex items-center gap-2"
      >
        <Package className="h-4 w-4" />
        Produktpaket
      </Button>
    </div>
  );
}
