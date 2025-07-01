import { Badge } from '@/components/ui/badge';
import { DetailedTreatmentRecommendation } from '@/types/consultation';

interface EnhancedTreatmentCardProps {
  treatment: DetailedTreatmentRecommendation & {
    method?: string;
    model?: string;
    problems?: string[];
  };
  onSelect: () => void;
}

export function EnhancedTreatmentCard({
  treatment,
  onSelect
}: EnhancedTreatmentCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'essential':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'recommended':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'optional':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'essential':
        return 'NÖDVÄNDIG';
      case 'recommended':
        return 'REKOMMENDERAD';
      case 'optional':
        return 'FRIVILLIG';
      default:
        return priority;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Ansiktsbehandling': 'bg-blue-500',
      'Ljusterapi': 'bg-purple-500',
      'Kemisk peeling': 'bg-green-500',
      'Laser': 'bg-red-500',
      'Microneedling': 'bg-orange-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div 
      className="bg-background border border-border rounded-lg p-4 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer group duration-200 h-full flex flex-col" 
      onClick={onSelect}
    >
      {/* Treatment Image/Icon */}
      <div className={`w-full aspect-square rounded-lg mb-4 flex items-center justify-center text-white font-bold text-lg overflow-hidden ${getCategoryColor(treatment.category)}`}>
        <span className="text-sm text-center px-2">{treatment.category}</span>
      </div>

      {/* Treatment Info - Flex grow to fill space */}
      <div className="space-y-3 flex-1 flex flex-col">
        {/* Method and Model */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-primary">{treatment.method || 'Övrigt'}</p>
          <Badge variant="outline" className="text-xs bg-accent text-accent-foreground">
            {treatment.model || treatment.category}
          </Badge>
        </div>

        {/* Treatment Name */}
        <h3 className="font-semibold text-sm group-hover:text-primary line-clamp-2 min-h-[2.5rem]">
          {treatment.name}
        </h3>
        
        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2">
          {treatment.description}
        </p>

        {/* Sessions and Frequency */}
        <div className="space-y-1 flex-1">
          <div className="text-xs text-foreground">
            <span className="font-medium">{treatment.sessions} behandlingar</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {treatment.frequency}
          </div>
        </div>

        {/* Priority Badge */}
        <div className="flex justify-center">
          <Badge className={getPriorityColor(treatment.priority)}>
            {getPriorityText(treatment.priority)}
          </Badge>
        </div>

        {/* Treatment Areas */}
        {treatment.treatmentAreas && treatment.treatmentAreas.length > 0 && (
          <div className="space-y-1">
            <h4 className="text-xs font-medium text-foreground">Behandlingsområden:</h4>
            <div className="flex flex-wrap gap-1">
              {treatment.treatmentAreas.slice(0, 3).map((area, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {area}
                </Badge>
              ))}
              {treatment.treatmentAreas.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{treatment.treatmentAreas.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Pricing - Always at bottom */}
        <div className="mt-auto pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="font-bold text-lg text-primary">
              {treatment.price} kr
            </div>
            <div className="text-xs text-muted-foreground">
              per behandling
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}