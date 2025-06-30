
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
import { BASE_SERVICES } from "@/types/base-services-data";
import { PROBLEM_AREAS } from "@/types/problem-areas-data";
import { TREATMENT_AREAS } from "@/types/treatment-areas-index";
import { CONTRAINDICATIONS, CONTRAINDICATION_CATEGORIES } from "@/data/contraindications";
import { Plus, Search, Filter, Download, Upload, Edit, Trash2, Clock, DollarSign, Wrench, Target, Settings, Tag, AlertTriangle } from "lucide-react";
import { AreasTab } from "@/components/services/AreasTab";

export default function Services() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEquipmentType, setSelectedEquipmentType] = useState("all");
  const [selectedProblemCategory, setSelectedProblemCategory] = useState("all");
  const [selectedAreaRegion, setSelectedAreaRegion] = useState("all");
  const [selectedContraCategory, setSelectedContraCategory] = useState("all");

  // Filter functions
  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  const filteredEquipment = EQUIPMENT.filter(equipment => {
    const matchesSearch = equipment.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedEquipmentType === "all" || equipment.type === selectedEquipmentType;
    return matchesSearch && matchesType;
  });
  const filteredProblems = PROBLEM_AREAS.filter(problem => {
    const matchesSearch = problem.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  const filteredAreas = TREATMENT_AREAS.filter(area => {
    const matchesSearch = area.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedAreaRegion === "all" || area.regionId === selectedAreaRegion;
    return matchesSearch && matchesRegion;
  });

  const filteredContraindications = CONTRAINDICATIONS.filter(contra => {
    const matchesSearch = contra.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         contra.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedContraCategory === "all" || contra.mainCategory === selectedContraCategory;
    return matchesSearch && matchesCategory;
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
  const bodyRegions = [{
    id: "all",
    name: "Alla regioner"
  }, {
    id: "face",
    name: "Ansikte"
  }, {
    id: "neck",
    name: "Hals"
  }, {
    id: "chest",
    name: "Bröst"
  }, {
    id: "hands",
    name: "Händer"
  }, {
    id: "arms",
    name: "Armar"
  }, {
    id: "legs",
    name: "Ben"
  }, {
    id: "back",
    name: "Rygg"
  }];

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
  const getBodyRegionColor = (region: string) => {
    switch (region) {
      case 'face':
        return 'bg-green-100 text-green-800';
      case 'neck':
        return 'bg-blue-100 text-blue-800';
      case 'chest':
        return 'bg-purple-100 text-purple-800';
      case 'hands':
        return 'bg-orange-100 text-orange-800';
      case 'arms':
        return 'bg-pink-100 text-pink-800';
      case 'legs':
        return 'bg-cyan-100 text-cyan-800';
      case 'back':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMainCategoryColor = (mainCategory: string) => {
    switch (mainCategory) {
      case 'medical':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'medications':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'skin_type':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'pregnancy':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'previous_treatments':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'skin_infection':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'age':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'lifestyle':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tjänsteadministration</h1>
        <p className="text-muted-foreground">
          Hantera grundtjänster, utrustning, problem och behandlingsområden
        </p>
      </div>

      <Tabs defaultValue="base-services" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="base-services">Grundtjänster</TabsTrigger>
          <TabsTrigger value="equipment">Utrustning</TabsTrigger>
          <TabsTrigger value="problems">Problem</TabsTrigger>
          <TabsTrigger value="areas">Områden</TabsTrigger>
          <TabsTrigger value="contraindications">Kontraindikationer</TabsTrigger>
          <TabsTrigger value="examples">Exempel</TabsTrigger>
        </TabsList>

        {/* Grundtjänster Tab */}
        <TabsContent value="base-services" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Sök grundtjänster..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
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
              <CardTitle>Grundtjänster ({BASE_SERVICES.length})</CardTitle>
              <CardDescription>
                Grundläggande tjänstekategorier som används för att bygga kompletta behandlingar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Namn</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Beskrivning</TableHead>
                      <TableHead>Antal behandlingar</TableHead>
                      <TableHead>Åtgärder</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {BASE_SERVICES.map(service => <TableRow key={service.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">
                          {service.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {service.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {service.description}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {SERVICES.filter(s => s.categoryId.toLowerCase().includes(service.id.toLowerCase())).length} behandlingar
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Utrustning Tab */}
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
                Utrustning som kan användas i behandlingar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Namn</TableHead>
                      <TableHead>Typ</TableHead>
                      <TableHead>Märke & Modell</TableHead>
                      <TableHead>Tags
                    </TableHead>
                      <TableHead>Problem
                    </TableHead>
                      
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Problem Tab */}
        <TabsContent value="problems" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Sök problem..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nytt problem
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Hudproblem ({filteredProblems.length})</CardTitle>
              <CardDescription>
                Problem som kan behandlas med olika tjänster
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Namn</TableHead>
                      <TableHead>Beskrivning</TableHead>
                      <TableHead>Åtgärder</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProblems.map(problem => <TableRow key={problem.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">
                          {problem.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {problem.description}
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Områden Tab - Updated */}
        <TabsContent value="areas" className="space-y-6">
          <AreasTab searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </TabsContent>

        {/* Kontraindikationer Tab */}
        <TabsContent value="contraindications" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Sök kontraindikationer..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              <Select value={selectedContraCategory} onValueChange={setSelectedContraCategory}>
                <SelectTrigger className="w-[250px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Välj kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla kategorier</SelectItem>
                  {CONTRAINDICATION_CATEGORIES.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        <span>{category.emoji}</span>
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ny kontraindikation
              </Button>
            </div>
          </div>

          {/* Category Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {CONTRAINDICATION_CATEGORIES.map(category => {
              const categoryCount = CONTRAINDICATIONS.filter(c => c.mainCategory === category.id).length;
              return (
                <Card key={category.id} className={`cursor-pointer transition-colors hover:bg-muted/50 ${selectedContraCategory === category.id ? 'ring-2 ring-primary' : ''}`} 
                      onClick={() => setSelectedContraCategory(category.id)}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.emoji}</span>
                      <div>
                        <h3 className="font-medium text-sm">{category.name}</h3>
                        <p className="text-xs text-muted-foreground">{categoryCount} kontraindikationer</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                Kontraindikationer ({filteredContraindications.length})
                {selectedContraCategory !== "all" && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    - {CONTRAINDICATION_CATEGORIES.find(c => c.id === selectedContraCategory)?.name}
                  </span>
                )}
              </CardTitle>
              <CardDescription>
                Medicinska och andra förhållanden som kan påverka behandlingar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kontraindikation</TableHead>
                      <TableHead>Beskrivning</TableHead>
                      <TableHead>Allvarlighetsgrad</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Åtgärder</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContraindications.map(contra => <TableRow key={contra.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{contra.emoji}</span>
                            <div>
                              <div>{contra.name}</div>
                              {contra.category !== contra.mainCategory && (
                                <div className="text-xs text-muted-foreground capitalize">
                                  {contra.category.replace('_', ' ')}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground max-w-md">
                          {contra.description}
                        </TableCell>
                        <TableCell>
                          <Badge className={getSeverityColor(contra.severity)}>
                            {contra.severity === 'high' ? 'Hög' : 
                             contra.severity === 'medium' ? 'Medel' : 'Låg'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getMainCategoryColor(contra.mainCategory)} variant="outline">
                            <span className="mr-1">
                              {CONTRAINDICATION_CATEGORIES.find(c => c.id === contra.mainCategory)?.emoji}
                            </span>
                            {CONTRAINDICATION_CATEGORIES.find(c => c.id === contra.mainCategory)?.name}
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exempel Tab */}
        <TabsContent value="examples" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Sök exempel..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
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
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Exempel-behandlingar ({filteredServices.length})</CardTitle>
              <CardDescription>
                Referensbehandlingar som kliniker kan använda som mallar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Namn</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Tidsgång</TableHead>
                      <TableHead>Referenspris</TableHead>
                      <TableHead>Åtgärder</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredServices.map(service => <TableRow key={service.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">
                          {service.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}
