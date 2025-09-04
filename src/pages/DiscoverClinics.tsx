import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '@/contexts/UserRoleContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MapPin, 
  Building2, 
  Users, 
  ArrowLeft, 
  Search,
  Star,
  Clock,
  Send
} from 'lucide-react';

// Mock data for available clinics to discover
const MOCK_AVAILABLE_CLINICS = [
  {
    id: 'beauty-center-vasastan',
    companyName: 'Beauty Center',
    clinicName: 'Beauty Center Vasastan',
    address: 'Upplandsgatan 23, 113 28 Stockholm',
    phone: '08-555 01 23',
    email: 'vasastan@beautycenter.se',
    staffCount: 15,
    establishedYear: 2010,
    rating: 4.8,
    specialties: ['Hudvård', 'Laser', 'Permanent makeup'],
    description: 'Etablerat skönhetscenter med bred kunskap inom hudvård och estetiska behandlingar.',
    openPositions: ['Hudterapeut', 'Laserterapeut'],
    benefits: ['Flexibla arbetstider', 'Utbildningsmöjligheter', 'Bra lön'],
    distance: '2.3 km',
    requiresApplication: true
  },
  {
    id: 'nordic-aesthetics',
    companyName: 'Nordic Aesthetics',
    clinicName: 'Nordic Aesthetics Gamla Stan',
    address: 'Stortorget 5, 111 29 Stockholm',
    phone: '08-444 55 66',
    email: 'gamlastan@nordicaesthetics.se',
    staffCount: 8,
    establishedYear: 2020,
    rating: 4.6,
    specialties: ['Injektioner', 'Anti-age', 'Hudvård'],
    description: 'Modern estetisk klinik specialiserad på injektioner och anti-age behandlingar.',
    openPositions: ['Injektionssköterska', 'Konsult'],
    benefits: ['Höga provisioner', 'Moderna lokaler', 'Team-events'],
    distance: '1.8 km',
    requiresApplication: true
  },
  {
    id: 'wellness-spa',
    companyName: 'Wellness Spa Stockholm',
    clinicName: 'Wellness Spa Östermalm',
    address: 'Birger Jarlsgatan 15, 114 34 Stockholm',
    phone: '08-777 88 99',
    email: 'ostermalm@wellnessspa.se',
    staffCount: 20,
    establishedYear: 2005,
    rating: 4.4,
    specialties: ['Spa', 'Massage', 'Hudvård', 'Avslappning'],
    description: 'Lyxigt spa med holistiskt approach till hälsa och skönhet.',
    openPositions: ['Hudterapeut', 'Massageterapeut'],
    benefits: ['Spa-förmåner', 'Wellness-fokus', 'Personalrabatter'],
    distance: '0.9 km',
    requiresApplication: true
  },
  {
    id: 'derma-clinic',
    companyName: 'Derma Clinic',
    clinicName: 'Derma Clinic Södermalm',
    address: 'Hornsgatan 78, 118 21 Stockholm',
    phone: '08-333 22 11',
    email: 'sodermalm@dermaclinic.se',
    staffCount: 6,
    establishedYear: 2018,
    rating: 4.9,
    specialties: ['Medicinsk hudvård', 'Dermatologi', 'Laser'],
    description: 'Specialistklinik inom medicinsk hudvård med läkare och specialister.',
    openPositions: ['Hudterapeut', 'Dermatolog'],
    benefits: ['Medicinsk inriktning', 'Specialistutbildning', 'Karriärutveckling'],
    distance: '3.1 km',
    requiresApplication: true
  }
];

export default function DiscoverClinics() {
  const navigate = useNavigate();
  const { currentRole } = useUserRole();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');

  // Redirect if not staff member
  if (currentRole.id !== 'anstalld') {
    navigate('/kliniker');
    return null;
  }

  // Filter clinics based on search and filters
  const filteredClinics = MOCK_AVAILABLE_CLINICS.filter(clinic => {
    const matchesSearch = searchTerm === '' || 
      clinic.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.clinicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === '' || locationFilter === 'alla' || 
      clinic.address.toLowerCase().includes(locationFilter.toLowerCase());
    
    const matchesSpecialty = specialtyFilter === '' || specialtyFilter === 'alla' || 
      clinic.specialties.some(s => s.toLowerCase().includes(specialtyFilter.toLowerCase()));

    return matchesSearch && matchesLocation && matchesSpecialty;
  });

  const handleApply = (clinicId: string) => {
    // In a real app, this would send an application
    console.log(`Applying to clinic: ${clinicId}`);
    // Show toast or redirect to application form
  };

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
          <h1 className="text-3xl font-bold text-foreground">Upptäck Kliniker</h1>
          <p className="text-muted-foreground">
            Hitta nya kliniker att samarbeta med och utöka ditt nätverk
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Sök kliniker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Välj område" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alla">Alla områden</SelectItem>
                <SelectItem value="östermalm">Östermalm</SelectItem>
                <SelectItem value="södermalm">Södermalm</SelectItem>
                <SelectItem value="vasastan">Vasastan</SelectItem>
                <SelectItem value="gamla stan">Gamla Stan</SelectItem>
              </SelectContent>
            </Select>

            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Specialitet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alla">Alla specialiteter</SelectItem>
                <SelectItem value="hudvård">Hudvård</SelectItem>
                <SelectItem value="laser">Laser</SelectItem>
                <SelectItem value="injektioner">Injektioner</SelectItem>
                <SelectItem value="anti-age">Anti-age</SelectItem>
                <SelectItem value="massage">Massage</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setLocationFilter('alla');
              setSpecialtyFilter('alla');
            }}>
              Rensa filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid gap-6">
        {filteredClinics.map((clinic) => (
          <Card key={clinic.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">{clinic.companyName}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{clinic.rating}</span>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-muted-foreground mb-3">
                    {clinic.clinicName}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {clinic.description}
                  </p>
                </div>
                
                <Badge variant="outline" className="ml-4">
                  {clinic.distance}
                </Badge>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{clinic.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{clinic.staffCount} anställda</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Etablerad {clinic.establishedYear}</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2 text-sm">Specialiteter</h5>
                  <div className="flex flex-wrap gap-1">
                    {clinic.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2 text-sm">Öppna positioner</h5>
                  <div className="space-y-1">
                    {clinic.openPositions.map((position) => (
                      <Badge key={position} variant="outline" className="text-xs mr-1">
                        {position}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="font-medium mb-2 text-sm">Förmåner</h5>
                <div className="flex flex-wrap gap-2">
                  {clinic.benefits.map((benefit) => (
                    <span key={benefit} className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Läs mer
                  </Button>
                  <Button variant="outline" size="sm">
                    Kontakta
                  </Button>
                </div>
                
                <Button 
                  onClick={() => handleApply(clinic.id)}
                  className="gap-2"
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                  Ansök
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClinics.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              Inga kliniker hittades som matchar dina sökkriterier.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('alla');
                setSpecialtyFilter('alla');
              }}
            >
              Visa alla kliniker
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}