import { format, eachDayOfInterval, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isToday } from "date-fns";
import { sv } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TimeEntryForm } from "./TimeEntryForm";
import { WorkScheduleEntry } from "@/pages/WorkSchedule";

interface WorkScheduleCalendarProps {
  currentMonth: Date;
  scheduleEntries: Record<string, WorkScheduleEntry>;
  onUpdateEntry: (date: string, entry: Partial<WorkScheduleEntry>) => void;
  calculateWorkHours: (startTime: string, endTime: string, breakDuration: number) => number;
}

export const WorkScheduleCalendar = ({ 
  currentMonth, 
  scheduleEntries, 
  onUpdateEntry,
  calculateWorkHours 
}: WorkScheduleCalendarProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  
  const weekDays = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const dateString = format(day, 'yyyy-MM-dd');
          const entry = scheduleEntries[dateString];
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const workHours = entry ? calculateWorkHours(entry.startTime, entry.endTime, entry.breakDuration) : 0;
          
          return (
            <Dialog key={dateString}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className={`
                    h-20 p-2 flex flex-col items-start justify-start border border-border
                    ${!isCurrentMonth ? 'text-muted-foreground bg-muted/50' : ''}
                    ${isToday(day) ? 'border-primary bg-primary/5' : ''}
                    ${entry?.isWorkDay ? 'bg-green-50 hover:bg-green-100' : 'hover:bg-accent'}
                  `}
                >
                  <span className="text-sm font-medium">
                    {format(day, 'd')}
                  </span>
                  {entry?.isWorkDay && (
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>{entry.startTime} - {entry.endTime}</div>
                      <div className="font-medium text-primary">{workHours}h</div>
                    </div>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Arbetstid {format(day, 'eeee d MMMM', { locale: sv })}
                  </DialogTitle>
                </DialogHeader>
                <TimeEntryForm
                  date={dateString}
                  entry={entry}
                  onSave={(entryData) => onUpdateEntry(dateString, entryData)}
                  calculateWorkHours={calculateWorkHours}
                />
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </div>
  );
};