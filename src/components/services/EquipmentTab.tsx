import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EQUIPMENT, EQUIPMENT_CATEGORIES, EQUIPMENT_BRANDS } from "@/types/services";
import { Plus, Search, Filter, Settings, Edit, Wrench, Trash2, Eye } from "lucide-react";
interface EquipmentTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
export function EquipmentTab({
  searchTerm,
  setSearchTerm
}: EquipmentTabProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const filteredEquipment = EQUIPMENT.filter(equipment => {
    const matchesSearch = equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) || equipment.model.toLowerCase().includes(searchTerm.toLowerCase()) || equipment.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || equipment.mainCategory === selectedCategory;
    const matchesBrand = selectedBrand === "all" || equipment.brand === selectedBrand;
    return matchesSearch && matchesCategory && matchesBrand;
  });
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'laser':
        return 'bg-blue-100 text-blue-800';
      case 'ipl':
        return 'bg-cyan-100 text-cyan-800';
      case 'radiofrequency':
        return 'bg-purple-100 text-purple-800';
      case 'microneedling':
        return 'bg-green-100 text-green-800';
      case 'chemical_peeling':
        return 'bg-orange-100 text-orange-800';
      case 'cryotherapy':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const formatTechnicalSpecs = (equipment: any) => {
    const specs = [];
    if (equipment.wavelength) specs.push(`λ: ${equipment.wavelength}`);
    if (equipment.maxPower) specs.push(`Max: ${equipment.maxPower}`);
    if (equipment.spotSizeMin && equipment.spotSizeMax) {
      specs.push(`Spot: ${equipment.spotSizeMin}-${equipment.spotSizeMax}mm`);
    }
    return specs.join(' | ');
  };
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Sök utrustning..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla kategorier</SelectItem>
              {EQUIPMENT_CATEGORIES.map(category => <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Märke" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla märken</SelectItem>
              {EQUIPMENT_BRANDS.map(brand => <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Inställningar
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ny utrustning
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Utrustningsregister ({filteredEquipment.length})</CardTitle>
          <CardDescription>
            Teknisk dokumentation för all tillgänglig utrustning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Märke & Modell</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Tekniker</TableHead>
                  
                  <TableHead>Åtgärder</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipment.map(equipment => <TableRow key={equipment.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{equipment.brand} - {equipment.model}</div>
                        <div className="text-sm text-muted-foreground">
                          {equipment.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(equipment.mainCategory)}>
                        {EQUIPMENT_CATEGORIES.find(c => c.id === equipment.mainCategory)?.name || equipment.mainCategory}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {equipment.subCategories.slice(0, 2).map((tech, idx) => <Badge key={idx} variant="outline" className="text-xs">
                            {tech}
                          </Badge>)}
                        {equipment.subCategories.length > 2 && <Badge variant="outline" className="text-xs">
                            +{equipment.subCategories.length - 2}
                          </Badge>}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{equipment.name}</DialogTitle>
                              <DialogDescription>
                                {equipment.brand} {equipment.model}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4 py-4">
                              <div>
                                <h4 className="font-medium mb-2">Grunduppgifter</h4>
                                <div className="space-y-1 text-sm">
                                  <div><strong>Märke:</strong> {equipment.brand}</div>
                                  <div><strong>Modell:</strong> {equipment.model}</div>
                                  <div><strong>Huvudkategori:</strong> {EQUIPMENT_CATEGORIES.find(c => c.id === equipment.mainCategory)?.name}</div>
                                  <div><strong>Tekniker:</strong> {equipment.subCategories.join(', ')}</div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Tekniska specifikationer</h4>
                                <div className="space-y-1 text-sm">
                                  {equipment.wavelength && <div><strong>Våglängd:</strong> {equipment.wavelength}</div>}
                                  {equipment.maxPower && <div><strong>Max effekt:</strong> {equipment.maxPower}</div>}
                                  {equipment.spotSizeMin && equipment.spotSizeMax && <div><strong>Spot-storlek:</strong> {equipment.spotSizeMin}-{equipment.spotSizeMax}mm</div>}
                                  {equipment.coolingSystem && <div><strong>Kylsystem:</strong> {equipment.coolingSystem}</div>}
                                </div>
                              </div>
                              {equipment.otherSpecs && <div className="col-span-2">
                                  <h4 className="font-medium mb-2">Övriga specifikationer</h4>
                                  <p className="text-sm text-muted-foreground">{equipment.otherSpecs}</p>
                                </div>}
                              <div className="col-span-2">
                                <h4 className="font-medium mb-2">Beskrivning</h4>
                                <p className="text-sm text-muted-foreground">{equipment.description}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
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
    </div>;
}