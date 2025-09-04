import { format, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { sv } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TimeEntryForm } from "./TimeEntryForm";
import { WorkScheduleEntry } from "@/pages/WorkSchedule";
import { Edit, Info } from "lucide-react";
import { getRedDayInfo } from "@/utils/swedishHolidays";

interface WorkScheduleWeekProps {
  currentWeek: Date;
  scheduleEntries: Record<string, WorkScheduleEntry>;
  onUpdateEntry: (date: string, entry: Partial<WorkScheduleEntry>) => void;
  calculateWorkHours: (startTime: string, endTime: string, breakDuration: number) => number;
}

export const WorkScheduleWeek = ({ 
  currentWeek, 
  scheduleEntries, 
  onUpdateEntry,
  calculateWorkHours 
}: WorkScheduleWeekProps) => {
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="space-y-4">
      {days.map((day) => {
        const dateString = format(day, 'yyyy-MM-dd');
        const entry = scheduleEntries[dateString];
        const redDayInfo = getRedDayInfo(day);
        const workHours = entry ? calculateWorkHours(entry.startTime, entry.endTime, entry.breakDuration) : 0;
        
        return (
          <div 
            key={dateString}
            className={`flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 ${
              redDayInfo.isRedDay ? 'border-red-200 bg-red-50/50' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-center min-w-[100px]">
                <div className="flex items-center gap-2 justify-center">
                  <div>
                    <p className={`font-medium ${redDayInfo.isRedDay ? 'text-red-700' : ''}`}>
                      {format(day, 'eeee', { locale: sv })}
                    </p>
                    <p className={`text-sm ${redDayInfo.isRedDay ? 'text-red-600' : 'text-muted-foreground'}`}>
                      {format(day, 'd MMM', { locale: sv })}
                    </p>
                  </div>
                  {redDayInfo.isRedDay && redDayInfo.name && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-red-600" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{redDayInfo.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
              
              {entry?.isWorkDay ? (
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">Starttid: </span>
                    <span className="font-medium">{entry.startTime}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Sluttid: </span>
                    <span className="font-medium">{entry.endTime}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rast: </span>
                    <span className="font-medium">{entry.breakDuration} min</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Arbetstid: </span>
                    <span className="font-medium text-primary">{workHours.toFixed(1)}h</span>
                  </div>
                </div>
              ) : (
                <Badge variant={redDayInfo.isRedDay ? "destructive" : "secondary"}>
                  {redDayInfo.isRedDay ? "Röd dag" : "Ledig dag"}
                </Badge>
              )}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
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
          </div>
        );
      })}
    </div>
  );
};