import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket, Zap, Target, Check } from 'lucide-react';

interface Phase {
  id: string;
  name: string;
  weeks: string;
  icon: string;
  clinicCare: string;
  homeCare: string;
}

interface PhasesSectionProps {
  phases: Phase[];
}

const getPhaseIcon = (iconName: string) => {
  switch (iconName) {
    case 'rocket': return <Rocket className="h-5 w-5" />;
    case 'zap': return <Zap className="h-5 w-5" />;
    case 'target': return <Target className="h-5 w-5" />;
    case 'check': return <Check className="h-5 w-5" />;
    default: return <Rocket className="h-5 w-5" />;
  }
};

const getPhaseColor = (index: number) => {
  const colors = [
    'from-green-50 to-green-100 border-green-200',
    'from-blue-50 to-blue-100 border-blue-200',
    'from-purple-50 to-purple-100 border-purple-200'
  ];
  return colors[index % colors.length];
};

const getPhaseTextColor = (index: number) => {
  const colors = ['text-green-900', 'text-blue-900', 'text-purple-900'];
  return colors[index % colors.length];
};

const PhasesSection = ({ phases }: PhasesSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Behandlingsfaser</h3>
      <div className="grid gap-4">
        {phases.map((phase, index) => (
          <Card key={phase.id} className={`bg-gradient-to-r ${getPhaseColor(index)}`}>
            <CardHeader className="pb-3">
              <CardTitle className={`flex items-center gap-2 ${getPhaseTextColor(index)}`}>
                {getPhaseIcon(phase.icon)}
                {phase.name}
                <Badge variant="outline" className="bg-white/60">
                  {phase.weeks}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-1">Klinikvård:</h4>
                  <p className="text-sm text-gray-600">{phase.clinicCare}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-1">Hemmavård:</h4>
                  <p className="text-sm text-gray-600">{phase.homeCare}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PhasesSection;