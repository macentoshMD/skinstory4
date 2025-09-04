import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkScheduleEntry } from "@/pages/WorkSchedule";

interface WeeklyTemplateProps {
  weeklyTemplate: Record<number, Omit<WorkScheduleEntry, 'date'> | null>;
  onUpdateTemplate: (template: Record<number, Omit<WorkScheduleEntry, 'date'> | null>) => void;
  calculateWorkHours: (startTime: string, endTime: string, breakDuration: number) => number;
}

export const WeeklyTemplate = ({ weeklyTemplate, onUpdateTemplate, calculateWorkHours }: WeeklyTemplateProps) => {
  const weekDays = [
    { key: 1, name: 'Måndag' },
    { key: 2, name: 'Tisdag' },
    { key: 3, name: 'Onsdag' },
    { key: 4, name: 'Torsdag' },
    { key: 5, name: 'Fredag' },
    { key: 6, name: 'Lördag' },
    { key: 0, name: 'Söndag' },
  ];

  const updateDayTemplate = (dayKey: number, updates: Partial<Omit<WorkScheduleEntry, 'date'>> | null) => {
    const current = weeklyTemplate[dayKey];
    
    if (updates === null) {
      onUpdateTemplate({ ...weeklyTemplate, [dayKey]: null });
    } else {
      onUpdateTemplate({
        ...weeklyTemplate,
        [dayKey]: {
          startTime: "08:00",
          endTime: "17:00",
          breakDuration: 60,
          isWorkDay: true,
          ...current,
          ...updates,
        }
      });
    }
  };

  const totalWeeklyHours = Object.values(weeklyTemplate).reduce((total, day) => {
    if (!day?.isWorkDay) return total;
    return total + calculateWorkHours(day.startTime, day.endTime, day.breakDuration);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {weekDays.map((day) => {
          const template = weeklyTemplate[day.key];
          const workHours = template?.isWorkDay 
            ? calculateWorkHours(template.startTime, template.endTime, template.breakDuration)
            : 0;

          return (
            <Card key={day.key}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{day.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={template?.isWorkDay ?? false}
                      onCheckedChange={(checked) => 
                        updateDayTemplate(day.key, checked ? { isWorkDay: true } : null)
                      }
                    />
                    <Label className="text-sm">Arbetsdag</Label>
                  </div>
                </div>
              </CardHeader>
              
              {template?.isWorkDay && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`start-${day.key}`}>Starttid</Label>
                      <Input
                        id={`start-${day.key}`}
                        type="time"
                        value={template.startTime}
                        onChange={(e) => updateDayTemplate(day.key, { startTime: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`end-${day.key}`}>Sluttid</Label>
                      <Input
                        id={`end-${day.key}`}
                        type="time"
                        value={template.endTime}
                        onChange={(e) => updateDayTemplate(day.key, { endTime: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`break-${day.key}`}>Rast (min)</Label>
                      <Input
                        id={`break-${day.key}`}
                        type="number"
                        value={template.breakDuration}
                        onChange={(e) => updateDayTemplate(day.key, { breakDuration: Number(e.target.value) })}
                        min="0"
                        step="15"
                      />
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Arbetstid: <span className="font-medium text-primary">{workHours} timmar</span>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Total veckoarbetstid:</span>
            <span className="text-xl font-semibold text-primary">{totalWeeklyHours} timmar</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};