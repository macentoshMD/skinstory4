import { CustomerPortalLayout } from '@/components/portal/CustomerPortalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import ProblemStatusBadge from '@/components/portal/problems/ProblemStatusBadge';
import { mockProblemsData } from '@/data/mockProblems';
import { getProblemSeverityColor, formatProblemAreas, formatDate } from '@/utils/problemHelpers';
import { 
  AlertCircle,
  Droplets,
  ExternalLink,
  Eye,
  Calendar,
  MapPin
} from 'lucide-react';

const CustomerPortalProblems = () => {
  const problemsData = mockProblemsData;
  
  // Determine default expanded state: expand all if only 1 problem, collapse if multiple
  const defaultExpandedValue = problemsData.length === 1 ? problemsData[0].id.toString() : undefined;

  const isMainProblem = (problemId: number) => problemId === 1; // Akne is the main problem

  return (
    <CustomerPortalLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mina Hudproblem</h1>
            <p className="text-muted-foreground mt-2">Detaljerad information om dina hudproblem och symptom</p>
          </div>
        </div>

        {/* Problems List */}
        <Accordion 
          type="multiple" 
          defaultValue={defaultExpandedValue ? [defaultExpandedValue] : []}
          className="space-y-4"
        >
          {problemsData.map((problem) => {
            const mainProblem = isMainProblem(problem.id);
            
            return (
              <AccordionItem key={problem.id} value={problem.id.toString()} className="border-0">
                <Card className="overflow-hidden">
                  <AccordionTrigger className="hover:no-underline p-0">
                    <CardHeader className="pb-4 w-full">
                      <div className="flex items-start justify-between w-full">
                        <div className="space-y-2 text-left">
                          <CardTitle className="flex items-center gap-3">
                            {mainProblem && (
                              <div className="p-1.5 rounded-lg bg-primary/10">
                                <AlertCircle className="h-4 w-4 text-primary" />
                              </div>
                            )}
                            {problem.name}
                            <Badge className={getProblemSeverityColor(problem.severity)}>
                              {problem.severity}
                            </Badge>
                            <ProblemStatusBadge status={problem.status} />
                            {mainProblem && (
                              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                Huvudproblem
                              </Badge>
                            )}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">{problem.description}</p>
                          <p className="text-xs text-muted-foreground">{problem.type}</p>
                        </div>
                      </div>
                    </CardHeader>
                  </AccordionTrigger>

                  <AccordionContent className="p-0">
                    <CardContent className="space-y-6 pt-0">
                      {/* Problem Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <label className="font-medium text-muted-foreground flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Drabbade områden
                          </label>
                          <div className="mt-2">
                            <p className="text-sm">{formatProblemAreas(problem.areas)}</p>
                          </div>
                        </div>
                        
                        <div>
                          <label className="font-medium text-muted-foreground">Första diagnos</label>
                          <p className="mt-1">{formatDate(problem.firstDiagnosed)}</p>
                        </div>
                        
                        <div>
                          <label className="font-medium text-muted-foreground">Senast utvärderad</label>
                          <p className="mt-1">{formatDate(problem.lastAssessed)}</p>
                        </div>

                        <div>
                          <label className="font-medium text-muted-foreground">Nästa uppföljning</label>
                          <p className="mt-1">{formatDate(problem.nextAssessment || null)}</p>
                        </div>
                      </div>

                      {/* Symptom Analysis */}
                      <div className="border-t pt-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Droplets className="h-5 w-5 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold">Symptomanalys</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          {problem.symptoms.map((symptom) => (
                            <div key={symptom.id} className="p-4 bg-muted/30 rounded-lg space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-sm">{symptom.name}</h4>
                                <Badge 
                                  variant="outline" 
                                  className={getProblemSeverityColor(symptom.severity)}
                                >
                                  {symptom.severity}
                                </Badge>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">Svårighetsgrad</span>
                                  <span className="font-semibold">{symptom.score}%</span>
                                </div>
                                <Progress value={symptom.score} className="h-2" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Treatment Plan Link */}
                      {problem.hasLinkedTreatmentPlan && (
                        <div className="border-t pt-6">
                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-blue-900">Tillhörande behandlingsplan</h4>
                                <p className="text-sm text-blue-800 mt-1">
                                  Se din personliga behandlingsplan för detta problem
                                </p>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-blue-300 text-blue-700 hover:bg-blue-100"
                                onClick={() => window.location.href = '/portal/behandlingsplan'}
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Visa plan
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Before/After Images */}
                      <div className="border-t pt-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Eye className="h-5 w-5 text-muted-foreground" />
                          <h4 className="font-medium">Bilder</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                              <div className="text-center text-gray-500">
                                <div className="text-sm font-medium">Första bedömning</div>
                                <div className="text-xs">{formatDate(problem.firstDiagnosed)}</div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                              <div className="text-center text-gray-500">
                                <div className="text-sm font-medium">Senaste bedömning</div>
                                <div className="text-xs">{formatDate(problem.lastAssessed)}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            );
          })}
        </Accordion>

        {/* Summary */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900">Problemöversikt</h3>
                <p className="text-sm text-blue-800 mt-1">
                  Du har totalt {problemsData.length} registrerade hudproblem. 
                  {problemsData.filter(p => p.status === 'Löst').length > 0 && 
                    ` ${problemsData.filter(p => p.status === 'Löst').length} problem är lösta.`
                  }
                  {problemsData.filter(p => p.hasLinkedTreatmentPlan).length > 0 && 
                    ` ${problemsData.filter(p => p.hasLinkedTreatmentPlan).length} problem har aktiva behandlingsplaner.`
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalProblems;