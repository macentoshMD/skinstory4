import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Users, 
  DollarSign, 
  Star, 
  TrendingUp,
  Calendar
} from 'lucide-react';

interface ClinicData {
  id: string;
  name: string;
  location: string;
  revenue: number;
  customers: number;
  rating: number;
  bookings: number;
  utilizationRate: number;
  trend: number;
}

const mockClinicData: ClinicData[] = [
  {
    id: '1',
    name: 'SkinStory Östermalm',
    location: 'Östermalm, Stockholm',
    revenue: 1200000,
    customers: 420,
    rating: 4.8,
    bookings: 156,
    utilizationRate: 85,
    trend: 12
  },
  {
    id: '2',
    name: 'SkinStory Södermalm', 
    location: 'Södermalm, Stockholm',
    revenue: 1300000,
    customers: 430,
    rating: 4.7,
    bookings: 189,
    utilizationRate: 89,
    trend: 8
  },
  {
    id: '3',
    name: 'SkinStory Sundbyberg',
    location: 'Sundbyberg, Stockholm',
    revenue: 950000,
    customers: 310,
    rating: 4.9,
    bookings: 134,
    utilizationRate: 78,
    trend: 15
  }
];

export const ClinicOverviewCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {mockClinicData.map((clinic) => (
        <Card key={clinic.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">
                {clinic.name}
              </CardTitle>
              <Badge variant={clinic.trend > 10 ? "default" : "secondary"} className="text-xs">
                {clinic.trend > 0 ? '+' : ''}{clinic.trend}%
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {clinic.location}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center text-xs text-muted-foreground">
                  <DollarSign className="h-3 w-3 mr-1" />
                  Omsättning
                </div>
                <div className="text-lg font-bold text-primary">
                  {(clinic.revenue / 1000).toFixed(0)}k kr
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Users className="h-3 w-3 mr-1" />
                  Kunder
                </div>
                <div className="text-lg font-bold text-secondary-foreground">
                  {clinic.customers}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Star className="h-3 w-3 mr-1" />
                  Betyg
                </div>
                <div className="text-lg font-bold text-accent-foreground">
                  {clinic.rating}/5.0
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  Bokningar
                </div>
                <div className="text-lg font-bold text-secondary-foreground">
                  {clinic.bookings}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Kapacitet</span>
                <span className="font-medium">{clinic.utilizationRate}%</span>
              </div>
              <Progress value={clinic.utilizationRate} className="h-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};