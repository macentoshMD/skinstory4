
import { CONTRAINDICATIONS, Contraindication } from '@/data/contraindications';

// Problem-specific contraindication mappings
const PROBLEM_CONTRAINDICATION_MAP: Record<string, string[]> = {
  // Acne - focus on retinoids, antibiotics, hormonal status
  'acne': [
    'retinoids', 'tetracycline', 'pregnancy', 'breastfeeding', 'uncontrolled_diabetes',
    'immunodeficiency', 'systemic_steroids', 'recent_chemical_peel', 'active_inflammatory_acne',
    'keloid_tendency', 'abnormal_scarring'
  ],
  
  // Rosacea - focus on photosensitivity, vascular medications
  'rosacea': [
    'photosensitive_drugs', 'recent_sunburn', 'fitzpatrick_1', 'fitzpatrick_2',
    'extremely_thin_skin', 'active_dermatitis', 'lupus', 'planned_sun_vacation',
    'cannot_avoid_sun', 'recent_laser', 'recent_ipl'
  ],
  
  // Pigment spots - focus on photosensitivity, pregnancy, hormones
  'pigmentflackar': [
    'pregnancy', 'breastfeeding', 'melasma', 'retinoids', 'tetracycline',
    'hydrochlorothiazide', 'recent_sunburn', 'fitzpatrick_1', 'spray_tan',
    'planned_sun_vacation', 'recent_laser', 'recent_ipl'
  ],
  
  // Laser/IPL treatments - comprehensive photosensitivity and skin type focus
  'laser_ipl': [
    'fitzpatrick_1', 'fitzpatrick_6', 'recent_sunburn', 'spray_tan', 'pregnancy',
    'breastfeeding', 'retinoids', 'tetracycline', 'skin_cancer', 'suspicious_changes',
    'atypical_moles', 'keloid_tendency', 'recent_laser', 'recent_ipl'
  ],
  
  // Chemical peeling - focus on retinoid use, active skin problems
  'chemical_peel': [
    'retinoids', 'recent_chemical_peel', 'active_eczema', 'active_dermatitis',
    'active_herpes', 'open_wounds', 'pregnancy', 'breastfeeding', 'keloid_tendency',
    'recent_sunburn', 'extremely_thin_skin'
  ]
};

// Always critical contraindications (shown for all treatments)
const CRITICAL_CONTRAINDICATIONS = [
  'skin_cancer', 'suspicious_changes', 'pregnancy', 'open_wounds', 'active_infection',
  'immunodeficiency', 'uncontrolled_diabetes', 'bleeding_disorders'
];

export function getRelevantContraindications(selectedProblems: string[]): Contraindication[] {
  // Start with critical contraindications
  let relevantIds = new Set(CRITICAL_CONTRAINDICATIONS);
  
  // Add problem-specific contraindications
  selectedProblems.forEach(problem => {
    const problemContraindications = PROBLEM_CONTRAINDICATION_MAP[problem] || [];
    problemContraindications.forEach(id => relevantIds.add(id));
  });
  
  // For laser/IPL related problems, add laser-specific contraindications
  const laserProblems = ['pigmentflackar', 'ytliga-blodkarl', 'aknearr', 'mogen-hy'];
  if (selectedProblems.some(problem => laserProblems.includes(problem))) {
    const laserContraindications = PROBLEM_CONTRAINDICATION_MAP['laser_ipl'] || [];
    laserContraindications.forEach(id => relevantIds.add(id));
  }
  
  // Filter contraindications to only include relevant ones
  return CONTRAINDICATIONS.filter(contraindication => 
    relevantIds.has(contraindication.id)
  );
}

export function getContraindicationContext(selectedProblems: string[]): string {
  if (selectedProblems.includes('acne')) {
    return "Vi frågar dessa frågor eftersom aknebehandlingar kan påverkas av vissa mediciner och hudförhållanden.";
  }
  if (selectedProblems.includes('rosacea')) {
    return "För rosacea-behandlingar är det viktigt att kontrollera ljuskänslighet och kärlrelaterade faktorer.";
  }
  if (selectedProblems.includes('pigmentflackar')) {
    return "Pigmentbehandlingar kräver särskild försiktighet med ljuskänslighet och hormonella faktorer.";
  }
  return "Dessa frågor hjälper oss att säkerställa en säker och effektiv behandling för dina valda hudproblem.";
}

export function categorizeContraindications(contraindications: Contraindication[]) {
  const categories = {
    critical: contraindications.filter(c => c.severity === 'high'),
    important: contraindications.filter(c => c.severity === 'medium'),
    awareness: contraindications.filter(c => c.severity === 'low')
  };
  
  return categories;
}
