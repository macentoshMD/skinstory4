
export interface EquipmentParameter {
  id: string;
  name: string;
  type: 'number' | 'select' | 'boolean' | 'range';
  unit?: string;
  minValue?: number;
  maxValue?: number;
  options?: string[]; // For select type
  isRequired: boolean;
  description: string;
}

export interface EquipmentSpec {
  id: string;
  equipmentId: string;
  brand: string;
  model: string;
  type: 'laser' | 'ipl' | 'radiofrequency' | 'microneedling' | 'hydrafacial' | 'analysis' | 'other';
  category: 'hair_removal' | 'skin_rejuvenation' | 'acne_treatment' | 'analysis' | 'facial' | 'other';
  wavelengths?: number[];
  maxPower?: number;
  spotSizes?: number[];
  coolingSystem?: string;
  parameters: EquipmentParameter[];
  certifications: string[];
  maintenanceSchedule: {
    dailyChecks: string[];
    weeklyChecks: string[];
    monthlyChecks: string[];
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TreatmentSettings {
  id: string;
  equipmentId: string;
  parameterId: string;
  value: string | number | boolean;
  timestamp: Date;
}

export interface TreatmentSession {
  id: string;
  customerId: string;
  serviceId: string;
  equipmentId: string;
  staffId: string;
  sessionDate: Date;
  settings: TreatmentSettings[];
  shotCount?: number; // For laser treatments
  energyDelivered?: number;
  treatmentAreas: string[];
  notes: string;
  sideEffects?: string[];
  nextSessionRecommended?: Date;
  isCompleted: boolean;
  documentationRequired: boolean; // For Strålskyddsmyndigheten
  createdAt: Date;
  updatedAt: Date;
}

// Equipment specifications with detailed parameters
export const EQUIPMENT_SPECS: EquipmentSpec[] = [
  {
    id: 'dermapen-a6-spec',
    equipmentId: 'dermapen-a6',
    brand: 'DermaPen',
    model: 'A6',
    type: 'microneedling',
    category: 'skin_rejuvenation',
    parameters: [
      {
        id: 'needle-depth',
        name: 'Nåldjup',
        type: 'range',
        unit: 'mm',
        minValue: 0.25,
        maxValue: 3.0,
        isRequired: true,
        description: 'Djup för microneedling-nålarna'
      },
      {
        id: 'vibration-speed',
        name: 'Vibrationshastighet',
        type: 'select',
        options: ['1', '2', '3', '4', '5'],
        isRequired: true,
        description: 'Hastighet för nålvibrationen'
      },
      {
        id: 'passes',
        name: 'Antal passager',
        type: 'number',
        minValue: 1,
        maxValue: 8,
        isRequired: true,
        description: 'Antal gånger man går över samma område'
      },
      {
        id: 'treatment-area',
        name: 'Behandlingsområde',
        type: 'select',
        options: ['Face', 'Neck', 'Chest', 'Hands', 'Body'],
        isRequired: true,
        description: 'Område som behandlas'
      }
    ],
    certifications: ['CE', 'FDA', 'TGA'],
    maintenanceSchedule: {
      dailyChecks: ['Rengör enheten', 'Kontrollera nålmoduler'],
      weeklyChecks: ['Kontrollera alla anslutningar', 'Testa alla hastigheter'],
      monthlyChecks: ['Djuprengöring', 'Kalibrering av djupinställningar']
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'soprano-ice-spec',
    equipmentId: 'laser-diode-808',
    brand: 'Alma',
    model: 'Soprano ICE',
    type: 'laser',
    category: 'hair_removal',
    wavelengths: [755, 808, 1064],
    maxPower: 600,
    spotSizes: [12, 15, 20],
    coolingSystem: 'Contact cooling + air cooling',
    parameters: [
      {
        id: 'wavelength',
        name: 'Våglängd',
        type: 'select',
        unit: 'nm',
        options: ['755', '808', '1064', 'Triple wavelength'],
        isRequired: true,
        description: 'Laserns våglängd'
      },
      {
        id: 'fluence',
        name: 'Fluens',
        type: 'range',
        unit: 'J/cm²',
        minValue: 5,
        maxValue: 50,
        isRequired: true,
        description: 'Energitäthet per puls'
      },
      {
        id: 'pulse-duration',
        name: 'Pulslängd',
        type: 'range',
        unit: 'ms',
        minValue: 1,
        maxValue: 400,
        isRequired: true,
        description: 'Längd på varje laserpuls'
      },
      {
        id: 'repetition-rate',
        name: 'Repetitionsfrekvens',
        type: 'range',
        unit: 'Hz',
        minValue: 0.5,
        maxValue: 10,
        isRequired: true,
        description: 'Antal pulser per sekund'
      },
      {
        id: 'spot-size',
        name: 'Spot-storlek',
        type: 'select',
        unit: 'mm',
        options: ['12', '15', '20'],
        isRequired: true,
        description: 'Diameter på laserstrålens fokuspunkt'
      },
      {
        id: 'cooling-level',
        name: 'Kylningsnivå',
        type: 'range',
        minValue: 1,
        maxValue: 5,
        isRequired: true,
        description: 'Intensitet för kontaktkylning'
      },
      {
        id: 'skin-type',
        name: 'Hudtyp (Fitzpatrick)',
        type: 'select',
        options: ['I', 'II', 'III', 'IV', 'V', 'VI'],
        isRequired: true,
        description: 'Patientens hudtyp enligt Fitzpatrick-skalan'
      }
    ],
    certifications: ['CE', 'FDA', 'Health Canada', 'TGA'],
    maintenanceSchedule: {
      dailyChecks: ['Kontrollera kylsystem', 'Rengör handstycke', 'Verifiera laserfunktion'],
      weeklyChecks: ['Kontrollera alla parametrar', 'Rengör filter', 'Testa säkerhetssystem'],
      monthlyChecks: ['Kalibrering av lasern', 'Djuprengöring', 'Kontrollera alla anslutningar', 'Dokumentation för Strålskyddsmyndigheten']
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'splendor-x-spec',
    equipmentId: 'laser-alexandrite-755',
    brand: 'Lumenis',
    model: 'Splendor X',
    type: 'laser',
    category: 'hair_removal',
    wavelengths: [755, 1064],
    maxPower: 4000,
    spotSizes: [9, 12, 15, 18, 24, 27],
    coolingSystem: 'BLEND X technology with contact cooling',
    parameters: [
      {
        id: 'wavelength',
        name: 'Våglängd',
        type: 'select',
        unit: 'nm',
        options: ['755 (Alex)', '1064 (Nd:YAG)', 'BLEND (Both)'],
        isRequired: true,
        description: 'Vald laserteknik'
      },
      {
        id: 'fluence',
        name: 'Fluens',
        type: 'range',
        unit: 'J/cm²',
        minValue: 10,
        maxValue: 200,
        isRequired: true,
        description: 'Energitäthet'
      },
      {
        id: 'pulse-width',
        name: 'Pulsbredd',
        type: 'range',
        unit: 'ms',
        minValue: 3,
        maxValue: 300,
        isRequired: true,
        description: 'Pulslängd'
      },
      {
        id: 'spot-size',
        name: 'Spot-storlek',
        type: 'select',
        unit: 'mm',
        options: ['9', '12', '15', '18', '24', '27'],
        isRequired: true,
        description: 'Handstyckets storlek'
      },
      {
        id: 'repetition-rate',
        name: 'Repetitionsfrekvens',
        type: 'range',
        unit: 'Hz',
        minValue: 0.5,
        maxValue: 20,
        isRequired: true,
        description: 'Pulser per sekund'
      },
      {
        id: 'cooling-delay',
        name: 'Kylningsfördröjning',
        type: 'range',
        unit: 'ms',
        minValue: 0,
        maxValue: 1000,
        isRequired: false,
        description: 'Tid mellan kylning och puls'
      }
    ],
    certifications: ['CE', 'FDA', 'Health Canada'],
    maintenanceSchedule: {
      dailyChecks: ['Kontrollera BLEND X kylsystem', 'Verifiera båda laserkällor', 'Rengör handstycken'],
      weeklyChecks: ['Kalibrering av våglängder', 'Kontrollera spot-storlekar', 'Testa säkerhetslås'],
      monthlyChecks: ['Fullständig systemkalibrering', 'Dokumentation energiutgång', 'Service av kylsystem']
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
