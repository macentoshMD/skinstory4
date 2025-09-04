import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserRole } from '@/contexts/UserRoleContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Building2, 
  Users, 
  Clock, 
  DollarSign, 
  ArrowLeft,
  Globe,
  Calendar,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { SERVICES } from '@/data/services';
import { Service } from '@/types/service';
import { User } from '@/types/user';

// Mock user data with qualifications
const MOCK_USER: User = {
  id: 'user-1',
  name: 'Emma Andersson',
  email: 'emma@example.com',
  phone: '+46 70 123 45 67',
  employmentType: 'anställd',
  profession: 'hudterapeut',
  specialties: ['HydraFacial', 'Chemical Peeling', 'Microneedling'],
  level: 'senior',
  yearsOfExperience: 5,
  connectedClinics: [],
  rating: 4.8,
  totalReviews: 156,
  certifications: [
    { id: '1', name: 'HydraFacial Certified', issuer: 'HydraFacial LLC', dateIssued: '2021-03-10', verified: true },
    { id: '2', name: 'Chemical Peel Specialist', issuer: 'Advanced Skin Institute', dateIssued: '2022-08-20', verified: true },
    { id: '3', name: 'DermaPen Certified', issuer: 'DermaPen World', dateIssued: '2023-01-15', verified: true },
    { id: '4', name: 'Laser Hair Removal', issuer: 'Swedish Laser Academy', dateIssued: '2022-06-01', verified: true }
  ],
  education: [
    { id: '1', institution: 'Stockholms Skönhetsakademi', degree: 'Hudterapeut', year: 2020, duration: '2 år' }
  ],
  workHistory: [],
  skills: ['HydraFacial', 'Chemical Peeling', 'Microneedling', 'DermaPen', 'Laser Hair Removal', 'Aknebehandling'],
  services: ['HydraFacial Classic', 'Kemisk Peeling Mild', 'Microneedling Ansikte', 'Hårborttagning Ansikte', 'Aknebehandling med Portömning'],
  statistics: {
    problemsSolved: 0,
    monthsWithSkinStory: 0,
    totalBookings: 0,
    completedTreatments: 0,
    customerSatisfaction: 0,
    cancellationsCount: 0,
    cancellationRate: 0
  },
  reviews: [],
  awards: [],
  isActive: true,
  joinDate: '2020-01-15'
};

// Mock clinic data
const MOCK_CLINICS = {
  'akne-ostermalm': {
    id: 'akne-ostermalm',
    companyName: 'Aknespecialisten',
    clinicName: 'Aknespecialisten Östermalm',
    address: 'Östermalmsvägen 12, 114 26 Stockholm',
    phone: '08-123 45 67',
    email: 'ostermalm@aknespecialisten.se',
    website: 'www.aknespecialisten.se',
    staffCount: 12,
    establishedYear: 2015,
    specialties: ['Aknebehandling', 'Hudvård', 'Laser', 'Anti-age'],
    userRole: 'Hudterapeut',
    userStartDate: '2023-01-15',
    description: 'Ledande inom aknebehandling och hudvård med över 20 års erfarenhet.',
  },
  'skincare-sodermalm': {
    id: 'skincare-sodermalm',
    companyName: 'SkinCare Solutions',
    clinicName: 'SkinCare Södermalm',
    address: 'Götgatan 45, 118 26 Stockholm',
    phone: '08-987 65 43',
    email: 'sodermalm@skincaresolutions.se',
    website: 'www.skincaresolutions.se',
    staffCount: 8,
    establishedYear: 2018,
    specialties: ['Anti-age', 'Injektioner', 'Hudvård', 'Laser'],
    userRole: 'Konsult',
    userStartDate: '2023-06-01',
    description: 'Modern hudvårdsklinik med fokus på anti-age behandlingar och injektioner.',
  }
};

