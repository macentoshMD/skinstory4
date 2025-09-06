import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, DollarSign, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { NoShowData } from '@/types/economy';
import { mockNoShowData } from '@/data/mockEconomyData';

interface NoShowsEconomyTabProps {
  data?: NoShowData[];
}

export function NoShowsEconomyTab({ data = mockNoShowData }: NoShowsEconomyTabProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const formatCurrency = (amount: number) => `${amount.toLocaleString()} kr`;
  const formatDate = (date: Date) => date.toLocaleDateString('sv-SE');

  // Filter data based on status
  const filteredData = statusFilter === 'all' 
    ? data 
    : data.filter(item => item.status === statusFilter);

  // Calculate statistics
  const stats = data.reduce(
    (acc, noShow) => ({
      totalValue: acc.totalValue + noShow.treatmentValue,
      totalBilled: acc.totalBilled + (noShow.billedAmount || 0),
      totalCount: acc.totalCount + 1,
      billedCount: acc.billedCount + (noShow.status === 'billed' ? 1 : 0),
      waivedCount: acc.waivedCount + (noShow.status === 'waived' ? 1 : 0),
      pendingCount: acc.pendingCount + (noShow.status === 'pending' ? 1 : 0),
      paidCount: acc.paidCount + (noShow.paid ? 1 : 0),
    }),
    { totalValue: 0, totalBilled: 0, totalCount: 0, billedCount: 0, waivedCount: 0, pendingCount: 0, paidCount: 0 }
  );

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'billed': 'bg-blue-100 text-blue-800',
      'waived': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons: { [key: string]: JSX.Element } = {
      'billed': <DollarSign className="h-4 w-4" />,
      'waived': <XCircle className="h-4 w-4" />,
      'pending': <Clock className="h-4 w-4" />,
    };
    return icons[status] || <AlertTriangle className="h-4 w-4" />;
  };

  const handleUpdateStatus = (id: string, newStatus: 'billed' | 'waived' | 'pending') => {
    // In a real application, this would update the data via an API call
    console.log(`Updating no-show ${id} to status ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totalt värde</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(stats.totalValue)}</div>
            <p className="text-xs text-muted-foreground">Förlorad omsättning</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Debiterat</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(stats.totalBilled)}</div>
            <p className="text-xs text-muted-foreground">
              {stats.billedCount} av {stats.totalCount} fall ({((stats.billedCount / stats.totalCount) * 100).toFixed(1)}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Väntar åtgärd</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pendingCount}</div>
            <p className="text-xs text-muted-foreground">Kräver beslut</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Betalda avgifter</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.paidCount}</div>
            <p className="text-xs text-muted-foreground">
              {stats.paidCount > 0 ? ((stats.paidCount / stats.billedCount) * 100).toFixed(1) : 0}% betalningsgrad
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Actions */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>No-shows och uteblivna behandlingar</CardTitle>
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrera efter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla</SelectItem>
                  <SelectItem value="pending">Väntar åtgärd</SelectItem>
                  <SelectItem value="billed">Debiterade</SelectItem>
                  <SelectItem value="waived">Undantag</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datum</TableHead>
                <TableHead>Kund</TableHead>
                <TableHead>Behandling</TableHead>
                <TableHead>Behandlingsvärde</TableHead>
                <TableHead>Personal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Debiterat belopp</TableHead>
                <TableHead>Faktura skickad</TableHead>
                <TableHead>Betald</TableHead>
                <TableHead>Åtgärd</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((noShow) => (
                <TableRow key={noShow.id}>
                  <TableCell>{formatDate(noShow.date)}</TableCell>
                  <TableCell className="font-medium">{noShow.customerName}</TableCell>
                  <TableCell>{noShow.treatmentName}</TableCell>
                  <TableCell className="font-medium text-red-600">
                    {formatCurrency(noShow.treatmentValue)}
                  </TableCell>
                  <TableCell>{noShow.staffMember}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(noShow.status)}
                      <Badge className={getStatusColor(noShow.status)}>
                        {noShow.status === 'billed' ? 'Debiterad' : 
                         noShow.status === 'waived' ? 'Undantag' : 'Väntar'}
                      </Badge>
                    </div>
                    {noShow.reason && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {noShow.reason}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {noShow.billedAmount ? (
                      <span className="font-medium text-blue-600">
                        {formatCurrency(noShow.billedAmount)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={noShow.invoiceSent ? 'default' : 'secondary'}>
                      {noShow.invoiceSent ? 'Ja' : 'Nej'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={noShow.paid ? 'default' : 'secondary'}>
                      {noShow.paid ? 'Ja' : 'Nej'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {noShow.status === 'pending' ? (
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUpdateStatus(noShow.id, 'billed')}
                        >
                          Debitera
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUpdateStatus(noShow.id, 'waived')}
                        >
                          Undantag
                        </Button>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary by Staff Member */}
      <Card>
        <CardHeader>
          <CardTitle>No-shows per personal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from(new Set(data.map(ns => ns.staffMember))).map(staffMember => {
              const staffNoShows = data.filter(ns => ns.staffMember === staffMember);
              const staffStats = staffNoShows.reduce(
                (acc, ns) => ({
                  count: acc.count + 1,
                  value: acc.value + ns.treatmentValue,
                  billed: acc.billed + (ns.billedAmount || 0),
                }),
                { count: 0, value: 0, billed: 0 }
              );

              return (
                <div key={staffMember} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{staffMember}</p>
                    <p className="text-sm text-muted-foreground">{staffStats.count} no-shows</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">{formatCurrency(staffStats.value)}</p>
                    <p className="text-sm text-muted-foreground">
                      Debiterat: {formatCurrency(staffStats.billed)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}