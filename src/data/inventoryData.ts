import { InventoryItem } from '@/components/products/ProductInventoryTable';

export const mockInventoryData: InventoryItem[] = [
  // Försäljningsprodukter
  {
    id: 'sales-1',
    name: 'Gentle Cleansing Foam',
    brand: 'Dermalogica',
    category: 'sales',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop',
    shortDescription: 'Mild rengöring för känslig hud',
    variants: [
      {
        id: 'sales-1-150ml',
        name: '150ml',
        description: 'Mild rengöring för känslig hud, standardstorlek',
        pricePerUnit: 485,
        packSize: 1,
        unit: 'st',
        supplier: 'Dermalogica AB'
      },
      {
        id: 'sales-1-250ml',
        name: '250ml',
        description: 'Mild rengöring för känslig hud, stor storlek',
        pricePerUnit: 695,
        packSize: 1,
        unit: 'st',
        supplier: 'Dermalogica AB'
      }
    ]
  },
  {
    id: 'sales-2',
    name: 'Vitamin C Serum',
    brand: 'SkinCeuticals',
    category: 'sales',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop',
    shortDescription: 'Antioxidantserum för ljusare hud',
    variants: [
      {
        id: 'sales-2-30ml',
        name: 'CE Ferulic 30ml',
        description: 'Antioxidantserum med 15% L-askorbinsyra',
        pricePerUnit: 1250,
        packSize: 1,
        unit: 'st',
        supplier: 'SkinCeuticals Nordic'
      }
    ]
  },
  {
    id: 'sales-3',
    name: 'Hyaluronic Acid Moisturizer',
    brand: 'Neutrogena',
    category: 'sales',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    shortDescription: 'Intensiv fuktgivare med hyaluronsyra',
    variants: [
      {
        id: 'sales-3-50ml',
        name: '50ml',
        description: 'Intensiv fuktgivare med hyaluronsyra',
        pricePerUnit: 295,
        packSize: 1,
        unit: 'st',
        supplier: 'Johnson & Johnson'
      }
    ]
  },
  {
    id: 'sales-4',
    name: 'Retinol Night Cream',
    brand: 'Olay',
    category: 'sales',
    image: 'https://images.unsplash.com/photo-1556228949-f609b5d31f05?w=400&h=300&fit=crop',
    shortDescription: 'Antioåldringskräm med retinol',
    variants: [
      {
        id: 'sales-4-50ml',
        name: '50ml',
        description: 'Antioåldringskräm med retinol för nattvård',
        pricePerUnit: 425,
        packSize: 1,
        unit: 'st',
        supplier: 'Procter & Gamble'
      }
    ]
  },
  {
    id: 'sales-5',
    name: 'Sunscreen SPF 50',
    brand: 'La Roche-Posay',
    category: 'sales',
    image: 'https://images.unsplash.com/photo-1556228578-dd6c8c2d9cea?w=400&h=300&fit=crop',
    shortDescription: 'Högt skydd mot UV-strålning',
    variants: [
      {
        id: 'sales-5-50ml',
        name: '50ml',
        description: 'Bred spektrum solskydd SPF 50',
        pricePerUnit: 195,
        packSize: 1,
        unit: 'st',
        supplier: 'L\'Oréal Nordic'
      }
    ]
  },
  {
    id: 'sales-6',
    name: 'Exfoliating Toner',
    brand: 'Paula\'s Choice',
    category: 'sales',
    image: 'https://images.unsplash.com/photo-1556228720-da4e85b51eb4?w=400&h=300&fit=crop',
    shortDescription: 'BHA-toner för pormaskar och orenheter',
    variants: [
      {
        id: 'sales-6-200ml',
        name: '200ml',
        description: '2% salicylsyra för att rensa porer',
        pricePerUnit: 325,
        packSize: 1,
        unit: 'st',
        supplier: 'Paula\'s Choice Europe'
      }
    ]
  },

  // Behandlingsprodukter - Injektioner
  {
    id: 'treatment-1',
    name: 'FillerPro Advance',
    brand: 'Restylane',
    category: 'treatment',
    treatmentType: 'injections',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop',
    shortDescription: 'Premium hyaluronsyrafiller för volymgivning',
    variants: [
      {
        id: 'treatment-1-30',
        name: '1ml spruta',
        description: 'Hyaluronsyrafiller för läppar och mindre ansiktsområden',
        pricePerUnit: 3500,
        packSize: 1,
        unit: 'spruta',
        supplier: 'Galderma Nordic'
      }
    ]
  },
  {
    id: 'treatment-2',
    name: 'Botox Cosmetic',
    brand: 'Allergan',
    category: 'treatment',
    treatmentType: 'injections',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop',
    shortDescription: 'Botulinum toxin för rynkbehandling',
    variants: [
      {
        id: 'treatment-2-100',
        name: '100 enheter',
        description: 'Botulinum toxin typ A för estetiska behandlingar',
        pricePerUnit: 4200,
        packSize: 1,
        unit: 'flaska',
        supplier: 'AbbVie AB'
      }
    ]
  },
  {
    id: 'treatment-3',
    name: 'Sculptra Aesthetic',
    brand: 'Galderma',
    category: 'treatment',
    treatmentType: 'injections',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop',
    shortDescription: 'Poly-L-mjölksyra för kollagenstimulering',
    variants: [
      {
        id: 'treatment-3-vial',
        name: 'En flaska',
        description: 'Stimulerar naturlig kollagenproduktion',
        pricePerUnit: 3800,
        packSize: 1,
        unit: 'flaska',
        supplier: 'Galderma Nordic'
      }
    ]
  },
  {
    id: 'treatment-4',
    name: 'Belotero Balance',
    brand: 'Merz',
    category: 'treatment',
    treatmentType: 'injections',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop',
    shortDescription: 'Mjuk hyaluronsyrafiller för naturliga resultat',
    variants: [
      {
        id: 'treatment-4-1ml',
        name: '1ml spruta',
        description: 'Hyaluronsyrafiller för fina linjer',
        pricePerUnit: 3200,
        packSize: 1,
        unit: 'spruta',
        supplier: 'Merz Aesthetics'
      }
    ]
  },
  {
    id: 'treatment-5',
    name: 'Profhilo',
    brand: 'IBSA',
    category: 'treatment',
    treatmentType: 'injections',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop',
    shortDescription: 'Bio-remodellering av huden',
    variants: [
      {
        id: 'treatment-5-2ml',
        name: '2ml spruta',
        description: 'Hög och låg molekylvikt hyaluronsyra',
        pricePerUnit: 2800,
        packSize: 1,
        unit: 'spruta',
        supplier: 'IBSA Nordic'
      }
    ]
  },
  {
    id: 'treatment-6',
    name: 'Mesotherapy Cocktail',
    brand: 'Mesoestetic',
    category: 'treatment',
    treatmentType: 'injections',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop',
    shortDescription: 'Vitaminkomplex för hudföryngring',
    variants: [
      {
        id: 'treatment-6-1ml',
        name: '1ml ampull',
        description: 'Koncentrerad vitaminkocktail för mesoterapi',
        pricePerUnit: 450,
        packSize: 5,
        unit: 'ampuller',
        supplier: 'Mesoestetic Pharma'
      }
    ]
  },

  // Behandlingsprodukter - Apparatur
  {
    id: 'treatment-7',
    name: 'IPL Cartridge',
    brand: 'Lumenis',
    category: 'treatment',
    treatmentType: 'apparatus',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
    shortDescription: 'IPL-patron för permanent hårborttagning',
    variants: [
      {
        id: 'treatment-7-cart',
        name: 'Standard patron',
        description: 'IPL-patron för hårborttagning, 3000 skott',
        pricePerUnit: 1200,
        packSize: 1,
        unit: 'patron',
        supplier: 'Lumenis Nordic'
      }
    ]
  },
  {
    id: 'treatment-8',
    name: 'Laser Handpiece',
    brand: 'Candela',
    category: 'treatment',
    treatmentType: 'apparatus',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
    shortDescription: 'Alexandrit laser handstycke',
    variants: [
      {
        id: 'treatment-8-hand',
        name: '18mm spot',
        description: 'Alexandrit laser för hårborttagning',
        pricePerUnit: 2800,
        packSize: 1,
        unit: 'handstycke',
        supplier: 'Candela Medical'
      }
    ]
  },
  {
    id: 'treatment-9',
    name: 'RF Microneedling Tips',
    brand: 'Morpheus8',
    category: 'treatment',
    treatmentType: 'apparatus',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
    shortDescription: 'Engångsspetsar för RF microneedling',
    variants: [
      {
        id: 'treatment-9-tips',
        name: '24-pin spetsar',
        description: 'Sterila engångsspetsar för Morpheus8',
        pricePerUnit: 180,
        packSize: 10,
        unit: 'spetsar',
        supplier: 'InMode Nordic'
      }
    ]
  },

  // Behandlingsprodukter - Preparat
  {
    id: 'treatment-10',
    name: 'Chemical Peel TCA',
    brand: 'SkinMedica',
    category: 'treatment',
    treatmentType: 'preparations',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
    shortDescription: 'Triklorättiksyra för kemisk peeling',
    variants: [
      {
        id: 'treatment-10-20ml',
        name: '20% TCA',
        description: 'Mediumdjup kemisk peeling för hudföryngring',
        pricePerUnit: 850,
        packSize: 1,
        unit: 'flaska',
        supplier: 'Allergan Professional'
      }
    ]
  },
  {
    id: 'treatment-11',
    name: 'Glycolic Acid Peel',
    brand: 'SkinCeuticals',
    category: 'treatment',
    treatmentType: 'preparations',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
    shortDescription: 'Glykolsyra för ytlig peeling',
    variants: [
      {
        id: 'treatment-11-30ml',
        name: '30% Glykolsyra',
        description: 'Professionell glykolsyrapeeling',
        pricePerUnit: 650,
        packSize: 1,
        unit: 'flaska',
        supplier: 'SkinCeuticals Professional'
      }
    ]
  },
  {
    id: 'treatment-12',
    name: 'PRF Kit',
    brand: 'Regen Lab',
    category: 'treatment',
    treatmentType: 'preparations',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
    shortDescription: 'Platelet Rich Fibrin kit',
    variants: [
      {
        id: 'treatment-12-kit',
        name: 'PRF Kit',
        description: 'Komplett kit för PRF-behandling',
        pricePerUnit: 320,
        packSize: 5,
        unit: 'kit',
        supplier: 'Regen Lab Nordic'
      }
    ]
  },

  // Förbrukningsvaror
  {
    id: 'consumables-1',
    name: 'Engångssprutor',
    brand: 'BD',
    category: 'consumables',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
    shortDescription: 'Sterila engångssprutor för injektioner',
    variants: [
      {
        id: 'consumables-1-standard',
        name: '1ml Luer-lock',
        description: 'Sterila engångssprutor med Luer-lock anslutning',
        pricePerUnit: 1.25,
        packSize: 100,
        unit: 'st',
        supplier: 'BD Medical'
      }
    ]
  },
  {
    id: 'consumables-2',
    name: 'Kanyler',
    brand: 'Terumo',
    category: 'consumables',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
    shortDescription: 'Engångskanyler i olika storlekar',
    variants: [
      {
        id: 'consumables-2-round',
        name: '30G x 13mm',
        description: 'Tunna engångskanyler för fillerinjektioner',
        pricePerUnit: 0.85,
        packSize: 100,
        unit: 'st',
        supplier: 'Terumo Europe'
      },
      {
        id: 'consumables-2-sharp',
        name: '27G x 40mm',
        description: 'Kanyler för djupare injektioner',
        pricePerUnit: 0.95,
        packSize: 100,
        unit: 'st',
        supplier: 'Terumo Europe'
      }
    ]
  },
  {
    id: 'consumables-3',
    name: 'Handskar',
    brand: 'Ansell',
    category: 'consumables',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
    shortDescription: 'Nitrilhandskar puderfria',
    variants: [
      {
        id: 'consumables-3-s',
        name: 'Storlek S',
        description: 'Nitrilhandskar puderfria, småstorlek',
        pricePerUnit: 0.65,
        packSize: 200,
        unit: 'st',
        supplier: 'Ansell Healthcare'
      },
      {
        id: 'consumables-3-m',
        name: 'Storlek M',
        description: 'Nitrilhandskar puderfria, mellanstorlek',
        pricePerUnit: 0.65,
        packSize: 200,
        unit: 'st',
        supplier: 'Ansell Healthcare'
      },
      {
        id: 'consumables-3-l',
        name: 'Storlek L',
        description: 'Nitrilhandskar puderfria, stor storlek',
        pricePerUnit: 0.65,
        packSize: 200,
        unit: 'st',
        supplier: 'Ansell Healthcare'
      }
    ]
  },
  {
    id: 'consumables-4',
    name: 'Desinfektionsmedel',
    brand: 'Dax',
    category: 'consumables',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
    shortDescription: 'Alkoholbaserat desinfektionsmedel',
    variants: [
      {
        id: 'consumables-4-500ml',
        name: '500ml pump',
        description: 'Handdesinfektionsmedel 70% alkohol',
        pricePerUnit: 85,
        packSize: 1,
        unit: 'flaska',
        supplier: 'Dax Hygien'
      }
    ]
  },
  {
    id: 'consumables-5',
    name: 'Engångshandukar',
    brand: 'Tork',
    category: 'consumables',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
    shortDescription: 'Mjuka engångshandukar för kliniken',
    variants: [
      {
        id: 'consumables-5-pack',
        name: 'Handduksrulle',
        description: 'Mjuka engångshandukar, 150 ark per rulle',
        pricePerUnit: 45,
        packSize: 6,
        unit: 'rullar',
        supplier: 'Essity Professional'
      }
    ]
  },
  {
    id: 'consumables-6',
    name: 'Stretchtejp',
    brand: '3M',
    category: 'consumables',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
    shortDescription: 'Elastisk tejp för fixering',
    variants: [
      {
        id: 'consumables-6-5cm',
        name: '5cm x 4.5m',
        description: 'Elastisk tejp för säker fixering',
        pricePerUnit: 35,
        packSize: 12,
        unit: 'rullar',
        supplier: '3M Health Care'
      }
    ]
  },
  {
    id: 'consumables-7',
    name: 'Kompressen',
    brand: 'Hartmann',
    category: 'consumables',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
    shortDescription: 'Sterila kompressen för sårvård',
    variants: [
      {
        id: 'consumables-7-10x10',
        name: '10x10cm',
        description: 'Sterila kompressen för sårvård och rengöring',
        pricePerUnit: 0.85,
        packSize: 100,
        unit: 'st',
        supplier: 'Hartmann Nordic'
      }
    ]
  },
  {
    id: 'consumables-8',
    name: 'Lokalbedövning',
    brand: 'Lidocain',
    category: 'consumables',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
    shortDescription: 'Lidokain 2% för lokalbedövning',
    variants: [
      {
        id: 'consumables-8-50ml',
        name: '50ml ampull',
        description: 'Lidokain 2% utan adrenalin',
        pricePerUnit: 25,
        packSize: 10,
        unit: 'ampuller',
        supplier: 'Fresenius Kabi'
      }
    ]
  },
  {
    id: 'consumables-9',
    name: 'Undersökningspapper',
    brand: 'MediQo-line',
    category: 'consumables',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
    shortDescription: 'Engångspapper för behandlingsbänk',
    variants: [
      {
        id: 'consumables-9-roll',
        name: '50cm bred rulle',
        description: 'Mjukt undersökningspapper, 100m rulle',
        pricePerUnit: 185,
        packSize: 1,
        unit: 'rulle',
        supplier: 'MediQo-line Nordic'
      }
    ]
  },
  {
    id: 'consumables-10',
    name: 'Skyddsglasögon',
    brand: 'Uvex',
    category: 'consumables',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
    shortDescription: 'Skyddsglasögon för laserbehandlingar',
    variants: [
      {
        id: 'consumables-10-laser',
        name: 'Laser 755nm',
        description: 'Skyddsglasögon för alexandrit laser',
        pricePerUnit: 280,
        packSize: 1,
        unit: 'st',
        supplier: 'Uvex Safety'
      }
    ]
  }
];