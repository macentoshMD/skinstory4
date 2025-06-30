
export interface CustomerFormData {
  personalNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  gender: 'Female' | 'Male' | '';
  language: string;
  howFoundUs: string;
}

export interface DiagnosisData {
  method: 'ai' | 'manual' | '';
  selectedProblems: string[];
  aiPhoto?: File;
}
