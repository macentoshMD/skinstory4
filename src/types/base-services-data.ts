
import { BaseService } from './service-interfaces';

export const BASE_SERVICES: BaseService[] = [
  {
    id: 'microneedling',
    name: 'Microneedling',
    description: 'Kollagenstimulering och hudförnyelse',
    category: 'aesthetic'
  },
  {
    id: 'ansiktsbehandling',
    name: 'Ansiktsbehandling',
    description: 'Grundläggande hudvård och rengöring',
    category: 'skincare'
  },
  {
    id: 'laserbehandling',
    name: 'Laserbehandling',
    description: 'Laserbaserade behandlingar',
    category: 'laser'
  },
  {
    id: 'kemisk-peeling',
    name: 'Kemisk Peeling',
    description: 'Syrabehandlingar för hudförnyelse',
    category: 'chemical'
  },
  {
    id: 'konsultation',
    name: 'Konsultation',
    description: 'Analys och rådgivning',
    category: 'consultation'
  }
];
