
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SERVICES } from "@/data/services";
import { EQUIPMENT } from "@/types/services";
import { Plus, Search, Filter, Download, Upload, Edit, Trash2, Clock, DollarSign, Wrench, Target } from "lucide-react";

export default function Services() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedService, setSelectedService] = useState(SERVICES[0]);

  const baseServices = SERVICES.filter(service => service.isActive);
  const compositeServices = []; // Will be populated with composite services

  const filteredBaseServices = baseServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: "all", name: "Alla kategorier" },
    { id: "Laser", name: "Laser", color: "bg-blue-100 text-blue-800" },
    { id: "Hudvård", name: "Hudvård", color: "bg-green-100 text-green-800" },
    { id: "Anti-age", name: "Anti-age", color: "bg-purple-100 text-purple-800" },
    { id: "Akne", name: "Akne", color: "bg-red-100 text-red-800" },
  ];

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || "bg-gray-100 text-gray-800";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      case 'expert': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateMargin = (price: number) => {
    // Simplified margin calculation - in real app this would be based on actual costs
    const estimatedCost = price * 0.4; // Assume 40% cost
    return ((price - estimatedCost) / price * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tjänster</h1>
        <p className="text-muted-foreground">
          Hantera grundtjänster och sammansatta tjänster med utrustning
        </p>
      </div>

      <Tabs defaultValue="base-services" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="base-services">Grundtjänster</TabsTrigger>
          <TabsTrigger value="services">Tjänster</TabsTrigger>
        </TabsList>

        <TabsContent value="base-services" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Sök tjänster..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Importera
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportera
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ny grundtjänst
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Grundtjänster ({filteredBaseServices.length})</CardTitle>
              <CardDescription>
                Grundläggande tjänster som kan kombineras till sammansatta behandlingar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Namn</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Tidsgång</TableHead>
                    <TableHead>Pris</TableHead>
                    <TableHead>Marginal</TableHead>
                    <TableHead>Specialistnivå</TableHead>
                    <TableHead>Onlinebokningsbar</TableHead>
                    <TableHead>Åtgärder</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBaseServices.map((service) => (
                    <TableRow key={service.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {service.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(service.categoryId)}>
                          {service.categoryId}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {service.duration} min
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {service.price / 100} kr
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-green-600 font-medium">
                          {calculateMargin(service.price / 100)}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getDifficultyColor(service.requiredSpecialistLevel)}>
                          {service.requiredSpecialistLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={service.isActive ? "default" : "secondary"}>
                          {service.isActive ? "Ja" : "Nej"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Sök sammansatta tjänster..."
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Wrench className="h-4 w-4 mr-2" />
                Hantera utrustning
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ny sammansatt tjänst
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sammansatta tjänster</CardTitle>
                <CardDescription>
                  Tjänster som kombinerar grundtjänster med specifik utrustning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Inga sammansatta tjänster skapade än</p>
                  <p className="text-sm">Klicka "Ny sammansatt tjänst" för att komma igång</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tillgänglig utrustning</CardTitle>
                <CardDescription>
                  Utrustning som kan användas i sammansatta tjänster
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {EQUIPMENT.slice(0, 5).map((equipment) => (
                    <div key={equipment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{equipment.name}</div>
                        <div className="text-sm text-muted-foreground">{equipment.brand} {equipment.model}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{equipment.type}</Badge>
                        <Badge variant={equipment.maintenanceRequired ? "destructive" : "default"}>
                          {equipment.maintenanceRequired ? "Underhåll" : "OK"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
