
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Service } from "@/types/services";
import { EQUIPMENT } from "@/types/services";
import { BASE_SERVICES, PROBLEM_AREAS, TREATMENT_AREAS, CompositeService } from "@/types/base-services";

const serviceFormSchema = z.object({
  baseServiceId: z.string().min(1, "Grundtjänst krävs"),
  selectedEquipment: z.array(z.string()).default([]),
  selectedProblems: z.array(z.string()).min(1, "Minst ett problem måste väljas"),
  selectedAreas: z.array(z.string()).min(1, "Minst ett område måste väljas"),
  customName: z.string().min(1, "Namn krävs"),
  description: z.string().min(1, "Beskrivning krävs"),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

interface ServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service?: Service;
  onSave: (service: Partial<Service>) => void;
}

const STEPS = [
  { id: 1, title: "Grundtjänst", description: "Välj typ av behandling" },
  { id: 2, title: "Utrustning", description: "Välj vilken utrustning som behövs" },
  { id: 3, title: "Problem", description: "Vilka problem behandlas?" },
  { id: 4, title: "Områden", description: "Vilka områden behandlas?" },
  { id: 5, title: "Namn & Beskrivning", description: "Slutför din behandling" },
];

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

  const generateKeywords = (values: ServiceFormValues): string[] => {
    const keywords: string[] = [];
    
    // Add base service
    const baseService = BASE_SERVICES.find(s => s.id === values.baseServiceId);
    if (baseService) {
      keywords.push(baseService.name.toLowerCase());
    }
    
    // Add equipment
    values.selectedEquipment.forEach(equipId => {
      const equipment = EQUIPMENT.find(e => e.id === equipId);
      if (equipment) {
        keywords.push(equipment.name.toLowerCase());
        keywords.push(equipment.brand.toLowerCase());
      }
    });
    
    // Add problems
    values.selectedProblems.forEach(problemId => {
      const problem = PROBLEM_AREAS.find(p => p.id === problemId);
      if (problem) {
        keywords.push(problem.name.toLowerCase());
      }
    });
    
    // Add areas
    values.selectedAreas.forEach(areaId => {
      const area = TREATMENT_AREAS.find(a => a.id === areaId);
      if (area) {
        keywords.push(area.name.toLowerCase());
      }
    });
    
    // Add custom name words
    if (values.customName) {
      keywords.push(...values.customName.toLowerCase().split(' '));
    }
    
    return [...new Set(keywords)]; // Remove duplicates
  };

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
      // These will be set later by staff/clinic
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormField
            control={form.control}
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

      case 2:
        return (
          <FormField
            control={form.control}
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

      case 3:
        return (
          <FormField
            control={form.control}
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

      case 4:
        return (
          <FormField
            control={form.control}
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

      case 5:
        const values = form.getValues();
        const previewKeywords = generateKeywords(values);
        
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
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
              control={form.control}
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

      default:
        return null;
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {renderStepContent()}
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
