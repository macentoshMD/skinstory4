import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface ProductOrder {
  id: string;
  productName: string;
  brand: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  supplier: string;
  orderDate: string;
  expectedDelivery: string;
  status: 'Beställd' | 'Levererad' | 'Försenad' | 'Avbruten';
  stockLevel: number;
  reorderPoint: number;
}

const productOrders: ProductOrder[] = [
  {
    id: 'ORD-001',
    productName: 'Vitamin C Serum',
    brand: 'SkinCeuticals',
    quantity: 50,
    unitCost: 320,
    totalCost: 16000,
    supplier: 'Beauty Supply AB',
    orderDate: '2024-01-15',
    expectedDelivery: '2024-01-22',
    status: 'Levererad',
    stockLevel: 45,
    reorderPoint: 15
  },
  {
    id: 'ORD-002',
    productName: 'Retinol Night Cream',
    brand: 'Obagi',
    quantity: 30,
    unitCost: 280,
    totalCost: 8400,
    supplier: 'Professional Beauty',
    orderDate: '2024-01-18',
    expectedDelivery: '2024-01-25',
    status: 'Beställd',
    stockLevel: 12,
    reorderPoint: 10
  },
  {
    id: 'ORD-003',
    productName: 'Hyaluronic Moisturizer',
    brand: 'Dermalogica',
    quantity: 40,
    unitCost: 220,
    totalCost: 8800,
    supplier: 'Beauty Supply AB',
    orderDate: '2024-01-20',
    expectedDelivery: '2024-01-27',
    status: 'Beställd',
    stockLevel: 67,
    reorderPoint: 20
  },
  {
    id: 'ORD-004',
    productName: 'Chemical Exfoliant',
    brand: 'Paula\'s Choice',
    quantity: 25,
    unitCost: 195,
    totalCost: 4875,
    supplier: 'Nordic Beauty',
    orderDate: '2024-01-12',
    expectedDelivery: '2024-01-19',
    status: 'Försenad',
    stockLevel: 8,
    reorderPoint: 15
  },
  {
    id: 'ORD-005',
    productName: 'Sunscreen SPF 50',
    brand: 'EltaMD',
    quantity: 60,
    unitCost: 165,
    totalCost: 9900,
    supplier: 'MedBeauty Supply',
    orderDate: '2024-01-14',
    expectedDelivery: '2024-01-21',
    status: 'Levererad',
    stockLevel: 89,
    reorderPoint: 25
  }
];

export const ProductOrdersTable: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Levererad': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Beställd': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'Försenad': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Levererad': 'bg-green-100 text-green-800 hover:bg-green-100',
      'Beställd': 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      'Försenad': 'bg-red-100 text-red-800 hover:bg-red-100',
      'Avbruten': 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
        <span className="flex items-center space-x-1">
          {getStatusIcon(status)}
          <span>{status}</span>
        </span>
      </Badge>
    );
  };

  const getStockStatus = (stockLevel: number, reorderPoint: number) => {
    if (stockLevel <= reorderPoint) {
      return <Badge variant="destructive" className="text-xs">Lågt lager</Badge>;
    } else if (stockLevel <= reorderPoint * 1.5) {
      return <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Påfyllning snart</Badge>;
    }
    return <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 hover:bg-green-100">Bra lager</Badge>;
  };

  const totalOrderValue = productOrders.reduce((sum, order) => sum + order.totalCost, 0);
  const pendingOrders = productOrders.filter(order => order.status === 'Beställd' || order.status === 'Försenad').length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Produktbeställningar</span>
          </CardTitle>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>{totalOrderValue.toLocaleString('sv-SE')} kr totalt</span>
            </Badge>
            <Badge variant={pendingOrders > 0 ? "secondary" : "default"} className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{pendingOrders} väntande</span>
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produkt</TableHead>
                <TableHead>Leverantör</TableHead>
                <TableHead className="text-right">Antal</TableHead>
                <TableHead className="text-right">Kostnad</TableHead>
                <TableHead>Beställd</TableHead>
                <TableHead>Levereras</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Lager</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.productName}</div>
                      <div className="text-sm text-muted-foreground">{order.brand}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{order.supplier}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-medium">{order.quantity}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div>
                      <div className="font-medium">{order.totalCost.toLocaleString('sv-SE')} kr</div>
                      <div className="text-xs text-muted-foreground">
                        {order.unitCost} kr/st
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(order.orderDate).toLocaleDateString('sv-SE')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(order.expectedDelivery).toLocaleDateString('sv-SE')}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(order.status)}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        {order.stockLevel} st
                      </div>
                      {getStockStatus(order.stockLevel, order.reorderPoint)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-primary">{productOrders.length}</div>
              <div className="text-sm text-muted-foreground">Totala beställningar</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">
                {productOrders.filter(o => o.status === 'Levererad').length}
              </div>
              <div className="text-sm text-muted-foreground">Levererade</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">
                {productOrders.filter(o => o.status === 'Beställd').length}
              </div>
              <div className="text-sm text-muted-foreground">Pågående</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">
                {productOrders.filter(o => o.status === 'Försenad').length}
              </div>
              <div className="text-sm text-muted-foreground">Försenade</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};