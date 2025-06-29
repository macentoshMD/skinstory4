
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { 
  Calendar, ShoppingCart, Users, Sparkles, Search, Download, AlertCircle,
  TrendingUp, Star, Phone, MessageCircle, Heart, Filter
} from "lucide-react";
import { DateRangeFilter, DateRange } from '@/components/DateRangeFilter';
import { ExtendedActivityLog, ACTIVITY_CATEGORIES, ACTIVITY_TYPES } from '@/types/activity';
import { generateExtendedMockActivities, generateTodayStats } from '@/utils/mockActivityGenerator';

const ActivityLog = () => {
  const [currentDateRange, setCurrentDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
    label: 'Idag'
  });
  
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const activities = generateExtendedMockActivities(currentDateRange);
  const todayStats = generateTodayStats(activities);

  const filteredActivities = activities.filter(activity => {
    const matchesCategory = categoryFilter === 'all' || activity.category === categoryFilter;
    const matchesPriority = priorityFilter === 'all' || ACTIVITY_TYPES[activity.activity_type].priority === priorityFilter;
    const matchesCompany = companyFilter === 'all' || activity.metadata.company === companyFilter;
    const matchesSearch = searchTerm === '' || 
      activity.actor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ACTIVITY_TYPES[activity.activity_type].label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (activity.target && activity.target.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesPriority && matchesCompany && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bokningar': return <Calendar className="h-4 w-4" />;
      case 'beställningar': return <ShoppingCart className="h-4 w-4" />;
      case 'kunder': return <Users className="h-4 w-4" />;
      case 'ekonomi': return <Sparkles className="h-4 w-4" />;
      case 'specialist': return <Star className="h-4 w-4" />;
      case 'behandlingar': return <Heart className="h-4 w-4" />;
      case 'rekommendationer': return <TrendingUp className="h-4 w-4" />;
      case 'support': return <MessageCircle className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDateRangeChange = (newRange: DateRange) => {
    setCurrentDateRange(newRange);
  };

  const handleExport = () => {
    console.log('Exporterar aktiviteter...', filteredActivities);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SkinStory - Aktivitetslogg</h1>
          <p className="text-gray-600 text-sm">MVP Dashboard för affärskritisk verksamhetsövervakning</p>
        </div>
        <Button onClick={handleExport} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Exportera
        </Button>
      </div>

      {/* Date Range Filter */}
      <DateRangeFilter 
        currentRange={currentDateRange}
        onDateRangeChange={handleDateRangeChange}
      />

      {/* Quick Overview for Today */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5" />
            Snabböversikt Idag
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 text-sm">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">{todayStats.bookingsCreated}</div>
              <div className="text-gray-600 text-xs">bokningar skapade</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">{todayStats.treatmentsCompleted}</div>
              <div className="text-gray-600 text-xs">behandlingar genomförda</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-600">{todayStats.coursesStarted}</div>
              <div className="text-gray-600 text-xs">kurpaket sålda</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-emerald-600">{(todayStats.totalRevenue / 100).toLocaleString('sv-SE')}</div>
              <div className="text-gray-600 text-xs">kr intjänat</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-red-600">{todayStats.complaints}</div>
              <div className="text-gray-600 text-xs">klagomål mottagna</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-orange-600">{todayStats.noShows}</div>
              <div className="text-gray-600 text-xs">NoShow</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compact Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-4 w-4" />
            Filter
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alla kategorier</SelectItem>
                {Object.entries(ACTIVITY_CATEGORIES).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Prioritet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alla prioriteter</SelectItem>
                <SelectItem value="high">Hög</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Låg</SelectItem>
              </SelectContent>
            </Select>

            <Select value={companyFilter} onValueChange={setCompanyFilter}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Företag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alla företag</SelectItem>
                <SelectItem value="AcneSpecialisten">AcneSpecialisten</SelectItem>
                <SelectItem value="DAHL">DAHL</SelectItem>
                <SelectItem value="Sveriges Skönhetscenter">Sveriges Skönhetscenter</SelectItem>
              </SelectContent>
            </Select>

            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Sök aktiviteter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-9"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Visar {filteredActivities.length} av {activities.length} aktiviteter</span>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertCircle className="h-5 w-5" />
            Aktivitetsflöde
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="text-xs">
                <TableHead className="w-24">Tid</TableHead>
                <TableHead className="w-32">Kategori</TableHead>
                <TableHead>Aktivitet</TableHead>
                <TableHead className="w-32">Aktör</TableHead>
                <TableHead className="w-32">Företag/Klinik</TableHead>
                <TableHead className="w-24">Specialist</TableHead>
                <TableHead className="w-24 text-right">Belopp</TableHead>
                <TableHead className="w-20">Prioritet</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.slice(0, 50).map((activity) => (
                <TableRow 
                  key={activity.id} 
                  className={`text-sm ${activity.is_important ? 'bg-red-50 border-l-4 border-l-red-500' : ''}`}
                >
                  <TableCell className="font-mono text-xs">
                    <div className="flex items-center gap-1">
                      {activity.timestamp.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
                      {activity.is_important && <AlertCircle className="h-3 w-3 text-red-500" />}
                    </div>
                    <div className="text-xs text-gray-500">
                      {activity.timestamp.toLocaleDateString('sv-SE', { month: 'short', day: 'numeric' })}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(activity.category)}
                      <span className="text-xs font-medium">{ACTIVITY_CATEGORIES[activity.category]}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-base">{ACTIVITY_TYPES[activity.activity_type].icon}</span>
                      <div>
                        <div className="text-sm font-medium">{ACTIVITY_TYPES[activity.activity_type].label}</div>
                        {activity.target && (
                          <div className="text-xs text-gray-500 truncate max-w-40">{activity.target.name}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-xs">
                      <div className="font-medium truncate">{activity.actor.name}</div>
                      <div className="text-gray-500 capitalize">{activity.actor.type}</div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-xs">
                    <div className="font-medium">{activity.metadata.company}</div>
                    <div className="text-gray-500">{activity.metadata.clinic}</div>
                  </TableCell>
                  
                  <TableCell className="text-xs text-gray-600">
                    {activity.metadata.specialist || '-'}
                  </TableCell>
                  
                  <TableCell className="text-right text-xs">
                    {activity.details.amount_cents ? 
                      `${(activity.details.amount_cents / 100).toLocaleString('sv-SE')} kr` : '-'}
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={`text-xs ${getPriorityColor(ACTIVITY_TYPES[activity.activity_type].priority)}`}>
                      {ACTIVITY_TYPES[activity.activity_type].priority === 'high' ? 'Hög' :
                       ACTIVITY_TYPES[activity.activity_type].priority === 'medium' ? 'Med' : 'Låg'}
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
