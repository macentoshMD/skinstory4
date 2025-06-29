
export interface ProblemArea {
  id: string;
  name: string;
  description: string;
  category: 'acne' | 'aging' | 'pigmentation' | 'texture' | 'sensitivity' | 'hair' | 'other';
  severity: 'mild' | 'moderate' | 'severe';
  commonCauses: string[];
  isActive: boolean;
}

export const PROBLEM_AREAS: ProblemArea[] = [
  {
    id: 'acne-comedonal',
    name: 'Komedonakne',
    description: 'Pormaskar och vita/svarta porer',
    category: 'acne',
    severity: 'mild',
    commonCauses: ['Excess sebum', 'Dead skin cells', 'Hormones'],
    isActive: true
  },
  {
    id: 'acne-inflammatory',
    name: 'Inflammatorisk akne',
    description: 'Inflammerade finnar och cystor',
    category: 'acne',
    severity: 'moderate',
    commonCauses: ['Bacteria', 'Hormones', 'Stress', 'Diet'],
    isActive: true
  },
  {
    id: 'fine-lines',
    name: 'Fina linjer',
    description: 'Tidiga tecken på åldrande',
    category: 'aging',
    severity: 'mild',
    commonCauses: ['UV damage', 'Natural aging', 'Repetitive expressions'],
    isActive: true
  },
  {
    id: 'deep-wrinkles',
    name: 'Djupa rynkor',
    description: 'Etablerade rynkor och vecken',
    category: 'aging',
    severity: 'moderate',
    commonCauses: ['Loss of collagen', 'UV damage', 'Gravity'],
    isActive: true
  },
  {
    id: 'hyperpigmentation',
    name: 'Hyperpigmentering',
    description: 'Mörka fläckar och ojämn hudton',
    category: 'pigmentation',
    severity: 'moderate',
    commonCauses: ['Sun damage', 'Post-inflammatory', 'Melasma'],
    isActive: true
  },
  {
    id: 'large-pores',
    name: 'Stora porer',
    description: 'Synligt förstorade porer',
    category: 'texture',
    severity: 'mild',
    commonCauses: ['Genetics', 'Age', 'Sun damage', 'Excess oil'],
    isActive: true
  },
  {
    id: 'acne-scars',
    name: 'Akneärr',
    description: 'Ärr från tidigare akne',
    category: 'texture',
    severity: 'moderate',
    commonCauses: ['Previous acne inflammation', 'Picking', 'Genetics'],
    isActive: true
  },
  {
    id: 'unwanted-hair-face',
    name: 'Oönskad hårtillväxt ansikte',
    description: 'Överflödig hårtillväxt i ansiktet',
    category: 'hair',
    severity: 'mild',
    commonCauses: ['Hormones', 'Genetics', 'PCOS'],
    isActive: true
  },
  {
    id: 'unwanted-hair-body',
    name: 'Oönskad hårtillväxt kropp',
    description: 'Överflödig hårtillväxt på kroppen',
    category: 'hair',
    severity: 'mild',
    commonCauses: ['Hormones', 'Genetics'],
    isActive: true
  },
  {
    id: 'sensitive-skin',
    name: 'Känslig hud',
    description: 'Hud som reagerar lätt på produkter och behandlingar',
    category: 'sensitivity',
    severity: 'mild',
    commonCauses: ['Genetics', 'Barrier damage', 'Allergies'],
    isActive: true
  }
];
