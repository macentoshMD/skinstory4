
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, Star } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { ProductRecommendation, TreatmentPlan } from '@/types/consultation';

interface HomecareTabProps {
  treatmentPlan: TreatmentPlan;
  mockProducts: ProductRecommendation[];
  onProductToggle: (product: ProductRecommendation, timeOfDay: 'morning' | 'evening' | 'weekly') => void;
}

export function HomecareTab({ treatmentPlan, mockProducts, onProductToggle }: HomecareTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Hemmavård - Produktrekommendationer</span>
            <Badge variant="outline" className="bg-green-50">
              Totalt: {treatmentPlan.totalHomecarePrice} kr
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Morning Routine */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Morgonrutin
            </h4>
            <div className="grid gap-3">
              {mockProducts.filter(p => p.usage.includes('Morgon')).map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={treatmentPlan.homecare.morning.some(p => p.id === product.id)}
                  onToggle={() => onProductToggle(product, 'morning')}
                />
              ))}
            </div>
          </div>

          <Separator />

          {/* Evening Routine */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Kvällsrutin
            </h4>
            <div className="grid gap-3">
              {mockProducts.filter(p => p.usage.includes('kväll')).map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={treatmentPlan.homecare.evening.some(p => p.id === product.id)}
                  onToggle={() => onProductToggle(product, 'evening')}
                />
              ))}
            </div>
          </div>

          <Separator />

          {/* Weekly Treatments */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Star className="h-4 w-4" />
              Veckobehandlingar
            </h4>
            <div className="grid gap-3">
              {mockProducts.filter(p => p.usage.includes('vecka')).map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={treatmentPlan.homecare.weekly.some(p => p.id === product.id)}
                  onToggle={() => onProductToggle(product, 'weekly')}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
