import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TreatmentOverviewCardProps {
  plan: {
    duration: string;
    clinicSessions: number;
    homeProducts: number;
    expectedResults: string;
  };
}

const TreatmentOverviewCard = ({ plan }: TreatmentOverviewCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Behandlingsöversikt</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{plan.duration}</div>
            <p className="text-sm text-muted-foreground">Varaktighet</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{plan.clinicSessions}</div>
            <p className="text-sm text-muted-foreground">Klinikbesök</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{plan.homeProducts}</div>
            <p className="text-sm text-muted-foreground">Hemprodukter</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{plan.expectedResults}</div>
            <p className="text-sm text-muted-foreground">Förväntat resultat</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TreatmentOverviewCard;