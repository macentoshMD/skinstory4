import { useState } from 'react';
import { useUserRole } from '@/contexts/UserRoleContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  GraduationCap, 
  Award, 
  Clock, 
  Users, 
  CheckCircle, 
  PlayCircle,
  Star,
  Trophy,
  BookOpen,
  Target,
  Zap,
  Heart,
  Shield,
  Settings,
  X,
  ExternalLink,
  Info,
  TrendingUp,
  DollarSign,
  Calendar
} from 'lucide-react';

type EducationLevel = 'grundkurs' | 'avancerad' | 'expert' | 'specialist';

interface Course {
  id: string;
  title: string;
  description: string;
  category: 'brands' | 'products' | 'skinTypes' | 'problems' | 'machines';
  level: EducationLevel;
  duration: string;
  price: number;
  progress: number;
  completed: boolean;
  certification: string;
  instructor: string;
  rating: number;
  students: number;
  practicalRequired: boolean;
  learningOutcomes: string[];
  modules: string[];
  hasCommission?: boolean;
}

// Price multipliers for different education levels
const PRICE_MULTIPLIERS: Record<EducationLevel, number> = {
  grundkurs: 1.0,
  avancerad: 1.2,
  expert: 1.5,
  specialist: 2.0
};

// Points system for education levels
const EDUCATION_POINTS: Record<EducationLevel, number> = {
  grundkurs: 1,
  avancerad: 2,
  expert: 3,
  specialist: 4
};

