import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, Users, Clock, TrendingUp, DollarSign } from 'lucide-react';
import { EmployeeEconomyData } from '@/types/economy';
import { mockEmployeeEconomyData } from '@/data/mockEconomyData';

interface EmployeeEconomyTabProps {
  data?: EmployeeEconomyData[];
}

export function EmployeeEconomyTab({ data = mockEmployeeEconomyData }: EmployeeEconomyTabProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (employeeId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(employeeId)) {
      newExpanded.delete(employeeId);
    } else {
      newExpanded.add(employeeId);
    }
    setExpandedRows(newExpanded);
  };

  const formatCurrency = (amount: number) => `${amount.toLocaleString()} kr`;
  const formatHours = (hours: number) => `${hours.toFixed(1)}h`;

  // Calculate totals
  const totals = data.reduce(
    (acc, emp) => ({
      totalRevenue: acc.totalRevenue + emp.sales.totalRevenue,
      totalCosts: acc.totalCosts + emp.costs.totalCost,
      totalHours: acc.totalHours + emp.workHours.totalHours,
      totalContribution: acc.totalContribution + emp.profitability.contribution,
    }),
    { totalRevenue: 0, totalCosts: 0, totalHours: 0, totalContribution: 0 }
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totala intäkter</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totals.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">Från alla anställda</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totala kostnader</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totals.totalCosts)}</div>
            <p className="text-xs text-muted-foreground">Löner och förmåner</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Arbetstimmar</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatHours(totals.totalHours)}</div>
            <p className="text-xs text-muted-foreground">Total arbetstid</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nettobidrag</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(totals.totalContribution)}</div>
            <p className="text-xs text-muted-foreground">
              {totals.totalRevenue > 0 ? ((totals.totalContribution / totals.totalRevenue) * 100).toFixed(1) : 0}% marginal
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Employee Table */}
      <Card>
        <CardHeader>
          <CardTitle>Anställdas ekonomiska prestanda</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Anställd</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Arbetstimmar</TableHead>
                <TableHead>Försäljning</TableHead>
                <TableHead>Kostnader</TableHead>
                <TableHead>Bidrag</TableHead>
                <TableHead>Marginal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((employee) => (
                <>
                  <TableRow 
                    key={employee.employeeId} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleRow(employee.employeeId)}
                  >
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        {expandedRows.has(employee.employeeId) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{employee.employeeName}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{formatHours(employee.workHours.totalHours)}</TableCell>
                    <TableCell className="font-medium text-green-600">
                      {formatCurrency(employee.sales.totalRevenue)}
                    </TableCell>
                    <TableCell className="font-medium text-red-600">
                      {formatCurrency(employee.costs.totalCost)}
                    </TableCell>
                    <TableCell className="font-medium text-blue-600">
                      {formatCurrency(employee.profitability.contribution)}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={employee.profitability.margin > 30 ? 'default' : employee.profitability.margin > 20 ? 'secondary' : 'destructive'}
                      >
                        {employee.profitability.margin.toFixed(1)}%
                      </Badge>
                    </TableCell>
                  </TableRow>

                  {expandedRows.has(employee.employeeId) && (
                    <TableRow>
                      <TableCell colSpan={8} className="bg-muted/20 p-0">
                        <div className="p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Work Hours Detail */}
                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Arbetstidsfördelning</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Vardagar:</span>
                                  <span>{formatHours(employee.workHours.regularHours)} ({employee.workHours.workDays} dagar)</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Helger:</span>
                                  <span>{formatHours(employee.workHours.weekendHours)} ({employee.workHours.weekendDays} dagar)</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Övertid:</span>
                                  <span>{formatHours(employee.workHours.overtimeHours)}</span>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Sales Detail */}
                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Försäljningsfördelning</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Behandlingar:</span>
                                  <span>{formatCurrency(employee.sales.treatments.revenue)} ({employee.sales.treatments.count} st)</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Produkter:</span>
                                  <span>{formatCurrency(employee.sales.products.revenue)} ({employee.sales.products.count} st)</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Online:</span>
                                  <span>{formatCurrency(employee.sales.online.revenue)} ({employee.sales.online.count} st)</span>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Cost Detail */}
                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Kostnadsfördelning</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Grundlön:</span>
                                  <span>{formatCurrency(employee.costs.salary)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Förmåner:</span>
                                  <span>{formatCurrency(employee.costs.benefits)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Provision:</span>
                                  <span>{formatCurrency(employee.costs.commission)}</span>
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