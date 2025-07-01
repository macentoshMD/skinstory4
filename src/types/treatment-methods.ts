
export interface TreatmentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  availableServices: string[];
  equipment: string[];
  category: 'laser' | 'facial' | 'light' | 'acne' | 'anti-age';
  color: string;
}

export interface SkinPlan {
  id: string;
  startDate: Date;
  endDate: Date;
  totalSessions: number;
  intervalWeeks: number;
  treatments: ConfiguredTreatment[];
  followUpDates: FollowUpAppointment[];
  status: 'planned' | 'active' | 'completed' | 'paused';
  notes?: string;
}

export interface ConfiguredTreatment {
  id: string;
  methodId: string;
  serviceId: string;
  serviceName: string;
  configuration: {
    equipment: string;
    parameters: Record<string, any>;
    areas: string[];
    sessionDates: Date[];
    completedSessions: number;
    numberOfSessions: number;
    intervalWeeks: number;
  };
  pricing: {
    pricePerSession: number;
    totalPrice: number;
    discount: number;
    discountAmount: number;
    subtotal: number;
  };
}

export interface FollowUpAppointment {
  id: string;
  date: Date;
  type: 'clinic' | 'online';
  purpose: 'follow-up' | 'evaluation' | 'consultation';
  notes?: string;
  completed?: boolean;
}

export const TREATMENT_METHODS: TreatmentMethod[] = [
  {
    id: 'laser-diode',
    name: 'Laser Diode 808nm',
    icon: '🔬',
    description: 'Hårborttagning med diodlaser',
    availableServices: ['laser-hair-removal', 'hair-reduction'],
    equipment: ['Diode 808nm Handpiece', 'Cooling Tip'],
    category: 'laser',
    color: 'bg-red-100 text-red-800'
  },
  {
    id: 'laser-alexandrite',
    name: 'Alexandrite 755nm',
    icon: '💎',
    description: 'Hårborttagning och pigmentbehandling',
    availableServices: ['laser-hair-removal', 'pigment-treatment'],
    equipment: ['Alexandrite 755nm', 'Pigment Handpiece'],
    category: 'laser',
    color: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'ipl-treatment',
    name: 'IPL (Intense Pulsed Light)',
    icon: '💡',
    description: 'Behandling av pigment, kärl och hår',
    availableServices: ['ipl-pigment', 'ipl-vessels', 'ipl-hair'],
    equipment: ['IPL Handpiece', 'Pigment Filter', 'Vessel Filter'],
    category: 'light',
    color: 'bg-yellow-100 text-yellow-800'
  },
  {
    id: 'hydrafacial',
    name: 'HydraFacial',
    icon: '💧',
    description: 'Djuprengöring och återfuktning',
    availableServices: ['hydrafacial-basic', 'hydrafacial-premium'],
    equipment: ['Standard tip', 'Sensitive tip', 'Deep cleansing tip'],
    category: 'facial',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'chemical-peel',
    name: 'Kemisk Peeling',
    icon: '🧪',
    description: 'Förnyelse av hud med syror',
    availableServices: ['salicylic-peel', 'glycolic-peel', 'tca-peel'],
    equipment: ['Acid Applicator', 'Neutralizing Solution'],
    category: 'facial',
    color: 'bg-green-100 text-green-800'
  },
  {
    id: 'led-therapy',
    name: 'LED Ljusterapi',
    icon: '🔴',
    description: 'Antiinflammatorisk ljusbehandling',
    availableServices: ['led-red', 'led-blue', 'led-combined'],
    equipment: ['Red Light Panel', 'Blue Light Panel', 'Combined Panel'],
    category: 'light',
    color: 'bg-orange-100 text-orange-800'
  }
];
