
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

export interface DiagnosisData {
  method: 'ai' | 'manual' | '';
  selectedProblems: string[];
  aiPhoto?: File;
  problemSeverity: 'light' | 'medium' | 'severe' | '';
  problemSubcategory: string;
  symptoms: SymptomSeverity[];
  skinScore: number;
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
  { id: 'acne-tarda', name: 'Acne Tarda (Vuxenacne)', parentProblemId: 'acne' },
  { id: 'acne-comedonal', name: 'Komedonakne', parentProblemId: 'acne' },
  { id: 'acne-cystic', name: 'Cystisk akne', parentProblemId: 'acne' },
  
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
  { id: 'blackheads', name: 'Pormaskar (komedoner)', problemIds: ['acne'] },
  { id: 'whiteheads', name: 'Vita finnar', problemIds: ['acne'] },
  { id: 'papules', name: 'Papler (inflammerade knölar)', problemIds: ['acne'] },
  { id: 'pustules', name: 'Pustler (variga finnar)', problemIds: ['acne'] },
  { id: 'cysts', name: 'Cystor', problemIds: ['acne'] },
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
  { id: 'dry-skin', name: 'Torr hud', problemIds: ['torr-kanslig-hy'] },
  { id: 'sensitive-skin', name: 'Känslig hud', problemIds: ['torr-kanslig-hy', 'rosacea'] },
  { id: 'oily-skin', name: 'Fet hud', problemIds: ['acne', 'blandhy'] },
];
