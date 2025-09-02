import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Crown, Medal, Award, TrendingUp } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  clinic: string;
  revenue: number;
  treatments: number;
  rating: number;
  trend: number;
  specialties: string[];
}

const staffData: StaffMember[] = [
  {
    id: '1',
    name: 'Lisa Svensson',
    role: 'Terapeut',
    clinic: 'Östermalm',
    revenue: 285000,
    treatments: 145,
    rating: 4.9,
    trend: 15,
    specialties: ['HydraFacial', 'Microneedling', 'Anti-aging']
  },
  {
    id: '2',
    name: 'Anna Nilsson',
    role: 'Terapeut',
    clinic: 'Södermalm',
    revenue: 268000,
    treatments: 132,
    rating: 4.8,
    trend: 12,
    specialties: ['Chemical Peeling', 'Acne Treatment', 'Rosacea']
  },
  {
    id: '3',
    name: 'Maria Larsson',
    role: 'Chef',
    clinic: 'Sundbyberg',
    revenue: 195000,
    treatments: 98,
    rating: 4.7,
    trend: 8,
    specialties: ['Management', 'Customer Service', 'All Treatments']
  },
  {
    id: '4',
    name: 'Erik Johansson',
    role: 'Terapeut',
    clinic: 'Östermalm',
    revenue: 175000,
    treatments: 89,
    rating: 4.6,
    trend: 22,
    specialties: ['IPL', 'CO2 Laser', 'Pigmentation']
  },
  {
    id: '5',
    name: 'Sofia Andersson',
    role: 'Terapeut',
    clinic: 'Södermalm',
    revenue: 158000,
    treatments: 82,
    rating: 4.8,
    trend: -3,
    specialties: ['Skincare', 'Consultation', 'Products']
  }
];

export const StaffRevenueRanking: React.FC = () => {
  const maxRevenue = Math.max(...staffData.map(staff => staff.revenue));
  
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 1: return <Medal className="h-5 w-5 text-gray-400" />;
      case 2: return <Award className="h-5 w-5 text-amber-600" />;
      default: return <span className="text-sm font-bold text-muted-foreground">#{index + 1}</span>;
    }
  };

  const getRankBadgeColor = (index: number) => {
    switch (index) {
      case 0: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 1: return 'bg-gray-100 text-gray-800 border-gray-200';
      case 2: return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-muted text-muted-foreground border-muted';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Personal rankning - Omsättning</span>
          <Badge variant="outline" className="flex items-center space-x-1">
            <TrendingUp className="h-3 w-3" />
            <span>Senaste månaden</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {staffData.map((staff, index) => (
            <div key={staff.id} className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                {/* Ranking */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${getRankBadgeColor(index)}`}>
                  {getRankIcon(index)}
                </div>

                {/* Avatar */}
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {staff.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-base">{staff.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{staff.role}</span>
                        <span>•</span>
                        <span>{staff.clinic}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">
                        {(staff.revenue / 1000).toFixed(0)}k kr
                      </div>
                      <Badge 
                        variant={staff.trend > 0 ? "default" : staff.trend < 0 ? "destructive" : "secondary"}
                        className={`text-xs ${
                          staff.trend > 0 
                            ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                            : staff.trend < 0
                            ? 'bg-red-100 text-red-700 hover:bg-red-100'
                            : ''
                        }`}
                      >
                        {staff.trend > 0 ? '+' : ''}{staff.trend}%
                      </Badge>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 space-y-2">
                    <Progress value={(staff.revenue / maxRevenue) * 100} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{staff.treatments} behandlingar</span>
                      <span>⭐ {staff.rating}/5.0</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {staff.specialties.slice(0, 3).map((specialty, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {staff.specialties.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{staff.specialties.length - 3} mer
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};