
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PROBLEM_AREAS } from "@/types/problem-areas-data";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

interface ProblemsTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function ProblemsTab({ searchTerm, setSearchTerm }: ProblemsTabProps) {
  const filteredProblems = PROBLEM_AREAS.filter(problem => {
    const matchesSearch = problem.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Sök problem..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="pl-10" 
            />
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
                {filteredProblems.map(problem => (
                  <TableRow key={problem.id} className="cursor-pointer hover:bg-muted/50">
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
