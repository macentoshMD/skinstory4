import { formatDate } from '@/utils/problemHelpers';
import { Problem } from '@/types/problem';
import { Eye } from 'lucide-react';

interface ProblemImagesSectionProps {
  problem: Problem;
}

const ProblemImagesSection = ({ problem }: ProblemImagesSectionProps) => {
  return (
    <div className="border-t pt-6">
      <div className="flex items-center gap-3 mb-4">
        <Eye className="h-5 w-5 text-muted-foreground" />
        <h4 className="font-medium">Bilder</h4>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-sm font-medium">Första bedömning</div>
              <div className="text-xs">{formatDate(problem.firstDiagnosed)}</div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-sm font-medium">Senaste bedömning</div>
              <div className="text-xs">{formatDate(problem.lastAssessed)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemImagesSection;