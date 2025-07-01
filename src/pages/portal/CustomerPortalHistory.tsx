import { CustomerPortalLayout } from '@/components/portal/CustomerPortalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Calendar, 
  Clock, 
  User,
  Package,
  RefreshCw,
  ShoppingCart
} from 'lucide-react';

const CustomerPortalHistory = () => {
  // Mock historical activity data
  const historyData = [
    {
      id: 1,
      type: 'booking',
      date: '2024-07-01',
      time: '14:00',
      title: 'LED-ljusterapi',
      therapist: 'Maria Svensson',
      location: 'Östermalm',
      status: 'completed',
      price: 1200
    },
    {
      id: 2,
      type: 'order',
      date: '2024-06-28',
      title: 'Skincare Kit - Acne Premium',
      status: 'delivered',
      price: 2499,
      items: 3
    },
    {
      id: 3,
      type: 'booking',
      date: '2024-06-24',
      time: '15:30',
      title: 'Kemisk peeling',
      therapist: 'Anna Nilsson',
      location: 'Östermalm',
      status: 'completed',
      price: 1800
    },
    {
      id: 4,
      type: 'booking',
      date: '2024-06-20',
      time: '13:00',
      title: 'LED-ljusterapi',
      therapist: 'Maria Svensson',
      location: 'Östermalm',
      status: 'no_show',
      price: 1200
    },
    {
      id: 5,
      type: 'order',
      date: '2024-06-15',
      title: 'Vitamin C Serum',
      status: 'delivered',
      price: 899,
      items: 1
    },
    {
      id: 6,
      type: 'booking',
      date: '2024-06-10',
      time: '11:00',
      title: 'Hudkonsultation',
      therapist: 'Maria Svensson',
      location: 'Östermalm',
      status: 'completed',
      price: 0
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string, type: string) => {
    if (type === 'booking') {
      switch (status) {
        case 'completed':
          return <Badge variant="secondary" className="bg-green-100 text-green-800">Genomförd</Badge>;
        case 'cancelled':
          return <Badge variant="secondary" className="bg-red-100 text-red-800">Avbokad</Badge>;
        case 'no_show':
          return <Badge variant="secondary" className="bg-orange-100 text-orange-800">NoShow</Badge>;
        case 'rescheduled':
          return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Ombokad</Badge>;
        default:
          return <Badge variant="secondary">{status}</Badge>;
      }
    } else {
      switch (status) {
        case 'delivered':
          return <Badge variant="secondary" className="bg-green-100 text-green-800">Levererad</Badge>;
        case 'shipped':
          return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Skickad</Badge>;
        case 'processing':
          return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Behandlas</Badge>;
        default:
          return <Badge variant="secondary">{status}</Badge>;
      }
    }
  };

  return (
    <CustomerPortalLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Historik</h1>
            <p className="text-muted-foreground mt-2">Dina bokningar och beställningar</p>
          </div>
        </div>

        {/* Historical Activity Table */}
        <Card>
          <CardHeader>
            <CardTitle>Aktivitetshistorik</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Typ</TableHead>
                  <TableHead>Datum</TableHead>
                  <TableHead>Beskrivning</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pris</TableHead>
                  <TableHead>Åtgärd</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {item.type === 'booking' ? (
                          <Calendar className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Package className="h-4 w-4 text-green-600" />
                        )}
                        <span className="capitalize">
                          {item.type === 'booking' ? 'Bokning' : 'Beställning'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{formatDate(item.date)}</div>
                        {item.time && (
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.time}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.title}</div>
                        {item.therapist && (
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {item.therapist}
                          </div>
                        )}
                        {item.location && (
                          <div className="text-sm text-muted-foreground">{item.location}</div>
                        )}
                        {item.items && (
                          <div className="text-sm text-muted-foreground">{item.items} produkter</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(item.status, item.type)}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {item.price > 0 ? `${item.price.toLocaleString('sv-SE')} kr` : 'Gratis'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {item.type === 'booking' ? (
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <RefreshCw className="h-3 w-3" />
                            Boka igen
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <ShoppingCart className="h-3 w-3" />
                            Köp igen
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalHistory;