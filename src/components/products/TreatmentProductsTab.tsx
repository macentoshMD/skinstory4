import { useState } from "react";
import { Plus, Search, Package, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TreatmentProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  type: string;
  strength?: string;
  applicationArea: string[];
  treatmentType: string[];
  volume: string;
  description: string;
  inStock: boolean;
}

const mockTreatmentProducts: TreatmentProduct[] = [
  {
    id: "1",
    name: "Glycolic Acid Peel 30%",
    brand: "Obagi",
    category: "Kemisk peeling",
    type: "AHA",
    strength: "30%",
    applicationArea: ["Ansikte", "Hals"],
    treatmentType: ["Akne", "Pigmentering", "Textur"],
    volume: "50ml",
    description: "Professionell glykolsyrapeeling för förbättrad hudtextur",
    inStock: true
  },
  {
    id: "2",
    name: "Professional Cleansing Solution",
    brand: "Dermalogica",
    category: "Rengöring",
    type: "Rengöringsmedel",
    applicationArea: ["Ansikte", "Kropp"],
    treatmentType: ["Förberedelse", "Eftervård"],
    volume: "250ml",
    description: "Professionell rengöring för behandlingar",
    inStock: true
  },
];

const treatmentBrands = ["Obagi", "Dermalogica", "SkinCeuticals", "Environ"];
const treatmentCategories = ["Kemisk peeling", "Rengöring", "Serum", "Mask", "Toner"];

interface TreatmentProductsTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function TreatmentProductsTab({ searchTerm, setSearchTerm }: TreatmentProductsTabProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProducts = mockTreatmentProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === "all" || product.brand === selectedBrand;
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    return matchesSearch && matchesBrand && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Sök behandlingsprodukter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            className="px-3 py-2 rounded-md border border-input bg-background text-sm"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="all">Alla varumärken</option>
            {treatmentBrands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 rounded-md border border-input bg-background text-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Alla kategorier</option>
            {treatmentCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Lägg till behandlingsprodukt
        </Button>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList>
          <TabsTrigger value="products">Produkter</TabsTrigger>
          <TabsTrigger value="brands">Varumärken</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Zap className="h-3 w-3" />
                        {product.brand}
                      </CardDescription>
                    </div>
                    <Badge variant={product.inStock ? "default" : "secondary"}>
                      {product.inStock ? "I lager" : "Slut"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Kategori</p>
                      <p className="text-sm">{product.category}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Volym</p>
                      <p className="text-sm">{product.volume}</p>
                    </div>
                  </div>

                  {product.strength && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Styrka</p>  
                      <p className="text-sm font-bold text-orange-600">{product.strength}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Behandlingsområde</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.applicationArea.map((area) => (
                        <Badge key={area} variant="outline" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Behandlingstyp</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.treatmentType.map((type) => (
                        <Badge key={type} variant="secondary" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Redigera
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="brands" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {treatmentBrands.map((brand) => (
              <Card key={brand} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    {brand}
                  </CardTitle>
                  <CardDescription>
                    {mockTreatmentProducts.filter(p => p.brand === brand).length} behandlingsprodukter
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Kategorier</p>
                    <div className="flex flex-wrap gap-1">
                      {[...new Set(mockTreatmentProducts
                        .filter(p => p.brand === brand)
                        .map(p => p.category))]
                        .map((category) => (
                          <Badge key={category} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Hantera varumärke
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}