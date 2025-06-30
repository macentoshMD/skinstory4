
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { EquipmentHandpiece } from "@/types/equipment-handpieces";
import { Edit, Trash2, Minus } from "lucide-react";

interface HandpieceTableRowProps {
  handpiece: EquipmentHandpiece;
  parentId: string;
}

export function HandpieceTableRow({ handpiece }: HandpieceTableRowProps) {
  const formatHandpieceTechnicalSpecs = (handpiece: EquipmentHandpiece) => {
    const specs = [];
    if (handpiece.technicalSpecs.wavelength) specs.push(`λ: ${handpiece.technicalSpecs.wavelength}`);
    if (handpiece.technicalSpecs.maxPower) specs.push(`Max: ${handpiece.technicalSpecs.maxPower}`);
    if (handpiece.technicalSpecs.spotSize) specs.push(`Spot: ${handpiece.technicalSpecs.spotSize}`);
    return specs.join(' | ');
  };

  return (
    <TableRow className="bg-muted/5">
      <TableCell>
        <div className="pl-6">
          <Minus className="h-3 w-3 text-muted-foreground" />
        </div>
      </TableCell>
      <TableCell>
        <div className="pl-6">
          <div className="font-medium text-sm">{handpiece.name}</div>
          <div className="text-xs text-muted-foreground">{handpiece.description}</div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="secondary" className="text-xs">
          {handpiece.type}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="text-xs">
          Handenhet
        </Badge>
      </TableCell>
      <TableCell className="text-sm">
        {formatHandpieceTechnicalSpecs(handpiece)}
      </TableCell>
      <TableCell>
        <div className="flex gap-1">
          <Button variant="outline" size="sm">
            <Edit className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
