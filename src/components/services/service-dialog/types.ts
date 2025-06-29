
import * as z from "zod";

export const serviceFormSchema = z.object({
  baseServiceId: z.string().min(1, "Grundtjänst krävs"),
  selectedEquipment: z.array(z.string()).default([]),
  selectedProblems: z.array(z.string()).min(1, "Minst ett problem måste väljas"),
  selectedAreas: z.array(z.string()).min(1, "Minst ett område måste väljas"),
  customName: z.string().min(1, "Namn krävs"),
  description: z.string().min(1, "Beskrivning krävs"),
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export const STEPS = [
  { id: 1, title: "Grundtjänst", description: "Välj typ av behandling" },
  { id: 2, title: "Utrustning", description: "Välj vilken utrustning som behövs" },
  { id: 3, title: "Problem", description: "Vilka problem behandlas?" },
  { id: 4, title: "Områden", description: "Vilka områden behandlas?" },
  { id: 5, title: "Namn & Beskrivning", description: "Slutför din behandling" },
];
