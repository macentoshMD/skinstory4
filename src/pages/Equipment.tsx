
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
import { EQUIPMENT_SPECS } from "@/types/equipment-specs";
import { Wrench, Settings, Activity, FileText } from "lucide-react";

export default function Equipment() {
  const [selectedEquipment, setSelectedEquipment] = useState(EQUIPMENT_SPECS[0]);
  const [treatmentSettings, setTreatmentSettings] = useState<Record<string, any>>({});

  const handleParameterChange = (parameterId: string, value: string | number | boolean) => {
    setTreatmentSettings(prev => ({
      ...prev,
      [parameterId]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Utrustning & Parametrar</h1>
        <p className="text-muted-foreground">
          Hantera medicinsk utrustning, parametrar och behandlingsregistrering
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equipment List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Tillgänglig Utrustning</h2>
          {EQUIPMENT_SPECS.map((equipment) => (
            <Card 
              key={equipment.id} 
              className={`cursor-pointer transition-colors ${selectedEquipment.id === equipment.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedEquipment(equipment)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{equipment.brand} {equipment.model}</CardTitle>
                  <Badge variant={equipment.isActive ? "default" : "secondary"}>
                    {equipment.isActive ? "Aktiv" : "Inaktiv"}
                  </Badge>
                </div>
                <CardDescription>{equipment.type} - {equipment.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {equipment.certifications.map((cert) => (
                    <Badge key={cert} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Equipment Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                {selectedEquipment.brand} {selectedEquipment.model}
              </CardTitle>
              <CardDescription>
                {selectedEquipment.type} för {selectedEquipment.category}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="specifications" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="specifications">Specifikationer</TabsTrigger>
                  <TabsTrigger value="parameters">Parametrar</TabsTrigger>
                  <TabsTrigger value="treatment">Behandling</TabsTrigger>
                  <TabsTrigger value="maintenance">Underhåll</TabsTrigger>
                </TabsList>

                <TabsContent value="specifications" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Typ</Label>
                      <p className="text-sm text-muted-foreground capitalize">{selectedEquipment.type}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Kategori</Label>
                      <p className="text-sm text-muted-foreground capitalize">{selectedEquipment.category.replace('_', ' ')}</p>
                    </div>
                    {selectedEquipment.wavelengths && (
                      <div>
                        <Label className="text-sm font-medium">Våglängder</Label>
                        <p className="text-sm text-muted-foreground">{selectedEquipment.wavelengths.join(', ')} nm</p>
                      </div>
                    )}
                    {selectedEquipment.maxPower && (
                      <div>
                        <Label className="text-sm font-medium">Max Effekt</Label>
                        <p className="text-sm text-muted-foreground">{selectedEquipment.maxPower} W</p>
                      </div>
                    )}
                    {selectedEquipment.spotSizes && (
                      <div>
                        <Label className="text-sm font-medium">Spot-storlekar</Label>
                        <p className="text-sm text-muted-foreground">{selectedEquipment.spotSizes.join(', ')} mm</p>
                      </div>
                    )}
                    {selectedEquipment.coolingSystem && (
                      <div>
                        <Label className="text-sm font-medium">Kylsystem</Label>
                        <p className="text-sm text-muted-foreground">{selectedEquipment.coolingSystem}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="parameters" className="space-y-4">
                  <div className="space-y-4">
                    {selectedEquipment.parameters.map((parameter) => (
                      <div key={parameter.id} className="space-y-2">
                        <Label className="text-sm font-medium">
                          {parameter.name}
                          {parameter.isRequired && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <p className="text-xs text-muted-foreground">{parameter.description}</p>
                        
                        {parameter.type === 'number' && (
                          <Input
                            type="number"
                            min={parameter.minValue}
                            max={parameter.maxValue}
                            placeholder={`${parameter.minValue}-${parameter.maxValue} ${parameter.unit || ''}`}
                            onChange={(e) => handleParameterChange(parameter.id, parseFloat(e.target.value))}
                          />
                        )}
                        
                        {parameter.type === 'range' && (
                          <div className="space-y-1">
                            <Input
                              type="range"
                              min={parameter.minValue}
                              max={parameter.maxValue}
                              step="0.1"
                              onChange={(e) => handleParameterChange(parameter.id, parseFloat(e.target.value))}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{parameter.minValue} {parameter.unit}</span>
                              <span>{parameter.maxValue} {parameter.unit}</span>
                            </div>
                          </div>
                        )}
                        
                        {parameter.type === 'select' && (
                          <Select onValueChange={(value) => handleParameterChange(parameter.id, value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Välj värde" />
                            </SelectTrigger>
                            <SelectContent>
                              {parameter.options?.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option} {parameter.unit && `${parameter.unit}`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        
                        {parameter.type === 'boolean' && (
                          <Select onValueChange={(value) => handleParameterChange(parameter.id, value === 'true')}>
                            <SelectTrigger>
                              <SelectValue placeholder="Välj" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Ja</SelectItem>
                              <SelectItem value="false">Nej</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="treatment" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Behandlingsregistrering
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Registrera behandlingsdata för dokumentation enligt Strålskyddsmyndighetens krav.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Antal skott</Label>
                        <Input type="number" placeholder="Antal" />
                      </div>
                      <div>
                        <Label>Energi levererad (J)</Label>
                        <Input type="number" placeholder="Joule" />
                      </div>
                      <div>
                        <Label>Behandlingsområden</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Välj område" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="face">Ansikte</SelectItem>
                            <SelectItem value="legs">Ben</SelectItem>
                            <SelectItem value="arms">Armar</SelectItem>
                            <SelectItem value="back">Rygg</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Personal</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Välj personal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="staff1">Anna Andersson</SelectItem>
                            <SelectItem value="staff2">Erik Eriksson</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Anteckningar</Label>
                      <Textarea placeholder="Behandlingsanteckningar..." />
                    </div>
                    
                    <div>
                      <Label>Biverkningar (om några)</Label>
                      <Textarea placeholder="Eventuella biverkningar..." />
                    </div>
                    
                    <Button className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Spara Behandlingsdata
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="maintenance" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Underhållsschema
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Dagliga kontroller</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          {selectedEquipment.maintenanceSchedule.dailyChecks.map((check, index) => (
                            <li key={index}>{check}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-medium">Veckovisa kontroller</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          {selectedEquipment.maintenanceSchedule.weeklyChecks.map((check, index) => (
                            <li key={index}>{check}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-medium">Månatliga kontroller</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          {selectedEquipment.maintenanceSchedule.monthlyChecks.map((check, index) => (
                            <li key={index}>{check}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
