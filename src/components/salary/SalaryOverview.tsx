import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, 
  Clock, 
  TrendingUp, 
  Award,
  Calendar,
  DollarSign
} from "lucide-react";
import { SalaryData } from "@/types/salary";

interface SalaryOverviewProps {
  salaryData: SalaryData;
}

export function SalaryOverview({ salaryData }: SalaryOverviewProps) {
  const formatCurrency = (amount: number) => `${amount.toLocaleString()} kr`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Löneöversikt</h1>
          <p className="text-muted-foreground">
            {salaryData.period.monthName}
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          Nettolön: {formatCurrency(salaryData.net.total)}
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bruttolön</p>
                <p className="text-xl font-semibold">{formatCurrency(salaryData.gross.total)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Arbetstimmar</p>
                <p className="text-xl font-semibold">{salaryData.baseSalary.regularHours + salaryData.baseSalary.weekendHours + salaryData.baseSalary.overtimeHours}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Provision</p>
                <p className="text-xl font-semibold">{formatCurrency(salaryData.commission.total)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Award className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bonusar</p>
                <p className="text-xl font-semibold">{formatCurrency(salaryData.bonuses.total)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Work Hours Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Arbetstimmar Fördelning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Vardagar</span>
                <div className="text-right">
                  <span className="font-semibold">{salaryData.baseSalary.regularHours}h</span>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(salaryData.baseSalary.regularPay)}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Helger</span>
                <div className="text-right">
                  <span className="font-semibold">{salaryData.baseSalary.weekendHours}h</span>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(salaryData.baseSalary.weekendPay)}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Övertid</span>
                <div className="text-right">
                  <span className="font-semibold">{salaryData.baseSalary.overtimeHours}h</span>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(salaryData.baseSalary.overtimePay)}
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex justify-between items-center font-semibold">
                <span>Total grundlön</span>
                <span>{formatCurrency(salaryData.baseSalary.totalHourlyPay)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gross Salary Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Bruttolön Fördelning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Grundlön</span>
                <span className="font-semibold">{formatCurrency(salaryData.gross.breakdown.basePay)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Provision</span>
                <span className="font-semibold">{formatCurrency(salaryData.gross.breakdown.commission)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Bonusar</span>
                <span className="font-semibold">{formatCurrency(salaryData.gross.breakdown.bonuses)}</span>
              </div>
              <hr />
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Bruttolön</span>
                <span>{formatCurrency(salaryData.gross.total)}</span>
              </div>
              <hr />
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Skatt ({Math.round((salaryData.deductions.tax / salaryData.gross.total) * 100)}%)</span>
                  <span>-{formatCurrency(salaryData.deductions.tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sociala avgifter ({Math.round((salaryData.deductions.socialSecurity / salaryData.gross.total) * 100)}%)</span>
                  <span>-{formatCurrency(salaryData.deductions.socialSecurity)}</span>
                </div>
              </div>
              <hr />
              <div className="flex justify-between items-center font-semibold text-lg text-green-600">
                <span>Nettolön</span>
                <span>{formatCurrency(salaryData.net.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}