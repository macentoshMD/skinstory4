import { InventoryItem } from '@/components/products/ProductInventoryTable';

export const mockInventoryData: InventoryItem[] = [
  // Försäljningsprodukter
  {
    id: 'sales-1',
    name: 'Gentle Cleansing Foam',
    brand: 'Dermalogica',
    category: 'sales',
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
    name: 'Retinol Complex',
    brand: 'Obagi',
    category: 'sales',
    shortDescription: 'Retinol för anti-aging',
    variants: [
      {
        id: 'sales-3-0.25',
        name: '0.25% Retinol',
        description: 'Mild retinol för nybörjare, 28g',
        pricePerUnit: 650,
        packSize: 1,
        unit: 'st',
        supplier: 'Obagi Medical'
      },
      {
        id: 'sales-3-0.5',
        name: '0.5% Retinol',
        description: 'Medium styrka retinol, 28g',
        pricePerUnit: 890,
        packSize: 1,
        unit: 'st',
        supplier: 'Obagi Medical'
      },
      {
        id: 'sales-3-1.0',
        name: '1.0% Retinol',
        description: 'Stark retinol för erfarna användare, 28g',
        pricePerUnit: 1150,
        packSize: 1,
        unit: 'st',
        supplier: 'Obagi Medical'
      }
    ]
  },

  // Behandlingsprodukter
  {
    id: 'treatment-1',
    name: 'Glycolic Acid Peel',
    brand: 'Obagi',
    category: 'treatment',
    treatmentType: 'other',
    shortDescription: 'Professionell kemisk peeling',
    variants: [
      {
        id: 'treatment-1-20',
        name: '20% Glykolsyra',
        description: 'Mild professionell glykolsyrapeeling, 50ml',
        pricePerUnit: 95,
        packSize: 50,
        unit: 'ml',
        supplier: 'Obagi Medical'
      },
      {
        id: 'treatment-1-30',
        name: '30% Glykolsyra',
        description: 'Medium professionell glykolsyrapeeling, 50ml',
        pricePerUnit: 125,
        packSize: 50,
        unit: 'ml',
        supplier: 'Obagi Medical'
      },
      {
        id: 'treatment-1-50',
        name: '50% Glykolsyra',
        description: 'Stark professionell glykolsyrapeeling, 50ml',
        pricePerUnit: 185,
        packSize: 50,
        unit: 'ml',
        supplier: 'Obagi Medical'
      }
    ]
  },
  {
    id: 'treatment-2',
    name: 'Professional Cleansing Solution',
    brand: 'Dermalogica',
    category: 'treatment',
    treatmentType: 'other',
    shortDescription: 'Professionell rengöring för behandlingar',
    variants: [
      {
        id: 'treatment-2-250ml',
        name: '250ml',
        description: 'Professionell rengöring för behandlingar',
        pricePerUnit: 2.5,
        packSize: 250,
        unit: 'ml',
        supplier: 'Dermalogica AB'
      }
    ]
  },

  // Förbrukningsmaterial
  {
    id: 'consumables-1',
    name: 'Engångslancsetter',
    brand: 'MedSupply',
    category: 'consumables',
    shortDescription: 'Sterila lancsetter för hudanalyser',
    variants: [
      {
        id: 'consumables-1-standard',
        name: 'Standard 21G',
        description: 'Sterila engångslancsetter 21G för hudanalyser',
        pricePerUnit: 2.5,
        packSize: 100,
        unit: 'st',
        supplier: 'MedSupply AB'
      },
      {
        id: 'consumables-1-fine',
        name: 'Fin 23G',
        description: 'Sterila engångslancsetter 23G för känslig hud',
        pricePerUnit: 3.2,
        packSize: 100,
        unit: 'st',
        supplier: 'MedSupply AB'
      },
      {
        id: 'consumables-1-ultra',
        name: 'Ultra fin 25G',
        description: 'Sterila engångslancsetter 25G för mycket känslig hud',
        pricePerUnit: 4.1,
        packSize: 100,
        unit: 'st',
        supplier: 'MedSupply AB'
      }
    ]
  },
  {
    id: 'consumables-2',
    name: 'Bomullspads',
    brand: 'CottonCare',
    category: 'consumables',
    shortDescription: 'Ekologiska bomullspads för rengöring',
    variants: [
      {
        id: 'consumables-2-round',
        name: 'Runda pads',
        description: 'Ekologiska runda bomullspads för rengöring',
        pricePerUnit: 0.25,
        packSize: 100,
        unit: 'st',
        supplier: 'CottonCare AB'
      },
      {
        id: 'consumables-2-square',
        name: 'Fyrkantiga pads',
        description: 'Ekologiska fyrkantiga bomullspads för precision',
        pricePerUnit: 0.32,
        packSize: 100,
        unit: 'st',
        supplier: 'CottonCare AB'
      }
    ]
  },
  {
    id: 'consumables-3',
    name: 'Nitrilhandskar',
    brand: 'SafeHands',
    category: 'consumables',
    shortDescription: 'Puderfria nitrilhandskar',
    variants: [
      {
        id: 'consumables-3-s',
        name: 'Small',
        description: 'Puderfria nitrilhandskar, storlek S',
        pricePerUnit: 0.75,
        packSize: 100,
        unit: 'st',
        supplier: 'SafeHands Medical'
      },
      {
        id: 'consumables-3-m',
        name: 'Medium',
        description: 'Puderfria nitrilhandskar, storlek M',
        pricePerUnit: 0.8,
        packSize: 100,
        unit: 'st',
        supplier: 'SafeHands Medical'
      },
      {
        id: 'consumables-3-l',
        name: 'Large',
        description: 'Puderfria nitrilhandskar, storlek L',
        pricePerUnit: 0.85,
        packSize: 100,
        unit: 'st',
        supplier: 'SafeHands Medical'
      },
      {
        id: 'consumables-3-xl',
        name: 'Extra Large',
        description: 'Puderfria nitrilhandskar, storlek XL',
        pricePerUnit: 0.9,
        packSize: 100,
        unit: 'st',
        supplier: 'SafeHands Medical'
      }
    ]
  },
  {
    id: 'consumables-4',
    name: 'Desinfektionsmedel',
    brand: 'CleanCorp',
    category: 'consumables',
    shortDescription: 'Professionellt desinfektionsmedel',
    variants: [
      {
        id: 'consumables-4-1l',
        name: '1 Liter',
        description: 'Professionellt desinfektionsmedel för ytor, 1L',
        pricePerUnit: 45,
        packSize: 1,
        unit: 'liter',
        supplier: 'CleanCorp AB'
      },
      {
        id: 'consumables-4-5l',
        name: '5 Liter',
        description: 'Professionellt desinfektionsmedel för ytor, 5L påfyllning',
        pricePerUnit: 38,
        packSize: 5,
        unit: 'liter',
        supplier: 'CleanCorp AB'
      }
    ]
  },

  // Fler behandlingsprodukter för olika typer
  {
    id: 'treatment-3',
    name: 'Botox Injektioner',
    brand: 'Allergan',
    category: 'treatment',
    treatmentType: 'injections',
    shortDescription: 'Botox för estetiska behandlingar',
    variants: [
      {
        id: 'treatment-3-50u',
        name: '50 Enheter',
        description: 'Botox injektioner, 50 enheter per flaska',
        pricePerUnit: 3200,
        packSize: 1,
        unit: 'flaska',
        supplier: 'Allergan AB'
      },
      {
        id: 'treatment-3-100u',
        name: '100 Enheter',
        description: 'Botox injektioner, 100 enheter per flaska',
        pricePerUnit: 5800,
        packSize: 1,
        unit: 'flaska',
        supplier: 'Allergan AB'
      }
    ]
  },
  {
    id: 'treatment-4',
    name: 'HydraFacial Serum',
    brand: 'HydraFacial',
    category: 'treatment',
    treatmentType: 'hydrafacial',
    shortDescription: 'Serum för HydraFacial behandlingar',
    variants: [
      {
        id: 'treatment-4-30ml',
        name: 'Glow Serum 30ml',
        description: 'Brightening serum för HydraFacial',
        pricePerUnit: 850,
        packSize: 1,
        unit: 'flaska',
        supplier: 'HydraFacial Sweden'
      },
      {
        id: 'treatment-4-anti-aging',
        name: 'Anti-Aging Serum 30ml',
        description: 'Anti-aging serum för HydraFacial',
        pricePerUnit: 950,
        packSize: 1,
        unit: 'flaska',
        supplier: 'HydraFacial Sweden'
      }
    ]
  },
  {
    id: 'treatment-5',
    name: 'Laser Handpiece',
    brand: 'Cutera',
    category: 'treatment',
    treatmentType: 'machines',
    shortDescription: 'Reservdelar för lasermaskin',
    variants: [
      {
        id: 'treatment-5-1064nm',
        name: '1064nm Handpiece',
        description: 'Handpiece för 1064nm laser',
        pricePerUnit: 45000,
        packSize: 1,
        unit: 'st',
        supplier: 'Cutera Nordic'
      },
      {
        id: 'treatment-5-532nm',
        name: '532nm Handpiece',
        description: 'Handpiece för 532nm laser',
        pricePerUnit: 38000,
        packSize: 1,
        unit: 'st',
        supplier: 'Cutera Nordic'
      }
    ]
  }
];