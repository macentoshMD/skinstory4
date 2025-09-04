import { useUserRole } from '@/contexts/UserRoleContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building2, Users, ChevronRight, Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';

// Mock data for connected clinics
const MOCK_USER_CLINICS = [
  {
    id: 'akne-ostermalm',
    companyName: 'Aknespecialisten',
    clinicName: 'Aknespecialisten Östermalm',
    address: 'Östermalmsvägen 12, 114 26 Stockholm',
    phone: '08-123 45 67',
    email: 'ostermalm@aknespecialisten.se',
    staffCount: 12,
    role: 'Hudterapeut',
    startDate: '2023-01-15',
    specialties: ['Aknebehandling', 'Hudvård', 'Laser'],
    isActive: true
  },
  {
    id: 'skincare-sodermalm',
    companyName: 'SkinCare Solutions',
    clinicName: 'SkinCare Södermalm',
    address: 'Götgatan 45, 118 26 Stockholm',
    phone: '08-987 65 43',
    email: 'sodermalm@skincaresolutions.se',
    staffCount: 8,
    role: 'Konsult',
    startDate: '2023-06-01',
    specialties: ['Anti-age', 'Injektioner', 'Hudvård'],
    isActive: true
  }
];

export default function StaffClinics() {
  const { currentRole } = useUserRole();
  const navigate = useNavigate();

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Mina Kliniker</h1>
          <p className="text-muted-foreground">
            Hantera dina klinikuppkopplingar och behandlingar
          </p>
        </div>
        <Button 
          onClick={() => navigate('/kliniker/upptack')}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Upptäck fler kliniker
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Sök bland dina kliniker..." 
          className="pl-10"
        />
      </div>

      {/* Connected Clinics List */}
      <div className="space-y-4">
        {MOCK_USER_CLINICS.map((clinic) => (
          <Card 
            key={clinic.id} 
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => navigate(`/kliniker/${clinic.id}`)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">{clinic.companyName}</h3>
                    <Badge variant="secondary">{clinic.role}</Badge>
                    {clinic.isActive && (
                      <Badge variant="default" className="bg-green-500">
                        Aktiv
                      </Badge>
                    )}
                  </div>
                  
                  <h4 className="font-medium text-muted-foreground mb-2">
                    {clinic.clinicName}
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{clinic.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{clinic.staffCount} anställda</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Anställd sedan: {new Date(clinic.startDate).toLocaleDateString('sv-SE')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {clinic.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Box */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>Din Skin Story-profil</strong> följer med dig mellan kliniker. 
            Behandlingar och certifieringar du aktiverar synkroniseras automatiskt och blir en del av din portabla yrkesprofil.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}