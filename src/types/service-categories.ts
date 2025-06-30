
export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
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
