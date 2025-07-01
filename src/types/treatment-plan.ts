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
  clinicCare: {
    treatments: ClinicTreatment[];
    totalSessions: number;
    schedule: string;
  };
  homeCare: {
    productPackages: ProductPackage[];
    methods: string[];
    instructions: string;
  };
  beforeAfter: {
    expectedImprovement: string;
    timeframe: string;
    description: string;
  };
  timeline: {
    phase: string;
    weeks: string;
    description: string;
  }[];
  valueProposition: {
    title: string;
    features: string[];
  };
  phases: {
    id: string;
    name: string;
    weeks: string;
    icon: string;
    clinicCare: string;
    homeCare: string;
  }[];
  reasoning: {
    title: string;
    description: string;
    successRate: string;
  };
  pricing: {
    commitTotal: string;
    commitMonthly: string;
    payAsYouGoTotal: string;
    savings: string;
    clinicCost: string;
    homeCost: string;
    weeklyEquivalent: string;
  };
}

export interface ClinicTreatment {
  id: string;
  name: string;
  method: string;
  sessions: number;
  interval: string;
  equipment: string;
  areas: string[];
  price: number;
}

export interface ProductPackage {
  id: string;
  name: string;
  brand: string;
  category: string;
  usage: string;
  duration: string;
  price: number;
  description: string;
}

export type TreatmentStatus = 'aktiv' | 'pågående' | 'slutförd' | 'pending';