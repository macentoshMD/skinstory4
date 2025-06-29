
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TREATMENT_AREAS } from "@/types/base-services";
import { Plus, Search, Filter, Edit, Trash2 } from "lucide-react";

interface AreasTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function AreasTab({ searchTerm, setSearchTerm }: AreasTabProps) {
  const [selectedAreaRegion, setSelectedAreaRegion] = useState("all");

  const bodyRegions = [
    { id: "all", name: "Alla regioner" },
    { id: "face", name: "Ansikte" },
    { id: "neck", name: "Hals" },
    { id: "chest", name: "Bröst" },
    { id: "hands", name: "Händer" },
    { id: "arms", name: "Armar" },
    { id: "legs", name: "Ben" },
    { id: "back", name: "Rygg" }
  ];

  const filteredAreas = TREATMENT_AREAS.filter(area => {
    const matchesSearch = area.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedAreaRegion === "all" || area.bodyRegion === selectedAreaRegion;
    return matchesSearch && matchesRegion;
  });

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Sök områden..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="pl-10" 
            />
          </div>
          <Select value={selectedAreaRegion} onValueChange={setSelectedAreaRegion}>
            <SelectTrigger className="w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {bodyRegions.map(region => (
                <SelectItem key={region.id} value={region.id}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nytt område
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Behandlingsområden ({filteredAreas.length})</CardTitle>
          <CardDescription>
            Kroppsområden som kan behandlas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Namn</TableHead>
                  <TableHead>Kroppsregion</TableHead>
                  <TableHead>Åtgärder</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAreas.map(area => (
                  <TableRow key={area.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {area.name}
                    </TableCell>
                    <TableCell>
                      <Badge className={getBodyRegionColor(area.bodyRegion)}>
                        {area.bodyRegion}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
