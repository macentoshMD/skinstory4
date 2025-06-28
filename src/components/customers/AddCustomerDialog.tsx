
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus } from "lucide-react";

export function AddCustomerDialog() {
  const [newCustomer, setNewCustomer] = useState({
    personnummer: "",
    name: "",
    company: "",
    email: "",
    phone: ""
  });

  const handlePersonnummerSearch = () => {
    // Mock data för personnummer-sökning
    const mockPersonData = {
      "19850315-1234": {
        name: "Lisa Svensson",
        company: "Svensson Consulting AB",
        email: "lisa@svenssonconsulting.se",
        phone: "+46 70 555 1234"
      },
      "19780920-5678": {
        name: "Anders Nilsson",
        company: "Nilsson Tech Solutions",
        email: "anders@nilssontech.se",
        phone: "+46 70 555 5678"
      }
    };

    const foundPerson = mockPersonData[newCustomer.personnummer as keyof typeof mockPersonData];
    if (foundPerson) {
      setNewCustomer(prev => ({
        ...prev,
        ...foundPerson
      }));
    } else {
      console.log("Ingen information hittades för detta personnummer");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewCustomer(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Lägg till kund
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lägg till ny kund</DialogTitle>
          <DialogDescription>
            Skapa en ny kund i systemet. Detta är en mockup - ingen data sparas.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex gap-2">
            <Input
              placeholder="Personnummer (YYYYMMDD-XXXX)"
              value={newCustomer.personnummer}
              onChange={e => handleInputChange("personnummer", e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" onClick={handlePersonnummerSearch} className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Sök
            </Button>
          </div>
          <Input
            placeholder="Namn"
            value={newCustomer.name}
            onChange={e => handleInputChange("name", e.target.value)}
          />
          <Input
            placeholder="E-post"
            value={newCustomer.email}
            onChange={e => handleInputChange("email", e.target.value)}
          />
          <Input
            placeholder="Telefon"
            value={newCustomer.phone}
            onChange={e => handleInputChange("phone", e.target.value)}
          />
        </div>
        <Button className="w-full">Skapa kund</Button>
      </DialogContent>
    </Dialog>
  );
}
