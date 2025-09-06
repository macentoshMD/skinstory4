import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductInventoryTable } from "@/components/products/ProductInventoryTable";
import { OrderCartSidebar } from "@/components/products/OrderCartSidebar";
import { StickyOrderButton } from "@/components/products/StickyOrderButton";
import { OrderCartProvider } from "@/contexts/OrderCartContext";
import { mockInventoryData } from "@/data/inventoryData";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);

  const getFilteredItems = () => {
    if (activeTab === "all") return mockInventoryData;
    return mockInventoryData.filter(item => item.category === activeTab);
  };

  return (
    <OrderCartProvider>
      <div className="space-y-6 pb-20">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lageradministration</h1>
          <p className="text-muted-foreground">
            Beställ försäljningsprodukter, behandlingsprodukter och förbrukningsmaterial
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Alla produkter</TabsTrigger>
            <TabsTrigger value="sales">Försäljning</TabsTrigger>
            <TabsTrigger value="treatment">Behandling</TabsTrigger>
            <TabsTrigger value="consumables">Förbrukning</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6 mt-6">
            <ProductInventoryTable
              items={getFilteredItems()}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </TabsContent>

          <TabsContent value="sales" className="space-y-6 mt-6">
            <ProductInventoryTable
              items={getFilteredItems()}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </TabsContent>

          <TabsContent value="treatment" className="space-y-6 mt-6">
            <ProductInventoryTable
              items={getFilteredItems()}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </TabsContent>

          <TabsContent value="consumables" className="space-y-6 mt-6">
            <ProductInventoryTable
              items={getFilteredItems()}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </TabsContent>
        </Tabs>

        <StickyOrderButton onOpenCart={() => setCartOpen(true)} />
        <OrderCartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </OrderCartProvider>
  );
}