const mockCourses: Course[] = [
  // NEW ADVANCED MACHINE COURSES
  {
    id: '1',
    title: 'Dermapen Advanced Techniques',
    description: 'Master advanced microneedling techniques with Dermapen 4. Learn depth settings, treatment protocols, and safety measures.',
    category: 'machines',
    level: 'avancerad',
    duration: '4h 30min',
    price: 2500,
    progress: 85,
    completed: false,
    certification: 'Dermapen Certified Practitioner',
    instructor: 'Dr. Maria Andersson',
    rating: 4.8,
    students: 342,
    practicalRequired: true,
    learningOutcomes: [
      'Master depth settings for different skin areas',
      'Understand needle configurations and applications',
      'Learn safety protocols and contraindications',
      'Practice advanced treatment techniques'
    ],
    modules: ['Introduction to Microneedling', 'Dermapen 4 Technology', 'Treatment Protocols', 'Safety & Hygiene', 'Practical Application']
  },
  {
    id: '2',
    title: 'Hydrafacial MD System Mastery',
    description: 'Complete training on Hydrafacial MD system, serums, and treatment protocols.',
    category: 'machines',
    level: 'avancerad',
    duration: '5h 00min',
    price: 3200,
    progress: 0,
    completed: false,
    certification: 'Hydrafacial Certified Provider',
    instructor: 'Dr. Sofia Lindberg',
    rating: 4.9,
    students: 123,
    practicalRequired: true,
    learningOutcomes: [
      'Understand Hydrafacial technology and benefits',
      'Learn serum selection and customization',
      'Master treatment protocols for different skin types',
      'Develop consultation and aftercare skills'
    ],
    modules: ['System Overview', 'Serum Knowledge', 'Treatment Techniques', 'Client Consultation', 'Business Integration']
  },
  {
    id: '3',
    title: 'HIFU Ultherapy Advanced',
    description: 'Master High-Intensity Focused Ultrasound technology for non-invasive lifting and tightening.',
    category: 'machines',
    level: 'specialist',
    duration: '6h 15min',
    price: 4500,
    progress: 0,
    completed: false,
    certification: 'HIFU Certified Specialist',
    instructor: 'Dr. Andreas Borg',
    rating: 4.7,
    students: 89,
    practicalRequired: true,
    learningOutcomes: [
      'Understand HIFU technology and mechanism',
      'Learn treatment mapping and depth selection',
      'Master safety protocols and contraindications',
      'Develop pain management strategies'
    ],
    modules: ['HIFU Science', 'Treatment Planning', 'Safety Protocols', 'Pain Management', 'Results Assessment']
  },
  {
    id: '4',
    title: 'Cryo Therapy Systems',
    description: 'Learn cryotherapy techniques for fat reduction and skin tightening treatments.',
    category: 'machines',
    level: 'expert',
    duration: '3h 30min',
    price: 2800,
    progress: 0,
    completed: false,
    certification: 'Cryotherapy Specialist',
    instructor: 'Dr. Camilla Ek',
    rating: 4.6,
    students: 156,
    practicalRequired: true,
    learningOutcomes: [
      'Understand cryolipolysis principles',
      'Learn applicator selection and placement',
      'Master treatment protocols and timing',
      'Develop realistic expectation management'
    ],
    modules: ['Cryotherapy Basics', 'Equipment Operation', 'Treatment Protocols', 'Client Selection', 'Follow-up Care']
  },
  {
    id: '5',
    title: 'Laser Genesis & Excel V',
    description: 'Advanced laser training for vascular lesions, rosacea, and skin rejuvenation.',
    category: 'machines',
    level: 'specialist',
    duration: '7h 00min',
    price: 5200,
    progress: 0,
    completed: false,
    certification: 'Laser Therapy Advanced Practitioner',
    instructor: 'Dr. Petra Nyström',
    rating: 4.9,
    students: 67,
    practicalRequired: true,
    learningOutcomes: [
      'Master laser physics and tissue interaction',
      'Learn wavelength selection for different conditions',
      'Understand safety classifications and protocols',
      'Develop treatment parameters optimization'
    ],
    modules: ['Laser Physics', 'Wavelength Selection', 'Safety Protocols', 'Treatment Parameters', 'Complication Management']
  },
  {
    id: '24',
    title: 'IPL PhotoFacial Grundkurs',
    description: 'Grundläggande IPL-utbildning för pigmentering, kapillärer och hudföryngring.',
    category: 'machines',
    level: 'grundkurs',
    duration: '3h 00min',
    price: 1800,
    progress: 0,
    completed: false,
    certification: 'IPL Basic Practitioner',
    instructor: 'Dr. Lena Holmberg',
    rating: 4.5,
    students: 456,
    practicalRequired: true,
    learningOutcomes: [
      'Förstå IPL-teknologi och ljusbaserade behandlingar',
      'Lär dig säkerhetsprocedurer och kontraindikationer',
      'Identifiera lämpliga hudtyper och behandlingsområden',
      'Grundläggande behandlingsprotokoll'
    ],
    modules: ['IPL Grundläggande', 'Säkerhet & Skydd', 'Hudanalys', 'Behandlingsprotokoll', 'Eftervård']
  },
  {
    id: '25',
    title: 'Radiofrekvens Grundkurs',
    description: 'Lär dig radiofrekvensbehandling för hudstramning och konturförbättring.',
    category: 'machines',
    level: 'grundkurs',
    duration: '2h 45min',
    price: 1600,
    progress: 0,
    completed: false,
    certification: 'Radiofrekvens Basic Certified',
    instructor: 'Maria Eklund',
    rating: 4.4,
    students: 298,
    practicalRequired: true,
    learningOutcomes: [
      'Förstå radiofrekvens-teknologi och effekter',
      'Lär dig grundläggande behandlingsteknik',
      'Identifiera lämpliga klienter och områden',
      'Säkerhetsrutiner och riskhantering'
    ],
    modules: ['RF-teknologi', 'Behandlingsteknik', 'Klienturval', 'Säkerhet', 'Resultatuppföljning']
  },

  // EXPANDED BRAND COURSES
  {
    id: '6',
    title: 'SkinCeuticals Product Knowledge',
    description: 'Complete guide to SkinCeuticals skincare range, ingredients, and treatment protocols.',
    category: 'brands',
    level: 'grundkurs',
    duration: '2h 15min',
    price: 1200,
    progress: 100,
    completed: true,
    certification: 'SkinCeuticals Specialist',
    instructor: 'Anna Bergström',
    rating: 4.9,
    students: 567,
    practicalRequired: false,
    hasCommission: true,
    learningOutcomes: [
      'Learn SkinCeuticals product philosophy and science',
      'Understand ingredient interactions and layering',
      'Master product selection for different skin concerns',
      'Develop effective consultation techniques'
    ],
    modules: ['Brand Philosophy', 'Product Categories', 'Ingredient Science', 'Skin Assessment', 'Protocol Development']
  },
  {
    id: '7',
    title: 'Dermalogica Professional Systems',
    description: 'Comprehensive training on Dermalogica professional products and face mapping technique.',
    category: 'brands',
    level: 'avancerad',
    duration: '3h 00min',
    price: 1600,
    progress: 30,
    completed: false,
    certification: 'Dermalogica Certified Therapist',
    instructor: 'Malin Karlsson',
    rating: 4.8,
    students: 423,
    practicalRequired: false,
    hasCommission: true,
    learningOutcomes: [
      'Master Dermalogica face mapping technique',
      'Learn professional product application methods',
      'Understand skin condition analysis',
      'Develop customized treatment protocols'
    ],
    modules: ['Face Mapping', 'Product Knowledge', 'Treatment Techniques', 'Skin Analysis', 'Client Education']
  },
  {
    id: '8',
    title: 'Obagi Medical Professional',
    description: 'Advanced training in Obagi medical-grade skincare systems and protocols.',
    category: 'brands',
    level: 'expert',
    duration: '4h 15min',
    price: 2200,
    progress: 0,
    completed: false,
    certification: 'Obagi Medical Specialist',
    instructor: 'Dr. Elisabeth Holm',
    rating: 4.7,
    students: 234,
    practicalRequired: true,
    hasCommission: true,
    learningOutcomes: [
      'Understand medical-grade skincare principles',
      'Learn Obagi transformation systems',
      'Master patient selection and preparation',
      'Develop comprehensive treatment plans'
    ],
    modules: ['Medical Skincare Principles', 'Transformation Systems', 'Patient Assessment', 'Treatment Planning', 'Monitoring Progress']
  },
  {
    id: '9',
    title: 'ZO Skin Health Systems',
    description: 'Professional certification in ZO Skin Health products and treatment protocols.',
    category: 'brands',
    level: 'avancerad',
    duration: '3h 30min',
    price: 1800,
    progress: 0,
    completed: false,
    certification: 'ZO Skin Health Specialist',
    instructor: 'Dr. Marcus Lindqvist',
    rating: 4.6,
    students: 189,
    practicalRequired: false,
    hasCommission: true,
    learningOutcomes: [
      'Learn ZO Skin Health philosophy and approach',
      'Understand product categories and applications',
      'Master skin conditioning protocols',
      'Develop maintenance and prevention strategies'
    ],
    modules: ['ZO Philosophy', 'Product Science', 'Conditioning Protocols', 'Prevention Strategies', 'Results Tracking']
  },
  {
    id: '10',
    title: 'Alumier MD Professional Training',
    description: 'Comprehensive training on Alumier MD cosmeceutical products and peeling systems.',
    category: 'brands',
    level: 'expert',
    duration: '4h 00min',
    price: 2000,
    progress: 0,
    completed: false,
    certification: 'Alumier MD Certified Professional',
    instructor: 'Dr. Jenny Svensson',
    rating: 4.8,
    students: 145,
    practicalRequired: true,
    hasCommission: true,
    learningOutcomes: [
      'Master Alumier MD product formulations',
      'Learn professional peeling techniques',
      'Understand skin preparation and aftercare',
      'Develop combination treatment protocols'
    ],
    modules: ['Product Formulations', 'Peeling Systems', 'Skin Preparation', 'Aftercare Protocols', 'Treatment Combinations']
  },
  {
    id: '26',
    title: 'Revision Skincare Expert',
    description: 'Avancerad utbildning i Revision Skincare produkter och behandlingsprotokoll.',
    category: 'brands',
    level: 'specialist',
    duration: '5h 15min',
    price: 2800,
    progress: 0,
    completed: false,
    certification: 'Revision Skincare Master',
    instructor: 'Dr. Camilla Strand',
    rating: 4.9,
    students: 89,
    practicalRequired: true,
    hasCommission: true,
    learningOutcomes: [
      'Master Revision Skincare advanced formulations',
      'Learn peptide technology and applications',
      'Develop clinical treatment protocols',
      'Advanced consultation and client management'
    ],
    modules: ['Peptide Technology', 'Advanced Formulations', 'Clinical Protocols', 'Client Management', 'Results Optimization']
  },
  {
    id: '27',
    title: 'Environ Vitamin A Specialist',
    description: 'Grundläggande till avancerad Environ-utbildning med fokus på vitamin A-stege.',
    category: 'brands',
    level: 'avancerad',
    duration: '3h 45min',
    price: 1900,
    progress: 0,
    completed: false,
    certification: 'Environ Vitamin A Specialist',
    instructor: 'Helena Svensson',
    rating: 4.7,
    students: 234,
    practicalRequired: false,
    hasCommission: true,
    learningOutcomes: [
      'Master vitamin A step-up protocols',
      'Learn product layering and combinations',
      'Understand client adaptation strategies',
      'Develop long-term skincare plans'
    ],
    modules: ['Vitamin A Science', 'Step-up Protocols', 'Product Combinations', 'Client Education', 'Troubleshooting']
  },

  // EXPANDED SKIN PROBLEMS COURSES
  {
    id: '11',
    title: 'Acne Treatment Fundamentals',
    description: 'Understanding acne pathology, treatment options, and patient management strategies.',
    category: 'problems',
    level: 'avancerad',
    duration: '3h 45min',
    price: 1800,
    progress: 45,
    completed: false,
    certification: 'Acne Specialist',
    instructor: 'Dr. Erik Nilsson',
    rating: 4.7,
    students: 289,
    practicalRequired: true,
    learningOutcomes: [
      'Understand acne pathophysiology and types',
      'Learn treatment modalities and protocols',
      'Master patient education and compliance',
      'Develop long-term management strategies'
    ],
    modules: ['Acne Pathophysiology', 'Treatment Options', 'Patient Management', 'Prevention Strategies', 'Advanced Techniques']
  },
  {
    id: '12',
    title: 'Rosacea Management Mastery',
    description: 'Comprehensive approach to rosacea diagnosis, treatment, and long-term management.',
    category: 'problems',
    level: 'expert',
    duration: '4h 30min',
    price: 2300,
    progress: 0,
    completed: false,
    certification: 'Rosacea Treatment Specialist',
    instructor: 'Dr. Åsa Persson',
    rating: 4.8,
    students: 167,
    practicalRequired: true,
    learningOutcomes: [
      'Master rosacea subtypes identification',
      'Learn trigger identification and management',
      'Understand treatment options and combinations',
      'Develop personalized care protocols'
    ],
    modules: ['Rosacea Classification', 'Trigger Management', 'Treatment Protocols', 'Laser Therapy', 'Lifestyle Counseling']
  },
  {
    id: '13',
    title: 'Hyperpigmentation Solutions',
    description: 'Advanced treatment strategies for melasma, post-inflammatory hyperpigmentation, and age spots.',
    category: 'problems',
    level: 'specialist',
    duration: '5h 15min',
    price: 2800,
    progress: 0,
    completed: false,
    certification: 'Pigmentation Disorder Specialist',
    instructor: 'Dr. Lena Johansson',
    rating: 4.9,
    students: 134,
    practicalRequired: true,
    learningOutcomes: [
      'Understand melanogenesis and pigment disorders',
      'Learn advanced assessment techniques',
      'Master combination treatment protocols',
      'Develop prevention and maintenance plans'
    ],
    modules: ['Pigmentation Science', 'Assessment Techniques', 'Treatment Combinations', 'Prevention Strategies', 'Maintenance Protocols']
  },
  {
    id: '14',
    title: 'Anti-Aging Treatment Protocols',
    description: 'Comprehensive approach to facial aging, prevention, and advanced treatment strategies.',
    category: 'problems',
    level: 'expert',
    duration: '6h 00min',
    price: 3200,
    progress: 0,
    completed: false,
    certification: 'Anti-Aging Specialist',
    instructor: 'Dr. Robert Svensson',
    rating: 4.7,
    students: 223,
    practicalRequired: true,
    learningOutcomes: [
      'Understand aging processes and mechanisms',
      'Learn comprehensive assessment techniques',
      'Master treatment layering and timing',
      'Develop personalized aging prevention plans'
    ],
    modules: ['Aging Science', 'Facial Assessment', 'Treatment Planning', 'Technology Integration', 'Prevention Protocols']
  },
  {
    id: '15',
    title: 'Sensitive Skin Management',
    description: 'Specialized care for sensitive, reactive, and compromised barrier skin conditions.',
    category: 'problems',
    level: 'avancerad',
    duration: '2h 45min',
    price: 1600,
    progress: 0,
    completed: false,
    certification: 'Sensitive Skin Specialist',
    instructor: 'Dr. Karin Lindström',
    rating: 4.6,
    students: 312,
    practicalRequired: false,
    learningOutcomes: [
      'Identify sensitive skin triggers and causes',
      'Learn barrier repair and strengthening techniques',
      'Master gentle treatment approaches',
      'Develop customized care protocols'
    ],
    modules: ['Barrier Function', 'Sensitivity Types', 'Gentle Treatments', 'Product Selection', 'Long-term Care']
  },
  {
    id: '28',
    title: 'Hormonal Skin Changes',
    description: 'Förstå hormonella hudförändringar genom livets olika faser och behandlingsstrategier.',
    category: 'problems',
    level: 'avancerad',
    duration: '3h 15min',
    price: 1750,
    progress: 0,
    completed: false,
    certification: 'Hormonal Skin Specialist',
    instructor: 'Dr. Anna Lindqvist',
    rating: 4.8,
    students: 178,
    practicalRequired: false,
    learningOutcomes: [
      'Förstå hormonella hudförändringar under olika livsfaser',
      'Lär dig behandlingsstrategier för hormonell akne',
      'Master menopausala hudförändringar och vård',
      'Utveckla skräddarsydda vårdprotokoll'
    ],
    modules: ['Hormonell Påverkan', 'Behandlingsstrategier', 'Menopausala Förändringar', 'Skräddarsydda Protokoll', 'Långsiktig Vård']
  },

  // EXPANDED SKIN TYPES COURSES
  {
    id: '16',
    title: 'Fitzpatrick Skin Types & Assessment',
    description: 'Master skin type assessment, phototype classification, and treatment customization.',
    category: 'skinTypes',
    level: 'grundkurs',
    duration: '1h 30min',
    price: 800,
    progress: 0,
    completed: false,
    certification: 'Skin Assessment Specialist',
    instructor: 'Lisa Johansson',
    rating: 4.6,
    students: 445,
    practicalRequired: false,
    learningOutcomes: [
      'Master Fitzpatrick classification system',
      'Learn phototype assessment techniques',
      'Understand treatment modifications by skin type',
      'Develop personalized care recommendations'
    ],
    modules: ['Fitzpatrick System', 'Assessment Techniques', 'Treatment Modifications', 'Sun Protection', 'Cultural Considerations']
  },
  {
    id: '17',
    title: 'Nordic Skin Characteristics',
    description: 'Specialized knowledge of Scandinavian skin types, challenges, and optimal treatment approaches.',
    category: 'skinTypes',
    level: 'avancerad',
    duration: '2h 15min',
    price: 1200,
    progress: 0,
    completed: false,
    certification: 'Nordic Skin Specialist',
    instructor: 'Dr. Ingrid Larsson',
    rating: 4.7,
    students: 289,
    practicalRequired: false,
    learningOutcomes: [
      'Understand Nordic skin characteristics and challenges',
      'Learn seasonal skincare adaptations',
      'Master vitamin D and light therapy protocols',
      'Develop climate-appropriate treatments'
    ],
    modules: ['Nordic Skin Traits', 'Seasonal Variations', 'Light Therapy', 'Climate Adaptation', 'Cultural Practices']
  },
  {
    id: '18',
    title: 'Ethnic Skin Considerations',
    description: 'Comprehensive training on treating diverse ethnic skin types with cultural sensitivity.',
    category: 'skinTypes',
    level: 'expert',
    duration: '4h 00min',
    price: 2200,
    progress: 0,
    completed: false,
    certification: 'Multicultural Skin Specialist',
    instructor: 'Dr. Amira Hassan',
    rating: 4.8,
    students: 178,
    practicalRequired: true,
    learningOutcomes: [
      'Understand ethnic skin variations and needs',
      'Learn culturally sensitive consultation techniques',
      'Master treatment modifications for different ethnicities',
      'Develop inclusive practice protocols'
    ],
    modules: ['Ethnic Skin Variations', 'Cultural Sensitivity', 'Treatment Adaptations', 'Product Selection', 'Inclusive Practices']
  },
  {
    id: '19',
    title: 'Mature Skin Physiology',
    description: 'Deep understanding of aging skin characteristics and specialized treatment approaches.',
    category: 'skinTypes',
    level: 'expert',
    duration: '3h 30min',
    price: 1900,
    progress: 0,
    completed: false,
    certification: 'Mature Skin Specialist',
    instructor: 'Dr. Margareta Borg',
    rating: 4.6,
    students: 267,
    practicalRequired: false,
    learningOutcomes: [
      'Understand mature skin physiology and changes',
      'Learn age-appropriate treatment selection',
      'Master gentle yet effective techniques',
      'Develop realistic expectation management'
    ],
    modules: ['Aging Physiology', 'Treatment Selection', 'Gentle Techniques', 'Expectation Management', 'Holistic Approach']
  },
  {
    id: '29',
    title: 'Ungdomshud och Akne',
    description: 'Specialiserad kunskap om tonårshud, akne och lämpliga behandlingsmetoder.',
    category: 'skinTypes',
    level: 'grundkurs',
    duration: '2h 30min',
    price: 1100,
    progress: 0,
    completed: false,
    certification: 'Teen Skin Specialist',
    instructor: 'Maria Ek',
    rating: 4.5,
    students: 389,
    practicalRequired: false,
    learningOutcomes: [
      'Förstå ungdomshudens unika egenskaper',
      'Lär dig lämpliga produkter och behandlingar',
      'Master kommunikation med tonårsklienter',
      'Utveckla förebyggande strategier'
    ],
    modules: ['Ungdomshud Fysiologi', 'Produktval', 'Kommunikation', 'Behandlingsprotokoll', 'Förebyggande Vård']
  },

  // EXPANDED PRODUCT COURSES
  {
    id: '20',
    title: 'Environ Skincare System',
    description: 'Understanding vitamin A skincare, step-up systems, and client consultation.',
    category: 'products',
    level: 'avancerad',
    duration: '2h 45min',
    price: 1500,
    progress: 0,
    completed: false,
    certification: 'Environ Skincare Specialist',
    instructor: 'Helena Svensson',
    rating: 4.8,
    students: 234,
    practicalRequired: false,
    hasCommission: true,
    learningOutcomes: [
      'Master vitamin A step-up protocols',
      'Learn product layering and combinations',
      'Understand client adaptation strategies',
      'Develop long-term skincare plans'
    ],
    modules: ['Vitamin A Science', 'Step-up Protocols', 'Product Combinations', 'Client Education', 'Troubleshooting']
  },
  {
    id: '21',
    title: 'Chemical Peel Mastery',
    description: 'Comprehensive training on chemical peels from superficial to deep treatments.',
    category: 'products',
    level: 'specialist',
    duration: '6h 30min',
    price: 3500,
    progress: 0,
    completed: false,
    certification: 'Chemical Peel Specialist',
    instructor: 'Dr. Thomas Ek',
    rating: 4.9,
    students: 156,
    practicalRequired: true,
    learningOutcomes: [
      'Master chemical peel chemistry and mechanisms',
      'Learn peel selection and customization',
      'Understand depth control and safety protocols',
      'Develop complication management skills'
    ],
    modules: ['Peel Chemistry', 'Treatment Selection', 'Safety Protocols', 'Depth Control', 'Complication Management']
  },
  {
    id: '22',
    title: 'Advanced Serum Science',
    description: 'Deep dive into active ingredients, formulations, and optimal application techniques.',
    category: 'products',
    level: 'expert',
    duration: '3h 15min',
    price: 1800,
    progress: 0,
    completed: false,
    certification: 'Serum Science Specialist',
    instructor: 'Dr. Cecilia Nyberg',
    rating: 4.7,
    students: 298,
    practicalRequired: false,
    hasCommission: true,
    learningOutcomes: [
      'Understand active ingredient interactions',
      'Learn optimal application timing and methods',
      'Master serum layering protocols',
      'Develop customized active regimens'
    ],
    modules: ['Ingredient Science', 'Application Techniques', 'Layering Protocols', 'Custom Formulations', 'Results Optimization']
  },
  {
    id: '23',
    title: 'Cosmeceutical Product Development',
    description: 'Understanding the science behind cosmeceuticals and evidence-based skincare.',
    category: 'products',
    level: 'specialist',
    duration: '5h 45min',
    price: 3000,
    progress: 0,
    completed: false,
    certification: 'Cosmeceutical Science Expert',
    instructor: 'Dr. Per Andersson',
    rating: 4.8,
    students: 89,
    practicalRequired: false,
    learningOutcomes: [
      'Understand cosmeceutical regulations and standards',
      'Learn ingredient research and evidence evaluation',
      'Master product formulation principles',
      'Develop critical analysis skills for new products'
    ],
    modules: ['Regulatory Framework', 'Research Analysis', 'Formulation Science', 'Clinical Evidence', 'Market Evaluation']
  },
  {
    id: '30',
    title: 'Retinol och Vitamin A Grundkurs',
    description: 'Grundläggande kunskap om vitamin A-produkter, säkerhet och introduktion.',
    category: 'products',
    level: 'grundkurs',
    duration: '1h 45min',
    price: 900,
    progress: 0,
    completed: false,
    certification: 'Vitamin A Foundation',
    instructor: 'Dr. Sara Lindström',
    rating: 4.6,
    students: 567,
    practicalRequired: false,
    hasCommission: true,
    learningOutcomes: [
      'Förstå vitamin A:s olika former och styrkor',
      'Lär dig säker introduktion av retinoidprodukter',
      'Master klientutbildning och förväntningshantering',
      'Utveckla grundläggande behandlingsprotokoll'
    ],
    modules: ['Vitamin A Former', 'Säker Introduktion', 'Klientutbildning', 'Protokoll', 'Biverkningshantering']
  },
  {
    id: '31',
    title: 'Antioxidant Therapy Expert',
    description: 'Avancerad utbildning i antioxidanter, C-vitamin och skyddande hudvård.',
    category: 'products',
    level: 'expert',
    duration: '4h 00min',
    price: 2100,
    progress: 0,
    completed: false,
    certification: 'Antioxidant Therapy Specialist',
    instructor: 'Dr. Helena Berg',
    rating: 4.8,
    students: 145,
    practicalRequired: false,
    hasCommission: true,
    learningOutcomes: [
      'Master antioxidant synergies and combinations',
      'Learn vitamin C formulation differences',
      'Understand environmental protection protocols',
      'Develop comprehensive antioxidant regimens'
    ],
    modules: ['Antioxidant Science', 'Vitamin C Mastery', 'Environmental Protection', 'Combination Therapy', 'Protocol Design']
  },
  {
    id: '32',
    title: 'Niacinamide och B-vitamin Komplex',
    description: 'Specialistkurs i niacinamid, B-vitaminer och deras roll i hudvård.',
    category: 'products',
    level: 'avancerad',
    duration: '2h 30min',
    price: 1300,
    progress: 0,
    completed: false,
    certification: 'B-Vitamin Specialist',
    instructor: 'Anna Holmberg',
    rating: 4.7,
    students: 203,
    practicalRequired: false,
    hasCommission: true,
    learningOutcomes: [
      'Förstå niacinamids mångfaldiga fördelar',
      'Lär dig B-vitamin synergier och interaktioner',
      'Master behandling av porer och sebumproduktion',
      'Utveckla B-vitamin baserade behandlingsplaner'
    ],
    modules: ['Niacinamid Science', 'B-Vitamin Synergier', 'Sebumkontroll', 'Porbehandling', 'Behandlingsplaner']
  }
];

