
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plus, Search, Clock } from "lucide-react";

// Mock booking data
const mockBookings = [
  {
    id: 1,
    customer: "Anna Andersson",
    treatment: "HydraFacial Classic",
    staff: "Lisa Svensson",
    date: "2024-06-28",
    time: "09:00",
    duration: 60,
    status: "Bekräftad",
    price: "1 500 kr"
  },
  {
    id: 2,
    customer: "Erik Johansson",
    treatment: "Microneedling Ansikte",
    staff: "Maria Larsson",
    date: "2024-06-28",
    time: "10:30",
    duration: 90,
    status: "Väntande",
    price: "1 800 kr"
  },
  {
    id: 3,
    customer: "Maria Larsson",
    treatment: "Chemical Peeling Mild",
    staff: "Anna Nilsson",
    date: "2024-06-28",
    time: "14:00",
    duration: 45,
    status: "Genomförd",
    price: "1 200 kr"
  },
  {
    id: 4,
    customer: "Johan Petersson",
    treatment: "Konsultation",
    staff: "Lisa Svensson",
    date: "2024-06-29",
    time: "11:00",
    duration: 30,
    status: "Bekräftad",
    price: "500 kr"
  }
];

const Bookings = () => {
  const [bookings] = useState(mockBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Alla");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Bekräftad":
        return "bg-green-100 text-green-800";
      case "Väntande":
        return "bg-yellow-100 text-yellow-800";
      case "Genomförd":
        return "bg-blue-100 text-blue-800";
      case "Inställd":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.treatment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Alla" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const todayBookings = bookings.filter(booking => booking.date === "2024-06-28").length;
  const confirmedBookings = bookings.filter(booking => booking.status === "Bekräftad").length;
  const totalRevenue = bookings.reduce((sum, booking) => {
    const price = parseInt(booking.price.replace(/\s/g, '').replace('kr', ''));
    return sum + price;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bokningar</h1>
          <p className="text-gray-600 mt-2">Hantera kundernas bokningar och tidsschema</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Ny bokning
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Skapa ny bokning</DialogTitle>
              <DialogDescription>
                Boka en ny tid för en kund
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Välj kund" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anna">Anna Andersson</SelectItem>
                  <SelectItem value="erik">Erik Johansson</SelectItem>
                  <SelectItem value="maria">Maria Larsson</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Välj behandling" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hydrafacial">HydraFacial Classic</SelectItem>
                  <SelectItem value="microneedling">Microneedling Ansikte</SelectItem>
                  <SelectItem value="peeling">Chemical Peeling Mild</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Välj personal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lisa">Lisa Svensson</SelectItem>
                  <SelectItem value="maria">Maria Larsson</SelectItem>
                  <SelectItem value="anna">Anna Nilsson</SelectItem>
                </SelectContent>
              </Select>
              
              <Input type="date" />
              <Input type="time" />
            </div>
            <Button className="w-full">Skapa bokning</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Idag</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{todayBookings}</div>
            <p className="text-xs text-muted-foreground">bokningar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekräftade</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{confirmedBookings}</div>
            <p className="text-xs text-muted-foreground">av {bookings.length} totalt</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intäkter</CardTitle>
            <div className="text-green-600">kr</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{totalRevenue.toLocaleString()} kr</div>
            <p className="text-xs text-muted-foreground">denna period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Genomsnitt</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">75</div>
            <p className="text-xs text-muted-foreground">minuter per behandling</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Bokningslista</CardTitle>
              <CardDescription>Alla bokningar och tider</CardDescription>
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alla">Alla status</SelectItem>
                  <SelectItem value="Bekräftad">Bekräftad</SelectItem>
                  <SelectItem value="Väntande">Väntande</SelectItem>
                  <SelectItem value="Genomförd">Genomförd</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Sök bokningar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kund</TableHead>
                <TableHead>Behandling</TableHead>
                <TableHead>Personal</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Tid</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pris</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.customer}</TableCell>
                  <TableCell>{booking.treatment}</TableCell>
                  <TableCell>{booking.staff}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.time}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{booking.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bookings;
