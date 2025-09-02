import { useState } from "react";
import { Plus, Search, Filter, Package, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SalesProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  skinType: string[];
  skinProblems: string[];
  ingredients: string[];
  formulation: string;
  description: string;
  inStock: boolean;
}

const mockSalesProducts: SalesProduct[] = [
  {
    id: "1",
    name: "Gentle Cleansing Foam",
    brand: "Dermalogica",
    category: "Rengöring",
    price: 485,
    skinType: ["Känslig", "Normal"],
    skinProblems: ["Rodnad", "Irritation"],
    ingredients: ["Niacinamide", "Ceramider", "Hyaluronsyra"],
    formulation: "Skum",
    description: "Mild rengöring för känslig hud",
    inStock: true
  },
  {
    id: "2",
    name: "Vitamin C Serum",
    brand: "SkinCeuticals",
    category: "Serum",
    price: 1250,
    skinType: ["Normal", "Torr", "Mogen"],
    skinProblems: ["Pigmentfläckar", "Fina linjer", "Matt hud"],
    ingredients: ["L-Askorbinsyra", "Vitamin E", "Ferulasyra"],
    formulation: "Serum",
    description: "Antioxidantserum för ljusare och fastare hud",
    inStock: true
  },
];

const brands = ["Dermalogica", "SkinCeuticals", "Obagi", "Environ", "Skin Functional"];
const categories = ["Rengöring", "Serum", "Dagkräm", "Nattkräm", "Ögonkräm", "Mask", "Peeling"];

interface SalesProductsTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function SalesProductsTab({ searchTerm, setSearchTerm }: SalesProductsTabProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProducts = mockSalesProducts.filter(product => {
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
              placeholder="Sök produkter..."
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
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
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
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Lägg till produkt
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
                        <Tag className="h-3 w-3" />
                        {product.brand}
                      </CardDescription>
                    </div>
                    <Badge variant={product.inStock ? "default" : "secondary"}>
                      {product.inStock ? "I lager" : "Slut"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Kategori</p>
                    <p className="text-sm">{product.category}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pris</p>
                    <p className="text-lg font-bold">{product.price} kr</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Hudtyp</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.skinType.map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Problem</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.skinProblems.map((problem) => (
                        <Badge key={problem} variant="secondary" className="text-xs">
                          {problem}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Formulering</p>
                    <p className="text-sm">{product.formulation}</p>
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
            {brands.map((brand) => (
              <Card key={brand} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    {brand}
                  </CardTitle>
                  <CardDescription>
                    {mockSalesProducts.filter(p => p.brand === brand).length} produkter
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Kategorier</p>
                    <div className="flex flex-wrap gap-1">
                      {[...new Set(mockSalesProducts
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