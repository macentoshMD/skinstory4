import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Package, Scissors } from 'lucide-react';

const salesData = [
  { name: 'Behandlingar', value: 2980000, percentage: 75.2, color: '#8B5CF6', icon: Scissors },
  { name: 'Produkter', value: 985000, percentage: 24.8, color: '#06B6D4', icon: Package }
];

const productSalesData = [
  { name: 'Vitamin C Serum', sales: 245, revenue: 208250, trend: 15 },
  { name: 'Retinol Night Cream', sales: 189, revenue: 128520, trend: 8 },
  { name: 'Hyaluronic Moisturizer', sales: 167, revenue: 86840, trend: 12 },
  { name: 'Sunscreen SPF 50', sales: 134, revenue: 53600, trend: -3 },
  { name: 'AHA Exfoliant', sales: 98, revenue: 44100, trend: 22 }
];

export const ProductServiceSalesChart: React.FC = () => {
  const totalSales = salesData.reduce((sum, item) => sum + item.value, 0);
  const totalProductSales = productSalesData.reduce((sum, item) => sum + item.sales, 0);

  return (
    <div className="space-y-6">
      {/* Övergripande fördelning */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Försäljning: Produkter vs Tjänster</span>
              <span className="text-sm font-normal text-muted-foreground">
                Total: {(totalSales / 1000000).toFixed(1)}M kr
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {salesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${(value / 1000000).toFixed(1)}M kr`, 'Försäljning']}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span className="text-sm">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Försäljningsöversikt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {salesData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg`} style={{ backgroundColor: `${item.color}20` }}>
                        <item.icon className="h-4 w-4" style={{ color: item.color }} />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">
                        {(item.value / 1000000).toFixed(1)}M kr
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detaljerad produktförsäljning */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Toppresultat produkter</span>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Package className="h-3 w-3" />
              <span>{totalProductSales} produkter sålda</span>
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {productSalesData.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {product.sales} sålda • {(product.revenue / 1000).toFixed(0)}k kr
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={product.trend > 0 ? "default" : "secondary"}
                    className={`text-xs ${
                      product.trend > 0 
                        ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                        : product.trend < 0
                        ? 'bg-red-100 text-red-700 hover:bg-red-100'
                        : ''
                    }`}
                  >
                    {product.trend > 0 ? '+' : ''}{product.trend}%
                  </Badge>
                  <TrendingUp className={`h-4 w-4 ${
                    product.trend > 0 ? 'text-green-600' : 
                    product.trend < 0 ? 'text-red-600' : 'text-gray-400'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};