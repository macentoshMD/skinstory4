import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, Package, Info } from 'lucide-react';
import { ProductPackage } from '@/types/treatment-plan';

interface HomeCareCardProps {
  productPackages: ProductPackage[];
  methods: string[];
  instructions: string;
}

const HomeCareCard = ({ productPackages, methods, instructions }: HomeCareCardProps) => {
  const totalHomeCarePrice = productPackages.reduce((sum, product) => sum + product.price, 0);

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
      <CardContent className="space-y-6">
        {/* Product Packages */}
        <div className="space-y-4">
          {productPackages.map(product => (
            <div key={product.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{product.name}</h4>
                    <Badge className={getCategoryColor(product.category)}>
                      {product.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                  <p className="text-sm mt-1">{product.description}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{product.price} kr</div>
                  <div className="text-xs text-muted-foreground">{product.duration}</div>
                </div>
              </div>
              
              <div className="text-sm">
                <span className="font-medium">Användning:</span>
                <span className="ml-2 text-muted-foreground">{product.usage}</span>
              </div>
            </div>
          ))}
        </div>

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

        {/* Price Summary */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Totalt hemmavård:</span>
            <span className="text-xl font-bold text-green-600">{totalHomeCarePrice.toLocaleString('sv-SE')} kr</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeCareCard;