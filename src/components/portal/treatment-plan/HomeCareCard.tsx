import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Home, Package, Info, ShoppingCart, Calendar } from 'lucide-react';
import { ProductPackage } from '@/types/treatment-plan';

interface HomeCareCardProps {
  productPackages: ProductPackage[];
  methods: string[];
  instructions: string;
  onOrderProducts?: () => void;
}

const HomeCareCard = ({ productPackages, methods, instructions, onOrderProducts }: HomeCareCardProps) => {
  // Show only the first product package (Akne Starterpaket)
  const akneStarterpaket = productPackages[0];
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Grundvård': return 'bg-green-100 text-green-800';
      case 'Behandling': return 'bg-purple-100 text-purple-800';
      case 'Skydd': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5 text-green-600" />
          Hemmavård
          <Badge variant="outline" className="bg-green-50 text-green-700">
            {productPackages.length} produkter
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">

        {/* Single Product Package */}
        {akneStarterpaket && (
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-green-800 bg-green-100 px-3 py-1 rounded-full inline-block">
              {akneStarterpaket.category}
            </h4>
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <h5 className="font-semibold text-lg text-green-900">{akneStarterpaket.name}</h5>
                <p className="text-sm text-green-700">{akneStarterpaket.brand} • {akneStarterpaket.usage}</p>
                <p className="text-sm text-green-600 mt-1">{akneStarterpaket.description}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl text-green-900">{akneStarterpaket.price} kr</div>
                <div className="text-sm text-green-600">{akneStarterpaket.duration}</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex gap-3">
              <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => onOrderProducts?.()}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Beställ
              </Button>
              <Button variant="outline" className="flex-1 border-green-200 text-green-700 hover:bg-green-50">
                <Info className="h-4 w-4 mr-2" />
                Hudvårdsrutiner
              </Button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="border-t pt-4">
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Instruktioner
            </h4>
            <p className="text-sm text-muted-foreground bg-green-50 p-3 rounded-lg">
              {instructions}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeCareCard;