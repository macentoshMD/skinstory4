
export interface EquipmentHandpiece {
  id: string;
  name: string;
  type: string; // t.ex. "DyeVL (IPL)", "iPixel (Ablativ)"
  description: string;
  technicalSpecs: {
    wavelength?: string;
    maxPower?: string;
    spotSize?: string;
    otherSpecs?: string;
  };
  isActive: boolean;
}

// Handenheter för olika utrustning
export const EQUIPMENT_HANDPIECES: Record<string, EquipmentHandpiece[]> = {
  'alma-harmony-xl-pro': [
    {
      id: 'dye-vl-ipl',
      name: 'DyeVL',
      type: 'IPL',
      description: 'Intensivt pulserat ljus för hårborttagning och kärlbehandling',
      technicalSpecs: {
        wavelength: '515-1200nm',
        maxPower: '50 J/cm²',
        spotSize: '8-35mm',
        otherSpecs: 'Dual mode filtering, OPT technology'
      },
      isActive: true
    },
    {
      id: 'ipixel-ablative',
      name: 'iPixel',
      type: 'Ablativ',
      description: 'Fraktionell ablativ behandling för ärr och anti-age',
      technicalSpecs: {
        wavelength: '2940nm',
        maxPower: '30W',
        otherSpecs: 'Fractional Er:YAG, variable spot sizes'
      },
      isActive: true
    },
    {
      id: 'clearlift-qswitch',
      name: 'ClearLift',
      type: 'Q-Switch',
      description: 'Non-ablativ Q-Switch för pigmentbehandling',
      technicalSpecs: {
        wavelength: '1064nm',
        maxPower: '1000mJ',
        spotSize: '2-10mm',
        otherSpecs: 'Q-Switch Nd:YAG, nanosecond pulses'
      },
      isActive: true
    },
    {
      id: 'clearskin-nonablative',
      name: 'ClearSkin',
      type: 'Non-ablativ',
      description: 'Mild hudförbättring och porbehandling',
      technicalSpecs: {
        wavelength: '1320nm',
        maxPower: '300W',
        otherSpecs: 'Non-ablative Nd:YAG, gentle skin renewal'
      },
      isActive: true
    }
  ],
  'alma-hybrid': [
    {
      id: 'hybrid-co2',
      name: 'CO2 Laser',
      type: 'Ablativ CO2',
      description: 'Fraktionell CO2 laser för hudförnyelse',
      technicalSpecs: {
        wavelength: '10600nm',
        maxPower: '30W',
        otherSpecs: 'Fractional CO2, scanning technology'
      },
      isActive: true
    },
    {
      id: 'hybrid-rf',
      name: 'Radiofrekvens',
      type: 'Fraktionell RF',
      description: 'Bipolar radiofrekvens för hudstramning',
      technicalSpecs: {
        maxPower: '62W',
        otherSpecs: 'Bipolar RF, fractional delivery'
      },
      isActive: true
    }
  ]
};
