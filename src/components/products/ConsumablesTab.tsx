import { useState } from "react";
import { Plus, Search, Package2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderModal } from "./OrderModal";

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

const mockConsumables: Consumable[] = [
  {
    id: "1",
    name: "Engangslancsetter",
    category: "Hygien",
    supplier: "MedSupply AB",
    unit: "st",
    pricePerUnit: 2.5,
    minStock: 100,
    currentStock: 45,
    description: "Sterile engångslancsetter för hudanalyser",
    lastOrdered: "2024-01-15"
  },
  {
    id: "2",
    name: "Bomullspads",
    category: "Hygien",
    supplier: "CottonCare",
    unit: "förpackning",
    pricePerUnit: 25,
    minStock: 20,
    currentStock: 35,
    description: "Ekologiska bomullspads för rengöring",
    lastOrdered: "2024-01-10"
  },
  {
    id: "3",
    name: "Undersökningspapper",
    category: "Hygien",
    supplier: "PaperPro",
    unit: "rulle",
    pricePerUnit: 35,
    minStock: 10,
    currentStock: 6,
    description: "Engångsundersökningspapper för behandlingsbänkar",
    lastOrdered: "2024-01-08"
  },
  {
    id: "4",
    name: "Desinfektionsmedel",
    category: "Städ",
    supplier: "CleanCorp",
    unit: "liter",
    pricePerUnit: 45,
    minStock: 5,
    currentStock: 8,
    description: "Professionellt desinfektionsmedel för ytor",
    lastOrdered: "2024-01-12"
  },
  {
    id: "5",
    name: "Kopieringspapper A4",
    category: "Kontor",
    supplier: "OfficeMax",
    unit: "paket",
    pricePerUnit: 65,
    minStock: 5,
    currentStock: 12,
    description: "Högkvalitativt kopieringspapper",
    lastOrdered: "2024-01-05"
  }
];

const categories = ["Hygien", "Städ", "Kontor", "Behandling", "Skyddsutrustning"];
const suppliers = ["MedSupply AB", "CottonCare", "PaperPro", "CleanCorp", "OfficeMax"];

interface ConsumablesTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function ConsumablesTab({ searchTerm, setSearchTerm }: ConsumablesTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSupplier, setSelectedSupplier] = useState<string>("all");
  const [showLowStock, setShowLowStock] = useState<boolean>(false);
  const [orderModalOpen, setOrderModalOpen] = useState<boolean>(false);
  const [selectedConsumable, setSelectedConsumable] = useState<Consumable | null>(null);

  const filteredConsumables = mockConsumables.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSupplier = selectedSupplier === "all" || item.supplier === selectedSupplier;
    const matchesStock = !showLowStock || item.currentStock <= item.minStock;
    
    return matchesSearch && matchesCategory && matchesSupplier && matchesStock;
  });

  const lowStockCount = mockConsumables.filter(item => item.currentStock <= item.minStock).length;

  const handleOrderClick = (consumable: Consumable) => {
    setSelectedConsumable(consumable);
    setOrderModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Sök förbrukningsmaterial..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            className="px-3 py-2 rounded-md border border-input bg-background text-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Alla kategorier</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 rounded-md border border-input bg-background text-sm"
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
          >
            <option value="all">Alla leverantörer</option>
            {suppliers.map(supplier => (
              <option key={supplier} value={supplier}>{supplier}</option>
            ))}
          </select>
          <Button
            variant={showLowStock ? "default" : "outline"}
            onClick={() => setShowLowStock(!showLowStock)}
            className="flex items-center gap-2"
          >
            <AlertTriangle className="h-4 w-4" />
            Lågt lager ({lowStockCount})
          </Button>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Lägg till material
        </Button>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList>
          <TabsTrigger value="products">Material</TabsTrigger>
          <TabsTrigger value="categories">Kategorier</TabsTrigger>
          <TabsTrigger value="suppliers">Leverantörer</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredConsumables.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Package2 className="h-3 w-3" />
                        {item.supplier}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge variant="outline">{item.category}</Badge>
                      {item.currentStock <= item.minStock && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Lågt lager
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pris per {item.unit}</p>
                      <p className="text-sm font-bold">{item.pricePerUnit} kr</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Enhet</p>
                      <p className="text-sm">{item.unit}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">I lager</p>
                      <p className={`text-sm font-bold ${
                        item.currentStock <= item.minStock ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {item.currentStock} {item.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Min. lager</p>
                      <p className="text-sm">{item.minStock} {item.unit}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Senast beställt</p>
                    <p className="text-sm">{item.lastOrdered}</p>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleOrderClick(item)}
                    >
                      Beställ mer
                    </Button>
                    <Button variant="outline" size="sm">
                      Redigera
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Card key={category} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package2 className="h-5 w-5" />
                    {category}
                  </CardTitle>
                  <CardDescription>
                    {mockConsumables.filter(item => item.category === category).length} produkter
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Lågt lager: {mockConsumables.filter(item => 
                        item.category === category && item.currentStock <= item.minStock
                      ).length} produkter
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Visa alla i kategori
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suppliers.map((supplier) => (
              <Card key={supplier} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package2 className="h-5 w-5" />
                    {supplier}
                  </CardTitle>
                  <CardDescription>
                    {mockConsumables.filter(item => item.supplier === supplier).length} produkter
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Kategorier</p>
                    <div className="flex flex-wrap gap-1">
                      {[...new Set(mockConsumables
                        .filter(item => item.supplier === supplier)
                        .map(item => item.category))]
                        .map((category) => (
                          <Badge key={category} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Kontakta leverantör
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <OrderModal
        open={orderModalOpen}
        onOpenChange={setOrderModalOpen}
        consumable={selectedConsumable}
      />
    </div>
  );
}