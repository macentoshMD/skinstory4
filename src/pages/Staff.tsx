
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, User, Clock, Star, MapPin } from "lucide-react";
import { User as UserType, EmploymentType } from "@/types/user";

// Mock users data with new structure
const mockUsers: UserType[] = [
  {
    id: "1",
    name: "Lisa Svensson",
    email: "lisa@skinstory.se",
    phone: "+46 70 123 4567",
    employmentType: "anställd",
    profession: "hudterapeut",
    specialties: ["HydraFacial", "Chemical Peeling", "Konsultation"],
    connectedClinics: [
      { id: "1", name: "SkinStory Stockholm", role: "Senior Hudterapeut", startDate: "2022-01-15" },
      { id: "2", name: "SkinStory Göteborg", role: "Konsult", startDate: "2023-06-01" }
    ],
    rating: 4.9,
    totalReviews: 156,
    certifications: [],
    education: [],
    workHistory: [],
    skills: ["HydraFacial", "Chemical Peeling"],
    services: ["Ansiktsbehandling", "Anti-aging"],
    statistics: {
      problemsSolved: 342,
      monthsWithSkinStory: 24,
      totalBookings: 567,
      completedTreatments: 523,
      customerSatisfaction: 4.9
    },
    reviews: [],
    isActive: true,
    joinDate: "2022-01-15"
  },
  {
    id: "2",
    name: "Maria Larsson",
    email: "maria@skinstory.se",
    phone: "+46 70 234 5678",
    employmentType: "egenföretagare",
    profession: "laserterapeut",
    specialties: ["Microneedling", "Laser", "Anti-aging"],
    connectedClinics: [
      { id: "1", name: "SkinStory Stockholm", role: "Specialist", startDate: "2021-03-10" }
    ],
    rating: 4.8,
    totalReviews: 203,
    certifications: [],
    education: [],
    workHistory: [],
    skills: ["Laser", "Microneedling"],
    services: ["Laser behandlingar", "Anti-aging"],
    statistics: {
      problemsSolved: 298,
      monthsWithSkinStory: 36,
      totalBookings: 432,
      completedTreatments: 398,
      customerSatisfaction: 4.8
    },
    reviews: [],
    isActive: true,
    joinDate: "2021-03-10"
  },
  {
    id: "3",
    name: "Anna Nilsson",
    email: "anna@skinstory.se",
    phone: "+46 70 345 6789",
    employmentType: "konsult",
    profession: "hudterapeut",
    specialties: ["Ansiktsbehandling", "Aknebehandling", "Rosacea"],
    connectedClinics: [
      { id: "3", name: "SkinStory Malmö", role: "Konsult", startDate: "2023-01-15" },
      { id: "4", name: "SkinStory Uppsala", role: "Konsult", startDate: "2023-08-01" },
      { id: "5", name: "SkinStory Linköping", role: "Konsult", startDate: "2023-11-15" }
    ],
    rating: 4.7,
    totalReviews: 98,
    certifications: [],
    education: [],
    workHistory: [],
    skills: ["Aknebehandling", "Rosacea"],
    services: ["Problemhud", "Konsultation"],
    statistics: {
      problemsSolved: 156,
      monthsWithSkinStory: 12,
      totalBookings: 234,
      completedTreatments: 198,
      customerSatisfaction: 4.7
    },
    reviews: [],
    isActive: true,
    joinDate: "2023-01-15"
  },
  {
    id: "4",
    name: "Erik Johansson",
    email: "erik@skinstory.se",
    phone: "+46 70 456 7890",
    employmentType: "anställd",
    profession: "receptionist",
    specialties: ["Kundservice", "Bokning", "Administration"],
    connectedClinics: [],
    rating: 4.6,
    totalReviews: 45,
    certifications: [],
    education: [],
    workHistory: [],
    skills: ["Kundservice", "Administration"],
    services: ["Bokning", "Kundservice"],
    statistics: {
      problemsSolved: 89,
      monthsWithSkinStory: 18,
      totalBookings: 0,
      completedTreatments: 0,
      customerSatisfaction: 4.6
    },
    reviews: [],
    isActive: true,
    joinDate: "2022-08-01"
  }
];

const Staff = () => {
  const navigate = useNavigate();
  const [users] = useState<UserType[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.employmentType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const therapists = users.filter(user => user.profession.includes("terapeut"));
  const averageRating = users.reduce((sum, user) => sum + user.rating, 0) / users.length;
  const totalBookings = users.reduce((sum, user) => sum + user.statistics.totalBookings, 0);

  const getEmploymentTypeBadge = (type: EmploymentType) => {
    const variants = {
      'anställd': 'bg-green-100 text-green-800',
      'egenföretagare': 'bg-blue-100 text-blue-800',
      'konsult': 'bg-purple-100 text-purple-800'
    };
    return variants[type];
  };

  const getClinicCountColor = (count: number) => {
    if (count === 0) return 'text-gray-500';
    if (count === 1) return 'text-green-600';
    if (count === 2) return 'text-blue-600';
    return 'text-purple-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Användare</h1>
          <p className="text-gray-600 mt-2">Hantera användare och deras kvalifikationer</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Lägg till personal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Lägg till ny personal</DialogTitle>
              <DialogDescription>
                Registrera en ny anställd i systemet
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input placeholder="Fullständigt namn" />
              <Input placeholder="E-post" />
              <Input placeholder="Telefonnummer" />
              <Input placeholder="Roll/Befattning" />
              <Input placeholder="Kommission (%)" type="number" />
            </div>
            <Button className="w-full">Lägg till personal</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totala användare</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{users.length}</div>
            <p className="text-xs text-muted-foreground">användare</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terapeuter</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{therapists.length}</div>
            <p className="text-xs text-muted-foreground">aktiva</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Genomsnittlig rating</CardTitle>
            <div className="text-yellow-400">★</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">av 5.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totala bokningar</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">totalt</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Användarlista</CardTitle>
              <CardDescription>Alla användare och deras information</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Sök användare..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Användare</TableHead>
                <TableHead>Anställning</TableHead>
                <TableHead>Profession</TableHead>
                <TableHead>Kliniker</TableHead>
                <TableHead>Specialiteter</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Problem lösta</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow 
                  key={user.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => navigate(`/personal/${user.id}`)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getEmploymentTypeBadge(user.employmentType)}>
                      {user.employmentType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">{user.profession}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className={`font-medium ${getClinicCountColor(user.connectedClinics.length)}`}>
                        {user.connectedClinics.length}
                      </span>
                      <span className="text-gray-500 text-sm">kliniker</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.specialties.slice(0, 2).map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {user.specialties.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{user.specialties.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{user.rating}</span>
                      <span className="text-gray-500 text-sm">({user.totalReviews})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium text-green-600">{user.statistics.problemsSolved}</div>
                      <div className="text-xs text-gray-500">problem</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/personal/${user.id}`);
                      }}
                    >
                      Visa profil
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Staff;
