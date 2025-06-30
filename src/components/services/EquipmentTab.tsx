
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EQUIPMENT } from "@/types/equipment";
import { EQUIPMENT_HANDPIECES } from "@/types/equipment-handpieces";
import { EquipmentFilters } from "./equipment/EquipmentFilters";
import { EquipmentTableRow } from "./equipment/EquipmentTableRow";
import { HandpieceTableRow } from "./equipment/HandpieceTableRow";

interface EquipmentTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function EquipmentTab({
  searchTerm,
  setSearchTerm
}: EquipmentTabProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [expandedEquipment, setExpandedEquipment] = useState<Record<string, boolean>>({});

  const filteredEquipment = EQUIPMENT.filter(equipment => {
    const matchesSearch = equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         equipment.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         equipment.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || equipment.mainCategory === selectedCategory;
    const matchesBrand = selectedBrand === "all" || equipment.brand === selectedBrand;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  const getEquipmentHandpieces = (equipmentId: string) => {
    return EQUIPMENT_HANDPIECES[equipmentId] || [];
  };

  const toggleEquipmentExpansion = (equipmentId: string) => {
    setExpandedEquipment(prev => ({
      ...prev,
      [equipmentId]: !prev[equipmentId]
    }));
  };

  // Create expanded rows array for rendering
  const createExpandedRows = () => {
    const rows: Array<{
      type: 'equipment' | 'handpiece';
      data: any;
      parentId?: string;
    }> = [];

    filteredEquipment.forEach(equipment => {
      rows.push({ type: 'equipment', data: equipment });
      
      if (equipment.hasHandpieces && expandedEquipment[equipment.id]) {
        const handpieces = getEquipmentHandpieces(equipment.id);
        handpieces.forEach(handpiece => {
          rows.push({ 
            type: 'handpiece', 
            data: handpiece, 
            parentId: equipment.id 
          });
        });
      }
    });

    return rows;
  };

  const expandedRows = createExpandedRows();

  return (
    <div className="space-y-6">
      <EquipmentFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
      />

      <Card>
        <CardHeader>
          <CardTitle>Utrustningsregister ({filteredEquipment.length})</CardTitle>
          <CardDescription>
            Teknisk dokumentation för all tillgänglig utrustning och handenheter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Märke och modell</TableHead>
                  <TableHead>Kategori/Typ</TableHead>
                  <TableHead>Teknik</TableHead>
                  <TableHead>Tekniska specifikationer</TableHead>
                  <TableHead>Åtgärder</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expandedRows.map((row, index) => {
                  if (row.type === 'equipment') {
                    return (
                      <EquipmentTableRow
                        key={row.data.id}
                        equipment={row.data}
                        isExpanded={expandedEquipment[row.data.id]}
                        onToggleExpansion={toggleEquipmentExpansion}
                      />
                    );
                  } else {
                    return (
                      <HandpieceTableRow
                        key={`${row.parentId}-${row.data.id}`}
                        handpiece={row.data}
                        parentId={row.parentId!}
                      />
                    );
                  }
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
