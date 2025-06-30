
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
