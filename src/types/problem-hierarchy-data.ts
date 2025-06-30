
import { BaseProblem } from './problem-hierarchy-interfaces';

export const PROBLEM_HIERARCHY: BaseProblem[] = [
  {
    id: 'acne',
    name: 'Acne',
    description: 'Inflammatorisk hudsjukdom som påverkar talgkörtlarna',
    category: 'inflammatory',
    subProblems: [
      {
        id: 'acne-tarda',
        name: 'Acne Tarda (vuxenacne)',
        description: 'Acne som uppträder eller kvarstår efter 25 års ålder',
        symptoms: [
          {
            id: 'papules',
            medicalName: 'Papler',
            commonName: 'Röda knottror',
            description: 'Små röda upphöjda områden på huden'
          },
          {
            id: 'pustules',
            medicalName: 'Pustler',
            commonName: 'Varfyllda finnar',
            description: 'Inflammerade lesioner med synlig var'
          },
          {
            id: 'nodules',
            medicalName: 'Noduler',
            commonName: 'Djupa finnar',
            description: 'Stora, djupa och smärtsamma inflammationer'
          }
        ]
      },
      {
        id: 'acne-vulgaris',
        name: 'Acne Vulgaris (tonårsacne)',
        description: 'Vanligaste formen av acne som uppträder under puberteten',
        symptoms: [
          {
            id: 'open-comedones',
            medicalName: 'Öppna komedoner',
            commonName: 'Pormaskar',
            description: 'Svarta prickar orsakade av tilltäppta porer'
          },
          {
            id: 'closed-comedones',
            medicalName: 'Stängda komedoner',
            commonName: 'Vita finnar',
            description: 'Små vita upphöjningar under huden'
          },
          {
            id: 'cysts',
            medicalName: 'Cystor',
            commonName: 'Djupa cystor',
            description: 'Stora, djupa lesioner som kan lämna ärr'
          }
        ]
      }
    ]
  },
  {
    id: 'pigmentation',
    name: 'Pigmentförändringar',
    description: 'Förändringar i hudens pigmentering',
    category: 'pigmentary',
    subProblems: [
      {
        id: 'melasma',
        name: 'Melasma',
        description: 'Hormonell pigmentförändring, ofta kallad "graviditetsmask"',
        symptoms: [
          {
            id: 'facial-patches',
            medicalName: 'Ansiktsfläckar',
            commonName: 'Bruna fläckar i ansiktet',
            description: 'Symmetriska bruna fläckar på kinder och panna'
          },
          {
            id: 'upper-lip-darkening',
            medicalName: 'Överläppspigmentering',
            commonName: 'Mörk överläpp',
            description: 'Mörkfärgning av huden ovanför överläppen'
          }
        ]
      },
      {
        id: 'age-spots',
        name: 'Åldersfläckar',
        description: 'Solskador som ger upphov till pigmentfläckar',
        symptoms: [
          {
            id: 'solar-lentigines',
            medicalName: 'Solära lentigo',
            commonName: 'Åldersfläckar',
            description: 'Bruna fläckar orsakade av solskador'
          },
          {
            id: 'sun-spots',
            medicalName: 'Solfläckar',
            commonName: 'Bruna fläckar',
            description: 'Ojämn pigmentering från UV-exponering'
          }
        ]
      }
    ]
  },
  {
    id: 'aging',
    name: 'Hudåldrande',
    description: 'Tecken på hudens naturliga åldringsprocess',
    category: 'aging',
    subProblems: [
      {
        id: 'wrinkles',
        name: 'Rynkor',
        description: 'Linjer och veckor i huden orsakade av åldrande',
        symptoms: [
          {
            id: 'fine-lines',
            medicalName: 'Fina linjer',
            commonName: 'Små rynkor',
            description: 'Tunna linjer, ofta runt ögonen'
          },
          {
            id: 'deep-wrinkles',
            medicalName: 'Djupa rynkor',
            commonName: 'Märkbara rynkor',
            description: 'Djupare fåror i huden'
          }
        ]
      },
      {
        id: 'sagging',
        name: 'Hängande hud',
        description: 'Förlust av hudens elasticitet och fasthet',
        symptoms: [
          {
            id: 'jowls',
            medicalName: 'Käkslack',
            commonName: 'Hängande kinder',
            description: 'Slapp hud längs käklinjen'
          },
          {
            id: 'neck-sagging',
            medicalName: 'Halsslack',
            commonName: 'Slapp hals',
            description: 'Hängande hud på halsen'
          }
        ]
      }
    ]
  }
];
