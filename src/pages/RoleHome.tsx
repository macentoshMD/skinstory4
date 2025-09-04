import { useUserRole } from '@/contexts/UserRoleContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import ClinicOwnerHome from './roles/ClinicOwnerHome';
import StaffHome from './roles/StaffHome';
import ConsultantHome from './roles/ConsultantHome';

export default function RoleHome() {
  const { currentRole } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentRole.id === 'customer') {
      navigate('/portal');
    }
  }, [currentRole.id, navigate]);

  switch (currentRole.id) {
    case 'admin':
      return <Dashboard />;
    case 'klinikagare':
      return <ClinicOwnerHome />;
    case 'anstalld':
      return <StaffHome />;
    case 'konsult':
      return <ConsultantHome />;
    default:
      return <Dashboard />;
  }
}