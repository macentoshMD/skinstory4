import { Service } from '@/types/service';
import { User } from '@/types/user';

export interface QualificationCheck {
  qualified: boolean;
  reason?: string;
}

// Extract equipment brands from service equipment settings
export const getServiceEquipmentBrands = (service: Service): string[] => {
  return service.equipment.map(eq => {
    // Extract brand from equipment name or settings
    const equipmentName = eq.equipmentId.toLowerCase();
    if (equipmentName.includes('dermapen')) return 'DermaPen';
    if (equipmentName.includes('skinpen')) return 'SkinPen';
    if (equipmentName.includes('hydrafacial')) return 'HydraFacial';
    if (equipmentName.includes('laser')) return 'Laser';
    return equipmentName;
  });
};

// Normalize categories for matching
export const normalizeCategory = (category: string): string => {
  const normalized = category.toLowerCase();
  if (normalized.includes('akne')) return 'akne';
  if (normalized.includes('hudvård') || normalized.includes('skincare')) return 'hudvård';
  if (normalized.includes('laser')) return 'laser';
  if (normalized.includes('anti-age') || normalized.includes('antiage')) return 'anti-age';
  if (normalized.includes('microneedling')) return 'microneedling';
  if (normalized.includes('chemical') || normalized.includes('kemisk')) return 'chemical';
  return normalized;
};

// Check if user is qualified for a treatment with enhanced matching
export const isUserQualified = (service: Service, user: User): QualificationCheck => {
  const serviceName = service.name.toLowerCase();
  const serviceCategory = normalizeCategory(service.categoryId);
  const serviceBrands = getServiceEquipmentBrands(service);
  
  // Check specialist level requirement first
  const levelHierarchy = { 'basic': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4 };
  const userLevelMap = { 'junior': 1, 'medior': 2, 'senior': 3, 'expert': 4 };
  
  const hasRequiredLevel = userLevelMap[user.level] >= levelHierarchy[service.requiredSpecialistLevel];
  
  if (!hasRequiredLevel) {
    return { 
      qualified: false, 
      reason: `Kräver ${service.requiredSpecialistLevel} nivå, du har ${user.level} nivå` 
    };
  }

  // Check for specific equipment brand certifications
  const hasEquipmentCertification = user.certifications.some(cert => {
    const certName = cert.name.toLowerCase();
    return serviceBrands.some(brand => 
      certName.includes(brand.toLowerCase()) || 
      (brand === 'DermaPen' && certName.includes('dermapen')) ||
      (brand === 'HydraFacial' && certName.includes('hydrafacial'))
    );
  });

  // Check for category-specific certifications
  const hasCategoryCertification = user.certifications.some(cert => {
    const certName = cert.name.toLowerCase();
    if (serviceCategory === 'chemical' && certName.includes('chemical peel')) return true;
    if (serviceCategory === 'laser' && certName.includes('laser')) return true;
    if (serviceCategory === 'microneedling' && certName.includes('microneedling')) return true;
    return false;
  });

  // Check if user has skills matching category or brands
  const hasRelevantSkills = user.skills.some(skill => {
    const skillLower = skill.toLowerCase();
    
    // Direct category match
    if (skillLower.includes(serviceCategory)) return true;
    
    // Brand match
    if (serviceBrands.some(brand => skillLower.includes(brand.toLowerCase()))) return true;
    
    // Service name partial match
    const serviceWords = serviceName.split(' ');
    return serviceWords.some(word => word.length > 3 && skillLower.includes(word));
  });

  // Check if user has direct service experience
  const hasServiceExperience = user.services.some(userService => {
    const userServiceLower = userService.toLowerCase();
    const serviceWords = serviceName.split(' ');
    const userServiceWords = userServiceLower.split(' ');
    
    // Check for significant word overlap
    return serviceWords.some(word => 
      word.length > 3 && userServiceWords.some(userWord => 
        userWord.includes(word) || word.includes(userWord)
      )
    );
  });

  // Determine qualification
  if (hasEquipmentCertification || hasCategoryCertification || hasRelevantSkills || hasServiceExperience) {
    return { qualified: true };
  }

  // Specific failure reasons based on missing qualifications
  if (serviceBrands.length > 0) {
    return { 
      qualified: false, 
      reason: `Du behöver certifiering för ${serviceBrands.join(' eller ')} för denna behandling` 
    };
  }

  return { 
    qualified: false, 
    reason: 'Du har inte behörighet eller utbildning för den här behandlingen' 
  };
};

// Get clinic services based on specialties
export const getClinicServices = (clinicSpecialties: string[], allServices: Service[]): Service[] => {
  const normalizedSpecialties = clinicSpecialties.map(normalizeCategory);
  
  return allServices.filter(service => {
    const serviceCategory = normalizeCategory(service.categoryId);
    return normalizedSpecialties.includes(serviceCategory) || service.categoryId === 'consultation';
  });
};

// Get services user can perform but clinic doesn't offer
export const getUserExtraServices = (user: User, clinicServices: Service[], allServices: Service[]): Service[] => {
  const clinicServiceIds = new Set(clinicServices.map(s => s.id));
  
  return allServices.filter(service => {
    if (clinicServiceIds.has(service.id)) return false;
    
    const qualificationCheck = isUserQualified(service, user);
    return qualificationCheck.qualified;
  });
};