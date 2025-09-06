import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllProductsView } from "@/components/products/AllProductsView";
import { FavoritesView } from "@/components/products/FavoritesView";
import { OrderCartSidebar } from "@/components/products/OrderCartSidebar";
import { StickyOrderButton } from "@/components/products/StickyOrderButton";
import { OrderCartProvider } from "@/contexts/OrderCartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { mockInventoryData } from "@/data/inventoryData";

export default function Products() {
  const [viewType, setViewType] = useState<"favorites" | "all">("favorites");
  const [activeCategory, setActiveCategory] = useState<"sales" | "treatment" | "consumables">("sales");
  const [treatmentType, setTreatmentType] = useState<'all' | 'injections' | 'apparatus' | 'preparations' | 'other'>('all');
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <OrderCartProvider>
      <FavoritesProvider>
        <div className="space-y-6 pb-20">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Lageradministration</h1>
            <p className="text-muted-foreground">
              Beställ från dina vanliga produkter eller utforska hela sortimentet
            </p>
          </div>

          {/* Top level tabs: Min lista vs Alla artiklar */}
          <Tabs value={viewType} onValueChange={(value) => setViewType(value as "favorites" | "all")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="favorites">Min lista</TabsTrigger>
              <TabsTrigger value="all">Alla artiklar</TabsTrigger>
            </TabsList>

            <TabsContent value="favorites" className="space-y-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Min lista:</strong> Dina vanligaste beställningar. Lägg till/ta bort produkter i "Alla artiklar".
                </p>
              </div>
              
              {/* Category tabs for favorites */}
              <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as typeof activeCategory)} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="sales">Försäljning</TabsTrigger>
                  <TabsTrigger value="treatment">Behandling</TabsTrigger>
                  <TabsTrigger value="consumables">Förbrukning</TabsTrigger>
                </TabsList>

                {/* Treatment type filter for favorites */}
                {activeCategory === "treatment" && (
                  <div className="flex gap-2 mt-4">
                    <span className="text-sm font-medium">Typ:</span>
                    <Tabs value={treatmentType} onValueChange={(value) => setTreatmentType(value as typeof treatmentType)}>
                      <TabsList className="h-8">
                        <TabsTrigger value="all" className="h-6 px-3 text-xs">Alla</TabsTrigger>
                        <TabsTrigger value="injections" className="h-6 px-3 text-xs">Injektioner</TabsTrigger>
                        <TabsTrigger value="apparatus" className="h-6 px-3 text-xs">Apparatur</TabsTrigger>
                        <TabsTrigger value="preparations" className="h-6 px-3 text-xs">Preparat</TabsTrigger>
                        <TabsTrigger value="other" className="h-6 px-3 text-xs">Övrigt</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                )}

                <TabsContent value="sales" className="mt-6">
                  <FavoritesView items={mockInventoryData} category="sales" />
                </TabsContent>

                <TabsContent value="treatment" className="mt-6">
                  <FavoritesView items={mockInventoryData} category="treatment" treatmentType={treatmentType} />
                </TabsContent>

                <TabsContent value="consumables" className="mt-6">
                  <FavoritesView items={mockInventoryData} category="consumables" />
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="all" className="space-y-6">
              {/* Category tabs for all products */}
              <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as typeof activeCategory)} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="sales">Försäljning</TabsTrigger>
                  <TabsTrigger value="treatment">Behandling</TabsTrigger>
                  <TabsTrigger value="consumables">Förbrukning</TabsTrigger>
                </TabsList>

                {/* Treatment type filter for all products */}
                {activeCategory === "treatment" && (
                  <div className="flex gap-2 mt-4">
                    <span className="text-sm font-medium">Typ:</span>
                    <Tabs value={treatmentType} onValueChange={(value) => setTreatmentType(value as typeof treatmentType)}>
                      <TabsList className="h-8">
                        <TabsTrigger value="all" className="h-6 px-3 text-xs">Alla</TabsTrigger>
                        <TabsTrigger value="injections" className="h-6 px-3 text-xs">Injektioner</TabsTrigger>
                        <TabsTrigger value="apparatus" className="h-6 px-3 text-xs">Apparatur</TabsTrigger>
                        <TabsTrigger value="preparations" className="h-6 px-3 text-xs">Preparat</TabsTrigger>
                        <TabsTrigger value="other" className="h-6 px-3 text-xs">Övrigt</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                )}

                <TabsContent value="sales" className="mt-6">
                  <AllProductsView items={mockInventoryData} category="sales" />
                </TabsContent>

                <TabsContent value="treatment" className="mt-6">
                  <AllProductsView items={mockInventoryData} category="treatment" treatmentType={treatmentType} />
                </TabsContent>

                <TabsContent value="consumables" className="mt-6">
                  <AllProductsView items={mockInventoryData} category="consumables" />
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>

          <StickyOrderButton onOpenCart={() => setCartOpen(true)} />
          <OrderCartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </div>
      </FavoritesProvider>
    </OrderCartProvider>
  );
}