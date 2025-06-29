
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { TREATMENT_AREAS } from "@/types/base-services";
import { Control } from "react-hook-form";
import { ServiceFormValues } from "../types";

interface AreasStepProps {
  control: Control<ServiceFormValues>;
}

export function AreasStep({ control }: AreasStepProps) {
  return (
    <FormField
      control={control}
      name="selectedAreas"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Vilka områden behandlas?</FormLabel>
          <div className="grid grid-cols-2 gap-3">
            {TREATMENT_AREAS.map((area) => (
              <div key={area.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <Checkbox
                  checked={field.value.includes(area.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      field.onChange([...field.value, area.id]);
                    } else {
                      field.onChange(field.value.filter(id => id !== area.id));
                    }
                  }}
                />
                <div className="flex-1">
                  <div className="font-medium">{area.name}</div>
                  <div className="text-sm text-muted-foreground">{area.bodyRegion}</div>
                </div>
              </div>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
