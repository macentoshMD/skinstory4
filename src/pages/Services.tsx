
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Edit, Settings, Zap, Clock, Star, Layers, Target, Stethoscope, Wrench } from "lucide-react";
import { BASE_SERVICES, COMPOSED_SERVICES } from "@/types/base-services";
import { PROBLEM_TYPES, PROBLEM_AREAS } from "@/types/problem-areas";
import { EQUIPMENT } from "@/types/services";
import { EQUIPMENT_SPECS } from "@/types/equipment-specs";

const Services = () => {
  const [baseServices] = useState(BASE_SERVICES);
  const [composedServices] = useState(COMPOSED_SERVICES);
  const [problemTypes] = useState(PROBLEM_TYPES);
  const [problemAreas] = useState(PROBLEM_AREAS);
  const [equipment] = useState(EQUIPMENT);
  const [equipmentSpecs] = useState(EQUIPMENT_SPECS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const formatPrice = (priceInCents: number) => {
    return `${(priceInCents / 100).toLocaleString('sv-SE')} kr`;
  };

  const getSpecialistLevelBadge = (level: string) => {
    const variants = {
      'basic': 'secondary',
      'intermediate': 'default', 
      'advanced': 'destructive',
      'expert': 'destructive'
    } as const;
    
    const labels = {
      'basic': 'Grund',
      'intermediate': 'Mellan', 
      'advanced': 'Avancerad',
      'expert': 'Expert'
    };
    
    return { variant: variants[level as keyof typeof variants], label: labels[level as keyof typeof labels] };
  };

  const filteredBaseServices = baseServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || selectedType === "base";
    return matchesSearch && matchesType && service.isActive;
  });

  const filteredComposedServices = composedServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || selectedType === "composed";
    return matchesSearch && matchesType && service.isActive;
  });

  const getBaseServiceNames = (baseServiceIds: string[]) => {
    return baseServiceIds.map(id => {
      const service = baseServices.find(s => s.id === id);
      return service?.name || 'Okänd tjänst';
    });
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      'mild': 'secondary',
      'moderate': 'default',
      'severe': 'destructive'
    } as const;
    
    const labels = {
      'mild': 'Mild',
      'moderate': 'Måttlig',
      'severe': 'Svår'
    };
    
    return { variant: variants[severity as keyof typeof variants], label: labels[severity as keyof typeof labels] };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tjänster & Diagnostik</h1>
          <p className="text-gray-600 mt-2">Hantera tjänster, problemtyper, utrustning och behandlingsparametrar</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Grundtjänst
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Skapa ny grundtjänst</DialogTitle>
                <DialogDescription>
                  Skapa en grundläggande tjänst som kan kombineras med andra
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Tjänstens namn" />
                  <Input placeholder="Pris (kr)" type="number" />
                </div>
                <Input placeholder="Beskrivning" />
                <Input placeholder="Varaktighet (min)" type="number" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Specialistnivå" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Grundläggande</SelectItem>
                    <SelectItem value="intermediate">Mellanliggande</SelectItem>
                    <SelectItem value="advanced">Avancerad</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Skapa grundtjänst</Button>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Sammansatt tjänst
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Skapa sammansatt tjänst</DialogTitle>
                <DialogDescription>
                  Kombinera flera grundtjänster till ett paket
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input placeholder="Tjänstens namn" />
                <Input placeholder="Beskrivning" />
                <div>
                  <label className="text-sm font-medium mb-2 block">Välj grundtjänster</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto border rounded p-2">
                    {baseServices.map(service => (
                      <div key={service.id} className="flex items-center space-x-2">
                        <input type="checkbox" id={service.id} />
                        <label htmlFor={service.id} className="text-sm">
                          {service.name} ({formatPrice(service.price)}, {service.duration}min)
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <Input placeholder="Rabatt (%)" type="number" />
              </div>
              <Button className="w-full">Skapa sammansatt tjänst</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="services" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="services">Tjänster</TabsTrigger>
          <TabsTrigger value="problems">Problemtyper</TabsTrigger>
          <TabsTrigger value="areas">Områden</TabsTrigger>
          <TabsTrigger value="equipment">Utrustning</TabsTrigger>
          <TabsTrigger value="settings">Parametrar</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          {/* Service Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="h-4 w-4 text-blue-500" />
                  Grundtjänster
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{baseServices.filter(s => s.isActive).length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Layers className="h-4 w-4 text-green-500" />
                  Sammansatta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{composedServices.filter(s => s.isActive).length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  Snitt-tid grund
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(baseServices.reduce((sum, s) => sum + s.duration, 0) / baseServices.length)} min
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-4 w-4 text-orange-500" />
                  Utrustning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{equipment.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Services List */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Tjänstlista</CardTitle>
                  <CardDescription>Grund- och sammansatta tjänster</CardDescription>
                </div>
                <div className="flex gap-4">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filtrera typ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alla typer</SelectItem>
                      <SelectItem value="base">Grundtjänster</SelectItem>
                      <SelectItem value="composed">Sammansatta</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Sök tjänster..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tjänst</TableHead>
                    <TableHead>Typ</TableHead>
                    <TableHead>Tid & Pris</TableHead>
                    <TableHead>Nivå</TableHead>
                    <TableHead>Detaljer</TableHead>
                    <TableHead>Åtgärder</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Base Services */}
                  {filteredBaseServices.map((service) => {
                    const levelInfo = getSpecialistLevelBadge(service.requiredSpecialistLevel);
                    
                    return (
                      <TableRow key={service.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {service.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="flex items-center gap-1 w-fit">
                            <Star className="h-3 w-3" />
                            Grund
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{formatPrice(service.price)}</div>
                            <div className="text-sm text-gray-500">{service.duration} min</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={levelInfo.variant as any}>
                            {levelInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-600">
                            {service.skinTypes.length} hudtyper
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  
                  {/* Composed Services */}
                  {filteredComposedServices.map((service) => {
                    const baseServiceNames = getBaseServiceNames(service.baseServiceIds);
                    
                    return (
                      <TableRow key={service.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {service.description}
                            </div>
                            {service.recommendedSessions && (
                              <div className="text-xs text-blue-600 mt-1">
                                Rekommenderat: {service.recommendedSessions} sessioner
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                            <Layers className="h-3 w-3" />
                            Sammansatt
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{formatPrice(service.totalPrice)}</div>
                            <div className="text-sm text-gray-500">{service.totalDuration} min</div>
                            {service.discount && (
                              <div className="text-xs text-green-600">-{service.discount}% rabatt</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {service.baseServiceIds.length} tjänster
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {baseServiceNames.slice(0, 2).map((name, index) => (
                              <Badge key={index} variant="secondary" className="text-xs mr-1">
                                {name}
                              </Badge>
                            ))}
                            {baseServiceNames.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{baseServiceNames.length - 2} till
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
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="problems" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Problemtyper för Diagnostik
              </CardTitle>
              <CardDescription>Diagnoser och hudproblem för konsultationer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {problemTypes.map(problem => {
                  const severityInfo = getSeverityBadge(problem.severity);
                  
                  return (
                    <Card key={problem.id} className="border">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{problem.name}</CardTitle>
                          <Badge variant={severityInfo.variant as any}>
                            {severityInfo.label}
                          </Badge>
                        </div>
                        <CardDescription>{problem.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <Badge variant="outline" className="text-xs">
                            {problem.category}
                          </Badge>
                          
                          <div className="text-sm">
                            <div className="font-medium mb-1">Vanliga symtom:</div>
                            <ul className="text-xs space-y-1 text-gray-600">
                              {problem.commonSymptoms.slice(0, 3).map((symptom, index) => (
                                <li key={index}>• {symptom}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="text-sm">
                            <div className="font-medium mb-1">Kroppsområden:</div>
                            <div className="flex flex-wrap gap-1">
                              {problem.bodyAreas.slice(0, 3).map(area => (
                                <Badge key={area} variant="secondary" className="text-xs">
                                  {area}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="areas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Anatomiska Områden
              </CardTitle>
              <CardDescription>Kroppsområden för behandlingar och diagnostik</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {problemAreas.map(area => (
                  <Card key={area.id} className="border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{area.name}</CardTitle>
                      <CardDescription className="text-sm">{area.anatomicalLocation}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">{area.description}</p>
                        <div className="text-sm">
                          <div className="font-medium mb-1">Vanliga problem:</div>
                          <div className="text-xs text-gray-600">
                            {area.commonProblemTypes.length} problemtyper
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Utrustning</CardTitle>
              <CardDescription>All tillgänglig behandlingsutrustning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {equipment.map(equipment => (
                  <Card key={equipment.id} className="border">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{equipment.name}</CardTitle>
                          <CardDescription>{equipment.brand} {equipment.model}</CardDescription>
                        </div>
                        <Badge variant={equipment.type === 'laser' ? 'destructive' : 'secondary'}>
                          {equipment.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm">{equipment.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {equipment.capabilities.map(capability => (
                            <Badge key={capability} variant="outline" className="text-xs">
                              {capability.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                        {equipment.maintenanceRequired && (
                          <div className="flex items-center gap-1 text-sm text-orange-600">
                            <Settings className="h-3 w-3" />
                            Kräver underhåll
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Behandlingsparametrar
              </CardTitle>
              <CardDescription>Detaljerade inställningar för varje utrustning - krävs för Strålskyddsmyndigheten</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {equipmentSpecs.map(spec => (
                  <div key={spec.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{spec.brand} {spec.model}</h3>
                        <p className="text-sm text-gray-600">{spec.category.replace('_', ' ')}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{spec.type}</Badge>
                        {spec.wavelengths && (
                          <Badge variant="secondary">
                            {spec.wavelengths.join(', ')} nm
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {spec.parameters.map(param => (
                        <div key={param.id} className="border rounded p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-sm">{param.name}</h4>
                            {param.isRequired && (
                              <Badge variant="destructive" className="text-xs">Obligatorisk</Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{param.description}</p>
                          <div className="text-xs">
                            <span className="font-medium">Typ:</span> {param.type}
                            {param.unit && <span className="ml-2">({param.unit})</span>}
                          </div>
                          {param.minValue !== undefined && param.maxValue !== undefined && (
                            <div className="text-xs text-gray-500">
                              Range: {param.minValue} - {param.maxValue}
                            </div>
                          )}
                          {param.options && (
                            <div className="text-xs text-gray-500">
                              Alternativ: {param.options.join(', ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex flex-wrap gap-2">
                        {spec.certifications.map(cert => (
                          <Badge key={cert} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
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

export default Services;
