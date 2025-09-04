export type UserRoleId = 'admin' | 'klinikagare' | 'anstalld' | 'konsult' | 'customer';

export interface UserType {
  id: UserRoleId;
  name: string;
  description: string;
  permissions: string[];
}

export const userTypes: UserType[] = [
  {
    id: 'admin',
    name: 'Admin',
    description: 'Full system access',
    permissions: ['all']
  },
  {
    id: 'klinikagare',
    name: 'Klinikägare',
    description: 'Clinic owner with management access',
    permissions: ['clinic_management', 'staff_management', 'reports']
  },
  {
    id: 'anstalld',
    name: 'Anställd',
    description: 'Employee with operational access',
    permissions: ['customer_management', 'bookings', 'treatments']
  },
  {
    id: 'konsult',
    name: 'Konsult',
    description: 'Consultant with consultation access',
    permissions: ['consultations', 'customer_view']
  },
  {
    id: 'customer',
    name: 'Kund',
    description: 'Customer portal access',
    permissions: ['portal_access']
  }
];

export const getUserTypeById = (id: UserRoleId): UserType => {
  return userTypes.find(type => type.id === id) || userTypes[0];
};