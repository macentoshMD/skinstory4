import { useState } from 'react';
import { CustomerPortalLayout } from '@/components/portal/CustomerPortalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Calendar, 
  Clock, 
  User,
  Package,
  RefreshCw,
  ShoppingCart,
  ChevronDown,
  ChevronRight,
  Building2,
  MapPin
} from 'lucide-react';

const CustomerPortalHistory = () => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setExpandedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

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
      price: 1200,
      company: 'AcneSpecialisten',
      clinic: 'Stockholm Östermalm',
      practitioner: {
        name: 'Maria Svensson',
        title: 'Hudterapeut',
        experience: '8 år',
        specialization: 'LED-terapi och anti-aging'
      },
      duration: '45 minuter',
      equipment: 'Omnilux LED Panel'
    },
    {
      id: 2,
      type: 'order',
      date: '2024-06-28',
      title: 'Skincare Kit - Acne Premium',
      status: 'delivered',
      price: 2499,
      items: 3,
      products: [
        { name: 'Acne Cleansing Gel', price: 899, status: 'delivered', quantity: 1 },
        { name: 'Spot Treatment Serum', price: 1200, status: 'delivered', quantity: 1 },
        { name: 'Oil-Free Moisturizer', price: 650, status: 'delivered', quantity: 1 }
      ],
      shippingAddress: 'Vasagatan 12, 111 20 Stockholm',
      trackingNumber: 'DHL123456789'
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
      price: 1800,
      company: 'AcneSpecialisten',
      clinic: 'Stockholm Östermalm',
      practitioner: {
        name: 'Anna Nilsson',
        title: 'Specialist Hudterapeut',
        experience: '12 år',
        specialization: 'Kemiska peelingar och aknebehandling'
      },
      duration: '60 minuter',
      equipment: 'Chemical Peel System Pro'
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
      price: 1200,
      company: 'AcneSpecialisten',
      clinic: 'Stockholm Östermalm',
      practitioner: {
        name: 'Maria Svensson',
        title: 'Hudterapeut',
        experience: '8 år',
        specialization: 'LED-terapi och anti-aging'
      },
      duration: '45 minuter',
      equipment: 'Omnilux LED Panel'
    },
    {
      id: 5,
      type: 'order',
      date: '2024-06-15',
      title: 'Vitamin C Serum',
      status: 'delivered',
      price: 899,
      items: 1,
      products: [
        { name: 'Vitamin C Brightening Serum', price: 899, status: 'delivered', quantity: 1 }
      ],
      shippingAddress: 'Vasagatan 12, 111 20 Stockholm',
      trackingNumber: 'DHL987654321'
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
      price: 0,
      company: 'AcneSpecialisten',
      clinic: 'Stockholm Östermalm',
      practitioner: {
        name: 'Maria Svensson',
        title: 'Hudterapeut',
        experience: '8 år',
        specialization: 'LED-terapi och anti-aging'
      },
      duration: '60 minuter',
      equipment: 'Huvud- och hudanalys'
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
                  <Collapsible key={item.id}>
                    <CollapsibleTrigger asChild>
                      <TableRow 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => toggleRow(item.id)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {expandedRows.includes(item.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
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
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <TableRow>
                        <TableCell colSpan={6} className="p-0">
                          <div className="p-6 bg-muted/20 border-t">
                            {item.type === 'booking' ? (
                              // Booking details
                              <div className="space-y-4">
                                <h4 className="font-semibold text-lg">Bokningsdetaljer</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <Building2 className="h-4 w-4 text-blue-600" />
                                      <span className="font-medium">Företag:</span>
                                      <span>{item.company}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <MapPin className="h-4 w-4 text-blue-600" />
                                      <span className="font-medium">Klinik:</span>
                                      <span>{item.clinic}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-4 w-4 text-blue-600" />
                                      <span className="font-medium">Varaktighet:</span>
                                      <span>{item.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Package className="h-4 w-4 text-blue-600" />
                                      <span className="font-medium">Utrustning:</span>
                                      <span>{item.equipment}</span>
                                    </div>
                                  </div>
                                  <div className="space-y-3">
                                    <h5 className="font-medium">Utövare information</h5>
                                    <div className="bg-white p-4 rounded-lg space-y-2">
                                      <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-green-600" />
                                        <span className="font-medium">{item.practitioner.name}</span>
                                      </div>
                                      <div className="text-sm text-muted-foreground space-y-1">
                                        <div>Titel: {item.practitioner.title}</div>
                                        <div>Erfarenhet: {item.practitioner.experience}</div>
                                        <div>Specialisering: {item.practitioner.specialization}</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              // Order details
                              <div className="space-y-4">
                                <h4 className="font-semibold text-lg">Beställningsdetaljer</h4>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                      <span className="font-medium">Leveransadress:</span>
                                      <p className="text-sm text-muted-foreground">{item.shippingAddress}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <span className="font-medium">Spårningsnummer:</span>
                                      <p className="text-sm text-muted-foreground">{item.trackingNumber}</p>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h5 className="font-medium mb-3">Produkter</h5>
                                    <div className="space-y-2">
                                      {item.products?.map((product, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                                          <div className="flex-1">
                                            <div className="font-medium">{product.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                              Antal: {product.quantity}
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-3">
                                            <Badge 
                                              variant="secondary" 
                                              className={product.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                                            >
                                              {product.status === 'delivered' ? 'Levererad' : 'Skickad'}
                                            </Badge>
                                            <span className="font-medium">{product.price} kr</span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    </CollapsibleContent>
                  </Collapsible>
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