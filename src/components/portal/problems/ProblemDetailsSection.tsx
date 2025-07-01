import { formatProblemAreas, formatDate } from '@/utils/problemHelpers';
import { Problem } from '@/types/problem';
import { MapPin } from 'lucide-react';

interface ProblemDetailsSectionProps {
  problem: Problem;
}

const ProblemDetailsSection = ({ problem }: ProblemDetailsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
      <div>
        <label className="font-medium text-muted-foreground flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Drabbade områden
        </label>
        <div className="mt-2">
          <p className="text-sm">{formatProblemAreas(problem.areas)}</p>
        </div>
      </div>
      
      <div>
        <label className="font-medium text-muted-foreground">Första diagnos</label>
        <p className="mt-1">{formatDate(problem.firstDiagnosed)}</p>
      </div>
      
      <div>
        <label className="font-medium text-muted-foreground">Senast utvärderad</label>
        <p className="mt-1">{formatDate(problem.lastAssessed)}</p>
      </div>

      <div>
        <label className="font-medium text-muted-foreground">Nästa uppföljning</label>
        <p className="mt-1">{formatDate(problem.nextAssessment || null)}</p>
      </div>
    </div>
  );
};

export default ProblemDetailsSection;