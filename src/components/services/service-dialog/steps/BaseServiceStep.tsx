
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BASE_SERVICES } from "@/types/base-services";
import { Control } from "react-hook-form";
import { ServiceFormValues } from "../types";

interface BaseServiceStepProps {
  control: Control<ServiceFormValues>;
}

export function BaseServiceStep({ control }: BaseServiceStepProps) {
  return (
    <FormField
      control={control}
      name="baseServiceId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Välj grundtjänst</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Välj typ av behandling" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {BASE_SERVICES.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  <div>
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-muted-foreground">{service.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
