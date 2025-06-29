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
import { Plus, Search, Filter, Download, Upload, Edit, Trash2, Clock, DollarSign, Wrench, Target, Settings } from "lucide-react";

// Base service categories (no pricing)
const BASE_SERVICE_CATEGORIES = [{
  id: 'ansiktsbehandling',
  name: 'Ansiktsbehandling',
  description: 'Grundläggande ansiktsbehandlingar',
  subcategories: ['Portömning', 'Klassisk ansiktsbehandling', 'Facial boost up', 'Djuprengöring']
}, {
  id: 'microneedling',
  name: 'Microneedling',
  description: 'Kollagenstimulering och hudförnyelse',
  subcategories: ['Klassisk microneedling', 'Microneedling med serum', 'Microneedling RF']
}, {
  id: 'laserbehandling',
  name: 'Laserbehandling',
  description: 'Olika typer av laserbehandlingar',
  subcategories: ['Hårborttagning', 'Pigmentbehandling', 'Kärlbehandling', 'Hudförnyelse']
}, {
  id: 'kemisk-peeling',
  name: 'Kemisk peeling',
  description: 'Syrabehandlingar för hudförnyelse',
  subcategories: ['Mild peeling', 'Medel peeling', 'Djup peeling']
}, {
  id: 'konsultation',
  name: 'Konsultation',
  description: 'Rådgivning och analys',
  subcategories: ['Hudanalys', 'Behandlingsplan', 'Uppföljning']
}];
export default function Services() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEquipmentType, setSelectedEquipmentType] = useState("all");
  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const filteredEquipment = EQUIPMENT.filter(equipment => {
    const matchesSearch = equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) || equipment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedEquipmentType === "all" || equipment.type === selectedEquipmentType;
    return matchesSearch && matchesType;
  });
  const equipmentTypes = [{
    id: "all",
    name: "All utrustning"
  }, {
    id: "laser",
    name: "Laser"
  }, {
    id: "hydrafacial",
    name: "HydraFacial"
  }, {
    id: "microneedling",
    name: "Microneedling"
  }, {
    id: "analysis",
    name: "Analys"
  }, {
    id: "ipl",
    name: "IPL"
  }, {
    id: "radiofrequency",
    name: "Radiofrekvens"
  }];
  const categories = [{
    id: "all",
    name: "Alla kategorier"
  }, {
    id: "Laser",
    name: "Laser",
    color: "bg-blue-100 text-blue-800"
  }, {
    id: "Hudvård",
    name: "Hudvård",
    color: "bg-green-100 text-green-800"
  }, {
    id: "Anti-age",
    name: "Anti-age",
    color: "bg-purple-100 text-purple-800"
  }, {
    id: "Akne",
    name: "Akne",
    color: "bg-red-100 text-red-800"
  }];
  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || "bg-gray-100 text-gray-800";
  };
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      case 'expert':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getEquipmentTypeColor = (type: string) => {
    switch (type) {
      case 'laser':
        return 'bg-blue-100 text-blue-800';
      case 'hydrafacial':
        return 'bg-cyan-100 text-cyan-800';
      case 'microneedling':
        return 'bg-purple-100 text-purple-800';
      case 'analysis':
        return 'bg-orange-100 text-orange-800';
      case 'ipl':
        return 'bg-pink-100 text-pink-800';
      case 'radiofrequency':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const calculateMargin = (price: number) => {
    const estimatedCost = price * 0.4;
    return ((price - estimatedCost) / price * 100).toFixed(1);
  };
  return <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tjänster</h1>
        <p className="text-muted-foreground">
          Hantera grundtjänster, utrustning och sammansatta tjänster
        </p>
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="services">Tjänster</TabsTrigger>
          <TabsTrigger value="base-services">Grundtjänster</TabsTrigger>
          <TabsTrigger value="equipment">Utrustning</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Sök tjänster..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>)}
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
                Ny tjänst
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Aktiva tjänster ({filteredServices.length})</CardTitle>
              <CardDescription>
                Kompletta tjänster med prissättning som kombinerar grundtjänster och utrustning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Namn</TableHead>
                    <TableHead>Grundtjänst</TableHead>
                    <TableHead>Utrustning</TableHead>
                    <TableHead>Tidsgång</TableHead>
                    <TableHead>Pris</TableHead>
                    
                    <TableHead>Specialistnivå</TableHead>
                    
                    <TableHead>Åtgärder</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map(service => <TableRow key={service.id} className="cursor-pointer hover:bg-muted/50">
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
                        <div className="flex flex-wrap gap-1">
                          {service.equipment.slice(0, 2).map((eq, idx) => {
                        const equipment = EQUIPMENT.find(e => e.id === eq.equipmentId);
                        return equipment ? <Badge key={idx} variant="outline" className="text-xs">
                                {equipment.name.split(' ')[0]}
                              </Badge> : null;
                      })}
                          {service.equipment.length > 2 && <Badge variant="outline" className="text-xs">
                              +{service.equipment.length - 2}
                            </Badge>}
                        </div>
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
                        <Badge className={getDifficultyColor(service.requiredSpecialistLevel)}>
                          {service.requiredSpecialistLevel}
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
                    </TableRow>)}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="base-services" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Sök grundtjänster..." className="pl-10" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ny grundtjänst
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Grundtjänster ({BASE_SERVICE_CATEGORIES.length})</CardTitle>
              <CardDescription>
                Grundläggande tjänstekategorier utan prissättning - används för att bygga kompletta tjänster
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Namn</TableHead>
                    <TableHead>Beskrivning</TableHead>
                    <TableHead>Underkategorier</TableHead>
                    <TableHead>Antal tjänster</TableHead>
                    <TableHead>Åtgärder</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {BASE_SERVICE_CATEGORIES.map(category => <TableRow key={category.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">
                        {category.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {category.description}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {category.subcategories.slice(0, 3).map((sub, idx) => <Badge key={idx} variant="outline" className="text-xs">
                              {sub}
                            </Badge>)}
                          {category.subcategories.length > 3 && <Badge variant="outline" className="text-xs">
                              +{category.subcategories.length - 3}
                            </Badge>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {SERVICES.filter(s => s.categoryId.toLowerCase().includes(category.id.toLowerCase())).length} tjänster
                        </span>
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
                    </TableRow>)}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Sök utrustning..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              <Select value={selectedEquipmentType} onValueChange={setSelectedEquipmentType}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {equipmentTypes.map(type => <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Underhåll
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ny utrustning
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tillgänglig utrustning ({filteredEquipment.length})</CardTitle>
              <CardDescription>
                Utrustning som kan användas i tjänster
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Namn</TableHead>
                    <TableHead>Typ</TableHead>
                    <TableHead>Märke & Modell</TableHead>
                    <TableHead>Beskrivning</TableHead>
                    <TableHead>Kapacitet</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Åtgärder</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEquipment.map(equipment => <TableRow key={equipment.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">
                        {equipment.name}
                      </TableCell>
                      <TableCell>
                        <Badge className={getEquipmentTypeColor(equipment.type)}>
                          {equipment.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{equipment.brand}</div>
                          <div className="text-sm text-muted-foreground">{equipment.model}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-xs truncate">
                        {equipment.description}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {equipment.capabilities.slice(0, 2).map((cap, idx) => <Badge key={idx} variant="outline" className="text-xs">
                              {cap.replace('_', ' ')}
                            </Badge>)}
                          {equipment.capabilities.length > 2 && <Badge variant="outline" className="text-xs">
                              +{equipment.capabilities.length - 2}
                            </Badge>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={equipment.maintenanceRequired ? "destructive" : "default"}>
                          {equipment.maintenanceRequired ? "Underhåll krävs" : "Funktionsduglig"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Wrench className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}