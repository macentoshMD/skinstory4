
export interface Equipment {
  id: string;
  name: string;
  type: 'laser' | 'hydrafacial' | 'microneedling' | 'analysis' | 'ipl' | 'radiofrequency' | 'other';
  brand: string;
  model: string;
  description: string;
  
  // Technical specifications for documentation
  mainCategory: 'laser' | 'ipl' | 'radiofrequency' | 'microneedling' | 'chemical_peeling' | 'cryotherapy';
  subCategories: string[];
  wavelength?: string; // e.g., "755nm", "808nm", "755-1064nm"
  maxPower?: string; // e.g., "600W", "50 J/cm²"
  spotSizeMin?: number; // mm
  spotSizeMax?: number; // mm
  coolingSystem?: string;
  otherSpecs?: string;
  
  // New fields for handpieces
  hasHandpieces?: boolean;
  handpieceCount?: number;
  
  capabilities: string[];
  maintenanceRequired: boolean;
  lastMaintenance?: Date;
}

// Equipment categories
export const EQUIPMENT_CATEGORIES = [
  { id: 'laser', name: 'Laser', subCategories: ['CO2 Laser', 'Diode Laser', 'Nd:YAG', 'Alexandrite', 'Q-Switch'] },
  { id: 'ipl', name: 'IPL/Ljusterapi', subCategories: ['IPL', 'LED Therapy', 'Broad Spectrum Light'] },
  { id: 'radiofrequency', name: 'Radiofrekvens', subCategories: ['Monopolar RF', 'Bipolar RF', 'Fractional RF'] },
  { id: 'microneedling', name: 'Microneedling', subCategories: ['Automated Pen', 'Stamp', 'Roller'] },
  { id: 'chemical_peeling', name: 'Kemisk Peeling', subCategories: ['AHA', 'BHA', 'TCA', 'Phenol'] },
  { id: 'cryotherapy', name: 'Cryoterapi', subCategories: ['Liquid Nitrogen', 'Nitrous Oxide'] }
];

// Equipment brands
export const EQUIPMENT_BRANDS = [
  'Alma', 'Candela', 'Cynosure', 'Lumenis', 'DermaPen', 'HydraFacial', 
  'Cutera', 'Syneron', 'Fotona', 'Sciton', 'Heine', 'Canfield'
];

