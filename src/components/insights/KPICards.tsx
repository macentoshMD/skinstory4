
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KPIData } from '@/types/insights';
import { 
  DollarSign, 
  Users, 
  Star, 
  Calendar, 
  TrendingUp, 
  Heart,
  Repeat,
  BarChart
} from 'lucide-react';

interface KPICardsProps {
  kpiData: KPIData;
}

export const KPICards: React.FC<KPICardsProps> = ({ kpiData }) => {
  const kpiItems = [
    {
      title: 'Total omsättning',
      value: `${kpiData.totalRevenue.toLocaleString('sv-SE')} kr`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      title: 'Antal kunder',
      value: kpiData.totalCustomers.toLocaleString('sv-SE'),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+8%',
      changeType: 'positive' as const
    },
    {
      title: 'Genomsnittligt betyg',
      value: kpiData.averageRating.toFixed(1),
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      change: '+0.2',
      changeType: 'positive' as const
    },
    {
      title: 'Totala bokningar',
      value: kpiData.totalBookings.toLocaleString('sv-SE'),
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+15%',
      changeType: 'positive' as const
    },
    {
      title: 'Kapacitetsutnyttjande',
      value: `${kpiData.utilizationRate}%`,
      icon: BarChart,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '+3%',
      changeType: 'positive' as const
    },
    {
      title: 'Kundnöjdhet',
      value: `${kpiData.customerSatisfaction.toFixed(1)}/5.0`,
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      change: '+0.1',
      changeType: 'positive' as const
    },
    {
      title: 'Återkommande kunder',
      value: `${kpiData.repeatCustomerRate}%`,
      icon: Repeat,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      change: '+5%',
      changeType: 'positive' as const
    },
    {
      title: 'Genomsnittligt transaktion',
      value: `${kpiData.averageTransactionValue.toLocaleString('sv-SE')} kr`,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      change: '+7%',
      changeType: 'positive' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiItems.map((item, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {item.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${item.bgColor}`}>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className={`text-2xl font-bold ${item.color}`}>
                {item.value}
              </div>
              <Badge 
                variant={item.changeType === 'positive' ? 'default' : 'destructive'}
                className={`text-xs ${
                  item.changeType === 'positive' 
                    ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                    : 'bg-red-100 text-red-700 hover:bg-red-100'
                }`}
              >
                {item.change}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Jämfört med föregående period
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
