
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EQUIPMENT } from "@/types/services";
import { Plus, Search, Filter, Settings, Edit, Wrench, Trash2 } from "lucide-react";

interface EquipmentTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function EquipmentTab({ searchTerm, setSearchTerm }: EquipmentTabProps) {
  const [selectedEquipmentType, setSelectedEquipmentType] = useState("all");

  const equipmentTypes = [
    { id: "all", name: "All utrustning" },
    { id: "laser", name: "Laser" },
    { id: "hydrafacial", name: "HydraFacial" },
    { id: "microneedling", name: "Microneedling" },
    { id: "analysis", name: "Analys" },
    { id: "ipl", name: "IPL" },
    { id: "radiofrequency", name: "Radiofrekvens" }
  ];

  const filteredEquipment = EQUIPMENT.filter(equipment => {
    const matchesSearch = equipment.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedEquipmentType === "all" || equipment.type === selectedEquipmentType;
    return matchesSearch && matchesType;
  });

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Sök utrustning..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="pl-10" 
            />
          </div>
          <Select value={selectedEquipmentType} onValueChange={setSelectedEquipmentType}>
            <SelectTrigger className="w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {equipmentTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
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
                  <TableHead>Beskrivning</TableHead>
                  <TableHead>Kapacitet</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Åtgärder</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipment.map(equipment => (
                  <TableRow key={equipment.id} className="cursor-pointer hover:bg-muted/50">
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
                        {equipment.capabilities.slice(0, 2).map((cap, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {cap.replace('_', ' ')}
                          </Badge>
                        ))}
                        {equipment.capabilities.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{equipment.capabilities.length - 2}
                          </Badge>
                        )}
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
