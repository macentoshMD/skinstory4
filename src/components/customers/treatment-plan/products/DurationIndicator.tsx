
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DurationIndicatorProps {
  duration: string;
  costPerMonth: number;
  showCostPerMonth?: boolean;
}

export function DurationIndicator({ duration, costPerMonth, showCostPerMonth = true }: DurationIndicatorProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex items-center gap-1 text-gray-600">
        <Clock className="h-3 w-3" />
        <span>{duration}</span>
      </div>
      {showCostPerMonth && (
        <Badge variant="secondary" className="text-xs">
          {Math.round(costPerMonth)} kr/mån
        </Badge>
      )}
    </div>
  );
}
