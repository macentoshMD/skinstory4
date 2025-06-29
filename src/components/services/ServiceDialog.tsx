
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
  FormDescription,
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
import { X } from "lucide-react";
import { Service } from "@/types/services";
import { EQUIPMENT } from "@/types/services";

const serviceFormSchema = z.object({
  name: z.string().min(1, "Namn krävs"),
  categoryId: z.string().min(1, "Kategori krävs"),
  description: z.string().min(1, "Beskrivning krävs"),
  duration: z.number().min(1, "Tidsgång måste vara minst 1 minut"),
  price: z.number().min(1, "Pris måste vara större än 0"),
  requiredSpecialistLevel: z.enum(["basic", "intermediate", "advanced", "expert"]),
  tags: z.array(z.string()).optional(),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

interface ServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service?: Service;
  onSave: (service: Partial<Service>) => void;
}

const categories = [
  { id: "Laser", name: "Laser" },
  { id: "Hudvård", name: "Hudvård" },
  { id: "Anti-age", name: "Anti-age" },
  { id: "Akne", name: "Akne" },
];

const availableTags = ["klinik", "premium", "populär"];

export function ServiceDialog({ open, onOpenChange, service, onSave }: ServiceDialogProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>(service?.tags || []);
  const [newTag, setNewTag] = useState("");

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: service?.name || "",
      categoryId: service?.categoryId || "",
      description: service?.description || "",
      duration: service?.duration || 60,
      price: service?.price ? service.price / 100 : 0,
      requiredSpecialistLevel: service?.requiredSpecialistLevel || "basic",
      tags: service?.tags || [],
    },
  });

  const onSubmit = (values: ServiceFormValues) => {
    const serviceData: Partial<Service> = {
      ...values,
      price: values.price * 100, // Convert to cents
      tags: selectedTags,
      equipment: service?.equipment || [],
      skinTypes: service?.skinTypes || [],
      problemAreas: service?.problemAreas || [],
      contraindications: service?.contraindications || [],
      beforeCare: service?.beforeCare || [],
      afterCare: service?.afterCare || [],
      expectedResults: service?.expectedResults || "",
      canBeCombinedWith: service?.canBeCombinedWith || [],
      isActive: service?.isActive ?? true,
      isBaseService: service?.isBaseService ?? false,
      currency: "SEK",
      createdAt: service?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (service) {
      serviceData.id = service.id;
    }

    onSave(serviceData);
    onOpenChange(false);
    form.reset();
    setSelectedTags([]);
  };

  const addTag = () => {
    if (newTag && !selectedTags.includes(newTag)) {
      setSelectedTags([...selectedTags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {service ? "Redigera tjänst" : "Ny tjänst"}
          </DialogTitle>
          <DialogDescription>
            {service ? "Uppdatera tjänstinformation" : "Skapa en ny tjänst"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Namn</FormLabel>
                    <FormControl>
                      <Input placeholder="Tjänstens namn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Välj kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beskrivning</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Beskrivning av tjänsten" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tidsgång (minuter)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="60" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pris (kr)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="500" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requiredSpecialistLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialistnivå</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Välj nivå" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="basic">Grundläggande</SelectItem>
                        <SelectItem value="intermediate">Mellannivå</SelectItem>
                        <SelectItem value="advanced">Avancerad</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormLabel>Taggar</FormLabel>
              <div className="flex flex-wrap gap-2 mt-2 mb-3">
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Select value={newTag} onValueChange={setNewTag}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Välj tagg" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTags
                      .filter(tag => !selectedTags.includes(tag))
                      .map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button type="button" onClick={addTag} disabled={!newTag}>
                  Lägg till
                </Button>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Avbryt
              </Button>
              <Button type="submit">
                {service ? "Uppdatera" : "Skapa"} tjänst
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
