import { useState } from 'react';
import { useUserRole } from '@/contexts/UserRoleContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Clock, 
  MapPin,
  Plus,
  Edit,
  Star,
  Calendar,
  Phone,
  Mail,
  Eye,
  EyeOff
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';

// Mock user profile data
const MOCK_USER_PROFILE = {
  id: 'user-123',
  name: 'Anna Andersson',
  title: 'Certifierad Hudterapeut & Laserterapeut',
  avatar: '/placeholder.svg',
  email: 'anna.andersson@email.com',
  phone: '+46 70 123 45 67',
  location: 'Stockholm, Sverige',
  experience: '5 år',
  rating: 4.8,
  totalReviews: 127,
  bio: 'Passionerad hudterapeut med specialisering inom aknebehandling och laser. Jag tror på att varje hud är unik och skapar därför individuella behandlingsplaner för bästa möjliga resultat.',
  isProfilePublic: true,
  
  education: [
    {
      id: 'edu-1',
      institution: 'Stockholms Akademi för Hudvård',
      degree: 'Hudterapeut',
      year: 2019,
      duration: '2 år'
    },
    {
      id: 'edu-2',
      institution: 'Laser Academy Sweden',
      degree: 'Laserterapeut Certification',
      year: 2021,
      duration: '6 månader'
    }
  ],
  
  certifications: [
    {
      id: 'cert-1',
      name: 'IPL Laser Certification',
      issuer: 'Swedish Laser Institute',
      dateIssued: '2021-03-15',
      expiryDate: '2024-03-15',
      verified: true
    },
    {
      id: 'cert-2',
      name: 'Kemisk Peeling Level 3',
      issuer: 'SkinCare Academy',
      dateIssued: '2022-01-10',
      expiryDate: '2025-01-10',
      verified: true
    },
    {
      id: 'cert-3',
      name: 'Microneedling Specialist',
      issuer: 'Beauty Professional Institute',
      dateIssued: '2022-08-20',
      expiryDate: null,
      verified: false
    }
  ],
  
  workHistory: [
    {
      id: 'work-1',
      company: 'Aknespecialisten',
      position: 'Senior Hudterapeut',
      startDate: '2021-06-01',
      endDate: null,
      description: 'Specialiserar på aknebehandlingar och hudanalys. Ansvarig för utbildning av nya medarbetare.'
    },
    {
      id: 'work-2',
      company: 'Beauty Center Stockholm',
      position: 'Hudterapeut',
      startDate: '2019-08-01',
      endDate: '2021-05-31',
      description: 'Allmän hudvård, ansiktsbehandlingar och kundkonsultationer.'
    }
  ],
  
  specialties: ['Aknebehandling', 'IPL Laser', 'Kemisk Peeling', 'Hudanalys', 'Anti-age'],
  treatments: ['Aknebehandling', 'Laser IPL', 'Kemisk peeling', 'HydraFacial', 'Microneedling'],
  
  statistics: {
    problemsSolved: 340,
    monthsWithSkinStory: 18,
    totalBookings: 456,
    completedTreatments: 423,
    customerSatisfaction: 98
  }
};

