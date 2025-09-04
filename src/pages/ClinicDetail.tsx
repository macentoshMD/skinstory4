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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
  CheckCircle2,
  ChevronDown,
  Info
} from 'lucide-react';
import { SERVICES } from '@/data/services';
import { Service } from '@/types/service';
import { User } from '@/types/user';
import { 
  getClinicServices, 
  getUserExtraServices, 
  isUserQualified,
  getServiceEquipmentBrands 
} from '@/utils/serviceMatching';

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

// Get filtered services based on clinic specialties
const getFilteredServices = (clinic: any): Service[] => {
  return getClinicServices(clinic.specialties, SERVICES);
};

export default function ClinicDetail() {
  const { clinicId } = useParams<{ clinicId: string }>();
  const navigate = useNavigate();
  const { currentRole } = useUserRole();
  const [selectedTreatments, setSelectedTreatments] = useState<Set<string>>(new Set());
  const [showExtraServices, setShowExtraServices] = useState(false);

  const clinic = clinicId ? MOCK_CLINICS[clinicId as keyof typeof MOCK_CLINICS] : null;

  // Get clinic services and user's extra services
  const clinicServices = clinic ? getFilteredServices(clinic) : [];
  const userExtraServices = clinic ? getUserExtraServices(MOCK_USER, clinicServices, SERVICES) : [];

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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Översikt</TabsTrigger>
          <TabsTrigger value="treatments">Behandlingar</TabsTrigger>
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

        {/* Treatments Tab */}
        <TabsContent value="treatments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Behandlingar på {clinic.clinicName}</CardTitle>
              <CardDescription>
                Välj vilka behandlingar du kan utföra på denna klinik baserat på dina certifieringar och kompetenser.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Behandling</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Utrustning</TableHead>
                      <TableHead>Tid</TableHead>
                      <TableHead>Pris</TableHead>
                      <TableHead className="text-center">Behörighet</TableHead>
                      <TableHead className="text-center">Bokningsbar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clinicServices.map((service) => {
                      const qualificationCheck = isUserQualified(service, MOCK_USER);
                      const isQualified = qualificationCheck.qualified;
                      const equipmentBrands = getServiceEquipmentBrands(service);
                      
                      return (
                        <TableRow key={service.id} className={!isQualified ? 'opacity-60' : ''}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{service.name}</div>
                              <div className="text-sm text-muted-foreground">{service.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {service.categoryId}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {equipmentBrands.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {equipmentBrands.map((brand, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {brand}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{service.duration} min</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{(service.price / 100).toLocaleString()} kr</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            {isQualified ? (
                              <Tooltip>
                                <TooltipTrigger>
                                  <CheckCircle2 className="h-4 w-4 text-green-600 mx-auto" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Du är kvalificerad för denna behandling</p>
                                </TooltipContent>
                              </Tooltip>
                            ) : (
                              <Tooltip>
                                <TooltipTrigger>
                                  <AlertCircle className="h-4 w-4 text-amber-500 mx-auto" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <p>{qualificationCheck.reason}</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <Tooltip>
                              <TooltipTrigger>
                                <Switch
                                  checked={selectedTreatments.has(service.id)}
                                  onCheckedChange={() => handleTreatmentToggle(service.id, isQualified)}
                                  disabled={!isQualified}
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  {isQualified 
                                    ? 'Aktivera för att bli bokningsbar för denna behandling'
                                    : 'Du kan inte aktivera denna behandling - se behörighet'
                                  }
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TooltipProvider>

              {/* Extra services section */}
              {userExtraServices.length > 0 && (
                <div className="mt-8">
                  <Collapsible open={showExtraServices} onOpenChange={setShowExtraServices}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-4 h-auto border rounded-lg">
                        <div className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            Behandlingar du kan utföra som inte finns hos kliniken ({userExtraServices.length})
                          </span>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${showExtraServices ? 'rotate-180' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4">
                      <div className="grid gap-3">
                        {userExtraServices.map((service) => (
                          <div key={service.id} className="p-4 border rounded-lg bg-muted/30">
                            <div className="flex items-start gap-3">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium">{service.name}</h4>
                                  <Badge variant="outline" className="text-xs capitalize">
                                    {service.categoryId}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
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
                            </div>
                          </div>
                        ))}
                      </div>
                      <Alert className="mt-4 border-blue-200 bg-blue-50">
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Dessa behandlingar kan du föreslå att kliniken lägger till i sitt utbud.
                        </AlertDescription>
                      </Alert>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}