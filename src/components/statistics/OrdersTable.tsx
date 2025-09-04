import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingUp, ShoppingCart, CheckCircle, Clock, Truck } from "lucide-react";
import { Order } from "@/utils/employeeStatsGenerator";

interface OrdersTableProps {
  orders: Order[];
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Beställd': return <Clock className="h-3 w-3" />;
    case 'På väg': return <Truck className="h-3 w-3" />;
    case 'Mottagen': return <CheckCircle className="h-3 w-3" />;
    default: return <Package className="h-3 w-3" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Beställd': return 'secondary';
    case 'På väg': return 'default';
    case 'Mottagen': return 'default';
    default: return 'secondary';
  }
};

const getChannelColor = (channel: string) => {
  return channel === 'online' ? 'default' : 'outline';
};

export function OrdersTable({ orders }: OrdersTableProps) {
  const totalValue = orders.reduce((sum, order) => sum + order.amount, 0);
  const totalCommission = orders.reduce((sum, order) => sum + order.commission, 0);
  const onlineOrders = orders.filter(o => o.channel === 'online').length;

  // Sort orders by date (newest first)
  const sortedOrders = [...orders].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Online-försäljningar</p>
                <p className="text-2xl font-bold">{onlineOrders}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total ordervärde</p>
                <p className="text-2xl font-bold">{Math.round(totalValue).toLocaleString()} kr</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total provision</p>
                <p className="text-2xl font-bold">{Math.round(totalCommission).toLocaleString()} kr</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Alla ordrar ({orders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Inga ordrar registrerade än</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Datum</TableHead>
                    <TableHead>Order-ID</TableHead>
                    <TableHead>Produkt</TableHead>
                    <TableHead>Varumärke</TableHead>
                    <TableHead>Kanal</TableHead>
                    <TableHead className="text-right">Belopp</TableHead>
                    <TableHead className="text-right">Provision</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedOrders.map((order, index) => (
                    <TableRow key={`${order.orderId}-${index}`}>
                      <TableCell className="font-medium">
                        {order.date.toLocaleDateString('sv-SE', { 
                          day: '2-digit', 
                          month: '2-digit'
                        })}
                      </TableCell>
                      <TableCell className="text-muted-foreground font-mono text-xs">
                        {order.orderId}
                      </TableCell>
                      <TableCell>{order.item}</TableCell>
                      <TableCell>
                        <span className="font-medium">{order.brand}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getChannelColor(order.channel)} className="text-xs">
                          {order.channel === 'online' ? 'Online' : 'Instore'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {Math.round(order.amount).toLocaleString()} kr
                      </TableCell>
                      <TableCell className="text-right font-semibold text-green-600">
                        {Math.round(order.commission).toLocaleString()} kr
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={getStatusColor(order.status) as any} 
                          className="flex items-center gap-1 w-fit text-xs"
                        >
                          {getStatusIcon(order.status)}
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}