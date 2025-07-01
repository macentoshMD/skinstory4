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
    beforeAfter: {
      expectedImprovement: '70-90% förbättring',
      timeframe: '12 veckor',
      description: 'Förbättring av inflammationer inom 12 veckor'
    },
    timeline: [
      {
        phase: 'Grundvård etableras',
        weeks: 'Vecka 1-2',
        description: 'Grundvård etableras, första portömning'
      },
      {
        phase: 'Anpassning',
        weeks: 'Vecka 3-4',
        description: 'Andra portömning, huden börjar anpassa sig'
      },
      {
        phase: 'Förbättring',
        weeks: 'Vecka 5-8',
        description: 'Fortsatt förbättring, minskade inflammationer'
      },
      {
        phase: 'Slutresultat',
        weeks: 'Vecka 9-12',
        description: 'Slutresultat och underhållsplan'
      }
    ],
    valueProposition: {
      title: 'Vad ingår i din SkinStory',
      features: [
        'Personlig terapeut (Cazzandra) - direktkontakt',
        'Resultatgaranti - vi följer dig till målet',
        'Anpassad hemrutin dag för dag',
        'Gratis konsultation vid behov under perioden'
      ]
    },
    phases: [
      {
        id: 'start',
        name: 'STARTFAS',
        weeks: 'Vecka 1-4',
        icon: 'rocket',
        clinicCare: '2x Portömning',
        homeCare: 'Grundvård etableras'
      },
      {
        id: 'intensive',
        name: 'INTENSIVFAS',
        weeks: 'Vecka 5-8',
        icon: 'zap',
        clinicCare: '2x Portömning',
        homeCare: 'Full rutin optimeras'
      },
      {
        id: 'result',
        name: 'RESULTATFAS',
        weeks: 'Vecka 9-12',
        icon: 'target',
        clinicCare: '1x Portömning + utvärdering',
        homeCare: 'Underhållsrutin'
      }
    ],
    reasoning: {
      title: 'Varför just denna kombination',
      description: 'Inflammatorisk akne i T-zonen kräver både djuprengöring (portömning) och hembalansering (CeraVe). Denna kombination har 90% framgångsgrad.',
      successRate: '90%'
    },
    pricing: {
      commitTotal: '12 969 kr',
      commitMonthly: '4 323 kr/månad i 3 månader',
      payAsYouGoTotal: '18 745 kr',
      savings: '5 776 kr',
      clinicCost: '4 000 kr',
      homeCost: '2 550 kr',
      weeklyEquivalent: '433 kr'
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
    beforeAfter: {
      expectedImprovement: '85-90% förbättring',
      timeframe: '8 veckor',
      description: 'Jämna ut hudton och minska pigmentfläckar'
    },
    timeline: [
      {
        phase: 'IPL Start',
        weeks: 'Vecka 1-2',
        description: 'Första IPL-behandling, hudens förberedelse'
      },
      {
        phase: 'Intensivbehandling',
        weeks: 'Vecka 3-6',
        description: 'Ytterligare IPL-sessioner, pigment börjar ljusna'
      },
      {
        phase: 'Resultat',
        weeks: 'Vecka 7-8',
        description: 'Slutbehandling och resultatutvärdering'
      }
    ],
    valueProposition: {
      title: 'Vad ingår i din behandling',
      features: [
        'Professionell IPL-utrustning (Lumenis M22)',
        'Personlig uppföljning under hela processen',
        'Hemvårdsprodukter för optimal resultat',
        'Gratis konsultation efter avslutad behandling'
      ]
    },
    phases: [
      {
        id: 'preparation',
        name: 'FÖRBEREDELSE',
        weeks: 'Vecka 1-2',
        icon: 'target',
        clinicCare: '1x IPL-behandling',
        homeCare: 'Vitamin C rutin startas'
      },
      {
        id: 'intensive',
        name: 'INTENSIVFAS',
        weeks: 'Vecka 3-6',
        icon: 'zap',
        clinicCare: '2x IPL-behandling',
        homeCare: 'Retinol introduceras'
      },
      {
        id: 'completion',
        name: 'AVSLUTNING',
        weeks: 'Vecka 7-8',
        icon: 'check',
        clinicCare: '1x Slutbehandling',
        homeCare: 'Underhållsrutin'
      }
    ],
    reasoning: {
      title: 'Varför IPL för pigmentering',
      description: 'IPL-teknologi är det mest effektiva sättet att behandla pigmentfläckar. Kombinerat med hemvård ger det optimala resultat.',
      successRate: '85%'
    },
    pricing: {
      commitTotal: '8 500 kr',
      commitMonthly: '2 833 kr/månad i 3 månader',
      payAsYouGoTotal: '11 200 kr',
      savings: '2 700 kr',
      clinicCost: '6 000 kr',
      homeCost: '2 750 kr',
      weeklyEquivalent: '354 kr'
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
    beforeAfter: {
      expectedImprovement: '60-70% förbättring',
      timeframe: '10 veckor',
      description: 'Minska porernas synlighet och förbättra hudtextur'
    },
    timeline: [
      {
        phase: 'Förberedelse',
        weeks: 'Vecka 1-2',
        description: 'Första microneedling, hudens förberedelse'
      },
      {
        phase: 'Intensivbehandling',
        weeks: 'Vecka 3-7',
        description: 'Kombinerad microneedling och peeling'
      },
      {
        phase: 'Slutresultat',
        weeks: 'Vecka 8-10',
        description: 'Slutbehandling och resultatutvärdering'
      }
    ],
    valueProposition: {
      title: 'Vad ingår i din porbehandling',
      features: [
        'Professionell microneedling och peeling',
        'Specialanpassad hemvårdsrutin',
        'Månadsvis uppföljning och justering',
        'Resultatgaranti eller pengarna tillbaka'
      ]
    },
    phases: [
      {
        id: 'preparation',
        name: 'FÖRBEREDELSE',
        weeks: 'Vecka 1-3',
        icon: 'target',
        clinicCare: '1x Microneedling',
        homeCare: 'BHA-rutin startas försiktigt'
      },
      {
        id: 'intensive',
        name: 'INTENSIVFAS',
        weeks: 'Vecka 4-7',
        icon: 'zap',
        clinicCare: '2x Microneedling + 1x Peeling',
        homeCare: 'Full rutin etableras'
      },
      {
        id: 'completion',
        name: 'AVSLUTNING',
        weeks: 'Vecka 8-10',
        icon: 'check',
        clinicCare: '1x Peeling + utvärdering',
        homeCare: 'Underhållsrutin'
      }
    ],
    reasoning: {
      title: 'Varför microneedling + BHA',
      description: 'Förstorade porer kräver både mekanisk stimulering (microneedling) och kemisk exfoliering (BHA) för optimal förbättring.',
      successRate: '70%'
    },
    pricing: {
      commitTotal: '10 500 kr',
      commitMonthly: '3 500 kr/månad i 3 månader',
      payAsYouGoTotal: '13 800 kr',
      savings: '3 300 kr',
      clinicCost: '8 900 kr',
      homeCost: '1 350 kr',
      weeklyEquivalent: '420 kr'
    }
  }
];