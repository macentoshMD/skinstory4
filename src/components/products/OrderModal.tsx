import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package2, MapPin, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Consumable {
  id: string;
  name: string;
  category: string;
  supplier: string;
  unit: string;
  pricePerUnit: number;
  minStock: number;
  currentStock: number;
  description: string;
  lastOrdered: string;
}

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consumable: Consumable | null;
}

const clinics = [
  { id: "sodermalm", name: "Södermalm", address: "Götgatan 12, Stockholm" },
  { id: "ostermalm", name: "Östermalm", address: "Stureplan 4, Stockholm" },
  { id: "sundbyberg", name: "Sundbyberg", address: "Landsvägen 45, Sundbyberg" }
];

export function OrderModal({ open, onOpenChange, consumable }: OrderModalProps) {
  const [selectedClinic, setSelectedClinic] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [urgentDelivery, setUrgentDelivery] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  const { toast } = useToast();

  if (!consumable) return null;

  const totalPrice = parseFloat(quantity || "0") * consumable.pricePerUnit;
  const deliveryFee = urgentDelivery ? 99 : 0;
  const finalTotal = totalPrice + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedClinic || !quantity || parseInt(quantity) <= 0) {
      toast({
        title: "Ofullständig beställning",
        description: "Vänligen fyll i alla obligatoriska fält.",
        variant: "destructive",
      });
      return;
    }

    // Simulera beställning
    toast({
      title: "Beställning skickad!",
      description: `${quantity} ${consumable.unit} av ${consumable.name} beställd till ${clinics.find(c => c.id === selectedClinic)?.name}.`,
    });

    // Rensa formulär
    setSelectedClinic("");
    setQuantity("");
    setUrgentDelivery(false);
    setNotes("");
    onOpenChange(false);
  };

  const suggestedQuantity = Math.max(consumable.minStock - consumable.currentStock, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package2 className="h-5 w-5" />
            Beställ material
          </DialogTitle>
          <DialogDescription>
            Skapa en beställning för {consumable.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Produktinformation */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{consumable.name}</CardTitle>
              <CardDescription>
                {consumable.supplier} • {consumable.category}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pris per {consumable.unit}</p>
                  <p className="font-bold">{consumable.pricePerUnit} kr</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nuvarande lager</p>
                  <p className={`font-bold ${
                    consumable.currentStock <= consumable.minStock ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {consumable.currentStock} {consumable.unit}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rekommenderad beställning</p>
                  <p className="font-bold text-blue-600">{suggestedQuantity} {consumable.unit}</p>
                </div>
              </div>
              {consumable.currentStock <= consumable.minStock && (
                <Badge variant="destructive" className="mt-2">
                  Lågt lager - beställ snarast
                </Badge>
              )}
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Klinikval */}
            <div className="space-y-2">
              <Label htmlFor="clinic">Leverans till klinik *</Label>
              <Select value={selectedClinic} onValueChange={setSelectedClinic}>
                <SelectTrigger>
                  <SelectValue placeholder="Välj klinik" />
                </SelectTrigger>
                <SelectContent>
                  {clinics.map((clinic) => (
                    <SelectItem key={clinic.id} value={clinic.id}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <div>
                          <p className="font-medium">{clinic.name}</p>
                          <p className="text-sm text-muted-foreground">{clinic.address}</p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Kvantitet */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Antal {consumable.unit} *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder={`T.ex. ${suggestedQuantity}`}
                />
              </div>
              <div className="space-y-2">
                <Label>Snabbleverans (+99 kr)</Label>
                <div className="flex items-center space-x-2 mt-3">
                  <input
                    type="checkbox"
                    id="urgent"
                    checked={urgentDelivery}
                    onChange={(e) => setUrgentDelivery(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="urgent" className="text-sm">
                    Leverans inom 24h
                  </Label>
                </div>
              </div>
            </div>

            {/* Anteckningar */}
            <div className="space-y-2">
              <Label htmlFor="notes">Anteckningar (valfritt)</Label>
              <Textarea
                id="notes"
                placeholder="T.ex. specifika instruktioner för leverans..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
              />
            </div>

            {/* Prissammanfattning */}
            {quantity && parseInt(quantity) > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calculator className="h-5 w-5" />
                    Beställningssammanfattning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>{quantity} {consumable.unit} × {consumable.pricePerUnit} kr</span>
                    <span>{totalPrice.toFixed(2)} kr</span>
                  </div>
                  {urgentDelivery && (
                    <div className="flex justify-between text-orange-600">
                      <span>Snabbleverans</span>
                      <span>{deliveryFee} kr</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Totalt</span>
                    <span>{finalTotal.toFixed(2)} kr</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Leverans: {urgentDelivery ? "1-2 arbetsdagar" : "3-5 arbetsdagar"}
                  </p>
                </CardContent>
              </Card>
            )}
          </form>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Avbryt
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedClinic || !quantity || parseInt(quantity) <= 0}>
            Skicka beställning
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}