import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, ShoppingCart, Users, Sparkles, Search, Download } from "lucide-react";
import { DateRangeFilter, DateRange } from '@/components/DateRangeFilter';
import { Button } from '@/components/ui/button';

export interface ActivityLog {
  id: string;
  type: 'booking' | 'order' | 'customer' | 'treatment';
  subtype: 'created' | 'updated' | 'cancelled' | 'completed';
  timestamp: Date;
  customer: string;
  staff?: string;
  description: string;
  amount?: number;
  status: string;
  metadata: Record<string, any>;
}

// Mock data generator
const generateMockActivities = (dateRange: DateRange): ActivityLog[] => {
  const activities: ActivityLog[] = [];
  const customers = ['Anna Andersson', 'Erik Johansson', 'Maria Larsson', 'Johan Petersson', 'Lisa Svensson'];
  const staff = ['Lisa S.', 'Anna N.', 'Maria L.'];
  const treatments = ['HydraFacial', 'Microneedling', 'Chemical Peeling', 'Ansiktsbehandling'];
  const products = ['Hudkräm', 'Serum', 'Rengöring', 'Peeling'];

  const daysDiff = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const activityCount = Math.max(10, daysDiff * 3);

  for (let i = 0; i < activityCount; i++) {
    const randomDate = new Date(dateRange.from.getTime() + Math.random() * (dateRange.to.getTime() - dateRange.from.getTime()));
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const staffMember = staff[Math.floor(Math.random() * staff.length)];
    
    const activityTypes = [
      {
        type: 'booking' as const,
        subtype: (['created', 'updated', 'cancelled', 'completed'] as const)[Math.floor(Math.random() * 4)],
        description: `Bokning ${treatments[Math.floor(Math.random() * treatments.length)]}`,
        amount: 800 + Math.floor(Math.random() * 1200),
        status: ['Bekräftad', 'Genomförd', 'Avbokad'][Math.floor(Math.random() * 3)]
      },
      {
        type: 'order' as const,
        subtype: (['created', 'completed'] as const)[Math.floor(Math.random() * 2)],
        description: `Beställning ${products[Math.floor(Math.random() * products.length)]}`,
        amount: 200 + Math.floor(Math.random() * 800),
        status: ['Beställd', 'Levererad', 'Behandlas'][Math.floor(Math.random() * 3)]
      },
      {
        type: 'customer' as const,
        subtype: (['created', 'updated'] as const)[Math.floor(Math.random() * 2)],
        description: 'Ny kund registrerad',
        status: 'Aktiv'
      },
      {
        type: 'treatment' as const,
        subtype: (['created', 'updated'] as const)[Math.floor(Math.random() * 2)],
        description: `Behandling ${treatments[Math.floor(Math.random() * treatments.length)]} uppdaterad`,
        status: 'Tillgänglig'
      }
    ];

    const activity = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    
    activities.push({
      id: `activity-${i}`,
      type: activity.type,
      subtype: activity.subtype,
      timestamp: randomDate,
      customer,
      staff: activity.type === 'booking' ? staffMember : undefined,
      description: activity.description,
      amount: activity.amount,
      status: activity.status,
      metadata: {}
    });
  }

  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

const ActivityLog = () => {
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
    label: 'Idag'
  });
  
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const activities = generateMockActivities(currentDateRange);

  const filteredActivities = activities.filter(activity => {
    const matchesType = typeFilter === 'all' || activity.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      activity.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (activity.staff && activity.staff.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesType && matchesStatus && matchesSearch;
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Calendar className="h-4 w-4" />;
      case 'order': return <ShoppingCart className="h-4 w-4" />;
      case 'customer': return <Users className="h-4 w-4" />;
      case 'treatment': return <Sparkles className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'bekräftad':
      case 'aktiv':
      case 'tillgänglig':
        return 'bg-green-100 text-green-800';
      case 'genomförd':
      case 'levererad':
        return 'bg-blue-100 text-blue-800';
      case 'avbokad':
        return 'bg-red-100 text-red-800';
      case 'behandlas':
      case 'beställd':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'booking': return 'Bokning';
      case 'order': return 'Beställning';
      case 'customer': return 'Kund';
      case 'treatment': return 'Behandling';
      default: return type;
    }
  };

  const handleDateRangeChange = (newRange: DateRange) => {
    setCurrentDateRange(newRange);
  };

  const handleExport = () => {
    console.log('Exporterar aktiviteter...', filteredActivities);
    // Implementation for CSV export would go here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Aktivitetslogg</h1>
          <p className="text-gray-600 mt-2">Översikt över alla systemaktiviteter</p>
        </div>
        <Button onClick={handleExport} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportera
        </Button>
      </div>

      {/* Date Range Filter */}
      <DateRangeFilter 
        currentRange={currentDateRange}
        onDateRangeChange={handleDateRangeChange}
      />

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Aktivitetstyp</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla</SelectItem>
                  <SelectItem value="booking">Bokningar</SelectItem>
                  <SelectItem value="order">Beställningar</SelectItem>
                  <SelectItem value="customer">Kunder</SelectItem>
                  <SelectItem value="treatment">Behandlingar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla</SelectItem>
                  <SelectItem value="Bekräftad">Bekräftad</SelectItem>
                  <SelectItem value="Genomförd">Genomförd</SelectItem>
                  <SelectItem value="Avbokad">Avbokad</SelectItem>
                  <SelectItem value="Beställd">Beställd</SelectItem>
                  <SelectItem value="Levererad">Levererad</SelectItem>
                  <SelectItem value="Aktiv">Aktiv</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Sök</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Sök på kund, personal eller beskrivning..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Visar {filteredActivities.length} av {activities.length} aktiviteter
        </p>
      </div>

      {/* Activity Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tid</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Beskrivning</TableHead>
                <TableHead>Kund</TableHead>
                <TableHead>Personal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Belopp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-mono text-sm">
                    {activity.timestamp.toLocaleDateString('sv-SE')} {activity.timestamp.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getActivityIcon(activity.type)}
                      <span className="text-sm">{getTypeLabel(activity.type)}</span>
                    </div>
                  </TableCell>
                  <TableCell>{activity.description}</TableCell>
                  <TableCell>{activity.customer}</TableCell>
                  <TableCell>{activity.staff || '-'}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {activity.amount ? `${activity.amount.toLocaleString('sv-SE')} kr` : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLog;
