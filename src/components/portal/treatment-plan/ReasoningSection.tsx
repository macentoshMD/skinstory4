import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Microscope } from 'lucide-react';

interface ReasoningSectionProps {
  title: string;
  description: string;
  successRate: string;
}

const ReasoningSection = ({ title, description, successRate }: ReasoningSectionProps) => {
  return (
    <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-900">
          <Microscope className="h-5 w-5" />
          🔬 {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-gray-700 italic">"{description}"</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Framgångsgrad:</span>
          <Badge className="bg-green-600 text-white">{successRate} framgång</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReasoningSection;