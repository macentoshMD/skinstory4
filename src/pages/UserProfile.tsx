import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Star, MapPin, Calendar, Award, GraduationCap, Briefcase, BarChart3, MessageCircle } from "lucide-react";
import { User } from "@/types/user";

// Mock user data
const mockUser: User = {
  id: "1",
  name: "Lisa Svensson",
  email: "lisa@skinstory.se",
  phone: "+46 70 123 4567",
  employmentType: "anställd",
  profession: "hudterapeut",
  specialties: ["HydraFacial", "Chemical Peeling", "Konsultation", "Anti-aging"],
  level: "senior",
  yearsOfExperience: 8,
  connectedClinics: [
    { id: "1", name: "SkinStory Stockholm", role: "Senior Hudterapeut", startDate: "2022-01-15" },
    { id: "2", name: "SkinStory Göteborg", role: "Konsult", startDate: "2023-06-01" }
  ],
  rating: 4.9,
  totalReviews: 156,
  bio: "Erfaren hudterapeut med specialisering inom anti-aging behandlingar och avancerade ansiktsbehandlingar.",
  certifications: [
    { id: "1", name: "Hudterapeut", issuer: "Svensk Hudterapeut Förening", dateIssued: "2020-05-15", verified: true },
    { id: "2", name: "HydraFacial Certified", issuer: "HydraFacial LLC", dateIssued: "2021-03-10", verified: true },
    { id: "3", name: "Chemical Peel Specialist", issuer: "Advanced Skin Institute", dateIssued: "2022-08-20", verified: true }
  ],
  education: [
    { id: "1", institution: "Stockholms Skönhetsakademi", degree: "Hudterapeut", year: 2020, duration: "2 år" },
    { id: "2", institution: "Karolinska Institutet", degree: "Dermatologi Kurs", year: 2021, duration: "6 månader" }
  ],
  workHistory: [
    { id: "1", company: "SkinStory", position: "Senior Hudterapeut", startDate: "2022-01-15", description: "Avancerade behandlingar och kundkonsultationer" },
    { id: "2", company: "Beauty Clinic Stockholm", position: "Hudterapeut", startDate: "2020-06-01", endDate: "2021-12-31", description: "Grundläggande hudvård och behandlingar" }
  ],
  skills: ["HydraFacial", "Chemical Peeling", "Microneedling", "Laser behandling", "Kundkonsultation", "Hudanalys"],
  services: ["Ansiktsbehandling", "Anti-aging", "Aknebehandling", "Rosacea behandling", "Hudkonsultation"],
  priceRange: { min: 800, max: 2500 },
  statistics: {
    problemsSolved: 342,
    monthsWithSkinStory: 24,
    totalBookings: 567,
    completedTreatments: 523,
    customerSatisfaction: 4.9,
    cancellationsCount: 22,
    cancellationRate: 3.9
  },
  reviews: [
    { id: "1", customerName: "Anna K.", rating: 5, comment: "Fantastisk behandling! Lisa är mycket kunnig och professionell.", date: "2024-01-15", treatmentType: "HydraFacial" },
    { id: "2", customerName: "Maria S.", rating: 5, comment: "Bästa hudterapeuten jag träffat. Resultatet blev över förväntan.", date: "2024-01-10", treatmentType: "Chemical Peeling" },
    { id: "3", customerName: "Emma L.", rating: 4, comment: "Mycket nöjd med behandlingen och resultatet.", date: "2024-01-08", treatmentType: "Konsultation" }
  ],
  beforeAfterResults: [
    {
      id: 'result-1',
      title: 'Aknebehandling med IPL',
      problemType: 'Akne',
      treatmentMethod: 'IPL Laser + Kemisk peeling',
      treatmentDuration: '4 månader, 8 behandlingar',
      beforeImage: '/lovable-uploads/f90177a4-8fea-4b08-8d2e-de8b1dde2168.png',
      afterImage: '/lovable-uploads/f90177a4-8fea-4b08-8d2e-de8b1dde2168.png',
      description: 'Kraftig förbättring av akne efter systematisk behandling med IPL och kemisk peeling.',
      date: '2024-01-15'
    }
  ],
  awards: [],
  isActive: true,
  joinDate: "2022-01-15"
};

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useState<User>(mockUser);

  const getEmploymentTypeBadge = (type: string) => {
    const variants: { [key: string]: string } = {
      'anställd': 'bg-green-100 text-green-800',
      'egenföretagare': 'bg-blue-100 text-blue-800',
      'konsult': 'bg-purple-100 text-purple-800'
    };
    return variants[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Tillbaka
        </Button>
      </div>

      {/* Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <Badge className={getEmploymentTypeBadge(user.employmentType)}>
                  {user.employmentType}
                </Badge>
              </div>
              
              <p className="text-xl text-gray-600 mb-3 capitalize">{user.profession}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{user.rating}</span>
                  <span className="text-gray-500">({user.totalReviews} recensioner)</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{user.connectedClinics.length} kliniker</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Medlem sedan {new Date(user.joinDate).getFullYear()}</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{user.bio}</p>
              
              <div className="flex flex-wrap gap-2">
                {user.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary">{specialty}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Problem lösta</p>
                <p className="text-2xl font-bold text-green-600">{user.statistics.problemsSolved}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Behandlingar</p>
                <p className="text-2xl font-bold text-blue-600">{user.statistics.completedTreatments}</p>
              </div>
              <Award className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Månader med SkinStory</p>
                <p className="text-2xl font-bold text-purple-600">{user.statistics.monthsWithSkinStory}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Kundnöjdhet</p>
                <p className="text-2xl font-bold text-yellow-600">{user.statistics.customerSatisfaction}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avbokningar</p>
                <p className="text-2xl font-bold text-red-600">{user.statistics.cancellationsCount} ({user.statistics.cancellationRate}%)</p>
              </div>
              <Calendar className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Översikt</TabsTrigger>
          <TabsTrigger value="certifications">Certifieringar</TabsTrigger>
          <TabsTrigger value="education">Utbildning</TabsTrigger>
          <TabsTrigger value="work-history">Arbetserfarenhet</TabsTrigger>
          <TabsTrigger value="results">Resultat</TabsTrigger>
          <TabsTrigger value="reviews">Recensioner</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Anslutna kliniker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {user.connectedClinics.map((clinic) => (
                    <div key={clinic.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{clinic.name}</p>
                        <p className="text-sm text-gray-600">{clinic.role}</p>
                      </div>
                      <Badge variant="outline">
                        Sedan {new Date(clinic.startDate).getFullYear()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tjänster & Priser</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Prisintervall</span>
                    <span className="font-medium">{user.priceRange?.min} - {user.priceRange?.max} kr</span>
                  </div>
                  <div className="space-y-2">
                    {user.services.map((service, index) => (
                      <Badge key={index} variant="outline">{service}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Certifieringar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.certifications.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{cert.name}</h3>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                      <p className="text-sm text-gray-500">Utfärdad: {new Date(cert.dateIssued).toLocaleDateString('sv-SE')}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {cert.verified && (
                        <Badge className="bg-green-100 text-green-800">Verifierad</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Utbildning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.education.map((edu) => (
                  <div key={edu.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{edu.degree}</h3>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                      <p className="text-sm text-gray-500">{edu.year} • {edu.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="work-history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Arbetserfarenhet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.workHistory.map((work) => (
                  <div key={work.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{work.position}</h3>
                        <p className="text-sm text-gray-600">{work.company}</p>
                      </div>
                      <Badge variant="outline">
                        {new Date(work.startDate).getFullYear()} - {work.endDate ? new Date(work.endDate).getFullYear() : 'Nu'}
                      </Badge>
                    </div>
                    {work.description && (
                      <p className="text-sm text-gray-700">{work.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Resultat ({user.beforeAfterResults?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {user.beforeAfterResults?.map((result) => (
                  <div key={result.id} className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-2">
                      <div className="relative">
                        <img
                          src={result.beforeImage}
                          alt="Före-bild"
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
                          Före
                        </div>
                      </div>
                      <div className="relative">
                        <img
                          src={result.afterImage}
                          alt="Efter-bild"
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
                          Efter
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium mb-2">{result.title}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{result.problemType}</Badge>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-500">{result.treatmentDuration}</span>
                        </div>
                        <p className="text-gray-600">
                          <span className="font-medium">Behandling:</span> {result.treatmentMethod}
                        </p>
                        {result.description && (
                          <p className="text-gray-600">{result.description}</p>
                        )}
                        <div className="text-xs text-gray-500">
                          {new Date(result.date).toLocaleDateString('sv-SE')}
                        </div>
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="col-span-2 text-center py-8 text-gray-500">
                    <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Inga resultat att visa</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Recensioner ({user.reviews.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.reviews.map((review) => (
                  <div key={review.id} className="p-4 border rounded-lg">
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
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString('sv-SE')}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;