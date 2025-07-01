import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Camera, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface BeforeAfterSectionProps {
  expectedImprovement: string;
  timeframe: string;
  description: string;
}

const BeforeAfterSection = ({ expectedImprovement, timeframe, description }: BeforeAfterSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="bg-gray-50 border-gray-200">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-6 h-auto">
            <div className="flex items-center gap-2 text-gray-700">
              <Camera className="h-4 w-4" />
              Vill du se andra med samma problem?
            </div>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">
            <div className="grid md:grid-cols-3 gap-4 items-center">
              {/* Before placeholder */}
              <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Camera className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Före-bild</p>
                </div>
              </div>
              
              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowRight className="h-8 w-8 text-blue-600" />
              </div>
              
              {/* After placeholder */}
              <div className="bg-gradient-to-br from-green-100 to-blue-100 aspect-square rounded-lg flex items-center justify-center">
                <div className="text-center text-green-700">
                  <Camera className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Efter-bild</p>
                </div>
              </div>
            </div>
            
            <div className="text-center bg-white/60 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-900 mb-1">{expectedImprovement}</div>
              <p className="text-blue-700">{description} inom {timeframe}</p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default BeforeAfterSection;