export default function StaffProfile() {
  const { currentRole } = useUserRole();
  const [profile, setProfile] = useState(MOCK_USER_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [newCertification, setNewCertification] = useState({
    name: '',
    issuer: '',
    dateIssued: '',
    expiryDate: ''
  });

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

  const handleProfileVisibilityChange = (isPublic: boolean) => {
    setProfile(prev => ({ ...prev, isProfilePublic: isPublic }));
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Min Profil</h1>
          <p className="text-muted-foreground">
            Hantera ditt offentliga CV och professionella information
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={profile.isProfilePublic}
              onCheckedChange={handleProfileVisibilityChange}
            />
            <div className="flex items-center gap-1">
              {profile.isProfilePublic ? (
                <Eye className="h-4 w-4 text-green-600" />
              ) : (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="text-sm">
                {profile.isProfilePublic ? 'Offentlig' : 'Privat'}
              </span>
            </div>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)}>
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? 'Spara' : 'Redigera'}
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="text-xl">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <p className="text-lg text-muted-foreground">{profile.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{profile.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({profile.totalReviews} recensioner)
                  </span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.experience} erfarenhet</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.statistics.completedTreatments} behandlingar</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm mb-4">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{profile.email}</span>
                <Phone className="h-4 w-4 text-muted-foreground ml-4" />
                <span>{profile.phone}</span>
              </div>
              
              <p className="text-sm text-muted-foreground">{profile.bio}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-primary">{profile.statistics.problemsSolved}</div>
            <p className="text-sm text-muted-foreground">Lösta hudproblem</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-primary">{profile.statistics.monthsWithSkinStory}</div>
            <p className="text-sm text-muted-foreground">Månader med SkinStory</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-primary">{profile.statistics.totalBookings}</div>
            <p className="text-sm text-muted-foreground">Totala bokningar</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-primary">{profile.statistics.completedTreatments}</div>
            <p className="text-sm text-muted-foreground">Genomförda behandlingar</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-primary">{profile.statistics.customerSatisfaction}%</div>
            <p className="text-sm text-muted-foreground">Kundnöjdhet</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="education" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="education">Utbildning</TabsTrigger>
          <TabsTrigger value="certifications">Certifieringar</TabsTrigger>
          <TabsTrigger value="experience">Arbetslivserfarenhet</TabsTrigger>
          <TabsTrigger value="specialties">Specialiteter</TabsTrigger>
        </TabsList>

        {/* Education Tab */}
        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Utbildning
                  </CardTitle>
                  <CardDescription>
                    Dina utbildningar och akademiska kvalifikationer
                  </CardDescription>
                </div>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Lägg till
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.education.map((edu) => (
                  <div key={edu.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{edu.degree}</h4>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>Examen: {edu.year}</span>
                          <span>Längd: {edu.duration}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certifications Tab */}
        <TabsContent value="certifications" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Certifieringar
                  </CardTitle>
                  <CardDescription>
                    Dina professionella certifieringar och licenser
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Lägg till
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Lägg till certifiering</DialogTitle>
                      <DialogDescription>
                        Lägg till en ny certifiering eller licens
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cert-name">Certifieringsnamn</Label>
                        <Input
                          id="cert-name"
                          value={newCertification.name}
                          onChange={(e) => setNewCertification(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cert-issuer">Utfärdare</Label>
                        <Input
                          id="cert-issuer"
                          value={newCertification.issuer}
                          onChange={(e) => setNewCertification(prev => ({ ...prev, issuer: e.target.value }))}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cert-issued">Utfärdad</Label>
                          <Input
                            id="cert-issued"
                            type="date"
                            value={newCertification.dateIssued}
                            onChange={(e) => setNewCertification(prev => ({ ...prev, dateIssued: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cert-expiry">Utgångsdatum (valfritt)</Label>
                          <Input
                            id="cert-expiry"
                            type="date"
                            value={newCertification.expiryDate}
                            onChange={(e) => setNewCertification(prev => ({ ...prev, expiryDate: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button>Spara certifiering</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.certifications.map((cert) => (
                  <div key={cert.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{cert.name}</h4>
                          {cert.verified && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Verifierad
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Utfärdad: {new Date(cert.dateIssued).toLocaleDateString('sv-SE')}</span>
                          </div>
                          {cert.expiryDate && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>Gäller till: {new Date(cert.expiryDate).toLocaleDateString('sv-SE')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Experience Tab */}
        <TabsContent value="experience" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Arbetslivserfarenhet
                  </CardTitle>
                  <CardDescription>
                    Din professionella arbetshistorik
                  </CardDescription>
                </div>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Lägg till
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.workHistory.map((work) => (
                  <div key={work.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{work.position}</h4>
                        <p className="text-sm text-muted-foreground">{work.company}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(work.startDate).toLocaleDateString('sv-SE')} - 
                            {work.endDate ? new Date(work.endDate).toLocaleDateString('sv-SE') : 'Nuvarande'}
                          </span>
                        </div>
                        {work.description && (
                          <p className="text-sm mt-2">{work.description}</p>
                        )}
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Specialties Tab */}
        <TabsContent value="specialties" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Specialiteter</CardTitle>
                <CardDescription>
                  Dina huvudsakliga kompetensområden
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Lägg till specialitet
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Behandlingar</CardTitle>
                <CardDescription>
                  Behandlingar du är certifierad för
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.treatments.map((treatment) => (
                    <Badge key={treatment} variant="outline">
                      {treatment}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Lägg till behandling
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}