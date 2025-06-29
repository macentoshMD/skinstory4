
import { Progress } from "@/components/ui/progress";
import { STEPS } from "./types";

interface WizardProgressProps {
  currentStep: number;
}

export function WizardProgress({ currentStep }: WizardProgressProps) {
  return (
    <div className="space-y-2">
      <Progress value={(currentStep / STEPS.length) * 100} className="w-full" />
      <div className="flex justify-between text-sm text-muted-foreground">
        {STEPS.map((step) => (
          <span 
            key={step.id} 
            className={currentStep === step.id ? "font-medium text-foreground" : ""}
          >
            {step.title}
          </span>
        ))}
      </div>
    </div>
  );
}
