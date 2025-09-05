import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Stethoscope, 
  Package, 
  ShoppingCart,
  TrendingUp
} from "lucide-react";
import { SalaryData, CommissionEntry } from "@/types/salary";
import { format } from "date-fns";
import { sv } from "date-fns/locale";

interface CommissionBreakdownProps {
  salaryData: SalaryData;
  commissionEntries: CommissionEntry[];
}

export function CommissionBreakdown({ salaryData, commissionEntries }: CommissionBreakdownProps) {
  const formatCurrency = (amount: number) => `${amount.toLocaleString()} kr`;

  const getTypeIcon = (type: CommissionEntry['type']) => {
    switch (type) {
      case 'treatment':
        return <Stethoscope className="h-4 w-4" />;
      case 'product':
        return <Package className="h-4 w-4" />;
      case 'online':
        return <ShoppingCart className="h-4 w-4" />;
    }
  };

  const getTypeBadgeColor = (type: CommissionEntry['type']) => {
    switch (type) {
      case 'treatment':
        return 'default';
      case 'product':
        return 'secondary';
      case 'online':
        return 'outline';
    }
  };

  const getTypeLabel = (type: CommissionEntry['type']) => {
    switch (type) {
      case 'treatment':
        return 'Behandling';
      case 'product':
        return 'Produkt';
      case 'online':
        return 'Online';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Provisionsfördelning</h2>

      {/* Commission Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Stethoscope className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Behandlingar</p>
                <p className="text-lg font-semibold">{formatCurrency(salaryData.commission.treatments.amount * (salaryData.commission.treatments.rate / 100))}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {salaryData.commission.treatments.rate}%
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {salaryData.commission.treatments.count} st
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Produktförsäljning</p>
                <p className="text-lg font-semibold">{formatCurrency(salaryData.commission.products.amount * (salaryData.commission.products.rate / 100))}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {salaryData.commission.products.rate}%
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {salaryData.commission.products.count} st
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Online-försäljning</p>
                <p className="text-lg font-semibold">{formatCurrency(salaryData.commission.online.amount * (salaryData.commission.online.rate / 100))}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {salaryData.commission.online.rate}%
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {salaryData.commission.online.count} st
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Total Commission */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Total Provision
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(salaryData.commission.total)}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Baserat på {salaryData.commission.treatments.count + salaryData.commission.products.count + salaryData.commission.online.count} transaktioner
          </p>
        </CardContent>
      </Card>

      {/* Commission Entries Table */}
      <Card>
        <CardHeader>
          <CardTitle>Provisionshistorik</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {commissionEntries.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Inga provisionstransaktioner för denna period
              </p>
            ) : (
              commissionEntries.slice(0, 10).map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-muted rounded">
                      {getTypeIcon(entry.type)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{entry.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getTypeBadgeColor(entry.type)} className="text-xs">
                          {getTypeLabel(entry.type)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(entry.date, 'd MMM', { locale: sv })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {formatCurrency(entry.commission)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {entry.rate}% av {formatCurrency(entry.baseAmount)}
                    </p>
                  </div>
                </div>
              ))
            )}
            {commissionEntries.length > 10 && (
              <div className="text-center pt-4">
                <Badge variant="outline">
                  +{commissionEntries.length - 10} fler transaktioner
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}