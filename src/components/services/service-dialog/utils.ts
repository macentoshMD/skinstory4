
import { ServiceFormValues } from "./types";
import { BASE_SERVICES, PROBLEM_AREAS, TREATMENT_AREAS } from "@/types/base-services";
import { EQUIPMENT } from "@/types/services";

export const generateKeywords = (values: ServiceFormValues): string[] => {
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