// Equipment database with enhanced technical specifications
export const EQUIPMENT: Equipment[] = [
  // Laser equipment
  {
    id: 'laser-diode-808',
    name: 'Diodlaser 808nm',
    type: 'laser',
    brand: 'Alma',
    model: 'Soprano ICE',
    description: 'Permanent hårborttagning för alla hudtyper',
    mainCategory: 'laser',
    subCategories: ['Diode Laser'],
    wavelength: '755nm, 808nm, 1064nm',
    maxPower: '600W',
    spotSizeMin: 12,
    spotSizeMax: 20,
    coolingSystem: 'Contact cooling + air cooling',
    otherSpecs: 'Triple wavelength technology, SHR mode, pain-free treatment',
    hasHandpieces: false,
    capabilities: ['hair_removal', 'all_skin_types', 'pain_free'],
    maintenanceRequired: false
  },
  {
    id: 'laser-alexandrite-755',
    name: 'Alexandrite 755nm',
    type: 'laser',
    brand: 'Lumenis',
    model: 'Splendor X',
    description: 'Hårborttagning för ljusare hudtyper',
    mainCategory: 'laser',
    subCategories: ['Alexandrite', 'Nd:YAG'],
    wavelength: '755nm + 1064nm',
    maxPower: '4000W',
    spotSizeMin: 9,
    spotSizeMax: 27,
    coolingSystem: 'BLEND X technology with contact cooling',
    otherSpecs: 'Dual wavelength, BLEND technology, high repetition rate up to 20Hz',
    hasHandpieces: false,
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
    mainCategory: 'laser',
    subCategories: ['Nd:YAG'],
    wavelength: '532nm, 1064nm',
    maxPower: '300W',
    spotSizeMin: 2,
    spotSizeMax: 12,
    coolingSystem: 'Contact cooling',
    otherSpecs: 'Dual wavelength, precision targeting, variable pulse duration',
    hasHandpieces: false,
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
    mainCategory: 'ipl',
    subCategories: ['LED Therapy'],
    otherSpecs: 'Vortex-Fusion technology, HydraPeel tips, LED light therapy',
    hasHandpieces: false,
    capabilities: ['deep_cleansing', 'extraction', 'hydration', 'infusion'],
    maintenanceRequired: false
  },
  
  // Microneedling equipment
  {
    id: 'dermapen-a6',
    name: 'DermaPen A6',
    type: 'microneedling',
    brand: 'DermaPen',
    model: 'A6',
    description: 'Automatiserad microneedling med variabel djupkontroll',
    mainCategory: 'microneedling',
    subCategories: ['Automated Pen'],
    otherSpecs: 'Needle depth: 0.25-3.0mm, Variable speed settings, Vibration technology',
    hasHandpieces: false,
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
    mainCategory: 'microneedling',
    subCategories: ['Automated Pen'],
    otherSpecs: 'Needle depth: 0.25-3.0mm, Integrated LED therapy, AOVN technology',
    hasHandpieces: false,
    capabilities: ['collagen_stimulation', 'led_therapy', 'precision_control'],
    maintenanceRequired: false
  },
  
  // Multi-function equipment with handpieces
  {
    id: 'alma-hybrid',
    name: 'Alma Hybrid',
    type: 'radiofrequency',
    brand: 'Alma',
    model: 'Hybrid',
    description: 'Kombinerad CO2 laser och radiofrekvens',
    mainCategory: 'laser',
    subCategories: ['CO2 Laser', 'Fractional RF'],
    wavelength: '10600nm (CO2)',
    maxPower: '30W (CO2), 62W (RF)',
    coolingSystem: 'Air cooling',
    otherSpecs: 'Fractional CO2 + RF, Variable pulse modes, Scanning technology',
    hasHandpieces: true,
    handpieceCount: 2,
    capabilities: ['skin_resurfacing', 'wrinkle_reduction', 'scar_treatment'],
    maintenanceRequired: true
  },
  {
    id: 'alma-harmony-xl-pro',
    name: 'Alma Harmony XL Pro',
    type: 'laser',
    brand: 'Alma',
    model: 'Harmony XL Pro',
    description: 'Multi-teknik plattform med flera handstycken',
    mainCategory: 'laser',
    subCategories: ['Nd:YAG', 'Alexandrite', 'CO2 Laser'],
    wavelength: '532nm, 755nm, 1064nm, 2940nm, 10600nm',
    maxPower: 'Varies by handpiece',
    spotSizeMin: 2,
    spotSizeMax: 15,
    coolingSystem: 'DCD cooling system',
    otherSpecs: 'Multiple handpieces, Q-Switch technology, Fractional capabilities',
    hasHandpieces: true,
    handpieceCount: 4,
    capabilities: ['hair_removal', 'pigmentation', 'vascular_lesions', 'skin_resurfacing'],
    maintenanceRequired: true
  },
  
  // Analysis equipment
  {
    id: 'visia-skin-analysis',
    name: 'VISIA Hudanalys',
    type: 'analysis',
    brand: 'Canfield',
    model: 'VISIA-AP',
    description: 'Avancerad hudanalys med UV-fotografi',
    mainCategory: 'laser',
    subCategories: ['Analysis'],
    otherSpecs: 'UV photography, RBX technology, Progress tracking, 3D imaging',
    hasHandpieces: false,
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
    mainCategory: 'laser',
    subCategories: ['Analysis'],
    otherSpecs: '10x magnification, Polarized and non-polarized light, LED illumination',
    hasHandpieces: false,
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
    mainCategory: 'ipl',
    subCategories: ['IPL', 'Broad Spectrum Light'],
    wavelength: '515-1200nm',
    maxPower: '50 J/cm²',
    spotSizeMin: 8,
    spotSizeMax: 35,
    coolingSystem: 'Sapphire contact cooling',
    otherSpecs: 'Dual mode filtering, OPT technology, Multiple filter options',
    hasHandpieces: false,
    capabilities: ['pigmentation', 'vascular_lesions', 'photo_rejuvenation'],
    maintenanceRequired: true
  }
];
