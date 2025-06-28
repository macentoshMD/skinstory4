
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Eye, Edit, Building2, MapPin, ChevronDown, ChevronRight } from "lucide-react";

// Mock company data with clinics
const mockCompanies = [
  {
    id: 1,
    name: "Skin & Beauty AB",
    orgNumber: "556789-1234",
    email: "info@skinbeauty.se",
    phone: "+46 8 123 4567",
    status: "Aktiv",
    subscription: "Premium",
    createdDate: "2024-01-15",
    clinics: [
      {
        id: 101,
        name: "Skin & Beauty Södermalm",
        address: "Götgatan 45, 118 26 Stockholm",
        phone: "+46 8 123 4567",
        email: "sodermalm@skinbeauty.se",
        specializations: ["Ansiktsbehandlingar", "Laser", "Botox"],
        treatmentRooms: 3,
        staff: 5
      },
      {
        id: 102,
        name: "Skin & Beauty Östermalm",
        address: "Stureplan 8, 114 35 Stockholm",
        phone: "+46 8 123 4568",
        email: "ostermalm@skinbeauty.se",
        specializations: ["Ansiktsbehandlingar", "Fillers", "Kemisk peeling"],
        treatmentRooms: 4,
        staff: 7
      }
    ]
  },
  {
    id: 2,
    name: "Nordic Aesthetics Group",
    orgNumber: "556890-2345",
    email: "kontakt@nordicaesthetics.se",
    phone: "+46 31 234 5678",
    status: "Aktiv",
    subscription: "Enterprise",
    createdDate: "2023-11-20",
    clinics: [
      {
        id: 201,
        name: "Nordic Aesthetics Göteborg",
        address: "Avenyn 12, 411 36 Göteborg",
        phone: "+46 31 234 5678",
        email: "goteborg@nordicaesthetics.se",
        specializations: ["Laser", "IPL", "Coolsculpting"],
        treatmentRooms: 5,
        staff: 8
      }
    ]
  },
  {
    id: 3,
    name: "Beauty Studio Malmö",
    orgNumber: "556901-3456",
    email: "info@beautystudiomalmo.se",
    phone: "+46 40 345 6789",
    status: "Ofullständig",
    subscription: "Basic",
    createdDate: "2024-06-10",
    clinics: [
      {
        id: 301,
        name: "Beauty Studio Malmö Centrum",
        address: "Södergatan 25, 211 34 Malmö",
        phone: "+46 40 345 6789",
        email: "centrum@beautystudiomalmo.se",
        specializations: ["Ansiktsbehandlingar", "Massage"],
        treatmentRooms: 2,
        staff: 3
      }
    ]
  }
];

