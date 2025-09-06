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
  const [activeTab, setActiveTab] = useState("favorites");
  const [cartOpen, setCartOpen] = useState(false);

  const getFilteredItems = () => {
    if (activeTab === "all") return mockInventoryData;
    return mockInventoryData.filter(item => item.category === activeTab);
  };

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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="favorites">Mina vanliga beställningar</TabsTrigger>
              <TabsTrigger value="all">Alla artiklar</TabsTrigger>
              <TabsTrigger value="sales">Försäljning</TabsTrigger>
              <TabsTrigger value="treatment">Behandling</TabsTrigger>
              <TabsTrigger value="consumables">Förbrukning</TabsTrigger>
            </TabsList>

            <TabsContent value="favorites" className="space-y-6 mt-6">
              <FavoritesView items={mockInventoryData} />
            </TabsContent>

            <TabsContent value="all" className="space-y-6 mt-6">
              <AllProductsView items={mockInventoryData} />
            </TabsContent>

            <TabsContent value="sales" className="space-y-6 mt-6">
              <AllProductsView items={getFilteredItems()} />
            </TabsContent>

            <TabsContent value="treatment" className="space-y-6 mt-6">
              <AllProductsView items={getFilteredItems()} />
            </TabsContent>

            <TabsContent value="consumables" className="space-y-6 mt-6">
              <AllProductsView items={getFilteredItems()} />
            </TabsContent>
          </Tabs>

          <StickyOrderButton onOpenCart={() => setCartOpen(true)} />
          <OrderCartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </div>
      </FavoritesProvider>
    </OrderCartProvider>
  );
}