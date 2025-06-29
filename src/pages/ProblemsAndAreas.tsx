
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { PROBLEM_TYPES, PROBLEM_AREAS } from "@/types/problem-areas";
import { Target, Plus, Edit, Trash2 } from "lucide-react";

export default function ProblemsAndAreas() {
  const [selectedProblemType, setSelectedProblemType] = useState(PROBLEM_TYPES[0]);
  const [selectedProblemArea, setSelectedProblemArea] = useState(PROBLEM_AREAS[0]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'dermatological': return 'bg-blue-100 text-blue-800';
      case 'cosmetic': return 'bg-purple-100 text-purple-800';
      case 'medical': return 'bg-red-100 text-red-800';
      case 'preventive': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Problem & Områden</h1>
        <p className="text-muted-foreground">
          Hantera problemtyper och anatomiska områden för diagnostik och konsultationer
        </p>
      </div>

      <Tabs defaultValue="problem-types" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="problem-types">Problemtyper</TabsTrigger>
          <TabsTrigger value="problem-areas">Problemområden</TabsTrigger>
        </TabsList>

        <TabsContent value="problem-types" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Problemtyper</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Lägg till problemtyp
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Problem Types List */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Tillgängliga problemtyper</h3>
              {PROBLEM_TYPES.map((problemType) => (
                <Card 
                  key={problemType.id} 
                  className={`cursor-pointer transition-colors ${selectedProblemType.id === problemType.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setSelectedProblemType(problemType)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{problemType.name}</CardTitle>
                      <Badge variant={problemType.isActive ? "default" : "secondary"}>
                        {problemType.isActive ? "Aktiv" : "Inaktiv"}
                      </Badge>
                    </div>
                    <CardDescription>{problemType.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getCategoryColor(problemType.category)}>
                        {problemType.category}
                      </Badge>
                      <Badge className={getSeverityColor(problemType.severity)}>
                        {problemType.severity}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Problem Type Details */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      {selectedProblemType.name}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{selectedProblemType.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Kategori</Label>
                      <div className="mt-1">
                        <Badge className={getCategoryColor(selectedProblemType.category)}>
                          {selectedProblemType.category}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Allvarlighetsgrad</Label>
                      <div className="mt-1">
                        <Badge className={getSeverityColor(selectedProblemType.severity)}>
                          {selectedProblemType.severity}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-sm font-medium">Vanliga kroppområden</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedProblemType.bodyAreas.map((area) => (
                        <Badge key={area} variant="outline">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Vanliga symptom</Label>
                    <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {selectedProblemType.commonSymptoms.map((symptom, index) => (
                        <li key={index}>{symptom}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Vanliga orsaker</Label>
                    <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {selectedProblemType.commonCauses.map((cause, index) => (
                        <li key={index}>{cause}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Kontraindikationer</Label>
                    <ul className="mt-2 list-disc list-inside text-sm text-red-600 space-y-1">
                      {selectedProblemType.contraindications.map((contraindication, index) => (
                        <li key={index}>{contraindication}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="problem-areas" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Problemområden</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Lägg till område
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Problem Areas List */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Anatomiska områden</h3>
              {PROBLEM_AREAS.map((area) => (
                <Card 
                  key={area.id} 
                  className={`cursor-pointer transition-colors ${selectedProblemArea.id === area.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setSelectedProblemArea(area)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{area.name}</CardTitle>
                      <Badge variant={area.isActive ? "default" : "secondary"}>
                        {area.isActive ? "Aktiv" : "Inaktiv"}
                      </Badge>
                    </div>
                    <CardDescription>{area.anatomicalLocation}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{area.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Problem Area Details */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      {selectedProblemArea.name}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{selectedProblemArea.anatomicalLocation}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium">Beskrivning</Label>
                    <p className="mt-2 text-sm text-muted-foreground">{selectedProblemArea.description}</p>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-sm font-medium">Vanliga problemtyper för detta område</Label>
                    <div className="mt-2 space-y-2">
                      {selectedProblemArea.commonProblemTypes.map((problemTypeId) => {
                        const problemType = PROBLEM_TYPES.find(pt => pt.id === problemTypeId);
                        return problemType ? (
                          <div key={problemTypeId} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <h4 className="font-medium">{problemType.name}</h4>
                              <p className="text-sm text-muted-foreground">{problemType.description}</p>
                            </div>
                            <div className="flex gap-2">
                              <Badge className={getCategoryColor(problemType.category)}>
                                {problemType.category}
                              </Badge>
                              <Badge className={getSeverityColor(problemType.severity)}>
                                {problemType.severity}
                              </Badge>
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