const Companies = () => {
  const [companies] = useState(mockCompanies);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCompanies, setExpandedCompanies] = useState<number[]>([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [newCompany, setNewCompany] = useState({
    orgNumber: "",
    name: "",
    email: "",
    phone: "",
    city: ""
  });
  const [newClinic, setNewClinic] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    specializations: "",
    treatmentRooms: 1,
    staff: 1
  });

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.orgNumber.includes(searchTerm.toLowerCase()) ||
    company.clinics.some(clinic => 
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktiv":
        return "text-green-600 bg-green-100";
      case "Ofullständig":
        return "text-yellow-600 bg-yellow-100";
      case "Inaktiv":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case "Enterprise":
        return "text-purple-600 bg-purple-100";
      case "Premium":
        return "text-blue-600 bg-blue-100";
      case "Basic":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const toggleCompanyExpansion = (companyId: number) => {
    setExpandedCompanies(prev => 
      prev.includes(companyId) 
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleOrgNumberSearch = () => {
    const mockOrgData = {
      "556123-4567": {
        name: "Hudvård Stockholm AB",
        email: "info@hudvardstockholm.se",
        phone: "+46 8 555 1234"
      },
      "556234-5678": {
        name: "Skönhetskliniken Syd AB",
        email: "kontakt@skonhetskliniken.se",
        phone: "+46 40 555 5678"
      }
    };

    const foundCompany = mockOrgData[newCompany.orgNumber];
    if (foundCompany) {
      setNewCompany(prev => ({
        ...prev,
        ...foundCompany
      }));
    } else {
      console.log("Ingen information hittades för detta organisationsnummer");
    }
  };

  const handleCompanyInputChange = (field: string, value: string) => {
    setNewCompany(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClinicInputChange = (field: string, value: string | number) => {
    setNewClinic(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const totalClinics = companies.reduce((sum, company) => sum + company.clinics.length, 0);
  const activeCompanies = companies.filter(c => c.status === "Aktiv").length;
  const totalTreatmentRooms = companies.reduce((sum, company) => 
    sum + company.clinics.reduce((clinicSum, clinic) => clinicSum + clinic.treatmentRooms, 0), 0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Företag</h1>
          <p className="text-gray-600 mt-2">Hantera företag och deras kliniker</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Lägg till företag
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Lägg till nytt företag</DialogTitle>
              <DialogDescription>
                Skapa ett nytt företag. Du kan lägga till kliniker senare.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Organisationsnummer (XXXXXX-XXXX)" 
                  value={newCompany.orgNumber}
                  onChange={e => handleCompanyInputChange("orgNumber", e.target.value)}
                  className="flex-1" 
                />
                <Button variant="outline" onClick={handleOrgNumberSearch} className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Sök
                </Button>
              </div>
              <Input 
                placeholder="Företagsnamn" 
                value={newCompany.name}
                onChange={e => handleCompanyInputChange("name", e.target.value)}
              />
              <Input 
                placeholder="E-post" 
                value={newCompany.email}
                onChange={e => handleCompanyInputChange("email", e.target.value)}
              />
              <Input 
                placeholder="Telefon" 
                value={newCompany.phone}
                onChange={e => handleCompanyInputChange("phone", e.target.value)}
              />
              <Input 
                placeholder="Stad" 
                value={newCompany.city}
                onChange={e => handleCompanyInputChange("city", e.target.value)}
              />
            </div>
            <Button className="w-full">Skapa företag</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Totalt företag</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{companies.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Aktiva företag</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeCompanies}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Totalt kliniker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{totalClinics}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Behandlingsrum</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{totalTreatmentRooms}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Företagslista</CardTitle>
              <CardDescription>Alla företag och deras kliniker</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Sök företag eller kliniker..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 w-64" 
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Företag/Klinik</TableHead>
                <TableHead>Kontakt</TableHead>
                <TableHead>Status/Abonnemang</TableHead>
                <TableHead>Kliniker</TableHead>
                <TableHead>Åtgärder</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map(company => (
                <>
                  <TableRow key={company.id} className="font-medium">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCompanyExpansion(company.id)}
                          className="p-0 h-auto"
                        >
                          {expandedCompanies.includes(company.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                        <Building2 className="h-4 w-4 text-blue-600" />
                        <div>
                          <div className="font-semibold">{company.name}</div>
                          <div className="text-sm text-gray-500">{company.orgNumber}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{company.email}</div>
                        <div className="text-sm text-gray-500">{company.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(company.status)}`}>
                          {company.status}
                        </span>
                        <div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubscriptionColor(company.subscription)}`}>
                            {company.subscription}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{company.clinics.length} klinik{company.clinics.length !== 1 ? 'er' : ''}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedCompany(company)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Företagsinformation</DialogTitle>
                            </DialogHeader>
                            {selectedCompany && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="font-medium">Företagsnamn:</label>
                                    <p>{selectedCompany.name}</p>
                                  </div>
                                  <div>
                                    <label className="font-medium">Organisationsnummer:</label>
                                    <p>{selectedCompany.orgNumber}</p>
                                  </div>
                                  <div>
                                    <label className="font-medium">E-post:</label>
                                    <p>{selectedCompany.email}</p>
                                  </div>
                                  <div>
                                    <label className="font-medium">Telefon:</label>
                                    <p>{selectedCompany.phone}</p>
                                  </div>
                                </div>
                                <div>
                                  <label className="font-medium">Kliniker ({selectedCompany.clinics.length}):</label>
                                  <div className="mt-2 space-y-2">
                                    {selectedCompany.clinics.map(clinic => (
                                      <div key={clinic.id} className="border rounded p-3">
                                        <div className="font-medium">{clinic.name}</div>
                                        <div className="text-sm text-gray-600">{clinic.address}</div>
                                        <div className="text-sm text-gray-600">
                                          {clinic.treatmentRooms} behandlingsrum, {clinic.staff} anställda
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-1" />
                              Klinik
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Lägg till klinik</DialogTitle>
                              <DialogDescription>
                                Lägg till en ny klinik under {company.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div>
                                <Label htmlFor="clinic-name">Kliniknamn</Label>
                                <Input 
                                  id="clinic-name"
                                  placeholder="t.ex. Skin & Beauty Södermalm" 
                                  value={newClinic.name}
                                  onChange={e => handleClinicInputChange("name", e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor="clinic-address">Adress</Label>
                                <Input 
                                  id="clinic-address"
                                  placeholder="Gatuadress, postnummer stad" 
                                  value={newClinic.address}
                                  onChange={e => handleClinicInputChange("address", e.target.value)}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="clinic-phone">Telefon</Label>
                                  <Input 
                                    id="clinic-phone"
                                    placeholder="+46 8 123 4567" 
                                    value={newClinic.phone}
                                    onChange={e => handleClinicInputChange("phone", e.target.value)}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="clinic-email">E-post</Label>
                                  <Input 
                                    id="clinic-email"
                                    placeholder="klinik@företag.se" 
                                    value={newClinic.email}
                                    onChange={e => handleClinicInputChange("email", e.target.value)}
                                  />
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="specializations">Specialiseringar</Label>
                                <Input 
                                  id="specializations"
                                  placeholder="Ansiktsbehandlingar, Laser, Botox (separera med komma)" 
                                  value={newClinic.specializations}
                                  onChange={e => handleClinicInputChange("specializations", e.target.value)}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="treatment-rooms">Behandlingsrum</Label>
                                  <Input 
                                    id="treatment-rooms"
                                    type="number" 
                                    min="1"
                                    value={newClinic.treatmentRooms}
                                    onChange={e => handleClinicInputChange("treatmentRooms", parseInt(e.target.value))}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="staff">Antal anställda</Label>
                                  <Input 
                                    id="staff"
                                    type="number" 
                                    min="1"
                                    value={newClinic.staff}
                                    onChange={e => handleClinicInputChange("staff", parseInt(e.target.value))}
                                  />
                                </div>
                              </div>
                            </div>
                            <Button className="w-full">Lägg till klinik</Button>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedCompanies.includes(company.id) && company.clinics.map(clinic => (
                    <TableRow key={`clinic-${clinic.id}`} className="bg-gray-50">
                      <TableCell className="pl-12">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <div>
                            <div className="font-medium">{clinic.name}</div>
                            <div className="text-sm text-gray-600">{clinic.address}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{clinic.email}</div>
                          <div className="text-sm text-gray-500">{clinic.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{clinic.specializations.join(", ")}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{clinic.treatmentRooms} rum</div>
                          <div>{clinic.staff} anställda</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedClinic(clinic)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Klinikdetaljer</DialogTitle>
                              </DialogHeader>
                              {selectedClinic && (
                                <div className="space-y-4">
                                  <div>
                                    <label className="font-medium">Kliniknamn:</label>
                                    <p>{selectedClinic.name}</p>
                                  </div>
                                  <div>
                                    <label className="font-medium">Adress:</label>
                                    <p>{selectedClinic.address}</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="font-medium">E-post:</label>
                                      <p>{selectedClinic.email}</p>
                                    </div>
                                    <div>
                                      <label className="font-medium">Telefon:</label>
                                      <p>{selectedClinic.phone}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="font-medium">Specialiseringar:</label>
                                    <p>{selectedClinic.specializations.join(", ")}</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="font-medium">Behandlingsrum:</label>
                                      <p>{selectedClinic.treatmentRooms}</p>
                                    </div>
                                    <div>
                                      <label className="font-medium">Anställda:</label>
                                      <p>{selectedClinic.staff}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Companies;
