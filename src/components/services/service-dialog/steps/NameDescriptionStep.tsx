
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Control, useWatch } from "react-hook-form";
import { ServiceFormValues } from "../types";
import { generateKeywords } from "../utils";

interface NameDescriptionStepProps {
  control: Control<ServiceFormValues>;
}

export function NameDescriptionStep({ control }: NameDescriptionStepProps) {
  const values = useWatch({ control });
  const previewKeywords = generateKeywords(values as ServiceFormValues);

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="customName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Namn på behandling</FormLabel>
            <FormControl>
              <Input placeholder="T.ex. DermaPen Microneedling Dekolletage" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Beskrivning</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Beskriv behandlingen och vad den åstadkommer" 
                className="resize-none" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div>
        <FormLabel>Automatiskt genererade sökord</FormLabel>
        <div className="flex flex-wrap gap-2 mt-2 p-3 bg-muted rounded-lg">
          {previewKeywords.map((keyword, idx) => (
            <Badge key={idx} variant="secondary">
              {keyword}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Dessa sökord genereras automatiskt baserat på dina val
        </p>
      </div>
    </div>
  );
}
