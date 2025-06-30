
export interface Contraindication {
  id: string;
  name: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  category: string;
  mainCategory: string;
  emoji: string;
}

export interface ContraIndicationCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
  subcategories: string[];
}

export const CONTRAINDICATION_CATEGORIES: ContraIndicationCategory[] = [
  {
    id: 'medical',
    name: 'Medicinska tillstånd',
    emoji: '🏥',
    description: 'Medicinska sjukdomar och tillstånd',
    subcategories: ['autoimmune', 'skin_diseases', 'general_medical', 'skin_cancer']
  },
  {
    id: 'medications',
    name: 'Mediciner & Läkemedel',
    emoji: '💊',
    description: 'Läkemedel som kan påverka behandlingar',
    subcategories: ['photosensitive', 'blood_thinners', 'immunosuppressive']
  },
  {
    id: 'skin_type',
    name: 'Hudtyp & Hudton',
    emoji: '🌈',
    description: 'Hudtyp och hudens nuvarande status',
    subcategories: ['fitzpatrick', 'skin_status']
  },
  {
    id: 'pregnancy',
    name: 'Graviditet & Amning',
    emoji: '🤰',
    description: 'Reproduktiv hälsa och hormonella förändringar',
    subcategories: ['reproductive', 'hormonal']
  },
  {
    id: 'previous_treatments',
    name: 'Tidigare behandlingar',
    emoji: '🕐',
    description: 'Nyligen genomförda behandlingar och ingrepp',
    subcategories: ['recent_treatments', 'surgery']
  },
  {
    id: 'skin_infection',
    name: 'Hudstatus & Infektion',
    emoji: '🔄',
    description: 'Aktiva hudproblem och infektioner',
    subcategories: ['active_problems', 'health_status']
  },
  {
    id: 'age',
    name: 'Ålder & Utveckling',
    emoji: '👶',
    description: 'Åldersrelaterade begränsningar',
    subcategories: ['age_related']
  },
  {
    id: 'lifestyle',
    name: 'Livsstil & Exponering',
    emoji: '🏖️',
    description: 'Sol- och UV-exponering',
    subcategories: ['sun_exposure']
  }
];

