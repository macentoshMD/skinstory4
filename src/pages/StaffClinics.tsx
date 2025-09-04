import { useState, useEffect } from 'react';
import { useUserRole } from '@/contexts/UserRoleContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { MapPin, Phone, Mail, Building2, Users, Clock, DollarSign } from 'lucide-react';
import { SERVICES } from '@/data/services';
import { Service } from '@/types/service';

// Mock data for connected clinic
const MOCK_CLINIC_CONNECTION = {
  companyName: 'Aknespecialisten',
  clinicName: 'Aknespecialisten Östermalm',
  address: 'Östermalmsvägen 12, 114 26 Stockholm',
  phone: '08-123 45 67',
  email: 'ostermalm@aknespecialisten.se',
  website: 'www.aknespecialisten.se',
  staffCount: 12,
  establishedYear: 2015,
  specialties: ['Aknebehandling', 'Hudvård', 'Laser', 'Anti-age']
};

export default function StaffClinics() {
  const { currentRole } = useUserRole();
  const [selectedTreatments, setSelectedTreatments] = useState<Set<string>>(new Set());

  // Load saved selections from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('staff-selected-treatments');
    if (saved) {
      setSelectedTreatments(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save selections to localStorage
  const saveSelections = (newSelections: Set<string>) => {
    setSelectedTreatments(newSelections);
    localStorage.setItem('staff-selected-treatments', JSON.stringify(Array.from(newSelections)));
  };

  const handleTreatmentToggle = (treatmentId: string) => {
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
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">Denna sida är endast tillgänglig för anställda.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Mina Kliniker</h1>
        <p className="text-muted-foreground">
          Hantera dina klinikuppkopplingar och behandlingar
        </p>
      </div>

      {/* Connected Clinic Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle>{MOCK_CLINIC_CONNECTION.companyName}</CardTitle>
          </div>
          <CardDescription>
            Din huvudsakliga arbetsplats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">{MOCK_CLINIC_CONNECTION.clinicName}</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  <span className="text-sm">{MOCK_CLINIC_CONNECTION.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{MOCK_CLINIC_CONNECTION.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{MOCK_CLINIC_CONNECTION.email}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{MOCK_CLINIC_CONNECTION.staffCount} anställda</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Etablerad {MOCK_CLINIC_CONNECTION.establishedYear}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Klinikens specialiteter</h4>
            <div className="flex flex-wrap gap-2">
              {MOCK_CLINIC_CONNECTION.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>Din Skin Story-profil</strong> följer med dig mellan kliniker. 
              Behandlingar och certifieringar du aktiverar här blir en del av din portabla yrkesprofil.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Mina Behandlingar</CardTitle>
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
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                    >
                      <div className="flex-1">
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
                      <Switch
                        checked={selectedTreatments.has(service.id)}
                        onCheckedChange={() => handleTreatmentToggle(service.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Aktiva behandlingar: {selectedTreatments.size} av {SERVICES.length}
            </span>
            <Button variant="outline" size="sm">
              Exportera till profil
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}