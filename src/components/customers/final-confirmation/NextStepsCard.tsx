
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface NextStepsCardProps {
  riskLevel: string;
}

export function NextStepsCard({ riskLevel }: NextStepsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-indigo-600" />
          Nästa steg
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Konsultation sparas i kundens journal
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Behandlingsplan skapas baserat på bedömning
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Fotodokumentation arkiveras
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Uppföljning schemaläggs vid behov
          </li>
          {riskLevel === 'high' && (
            <li className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-red-600">Läkarkonsultation krävs före behandling</span>
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
