import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProblemDescriptionCardProps {
  problem: {
    name: string;
    description: string;
    severity: string;
    areas: string[];
  };
  goals: {
    title: string;
    description: string;
  };
}

const ProblemDescriptionCard = ({ problem, goals }: ProblemDescriptionCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-3">{problem.name}</h2>
              <p className="text-gray-700 mb-4">{problem.description}</p>
            </div>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 ml-4">
              {problem.severity}
            </Badge>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-2">DRABBADE OMRÅDEN</h4>
            <div className="flex flex-wrap gap-2">
              {problem.areas.map((area, index) => (
                <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                  {area}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-semibold text-lg text-purple-800 mb-2">{goals.title}</h3>
            <p className="text-gray-700">{goals.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProblemDescriptionCard;