
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { services } from "@/data/services";
import { Sparkles, Plus, Edit, Trash2, Clock, DollarSign } from "lucide-react";

export default function Services() {
  const [selectedService, setSelectedService] = useState(services[0]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Lätt': return 'bg-green-100 text-green-800';
      case 'Medel': return 'bg-yellow-100 text-yellow-800';
      case 'Svår': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Laser': return 'bg-blue-100 text-blue-800';
      case 'Hudvård': return 'bg-green-100 text-green-800';
      case 'Anti-age': return 'bg-purple-100 text-purple-800';
      case 'Akne': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tjänster</h1>
        <p className="text-muted-foreground">
          Hantera grundtjänster och sammansatta behandlingspaket
        </p>
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="services">Grundtjänster</TabsTrigger>
          <TabsTrigger value="packages">Behandlingspaket</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Grundtjänster</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Lägg till tjänst
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Services List */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Tillgängliga tjänster</h3>
              {services.map((service) => (
                <Card 
                  key={service.id} 
                  className={`cursor-pointer transition-colors ${selectedService.id === service.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setSelectedService(service)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge variant={service.isActive ? "default" : "secondary"}>
                        {service.isActive ? "Aktiv" : "Inaktiv"}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className={getCategoryColor(service.category)}>
                        {service.category}
                      </Badge>
                      <Badge className={getDifficultyColor(service.difficulty)}>
                        {service.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {service.duration} min
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {service.price} kr
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Service Details */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      {selectedService.name}
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
                  <CardDescription>{selectedService.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Kategori</Label>
                      <div className="mt-1">
                        <Badge className={getCategoryColor(selectedService.category)}>
                          {selectedService.category}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Svårighetsgrad</Label>
                      <div className="mt-1">
                        <Badge className={getDifficultyColor(selectedService.difficulty)}>
                          {selectedService.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Varaktighet</Label>
                      <p className="text-sm text-muted-foreground">{selectedService.duration} minuter</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Pris</Label>
                      <p className="text-sm text-muted-foreground">{selectedService.price} kr</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Rekommenderat utrustning</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedService.equipment.map((eq) => (
                        <Badge key={eq} variant="outline">
                          {eq}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Fördelar</Label>
                    <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {selectedService.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Eftervård</Label>
                    <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {selectedService.aftercare.map((care, index) => (
                        <li key={index}>{care}</li>
                      ))}
                    </ul>
                  </div>

                  {selectedService.contraindications && selectedService.contraindications.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium">Kontraindikationer</Label>
                      <ul className="mt-2 list-disc list-inside text-sm text-red-600 space-y-1">
                        {selectedService.contraindications.map((contraindication, index) => (
                          <li key={index}>{contraindication}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="packages" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Behandlingspaket</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Skapa paket
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sammansatta behandlingspaket</CardTitle>
              <CardDescription>
                Skapa paket genom att kombinera flera grundtjänster för helhetslösningar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Paketnamn</Label>
                  <Input placeholder="T.ex. Komplett ansiktsbehandling" />
                </div>
                <div>
                  <Label>Totalpris</Label>
                  <Input type="number" placeholder="Pris i SEK" />
                </div>
              </div>
              
              <div>
                <Label>Beskrivning</Label>
                <Textarea placeholder="Beskriv behandlingspaketet..." />
              </div>
              
              <div>
                <Label>Välj tjänster att inkludera</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Lägg till tjänst" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} - {service.price} kr
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full">
                Skapa behandlingspaket
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
