
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TreatmentRecommendation } from '@/types/consultation';

interface TreatmentCardProps {
  treatment: TreatmentRecommendation;
  isSelected: boolean;
  onToggle: () => void;
}

export function TreatmentCard({ treatment, isSelected, onToggle }: TreatmentCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'essential': return 'bg-red-100 text-red-800 border-red-200';
      case 'recommended': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'optional': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'essential': return 'Nödvändig';
      case 'recommended': return 'Rekommenderad';
      case 'optional': return 'Valfri';
      default: return priority;
    }
  };

  const hasContraindications = treatment.contraindications.length > 0;

  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
        isSelected ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
      } ${hasContraindications ? 'border-l-4 border-l-yellow-400' : ''}`}
      onClick={onToggle}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h5 className="font-medium">{treatment.name}</h5>
            <Badge className={getPriorityColor(treatment.priority)}>
              {getPriorityText(treatment.priority)}
            </Badge>
          </div>
          <p className="text-sm text-gray-700 mb-2">{treatment.description}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{treatment.sessions} sessioner</span>
            <span>{treatment.frequency}</span>
          </div>
          {hasContraindications && (
            <Alert className="mt-2 border-yellow-200 bg-yellow-50">
              <AlertDescription className="text-yellow-800 text-xs">
                Kontraindikationer: {treatment.contraindications.join(', ')}
              </AlertDescription>
            </Alert>
          )}
        </div>
        <div className="text-right">
          <span className="font-medium">{treatment.price} kr/session</span>
          <p className="text-xs text-gray-500">
            Totalt: {treatment.price * treatment.sessions} kr
          </p>
        </div>
      </div>
    </div>
  );
}
