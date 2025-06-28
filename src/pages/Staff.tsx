
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, User, Clock } from "lucide-react";

// Mock staff data
const mockStaff = [
  {
    id: 1,
    name: "Lisa Svensson",
    role: "Hudterapeut",
    email: "lisa@skinstory.se",
    phone: "+46 70 123 4567",
    specialties: ["HydraFacial", "Chemical Peeling", "Konsultation"],
    certifications: ["Hudterapeut", "HydraFacial Certified"],
    workHours: "Måndag-Fredag 09:00-17:00",
    commission: "40%",
    totalBookings: 156,
    rating: 4.9
  },
  {
    id: 2,
    name: "Maria Larsson",
    role: "Senior Hudterapeut",
    email: "maria@skinstory.se",
    phone: "+46 70 234 5678",
    specialties: ["Microneedling", "Laser", "Anti-aging"],
    certifications: ["Hudterapeut", "Laser Certified", "Microneedling Expert"],
    workHours: "Tisdag-Lördag 10:00-18:00",
    commission: "45%",
    totalBookings: 203,
    rating: 4.8
  },
  {
    id: 3,
    name: "Anna Nilsson",
    role: "Hudterapeut",
    email: "anna@skinstory.se",
    phone: "+46 70 345 6789",
    specialties: ["Ansiktsbehandling", "Aknebehandling", "Rosacea"],
    certifications: ["Hudterapeut", "Akne Specialist"],
    workHours: "Måndag-Torsdag 08:00-16:00",
    commission: "40%",
    totalBookings: 98,
    rating: 4.7
  },
  {
    id: 4,
    name: "Erik Johansson",
    role: "Receptionist",
    email: "erik@skinstory.se",
    phone: "+46 70 456 7890",
    specialties: ["Kundservice", "Bokning", "Administration"],
    certifications: ["Kundservice"],
    workHours: "Måndag-Fredag 08:00-17:00",
    commission: "0%",
    totalBookings: 0,
    rating: 4.6
  }
];

const Staff = () => {
  const [staff] = useState(mockStaff);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const therapists = staff.filter(member => member.role.includes("Hudterapeut"));
  const averageRating = staff.reduce((sum, member) => sum + member.rating, 0) / staff.length;
  const totalBookings = staff.reduce((sum, member) => sum + member.totalBookings, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Personal</h1>
          <p className="text-gray-600 mt-2">Hantera anställda och deras kvalifikationer</p>
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
            <CardTitle className="text-sm font-medium">Total personal</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{staff.length}</div>
            <p className="text-xs text-muted-foreground">anställda</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hudterapeuter</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{therapists.length}</div>
            <p className="text-xs text-muted-foreground">certifierade</p>
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
            <p className="text-xs text-muted-foreground">denna månad</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Personallista</CardTitle>
              <CardDescription>Alla anställda och deras information</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Sök personal..."
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
                <TableHead>Personal</TableHead>
                <TableHead>Roll</TableHead>
                <TableHead>Specialiteter</TableHead>
                <TableHead>Arbetstider</TableHead>
                <TableHead>Kommission</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Bokningar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{member.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.slice(0, 2).map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {member.specialties.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{member.specialties.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{member.workHours}</TableCell>
                  <TableCell>{member.commission}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span>{member.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{member.totalBookings}</TableCell>
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
