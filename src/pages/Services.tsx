
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BaseServicesTab } from "@/components/services/BaseServicesTab";
import { EquipmentTab } from "@/components/services/EquipmentTab";
import { ProblemsTab } from "@/components/services/ProblemsTab";
import { AreasTab } from "@/components/services/AreasTab";
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="base-services">Grundtjänster</TabsTrigger>
          <TabsTrigger value="equipment">Utrustning</TabsTrigger>
          <TabsTrigger value="problems">Problem</TabsTrigger>
          <TabsTrigger value="areas">Områden</TabsTrigger>
          <TabsTrigger value="examples">Exempel</TabsTrigger>
        </TabsList>

        <TabsContent value="base-services">
          <BaseServicesTab searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </TabsContent>

        <TabsContent value="equipment">
          <EquipmentTab searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </TabsContent>

        <TabsContent value="problems">
          <ProblemsTab searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </TabsContent>

        <TabsContent value="areas">
          <AreasTab searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </TabsContent>

        <TabsContent value="examples">
          <ExamplesTab searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
