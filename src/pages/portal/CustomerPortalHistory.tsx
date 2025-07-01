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
          return <Badge className="bg-green-50 text-green-700 border-green-200">Genomförd</Badge>;
        case 'cancelled':
          return <Badge className="bg-red-50 text-red-700 border-red-200">Avbokad</Badge>;
        case 'no_show':
          return <Badge className="bg-orange-50 text-orange-700 border-orange-200">NoShow</Badge>;
        case 'rescheduled':
          return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Ombokad</Badge>;
        default:
          return <Badge variant="outline">{status}</Badge>;
      }
    } else {
      switch (status) {
        case 'delivered':
          return <Badge className="bg-green-50 text-green-700 border-green-200">Levererad</Badge>;
        case 'shipped':
          return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Skickad</Badge>;
        case 'processing':
          return <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">Behandlas</Badge>;
        default:
          return <Badge variant="outline">{status}</Badge>;
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
            <div className="space-y-1">
              {historyData.map((item) => (
                <Collapsible key={item.id}>
                  <CollapsibleTrigger asChild>
                    <div 
                      className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors group"
                      onClick={() => toggleRow(item.id)}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          {expandedRows.includes(item.id) ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                          {item.type === 'booking' ? (
                            <div className="flex items-center gap-2 bg-blue-50 px-2 py-1 rounded">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-700">Bokning</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 bg-green-50 px-2 py-1 rounded">
                              <Package className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium text-green-700">Beställning</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-6 flex-1">
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-base">{item.title}</div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(item.date)}
                            </span>
                            {item.time && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {item.time}
                              </span>
                            )}
                            {item.therapist && (
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {item.therapist}
                              </span>
                            )}
                            {item.location && (
                              <span>{item.location}</span>
                            )}
                            {item.items && (
                              <span>{item.items} produkter</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {getStatusBadge(item.status, item.type)}
                          
                          <div className="text-right">
                            <div className="font-semibold text-lg">
                              {item.price > 0 ? `${item.price.toLocaleString('sv-SE')} kr` : 'Gratis'}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            {item.type === 'booking' ? (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <RefreshCw className="h-3 w-3" />
                                Boka igen
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <ShoppingCart className="h-3 w-3" />
                                Köp igen
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="animate-accordion-down">
                    <div className="px-4 pb-4">
                      <div className="p-6 bg-muted/30 rounded-lg border">
                        {item.type === 'booking' ? (
                          // Booking details
                          <div className="space-y-6">
                            <h4 className="font-semibold text-lg text-foreground">Bokningsdetaljer</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <Building2 className="h-5 w-5 text-blue-600 mt-0.5" />
                                  <div>
                                    <span className="font-medium text-foreground">Företag</span>
                                    <p className="text-muted-foreground">{item.company}</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                                  <div>
                                    <span className="font-medium text-foreground">Klinik</span>
                                    <p className="text-muted-foreground">{item.clinic}</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                                  <div>
                                    <span className="font-medium text-foreground">Varaktighet</span>
                                    <p className="text-muted-foreground">{item.duration}</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <Package className="h-5 w-5 text-blue-600 mt-0.5" />
                                  <div>
                                    <span className="font-medium text-foreground">Utrustning</span>
                                    <p className="text-muted-foreground">{item.equipment}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <h5 className="font-semibold text-foreground">Utövare information</h5>
                                <div className="bg-background p-4 rounded-lg border shadow-sm space-y-3">
                                  <div className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-green-600" />
                                    <span className="font-semibold text-foreground">{item.practitioner.name}</span>
                                  </div>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Titel:</span>
                                      <span className="font-medium">{item.practitioner.title}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Erfarenhet:</span>
                                      <span className="font-medium">{item.practitioner.experience}</span>
                                    </div>
                                    <div className="pt-2 border-t">
                                      <span className="text-muted-foreground text-xs">Specialisering:</span>
                                      <p className="text-sm font-medium mt-1">{item.practitioner.specialization}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          // Order details
                          <div className="space-y-6">
                            <h4 className="font-semibold text-lg text-foreground">Beställningsdetaljer</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              <div className="space-y-2">
                                <span className="font-medium text-foreground">Leveransadress</span>
                                <p className="text-sm text-muted-foreground bg-background p-3 rounded border">{item.shippingAddress}</p>
                              </div>
                              <div className="space-y-2">
                                <span className="font-medium text-foreground">Spårningsnummer</span>
                                <p className="text-sm text-muted-foreground bg-background p-3 rounded border font-mono">{item.trackingNumber}</p>
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="font-semibold text-foreground mb-4">Produkter</h5>
                              <div className="space-y-3">
                                {item.products?.map((product, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-4 bg-background rounded-lg border">
                                    <div className="flex-1">
                                      <div className="font-medium text-foreground">{product.name}</div>
                                      <div className="text-sm text-muted-foreground mt-1">
                                        Antal: {product.quantity}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <Badge 
                                        className={product.status === 'delivered' 
                                          ? 'bg-green-50 text-green-700 border-green-200' 
                                          : 'bg-blue-50 text-blue-700 border-blue-200'
                                        }
                                      >
                                        {product.status === 'delivered' ? 'Levererad' : 'Skickad'}
                                      </Badge>
                                      <span className="font-semibold text-lg">{product.price.toLocaleString('sv-SE')} kr</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalHistory;