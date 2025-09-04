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
  
  services: [
    {
      id: 'svc-1',
      name: 'Microneedling',
      certificationLevel: 'Advanced',
      yearsExperience: 2,
      connectedBrands: ['brand-1']
    },
    {
      id: 'svc-2',
      name: 'Ansiktsbehandling',
      certificationLevel: 'Certified',
      yearsExperience: 3,
      connectedBrands: ['brand-2']
    },
    {
      id: 'svc-3',
      name: 'Laserbehandling',
      certificationLevel: 'Expert',
      yearsExperience: 4,
      connectedBrands: ['brand-3']
    },
    {
      id: 'svc-4',
      name: 'Kemisk Peeling',
      certificationLevel: 'Advanced',
      yearsExperience: 3,
      connectedBrands: ['brand-4']
    }
  ],
  
  brands: [
    {
      id: 'brand-1',
      name: 'Dermapen',
      model: 'Dermapen 4',
      category: 'Microneedling Equipment'
    },
    {
      id: 'brand-2',
      name: 'HydraFacial',
      model: 'HydraFacial MD',
      category: 'Facial Equipment'
    },
    {
      id: 'brand-3',
      name: 'Candela',
      model: 'GentleMax Pro',
      category: 'Laser Equipment'
    },
    {
      id: 'brand-4',
      name: 'SkinCeuticals',
      model: 'Professional Peels',
      category: 'Chemical Peels'
    }
  ],
  
  skinProblems: [
    {
      id: 'prob-1',
      name: 'Akne & Finnig hy',
      experience: 'Expert',
      yearsExperience: 5
    },
    {
      id: 'prob-2',
      name: 'Pigmentfläckar',
      experience: 'Advanced',
      yearsExperience: 4
    },
    {
      id: 'prob-3',
      name: 'Rynkor & Åldrande',
      experience: 'Advanced',
      yearsExperience: 3
    },
    {
      id: 'prob-4',
      name: 'Rosacea',
      experience: 'Intermediate',
      yearsExperience: 2
    }
  ],
  
  awards: [
    {
      id: 'award-1',
      title: 'Årets Hudterapeut',
      organization: 'Svenska Hudterapeutföreningen',
      date: '2023-05-15',
      description: 'Utmärkelse för enastående bidrag till hudvårdsbranschen och kundnöjdhet.'
    },
    {
      id: 'award-2',
      title: 'Excellence in Laser Treatment',
      organization: 'Nordic Beauty Institute',
      date: '2022-11-20',
      description: 'Erkännande för avancerade laserbehandlingstekniker och patientresultat.'
    }
  ],
  
  statistics: {
    problemsSolved: 340,
    monthsWithSkinStory: 18,
    totalBookings: 456,
    completedTreatments: 423,
    customerSatisfaction: 98,
    cancellationsCount: 23,
    cancellationRate: 5.0
  },
  
  reviews: [
    {
      id: 'rev-1',
      customerName: 'Emma L.',
      rating: 5,
      comment: 'Fantastisk behandling! Anna är mycket professionell och kunnig. Resultatet blev över förväntan.',
      date: '2024-02-15',
      treatmentType: 'IPL Laser'
    },
    {
      id: 'rev-2',
      customerName: 'Sarah K.',
      rating: 5,
      comment: 'Bästa hudterapeuten jag träffat. Tar sig verkligen tid att förklara och ge råd.',
      date: '2024-02-10',
      treatmentType: 'Kemisk Peeling'
    },
    {
      id: 'rev-3',
      customerName: 'Maria S.',
      rating: 4,
      comment: 'Mycket nöjd med behandlingen. Kommer definitivt tillbaka.',
      date: '2024-02-08',
      treatmentType: 'Hudanalys'
    },
    {
      id: 'rev-4',
      customerName: 'Linda P.',
      rating: 5,
      comment: 'Anna hjälpte mig med mitt akne problem. Så tacksam för hennes expertis!',
      date: '2024-02-05',
      treatmentType: 'Aknebehandling'
    }
  ]
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
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span>Visa recensioner ({profile.reviews.length})</span>
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
      <div className="grid md:grid-cols-6 gap-4">
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
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-primary">{profile.statistics.cancellationsCount}</div>
            <p className="text-sm text-muted-foreground">Avbokningar ({profile.statistics.cancellationRate}%)</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="experience" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="experience">Erfarenhet</TabsTrigger>
          <TabsTrigger value="specialties">Specialiteter</TabsTrigger>
          <TabsTrigger value="services">Tjänster</TabsTrigger>
          <TabsTrigger value="brands">Varumärken</TabsTrigger>
          <TabsTrigger value="skinproblems">Hudproblem</TabsTrigger>
          <TabsTrigger value="reviews">Recensioner</TabsTrigger>
        </TabsList>

        {/* Experience Tab - Combined */}
        <TabsContent value="experience" className="space-y-4">
          <div className="grid gap-6">
            {/* Education Section */}
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

            {/* Certifications Section */}
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

            {/* Work History Section */}
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

            {/* Awards Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Utmärkelser & Erkännanden
                    </CardTitle>
                    <CardDescription>
                      Utmärkelser och erkännanden du mottagit
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
                        <DialogTitle>Lägg till utmärkelse</DialogTitle>
                        <DialogDescription>
                          Lägg till en utmärkelse eller erkännande
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="award-title">Titel</Label>
                          <Input
                            id="award-title"
                            placeholder="t.ex. Årets Hudterapeut"
                          />
                        </div>
                        <div>
                          <Label htmlFor="award-org">Organisation</Label>
                          <Input
                            id="award-org"
                            placeholder="t.ex. Svenska Hudterapeutföreningen"
                          />
                        </div>
                        <div>
                          <Label htmlFor="award-date">Datum</Label>
                          <Input
                            id="award-date"
                            type="date"
                          />
                        </div>
                        <div>
                          <Label htmlFor="award-desc">Beskrivning (valfritt)</Label>
                          <Textarea
                            id="award-desc"
                            placeholder="Kort beskrivning av utmärkelsen..."
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button>Spara utmärkelse</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.awards.map((award) => (
                    <div key={award.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{award.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{award.organization}</p>
                          <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(award.date).toLocaleDateString('sv-SE')}</span>
                          </div>
                          {award.description && (
                            <p className="text-sm">{award.description}</p>
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
          </div>
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
                <CardTitle>Behandlingsområden</CardTitle>
                <CardDescription>
                  Allmänna behandlingsområden du arbetar inom
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.services.map((service) => (
                    <Badge key={service.id} variant="outline">
                      {service.name}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Lägg till behandlingsområde
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Tjänster
                  </CardTitle>
                  <CardDescription>
                    Tjänster du erbjuder med koppling till varumärken
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Lägg till tjänst
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Lägg till tjänst</DialogTitle>
                      <DialogDescription>
                        Lägg till en tjänst och koppla till varumärken
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="service-name">Tjänst</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Välj tjänst" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="microneedling">Microneedling</SelectItem>
                            <SelectItem value="ansiktsbehandling">Ansiktsbehandling</SelectItem>
                            <SelectItem value="laserbehandling">Laserbehandling</SelectItem>
                            <SelectItem value="kemisk-peeling">Kemisk Peeling</SelectItem>
                            <SelectItem value="injektioner">Injektioner</SelectItem>
                            <SelectItem value="kroppsbehandling">Kroppsbehandling</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cert-level">Certifieringsnivå</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Välj nivå" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Basic">Basic</SelectItem>
                              <SelectItem value="Intermediate">Intermediate</SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                              <SelectItem value="Expert">Expert</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="years-exp">År av erfarenhet</Label>
                          <Input
                            id="years-exp"
                            type="number"
                            placeholder="0"
                            min="0"
                            max="50"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Kopplade varumärken</Label>
                        <p className="text-xs text-muted-foreground mb-2">
                          Välj vilka varumärken du använder för denna tjänst
                        </p>
                        {/* Multi-select for brands would go here */}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button>Spara tjänst</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.services.map((service) => (
                  <div key={service.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{service.name}</h4>
                          <Badge 
                            variant={
                              service.certificationLevel === 'Expert' ? 'default' :
                              service.certificationLevel === 'Advanced' ? 'secondary' :
                              'outline'
                            }
                            className="text-xs"
                          >
                            {service.certificationLevel}
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-muted-foreground">Erfarenhet:</span>
                            <p className="mt-1">{service.yearsExperience} år</p>
                          </div>
                          <div>
                            <span className="font-medium text-muted-foreground">Kopplade varumärken:</span>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {service.connectedBrands.map((brandId) => {
                                const brand = profile.brands.find(b => b.id === brandId);
                                return brand ? (
                                  <Badge key={brandId} variant="outline" className="text-xs">
                                    {brand.name}
                                  </Badge>
                                ) : null;
                              })}
                            </div>
                          </div>
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

        {/* Brands Tab */}
        <TabsContent value="brands" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Varumärken
                  </CardTitle>
                  <CardDescription>
                    Varumärken och utrustning du arbetar med
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Lägg till varumärke
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Lägg till varumärke</DialogTitle>
                      <DialogDescription>
                        Specificera varumärke och utrustning du arbetar med
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="brand-name">Varumärke</Label>
                        <Input
                          id="brand-name"
                          placeholder="t.ex. Dermapen, HydraFacial, Candela"
                        />
                      </div>
                      <div>
                        <Label htmlFor="brand-model">Modell/System</Label>
                        <Input
                          id="brand-model"
                          placeholder="t.ex. Dermapen 4, GentleMax Pro"
                        />
                      </div>
                      <div>
                        <Label htmlFor="brand-category">Kategori</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Välj kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Microneedling Equipment">Microneedling Equipment</SelectItem>
                            <SelectItem value="Facial Equipment">Facial Equipment</SelectItem>
                            <SelectItem value="Laser Equipment">Laser Equipment</SelectItem>
                            <SelectItem value="Chemical Peels">Chemical Peels</SelectItem>
                            <SelectItem value="Body Equipment">Body Equipment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button>Spara varumärke</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.brands.map((brand) => (
                  <div key={brand.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{brand.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{brand.category}</p>
                        <div className="text-sm">
                          <span className="font-medium text-muted-foreground">Modell:</span>
                          <span className="ml-2">{brand.model}</span>
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

        {/* Skin Problems Tab */}
        <TabsContent value="skinproblems" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Hudproblem
                  </CardTitle>
                  <CardDescription>
                    Hudproblem du specialiserar dig på att behandla
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Lägg till hudproblem
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Lägg till hudproblem</DialogTitle>
                      <DialogDescription>
                        Specificera hudproblem du specialiserar dig på
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="problem-name">Hudproblem</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Välj hudproblem" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Akne & Finnig hy">Akne & Finnig hy</SelectItem>
                            <SelectItem value="Pigmentfläckar">Pigmentfläckar</SelectItem>
                            <SelectItem value="Rynkor & Åldrande">Rynkor & Åldrande</SelectItem>
                            <SelectItem value="Rosacea">Rosacea</SelectItem>
                            <SelectItem value="Ärr">Ärr</SelectItem>
                            <SelectItem value="Stora porer">Stora porer</SelectItem>
                            <SelectItem value="Känslig hy">Känslig hy</SelectItem>
                            <SelectItem value="Torr hy">Torr hy</SelectItem>
                            <SelectItem value="Fet hy">Fet hy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="problem-experience">Erfarenhetsnivå</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Välj nivå" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Intermediate">Intermediate</SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                              <SelectItem value="Expert">Expert</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="problem-years">År av erfarenhet</Label>
                          <Input
                            id="problem-years"
                            type="number"
                            placeholder="0"
                            min="0"
                            max="50"
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button>Spara hudproblem</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.skinProblems.map((problem) => (
                  <div key={problem.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{problem.name}</h4>
                          <Badge 
                            variant={
                              problem.experience === 'Expert' ? 'default' :
                              problem.experience === 'Advanced' ? 'secondary' :
                              'outline'
                            }
                            className="text-xs"
                          >
                            {problem.experience}
                          </Badge>
                        </div>
                        
                        <div className="text-sm">
                          <span className="font-medium text-muted-foreground">Erfarenhet:</span>
                          <span className="ml-2">{problem.yearsExperience} år</span>
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

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Recensioner ({profile.reviews.length})
                  </CardTitle>
                  <CardDescription>
                    Kundrecensioner och omdömen från behandlingar
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.reviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{review.customerName}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {review.treatmentType}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString('sv-SE')}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}