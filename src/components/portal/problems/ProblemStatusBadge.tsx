import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { getProblemStatusData } from '@/utils/problemHelpers';
import { ProblemStatus } from '@/types/problem';

interface ProblemStatusBadgeProps {
  status: ProblemStatus;
}

const ProblemStatusBadge = ({ status }: ProblemStatusBadgeProps) => {
  const statusData = getProblemStatusData(status);
  
  const getIcon = () => {
    switch (statusData.iconType) {
      case 'trending-up':
        return <TrendingUp className="h-3 w-3" />;
      case 'trending-down':
        return <TrendingDown className="h-3 w-3" />;
      case 'minus':
        return <Minus className="h-3 w-3" />;
      case 'check':
        return <CheckCircle className="h-3 w-3" />;
      case 'alert':
        return <AlertTriangle className="h-3 w-3" />;
      case 'help':
      default:
        return <HelpCircle className="h-3 w-3" />;
    }
  };

  return (
    <Badge variant="outline" className={`${statusData.color} flex items-center gap-1`}>
      {getIcon()}
      {statusData.text}
    </Badge>
  );
};

export default ProblemStatusBadge;