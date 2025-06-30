
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Equipment, EQUIPMENT_CATEGORIES } from "@/types/equipment";
import { EQUIPMENT_HANDPIECES } from "@/types/equipment-handpieces";
import { EquipmentDetailsDialog } from "./EquipmentDetailsDialog";
import { Edit, Wrench, Trash2, ChevronDown, ChevronRight } from "lucide-react";

interface EquipmentTableRowProps {
  equipment: Equipment;
  isExpanded: boolean;
  onToggleExpansion: (equipmentId: string) => void;
}

export function EquipmentTableRow({ 
  equipment, 
  isExpanded, 
  onToggleExpansion 
}: EquipmentTableRowProps) {
  const handpieces = EQUIPMENT_HANDPIECES[equipment.id] || [];
  const hasHandpieces = equipment.hasHandpieces && handpieces.length > 0;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'laser':
        return 'bg-blue-100 text-blue-800';
      case 'ipl':
        return 'bg-cyan-100 text-cyan-800';
      case 'radiofrequency':
        return 'bg-purple-100 text-purple-800';
      case 'microneedling':
        return 'bg-green-100 text-green-800';
      case 'chemical_peeling':
        return 'bg-orange-100 text-orange-800';
      case 'cryotherapy':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTechnicalSpecs = (equipment: Equipment) => {
    const specs = [];
    if (equipment.wavelength) specs.push(`λ: ${equipment.wavelength}`);
    if (equipment.maxPower) specs.push(`Max: ${equipment.maxPower}`);
    if (equipment.spotSizeMin && equipment.spotSizeMax) {
      specs.push(`Spot: ${equipment.spotSizeMin}-${equipment.spotSizeMax}mm`);
    }
    return specs.join(' | ');
  };

  return (
    <TableRow className="font-medium bg-muted/20">
      <TableCell>
        {hasHandpieces && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onToggleExpansion(equipment.id)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
      </TableCell>
      <TableCell>
        <div className="font-semibold text-base">
          {equipment.brand} - {equipment.model}
        </div>
        {hasHandpieces && (
          <div className="text-sm text-muted-foreground mt-1">
            {handpieces.length} handenheter
          </div>
        )}
      </TableCell>
      <TableCell>
        <Badge className={getCategoryColor(equipment.mainCategory)}>
          {EQUIPMENT_CATEGORIES.find(c => c.id === equipment.mainCategory)?.name || equipment.mainCategory}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {equipment.subCategories.slice(0, 2).map((tech, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {equipment.subCategories.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{equipment.subCategories.length - 2}
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell className="text-sm">
        {formatTechnicalSpecs(equipment)}
      </TableCell>
      <TableCell>
        <div className="flex gap-1">
          <EquipmentDetailsDialog equipment={equipment} />
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Wrench className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
