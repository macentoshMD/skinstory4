export interface ProblemSymptom {
  id: number;
  name: string;
  score: number;
  severity: 'Lindrig' | 'Måttlig' | 'Hög';
  description?: string;
}

export interface ProblemArea {
  region: string;
  subAreas?: string[];
  isComplete?: boolean; // true if "Hela" region, false if specific sub-areas
}

export interface Problem {
  id: number;
  name: string;
  type: string; // e.g., "Acne Vulgaris (Tonårsacne)"
  category: string; // e.g., "Akne", "Rosacea", etc.
  severity: 'Lindrig' | 'Måttlig' | 'Svår';
  status: 'Aktivt' | 'Förbättras' | 'Stabil' | 'Löst' | 'Försämras';
  description: string;
  areas: ProblemArea[];
  symptoms: ProblemSymptom[];
  firstDiagnosed: string;
  lastAssessed: string;
  nextAssessment?: string;
  images: {
    before?: string;
    current?: string;
    history?: string[];
  };
  notes?: string;
  hasLinkedTreatmentPlan: boolean;
  treatmentPlanId?: number;
}

export type ProblemStatus = 'Aktivt' | 'Förbättras' | 'Stabil' | 'Löst' | 'Försämras';
export type ProblemSeverity = 'Lindrig' | 'Måttlig' | 'Svår' | 'Hög';