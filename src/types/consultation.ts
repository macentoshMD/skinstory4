export interface CustomerFormData {
  personalNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  gender: 'Female' | 'Male' | '';
  language: string;
  howFoundUs: string;
}

export interface SymptomSeverity {
  symptomId: string;
  severity: number; // 1-5 scale
}

export interface GeneralDetailsData {
  whenProblemStartsYear: string;
  whenProblemStartsMonth: string;
  skinStatusAtMoment: 'worse' | 'same' | 'better' | '';
  treatProblemBefore: 'yes' | 'no' | '';
  treatmentDetails: string;
  skinTexture: 'dry' | 'oily' | 'combination' | '';
  skinSensitivity: 'low' | 'medium' | 'high' | '';
}

export interface PhotoDocumentation {
  id: string;
  file: File;
  url: string;
  category: 'before' | 'problem-area' | 'general';
  angle: 'front' | 'left' | 'right' | 'close-up';
  notes: string;
  timestamp: Date;
}

export interface ProductRecommendation {
  id: string;
  name: string;
  brand: string;
  type: 'cleanser' | 'serum' | 'moisturizer' | 'sunscreen' | 'treatment';
  usage: string;
  price: number;
  priority: 'essential' | 'recommended' | 'optional';
  description: string;
}

export interface TreatmentRecommendation {
  id: string;
  name: string;
  sessions: number;
  frequency: string;
  price: number;
  priority: 'essential' | 'recommended' | 'optional';
  contraindications: string[];
  description: string;
}

export interface TreatmentPlan {
  homecare: {
    morning: ProductRecommendation[];
    evening: ProductRecommendation[];
    weekly: ProductRecommendation[];
  };
  cliniccare: {
    treatments: TreatmentRecommendation[];
    schedule: string;
    followUp: string;
  };
  notes: string;
  totalHomecarePrice: number;
  totalClinicPrice: number;
}

export interface DiagnosisData {
  method: 'ai' | 'manual' | '';
  selectedProblems: string[];
  aiPhoto?: File;
  problemSeverity: 'light' | 'medium' | 'severe' | '';
  problemSubcategory: string;
  symptoms: SymptomSeverity[];
  skinScore: number;
  generalDetails: GeneralDetailsData;
}

export interface ContraIndicationsData {
  selectedContraindications: string[];
  riskLevel: 'none' | 'low' | 'medium' | 'high';
  notes: string;
}

export interface ProblemSubcategory {
  id: string;
  name: string;
  parentProblemId: string;
}

export interface ProblemSymptom {
  id: string;
  name: string;
  problemIds: string[];
}

// Problem subcategories mapping
export const PROBLEM_SUBCATEGORIES: ProblemSubcategory[] = [
  // Acne subcategories
  { id: 'acne-vulgaris', name: 'Acne Vulgaris (Tonårsacne)', parentProblemId: 'acne' },
  { id: 'acne-comedogenica', name: 'Acne Comedogenica (Icke-inflammerad akne)', parentProblemId: 'acne' },
  { id: 'acne-pustulosas', name: 'Acne Pustulosas (Varig akne)', parentProblemId: 'acne' },
  { id: 'acne-papulosas', name: 'Acne Papulosas (Inflammerad akne)', parentProblemId: 'acne' },
  { id: 'acne-nodulocystic', name: 'Acne Nodulocystic (Svår akne)', parentProblemId: 'acne' },
  
  // Rosacea subcategories
  { id: 'rosacea-erythematotelangiectatic', name: 'Erythematotelangiectatic', parentProblemId: 'rosacea' },
  { id: 'rosacea-papulopustular', name: 'Papulopustular', parentProblemId: 'rosacea' },
  { id: 'rosacea-phymatous', name: 'Phymatous', parentProblemId: 'rosacea' },
  
  // Pigmentfläckar subcategories
  { id: 'melasma', name: 'Melasma', parentProblemId: 'pigmentflackar' },
  { id: 'solskador', name: 'Solskador', parentProblemId: 'pigmentflackar' },
  { id: 'post-inflammatory', name: 'Post-inflammatorisk hyperpigmentering', parentProblemId: 'pigmentflackar' },
];

