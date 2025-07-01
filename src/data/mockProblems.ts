import { Problem } from '@/types/problem';

export const mockProblemsData: Problem[] = [
  {
    id: 1,
    name: 'Akne',
    type: 'Acne Vulgaris (Tonårsacne)',
    category: 'Akne',
    severity: 'Måttlig',
    status: 'Förbättras',
    description: 'Inflammatorisk akne med komedoner och papler främst i T-zonen. Förhöjd talgproduktion och tilltäppta porer.',
    areas: [
      {
        region: 'Ansikte',
        subAreas: ['Panna', 'Näsa', 'Haka'],
        isComplete: false
      }
    ],
    symptoms: [
      { id: 1, name: 'Papler (Inflammerade knölar)', score: 70, severity: 'Måttlig' },
      { id: 2, name: 'Komedoner öppna (Pormaskar)', score: 80, severity: 'Hög' },
      { id: 3, name: 'Komedoner stängda (Vita finnar)', score: 60, severity: 'Måttlig' },
      { id: 4, name: 'Förstorade porer', score: 75, severity: 'Hög' },
      { id: 5, name: 'Fet hud', score: 85, severity: 'Hög' }
    ],
    firstDiagnosed: '2023-02-15',
    lastAssessed: '2024-07-01',
    nextAssessment: '2024-08-01',
    images: {
      before: '/placeholder-before.jpg',
      current: '/placeholder-current.jpg'
    },
    hasLinkedTreatmentPlan: true,
    treatmentPlanId: 1
  },
  {
    id: 2,
    name: 'Ojämn hudton',
    type: 'Postinflammatorisk hyperpigmentering',
    category: 'Pigmentering',
    severity: 'Lindrig',
    status: 'Löst',
    description: 'Lätt pigmentering och rodnader efter akne, främst på kinderna.',
    areas: [
      {
        region: 'Ansikte',
        subAreas: ['Kinder', 'Panna'],
        isComplete: false
      }
    ],
    symptoms: [
      { id: 6, name: 'Mörka fläckar', score: 20, severity: 'Lindrig' },
      { id: 7, name: 'Ojämn hudton', score: 15, severity: 'Lindrig' }
    ],
    firstDiagnosed: '2023-02-15',
    lastAssessed: '2024-06-15',
    images: {
      before: '/placeholder-before.jpg',
      current: '/placeholder-current.jpg'
    },
    hasLinkedTreatmentPlan: true,
    treatmentPlanId: 2
  },
  {
    id: 3,
    name: 'Förstorade porer',
    type: 'Dilaterade sebaceösa porer',
    category: 'Hudtextur',
    severity: 'Måttlig',
    status: 'Aktivt',
    description: 'Synliga porer främst i T-zonen på grund av överproduktion av talg.',
    areas: [
      {
        region: 'Ansikte',
        subAreas: ['Näsa', 'Kinder'],
        isComplete: false
      }
    ],
    symptoms: [
      { id: 8, name: 'Stora porer', score: 65, severity: 'Måttlig' },
      { id: 9, name: 'Ojämn hudtextur', score: 55, severity: 'Måttlig' }
    ],
    firstDiagnosed: '2023-02-15',
    lastAssessed: '2024-07-01',
    nextAssessment: '2024-09-01',
    images: {
      before: '/placeholder-before.jpg',
      current: '/placeholder-current.jpg'
    },
    hasLinkedTreatmentPlan: false
  },
  {
    id: 4,
    name: 'Rosacea',
    type: 'Rosacea Erythematotelangiectatic',
    category: 'Rosacea',
    severity: 'Lindrig',
    status: 'Stabil',
    description: 'Lätta rodnader och irritation, främst på kinderna och näsvingarna.',
    areas: [
      {
        region: 'Ansikte',
        subAreas: ['Kinder', 'Näsa'],
        isComplete: false
      }
    ],
    symptoms: [
      { id: 10, name: 'Rodnader', score: 40, severity: 'Måttlig' },
      { id: 11, name: 'Känslig hud', score: 45, severity: 'Måttlig' },
      { id: 12, name: 'Brännande känsla', score: 30, severity: 'Lindrig' }
    ],
    firstDiagnosed: '2024-03-15',
    lastAssessed: '2024-07-01',
    nextAssessment: '2024-08-15',
    images: {
      before: '/placeholder-before.jpg',
      current: '/placeholder-current.jpg'
    },
    hasLinkedTreatmentPlan: true,
    treatmentPlanId: 3
  }
];