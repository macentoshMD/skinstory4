
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PROBLEM_HIERARCHY } from "@/types/problem-hierarchy-data";
import { Plus, Search, Edit, Trash2, ChevronDown, ChevronRight, Stethoscope, User, Activity } from "lucide-react";

interface ProblemsTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function ProblemsTab({ searchTerm, setSearchTerm }: ProblemsTabProps) {
  const [expandedProblems, setExpandedProblems] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: string[]}>({});

  const toggleProblem = (problemId: string) => {
    setExpandedProblems(prev => 
      prev.includes(problemId) 
        ? prev.filter(id => id !== problemId)
        : [...prev, problemId]
    );
  };

  const toggleSection = (problemId: string, section: 'symptoms' | 'subproblems') => {
    setExpandedSections(prev => ({
      ...prev,
      [problemId]: prev[problemId]?.includes(section) 
        ? prev[problemId].filter(s => s !== section)
        : [...(prev[problemId] || []), section]
    }));
  };

  const filteredProblems = PROBLEM_HIERARCHY.filter(problem => {
    const matchesSearch = problem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.subProblems.some(sub => 
                           sub.name.toLowerCase().includes(searchTerm.toLowerCase())
                         ) ||
                         problem.symptoms.some(symptom => 
                           symptom.medicalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (symptom.commonName && symptom.commonName.toLowerCase().includes(searchTerm.toLowerCase()))
                         );
    return matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'inflammatory':
        return 'bg-red-100 text-red-800';
      case 'pigmentary':
        return 'bg-orange-100 text-orange-800';
      case 'aging':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalSubProblems = PROBLEM_HIERARCHY.reduce((total, problem) => total + problem.subProblems.length, 0);
  const totalSymptoms = PROBLEM_HIERARCHY.reduce((total, problem) => total + problem.symptoms.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Sök problem, symtom..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="pl-10" 
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nytt grundproblem
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Stethoscope className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Grundproblem</p>
                <p className="text-2xl font-bold">{PROBLEM_HIERARCHY.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <User className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Underproblem</p>
                <p className="text-2xl font-bold">{totalSubProblems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Activity className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Symtom</p>
                <p className="text-2xl font-bold">{totalSymptoms}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Problemhierarki ({filteredProblems.length} grundproblem)</CardTitle>
          <CardDescription>
            Hierarkisk struktur med grundproblem, tillhörande symtom och underproblem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProblems.map(problem => (
              <div key={problem.id} className="border rounded-lg p-4 space-y-3">
                {/* Grundproblem Level */}
                <div className="flex items-center justify-between">
                  <Collapsible>
                    <CollapsibleTrigger 
                      className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-md transition-colors w-full justify-start"
                      onClick={() => toggleProblem(problem.id)}
                    >
                      {expandedProblems.includes(problem.id) ? 
                        <ChevronDown className="h-4 w-4" /> : 
                        <ChevronRight className="h-4 w-4" />
                      }
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-semibold text-lg">{problem.name}</h3>
                          <p className="text-sm text-muted-foreground">{problem.description}</p>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                  </Collapsible>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={getCategoryColor(problem.category)}>
                      {problem.category}
                    </Badge>
                    <Badge variant="outline">
                      {problem.symptoms.length} symtom
                    </Badge>
                    <Badge variant="outline">
                      {problem.subProblems.length} underproblem
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedProblems.includes(problem.id) && (
                  <div className="ml-6 space-y-4 border-l-2 border-muted pl-4">
                    
                    {/* Symtom Section */}
                    <div className="space-y-2">
                      <Collapsible>
                        <CollapsibleTrigger 
                          className="flex items-center justify-between w-full hover:bg-muted/50 p-2 rounded-md transition-colors"
                          onClick={() => toggleSection(problem.id, 'symptoms')}
                        >
                          <div className="flex items-center gap-2">
                            {expandedSections[problem.id]?.includes('symptoms') ? 
                              <ChevronDown className="h-3 w-3" /> : 
                              <ChevronRight className="h-3 w-3" />
                            }
                            <Activity className="h-4 w-4 text-purple-600" />
                            <h4 className="font-medium">Symtom ({problem.symptoms.length})</h4>
                          </div>
                        </CollapsibleTrigger>
                      </Collapsible>

                      {expandedSections[problem.id]?.includes('symptoms') && (
                        <div className="ml-6 space-y-2 border-l border-muted pl-3">
                          {problem.symptoms.map(symptom => (
                            <div key={symptom.id} className="flex items-center justify-between p-2 bg-purple-50/50 rounded-md">
                              <div className="flex items-center gap-3">
                                <Stethoscope className="h-3 w-3 text-muted-foreground" />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm">{symptom.medicalName}</span>
                                    {symptom.commonName && (
                                      <Badge variant="secondary" className="text-xs">
                                        {symptom.commonName}
                                      </Badge>
                                    )}
                                  </div>
                                  {symptom.description && (
                                    <p className="text-xs text-muted-foreground">{symptom.description}</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Underproblem Section */}
                    <div className="space-y-2">
                      <Collapsible>
                        <CollapsibleTrigger 
                          className="flex items-center justify-between w-full hover:bg-muted/50 p-2 rounded-md transition-colors"
                          onClick={() => toggleSection(problem.id, 'subproblems')}
                        >
                          <div className="flex items-center gap-2">
                            {expandedSections[problem.id]?.includes('subproblems') ? 
                              <ChevronDown className="h-3 w-3" /> : 
                              <ChevronRight className="h-3 w-3" />
                            }
                            <User className="h-4 w-4 text-green-600" />
                            <h4 className="font-medium">Underproblem ({problem.subProblems.length})</h4>
                          </div>
                        </CollapsibleTrigger>
                      </Collapsible>

                      {expandedSections[problem.id]?.includes('subproblems') && (
                        <div className="ml-6 space-y-2 border-l border-muted pl-3">
                          {problem.subProblems.map(subProblem => (
                            <div key={subProblem.id} className="p-2 bg-green-50/50 rounded-md">
                              <div className="flex items-center justify-between">
                                <div className="text-left">
                                  <h5 className="font-medium text-sm">{subProblem.name}</h5>
                                  <p className="text-xs text-muted-foreground">{subProblem.description}</p>
                                </div>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
