import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { UserPlus, Users, RefreshCw, TrendingUp } from 'lucide-react';

const customerTypeData = [
  { name: 'Nya kunder', value: 148, percentage: 32.4, color: '#06B6D4' },
  { name: 'Återkommande kunder', value: 309, percentage: 67.6, color: '#8B5CF6' }
];

const monthlyCustomerTrend = [
  { month: 'Jan', new: 45, returning: 89, total: 134 },
  { month: 'Feb', new: 52, returning: 95, total: 147 },
  { month: 'Mar', new: 48, returning: 102, total: 150 },
  { month: 'Apr', new: 41, returning: 98, total: 139 },
  { month: 'Maj', new: 58, returning: 105, total: 163 },
  { month: 'Jun', new: 63, returning: 112, total: 175 }
];

const consultationFunnelData = [
  { stage: 'Konsultationer', count: 245, percentage: 100, color: '#3B82F6' },
  { stage: 'Behandlingsplan', count: 184, percentage: 75, color: '#8B5CF6' },
  { stage: 'Aktiva kunder', count: 156, percentage: 64, color: '#10B981' },
  { stage: 'Inaktiva kunder', count: 28, percentage: 11, color: '#EF4444' }
];

export const CustomerAnalyticsCharts: React.FC = () => {
  const totalCustomers = customerTypeData.reduce((sum, item) => sum + item.value, 0);
  const totalConsultations = consultationFunnelData[0].count;

  return (
    <div className="space-y-6">
      {/* Kund översikt */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Nya vs Återkommande kunder</span>
              <Badge variant="outline" className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>{totalCustomers} totalt</span>
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {customerTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value} kunder`, 'Antal']}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span className="text-sm">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {customerTypeData.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold" style={{ color: item.color }}>
                    {item.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.percentage.toFixed(1)}% av totalt
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kundtrender per månad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyCustomerTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      `${value} kunder`, 
                      name === 'new' ? 'Nya' : name === 'returning' ? 'Återkommande' : 'Totalt'
                    ]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="new" 
                    stroke="#06B6D4" 
                    strokeWidth={3}
                    dot={{ fill: '#06B6D4', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="returning" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Konsultationsflöde */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Konsultationsflöde & Konvertering</span>
            <Badge variant="outline" className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>75% konverteringsgrad</span>
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {consultationFunnelData.map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: stage.color }}
                    />
                    <span className="font-medium">{stage.stage}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold" style={{ color: stage.color }}>
                      {stage.count}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {stage.percentage}%
                    </Badge>
                  </div>
                </div>
                <div 
                  className="h-2 rounded-full" 
                  style={{ backgroundColor: `${stage.color}20` }}
                >
                  <div 
                    className="h-2 rounded-full transition-all duration-300" 
                    style={{ 
                      backgroundColor: stage.color, 
                      width: `${stage.percentage}%` 
                    }}
                  />
                </div>
                {index < consultationFunnelData.length - 1 && (
                  <div className="flex justify-center">
                    <div className="w-px h-4 bg-border" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-primary">{totalConsultations}</div>
                <div className="text-sm text-muted-foreground">Totala konsultationer</div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-600">
                  {Math.round((consultationFunnelData[1].count / consultationFunnelData[0].count) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Konsultation till plan</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">
                  {Math.round((consultationFunnelData[2].count / consultationFunnelData[1].count) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Plan till aktiv kund</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};