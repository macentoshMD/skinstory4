
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Edit, Settings, Zap, Clock, Star } from "lucide-react";
import { SERVICES, SERVICE_PACKAGES } from "@/data/services";
import { SERVICE_CATEGORIES, EQUIPMENT } from "@/types/services";

const Services = () => {
  const [services] = useState(SERVICES);
  const [packages] = useState(SERVICE_PACKAGES);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.categoryId === selectedCategory;
    return matchesSearch && matchesCategory && service.isActive;
  });

  const getEquipmentNames = (serviceEquipment: any[]) => {
    return serviceEquipment.map(eq => {
      const equipment = EQUIPMENT.find(e => e.id === eq.equipmentId);
      return equipment?.name || 'Okänt';
    });
  };

  const formatPrice = (priceInCents: number) => {
    return `${(priceInCents / 100).toLocaleString('sv-SE')} kr`;
  };

  const getCategoryStats = () => {
    const categoryStats = SERVICE_CATEGORIES.map(category => {
      const categoryServices = services.filter(s => s.categoryId === category.id && s.isActive);
      const avgPrice = categoryServices.length > 0 
        ? categoryServices.reduce((sum, s) => sum + s.price, 0) / categoryServices.length / 100
        : 0;
      
      return {
        ...category,
        count: categoryServices.length,
        avgPrice: Math.round(avgPrice)
      };
    }).filter(stat => stat.count > 0);

    return categoryStats;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tjänster</h1>
          <p className="text-gray-600 mt-2">Hantera tjänster, utrustning och tjänstepaket</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Ny tjänst
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Skapa ny tjänst</DialogTitle>
              <DialogDescription>
                Skapa en ny tjänst med utrustning och inställningar
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Tjänstens namn" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_CATEGORIES.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input placeholder="Beskrivning" />
              <div className="grid grid-cols-3 gap-4">
                <Input placeholder="Pris (kr)" type="number" />
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
              <div>
                <label className="text-sm font-medium mb-2 block">Utrustning</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Välj utrustning" />
                  </SelectTrigger>
                  <SelectContent>
                    {EQUIPMENT.map(equipment => (
                      <SelectItem key={equipment.id} value={equipment.id}>
                        {equipment.name} ({equipment.brand})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full">Skapa tjänst</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="services" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="services">Tjänster</TabsTrigger>
          <TabsTrigger value="packages">Tjänstepaket</TabsTrigger>
          <TabsTrigger value="equipment">Utrustning</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          {/* Service Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Aktiva tjänster
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{services.filter(s => s.isActive).length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-500" />
                  Genomsnittlig tid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(services.reduce((sum, s) => sum + s.duration, 0) / services.length)} min
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-500" />
                  Med utrustning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {services.filter(s => s.equipment.length > 0).length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-4 w-4 text-orange-500" />
                  Tjänstepaket
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{packages.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Category Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Kategorier</CardTitle>
              <CardDescription>Översikt över tjänstekategorier</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {getCategoryStats().map(category => (
                  <div key={category.id} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>{category.count} tjänster</div>
                      <div>Snitt: {category.avgPrice.toLocaleString('sv-SE')} kr</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Services List */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Tjänstlista</CardTitle>
                  <CardDescription>Alla tillgängliga tjänster med utrustning</CardDescription>
                </div>
                <div className="flex gap-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filtrera kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alla kategorier</SelectItem>
                      {SERVICE_CATEGORIES.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
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
                    <TableHead>Kategori</TableHead>
                    <TableHead>Tid & Pris</TableHead>
                    <TableHead>Utrustning</TableHead>
                    <TableHead>Nivå</TableHead>
                    <TableHead>Åtgärder</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => {
                    const category = SERVICE_CATEGORIES.find(c => c.id === service.categoryId);
                    const equipmentNames = getEquipmentNames(service.equipment);
                    
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
                          <Badge variant="outline" className="flex items-center gap-1 w-fit">
                            <span>{category?.icon}</span>
                            {category?.name}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{formatPrice(service.price)}</div>
                            <div className="text-sm text-gray-500">{service.duration} min</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {equipmentNames.length > 0 ? (
                              equipmentNames.slice(0, 2).map((name, index) => (
                                <Badge key={index} variant="secondary" className="text-xs mr-1">
                                  <Zap className="h-3 w-3 mr-1" />
                                  {name}
                                </Badge>
                              ))
                            ) : (
                              <Badge variant="outline" className="text-xs">
                                Ingen utrustning
                              </Badge>
                            )}
                            {equipmentNames.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{equipmentNames.length - 2} till
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={service.requiredSpecialistLevel === 'expert' ? 'destructive' : 
                                   service.requiredSpecialistLevel === 'advanced' ? 'default' : 'secondary'}
                          >
                            {service.requiredSpecialistLevel === 'basic' ? 'Grund' :
                             service.requiredSpecialistLevel === 'intermediate' ? 'Mellan' :
                             service.requiredSpecialistLevel === 'advanced' ? 'Avancerad' : 'Expert'}
                          </Badge>
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

        <TabsContent value="packages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tjänstepaket</CardTitle>
              <CardDescription>Förkonfigurerade paket med rabatter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {packages.map(pkg => (
                  <Card key={pkg.id} className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                      <CardDescription>{pkg.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Sessioner:</span>
                          <span className="font-medium">{pkg.sessions}st</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rabatt:</span>
                          <span className="font-medium text-green-600">{pkg.discount}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pris:</span>
                          <span className="font-bold">{formatPrice(pkg.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Giltighet:</span>
                          <span className="text-sm">{pkg.validityMonths} månader</span>
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
                {EQUIPMENT.map(equipment => (
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
      </Tabs>
    </div>
  );
};

export default Services;
