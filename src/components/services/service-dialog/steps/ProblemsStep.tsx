
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { PROBLEM_AREAS } from "@/types/base-services";
import { Control } from "react-hook-form";
import { ServiceFormValues } from "../types";

interface ProblemsStepProps {
  control: Control<ServiceFormValues>;
}

export function ProblemsStep({ control }: ProblemsStepProps) {
  return (
    <FormField
      control={control}
      name="selectedProblems"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Vilka problem behandlas?</FormLabel>
          <div className="grid grid-cols-2 gap-3">
            {PROBLEM_AREAS.map((problem) => (
              <div key={problem.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <Checkbox
                  checked={field.value.includes(problem.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      field.onChange([...field.value, problem.id]);
                    } else {
                      field.onChange(field.value.filter(id => id !== problem.id));
                    }
                  }}
                />
                <div className="flex-1">
                  <div className="font-medium">{problem.name}</div>
                  <div className="text-sm text-muted-foreground">{problem.description}</div>
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