// Problem symptoms mapping
export const PROBLEM_SYMPTOMS: ProblemSymptom[] = [
  // Acne symptoms
  { id: 'papler', name: 'Papler (Inflammerade knölar)', problemIds: ['acne'] },
  { id: 'pustler', name: 'Pustler (Variga finnar)', problemIds: ['acne'] },
  { id: 'komedoner-oppna', name: 'Komedoner öppna (Pormaskar)', problemIds: ['acne'] },
  { id: 'komedoner-stangda', name: 'Komedoner stängda (Vita finnar)', problemIds: ['acne'] },
  { id: 'noduler', name: 'Noduler (Stora inflammerade knölar)', problemIds: ['acne'] },
  { id: 'cystor', name: 'Cystor (Djupa inflammerade knölar)', problemIds: ['acne'] },
  { id: 'scarring', name: 'Ärrbildning', problemIds: ['acne', 'aknearr'] },
  
  // Rosacea symptoms
  { id: 'persistent-redness', name: 'Permanent rodnad', problemIds: ['rosacea'] },
  { id: 'visible-blood-vessels', name: 'Synliga blodkärl', problemIds: ['rosacea', 'ytliga-blodkarl'] },
  { id: 'burning-sensation', name: 'Brännande känsla', problemIds: ['rosacea'] },
  { id: 'papules-pustules', name: 'Papler och pustler', problemIds: ['rosacea'] },
  
  // Pigmentfläckar symptoms
  { id: 'dark-spots', name: 'Mörka fläckar', problemIds: ['pigmentflackar'] },
  { id: 'uneven-skin-tone', name: 'Ojämn hudton', problemIds: ['pigmentflackar'] },
  { id: 'age-spots', name: 'Ålderfläckar', problemIds: ['pigmentflackar'] },
  
  // General symptoms
  { id: 'enlarged-pores', name: 'Förstorade porer', problemIds: ['stora-porer', 'acne'] },
  { id: 'oily-skin', name: 'Fet hud', problemIds: ['acne', 'blandhy'] },
];

// Skin score calculation function
export const calculateSkinScore = (symptoms: SymptomSeverity[]): number => {
  if (symptoms.length === 0) return 0;
  
  // Base score calculation
  const totalSeverity = symptoms.reduce((sum, symptom) => sum + symptom.severity, 0);
  const averageSeverity = totalSeverity / symptoms.length;
  
  // Weight factors for different symptoms
  const symptomWeights: { [key: string]: number } = {
    'papler': 1.2,
    'pustler': 1.3,
    'komedoner-oppna': 1.0,
    'komedoner-stangda': 1.0,
    'noduler': 1.5,
    'cystor': 1.8,
    'scarring': 2.0,
  };
  
  // Calculate weighted score
  let weightedScore = 0;
  let totalWeight = 0;
  
  symptoms.forEach(symptom => {
    const weight = symptomWeights[symptom.symptomId] || 1.0;
    weightedScore += symptom.severity * weight;
    totalWeight += weight;
  });
  
  const finalScore = totalWeight > 0 ? (weightedScore / totalWeight) * 20 : averageSeverity * 20;
  
  // Ensure score is between 0-100
  return Math.min(100, Math.max(0, Math.round(finalScore)));
};

export interface DetailedTreatmentRecommendation extends TreatmentRecommendation {
  category: string;
  availableHandpieces: string[];
  treatmentAreas: string[];
  configuration?: {
    selectedHandpiece: string;
    numberOfSessions: number;
    intervalWeeks: number;
    selectedAreas: string[];
    totalPrice: number;
  };
}

export interface DetailedProductRecommendation extends ProductRecommendation {
  availableOptions: {
    strength?: string[];
    spf?: number[];
    microbeads?: boolean;
  };
  configuration?: {
    selectedStrength?: string;
    selectedSPF?: number;
    withMicrobeads?: boolean;
    finalPrice: number;
  };
}

export interface TreatmentPlanV2 {
  selectedTreatments: DetailedTreatmentRecommendation[];
  selectedProducts: DetailedProductRecommendation[];
  notes: string;
  totalTreatmentPrice: number;
  totalProductPrice: number;
}
