import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Clock, Percent, Calendar as CalendarIcon, Copy } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, getWeeksInMonth, startOfWeek, endOfWeek, addWeeks } from "date-fns";
import { sv } from "date-fns/locale";
import { WorkScheduleCalendar } from "@/components/work-schedule/WorkScheduleCalendar";
import { WorkScheduleWeek } from "@/components/work-schedule/WorkScheduleWeek";
import { WeeklyTemplate } from "@/components/work-schedule/WeeklyTemplate";
import { WorkScheduleStats } from "@/components/work-schedule/WorkScheduleStats";
import { toast } from "sonner";

export interface WorkScheduleEntry {
  date: string;
  startTime: string;
  endTime: string;
  breakDuration: number; // minutes
  isWorkDay: boolean;
}

const WorkSchedule = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [scheduleEntries, setScheduleEntries] = useState<Record<string, WorkScheduleEntry>>({});
  const [weeklyTemplate, setWeeklyTemplate] = useState<Record<number, Omit<WorkScheduleEntry, 'date'> | null>>({
    1: { startTime: "08:00", endTime: "17:00", breakDuration: 60, isWorkDay: true }, // Monday
    2: { startTime: "08:00", endTime: "17:00", breakDuration: 60, isWorkDay: true }, // Tuesday
    3: { startTime: "08:00", endTime: "17:00", breakDuration: 60, isWorkDay: true }, // Wednesday
    4: { startTime: "08:00", endTime: "17:00", breakDuration: 60, isWorkDay: true }, // Thursday
    5: { startTime: "08:00", endTime: "17:00", breakDuration: 60, isWorkDay: true }, // Friday
    6: null, // Saturday
    0: null, // Sunday
  });

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1));
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek(prev => direction === 'prev' ? addWeeks(prev, -1) : addWeeks(prev, 1));
  };

  const applyWeeklyTemplate = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    const newEntries = { ...scheduleEntries };
    
    days.forEach(day => {
      const dayOfWeek = day.getDay();
      const dateString = format(day, 'yyyy-MM-dd');
      const template = weeklyTemplate[dayOfWeek];
      
      if (template) {
        newEntries[dateString] = {
          date: dateString,
          ...template
        };
      } else {
        // Remove entry for non-work days
        delete newEntries[dateString];
      }
    });
    
    setScheduleEntries(newEntries);
  };

  const updateScheduleEntry = (date: string, entry: Partial<WorkScheduleEntry>) => {
    setScheduleEntries(prev => ({
      ...prev,
      [date]: { 
        date,
        startTime: "08:00",
        endTime: "17:00", 
        breakDuration: 60,
        isWorkDay: true,
        ...prev[date],
        ...entry
      }
    }));
  };

  const calculateWorkHours = (startTime: string, endTime: string, breakDuration: number): number => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    let startMinutes = startHour * 60 + startMin;
    let endMinutes = endHour * 60 + endMin;
    
    // Handle overnight shifts (e.g., 23:00 to 07:00)
    if (endMinutes < startMinutes) {
      endMinutes += 24 * 60; // Add 24 hours to end time
    }
    
    const totalMinutes = endMinutes - startMinutes - breakDuration;
    return Math.max(0, totalMinutes / 60);
  };

  const copyFromPreviousMonth = () => {
    const prevMonth = subMonths(currentMonth, 1);
    const prevMonthStart = startOfMonth(prevMonth);
    const prevMonthEnd = endOfMonth(prevMonth);
    const prevMonthDays = eachDayOfInterval({ start: prevMonthStart, end: prevMonthEnd });
    
    const currentMonthStart = startOfMonth(currentMonth);
    const currentMonthEnd = endOfMonth(currentMonth);
    const currentMonthDays = eachDayOfInterval({ start: currentMonthStart, end: currentMonthEnd });
    
    const newEntries = { ...scheduleEntries };
    
    // Copy entries by matching day of week
    currentMonthDays.forEach(currentDay => {
      const dayOfWeek = currentDay.getDay();
      const currentDateString = format(currentDay, 'yyyy-MM-dd');
      
      // Find corresponding day in previous month
      const prevDayWithSameWeekday = prevMonthDays.find(prevDay => prevDay.getDay() === dayOfWeek);
      
      if (prevDayWithSameWeekday) {
        const prevDateString = format(prevDayWithSameWeekday, 'yyyy-MM-dd');
        const prevEntry = scheduleEntries[prevDateString];
        
        if (prevEntry) {
          newEntries[currentDateString] = {
            ...prevEntry,
            date: currentDateString
          };
        } else {
          // Remove entry if previous month had no entry for this day type
          delete newEntries[currentDateString];
        }
      }
    });
    
    setScheduleEntries(newEntries);
    toast.success("Schema kopierat från föregående månad");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Arbetstid</h1>
          <p className="text-muted-foreground mt-1">Hantera ditt arbetstidsschema</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={copyFromPreviousMonth} variant="outline" className="flex items-center gap-2">
            <Copy className="h-4 w-4" />
            Kopiera föregående månad
          </Button>
          <Button onClick={applyWeeklyTemplate} variant="outline">
            Använd veckomall
          </Button>
        </div>
      </div>

      <WorkScheduleStats 
        scheduleEntries={scheduleEntries}
        currentMonth={currentMonth}
        calculateWorkHours={calculateWorkHours}
      />

      <Tabs defaultValue="month" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="month" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Månadsvy
          </TabsTrigger>
          <TabsTrigger value="week" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Veckovy
          </TabsTrigger>
          <TabsTrigger value="template" className="flex items-center gap-2">
            <Percent className="h-4 w-4" />
            Veckomall
          </TabsTrigger>
        </TabsList>

        <TabsContent value="month">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {format(currentMonth, 'MMMM yyyy', { locale: sv })}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigateMonth('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigateMonth('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <WorkScheduleCalendar
                currentMonth={currentMonth}
                scheduleEntries={scheduleEntries}
                onUpdateEntry={updateScheduleEntry}
                calculateWorkHours={calculateWorkHours}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  Vecka {format(currentWeek, 'w, yyyy', { locale: sv })}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigateWeek('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigateWeek('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <WorkScheduleWeek
                currentWeek={currentWeek}
                scheduleEntries={scheduleEntries}
                onUpdateEntry={updateScheduleEntry}
                calculateWorkHours={calculateWorkHours}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="template">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Veckomall</CardTitle>
              <p className="text-muted-foreground">
                Ställ in ditt standardschema som kan tillämpas på hela månader
              </p>
            </CardHeader>
            <CardContent>
              <WeeklyTemplate
                weeklyTemplate={weeklyTemplate}
                onUpdateTemplate={setWeeklyTemplate}
                calculateWorkHours={calculateWorkHours}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkSchedule;