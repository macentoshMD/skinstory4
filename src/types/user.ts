export type EmploymentType = 'anställd' | 'egenföretagare' | 'konsult';

export type ProfessionType = 
  | 'hudterapeut'
  | 'laserterapeut' 
  | 'läkare'
  | 'dermatolog'
  | 'sjuksköterska'
  | 'injektionssköterska'
  | 'receptionist'
  | 'konsult';

export interface UserEducation {
  id: string;
  institution: string;
  degree: string;
  year: number;
  duration?: string;
}

export interface UserCertification {
  id: string;
  name: string;
  issuer: string;
  dateIssued: string;
  expiryDate?: string;
  verified: boolean;
}

export interface UserWorkHistory {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface UserStatistics {
  problemsSolved: number;
  monthsWithSkinStory: number;
  totalBookings: number;
  completedTreatments: number;
  customerSatisfaction: number;
}

export interface UserReview {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  treatmentType: string;
}

export interface ConnectedClinic {
  id: string;
  name: string;
  role: string;
  startDate: string;
}

export type ExperienceLevel = 'junior' | 'medior' | 'senior' | 'expert';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  employmentType: EmploymentType;
  profession: ProfessionType;
  specialties: string[];
  level: ExperienceLevel;
  yearsOfExperience: number;
  connectedClinics: ConnectedClinic[];
  rating: number;
  totalReviews: number;
  
  // Detailed profile data
  bio?: string;
  certifications: UserCertification[];
  education: UserEducation[];
  workHistory: UserWorkHistory[];
  skills: string[];
  services: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  statistics: UserStatistics;
  reviews: UserReview[];
  isActive: boolean;
  joinDate: string;
}