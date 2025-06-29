
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { EQUIPMENT } from "@/types/services";
import { Control } from "react-hook-form";
import { ServiceFormValues } from "../types";

interface EquipmentStepProps {
  control: Control<ServiceFormValues>;
}

export function EquipmentStep({ control }: EquipmentStepProps) {
  return (
    <FormField
      control={control}
      name="selectedEquipment"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Välj utrustning (valfritt)</FormLabel>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {EQUIPMENT.map((equipment) => (
              <div key={equipment.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <Checkbox
                  checked={field.value.includes(equipment.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      field.onChange([...field.value, equipment.id]);
                    } else {
                      field.onChange(field.value.filter(id => id !== equipment.id));
                    }
                  }}
                />
                <div className="flex-1">
                  <div className="font-medium">{equipment.name}</div>
                  <div className="text-sm text-muted-foreground">{equipment.brand} - {equipment.model}</div>
                  <div className="text-sm text-muted-foreground">{equipment.description}</div>
                  <Badge className="mt-1" variant="outline">{equipment.type}</Badge>
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
