
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Clinic, StaffMember, Treatment } from '@/types/insights';

interface DataVisualizationProps {
  clinics: Clinic[];
  staff: StaffMember[];
  treatments: Treatment[];
}

export const DataVisualization: React.FC<DataVisualizationProps> = ({
  clinics,
  staff,
  treatments
}) => {
  // Prepare data for charts
  const clinicRevenueData = clinics.map(clinic => ({
    name: clinic.name.replace('SkinStory ', ''),
    revenue: clinic.revenue,
    customers: clinic.customerCount,
    rating: clinic.rating
  }));

  const staffPerformanceData = staff.map(member => ({
    name: member.name.split(' ')[0], // First name only
    treatments: member.treatmentsPerformed,
    revenue: member.revenue,
    rating: member.rating
  }));

  const treatmentPopularityData = treatments.map(treatment => ({
    name: treatment.name,
    popularity: treatment.popularity,
    rating: treatment.rating,
    margin: treatment.profitMargin
  }));

  const roleDistribution = staff.reduce((acc, member) => {
    acc[member.role] = (acc[member.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const roleData = Object.entries(roleDistribution).map(([role, count]) => ({
    name: role,
    value: count
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      {/* Revenue and Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Klinikprestanda - Omsättning</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clinicRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? `${value.toLocaleString('sv-SE')} kr` : value,
                    name === 'revenue' ? 'Omsättning' : 'Kunder'
                  ]}
                />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personalprestanda</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={staffPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? `${value.toLocaleString('sv-SE')} kr` : value,
                    name === 'revenue' ? 'Omsättning' : name === 'treatments' ? 'Behandlingar' : 'Betyg'
                  ]}
                />
                <Bar dataKey="treatments" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Treatment Analysis and Role Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Behandlingspopularitet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {treatments.map((treatment, index) => (
                <div key={treatment.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{treatment.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {treatment.rating} ⭐
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-600">
                      {treatment.popularity}% popularitet
                    </span>
                  </div>
                  <Progress value={treatment.popularity} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rollfördelning</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={roleData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Staff Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Detaljerad personalanalys</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {staff.map((member) => (
              <div key={member.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role} - {member.clinicId}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{member.rating} ⭐</Badge>
                      <Badge variant="outline">{member.reviewCount} omdömen</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Behandlingar:</span>
                    <div className="font-medium">{member.treatmentsPerformed}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Omsättning:</span>
                    <div className="font-medium">{member.revenue.toLocaleString('sv-SE')} kr</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Specialiseringar:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {member.specializations.slice(0, 2).map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                      {member.specializations.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{member.specializations.length - 2}
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
    </div>
  );
};
