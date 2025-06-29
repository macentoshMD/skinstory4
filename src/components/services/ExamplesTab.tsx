
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SERVICES } from "@/data/services";
import { Search, Upload, Download, Edit, Trash2, Clock, DollarSign } from "lucide-react";

interface ExamplesTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function ExamplesTab({ searchTerm, setSearchTerm }: ExamplesTabProps) {
  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Sök exempel..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="pl-10" 
            />
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
                {filteredServices.map(service => (
                  <TableRow key={service.id} className="cursor-pointer hover:bg-muted/50">
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
