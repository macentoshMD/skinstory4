import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Milestone } from "@/utils/employeeStatsGenerator";
import { Target, Trophy, TrendingUp } from "lucide-react";

interface MilestoneCardProps {
  milestone: Milestone;
}

const getCategoryIcon = (category: Milestone['category']) => {
  switch (category) {
    case 'treatment': return Target;
    case 'sales': return TrendingUp;
    case 'customer': return Trophy;
    case 'expertise': return Trophy;
    default: return Target;
  }
};

const getCategoryColor = (category: Milestone['category']) => {
  switch (category) {
    case 'treatment': return 'bg-blue-500';
    case 'sales': return 'bg-green-500';
    case 'customer': return 'bg-purple-500';
    case 'expertise': return 'bg-orange-500';
    default: return 'bg-gray-500';
  }
};

export function MilestoneCard({ milestone }: MilestoneCardProps) {
  const IconComponent = getCategoryIcon(milestone.category);
  const progress = Math.min((milestone.current / milestone.target) * 100, 100);
  const remaining = Math.max(milestone.target - milestone.current, 0);
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${getCategoryColor(milestone.category)} text-white`}>
            <IconComponent className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-sm font-medium">{milestone.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs text-muted-foreground mb-3">
          {milestone.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>{milestone.current.toLocaleString()}</span>
            <span>{milestone.target.toLocaleString()}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              {remaining.toLocaleString()} kvar
            </span>
            <Badge variant="outline" className="text-xs">
              {milestone.reward}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}