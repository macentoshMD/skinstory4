
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Equipment, EQUIPMENT_CATEGORIES } from "@/types/equipment";
import { EQUIPMENT_HANDPIECES } from "@/types/equipment-handpieces";
import { Eye } from "lucide-react";

interface EquipmentDetailsDialogProps {
  equipment: Equipment;
}

export function EquipmentDetailsDialog({ equipment }: EquipmentDetailsDialogProps) {
  const handpieces = EQUIPMENT_HANDPIECES[equipment.id] || [];
  const hasHandpieces = equipment.hasHandpieces && handpieces.length > 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{equipment.name}</DialogTitle>
          <DialogDescription>
            {equipment.brand} {equipment.model}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6 py-4">
          <div>
            <h4 className="font-medium mb-2">Grunduppgifter</h4>
            <div className="space-y-1 text-sm">
              <div><strong>Märke:</strong> {equipment.brand}</div>
              <div><strong>Modell:</strong> {equipment.model}</div>
              <div><strong>Huvudkategori:</strong> {EQUIPMENT_CATEGORIES.find(c => c.id === equipment.mainCategory)?.name}</div>
              <div><strong>Tekniker:</strong> {equipment.subCategories.join(', ')}</div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Tekniska specifikationer</h4>
            <div className="space-y-1 text-sm">
              {equipment.wavelength && <div><strong>Våglängd:</strong> {equipment.wavelength}</div>}
              {equipment.maxPower && <div><strong>Max effekt:</strong> {equipment.maxPower}</div>}
              {equipment.spotSizeMin && equipment.spotSizeMax && <div><strong>Spot-storlek:</strong> {equipment.spotSizeMin}-{equipment.spotSizeMax}mm</div>}
              {equipment.coolingSystem && <div><strong>Kylsystem:</strong> {equipment.coolingSystem}</div>}
            </div>
          </div>
          
          {hasHandpieces && (
            <div className="col-span-2">
              <h4 className="font-medium mb-2">Handenheter och tillbehör</h4>
              <div className="grid grid-cols-2 gap-4">
                {handpieces.map((handpiece) => (
                  <div key={handpiece.id} className="border rounded-lg p-3">
                    <div className="font-medium">{handpiece.name} ({handpiece.type})</div>
                    <div className="text-sm text-muted-foreground mb-2">{handpiece.description}</div>
                    <div className="text-xs space-y-1">
                      {handpiece.technicalSpecs.wavelength && (
                        <div><strong>Våglängd:</strong> {handpiece.technicalSpecs.wavelength}</div>
                      )}
                      {handpiece.technicalSpecs.maxPower && (
                        <div><strong>Max effekt:</strong> {handpiece.technicalSpecs.maxPower}</div>
                      )}
                      {handpiece.technicalSpecs.spotSize && (
                        <div><strong>Spot-storlek:</strong> {handpiece.technicalSpecs.spotSize}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {equipment.otherSpecs && (
            <div className="col-span-2">
              <h4 className="font-medium mb-2">Övriga specifikationer</h4>
              <p className="text-sm text-muted-foreground">{equipment.otherSpecs}</p>
            </div>
          )}
          <div className="col-span-2">
            <h4 className="font-medium mb-2">Beskrivning</h4>
            <p className="text-sm text-muted-foreground">{equipment.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
