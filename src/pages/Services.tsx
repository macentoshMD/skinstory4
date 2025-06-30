
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BaseServicesTab } from "@/components/services/BaseServicesTab";
import { EquipmentTab } from "@/components/services/EquipmentTab";
import { ProblemsTab } from "@/components/services/ProblemsTab";
import { AreasTab } from "@/components/services/AreasTab";
import { ContraindictionsTab } from "@/components/services/ContraindictionsTab";
import { ExamplesTab } from "@/components/services/ExamplesTab";

export default function Services() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tjänsteadministration</h1>
        <p className="text-muted-foreground">
          Hantera grundtjänster, utrustning, problem och behandlingsområden
        </p>
      </div>

      <Tabs defaultValue="base-services" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="base-services">Grundtjänster</TabsTrigger>
          <TabsTrigger value="equipment">Utrustning</TabsTrigger>
          <TabsTrigger value="problems">Problem</TabsTrigger>
          <TabsTrigger value="areas">Områden</TabsTrigger>
          <TabsTrigger value="contraindications">Kontraindikationer</TabsTrigger>
          <TabsTrigger value="examples">Exempel</TabsTrigger>
        </TabsList>

        <TabsContent value="base-services" className="space-y-6">
          <BaseServicesTab searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </TabsContent>

        <TabsContent value="equipment" className="space-y-6">
          <EquipmentTab searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </TabsContent>

        <TabsContent value="problems" className="space-y-6">
          <ProblemsTab searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </TabsContent>

        <TabsContent value="areas" className="space-y-6">
          <AreasTab searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </TabsContent>

        <TabsContent value="contraindications" className="space-y-6">
          <ContraindictionsTab searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <ExamplesTab searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
