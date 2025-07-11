export interface Customer {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'Aktiv' | 'Potentiell' | 'Inaktiv';
  created: string;
  lastActivity: string;
  value: string;
  orders: number;
  treatments: number;
  problems: string[];
  tags: string[];
  userAssigned: string;
  avatar?: string;
  initials: string;
  birthday?: string;
  gender?: 'Male' | 'Female' | 'Other';
}

export interface CustomerFilters {
  search: string;
  status: string;
  company: string;
  tag: string;
  userAssigned: string;
}

export interface CustomerSort {
  field: keyof Customer;
  direction: 'asc' | 'desc';
}