// Function to check if user is qualified for a treatment
const isUserQualified = (service: Service, user: User): { qualified: boolean; reason?: string } => {
  // Check if user has specific certification for the treatment/equipment
  const hasSpecificCertification = user.certifications.some(cert => {
    const certName = cert.name.toLowerCase();
    const serviceName = service.name.toLowerCase();
    
    // Check for direct matches
    if (serviceName.includes('hydrafacial') && certName.includes('hydrafacial')) return true;
    if (serviceName.includes('chemical peel') && certName.includes('chemical peel')) return true;
    if (serviceName.includes('microneedling') && certName.includes('dermapen')) return true;
    if (serviceName.includes('hårborttagning') && certName.includes('laser hair removal')) return true;
    
    return false;
  });
  
  // Check if user has the service in their services list
  const hasServiceExperience = user.services.some(userService => 
    userService.toLowerCase().includes(service.name.toLowerCase().split(' ')[0]) ||
    service.name.toLowerCase().includes(userService.toLowerCase().split(' ')[0])
  );
  
  // Check if user has skills in the category
  const hasRelevantSkills = user.skills.some(skill => {
    const skillLower = skill.toLowerCase();
    const categoryLower = service.categoryId.toLowerCase();
    const serviceLower = service.name.toLowerCase();
    
    return skillLower.includes(categoryLower) || 
           serviceLower.includes(skillLower) ||
           categoryLower.includes(skillLower);
  });
  
  // Check specialist level requirement
  const levelHierarchy = { 'basic': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4 };
  const userLevelMap = { 'junior': 1, 'medior': 2, 'senior': 3, 'expert': 4 };
  
  const hasRequiredLevel = userLevelMap[user.level] >= levelHierarchy[service.requiredSpecialistLevel];
  
  if (!hasRequiredLevel) {
    return { 
      qualified: false, 
      reason: `Kräver ${service.requiredSpecialistLevel} nivå, du har ${user.level} nivå` 
    };
  }
  
  if (hasSpecificCertification || hasServiceExperience || hasRelevantSkills) {
    return { qualified: true };
  }
  
  return { 
    qualified: false, 
    reason: 'Du har inte behörighet eller utbildning för den här behandlingen' 
  };
};

