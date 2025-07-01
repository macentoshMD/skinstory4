import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface TreatmentPlanHeaderProps {
  problemName: string;
  onBack?: () => void;
}

const TreatmentPlanHeader = ({ problemName, onBack }: TreatmentPlanHeaderProps) => {
  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="sm" className="p-2" onClick={onBack}>
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <h1 className="text-2xl font-bold text-gray-900">Behandlingsplan - {problemName}</h1>
    </div>
  );
};

export default TreatmentPlanHeader;