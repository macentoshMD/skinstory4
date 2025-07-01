import { Badge } from '@/components/ui/badge';
import { Play, CheckCircle, Clock, Pause } from 'lucide-react';
import { getTreatmentStatusData } from '@/utils/treatmentPlanHelpers';
import { TreatmentStatus } from '@/types/treatment-plan';

interface TreatmentStatusBadgeProps {
  status: TreatmentStatus;
}

const TreatmentStatusBadge = ({ status }: TreatmentStatusBadgeProps) => {
  const statusData = getTreatmentStatusData(status);
  
  const getIcon = () => {
    switch (statusData.iconType) {
      case 'play':
        return <Play className="h-3 w-3" />;
      case 'check':
        return <CheckCircle className="h-3 w-3" />;
      case 'pause':
        return <Pause className="h-3 w-3" />;
      case 'clock':
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <Badge variant="outline" className={`${statusData.color} flex items-center gap-1`}>
      {getIcon()}
      {statusData.text}
    </Badge>
  );
};

export default TreatmentStatusBadge;