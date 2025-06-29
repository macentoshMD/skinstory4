
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Service } from "@/types/services";
import { BASE_SERVICES } from "@/types/base-services";
import { serviceFormSchema, ServiceFormValues, STEPS } from "./types";
import { generateKeywords } from "./utils";
import { StepRenderer } from "./StepRenderer";
import { WizardProgress } from "./WizardProgress";

interface ServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service?: Service;
  onSave: (service: Partial<Service>) => void;
}

export function ServiceDialog({ open, onOpenChange, service, onSave }: ServiceDialogProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      baseServiceId: "",
      selectedEquipment: [],
      selectedProblems: [],
      selectedAreas: [],
      customName: "",
      description: "",
    },
  });

  const onSubmit = (values: ServiceFormValues) => {
    const keywords = generateKeywords(values);
    
    const serviceData: Partial<Service> = {
      name: values.customName,
      categoryId: BASE_SERVICES.find(s => s.id === values.baseServiceId)?.name || "",
      description: values.description,
      equipment: values.selectedEquipment.map(equipId => ({
        equipmentId: equipId,
        settings: {},
        isRequired: true
      })),
      skinTypes: ["all"],
      problemAreas: values.selectedProblems,
      contraindications: [],
      beforeCare: [],
      afterCare: [],
      expectedResults: "",
      canBeCombinedWith: [],
      isActive: true,
      isBaseService: false,
      currency: "SEK",
      tags: keywords,
      createdAt: new Date(),
      updatedAt: new Date(),
      duration: 60,
      price: 100000,
      requiredSpecialistLevel: "basic"
    };

    if (service) {
      serviceData.id = service.id;
    }

    onSave(serviceData);
    onOpenChange(false);
    form.reset();
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canGoNext = () => {
    const values = form.getValues();
    switch (currentStep) {
      case 1:
        return values.baseServiceId !== "";
      case 2:
        return true; // Equipment is optional
      case 3:
        return values.selectedProblems.length > 0;
      case 4:
        return values.selectedAreas.length > 0;
      case 5:
        return values.customName !== "" && values.description !== "";
      default:
        return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {service ? "Redigera tjänst" : "Ny tjänst"}
          </DialogTitle>
          <DialogDescription>
            Steg {currentStep} av {STEPS.length}: {STEPS[currentStep - 1]?.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <WizardProgress currentStep={currentStep} />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <StepRenderer currentStep={currentStep} control={form.control} />
            </form>
          </Form>
        </div>

        <DialogFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Föregående
          </Button>
          
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Avbryt
            </Button>
            
            {currentStep < STEPS.length ? (
              <Button 
                type="button" 
                onClick={nextStep}
                disabled={!canGoNext()}
              >
                Nästa
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                type="button" 
                onClick={form.handleSubmit(onSubmit)}
                disabled={!canGoNext()}
              >
                {service ? "Uppdatera" : "Skapa"} tjänst
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
