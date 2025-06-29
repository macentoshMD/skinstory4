
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { 
  Calendar, ShoppingCart, Users, Sparkles, Search, Download, AlertCircle,
  TrendingUp, Star, Phone, MessageCircle, Heart
} from "lucide-react";
import { DateRangeFilter, DateRange } from '@/components/DateRangeFilter';
import { ExtendedActivityLog, ACTIVITY_CATEGORIES, ACTIVITY_TYPES, QUICK_FILTERS } from '@/types/activity';
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
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);

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
    
    // Quick filter logic
    if (activeQuickFilter && QUICK_FILTERS[activeQuickFilter as keyof typeof QUICK_FILTERS]) {
      const quickFilter = QUICK_FILTERS[activeQuickFilter as keyof typeof QUICK_FILTERS];
      if (quickFilter.category && activity.category !== quickFilter.category) return false;
      if (quickFilter.types && !quickFilter.types.includes(activity.activity_type)) return false;
      if (quickFilter.priority && ACTIVITY_TYPES[activity.activity_type].priority !== quickFilter.priority) return false;
    }
    
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

  const handleQuickFilter = (filterKey: string) => {
    if (activeQuickFilter === filterKey) {
      setActiveQuickFilter(null);
    } else {
      setActiveQuickFilter(filterKey);
      // Reset other filters when using quick filter
      setCategoryFilter('all');
      setPriorityFilter('all');
    }
  };

  const handleExport = () => {
    console.log('Exporterar aktiviteter...', filteredActivities);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SkinStory - Aktivitetslogg</h1>
          <p className="text-gray-600 mt-2">MVP Dashboard för affärskritisk verksamhetsövervakning</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportera
          </Button>
        </div>
      </div>

      {/* Date Range Filter */}
      <DateRangeFilter 
        currentRange={currentDateRange}
        onDateRangeChange={handleDateRangeChange}
      />

      {/* Quick Overview for Today */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Snabböversikt Idag
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{todayStats.bookingsCreated}</div>
              <div className="text-gray-600">bokningar skapade</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{todayStats.treatmentsCompleted}</div>
              <div className="text-gray-600">behandlingar genomförda</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{todayStats.coursesStarted}</div>
              <div className="text-gray-600">kurpaket sålda</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{(todayStats.totalRevenue / 100).toLocaleString('sv-SE')}</div>
              <div className="text-gray-600">kr intjänat</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{todayStats.complaints}</div>
              <div className="text-gray-600">klagomål mottagna</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{todayStats.noShows}</div>
              <div className="text-gray-600">NoShow</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Snabbfilter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(QUICK_FILTERS).map(([key, filter]) => (
              <Button
                key={key}
                variant={activeQuickFilter === key ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickFilter(key)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Avancerade filter</CardTitle>
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
              <label className="text-sm font-medium">Prioritet</label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla prioriteter</SelectItem>
                  <SelectItem value="high">Hög</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Låg</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Företag</label>
              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla företag</SelectItem>
                  <SelectItem value="AcneSpecialisten">AcneSpecialisten</SelectItem>
                  <SelectItem value="DAHL">DAHL</SelectItem>
                  <SelectItem value="Sveriges Skönhetscenter">Sveriges Skönhetscenter</SelectItem>
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
          {activeQuickFilter && (
            <span className="ml-2 text-blue-600">
              (Filter: {QUICK_FILTERS[activeQuickFilter as keyof typeof QUICK_FILTERS].label})
            </span>
          )}
        </p>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Aktivitetsflöde
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tid</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Aktivitet</TableHead>
                <TableHead>Aktör</TableHead>
                <TableHead>Företag/Klinik</TableHead>
                <TableHead>Specialist</TableHead>
                <TableHead className="text-right">Belopp</TableHead>
                <TableHead>Prioritet</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.slice(0, 50).map((activity) => (
                <TableRow 
                  key={activity.id} 
                  className={activity.is_important ? 'bg-red-50 border-l-4 border-l-red-500' : ''}
                >
                  <TableCell className="font-mono text-sm">
                    <div className="flex items-center gap-2">
                      {activity.timestamp.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
                      {activity.is_important && <AlertCircle className="h-3 w-3 text-red-500" />}
                    </div>
                    <div className="text-xs text-gray-500">
                      {activity.timestamp.toLocaleDateString('sv-SE')}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(activity.category)}
                      <span className="text-sm font-medium">{ACTIVITY_CATEGORIES[activity.category]}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{ACTIVITY_TYPES[activity.activity_type].icon}</span>
                      <div>
                        <div className="text-sm font-medium">{ACTIVITY_TYPES[activity.activity_type].label}</div>
                        {activity.target && (
                          <div className="text-xs text-gray-500">{activity.target.name}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{activity.actor.name}</div>
                      <div className="text-gray-500 capitalize">{activity.actor.type}</div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-sm">
                    <div className="font-medium">{activity.metadata.company}</div>
                    <div className="text-gray-500">{activity.metadata.clinic}</div>
                  </TableCell>
                  
                  <TableCell className="text-sm text-gray-600">
                    {activity.metadata.specialist || '-'}
                  </TableCell>
                  
                  <TableCell className="text-right">
                    {activity.details.amount_cents ? 
                      `${(activity.details.amount_cents / 100).toLocaleString('sv-SE')} kr` : '-'}
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={getPriorityColor(ACTIVITY_TYPES[activity.activity_type].priority)}>
                      {ACTIVITY_TYPES[activity.activity_type].priority === 'high' ? 'Hög' :
                       ACTIVITY_TYPES[activity.activity_type].priority === 'medium' ? 'Medium' : 'Låg'}
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
