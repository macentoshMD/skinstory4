import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRoleId, getUserTypeById, UserType } from '@/state/userRole';

interface UserRoleContextType {
  currentRole: UserType;
  setRole: (roleId: UserRoleId) => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

interface UserRoleProviderProps {
  children: ReactNode;
}

export function UserRoleProvider({ children }: UserRoleProviderProps) {
  const [currentRoleId, setCurrentRoleId] = useState<UserRoleId>(() => {
    const saved = localStorage.getItem('currentUserRole');
    return (saved as UserRoleId) || 'admin';
  });

  const currentRole = getUserTypeById(currentRoleId);

  const setRole = (roleId: UserRoleId) => {
    setCurrentRoleId(roleId);
    localStorage.setItem('currentUserRole', roleId);
  };

  return (
    <UserRoleContext.Provider value={{ currentRole, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
}