import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Package, DollarSign, TrendingUp, ShoppingCart } from 'lucide-react';
import { ConsumableEconomyData } from '@/types/economy';

interface ConsumablesEconomyTabProps {
  data?: ConsumableEconomyData;
}

// Mock data for consumables
const mockConsumablesData: ConsumableEconomyData = {
  month: 'September 2025',
  purchases: [
    {
      categoryId: 'hygien',
      categoryName: 'Hygien',
      totalSpent: 23400,
      itemCount: 45,
      averageCost: 520,
      topSuppliers: [
        { supplier: 'MedSupply Nordic', amount: 15600, percentage: 66.7 },
        { supplier: 'Hygiene Pro AB', amount: 5200, percentage: 22.2 },
        { supplier: 'Clean Care Sverige', amount: 2600, percentage: 11.1 },
      ],
    },
    {
      categoryId: 'rengoring',
      categoryName: 'Rengöring',
      totalSpent: 8900,
      itemCount: 22,
      averageCost: 405,
      topSuppliers: [
        { supplier: 'Clean Solutions AB', amount: 5600, percentage: 62.9 },
        { supplier: 'Pro Clean Sverige', amount: 3300, percentage: 37.1 },
      ],
    },
    {
      categoryId: 'vardmaterial',
      categoryName: 'Vårdmaterial',
      totalSpent: 34200,
      itemCount: 68,
      averageCost: 503,
      topSuppliers: [
        { supplier: 'Medical Supply Co', amount: 18900, percentage: 55.3 },
        { supplier: 'Nordic Medical', amount: 9800, percentage: 28.7 },
        { supplier: 'Care Products AB', amount: 5500, percentage: 16.1 },
      ],
    },
    {
      categoryId: 'skyddsutrustning',
      categoryName: 'Skyddsutrustning',
      totalSpent: 12800,
      itemCount: 28,
      averageCost: 457,
      topSuppliers: [
        { supplier: 'Safety First AB', amount: 7600, percentage: 59.4 },
        { supplier: 'Protective Gear Co', amount: 5200, percentage: 40.6 },
      ],
    },
  ],
  totalPurchases: 79300,
};

export function ConsumablesEconomyTab({ data = mockConsumablesData }: ConsumablesEconomyTabProps) {
  const formatCurrency = (amount: number) => `${amount.toLocaleString()} kr`;

  const getCategoryColor = (categoryName: string) => {
    const colors: { [key: string]: string } = {
      'Hygien': 'bg-blue-100 text-blue-800',
      'Rengöring': 'bg-green-100 text-green-800',
      'Vårdmaterial': 'bg-purple-100 text-purple-800',
      'Skyddsutrustning': 'bg-orange-100 text-orange-800',
    };
    return colors[categoryName] || 'bg-gray-100 text-gray-800';
  };

  // Calculate average cost across all categories
  const totalItems = data.purchases.reduce((sum, cat) => sum + cat.itemCount, 0);
  const averageCostOverall = totalItems > 0 ? data.totalPurchases / totalItems : 0;

  // Find most expensive category
  const mostExpensiveCategory = data.purchases.reduce((max, cat) => 
    cat.totalSpent > max.totalSpent ? cat : max
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totala inköp</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(data.totalPurchases)}</div>
            <p className="text-xs text-muted-foreground">{data.month}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Antal artiklar</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">Totalt köpta artiklar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Genomsnittskostnad</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(averageCostOverall)}</div>
            <p className="text-xs text-muted-foreground">Per artikel</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Största kategori</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mostExpensiveCategory.categoryName}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(mostExpensiveCategory.totalSpent)} 
              ({((mostExpensiveCategory.totalSpent / data.totalPurchases) * 100).toFixed(1)}%)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>Förbrukningskategorier - {data.month}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kategori</TableHead>
                <TableHead>Totalt spenderat</TableHead>
                <TableHead>Antal artiklar</TableHead>
                <TableHead>Genomsnitt/artikel</TableHead>
                <TableHead>% av total</TableHead>
                <TableHead>Toppeverantörer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.purchases.map((category) => (
                <TableRow key={category.categoryId}>
                  <TableCell>
                    <Badge className={getCategoryColor(category.categoryName)}>
                      {category.categoryName}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-blue-600">
                    {formatCurrency(category.totalSpent)}
                  </TableCell>
                  <TableCell>{category.itemCount}</TableCell>
                  <TableCell>{formatCurrency(category.averageCost)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {((category.totalSpent / data.totalPurchases) * 100).toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {category.topSuppliers.slice(0, 2).map((supplier, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium">{supplier.supplier}</span>
                          <span className="text-muted-foreground ml-2">
                            {formatCurrency(supplier.amount)} ({supplier.percentage.toFixed(1)}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detailed Supplier Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.purchases.map((category) => (
          <Card key={category.categoryId}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className={getCategoryColor(category.categoryName)}>
                  {category.categoryName}
                </Badge>
                <span className="text-lg">Leverantörer</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.topSuppliers.map((supplier, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{supplier.supplier}</p>
                      <p className="text-sm text-muted-foreground">
                        {supplier.percentage.toFixed(1)}% av kategorin
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(supplier.amount)}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Totalt för {category.categoryName.toLowerCase()}:</span>
                    <span>{formatCurrency(category.totalSpent)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}