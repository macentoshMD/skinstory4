
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BASE_SERVICES } from "@/types/base-services-data";
import { SERVICES } from "@/data/services";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

interface BaseServicesTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function BaseServicesTab({ searchTerm, setSearchTerm }: BaseServicesTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Sök grundtjänster..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="pl-10" 
            />
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
                {BASE_SERVICES.map(service => (
                  <TableRow key={service.id} className="cursor-pointer hover:bg-muted/50">
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
