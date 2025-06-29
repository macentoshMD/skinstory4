
import { Control } from "react-hook-form";
import { ServiceFormValues } from "./types";
import { BaseServiceStep } from "./steps/BaseServiceStep";
import { EquipmentStep } from "./steps/EquipmentStep";
import { ProblemsStep } from "./steps/ProblemsStep";
import { AreasStep } from "./steps/AreasStep";
import { NameDescriptionStep } from "./steps/NameDescriptionStep";

interface StepRendererProps {
  currentStep: number;
  control: Control<ServiceFormValues>;
}

export function StepRenderer({ currentStep, control }: StepRendererProps) {
  switch (currentStep) {
    case 1:
      return <BaseServiceStep control={control} />;
    case 2:
      return <EquipmentStep control={control} />;
    case 3:
      return <ProblemsStep control={control} />;
    case 4:
      return <AreasStep control={control} />;
    case 5:
      return <NameDescriptionStep control={control} />;
    default:
      return null;
  }
}
