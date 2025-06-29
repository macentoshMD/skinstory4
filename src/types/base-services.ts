
export interface BaseService {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number; // in cents
  currency: string;
  requiredSpecialistLevel: 'basic' | 'intermediate' | 'advanced' | 'expert';
  skinTypes: string[]; // Compatible skin types
  contraindications: string[]; // When not to use this service
  beforeCare: string[];
  afterCare: string[];
  expectedResults: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ComposedService {
  id: string;
  name: string;
  description: string;
  baseServiceIds: string[]; // References to base services
  totalDuration: number; // calculated from base services
  totalPrice: number; // can be different from sum (discounts)
  discount?: number; // percentage
  sessionFrequency?: string;
  recommendedSessions?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceEquipmentLink {
  id: string;
  serviceId: string; // Can link to base or composed service
  equipmentId: string;
  settings: {
    intensity?: number;
    depth?: number;
    wavelength?: number;
    duration?: number;
    temperature?: number;
    pressure?: number;
    [key: string]: any;
  };
  isRequired: boolean;
  alternatives?: string[]; // Alternative equipment IDs
}

export interface ServiceProblemLink {
  id: string;
  serviceId: string;
  problemAreaId: string;
  effectiveness: 'low' | 'medium' | 'high' | 'excellent';
}

// Base services data
export const BASE_SERVICES: BaseService[] = [
  {
    id: 'base-skin-analysis',
    name: 'Hudanalys',
    description: 'Grundläggande bedömning av hudtyp och problem',
    duration: 30,
    price: 40000,
    currency: 'SEK',
    requiredSpecialistLevel: 'basic',
    skinTypes: ['all'],
    contraindications: [],
    beforeCare: ['Rengör ansiktet från makeup'],
    afterCare: ['Följ given hudvårdsrutin'],
    expectedResults: 'Klargjord hudtyp och problemidentifiering',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'base-deep-cleansing',
    name: 'Djuprengöring',
    description: 'Grundlig rengöring av porer och borttagning av orenheter',
    duration: 45,
    price: 80000,
    currency: 'SEK',
    requiredSpecialistLevel: 'basic',
    skinTypes: ['all'],
    contraindications: ['active_acne_inflammation'],
    beforeCare: ['Undvik peeling 24h innan'],
    afterCare: ['Använd mild fuktgivare', 'Undvik makeup 2h'],
    expectedResults: 'Renare porer och förbättrad hudtextur',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'base-hydration-treatment',
    name: 'Fuktbehandling',
    description: 'Intensiv återfuktning för torr hud',
    duration: 30,
    price: 60000,
    currency: 'SEK',
    requiredSpecialistLevel: 'basic',
    skinTypes: ['dry', 'normal', 'combination'],
    contraindications: [],
    beforeCare: [],
    afterCare: ['Använd rekommenderad fuktgivare'],
    expectedResults: 'Mjukare, mer elastisk hud',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'base-extraction',
    name: 'Portömning',
    description: 'Manuell borttagning av komedon och pormaskar',
    duration: 30,
    price: 50000,
    currency: 'SEK',
    requiredSpecialistLevel: 'intermediate',
    skinTypes: ['all'],
    contraindications: ['active_infection', 'blood_thinners'],
    beforeCare: ['Ångbad för att mjuka upp huden'],
    afterCare: ['Antibakteriell behandling', 'Undvik beröring 24h'],
    expectedResults: 'Renare porer, minskat antal komedon',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'base-microneedling',
    name: 'Microneedling',
    description: 'Kollagenstimulering genom mikronålar',
    duration: 60,
    price: 150000,
    currency: 'SEK',
    requiredSpecialistLevel: 'advanced',
    skinTypes: ['all'],
    contraindications: ['active_acne', 'eczema', 'pregnancy'],
    beforeCare: ['Undvik retinol 5 dagar innan', 'Antibiotika om ordinerat'],
    afterCare: ['Mild rengöring 24h', 'Hyaluronsyra', 'Solskydd obligatoriskt'],
    expectedResults: 'Förbättrad hudtextur och fasthet',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'base-laser-hair-removal',
    name: 'Laserhårborttagning',
    description: 'Permanent hårborttagning med laser',
    duration: 45,
    price: 120000,
    currency: 'SEK',
    requiredSpecialistLevel: 'intermediate',
    skinTypes: ['I', 'II', 'III', 'IV', 'V'],
    contraindications: ['pregnancy', 'active_tan', 'photosensitive_medication'],
    beforeCare: ['Raka området 24h innan', 'Undvik sol 2 veckor innan'],
    afterCare: ['Solskydd', 'Undvik värme 24h', 'Fuktgivande kräm'],
    expectedResults: '15-25% hårminskning per session',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Composed services combining base services
export const COMPOSED_SERVICES: ComposedService[] = [
  {
    id: 'classic-facial',
    name: 'Klassisk Ansiktsbehandling',
    description: 'Komplett ansiktsbehandling med analys, rengöring och fukt',
    baseServiceIds: ['base-skin-analysis', 'base-deep-cleansing', 'base-hydration-treatment'],
    totalDuration: 105, // sum of base services
    totalPrice: 160000, // discount applied
    discount: 11, // roughly 20k discount
    sessionFrequency: 'Var 4-6:e vecka',
    recommendedSessions: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'acne-treatment',
    name: 'Aknebehandling',
    description: 'Specialiserad behandling för aknebenägen hud',
    baseServiceIds: ['base-skin-analysis', 'base-deep-cleansing', 'base-extraction'],
    totalDuration: 105,
    totalPrice: 150000,
    discount: 12,
    sessionFrequency: 'Var 3-4:e vecka',
    recommendedSessions: 6,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'anti-aging-treatment',
    name: 'Anti-age Behandling',
    description: 'Avancerad behandling mot åldrande med microneedling',
    baseServiceIds: ['base-skin-analysis', 'base-microneedling', 'base-hydration-treatment'],
    totalDuration: 120,
    totalPrice: 220000,
    discount: 8,
    sessionFrequency: 'Var 4-6:e vecka',
    recommendedSessions: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