export default function ClinicDetail() {
  const { clinicId } = useParams<{ clinicId: string }>();
  const navigate = useNavigate();
  const { currentRole } = useUserRole();
  const [selectedTreatments, setSelectedTreatments] = useState<Set<string>>(new Set());

  const clinic = clinicId ? MOCK_CLINICS[clinicId as keyof typeof MOCK_CLINICS] : null;

  // Load saved selections from localStorage for this clinic
  useEffect(() => {
    if (clinicId) {
      const saved = localStorage.getItem(`staff-selected-treatments-${clinicId}`);
      if (saved) {
        setSelectedTreatments(new Set(JSON.parse(saved)));
      }
    }
  }, [clinicId]);

  // Save selections to localStorage for this clinic
  const saveSelections = (newSelections: Set<string>) => {
    setSelectedTreatments(newSelections);
    if (clinicId) {
      localStorage.setItem(
        `staff-selected-treatments-${clinicId}`, 
        JSON.stringify(Array.from(newSelections))
      );
    }
  };

  const handleTreatmentToggle = (treatmentId: string, qualified: boolean) => {
    if (!qualified) return; // Don't allow toggle for non-qualified treatments
    
    const newSelections = new Set(selectedTreatments);
    if (newSelections.has(treatmentId)) {
      newSelections.delete(treatmentId);
    } else {
      newSelections.add(treatmentId);
    }
    saveSelections(newSelections);
  };

  // Group services by category
  const groupedServices = SERVICES.reduce((acc, service) => {
    if (!acc[service.categoryId]) {
      acc[service.categoryId] = [];
    }
    acc[service.categoryId].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  // Redirect if not staff member
  if (currentRole.id !== 'anstalld') {
    navigate('/kliniker');
    return null;
  }

  if (!clinic) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">Kliniken hittades inte.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate('/kliniker')}
            >
              Tillbaka till mina kliniker
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/kliniker')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Tillbaka
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{clinic.companyName}</h1>
          <p className="text-muted-foreground">{clinic.clinicName}</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Översikt</TabsTrigger>
          <TabsTrigger value="clinic-treatments">Klinikens behandlingar</TabsTrigger>
          <TabsTrigger value="my-treatments">Mina behandlingar</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    {clinic.clinicName}
                  </CardTitle>
                  <CardDescription>{clinic.description}</CardDescription>
                </div>
                <Badge variant="secondary">{clinic.userRole}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Kontaktuppgifter</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      <span className="text-sm">{clinic.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{clinic.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{clinic.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{clinic.website}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{clinic.staffCount} anställda</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Etablerad {clinic.establishedYear}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Anställd sedan {new Date(clinic.userStartDate).toLocaleDateString('sv-SE')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3">Klinikens specialiteter</h3>
                <div className="flex flex-wrap gap-2">
                  {clinic.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clinic Treatments Tab */}
        <TabsContent value="clinic-treatments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Klinikens behandlingsutbud</CardTitle>
              <CardDescription>
                Alla behandlingar som erbjuds på {clinic.clinicName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(groupedServices).map(([categoryId, services]) => (
                  <div key={categoryId} className="space-y-3">
                    <h3 className="text-lg font-semibold capitalize">{categoryId}</h3>
                    <div className="grid gap-3">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          className="p-4 border rounded-lg"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium">{service.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {service.requiredSpecialistLevel}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {service.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {service.duration} min
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              {(service.price / 100).toLocaleString()} kr
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Treatments Tab */}
        <TabsContent value="my-treatments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mina behandlingar på {clinic.clinicName}</CardTitle>
              <CardDescription>
                Välj vilka behandlingar du utför på denna klinik. 
                Dessa måste matcha dina certifieringar och kompetenser.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(groupedServices).map(([categoryId, services]) => (
                  <div key={categoryId} className="space-y-3">
                    <h3 className="text-lg font-semibold capitalize">{categoryId}</h3>
                    <div className="grid gap-3">
                      {services.map((service) => {
                        const qualificationCheck = isUserQualified(service, MOCK_USER);
                        const isQualified = qualificationCheck.qualified;
                        
                        return (
                          <div
                            key={service.id}
                            className={`p-4 border rounded-lg transition-all ${
                              isQualified 
                                ? 'hover:bg-muted/50 border-border' 
                                : 'bg-muted/30 border-muted-foreground/20'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className={`font-medium ${!isQualified ? 'text-muted-foreground' : ''}`}>
                                    {service.name}
                                  </h4>
                                  <Badge variant="outline" className="text-xs">
                                    {service.requiredSpecialistLevel}
                                  </Badge>
                                  {isQualified ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <AlertCircle className="h-4 w-4 text-amber-500" />
                                  )}
                                </div>
                                <p className={`text-sm mb-2 ${!isQualified ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                                  {service.description}
                                </p>
                                
                                {!isQualified && (
                                  <Alert className="mb-2 border-amber-200 bg-amber-50">
                                    <AlertCircle className="h-4 w-4 text-amber-600" />
                                    <AlertDescription className="text-sm text-amber-800">
                                      {qualificationCheck.reason}
                                    </AlertDescription>
                                  </Alert>
                                )}
                                
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {service.duration} min
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <DollarSign className="h-3 w-3" />
                                    {(service.price / 100).toLocaleString()} kr
                                  </div>
                                </div>
                              </div>
                              <Switch
                                checked={selectedTreatments.has(service.id)}
                                disabled={!isQualified}
                                onCheckedChange={() => handleTreatmentToggle(service.id, isQualified)}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Aktiva behandlingar: {selectedTreatments.size} av {SERVICES.length}</div>
                  <div>Kvalificerade behandlingar: {SERVICES.filter(service => isUserQualified(service, MOCK_USER).qualified).length} av {SERVICES.length}</div>
                </div>
                <Button variant="outline" size="sm">
                  Spara till profil
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}