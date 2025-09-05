import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { addMonths, subMonths, format, startOfMonth } from "date-fns";
import { sv } from "date-fns/locale";

import { SalaryOverview } from "@/components/salary/SalaryOverview";
import { CommissionBreakdown } from "@/components/salary/CommissionBreakdown";
import { DateRangeFilter, DateRange } from "@/components/DateRangeFilter";
import { generateExtendedMockActivities } from "@/utils/mockActivityGenerator";
import { calculateSalaryData, generateCommissionEntries } from "@/utils/salaryCalculations";

// Mock work schedule for demo
const generateMockWorkSchedule = (month: Date) => {
  const entries: Record<string, any> = {};
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = format(new Date(month.getFullYear(), month.getMonth(), day), 'yyyy-MM-dd');
    const isWeekend = new Date(month.getFullYear(), month.getMonth(), day).getDay() === 0 || 
                     new Date(month.getFullYear(), month.getMonth(), day).getDay() === 6;
    
    // Work most weekdays
    if (!isWeekend && Math.random() > 0.1) {
      entries[dateStr] = {
        isWorkDay: true,
        startTime: '08:00',
        endTime: Math.random() > 0.7 ? '18:00' : '17:00', // Some overtime
        breakDuration: 30,
      };
    }
    // Some weekend work
    else if (isWeekend && Math.random() > 0.8) {
      entries[dateStr] = {
        isWorkDay: true,
        startTime: '09:00',
        endTime: '15:00',
        breakDuration: 30,
      };
    }
  }
  
  return entries;
};

export default function Salary() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfMonth(currentMonth),
    to: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0),
    label: format(currentMonth, 'MMMM yyyy', { locale: sv })
  });

  const activities = useMemo(() => {
    return generateExtendedMockActivities(dateRange);
  }, [dateRange]);

  const mockSchedule = useMemo(() => {
    return generateMockWorkSchedule(currentMonth);
  }, [currentMonth]);

  const salaryData = useMemo(() => {
    return calculateSalaryData(activities, mockSchedule, currentMonth);
  }, [activities, mockSchedule, currentMonth]);

  const commissionEntries = useMemo(() => {
    const monthActivities = activities.filter(activity => {
      const activityDate = new Date(activity.timestamp);
      return activityDate >= dateRange.from && activityDate <= dateRange.to;
    });
    return generateCommissionEntries(monthActivities);
  }, [activities, dateRange]);

  const handlePreviousMonth = () => {
    const newMonth = subMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    setDateRange({
      from: startOfMonth(newMonth),
      to: new Date(newMonth.getFullYear(), newMonth.getMonth() + 1, 0),
      label: format(newMonth, 'MMMM yyyy', { locale: sv })
    });
  };

  const handleNextMonth = () => {
    const newMonth = addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    setDateRange({
      from: startOfMonth(newMonth),
      to: new Date(newMonth.getFullYear(), newMonth.getMonth() + 1, 0),
      label: format(newMonth, 'MMMM yyyy', { locale: sv })
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header with month navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-xl font-semibold">
              {format(currentMonth, 'MMMM yyyy', { locale: sv })}
            </h1>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextMonth}
            disabled={format(currentMonth, 'yyyy-MM') === format(new Date(), 'yyyy-MM')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <DateRangeFilter
          currentRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </div>

      <Tabs defaultValue="oversikt" className="space-y-4">
        <TabsList>
          <TabsTrigger value="oversikt">Löneöversikt</TabsTrigger>
          <TabsTrigger value="provision">Provision & Bonus</TabsTrigger>
        </TabsList>
        
        <TabsContent value="oversikt" className="space-y-4">
          <SalaryOverview salaryData={salaryData} />
        </TabsContent>
        
        <TabsContent value="provision" className="space-y-4">
          <CommissionBreakdown 
            salaryData={salaryData} 
            commissionEntries={commissionEntries}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}