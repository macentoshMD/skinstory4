export interface TreatmentPlan {
  id: number;
  problem: {
    name: string;
    description: string;
    severity: string;
    areas: string[];
  };
  treatmentStatus: 'aktiv' | 'pågående' | 'slutförd' | 'pending';
  goals: {
    title: string;
    description: string;
  };
  plan: {
    duration: string;
    clinicSessions: number;
    homeProducts: number;
    expectedResults: string;
  };
  pricing: {
    commitTotal: string;
    commitMonthly: string;
    payAsYouGoTotal: string;
    savings: string;
  };
}

export type TreatmentStatus = 'aktiv' | 'pågående' | 'slutförd' | 'pending';