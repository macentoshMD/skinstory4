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
      clinicSessions: 5,
      homeProducts: 5,
      expectedResults: '70-80% förbättring'
    },
    clinicCare: {
      treatments: [
        {
          id: '1',
          name: 'Portömning',
          method: 'Manuell portömning',
          sessions: 5,
          interval: 'Var 2:a vecka',
          equipment: 'Portömningsinstrument',
          areas: ['Panna', 'Kinder', 'Haka'],
          price: 800
        }
      ],
      totalSessions: 5,
      schedule: 'Var 2:a vecka under första månaden, sedan månatliga uppföljningar'
    },
    homeCare: {
      productPackages: [
        {
          id: '1',
          name: 'Akne Starterpaket',
          brand: 'CeraVe',
          category: 'Grundvård',
          usage: 'Morgon & kväll',
          duration: '3 månader',
          price: 1200,
          description: 'Skonsam rengöring + fuktgivning för aknebenägen hud'
        },
        {
          id: '2',
          name: 'Salicylsyra Serum 2%',
          brand: 'The Ordinary',
          category: 'Behandling',
          usage: 'Kväll, 3x/vecka',
          duration: '2 månader',
          price: 400,
          description: 'Exfolierar och rengör porer djupt'
        },
        {
          id: '3',
          name: 'Niacinamide Serum 10%',
          brand: 'The Ordinary',
          category: 'Behandling',
          usage: 'Morgon',
          duration: '2 månader',
          price: 350,
          description: 'Reglerar talgproduktion och minskar inflammation'
        },
        {
          id: '4',
          name: 'Solskydd SPF 50',
          brand: 'La Roche-Posay',
          category: 'Skydd',
          usage: 'Dagligen',
          duration: '3 månader',
          price: 600,
          description: 'Oljefritt solskydd för aknebenägen hud'
        }
      ],
      methods: ['Dubbel rengöring', 'Layering teknik', 'Gradvis introduktion'],
      instructions: 'Börja med grundprodukter första veckan, lägg till behandlingsprodukter vecka 2-3'
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
    clinicCare: {
      treatments: [
        {
          id: '1',
          name: 'IPL Pigmentbehandling',
          method: 'IPL',
          sessions: 4,
          interval: 'Var 2:a vecka',
          equipment: 'IPL Lumenis M22',
          areas: ['Kinder', 'Panna'],
          price: 2200
        }
      ],
      totalSessions: 4,
      schedule: 'Var 2:a vecka, totalt 8 veckor'
    },
    homeCare: {
      productPackages: [
        {
          id: '1',
          name: 'Vitamin C Serum',
          brand: 'Skinceuticals',
          category: 'Behandling',
          usage: 'Morgon',
          duration: '2 månader',
          price: 1800,
          description: 'Antioxidant serum för ljusare hudton'
        },
        {
          id: '2',
          name: 'Retinol 0.5%',
          brand: 'Paula\'s Choice',
          category: 'Behandling',
          usage: 'Kväll, 2x/vecka',
          duration: '3 månader',
          price: 950,
          description: 'Mild retinol för hudförnyelse'
        }
      ],
      methods: ['Gradvis retinol introduktion', 'Morgon antioxidant rutin'],
      instructions: 'Starta med vitamin C morgon vecka 1, lägg till retinol kväll vecka 3'
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
    clinicCare: {
      treatments: [
        {
          id: '1',
          name: 'Microneedling',
          method: 'Dermaroller 1.0mm',
          sessions: 3,
          interval: 'Var 4:e vecka',
          equipment: 'Professional Dermaroller',
          areas: ['Näsa', 'Kinder'],
          price: 1800
        },
        {
          id: '2',
          name: 'Kemisk Peeling BHA',
          method: 'Salicylsyra 30%',
          sessions: 2,
          interval: 'Var 5:e vecka',
          equipment: 'Professional Peel Kit',
          areas: ['T-zon'],
          price: 2500
        }
      ],
      totalSessions: 5,
      schedule: 'Microneedling månadsvis, peeling mellan sessionerna'
    },
    homeCare: {
      productPackages: [
        {
          id: '1',
          name: 'BHA Exfoliant 2%',
          brand: 'Paula\'s Choice',
          category: 'Behandling',
          usage: 'Kväll, varannan dag',
          duration: '3 månader',
          price: 650,
          description: 'Exfolierar och rengör porer'
        },
        {
          id: '2',
          name: 'Niacinamide Toner',
          brand: 'The INKEY List',
          category: 'Behandling',
          usage: 'Morgon & kväll',
          duration: '2 månader',
          price: 400,
          description: 'Minimerar porer och kontrollerar talg'
        },
        {
          id: '3',
          name: 'Hyaluronsyra Serum',
          brand: 'The Ordinary',
          category: 'Grundvård',
          usage: 'Morgon & kväll',
          duration: '2 månader',
          price: 300,
          description: 'Återfuktar utan att täppa till porer'
        }
      ],
      methods: ['Porminimering rutin', 'Balanserad fuktgivning'],
      instructions: 'Använd BHA 3x första veckan, öka gradvis till varannan dag'
    },
    pricing: {
      commitTotal: '10 500 kr',
      commitMonthly: '3 500 kr/månad i 3 månader',
      payAsYouGoTotal: '13 800 kr',
      savings: '3 300 kr'
    }
  }
];