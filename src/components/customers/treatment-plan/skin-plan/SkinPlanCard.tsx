
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Settings, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { SkinPlan, ConfiguredTreatment } from '@/types/treatment-methods';

interface SkinPlanCardProps {
  skinPlan: SkinPlan;
  onEdit: (skinPlan: SkinPlan) => void;
  onDelete: (skinPlanId: string) => void;
}

export function SkinPlanCard({ skinPlan, onEdit, onDelete }: SkinPlanCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planned': return 'Planerad';
      case 'active': return 'Aktiv';
      case 'completed': return 'Avslutad';
      case 'paused': return 'Pausad';
      default: return status;
    }
  };

  const totalPrice = skinPlan.treatments.reduce((sum, treatment) => sum + treatment.pricing.totalPrice, 0);
  const completedSessions = skinPlan.treatments.reduce((sum, treatment) => sum + treatment.configuration.completedSessions, 0);
  const totalSessions = skinPlan.treatments.reduce((sum, treatment) => sum + treatment.configuration.numberOfSessions, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>Behandlingsplan</span>
            <Badge className={getStatusColor(skinPlan.status)}>
              {getStatusText(skinPlan.status)}
            </Badge>
          </CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(skinPlan)}>
              <Settings className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => onDelete(skinPlan.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Plan Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Startdatum</span>
            <p className="font-medium">{format(skinPlan.startDate, 'dd MMM yyyy', { locale: sv })}</p>
          </div>
          <div>
            <span className="text-gray-500">Slutdatum</span>
            <p className="font-medium">{format(skinPlan.endDate, 'dd MMM yyyy', { locale: sv })}</p>
          </div>
          <div>
            <span className="text-gray-500">Sessioner</span>
            <p className="font-medium">{completedSessions}/{totalSessions}</p>
          </div>
          <div>
            <span className="text-gray-500">Totalt pris</span>
            <p className="font-medium">{totalPrice.toLocaleString('sv-SE')} kr</p>
          </div>
        </div>

        {/* Treatments */}
        <div>
          <h4 className="font-medium mb-2">Behandlingar</h4>
          <div className="space-y-2">
            {skinPlan.treatments.map(treatment => (
              <div key={treatment.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium">{treatment.serviceName}</h5>
                  <span className="text-sm text-gray-500">
                    {treatment.configuration.completedSessions}/{treatment.configuration.numberOfSessions} sessioner
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Utrustning: {treatment.configuration.equipment}</p>
                  <p>Intervall: {treatment.configuration.intervalWeeks} veckor</p>
                  <p>Pris: {treatment.pricing.totalPrice.toLocaleString('sv-SE')} kr</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        {skinPlan.followUpDates.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Kommande uppföljningar</h4>
            <div className="space-y-2">
              {skinPlan.followUpDates
                .filter(appointment => !appointment.completed && appointment.date > new Date())
                .slice(0, 2)
                .map(appointment => (
                  <div key={appointment.id} className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{format(appointment.date, 'dd MMM yyyy', { locale: sv })}</span>
                    <Badge variant="outline" className="text-xs">
                      {appointment.purpose === 'follow-up' ? 'Uppföljning' : 'Utvärdering'}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{appointment.type === 'clinic' ? 'Klinik' : 'Online'}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Framsteg</span>
            <span className="text-sm text-gray-500">
              {Math.round((completedSessions / totalSessions) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedSessions / totalSessions) * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
