
export interface ProblemType {
  id: string;
  name: string;
  description: string;
  category: 'dermatological' | 'cosmetic' | 'medical' | 'preventive';
  severity: 'mild' | 'moderate' | 'severe';
  bodyAreas: string[]; // Where this problem typically occurs
  commonSymptoms: string[];
  commonCauses: string[];
  contraindications: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProblemArea {
  id: string;
  name: string;
  anatomicalLocation: string;
  description: string;
  commonProblemTypes: string[]; // Reference to ProblemType IDs
  isActive: boolean;
}

// Problem types for diagnostics and consultations
export const PROBLEM_TYPES: ProblemType[] = [
  {
    id: 'acne-comedonal',
    name: 'Komedonakne',
    description: 'Pormaskar och vita/svarta porer utan inflammation',
    category: 'dermatological',
    severity: 'mild',
    bodyAreas: ['face', 'chest', 'back'],
    commonSymptoms: ['Svarta pormaskar', 'Vita pormaskar', 'Förstorade porer'],
    commonCauses: ['Excess sebum', 'Dead skin cells', 'Hormones', 'Genetics'],
    contraindications: ['Active infection', 'Open wounds'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'acne-inflammatory',
    name: 'Inflammatorisk akne',
    description: 'Inflammerade finnar, papler och cystor',
    category: 'dermatological',
    severity: 'moderate',
    bodyAreas: ['face', 'chest', 'back', 'shoulders'],
    commonSymptoms: ['Röda inflammerade finnar', 'Papler', 'Pustler', 'Cystor'],
    commonCauses: ['Bacteria (P. acnes)', 'Hormones', 'Stress', 'Diet', 'Genetics'],
    contraindications: ['Active infection', 'Blood thinners', 'Immunosuppressive medication'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'rosacea',
    name: 'Rosacea',
    description: 'Kronisk hudsjukdom med rodnad och inflammation',
    category: 'dermatological',
    severity: 'moderate',
    bodyAreas: ['face', 'nose', 'cheeks', 'forehead'],
    commonSymptoms: ['Persistent rodnad', 'Synliga blodkärl', 'Finnar', 'Brännande känsla'],
    commonCauses: ['Genetics', 'Sun exposure', 'Stress', 'Spicy food', 'Alcohol'],
    contraindications: ['Active flare-up', 'Photosensitive medication'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'melasma',
    name: 'Melasma',
    description: 'Hormonell pigmentering, ofta relaterad till graviditet',
    category: 'dermatological',
    severity: 'moderate',
    bodyAreas: ['face', 'forehead', 'cheeks', 'upper_lip'],
    commonSymptoms: ['Symmetriska bruna fläckar', 'Ojämn pigmentering'],
    commonCauses: ['Hormonal changes', 'Sun exposure', 'Pregnancy', 'Birth control'],
    contraindications: ['Pregnancy', 'Active sun exposure'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'photoaging',
    name: 'Fotoåldrande',
    description: 'Solskador och prematur åldrande från UV-exponering',
    category: 'cosmetic',
    severity: 'mild',
    bodyAreas: ['face', 'neck', 'hands', 'chest'],
    commonSymptoms: ['Solskador', 'Rynkor', 'Pigmentfläckar', 'Förtjockad hud'],
    commonCauses: ['UV exposure', 'Sun damage', 'Age', 'Lack of sun protection'],
    contraindications: ['Active tan', 'Recent sun exposure'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'keratosis-pilaris',
    name: 'Keratosis Pilaris',
    description: 'Små vita bumps orsakade av keratinpropp',
    category: 'dermatological',
    severity: 'mild',
    bodyAreas: ['arms', 'legs', 'buttocks'],
    commonSymptoms: ['Små vita bumps', 'Torr hud', 'Ibland rodnad'],
    commonCauses: ['Genetics', 'Dry skin', 'Keratin buildup'],
    contraindications: ['Active irritation', 'Open wounds'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Anatomical problem areas
export const PROBLEM_AREAS: ProblemArea[] = [
  {
    id: 'face-forehead',
    name: 'Panna',
    anatomicalLocation: 'Ansiktet - övre del',
    description: 'Pannan inklusive hårfäste',
    commonProblemTypes: ['acne-comedonal', 'acne-inflammatory', 'photoaging', 'melasma'],
    isActive: true
  },
  {
    id: 'face-cheeks',
    name: 'Kinder',
    anatomicalLocation: 'Ansiktet - mitten',
    description: 'Kindområdet inklusive kindknotor',
    commonProblemTypes: ['rosacea', 'melasma', 'photoaging', 'acne-inflammatory'],
    isActive: true
  },
  {
    id: 'face-nose',
    name: 'Näsa',
    anatomicalLocation: 'Ansiktet - centralt',
    description: 'Näsområdet inklusive näsvingar',
    commonProblemTypes: ['rosacea', 'acne-comedonal', 'photoaging'],
    isActive: true
  },
  {
    id: 'face-chin',
    name: 'Haka',
    anatomicalLocation: 'Ansiktet - nedre del',
    description: 'Haka och käklinje',
    commonProblemTypes: ['acne-inflammatory', 'acne-comedonal'],
    isActive: true
  },
  {
    id: 'body-chest',
    name: 'Bröst',
    anatomicalLocation: 'Överkropp - främre',
    description: 'Bröstområdet',
    commonProblemTypes: ['acne-inflammatory', 'photoaging'],
    isActive: true
  },
  {
    id: 'body-back',
    name: 'Rygg',
    anatomicalLocation: 'Överkropp - bakre',
    description: 'Ryggen',
    commonProblemTypes: ['acne-inflammatory', 'acne-comedonal'],
    isActive: true
  },
  {
    id: 'body-arms',
    name: 'Armar',
    anatomicalLocation: 'Extremiteter - övre',
    description: 'Armar och överarmar',
    commonProblemTypes: ['keratosis-pilaris', 'photoaging'],
    isActive: true
  },
  {
    id: 'body-legs',
    name: 'Ben',
    anatomicalLocation: 'Extremiteter - nedre',
    description: 'Ben och lår',
    commonProblemTypes: ['keratosis-pilaris'],
    isActive: true
  }
];

export interface DiagnosisRecord {
  id: string;
  customerId: string;
  consultationDate: Date;
  problemTypeIds: string[];
  problemAreaIds: string[];
  severity: 'mild' | 'moderate' | 'severe';
  notes: string;
  recommendedTreatments: string[];
  createdBy: string; // Staff member ID
  createdAt: Date;
  updatedAt: Date;
}
