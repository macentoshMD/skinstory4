import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Building, Users, Calendar, Plus, FileText, Eye, Package, Settings } from "lucide-react";

// Mock financial data
const mockFinancialSummary = {
  monthlyRevenue: 234567,
  monthlyExpenses: 156890,
  profit: 77677,
  profitMargin: 33.2,
  outstandingInvoices: 45600,
  paidInvoices: 189000,
  monthlyGrowth: 15.3
};

const mockInvoices = [
  {
    id: "INV-2024-001",
    clientName: "Anna Karlsson",
    amount: 2500,
    status: "betald",
    dueDate: "2024-01-15",
    treatments: ["HydraFacial", "Chemical Peeling"],
    paymentDate: "2024-01-12"
  },
  {
    id: "INV-2024-002", 
    clientName: "Maria Andersson",
    amount: 1800,
    status: "väntar",
    dueDate: "2024-01-20",
    treatments: ["Microneedling"],
    paymentDate: null
  },
  {
    id: "INV-2024-003",
    clientName: "Erik Johansson", 
    amount: 3200,
    status: "försenad",
    dueDate: "2024-01-10",
    treatments: ["Laser behandling", "Konsultation"],
    paymentDate: null
  },
  {
    id: "INV-2024-004",
    clientName: "Lisa Svensson",
    amount: 1500,
    status: "betald",
    dueDate: "2024-01-18",
    treatments: ["Ansiktsbehandling"],
    paymentDate: "2024-01-17"
  }
];

const mockExpenses = [
  {
    id: "EXP-2024-001",
    category: "Produkter",
    description: "HydraFacial serums och lösningar",
    amount: 15600,
    date: "2024-01-15",
    supplier: "Beauty Supply AB",
    status: "betald"
  },
  {
    id: "EXP-2024-002",
    category: "Utrustning",
    description: "Laser utrustning service",
    amount: 8900,
    date: "2024-01-12",
    supplier: "MedTech Service",
    status: "betald"
  },
  {
    id: "EXP-2024-003",
    category: "Hyra",
    description: "Kliniklokal januari",
    amount: 25000,
    date: "2024-01-01",
    supplier: "Fastighets AB",
    status: "betald"
  },
  {
    id: "EXP-2024-004",
    category: "Förbrukningsmaterial",
    description: "Engångsartiklar och hygienartiklar",
    amount: 3400,
    date: "2024-01-20",
    supplier: "MedSupply Nordic",
    status: "väntar"
  }
];

const Economy = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      'betald': 'bg-green-100 text-green-800',
      'väntar': 'bg-yellow-100 text-yellow-800',
      'försenad': 'bg-red-100 text-red-800'
    };
    return variants[status] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: any } = {
      'Produkter': Package,
      'Utrustning': Settings,
      'Hyra': Building,
      'Förbrukningsmaterial': FileText
    };
    const IconComponent = icons[category] || FileText;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ekonomi</h1>
          <p className="text-gray-600 mt-2">Hantera intäkter, utgifter och fakturor</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Exportera rapport
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Ny faktura
          </Button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Månadsomsättning</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockFinancialSummary.monthlyRevenue.toLocaleString()} kr
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +{mockFinancialSummary.monthlyGrowth}% från förra månaden
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Månadskostnader</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockFinancialSummary.monthlyExpenses.toLocaleString()} kr
            </div>
            <p className="text-xs text-muted-foreground">Inkl. alla driftskostnader</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Månadsmarginal</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {mockFinancialSummary.profit.toLocaleString()} kr
            </div>
            <p className="text-xs text-muted-foreground">
              {mockFinancialSummary.profitMargin}% vinstmarginal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utestående fakturor</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {mockFinancialSummary.outstandingInvoices.toLocaleString()} kr
            </div>
            <p className="text-xs text-muted-foreground">Väntar på betalning</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Financial Management */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Översikt</TabsTrigger>
          <TabsTrigger value="invoices">Fakturor</TabsTrigger>
          <TabsTrigger value="expenses">Utgifter</TabsTrigger>
          <TabsTrigger value="reports">Rapporter</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Senaste fakturor</CardTitle>
                <CardDescription>De senast skapade fakturorna</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockInvoices.slice(0, 3).map((invoice) => (
                    <div key={invoice.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{invoice.clientName}</p>
                        <p className="text-sm text-gray-600">{invoice.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{invoice.amount.toLocaleString()} kr</p>
                        <Badge className={getStatusBadge(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Senaste utgifter</CardTitle>
                <CardDescription>De senaste registrerade utgifterna</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockExpenses.slice(0, 3).map((expense) => (
                    <div key={expense.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(expense.category)}
                        <div>
                          <p className="font-medium">{expense.description}</p>
                          <p className="text-sm text-gray-600">{expense.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{expense.amount.toLocaleString()} kr</p>
                        <Badge className={getStatusBadge(expense.status)}>
                          {expense.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Fakturor</CardTitle>
                  <CardDescription>Hantera alla fakturor och betalningar</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Ny faktura
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Faktura ID</TableHead>
                    <TableHead>Kund</TableHead>
                    <TableHead>Behandlingar</TableHead>
                    <TableHead>Belopp</TableHead>
                    <TableHead>Förfallodatum</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.clientName}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {invoice.treatments.map((treatment, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {treatment}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {invoice.amount.toLocaleString()} kr
                      </TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Utgifter</CardTitle>
                  <CardDescription>Hantera alla klinikens utgifter och kostnader</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Ny utgift
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Beskrivning</TableHead>
                    <TableHead>Leverantör</TableHead>
                    <TableHead>Belopp</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(expense.category)}
                          <span>{expense.category}</span>
                        </div>
                      </TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{expense.supplier}</TableCell>
                      <TableCell className="font-medium">
                        {expense.amount.toLocaleString()} kr
                      </TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(expense.status)}>
                          {expense.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Månadsrapporter</CardTitle>
                <CardDescription>Generera detaljerade månadsrapporter</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Intäktsrapport januari 2024
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Utgiftsrapport januari 2024
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Vinstmarginalsrapport januari 2024
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skatteunderlag</CardTitle>
                <CardDescription>Rapporter för skattedeklaration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Moms rapport Q1 2024
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Årlig sammanställning 2023
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Avdragsgilla kostnader 2023
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Economy;