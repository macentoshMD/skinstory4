import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, Activity, DollarSign, TrendingUp, Zap } from 'lucide-react';
import { TreatmentEconomyData } from '@/types/economy';
import { mockTreatmentEconomyData } from '@/data/mockEconomyData';

interface TreatmentEconomyTabProps {
  data?: TreatmentEconomyData[];
}

export function TreatmentEconomyTab({ data = mockTreatmentEconomyData }: TreatmentEconomyTabProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (treatmentId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(treatmentId)) {
      newExpanded.delete(treatmentId);
    } else {
      newExpanded.add(treatmentId);
    }
    setExpandedRows(newExpanded);
  };

  const formatCurrency = (amount: number) => `${amount.toLocaleString()} kr`;

  // Calculate totals
  const totals = data.reduce(
    (acc, treatment) => ({
      totalRevenue: acc.totalRevenue + treatment.statistics.totalRevenue,
      totalCosts: acc.totalCosts + treatment.costs.totalCosts,
      totalSessions: acc.totalSessions + treatment.statistics.sessionsCount,
      totalProfit: acc.totalProfit + treatment.profitability.grossProfit,
    }),
    { totalRevenue: 0, totalCosts: 0, totalSessions: 0, totalProfit: 0 }
  );

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Laser': 'bg-red-100 text-red-800',
      'Microneedling': 'bg-blue-100 text-blue-800',
      'Ansiktsbehandling': 'bg-green-100 text-green-800',
      'Peeling': 'bg-purple-100 text-purple-800',
      'Konsultation': 'bg-gray-100 text-gray-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total omsättning</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totals.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">Från alla behandlingar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totala kostnader</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totals.totalCosts)}</div>
            <p className="text-xs text-muted-foreground">Material och utrustning</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Behandlingar</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.totalSessions}</div>
            <p className="text-xs text-muted-foreground">Genomförda behandlingar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bruttovinst</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(totals.totalProfit)}</div>
            <p className="text-xs text-muted-foreground">
              {totals.totalRevenue > 0 ? ((totals.totalProfit / totals.totalRevenue) * 100).toFixed(1) : 0}% marginal
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Treatment Table */}
      <Card>
        <CardHeader>
          <CardTitle>Behandlingsmetoder och lönsamhet</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Behandling</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Sessioner</TableHead>
                <TableHead>Omsättning</TableHead>
                <TableHead>Kostnader</TableHead>
                <TableHead>Vinst</TableHead>
                <TableHead>Marginal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((treatment) => (
                <>
                  <TableRow 
                    key={treatment.treatmentId} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleRow(treatment.treatmentId)}
                  >
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        {expandedRows.has(treatment.treatmentId) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>
                        <div>{treatment.treatmentName}</div>
                        {treatment.equipment && (
                          <div className="text-xs text-muted-foreground">{treatment.equipment}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(treatment.category)}>
                        {treatment.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{treatment.statistics.sessionsCount}</TableCell>
                    <TableCell className="font-medium text-green-600">
                      {formatCurrency(treatment.statistics.totalRevenue)}
                    </TableCell>
                    <TableCell className="font-medium text-red-600">
                      {formatCurrency(treatment.costs.totalCosts)}
                    </TableCell>
                    <TableCell className="font-medium text-blue-600">
                      {formatCurrency(treatment.profitability.grossProfit)}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={treatment.profitability.profitMargin > 40 ? 'default' : treatment.profitability.profitMargin > 25 ? 'secondary' : 'destructive'}
                      >
                        {treatment.profitability.profitMargin.toFixed(1)}%
                      </Badge>
                    </TableCell>
                  </TableRow>

                  {expandedRows.has(treatment.treatmentId) && (
                    <TableRow>
                      <TableCell colSpan={8} className="bg-muted/20 p-0">
                        <div className="p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Statistics Detail */}
                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Behandlingsstatistik</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Genomsnittspris:</span>
                                  <span className="font-medium">{formatCurrency(treatment.statistics.averagePrice)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Antal sessioner:</span>
                                  <span className="font-medium">{treatment.statistics.sessionsCount}</span>
                                </div>
                                {treatment.equipment && (
                                  <div className="flex justify-between text-sm">
                                    <span>Utrustning:</span>
                                    <span className="font-medium">{treatment.equipment}</span>
                                  </div>
                                )}
                                {treatment.brand && (
                                  <div className="flex justify-between text-sm">
                                    <span>Varumärke:</span>
                                    <span className="font-medium">{treatment.brand}</span>
                                  </div>
                                )}
                              </CardContent>
                            </Card>

                            {/* Cost Breakdown */}
                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Kostnadsfördelning</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Material:</span>
                                  <span className="font-medium">{formatCurrency(treatment.costs.materials)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Utrustning:</span>
                                  <span className="font-medium">{formatCurrency(treatment.costs.equipment)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Arbetstid:</span>
                                  <span className="font-medium">{formatCurrency(treatment.costs.labor)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium border-t pt-2">
                                  <span>Totalt:</span>
                                  <span>{formatCurrency(treatment.costs.totalCosts)}</span>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Profitability Analysis */}
                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Lönsamhetsanalys</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Omsättning:</span>
                                  <span className="font-medium text-green-600">{formatCurrency(treatment.statistics.totalRevenue)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Kostnader:</span>
                                  <span className="font-medium text-red-600">-{formatCurrency(treatment.costs.totalCosts)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium border-t pt-2">
                                  <span>Bruttovinst:</span>
                                  <span className="text-blue-600">{formatCurrency(treatment.profitability.grossProfit)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium">
                                  <span>Marginal:</span>
                                  <span className="text-blue-600">{treatment.profitability.profitMargin.toFixed(1)}%</span>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}