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
        {/* Quick Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">1</div>
            <p className="text-xs text-muted-foreground">Produktpaket</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-lg font-bold text-purple-600">{akneStarterpaket?.price.toLocaleString('sv-SE')} kr</div>
            <p className="text-xs text-muted-foreground">Totalkostnad</p>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-lg font-bold text-orange-600">{methods.length}</div>
            <p className="text-xs text-muted-foreground">Metoder</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">3</div>
            <p className="text-xs text-muted-foreground">Månader</p>
          </div>
        </div>

        {/* Single Product Package */}
        {akneStarterpaket && (
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-green-800 bg-green-100 px-3 py-1 rounded-full inline-block">
              {akneStarterpaket.category}
            </h4>
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
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
                  <Calendar className="h-4 w-4 mr-2" />
                  Boka
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Methods & Instructions */}
        <div className="space-y-4 border-t pt-4">
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Package className="h-4 w-4" />
              Behandlingsmetoder
            </h4>
            <div className="flex flex-wrap gap-2">
              {methods.map(method => (
                <Badge key={method} variant="outline" className="text-xs">
                  {method}
                </Badge>
              ))}
            </div>
          </div>

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