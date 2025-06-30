
import { TreatmentArea } from './service-interfaces';

export const TREATMENT_AREAS: TreatmentArea[] = [
  // Head region
  {
    id: 'face',
    name: 'Ansikte',
    regionId: 'head',
    description: 'Hela ansiktsområdet'
  },
  {
    id: 'neck',
    name: 'Hals',
    regionId: 'head',
    description: 'Halsområdet'
  },
  
  // Upper body region
  {
    id: 'chest',
    name: 'Bröst',
    regionId: 'upper-body',
    description: 'Bröstkorg och dekolletage'
  },
  {
    id: 'arms',
    name: 'Armar',
    regionId: 'upper-body',
    description: 'Över- och underarmar'
  },
  {
    id: 'shoulders',
    name: 'Axlar',
    regionId: 'upper-body',
    description: 'Axelområdet'
  },
  {
    id: 'hands',
    name: 'Händer',
    regionId: 'upper-body',
    description: 'Händer och fingrar'
  },
  {
    id: 'back',
    name: 'Rygg',
    regionId: 'upper-body',
    description: 'Ryggens olika områden'
  },
  
  // Lower body region
  {
    id: 'legs',
    name: 'Ben',
    regionId: 'lower-body',
    description: 'Lår och vader'
  },
  {
    id: 'feet',
    name: 'Fötter',
    regionId: 'lower-body',
    description: 'Fötter och tår'
  },
  
  // Intim region
  {
    id: 'bikini',
    name: 'Bikiniområde',
    regionId: 'intim',
    description: 'Intimområdet'
  },
  {
    id: 'brazilian',
    name: 'Brazilian',
    regionId: 'intim',
    description: 'Fullständig intimbehandling'
  }
];
