import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X } from 'lucide-react';

interface PaymentBenefit {
  text: string;
  included: boolean;
}

interface PaymentOptionCardProps {
  type: 'commit' | 'payAsYouGo';
  title: string;
  price: string;
  subtitle?: string;
  savings?: string;
  description: string;
  benefits: PaymentBenefit[];
  isRecommended?: boolean;
  onSelect: () => void;
}

const PaymentOptionCard = ({ 
  type, 
  title, 
  price, 
  subtitle, 
  savings, 
  description, 
  benefits, 
  isRecommended, 
  onSelect 
}: PaymentOptionCardProps) => {
  const isCommit = type === 'commit';
  
  return (
    <Card className={`border-2 ${isCommit ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100' : 'border-gray-200'} relative`}>
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-purple-600 text-white px-4 py-1">REKOMMENDERAT</Badge>
        </div>
      )}
      <CardHeader className="text-center pt-8">
        <CardTitle className={`text-xl ${isCommit ? 'text-purple-800' : ''}`}>{title}</CardTitle>
        <div className={`text-3xl font-bold ${isCommit ? 'text-purple-600' : ''}`}>{price}</div>
        {subtitle && (
          <p className={`text-sm ${isCommit ? 'text-purple-700' : 'text-muted-foreground'}`}>
            {subtitle}
          </p>
        )}
        {savings && (
          <p className="text-sm font-semibold text-green-700">
            Spara {savings}!
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <p className={`text-sm text-center mb-4 ${isCommit ? 'text-purple-700' : 'text-muted-foreground'}`}>
          {description}
        </p>
        <div className="space-y-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              {benefit.included ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <X className="h-5 w-5 text-red-500" />
              )}
              <span className={`text-sm ${!benefit.included ? 'text-muted-foreground line-through' : ''}`}>
                {benefit.text}
              </span>
            </div>
          ))}
        </div>
        <Button 
          onClick={onSelect}
          className={isCommit ? "w-full bg-purple-600 hover:bg-purple-700 mt-6" : "w-full mt-6"}
          variant={isCommit ? "default" : "outline"}
        >
          Fortsätt med {title}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentOptionCard;