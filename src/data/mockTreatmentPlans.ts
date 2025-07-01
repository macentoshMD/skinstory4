import { TreatmentPlan } from '@/types/treatment-plan';

export const mockTreatmentPlansData: TreatmentPlan[] = [
  {
    id: 1,
    problem: {
      name: 'Akne',
      description: 'Inflammatorisk akne med komedoner och papler främst i T-zonen. Förhöjd talgproduktion och tilltäppta porer.',
      severity: 'Måttlig',
      areas: ['Panna', 'Kinder', 'Haka']
    },
    treatmentStatus: 'aktiv',
    goals: {
      title: 'BEHANDLINGSMÅL',
      description: 'Minska inflammation, rena porer och förbättra hudtextur'
    },
    plan: {
      duration: '12 veckor',
      clinicSessions: 6,
      homeProducts: 5,
      expectedResults: '70-80% förbättring'
    },
    pricing: {
      commitTotal: '12 969 kr',
      commitMonthly: '4 323 kr/månad i 3 månader',
      payAsYouGoTotal: '18 745 kr',
      savings: '5 776 kr'
    }
  },
  {
    id: 2,
    problem: {
      name: 'Ojämn hudton',
      description: 'Lätt pigmentering och rodnader efter akne.',
      severity: 'Lindrig',
      areas: ['Kinder', 'Panna']
    },
    treatmentStatus: 'slutförd',
    goals: {
      title: 'BEHANDLINGSMÅL',
      description: 'Jämna ut hudton och minska pigmentfläckar'
    },
    plan: {
      duration: '8 veckor',
      clinicSessions: 4,
      homeProducts: 3,
      expectedResults: '85-90% förbättring'
    },
    pricing: {
      commitTotal: '8 500 kr',
      commitMonthly: '2 833 kr/månad i 3 månader',
      payAsYouGoTotal: '11 200 kr',
      savings: '2 700 kr'
    }
  },
  {
    id: 3,
    problem: {
      name: 'Förstorade porer',
      description: 'Synliga porer främst i T-zonen.',
      severity: 'Måttlig',
      areas: ['Näsa', 'Kinder']
    },
    treatmentStatus: 'pending',
    goals: {
      title: 'BEHANDLINGSMÅL',
      description: 'Minska porernas synlighet och förbättra hudtextur'
    },
    plan: {
      duration: '10 veckor',
      clinicSessions: 5,
      homeProducts: 4,
      expectedResults: '60-70% förbättring'
    },
    pricing: {
      commitTotal: '10 500 kr',
      commitMonthly: '3 500 kr/månad i 3 månader',
      payAsYouGoTotal: '13 800 kr',
      savings: '3 300 kr'
    }
  }
];