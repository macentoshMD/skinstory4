
import { BodyRegion, TreatmentArea, TreatmentZone } from './service-interfaces';

export const BODY_REGIONS: BodyRegion[] = [
  {
    id: 'head',
    name: 'Huvud',
    description: 'Ansikte och hals',
    icon: '👤'
  },
  {
    id: 'upper-body',
    name: 'Överkropp',
    description: 'Bröst, armar och axlar',
    icon: '🫸'
  },
  {
    id: 'lower-body',
    name: 'Underkropp',
    description: 'Ben, höfter och fötter',
    icon: '🦵'
  },
  {
    id: 'intim',
    name: 'Intim',
    description: 'Intimområden',
    icon: '🔒'
  }
];

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

export const TREATMENT_ZONES: TreatmentZone[] = [
  // Face zones
  {
    id: 'forehead',
    name: 'Panna',
    areaId: 'face'
  },
  {
    id: 'eyes',
    name: 'Ögonområde',
    areaId: 'face',
    description: 'Runt ögonen och ögonlock'
  },
  {
    id: 'cheeks',
    name: 'Kinder',
    areaId: 'face'
  },
  {
    id: 'nose',
    name: 'Näsa',
    areaId: 'face'
  },
  {
    id: 'mouth',
    name: 'Mun',
    areaId: 'face',
    description: 'Runt munnen och läppar'
  },
  {
    id: 'chin',
    name: 'Haka',
    areaId: 'face'
  },
  {
    id: 'jawline',
    name: 'Käklinje',
    areaId: 'face'
  },
  {
    id: 'whole-face',
    name: 'Hela ansikte',
    areaId: 'face',
    description: 'Komplett ansiktsbehandling'
  },
  
  // Neck zones
  {
    id: 'front-neck',
    name: 'Främre hals',
    areaId: 'neck'
  },
  {
    id: 'back-neck',
    name: 'Nacke',
    areaId: 'neck'
  },
  
  // Chest zones
  {
    id: 'decolletage',
    name: 'Dekolletage',
    areaId: 'chest'
  },
  {
    id: 'chest-full',
    name: 'Hela bröstet',
    areaId: 'chest'
  },
  
  // Arms zones
  {
    id: 'upper-arms',
    name: 'Överarmar',
    areaId: 'arms'
  },
  {
    id: 'lower-arms',
    name: 'Underarmar',
    areaId: 'arms'
  },
  {
    id: 'armpits',
    name: 'Armhålor',
    areaId: 'arms'
  },
  
  // Hands zones
  {
    id: 'hands-full',
    name: 'Hela händer',
    areaId: 'hands'
  },
  {
    id: 'fingers',
    name: 'Fingrar',
    areaId: 'hands'
  },
  
  // Back zones
  {
    id: 'whole-back',
    name: 'Hela ryggen',
    areaId: 'back',
    description: 'Komplett ryggbehandling'
  },
  {
    id: 'lower-back',
    name: 'Svank/Ländrygg',
    areaId: 'back',
    description: 'Nedre ryggen'
  },
  {
    id: 'upper-back',
    name: 'Överdel rygg',
    areaId: 'back',
    description: 'Övre delen av ryggen'
  },
  
  // Legs zones
  {
    id: 'thighs',
    name: 'Lår',
    areaId: 'legs'
  },
  {
    id: 'calves',
    name: 'Vader',
    areaId: 'legs'
  },
  {
    id: 'knees',
    name: 'Knän',
    areaId: 'legs'
  },
  
  // Feet zones
  {
    id: 'feet-full',
    name: 'Hela fötter',
    areaId: 'feet'
  },
  {
    id: 'toes',
    name: 'Tår',
    areaId: 'feet'
  },
  
  // Bikini zones
  {
    id: 'bikini-line',
    name: 'Bikinilinjen',
    areaId: 'bikini'
  },
  {
    id: 'bikini-full',
    name: 'Hela bikiniområdet',
    areaId: 'bikini'
  },
  
  // Brazilian zones
  {
    id: 'brazilian-full',
    name: 'Fullständig Brazilian',
    areaId: 'brazilian'
  },
  {
    id: 'brazilian-partial',
    name: 'Partiell Brazilian',
    areaId: 'brazilian'
  }
];
