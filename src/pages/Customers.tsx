import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";

// Mock customer data
const mockCustomers = [{
  id: 1,
  name: "Anna Andersson",
  company: "TechFlow AB",
  email: "anna@techflow.se",
  phone: "+46 70 123 4567",
  status: "Aktiv",
  lastActivity: "2024-06-27",
  value: "125 000 kr"
}, {
  id: 2,
  name: "Erik Johansson",
  company: "Design Studio Nordic",
  email: "erik@dsn.se",
  phone: "+46 70 234 5678",
  status: "Potentiell",
  lastActivity: "2024-06-25",
  value: "85 000 kr"
}, {
  id: 3,
  name: "Maria Larsson",
  company: "Green Energy Solutions",
  email: "maria@greenenergy.se",
  phone: "+46 70 345 6789",
  status: "Aktiv",
  lastActivity: "2024-06-28",
  value: "250 000 kr"
}, {
  id: 4,
  name: "Johan Petersson",
  company: "StartupHub",
  email: "johan@startuphub.se",
  phone: "+46 70 456 7890",
  status: "Inaktiv",
  lastActivity: "2024-06-20",
  value: "45 000 kr"
}];
const Customers = () => {
  const [customers] = useState(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    personnummer: "",
    name: "",
    company: "",
    email: "",
    phone: ""
  });
  const filteredCustomers = customers.filter(customer => customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || customer.company.toLowerCase().includes(searchTerm.toLowerCase()) || customer.email.toLowerCase().includes(searchTerm.toLowerCase()));
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktiv":
        return "text-green-600 bg-green-100";
      case "Potentiell":
        return "text-yellow-600 bg-yellow-100";
      case "Inaktiv":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };
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
    const foundPerson = mockPersonData[newCustomer.personnummer];
    if (foundPerson) {
      setNewCustomer(prev => ({
        ...prev,
        ...foundPerson
      }));
    } else {
      // Visa att ingen information hittades (i en riktig app skulle detta vara en toast)
      console.log("Ingen information hittades för detta personnummer");
    }
  };
  const handleInputChange = (field: string, value: string) => {
    setNewCustomer(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kunder</h1>
          <p className="text-gray-600 mt-2">Hantera dina kunder och kundrelationer</p>
        </div>
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
                <Input placeholder="Personnummer (YYYYMMDD-XXXX)" value={newCustomer.personnummer} onChange={e => handleInputChange("personnummer", e.target.value)} className="flex-1" />
                <Button variant="outline" onClick={handlePersonnummerSearch} className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Sök
                </Button>
              </div>
              <Input placeholder="Namn" value={newCustomer.name} onChange={e => handleInputChange("name", e.target.value)} />
              
              <Input placeholder="E-post" value={newCustomer.email} onChange={e => handleInputChange("e-post", e.target.value)} />
              <Input placeholder="Telefon" value={newCustomer.phone} onChange={e => handleInputChange("phone", e.target.value)} />
            </div>
            <Button className="w-full">Skapa kund</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Totalt kunder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{customers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Aktiva kunder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {customers.filter(c => c.status === "Aktiv").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Potentiella</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {customers.filter(c => c.status === "Potentiell").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total värde</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">505 000 kr</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Kundlista</CardTitle>
              <CardDescription>Alla dina kunder på ett ställe</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Sök kunder..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Namn</TableHead>
                
                <TableHead>E-post</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Värde</TableHead>
                <TableHead>Senaste aktivitet</TableHead>
                <TableHead>Åtgärder</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map(customer => <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </TableCell>
                  <TableCell>{customer.value}</TableCell>
                  <TableCell>{customer.lastActivity}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(customer)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Kunddetaljer</DialogTitle>
                          </DialogHeader>
                          {selectedCustomer && <div className="space-y-4">
                              <div>
                                <label className="font-medium">Namn:</label>
                                <p>{selectedCustomer.name}</p>
                              </div>
                              <div>
                                <label className="font-medium">Företag:</label>
                                <p>{selectedCustomer.company}</p>
                              </div>
                              <div>
                                <label className="font-medium">E-post:</label>
                                <p>{selectedCustomer.email}</p>
                              </div>
                              <div>
                                <label className="font-medium">Telefon:</label>
                                <p>{selectedCustomer.phone}</p>
                              </div>
                              <div>
                                <label className="font-medium">Status:</label>
                                <p>{selectedCustomer.status}</p>
                              </div>
                            </div>}
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                    </div>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>;
};
export default Customers;