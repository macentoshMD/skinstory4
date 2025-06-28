
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, Edit } from "lucide-react";

// Mock treatment data
const mockTreatments = [
  {
    id: 1,
    name: "HydraFacial Classic",
    category: "Ansiktsbehandling",
    duration: 60,
    price: "1 500 kr",
    description: "Djuprengöring och fuktgivande behandling",
    machines: ["HydraFacial MD"],
    staff: ["Lisa Svensson", "Anna Nilsson"],
    problemAreas: ["Torr hud", "Finlinjer", "Ojämn hudton"]
  },
  {
    id: 2,
    name: "Microneedling Ansikte",
    category: "Hudförnyelse",
    duration: 90,
    price: "1 800 kr",
    description: "Stimulerar kollagenproduktion för fastare hud",
    machines: ["DermaPen A6"],
    staff: ["Maria Larsson", "Erik Johansson"],
    problemAreas: ["Ärr", "Stora porer", "Rynkor"]
  },
  {
    id: 3,
    name: "Chemical Peeling Mild",
    category: "Kemisk peeling",
    duration: 45,
    price: "1 200 kr",
    description: "Mild syrabehandling för förnyelse av hudytan",
    machines: [],
    staff: ["Lisa Svensson", "Maria Larsson"],
    problemAreas: ["Pigmentfläckar", "Akneärr", "Matt hud"]
  }
];

const Treatments = () => {
  const [treatments] = useState(mockTreatments);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTreatments = treatments.filter(treatment =>
    treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    treatment.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Behandlingar</h1>
          <p className="text-gray-600 mt-2">Hantera behandlingar och tjänstekombinationer</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Ny behandling
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Skapa ny behandling</DialogTitle>
              <DialogDescription>
                Skapa en ny behandling eller tjänstekombination
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input placeholder="Behandlingsnamn" />
              <Input placeholder="Kategori" />
              <Input placeholder="Pris (kr)" type="number" />
              <Input placeholder="Varaktighet (minuter)" type="number" />
            </div>
            <Button className="w-full">Skapa behandling</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Totalt behandlingar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{treatments.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Genomsnittspris</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1 500 kr</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Populäraste kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">Ansiktsbehandling</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Behandlingslista</CardTitle>
              <CardDescription>Alla tillgängliga behandlingar</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Sök behandlingar..."
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
                <TableHead>Behandling</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Tid</TableHead>
                <TableHead>Pris</TableHead>
                <TableHead>Personal</TableHead>
                <TableHead>Åtgärder</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTreatments.map((treatment) => (
                <TableRow key={treatment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{treatment.name}</div>
                      <div className="text-sm text-gray-500">{treatment.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{treatment.category}</Badge>
                  </TableCell>
                  <TableCell>{treatment.duration} min</TableCell>
                  <TableCell className="font-medium">{treatment.price}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {treatment.staff.slice(0, 2).map((staff, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {staff}
                        </Badge>
                      ))}
                      {treatment.staff.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{treatment.staff.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
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

export default Treatments;
