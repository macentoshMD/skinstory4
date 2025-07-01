import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Clock } from 'lucide-react';

interface PricingBreakdownSectionProps {
  clinicCost: string;
  homeCost: string;
  commitTotal: string;
  weeklyEquivalent: string;
}

const PricingBreakdownSection = ({ clinicCost, homeCost, commitTotal, weeklyEquivalent }: PricingBreakdownSectionProps) => {
  return (
    <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <CreditCard className="h-5 w-5" />
          💰 Investering i din hud
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Klinikvård:</span>
            <span className="font-semibold">{clinicCost}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Hemmavård:</span>
            <span className="font-semibold">{homeCost}</span>
          </div>
          <hr className="border-gray-300" />
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">Totalt:</span>
            <span className="font-bold text-blue-600">{commitTotal}</span>
          </div>
        </div>
        
        <div className="bg-blue-100 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-700">Motsvarar</span>
          </div>
          <div className="text-xl font-bold text-blue-900">{weeklyEquivalent}/vecka</div>
          <p className="text-sm text-blue-700">för problemfri hud</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingBreakdownSection;