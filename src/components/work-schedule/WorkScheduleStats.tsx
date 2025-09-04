import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, Percent, CheckCircle, Sun, AlertCircle } from "lucide-react";
import { format, eachDayOfInterval, startOfMonth, endOfMonth, isWeekend } from "date-fns";
import { sv } from "date-fns/locale";
import { WorkScheduleEntry } from "@/pages/WorkSchedule";
import { isRedDay, getRedDayInfo } from "@/utils/swedishHolidays";
interface WorkScheduleStatsProps {
  scheduleEntries: Record<string, WorkScheduleEntry>;
  currentMonth: Date;
  calculateWorkHours: (startTime: string, endTime: string, breakDuration: number) => number;
}
export const WorkScheduleStats = ({
  scheduleEntries,
  currentMonth,
  calculateWorkHours
}: WorkScheduleStatsProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({
    start: monthStart,
    end: monthEnd
  });

  // Calculate working days in month (exclude weekends and red days)
  const workingDaysInMonth = monthDays.filter(day => !isRedDay(day)).length;

  // Full-time hours (8 hours per working day)
  const fullTimeHours = workingDaysInMonth * 8;

  // Calculate different types of work hours for the month
  const workHoursByType = monthDays.reduce((acc, day) => {
    const dateString = format(day, 'yyyy-MM-dd');
    const entry = scheduleEntries[dateString];
    if (!entry?.isWorkDay) return acc;
    const dayHours = calculateWorkHours(entry.startTime, entry.endTime, entry.breakDuration);
    const redDayInfo = getRedDayInfo(day);
    if (redDayInfo.isRedDay) {
      acc.holidayHours += dayHours;
    } else {
      const regularHours = Math.min(dayHours, 8);
      const overtimeHours = Math.max(dayHours - 8, 0);
      acc.regularHours += regularHours;
      acc.overtimeHours += overtimeHours;
    }
    acc.totalHours += dayHours;
    return acc;
  }, {
    totalHours: 0,
    regularHours: 0,
    holidayHours: 0,
    overtimeHours: 0
  });

  // Calculate scheduled working days
  const scheduledWorkDays = monthDays.filter(day => {
    const dateString = format(day, 'yyyy-MM-dd');
    return scheduleEntries[dateString]?.isWorkDay;
  }).length;

  // Calculate percentage of full-time
  const workPercentage = fullTimeHours > 0 ? Math.round(workHoursByType.totalHours / fullTimeHours * 100) : 0;
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Totala timmar</p>
              <p className="text-xl font-semibold">{workHoursByType.totalHours.toFixed(1)}h</p>
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
              <p className="text-sm text-muted-foreground">Vardag</p>
              <p className="text-xl font-semibold">{workHoursByType.regularHours.toFixed(1)}h</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Sun className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Helg</p>
              <p className="text-xl font-semibold">{workHoursByType.holidayHours.toFixed(1)}h</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertCircle className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Övertid</p>
              <p className="text-xl font-semibold">{workHoursByType.overtimeHours.toFixed(1)}h</p>
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
              <p className="text-sm text-muted-foreground">Arbetsdagar</p>
              <p className="text-xl font-semibold">{scheduledWorkDays}/{workingDaysInMonth}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};