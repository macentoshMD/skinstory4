import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesProductsTab } from "@/components/products/SalesProductsTab";
import { TreatmentProductsTab } from "@/components/products/TreatmentProductsTab";
import { ConsumablesTab } from "@/components/products/ConsumablesTab";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Produktadministration</h1>
        <p className="text-muted-foreground">
          Hantera försäljningsprodukter, behandlingsprodukter och förbrukningsmaterial
        </p>
      </div>

      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sales">Försäljning</TabsTrigger>
          <TabsTrigger value="treatment">Behandling</TabsTrigger>
          <TabsTrigger value="consumables">Förbrukning</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          <SalesProductsTab searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </TabsContent>

        <TabsContent value="treatment" className="space-y-6">
          <TreatmentProductsTab searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </TabsContent>

        <TabsContent value="consumables" className="space-y-6">
          <ConsumablesTab searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </TabsContent>
      </Tabs>
    </div>
  );
}