export interface Equipment {
  id: string;
  name: string;
  type: 'laser' | 'hydrafacial' | 'microneedling' | 'analysis' | 'ipl' | 'radiofrequency' | 'other';
  brand: string;
  model: string;
  description: string;
  capabilities: string[];
  maintenanceRequired: boolean;
  lastMaintenance?: Date;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ServiceEquipmentSetting {
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

export interface Service {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  duration: number; // minutes
  price: number; // in cents
  currency: string;
  equipment: ServiceEquipmentSetting[];
  requiredSpecialistLevel: 'basic' | 'intermediate' | 'advanced' | 'expert';
  skinTypes: string[]; // Compatible skin types
  problemAreas: string[]; // What problems this service addresses
  contraindications: string[]; // Contraindication IDs from the new system
  beforeCare: string[];
  afterCare: string[];
  expectedResults: string;
  sessionFrequency?: string; // e.g., "Every 4-6 weeks"
  recommendedSessions?: number;
  canBeCombinedWith: string[]; // Other service IDs
  isActive: boolean;
  isBaseService: boolean; // New field to distinguish base services from composite services
  baseServiceIds?: string[]; // For composite services - which base services they're built from
  margin?: number; // Calculated margin percentage
  isOnlineBookable?: boolean; // Whether this service can be booked online
  tags?: string[]; // Add tags property to fix TypeScript errors
  createdAt: Date;
  updatedAt: Date;
}

export interface ServicePackage {
  id: string;
  name: string;
  serviceIds: string[];
  sessions: number;
  price: number; // total price in cents
  discount: number; // percentage
  validityMonths: number;
  description: string;
}

// Service categories
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'consultation',
    name: 'Konsultationer',
    description: 'Hudanalys och rådgivning',
    icon: '🔍'
  },
  {
    id: 'facial',
    name: 'Ansiktsbehandlingar',
    description: 'Djuprengöring och vårdande behandlingar',
    icon: '✨'
  },
  {
    id: 'laser',
    name: 'Laserbehandlingar',
    description: 'Hårborttagning och hudförbättring',
    icon: '💫'
  },
  {
    id: 'microneedling',
    name: 'Microneedling',
    description: 'Kollagenstimulering och hudförnyelse',
    icon: '📍'
  },
  {
    id: 'peeling',
    name: 'Kemiska peelingar',
    description: 'Syrabehandlingar för hudförnyelse',
    icon: '🧪'
  },
  {
    id: 'acne',
    name: 'Aknebehandlingar',
    description: 'Specialiserade aknebehandlingar',
    icon: '🎯'
  },
  {
    id: 'anti-aging',
    name: 'Anti-age',
    description: 'Behandlingar mot åldrande',
    icon: '⏰'
  }
];

// Equipment database
export const EQUIPMENT: Equipment[] = [
  // Laser equipment
  {
    id: 'laser-diode-808',
    name: 'Diodlaser 808nm',
    type: 'laser',
    brand: 'Alma',
    model: 'Soprano ICE',
    description: 'Permanent hårborttagning för alla hudtyper',
    capabilities: ['hair_removal', 'all_skin_types', 'pain_free'],
    maintenanceRequired: false
  },
  {
    id: 'laser-alexandrite-755',
    name: 'Alexandrite 755nm',
    type: 'laser',
    brand: 'Candela',
    model: 'GentleLase Pro',
    description: 'Hårborttagning för ljusare hudtyper',
    capabilities: ['hair_removal', 'light_skin', 'fast_treatment'],
    maintenanceRequired: false
  },
  {
    id: 'laser-nd-yag-1064',
    name: 'Nd:YAG 1064nm',
    type: 'laser',
    brand: 'Cutera',
    model: 'Excel V+',
    description: 'Kärlbehandling och pigmentbehandling',
    capabilities: ['vascular_lesions', 'pigmentation', 'dark_skin_safe'],
    maintenanceRequired: true
  },
  
  // HydraFacial
  {
    id: 'hydrafacial-md',
    name: 'HydraFacial MD',
    type: 'hydrafacial',
    brand: 'HydraFacial',
    model: 'MD Elite',
    description: 'Patenterad 3-stegs ansiktsbehandling',
    capabilities: ['deep_cleansing', 'extraction', 'hydration', 'infusion'],
    maintenanceRequired: false
  },
  
  // Microneedling
  {
    id: 'dermapen-a6',
    name: 'DermaPen A6',
    type: 'microneedling',
    brand: 'DermaPen',
    model: 'A6',
    description: 'Automatiserad microneedling med variabel djupkontroll',
    capabilities: ['collagen_stimulation', 'scar_treatment', 'adjustable_depth'],
    maintenanceRequired: false
  },
  {
    id: 'dermapen-a7',
    name: 'DermaPen A7',
    type: 'microneedling',
    brand: 'DermaPen',
    model: 'A7',
    description: 'Avancerad microneedling med LED-ljusterapi',
    capabilities: ['collagen_stimulation', 'led_therapy', 'precision_control'],
    maintenanceRequired: false
  },
  
  // Analysis equipment
  {
    id: 'visia-skin-analysis',
    name: 'VISIA Hudanalys',
    type: 'analysis',
    brand: 'Canfield',
    model: 'VISIA-AP',
    description: 'Avancerad hudanalys med UV-fotografi',
    capabilities: ['skin_analysis', 'uv_photography', 'progress_tracking'],
    maintenanceRequired: true
  },
  {
    id: 'dermascope',
    name: 'Dermatoskop',
    type: 'analysis',
    brand: 'Heine',
    model: 'DermLite DL4',
    description: 'Förstoring och analys av hudförändringar',
    capabilities: ['magnification', 'pigment_analysis', 'structure_analysis'],
    maintenanceRequired: false
  },
  
  // IPL
  {
    id: 'ipl-lumenis',
    name: 'IPL M22',
    type: 'ipl',
    brand: 'Lumenis',
    model: 'M22',
    description: 'Intensivt pulserat ljus för multi-behandlingar',
    capabilities: ['pigmentation', 'vascular_lesions', 'photo_rejuvenation'],
    maintenanceRequired: true
  }
];
