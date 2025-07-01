import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Gem } from 'lucide-react';

interface ValuePropositionSectionProps {
  title: string;
  features: string[];
}

const ValuePropositionSection = ({ title, features }: ValuePropositionSectionProps) => {
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-900">
          <Gem className="h-5 w-5" />
          💎 {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <Check className="h-3 w-3 text-green-600" />
              </div>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ValuePropositionSection;