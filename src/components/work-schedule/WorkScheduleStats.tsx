import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, Percent, CheckCircle } from "lucide-react";
import { format, eachDayOfInterval, startOfMonth, endOfMonth, isWeekend } from "date-fns";
import { sv } from "date-fns/locale";
import { WorkScheduleEntry } from "@/pages/WorkSchedule";

interface WorkScheduleStatsProps {
  scheduleEntries: Record<string, WorkScheduleEntry>;
  currentMonth: Date;
  calculateWorkHours: (startTime: string, endTime: string, breakDuration: number) => number;
}

export const WorkScheduleStats = ({ scheduleEntries, currentMonth, calculateWorkHours }: WorkScheduleStatsProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Calculate working days in month (exclude weekends)
  const workingDaysInMonth = monthDays.filter(day => !isWeekend(day)).length;
  
  // Full-time hours (8 hours per working day)
  const fullTimeHours = workingDaysInMonth * 8;
  
  // Calculate actual scheduled hours for the month
  const scheduledHours = monthDays.reduce((total, day) => {
    const dateString = format(day, 'yyyy-MM-dd');
    const entry = scheduleEntries[dateString];
    
    if (!entry?.isWorkDay) return total;
    
    return total + calculateWorkHours(entry.startTime, entry.endTime, entry.breakDuration);
  }, 0);
  
  // Calculate scheduled working days
  const scheduledWorkDays = monthDays.filter(day => {
    const dateString = format(day, 'yyyy-MM-dd');
    return scheduleEntries[dateString]?.isWorkDay;
  }).length;
  
  // Calculate percentage of full-time
  const workPercentage = fullTimeHours > 0 ? Math.round((scheduledHours / fullTimeHours) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Schemalagda timmar</p>
              <p className="text-xl font-semibold">{scheduledHours.toFixed(1)}h</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Arbetsdagar</p>
              <p className="text-xl font-semibold">{scheduledWorkDays}/{workingDaysInMonth}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Percent className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Av heltid</p>
              <p className="text-xl font-semibold">{workPercentage}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Aktuell månad</p>
              <p className="text-xl font-semibold">
                {format(currentMonth, 'MMM', { locale: sv })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};