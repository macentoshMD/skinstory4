
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CONTRAINDICATIONS, CONTRAINDICATION_CATEGORIES } from "@/data/contraindications";
import { Plus, Search, Filter, Edit, Trash2 } from "lucide-react";

interface ContraindictionsTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function ContraindictionsTab({ searchTerm, setSearchTerm }: ContraindictionsTabProps) {
  const [selectedContraCategory, setSelectedContraCategory] = useState("all");

  const filteredContraindications = CONTRAINDICATIONS.filter(contra => {
    const matchesSearch = contra.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         contra.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedContraCategory === "all" || contra.mainCategory === selectedContraCategory;
    return matchesSearch && matchesCategory;
  });

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Sök kontraindikationer..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="pl-10" 
            />
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
                {filteredContraindications.map(contra => (
                  <TableRow key={contra.id} className="cursor-pointer hover:bg-muted/50">
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