const categoryIcons = {
  brands: Star,
  products: Heart,
  skinTypes: Target,
  problems: Shield,
  machines: Settings
};

const levelColors: Record<EducationLevel, string> = {
  grundkurs: 'bg-green-100 text-green-800',
  avancerad: 'bg-yellow-100 text-yellow-800',
  expert: 'bg-orange-100 text-orange-800',
  specialist: 'bg-red-100 text-red-800'
};

const levelLabels: Record<EducationLevel, string> = {
  grundkurs: 'Grundkurs',
  avancerad: 'Avancerad',
  expert: 'Expert', 
  specialist: 'Specialist'
};

export default function Education() {
  const { currentRole } = useUserRole();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showEducationInfoModal, setShowEducationInfoModal] = useState(false);

  if (currentRole.id !== 'anstalld') {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Åtkomst nekad</h1>
        <p className="text-gray-500">Endast anställda har tillgång till utbildningsportalen.</p>
      </div>
    );
  }

  const filteredCourses = mockCourses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesCategory && matchesLevel;
  });

  const completedCourses = mockCourses.filter(c => c.completed).length;
  const totalProgress = Math.round(mockCourses.reduce((sum, course) => sum + course.progress, 0) / mockCourses.length);
  const certifications = mockCourses.filter(c => c.completed).length;
  
  // Calculate education level and points
  const totalPoints = mockCourses
    .filter(c => c.completed)
    .reduce((sum, course) => sum + EDUCATION_POINTS[course.level], 0);
  
  const getCurrentEducationLevel = (): EducationLevel => {
    if (totalPoints >= 12) return 'specialist';
    if (totalPoints >= 8) return 'expert';
    if (totalPoints >= 4) return 'avancerad';
    return 'grundkurs';
  };
  
  const currentEducationLevel = getCurrentEducationLevel();
  const nextLevelThresholds = { grundkurs: 4, avancerad: 8, expert: 12, specialist: 16 };
  const nextThreshold = nextLevelThresholds[currentEducationLevel];
  const progressToNext = nextThreshold ? Math.min(100, (totalPoints / nextThreshold) * 100) : 100;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            Utbildningsportal
          </h1>
          <p className="text-gray-600 mt-2">
            Utveckla dina färdigheter, få nya certifieringar och öka dina möjligheter
          </p>
        </div>
        <Button variant="outline" onClick={() => setShowEducationInfoModal(true)}>
          <Info className="h-4 w-4 mr-2" />
          Så funkar utbildningarna
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{completedCourses}</p>
                <p className="text-sm text-gray-600">Slutförda kurser</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{certifications}</p>
                <p className="text-sm text-gray-600">Certifieringar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{totalProgress}%</p>
                <p className="text-sm text-gray-600">Genomsnittlig framsteg</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{totalPoints}</p>
                <p className="text-sm text-gray-600">Utbildningspoäng</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{levelLabels[currentEducationLevel]}</p>
                <p className="text-sm text-gray-600">Din utbildningsnivå</p>
                {currentEducationLevel !== 'specialist' && (
                  <div className="mt-2">
                    <Progress value={progressToNext} className="h-1" />
                    <p className="text-xs text-gray-500 mt-1">Till nästa nivå</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Tillgängliga kurser</TabsTrigger>
          <TabsTrigger value="progress">Min framsteg</TabsTrigger>
          <TabsTrigger value="certifications">Certifieringar</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Kategori</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">Alla kategorier</option>
                <option value="brands">Varumärken</option>
                <option value="products">Produkter</option>
                <option value="skinTypes">Hudtyper</option>
                <option value="problems">Hudproblem</option>
                <option value="machines">Maskiner</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Nivå</label>
              <select 
                value={selectedLevel} 
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">Alla nivåer</option>
                <option value="grundkurs">Grundkurs</option>
                <option value="avancerad">Avancerad</option>
                <option value="expert">Expert</option>
                <option value="specialist">Specialist</option>
              </select>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const IconComponent = categoryIcons[course.category];
              const priceMultiplier = PRICE_MULTIPLIERS[course.level];
              return (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                        <Badge className={levelColors[course.level]}>
                          {levelLabels[course.level]}
                        </Badge>
                        {priceMultiplier > 1.0 && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <DollarSign className="h-3 w-3 mr-1" />
                            {priceMultiplier}x
                          </Badge>
                        )}
                      </div>
                      {course.completed && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Framsteg</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold">{course.price} kr</p>
                        {course.practicalRequired && (
                          <p className="text-xs text-amber-600">+ Praktiskt prov krävs</p>
                        )}
                        {course.hasCommission && (
                          <p className="text-xs text-green-600">+ Provision vid rekommendation</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCourse(course)}
                        >
                          Läs mer
                        </Button>
                        <Button 
                          variant={course.completed ? "outline" : "default"}
                          size="sm"
                        >
                          {course.completed ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Slutförd
                            </>
                          ) : course.progress > 0 ? (
                            <>
                              <PlayCircle className="h-4 w-4 mr-2" />
                              Fortsätt
                            </>
                          ) : (
                            "Starta kurs"
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Din utbildningsframsteg</CardTitle>
              <CardDescription>
                Översikt över dina pågående kurser och framsteg
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockCourses.filter(c => c.progress > 0 && !c.completed).map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{course.title}</h4>
                    <p className="text-sm text-gray-600">{course.instructor}</p>
                    <div className="mt-2">
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{course.progress}%</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Fortsätt
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCourses.filter(c => c.completed).map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Award className="h-8 w-8 text-yellow-600" />
                    <div>
                      <CardTitle className="text-lg">{course.certification}</CardTitle>
                      <CardDescription>Slutförd kurs: {course.title}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Instruktör:</span>
                      <span className="text-sm font-medium">{course.instructor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Betyg:</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      Ladda ned certifikat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Course Details Modal */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCourse && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <DialogTitle className="text-2xl font-bold mb-2">
                      {selectedCourse.title}
                    </DialogTitle>
                    <DialogDescription className="text-base">
                      {selectedCourse.description}
                    </DialogDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCourse(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Course Info */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm text-gray-600">Varaktighet</p>
                    <p className="font-semibold">{selectedCourse.duration}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <p className="text-sm text-gray-600">Studenter</p>
                    <p className="font-semibold">{selectedCourse.students}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Star className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
                    <p className="text-sm text-gray-600">Betyg</p>
                    <p className="font-semibold">{selectedCourse.rating}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Trophy className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <p className="text-sm text-gray-600">Nivå</p>
                    <p className="font-semibold">{levelLabels[selectedCourse.level]}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <p className="text-sm text-gray-600">Prisnivå</p>
                    <p className="font-semibold">{PRICE_MULTIPLIERS[selectedCourse.level]}x</p>
                  </div>
                </div>

                {/* Special Features */}
                {(selectedCourse.hasCommission || selectedCourse.practicalRequired) && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Särskilda fördelar</h3>
                    <div className="space-y-2">
                      {selectedCourse.hasCommission && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-blue-800">
                            <strong>Provision:</strong> När du rekommenderar produkter från denna kurs till kunder får du provision på varje köp
                          </span>
                        </div>
                      )}
                      {selectedCourse.practicalRequired && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-amber-600" />
                          <span className="text-sm text-blue-800">
                            <strong>Praktiskt prov:</strong> Denna kurs kräver praktisk examination för full certifiering
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Learning Outcomes */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Vad du kommer att lära dig
                  </h3>
                  <ul className="space-y-2">
                    {selectedCourse.learningOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Course Modules */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Kursmoduler
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedCourse.modules.map((module, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{module}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructor & Certification */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Instruktör</h3>
                    <p className="text-gray-700">{selectedCourse.instructor}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Certifiering</h3>
                    <p className="text-gray-700">{selectedCourse.certification}</p>
                    {selectedCourse.practicalRequired && (
                      <p className="text-sm text-amber-600 mt-1">
                        * Praktiskt prov krävs för certifiering
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{selectedCourse.price} kr</p>
                    <p className="text-sm text-gray-500">Engångsbetalning</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Förhandsgranska
                    </Button>
                    {selectedCourse.practicalRequired && selectedCourse.progress >= 80 && (
                      <Button variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Boka praktiskt prov
                      </Button>
                    )}
                    <Button>
                      {selectedCourse.completed ? "Slutförd" : selectedCourse.progress > 0 ? "Fortsätt kurs" : "Köp kurs"}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Education Info Modal */}
      <Dialog open={showEducationInfoModal} onOpenChange={setShowEducationInfoModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Info className="h-6 w-6 text-blue-600" />
              Så funkar utbildningarna
            </DialogTitle>
            <DialogDescription>
              En komplett guide till vårt utbildningssystem och hur du utvecklar din karriär
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Education Levels */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                Utbildningsnivåer och prissättning
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <Badge className={levelColors.grundkurs}>Grundkurs</Badge>
                  <p className="mt-2 text-sm text-gray-600">
                    <strong>Prisnivå:</strong> 1.0x (basnivå)<br/>
                    <strong>Poäng:</strong> 1 per kurs<br/>
                    <strong>Fokus:</strong> Grundläggande kunskaper och säkerhet
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Badge className={levelColors.avancerad}>Avancerad</Badge>
                  <p className="mt-2 text-sm text-gray-600">
                    <strong>Prisnivå:</strong> 1.2x<br/>
                    <strong>Poäng:</strong> 2 per kurs<br/>
                    <strong>Fokus:</strong> Djupare teknik och specialisering
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Badge className={levelColors.expert}>Expert</Badge>
                  <p className="mt-2 text-sm text-gray-600">
                    <strong>Prisnivå:</strong> 1.5x<br/>
                    <strong>Poäng:</strong> 3 per kurs<br/>
                    <strong>Fokus:</strong> Avancerade tekniker och komplicerade fall
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Badge className={levelColors.specialist}>Specialist</Badge>
                  <p className="mt-2 text-sm text-gray-600">
                    <strong>Prisnivå:</strong> 2.0x<br/>
                    <strong>Poäng:</strong> 4 per kurs<br/>
                    <strong>Fokus:</strong> Masterclass och ledande expertis
                  </p>
                </div>
              </div>
            </div>

            {/* How Education Works */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Så går utbildningen till
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold">Teoretisk del</h4>
                    <p className="text-sm text-gray-600">
                      Börja med den interaktiva online-kursen. Lär dig teori, titta på videor, gör quiz och tester. 
                      Du kan pausa och fortsätta när det passar dig.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold">Praktiskt prov (när krävs)</h4>
                    <p className="text-sm text-gray-600">
                      För maskiner och vissa behandlingar krävs praktiskt prov. Du bokar 1-2 dagar på en av våra partnerkliniker 
                      där en specialist övervakar dig medan du utför behandlingar på riktiga kunder.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold">Kundbehandlingar under övervakning</h4>
                    <p className="text-sm text-gray-600">
                      Kunderna betalar ett reducerat pris (ca 30-50% rabatt) för att få behandling av dig under utbildning. 
                      Detta ger dig praktisk erfarenhet i en trygg miljö med stöd från specialist.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <div>
                    <h4 className="font-semibold">Certifiering och karriärutveckling</h4>
                    <p className="text-sm text-gray-600">
                      När du klarat både teori och praktik får du ditt certifikat. Nu kan du ta högre priser, 
                      söka jobb på fler ställen och börja nästa utbildningsnivå.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Commission System */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Provisionssystem för produkter
              </h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800 mb-3">
                  När du genomgår produktutbildningar (varumärken som SkinCeuticals, Dermalogica etc.) 
                  får du möjlighet att tjäna provision på försäljning.
                </p>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Du rekommenderar produkter till kunder under konsultationer
                  </li>
                   <li className="flex items-start gap-2">
                     <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                     Kunden köper dina rekommendationer från sin profil
                   </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Du får 5-15% provision på varje köp (beror på varumärke)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Provisionen betalas ut månadsvis till ditt konto
                  </li>
                </ul>
              </div>
            </div>

            {/* Environment & Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-600" />
                Miljö och stöd
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Trygg lärmiljö</h4>
                  <p className="text-sm text-gray-600">
                    Lugn musik, professionell atmosfär och stöttande instruktörer som hjälper dig att känna dig trygg.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Säkerhet först</h4>
                  <p className="text-sm text-gray-600">
                    Alla behandlingar görs under övervakning. Säkerhetsprotokoll följs alltid för både dig och kunden.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Flexibelt schema</h4>
                  <p className="text-sm text-gray-600">
                    Praktiska prov bokas när det passar dig. Vi har platser tillgängliga på kvällar och helger också.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Karriärstöd</h4>
                  <p className="text-sm text-gray-600">
                    Vi hjälper dig att hitta nya jobb och kopplar dig till kliniker som söker specialister inom ditt område.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button onClick={() => setShowEducationInfoModal(false)}>
                Stäng
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}