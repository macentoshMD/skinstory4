
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, ShoppingCart, Users, Sparkles, Search, Download, AlertCircle } from "lucide-react";
import { DateRangeFilter, DateRange } from '@/components/DateRangeFilter';
import { Button } from '@/components/ui/button';
import { ExtendedActivityLog, ACTIVITY_CATEGORIES, ACTIVITY_TYPES } from '@/types/activity';
import { generateExtendedMockActivities } from '@/utils/mockActivityGenerator';

const ActivityLog = () => {
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
    label: 'Idag'
  });
  
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [actorFilter, setActorFilter] = useState<string>('all');
  const [importantOnly, setImportantOnly] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const activities = generateExtendedMockActivities(currentDateRange);

  const filteredActivities = activities.filter(activity => {
    const matchesCategory = categoryFilter === 'all' || activity.category === categoryFilter;
    const matchesActor = actorFilter === 'all' || activity.actor.type === actorFilter;
    const matchesImportant = !importantOnly || activity.is_important;
    const matchesSearch = searchTerm === '' || 
      activity.actor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ACTIVITY_TYPES[activity.activity_type].label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (activity.target && activity.target.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesActor && matchesImportant && matchesSearch;
  });

  const getActivityIcon = (category: string) => {
    switch (category) {
      case 'bokningar': return <Calendar className="h-4 w-4" />;
      case 'beställningar': return <ShoppingCart className="h-4 w-4" />;
      case 'kunder': return <Users className="h-4 w-4" />;
      case 'ekonomi': return <Sparkles className="h-4 w-4" />;
      case 'personal': return <Users className="h-4 w-4" />;
      case 'system': return <AlertCircle className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getActorColor = (actorType: string) => {
    switch (actorType) {
      case 'employee': return 'bg-blue-100 text-blue-800';
      case 'customer': return 'bg-green-100 text-green-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActorLabel = (actorType: string) => {
    switch (actorType) {
      case 'employee': return 'Personal';
      case 'customer': return 'Kund';
      case 'system': return 'System';
      default: return actorType;
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
          <p className="text-gray-600 mt-2">Omfattande spårning av alla systemaktiviteter</p>
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Totala aktiviteter</p>
                <p className="text-2xl font-bold">{activities.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Viktiga händelser</p>
                <p className="text-2xl font-bold text-red-600">{activities.filter(a => a.is_important).length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Kund-aktiviteter</p>
                <p className="text-2xl font-bold text-green-600">{activities.filter(a => a.actor.type === 'customer').length}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Personal-aktiviteter</p>
                <p className="text-2xl font-bold text-blue-600">{activities.filter(a => a.actor.type === 'employee').length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Kategori</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla kategorier</SelectItem>
                  {Object.entries(ACTIVITY_CATEGORIES).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Aktör</label>
              <Select value={actorFilter} onValueChange={setActorFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla aktörer</SelectItem>
                  <SelectItem value="employee">Personal</SelectItem>
                  <SelectItem value="customer">Kunder</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Prioritet</label>
              <Select value={importantOnly ? 'important' : 'all'} onValueChange={(value) => setImportantOnly(value === 'important')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla</SelectItem>
                  <SelectItem value="important">Endast viktiga</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Sök</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Sök på aktör, aktivitet eller beskrivning..."
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
                <TableHead>Kategori</TableHead>
                <TableHead>Aktivitet</TableHead>
                <TableHead>Aktör</TableHead>
                <TableHead>Mål</TableHead>
                <TableHead>Klinik</TableHead>
                <TableHead className="text-right">Belopp</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.map((activity) => (
                <TableRow key={activity.id} className={activity.is_important ? 'bg-red-50' : ''}>
                  <TableCell className="font-mono text-sm">
                    {activity.timestamp.toLocaleDateString('sv-SE')} {activity.timestamp.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
                    {activity.is_important && <AlertCircle className="h-3 w-3 text-red-500 inline ml-2" />}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getActivityIcon(activity.category)}
                      <span className="text-sm">{ACTIVITY_CATEGORIES[activity.category]}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{ACTIVITY_TYPES[activity.activity_type].icon}</span>
                      <span className="text-sm">{ACTIVITY_TYPES[activity.activity_type].label}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={getActorColor(activity.actor.type)}>
                        {getActorLabel(activity.actor.type)}
                      </Badge>
                      <div className="text-sm text-gray-600">{activity.actor.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {activity.target ? (
                      <div className="text-sm">
                        <div className="font-medium">{activity.target.name}</div>
                        <div className="text-gray-500 capitalize">{activity.target.type}</div>
                      </div>
                    ) : '-'}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {activity.metadata.location || '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {activity.details.amount_cents ? 
                      `${(activity.details.amount_cents / 100).toLocaleString('sv-SE')} kr` : '-'}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${activity.metadata.source === 'system' ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'}`}>
                      {activity.metadata.source.replace('_', ' ')}
                    </Badge>
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