export const CONTRAINDICATIONS: Contraindication[] = [
  // 🏥 MEDICINSKA TILLSTÅND - Autoimmuna sjukdomar
  {
    id: 'lupus',
    name: 'Lupus (SLE)',
    description: 'Systemisk lupus erythematosus',
    severity: 'high',
    category: 'autoimmune',
    mainCategory: 'medical',
    emoji: '🏥'
  },
  {
    id: 'rheumatoid_arthritis',
    name: 'Reumatoid Artrit',
    description: 'Autoimmun ledsjukdom',
    severity: 'high',
    category: 'autoimmune',
    mainCategory: 'medical',
    emoji: '🏥'
  },
  {
    id: 'scleroderma',
    name: 'Sklerodermi',
    description: 'Autoimmun bindvävssjukdom',
    severity: 'high',
    category: 'autoimmune',
    mainCategory: 'medical',
    emoji: '🏥'
  },
  {
    id: 'active_psoriasis',
    name: 'Psoriasis (aktiv)',
    description: 'Aktiv psoriasis i behandlingsområdet',
    severity: 'medium',
    category: 'autoimmune',
    mainCategory: 'medical',
    emoji: '🏥'
  },
  {
    id: 'vitiligo',
    name: 'Vitiligo',
    description: 'Pigmentförlust i huden',
    severity: 'medium',
    category: 'autoimmune',
    mainCategory: 'medical',
    emoji: '🏥'
  },
  {
    id: 'alopecia_areata',
    name: 'Alopecia Areata',
    description: 'Autoimmun håravfall',
    severity: 'medium',
    category: 'autoimmune',
    mainCategory: 'medical',
    emoji: '🏥'
  },

  // Hudsjukdomar
  {
    id: 'active_eczema',
    name: 'Aktiv Eksem',
    description: 'Aktiv eksem i behandlingsområdet',
    severity: 'high',
    category: 'skin_diseases',
    mainCategory: 'medical',
    emoji: '🏥'
  },
  {
    id: 'active_dermatitis',
    name: 'Aktiv Dermatit',
    description: 'Aktiv dermatit i behandlingsområdet',
    severity: 'high',
    category: 'skin_diseases',
    mainCategory: 'medical',
    emoji: '🏥'
  },
  {
    id: 'keloid_tendency',
    name: 'Keloidbenägenhet',
    description: 'Benägenhet för keloidärrbildning',
    severity: 'high',
    category: 'skin_diseases',
    mainCategory: 'medical',
    emoji: '🏥'
  },
  {
    id: 'abnormal_scarring',
    name: 'Abnormal ärrbildning',
    description: 'Tidigare abnormal ärrbildning',
    severity: 'high',
    category: 'skin_diseases',
    mainCategory: 'medical',
    emoji: '🏥'
  },
  {
    id: 'melasma',
    name: 'Melasma',
    description: 'Hormonell pigmentering (för vissa behandlingar)',
    severity: 'medium',
    category: 'skin_diseases',
    mainCategory: 'medical',
    emoji: '🏥'
  },
  {
    id: 'active_herpes',
    name: 'Aktiv Herpes',
    description: 'Aktiv herpes i behandlingsområdet',
    severity: 'high',
    category: 'skin_diseases',
    mainCategory: 'medical',
    emoji: '🏥'
  },

  // Allmänna medicinska tillstånd
  {
    id: 'uncontrolled_diabetes',
    name: 'Diabetes (okontrollerad)',
    description: 'Okontrollerad diabetes mellitus',
    severity: 'high',
    category: 'general_medical',
    mainCategory: 'medical',
    emoji: '🏥'
  },
  {
    id: 'photosensitive_epilepsy',
    name: 'Epilepsi (ljuskänslig)',
    description: 'Ljuskänslig epilepsi',
    severity: 'high',
    category: 'general_medical',
    mainCategory: 'medical',
    emoji: '🏥'
  },
  {
    id: 'severe_cardiovascular',
    name: 'Hjärt-kärlsjukdom (allvarlig)',
    description: 'Allvarlig hjärt-kärlsjukdom',
    severity: 'high',
    category: 'general_medical',
    mainCategory: 'medical',
    emoji: '🏥'
  },
  {
    id: 'bleeding_disorders',
    name: 'Blödningsrubbningar',
    description: 'Blödningsrubbningar eller koagulationsstörningar',
    severity: 'high',
    category: 'general_medical',
    mainCategory: 'medical',
    emoji: '🏥'
  },
  {
    id: 'immunodeficiency',
    name: 'Immunbrist (HIV, cancer)',
    description: 'Immunbrist som HIV eller pågående cancerbehandling',
    severity: 'high',
    category: 'general_medical',
    mainCategory: 'medical',
    emoji: '🏥'
  },
  {
    id: 'uncontrolled_thyroid',
    name: 'Sköldkörtelrubbning (okontrollerad)',
    description: 'Okontrollerad sköldkörtelrubbning',
    severity: 'medium',
    category: 'general_medical',
    mainCategory: 'medical',
    emoji: '🏥'
  },

  // Hudcancer & Förmaligna förändringar
  {
    id: 'skin_cancer',
    name: 'Hudcancer',
    description: 'Hudcancer i behandlingsområdet',
    severity: 'high',
    category: 'skin_cancer',
    mainCategory: 'medical',
    emoji: '🏥'
  },
  {
    id: 'suspicious_changes',
    name: 'Misstänkta förändringar',
    description: 'Misstänkta förändringar som kräver utredning',
    severity: 'high',
    category: 'skin_cancer',
    mainCategory: 'medical',
    emoji: '🏥'
  },
  {
    id: 'atypical_moles',
    name: 'Många atypiska leverfläckar',
    description: 'Många atypiska leverfläckar i behandlingsområdet',
    severity: 'medium',
    category: 'skin_cancer',
    mainCategory: 'medical',
    emoji: '🏥'
  },

  // 💊 MEDICINER & LÄKEMEDEL - Ljuskänslighet
  {
    id: 'tetracycline',
    name: 'Tetracyklin-antibiotika',
    description: 'Fotosensitiserande antibiotika',
    severity: 'high',
    category: 'photosensitive',
    mainCategory: 'medications',
    emoji: '💊'
  },
  {
    id: 'retinoids',
    name: 'Retinoider (Roaccutan, Tretinoin)',
    description: 'Systemiska eller topikala retinoider',
    severity: 'high',
    category: 'photosensitive',
    mainCategory: 'medications',
    emoji: '💊'
  },
  {
    id: 'hydrochlorothiazide',
    name: 'Hydroklorotiazid',
    description: 'Blodtrycksmedicin som ökar ljuskänslighet',
    severity: 'medium',
    category: 'photosensitive',
    mainCategory: 'medications',
    emoji: '💊'
  },
  {
    id: 'amiodarone',
    name: 'Amiodaron',
    description: 'Hjärtmedicin som ökar ljuskänslighet',
    severity: 'medium',
    category: 'photosensitive',
    mainCategory: 'medications',
    emoji: '💊'
  },
  {
    id: 'phenothiazines',
    name: 'Fenotiaziner',
    description: 'Antipsykotiska läkemedel',
    severity: 'medium',
    category: 'photosensitive',
    mainCategory: 'medications',
    emoji: '💊'
  },
  {
    id: 'st_johns_wort',
    name: 'St Johns Wort (johannesört)',
    description: 'Naturläkemedel som ökar ljuskänslighet',
    severity: 'medium',
    category: 'photosensitive',
    mainCategory: 'medications',
    emoji: '💊'
  },

  // Blodförtunnande
  {
    id: 'warfarin',
    name: 'Warfarin (Waran)',
    description: 'Antikoagulantia',
    severity: 'high',
    category: 'blood_thinners',
    mainCategory: 'medications',
    emoji: '💊'
  },
  {
    id: 'heparin',
    name: 'Heparin',
    description: 'Antikoagulantia',
    severity: 'high',
    category: 'blood_thinners',
    mainCategory: 'medications',
    emoji: '💊'
  },
  {
    id: 'high_dose_aspirin',
    name: 'Aspirin (högdos)',
    description: 'Högdos aspirin regelbundet',
    severity: 'medium',
    category: 'blood_thinners',
    mainCategory: 'medications',
    emoji: '💊'
  },
  {
    id: 'clopidogrel',
    name: 'Clopidogrel (Plavix)',
    description: 'Trombocythämmare',
    severity: 'high',
    category: 'blood_thinners',
    mainCategory: 'medications',
    emoji: '💊'
  },
  {
    id: 'regular_nsaid',
    name: 'NSAID (regelbunden användning)',
    description: 'Regelbunden användning av antiinflammatoriska läkemedel',
    severity: 'medium',
    category: 'blood_thinners',
    mainCategory: 'medications',
    emoji: '💊'
  },

  // Immunsupprimerande
  {
    id: 'systemic_steroids',
    name: 'Kortison (systemiskt)',
    description: 'Systemisk kortisonbehandling',
    severity: 'high',
    category: 'immunosuppressive',
    mainCategory: 'medications',
    emoji: '💊'
  },
  {
    id: 'methotrexate',
    name: 'Metothrexat',
    description: 'Immunsupprimerande läkemedel',
    severity: 'high',
    category: 'immunosuppressive',
    mainCategory: 'medications',
    emoji: '💊'
  },
  {
    id: 'cyclosporine',
    name: 'Cyklosporin',
    description: 'Immunsupprimerande läkemedel',
    severity: 'high',
    category: 'immunosuppressive',
    mainCategory: 'medications',
    emoji: '💊'
  },

  // 🌈 HUDTYP & HUDTON - Fitzpatrick
  {
    id: 'fitzpatrick_1',
    name: 'Typ I - Extremt ljus',
    description: 'Extremt ljus, bränns alltid, blir aldrig brun',
    severity: 'high',
    category: 'fitzpatrick',
    mainCategory: 'skin_type',
    emoji: '🌈'
  },
  {
    id: 'fitzpatrick_2',
    name: 'Typ II - Ljus',
    description: 'Ljus, bränns lätt, blir sällan brun',
    severity: 'medium',
    category: 'fitzpatrick',
    mainCategory: 'skin_type',
    emoji: '🌈'
  },
  {
    id: 'fitzpatrick_6',
    name: 'Typ VI - Mycket mörk',
    description: 'Mycket mörk, bränns aldrig (för vissa laserbehandlingar)',
    severity: 'medium',
    category: 'fitzpatrick',
    mainCategory: 'skin_type',
    emoji: '🌈'
  },

  // Hudstatus
  {
    id: 'recent_sunburn',
    name: 'Nyligen solbränd',
    description: 'Solbränna inom senaste 2 veckorna',
    severity: 'high',
    category: 'skin_status',
    mainCategory: 'skin_type',
    emoji: '🌈'
  },
  {
    id: 'spray_tan',
    name: 'Spray tan',
    description: 'Spray tan inom senaste 2 veckorna',
    severity: 'medium',
    category: 'skin_status',
    mainCategory: 'skin_type',
    emoji: '🌈'
  },
  {
    id: 'extremely_thin_skin',
    name: 'Extremt tunn/känslig hud',
    description: 'Extremt tunn eller känslig hud',
    severity: 'medium',
    category: 'skin_status',
    mainCategory: 'skin_type',
    emoji: '🌈'
  },
  {
    id: 'severe_dryness',
    name: 'Mycket torrhet/flagning',
    description: 'Mycket torr hud med flagning',
    severity: 'medium',
    category: 'skin_status',
    mainCategory: 'skin_type',
    emoji: '🌈'
  },

  // 🤰 GRAVIDITET & AMNING
  {
    id: 'pregnancy',
    name: 'Gravid (alla trimestrar)',
    description: 'Graviditet under alla trimestrar',
    severity: 'high',
    category: 'reproductive',
    mainCategory: 'pregnancy',
    emoji: '🤰'
  },
  {
    id: 'breastfeeding',
    name: 'Amning',
    description: 'Pågående amning',
    severity: 'high',
    category: 'reproductive',
    mainCategory: 'pregnancy',
    emoji: '🤰'
  },
  {
    id: 'trying_to_conceive',
    name: 'Försöker bli gravid',
    description: 'Aktivt försöker bli gravid',
    severity: 'medium',
    category: 'reproductive',
    mainCategory: 'pregnancy',
    emoji: '🤰'
  },
  {
    id: 'fertility_treatment',
    name: 'Hormonbehandling (fertilitet)',
    description: 'Pågående hormonbehandling för fertilitet',
    severity: 'medium',
    category: 'reproductive',
    mainCategory: 'pregnancy',
    emoji: '🤰'
  },

  // Hormonella förändringar
  {
    id: 'ongoing_menopause',
    name: 'Menopaus (pågående)',
    description: 'Pågående menopausala förändringar',
    severity: 'medium',
    category: 'hormonal',
    mainCategory: 'pregnancy',
    emoji: '🤰'
  },
  {
    id: 'pcos',
    name: 'PCOS (hormonell obalans)',
    description: 'Polycystiskt ovariesyndrom med hormonell obalans',
    severity: 'medium',
    category: 'hormonal',
    mainCategory: 'pregnancy',
    emoji: '🤰'
  },

  // 🕐 TIDIGARE BEHANDLINGAR
  {
    id: 'recent_laser',
    name: 'Laser (senaste 4 veckorna)',
    description: 'Laserbehandling inom senaste 4 veckorna',
    severity: 'high',
    category: 'recent_treatments',
    mainCategory: 'previous_treatments',
    emoji: '🕐'
  },
  {
    id: 'recent_chemical_peel',
    name: 'Kemisk peeling (senaste 2 veckorna)',
    description: 'Kemisk peeling inom senaste 2 veckorna',
    severity: 'medium',
    category: 'recent_treatments',
    mainCategory: 'previous_treatments',
    emoji: '🕐'
  },
  {
    id: 'recent_microneedling',
    name: 'Microneedling (senaste 2 veckorna)',
    description: 'Microneedling inom senaste 2 veckorna',
    severity: 'medium',
    category: 'recent_treatments',
    mainCategory: 'previous_treatments',
    emoji: '🕐'
  },
  {
    id: 'recent_botox_fillers',
    name: 'Botox/Fillers (senaste 2 veckorna)',
    description: 'Botox eller fillers inom senaste 2 veckorna',
    severity: 'medium',
    category: 'recent_treatments',
    mainCategory: 'previous_treatments',
    emoji: '🕐'
  },
  {
    id: 'recent_ipl',
    name: 'IPL (senaste 4 veckorna)',
    description: 'IPL-behandling inom senaste 4 veckorna',
    severity: 'high',
    category: 'recent_treatments',
    mainCategory: 'previous_treatments',
    emoji: '🕐'
  },

  // Kirurgi & invasiva ingrepp
  {
    id: 'recent_facial_surgery',
    name: 'Ansiktskirurgi (senaste 6 månaderna)',
    description: 'Ansiktskirurgi inom senaste 6 månaderna',
    severity: 'high',
    category: 'surgery',
    mainCategory: 'previous_treatments',
    emoji: '🕐'
  },
  {
    id: 'recent_laser_surgery',
    name: 'Laser-kirurgi (senaste 6 månaderna)',
    description: 'Laser-kirurgi inom senaste 6 månaderna',
    severity: 'high',
    category: 'surgery',
    mainCategory: 'previous_treatments',
    emoji: '🕐'
  },
  {
    id: 'piercing_treatment_area',
    name: 'Piercing (behandlingsområde)',
    description: 'Piercing i behandlingsområdet',
    severity: 'medium',
    category: 'surgery',
    mainCategory: 'previous_treatments',
    emoji: '🕐'
  },
  {
    id: 'permanent_makeup',
    name: 'Permanent makeup (behandlingsområde)',
    description: 'Permanent makeup i behandlingsområdet',
    severity: 'medium',
    category: 'surgery',
    mainCategory: 'previous_treatments',
    emoji: '🕐'
  },

  // 🔄 HUDSTATUS & INFEKTION
  {
    id: 'open_wounds',
    name: 'Öppen sår (behandlingsområde)',
    description: 'Öppna sår i behandlingsområdet',
    severity: 'high',
    category: 'active_problems',
    mainCategory: 'skin_infection',
    emoji: '🔄'
  },
  {
    id: 'active_infection',
    name: 'Aktiv infektion',
    description: 'Pågående bakteriell, viral eller svampinfektion',
    severity: 'high',
    category: 'active_problems',
    mainCategory: 'skin_infection',
    emoji: '🔄'
  },
  {
    id: 'warts_treatment_area',
    name: 'Vårtor (behandlingsområde)',
    description: 'Vårtor i behandlingsområdet',
    severity: 'medium',
    category: 'active_problems',
    mainCategory: 'skin_infection',
    emoji: '🔄'
  },
  {
    id: 'severe_inflammatory_acne',
    name: 'Inflammerad akne (allvarlig)',
    description: 'Allvarlig inflammatorisk akne',
    severity: 'high',
    category: 'active_problems',
    mainCategory: 'skin_infection',
    emoji: '🔄'
  },
  {
    id: 'abscess',
    name: 'Abscess',
    description: 'Abscess i behandlingsområdet',
    severity: 'high',
    category: 'active_problems',
    mainCategory: 'skin_infection',
    emoji: '🔄'
  },

  // Allmänt hälsotillstånd
  {
    id: 'recent_fever',
    name: 'Feber (senaste 48h)',
    description: 'Feber inom senaste 48 timmarna',
    severity: 'medium',
    category: 'health_status',
    mainCategory: 'skin_infection',
    emoji: '🔄'
  },
  {
    id: 'cold_flu',
    name: 'Förkylning/influensa',
    description: 'Pågående förkylning eller influensa',
    severity: 'medium',
    category: 'health_status',
    mainCategory: 'skin_infection',
    emoji: '🔄'
  },
  {
    id: 'extreme_stress',
    name: 'Stress/utmattning (extrem)',
    description: 'Extrem stress eller utmattning',
    severity: 'medium',
    category: 'health_status',
    mainCategory: 'skin_infection',
    emoji: '🔄'
  },

  // 👶 ÅLDER & UTVECKLING
  {
    id: 'under_16',
    name: 'Under 16 år',
    description: 'Under 16 år (kräver vårdnadshavare)',
    severity: 'high',
    category: 'age_related',
    mainCategory: 'age',
    emoji: '👶'
  },
  {
    id: 'age_16_18',
    name: '16-18 år',
    description: '16-18 år (begränsade behandlingar)',
    severity: 'medium',
    category: 'age_related',
    mainCategory: 'age',
    emoji: '👶'
  },
  {
    id: 'over_70',
    name: 'Över 70 år',
    description: 'Över 70 år (extra försiktighet)',
    severity: 'medium',
    category: 'age_related',
    mainCategory: 'age',
    emoji: '👶'
  },

  // 🏖️ LIVSSTIL & EXPONERING
  {
    id: 'planned_sun_vacation',
    name: 'Planerad solsemester',
    description: 'Planerad solsemester inom 4 veckor',
    severity: 'medium',
    category: 'sun_exposure',
    mainCategory: 'lifestyle',
    emoji: '🏖️'
  },
  {
    id: 'regular_tanning_bed',
    name: 'Solarium (regelbunden användning)',
    description: 'Regelbunden användning av solarium',
    severity: 'medium',
    category: 'sun_exposure',
    mainCategory: 'lifestyle',
    emoji: '🏖️'
  },
  {
    id: 'outdoor_work',
    name: 'Utomhusarbete',
    description: 'Utomhusarbete med hög UV-exponering',
    severity: 'medium',
    category: 'sun_exposure',
    mainCategory: 'lifestyle',
    emoji: '🏖️'
  },
  {
    id: 'cannot_avoid_sun',
    name: 'Kan inte undvika sol',
    description: 'Kan inte undvika solexponering efter behandling',
    severity: 'medium',
    category: 'sun_exposure',
    mainCategory: 'lifestyle',
    emoji: '🏖️'
  }
];
