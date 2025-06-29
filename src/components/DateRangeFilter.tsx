
import React, { useState } from 'react';
import { Calendar, CalendarDays } from 'lucide-react';
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { sv } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface DateRange {
  from: Date;
  to: Date;
  label: string;
}

interface DateRangeFilterProps {
  onDateRangeChange: (dateRange: DateRange) => void;
  currentRange: DateRange;
}

const predefinedRanges = [
  {
    value: 'today',
    label: 'Idag',
    getRange: () => {
      const today = new Date();
      return { from: today, to: today, label: 'Idag' };
    }
  },
  {
    value: 'thisWeek',
    label: 'Denna vecka',
    getRange: () => {
      const today = new Date();
      return { 
        from: startOfWeek(today, { weekStartsOn: 1 }), 
        to: endOfWeek(today, { weekStartsOn: 1 }), 
        label: 'Denna vecka' 
      };
    }
  },
  {
    value: 'thisMonth',
    label: 'Denna månad',
    getRange: () => {
      const today = new Date();
      return { 
        from: startOfMonth(today), 
        to: endOfMonth(today), 
        label: 'Denna månad' 
      };
    }
  },
  {
    value: 'lastMonth',
    label: 'Förra månaden',
    getRange: () => {
      const lastMonth = subMonths(new Date(), 1);
      return { 
        from: startOfMonth(lastMonth), 
        to: endOfMonth(lastMonth), 
        label: 'Förra månaden' 
      };
    }
  },
  {
    value: 'last7Days',
    label: 'Senaste 7 dagarna',
    getRange: () => {
      const today = new Date();
      return { 
        from: subDays(today, 6), 
        to: today, 
        label: 'Senaste 7 dagarna' 
      };
    }
  },
  {
    value: 'last30Days',
    label: 'Senaste 30 dagarna',
    getRange: () => {
      const today = new Date();
      return { 
        from: subDays(today, 29), 
        to: today, 
        label: 'Senaste 30 dagarna' 
      };
    }
  }
];

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ 
  onDateRangeChange, 
  currentRange 
}) => {
  const [selectedPreset, setSelectedPreset] = useState('today');
  const [customDateRange, setCustomDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const handlePresetChange = (value: string) => {
    setSelectedPreset(value);
    const preset = predefinedRanges.find(range => range.value === value);
    if (preset) {
      onDateRangeChange(preset.getRange());
    }
  };

  const handleCustomDateSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (range?.from && range?.to) {
      setCustomDateRange(range);
      onDateRangeChange({
        from: range.from,
        to: range.to,
        label: `${format(range.from, 'd MMM', { locale: sv })} - ${format(range.to, 'd MMM', { locale: sv })}`
      });
      setShowCustomPicker(false);
      setSelectedPreset('custom');
    } else if (range) {
      setCustomDateRange(range);
    }
  };

  return (
    <div className="flex items-center gap-4 mb-6 p-4 bg-white rounded-lg border">
      <div className="flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Tidsperiod:</span>
      </div>
      
      <Select value={selectedPreset} onValueChange={handlePresetChange}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {predefinedRanges.map((range) => (
            <SelectItem key={range.value} value={range.value}>
              {range.label}
            </SelectItem>
          ))}
          <SelectItem value="custom">Anpassat datum</SelectItem>
        </SelectContent>
      </Select>

      {selectedPreset === 'custom' && (
        <Popover open={showCustomPicker} onOpenChange={setShowCustomPicker}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-60 justify-start text-left font-normal",
                !customDateRange.from && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {customDateRange.from ? (
                customDateRange.to ? (
                  <>
                    {format(customDateRange.from, "d MMM", { locale: sv })} -{" "}
                    {format(customDateRange.to, "d MMM", { locale: sv })}
                  </>
                ) : (
                  format(customDateRange.from, "d MMM", { locale: sv })
                )
              ) : (
                <span>Välj datumintervall</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={customDateRange.from}
              selected={customDateRange.from && customDateRange.to ? {
                from: customDateRange.from,
                to: customDateRange.to
              } : undefined}
              onSelect={handleCustomDateSelect}
              numberOfMonths={2}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      )}

      <div className="text-sm text-gray-500">
        Visar data för: <span className="font-medium">{currentRange.label}</span>
      </div>
    </div>
  );
};
