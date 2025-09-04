import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { WorkScheduleEntry } from "@/pages/WorkSchedule";

interface TimeEntryFormProps {
  date: string;
  entry?: WorkScheduleEntry;
  onSave: (entry: Partial<WorkScheduleEntry>) => void;
  calculateWorkHours: (startTime: string, endTime: string, breakDuration: number) => number;
}

export const TimeEntryForm = ({ date, entry, onSave, calculateWorkHours }: TimeEntryFormProps) => {
  const [isWorkDay, setIsWorkDay] = useState(entry?.isWorkDay ?? true);
  const [startTime, setStartTime] = useState(entry?.startTime ?? "08:00");
  const [endTime, setEndTime] = useState(entry?.endTime ?? "17:00");
  const [breakDuration, setBreakDuration] = useState(entry?.breakDuration ?? 60);

  const workHours = isWorkDay ? calculateWorkHours(startTime, endTime, breakDuration) : 0;

  const handleSave = () => {
    onSave({
      date,
      isWorkDay,
      startTime: isWorkDay ? startTime : "",
      endTime: isWorkDay ? endTime : "",
      breakDuration: isWorkDay ? breakDuration : 0,
    });
  };

  const handleDelete = () => {
    onSave({
      date,
      isWorkDay: false,
      startTime: "",
      endTime: "",
      breakDuration: 0,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Switch
          id="is-work-day"
          checked={isWorkDay}
          onCheckedChange={setIsWorkDay}
        />
        <Label htmlFor="is-work-day">Arbetsdag</Label>
      </div>

      {isWorkDay && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Starttid</Label>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">Sluttid</Label>
              <Input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="break-duration">Rast (minuter)</Label>
            <Input
              id="break-duration"
              type="number"
              value={breakDuration}
              onChange={(e) => setBreakDuration(Number(e.target.value))}
              min="0"
              step="15"
            />
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Arbetstid:</span>
              <span className="text-lg font-semibold text-primary">{workHours} timmar</span>
            </div>
          </div>
        </>
      )}

      <DialogFooter className="gap-2">
        {entry && (
          <DialogClose asChild>
            <Button variant="destructive" onClick={handleDelete}>
              Ta bort
            </Button>
          </DialogClose>
        )}
        <DialogClose asChild>
          <Button variant="outline">Avbryt</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button onClick={handleSave}>Spara</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
};