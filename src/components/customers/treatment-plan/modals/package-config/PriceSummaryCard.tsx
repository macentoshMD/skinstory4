import { ProductPackage } from '@/types/consultation';

interface PriceSummaryCardProps {
  package: ProductPackage;
  finalPrice: number;
}

export function PriceSummaryCard({ package: pkg, finalPrice }: PriceSummaryCardProps) {
  return (
    <div className="border-t pt-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Paketpris:</span>
          <span>{pkg.totalPrice} kr</span>
        </div>
        
        {pkg.originalPrice && pkg.discountPercent && (
          <>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Ordinarie pris:</span>
              <span className="line-through">{pkg.originalPrice} kr</span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>Rabatt ({pkg.discountPercent}%):</span>
              <span>-{Math.round(pkg.originalPrice * (pkg.discountPercent / 100))} kr</span>
            </div>
          </>
        )}
        
        <div className="flex justify-between items-center pt-2 border-t">
          <span className="font-medium">Totalt:</span>
          <span className="text-xl font-bold text-blue-600">{finalPrice} kr</span>
        </div>
        
        <div className="text-sm text-gray-600 text-right">
          ({Math.round(pkg.costPerMonth)} kr/månad)
        </div>
      </div>
    </div>
  );
}