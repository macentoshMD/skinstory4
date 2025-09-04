import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  Plus, 
  Edit, 
  Trash2,
  CheckCircle,
  AlertCircle 
} from "lucide-react";
import { useState } from "react";

const WorkSchedule = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Mock data för arbetstider
  const workSchedule = [
    {
      id: 1,
      day: "Måndag",
      date: "2024-01-15",
      startTime: "08:00",
      endTime: "17:00",
      breakDuration: "60",
      status: "schemalagd",
      hoursWorked: 8
    },
    {
      id: 2,
      day: "Tisdag", 
      date: "2024-01-16",
      startTime: "09:00",
      endTime: "18:00",
      breakDuration: "60",
      status: "genomförd",
      hoursWorked: 8
    },
    {
      id: 3,
      day: "Onsdag",
      date: "2024-01-17", 
      startTime: "08:30",
      endTime: "17:30",
      breakDuration: "30",
      status: "schemalagd",
      hoursWorked: 8.5
    },
    {
      id: 4,
      day: "Torsdag",
      date: "2024-01-18",
      startTime: "08:00", 
      endTime: "16:00",
      breakDuration: "60",
      status: "schemalagd",
      hoursWorked: 7
    },
    {
      id: 5,
      day: "Fredag",
      date: "2024-01-19",
      startTime: "08:00",
      endTime: "16:00", 
      breakDuration: "60",
      status: "schemalagd",
      hoursWorked: 7
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'genomförd':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'schemalagd':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const totalHours = workSchedule.reduce((sum, day) => sum + day.hoursWorked, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Arbetstid</h1>
          <p className="text-gray-600 mt-1">Hantera dina arbetstider och scheman</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Lägg till arbetstid
        </Button>
      </div>

      {/* Veckosammanfattning */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Totala timmar</p>
                <p className="text-xl font-semibold">{totalHours}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Genomförda dagar</p>
                <p className="text-xl font-semibold">1/5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Schemalagda</p>
                <p className="text-xl font-semibold">4</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Aktuell vecka</p>
                <p className="text-xl font-semibold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Veckovy */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Vecka 3, 2024</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Föregående vecka
              </Button>
              <Button variant="outline" size="sm">
                Nästa vecka
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workSchedule.map((day) => (
              <div 
                key={day.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[80px]">
                    <p className="font-medium">{day.day}</p>
                    <p className="text-sm text-gray-500">{day.date}</p>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-gray-600">Starttid: </span>
                      <span className="font-medium">{day.startTime}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Sluttid: </span>
                      <span className="font-medium">{day.endTime}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Rast: </span>
                      <span className="font-medium">{day.breakDuration} min</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Timmar: </span>
                      <span className="font-medium">{day.hoursWorked}h</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className={`${getStatusColor(day.status)} border`}>
                    {day.status === 'genomförd' ? 'Genomförd' : 'Schemalagd'}
                  </Badge>
                  
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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

export default WorkSchedule;