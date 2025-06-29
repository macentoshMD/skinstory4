
import { Service, ServicePackage } from '@/types/services';

export const SERVICES: Service[] = [
  // Consultations
  {
    id: 'consultation-basic',
    name: 'Hudkonsultation',
    categoryId: 'consultation',
    description: 'Grundläggande hudanalys och behandlingsplan',
    duration: 45,
    price: 50000,
    currency: 'SEK',
    equipment: [
      {
        equipmentId: 'dermascope',
        settings: { magnification: 10 },
        isRequired: true
      }
    ],
    requiredSpecialistLevel: 'basic',
    skinTypes: ['all'],
    problemAreas: ['general_assessment'],
    contraindications: [],
    beforeCare: ['Rengör ansiktet från makeup'],
    afterCare: ['Följ given hudvårdsrutin'],
    expectedResults: 'Tydlig behandlingsplan och produktrekommendationer',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'consultation-advanced',
    name: 'Avancerad Hudanalys',
    categoryId: 'consultation',
    description: 'Omfattande hudanalys med VISIA-fotografering',
    duration: 60,
    price: 80000,
    currency: 'SEK',
    equipment: [
      {
        equipmentId: 'visia-skin-analysis',
        settings: { uv_mode: true, analysis_depth: 'full' },
        isRequired: true
      },
      {
        equipmentId: 'dermascope',
        settings: { magnification: 15 },
        isRequired: false
      }
    ],
    requiredSpecialistLevel: 'intermediate',
    skinTypes: ['all'],
    problemAreas: ['pigmentation', 'aging', 'acne', 'texture'],
    contraindications: [],
    beforeCare: ['Rengör ansiktet från makeup', 'Undvik retinol 24h innan'],
    afterCare: ['Använd solskydd dagligen'],
    expectedResults: 'Detaljerad hudrapport med före/efter-spårning',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Facial treatments
  {
    id: 'hydrafacial-classic',
    name: 'HydraFacial Classic',
    categoryId: 'facial',
    description: 'Klassisk 3-stegs HydraFacial behandling',
    duration: 60,
    price: 150000,
    currency: 'SEK',
    equipment: [
      {
        equipmentId: 'hydrafacial-md',
        settings: { 
          suction_level: 'medium',
          serum_type: 'hydrating',
          treatment_steps: 3
        },
        isRequired: true
      }
    ],
    requiredSpecialistLevel: 'basic',
    skinTypes: ['all'],
    problemAreas: ['dryness', 'dullness', 'fine_lines', 'clogged_pores'],
    contraindications: ['active_acne', 'rosacea_flare', 'sunburn'],
    beforeCare: ['Undvik peeling 48h innan', 'Rengör ansiktet'],
    afterCare: ['Använd mild fuktgivare', 'Undvik makeup 4h'],
    expectedResults: 'Omedelbar glöd, mjukare hud, minskade porer',
    sessionFrequency: 'Var 4-6:e vecka',
    recommendedSessions: 6,
    canBeCombinedWith: ['led-therapy'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Laser treatments
  {
    id: 'laser-hair-removal-face',
    name: 'Hårborttagning Ansikte',
    categoryId: 'laser',
    description: 'Permanent hårborttagning i ansiktet',
    duration: 30,
    price: 80000,
    currency: 'SEK',
    equipment: [
      {
        equipmentId: 'laser-diode-808',
        settings: { 
          wavelength: 808,
          fluence: 'auto',
          pulse_duration: 'auto',
          cooling: true
        },
        isRequired: false,
        alternatives: ['laser-alexandrite-755']
      }
    ],
    requiredSpecialistLevel: 'intermediate',
    skinTypes: ['I', 'II', 'III', 'IV', 'V', 'VI'],
    problemAreas: ['unwanted_hair'],
    contraindications: ['pregnancy', 'active_tan', 'photosensitive_medication'],
    beforeCare: ['Raka området 24h innan', 'Undvik sol 2 veckor innan'],
    afterCare: ['Använd solskydd', 'Undvik värme 24h', 'Fuktgivande kräm'],
    expectedResults: '15-25% hårminskning per session',
    sessionFrequency: 'Var 6-8:e vecka',
    recommendedSessions: 8,
    canBeCombinedWith: [],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'laser-hair-removal-body',
    name: 'Hårborttagning Kropp',
    categoryId: 'laser',
    description: 'Permanent hårborttagning på större kroppsområden',
    duration: 90,
    price: 200000,
    currency: 'SEK',
    equipment: [
      {
        equipmentId: 'laser-diode-808',
        settings: { 
          wavelength: 808,
          fluence: 'high',
          spot_size: 'large',
          cooling: true
        },
        isRequired: false,
        alternatives: ['laser-alexandrite-755']
      }
    ],
    requiredSpecialistLevel: 'intermediate',
    skinTypes: ['I', 'II', 'III', 'IV', 'V'],
    problemAreas: ['unwanted_hair'],
    contraindications: ['pregnancy', 'active_tan', 'photosensitive_medication'],
    beforeCare: ['Raka området 24h innan', 'Undvik sol 2 veckor innan'],
    afterCare: ['Använd solskydd', 'Undvik värme 24h', 'Fuktgivande kräm'],
    expectedResults: '15-25% hårminskning per session',
    sessionFrequency: 'Var 6-8:e vecka',
    recommendedSessions: 8,
    canBeCombinedWith: [],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Microneedling
  {
    id: 'microneedling-face',
    name: 'Microneedling Ansikte',
    categoryId: 'microneedling',
    description: 'Kollagenstimulering med DermaPen',
    duration: 90,
    price: 180000,
    currency: 'SEK',
    equipment: [
      {
        equipmentId: 'dermapen-a6',
        settings: { 
          needle_depth: 1.5,
          speed: 'medium',
          passes: 3
        },
        isRequired: false,
        alternatives: ['dermapen-a7']
      }
    ],
    requiredSpecialistLevel: 'advanced',
    skinTypes: ['I', 'II', 'III', 'IV', 'V', 'VI'],
    problemAreas: ['acne_scars', 'wrinkles', 'large_pores', 'stretch_marks'],
    contraindications: ['active_acne', 'eczema', 'blood_thinners', 'pregnancy'],
    beforeCare: ['Undvik retinol 5 dagar innan', 'Undvik sol', 'Antibiotika om ordinerat'],
    afterCare: ['Mild rengöring 24h', 'Hyaluronsyra', 'Solskydd obligatoriskt'],
    expectedResults: 'Förbättrad hudtextur, minskade ärr, fastare hud',
    sessionFrequency: 'Var 4-6:e vecka',
    recommendedSessions: 3,
    canBeCombinedWith: ['hydrafacial-classic'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Chemical peels
  {
    id: 'chemical-peel-mild',
    name: 'Kemisk Peeling Mild',
    categoryId: 'peeling',
    description: 'Mild syrabehandling för hudförnyelse',
    duration: 45,
    price: 120000,
    currency: 'SEK',
    equipment: [], // No equipment needed
    requiredSpecialistLevel: 'basic',
    skinTypes: ['I', 'II', 'III', 'IV'],
    problemAreas: ['dullness', 'fine_lines', 'mild_pigmentation'],
    contraindications: ['active_acne', 'recent_laser', 'pregnancy'],
    beforeCare: ['Förbered huden med syror 2 veckor', 'Undvik sol'],
    afterCare: ['Mild rengöring', 'Återfuktning', 'Solskydd'],
    expectedResults: 'Ljusare, jämnare hudton, mjukare textur',
    sessionFrequency: 'Var 4:e vecka',
    recommendedSessions: 4,
    canBeCombinedWith: ['hydrafacial-classic'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Acne treatments
  {
    id: 'acne-extraction-treatment',
    name: 'Aknebehandling med Portömning',
    categoryId: 'acne',
    description: 'Djuprengöring och manuell portömning',
    duration: 75,
    price: 140000,
    currency: 'SEK',
    equipment: [
      {
        equipmentId: 'dermascope',
        settings: { magnification: 10 },
        isRequired: true
      }
    ],
    requiredSpecialistLevel: 'intermediate',
    skinTypes: ['all'],
    problemAreas: ['acne', 'blackheads', 'clogged_pores'],
    contraindications: ['active_infection', 'blood_thinners'],
    beforeCare: ['Rengör ansiktet', 'Undvik scrub 24h innan'],
    afterCare: ['Antibakteriell kräm', 'Undvik makeup 4h', 'Inga syror 24h'],
    expectedResults: 'Renare porer, minskat antal komedon',
    sessionFrequency: 'Var 4:e vecka',
    recommendedSessions: 6,
    canBeCombinedWith: ['led-therapy'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'hydrafacial-package-3',
    name: 'HydraFacial 3-pack',
    serviceIds: ['hydrafacial-classic'],
    sessions: 3,
    price: 400000, // 20% discount
    discount: 20,
    validityMonths: 6,
    description: '3 HydraFacial behandlingar med 20% rabatt'
  },
  {
    id: 'laser-hair-face-package',
    name: 'Hårborttagning Ansikte - Kur',
    serviceIds: ['laser-hair-removal-face'],
    sessions: 8,
    price: 560000, // 12.5% discount
    discount: 12.5,
    validityMonths: 18,
    description: 'Komplett hårborttagningskur för ansiktet'
  },
  {
    id: 'acne-treatment-package',
    name: 'Aknebehandling - Intensive',
    serviceIds: ['acne-extraction-treatment', 'chemical-peel-mild'],
    sessions: 6,
    price: 720000, // 15% discount
    discount: 15,
    validityMonths: 8,
    description: 'Intensiv aknebehandling kombinerat med mild peeling'
  }
];
