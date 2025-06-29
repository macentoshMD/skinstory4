
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, User, MapPin } from "lucide-react";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      time: "09:00",
      duration: "60 min",
      customer: "Anna Andersson",
      treatment: "HydraFacial",
      staff: "Lisa S.",
      status: "Bekräftad"
    },
    {
      id: 2,
      time: "10:30",
      duration: "45 min",
      customer: "Erik Johansson",
      treatment: "Ansiktsbehandling",
      staff: "Anna N.",
      status: "Bekräftad"
    },
    {
      id: 3,
      time: "13:00",
      duration: "90 min",
      customer: "Maria Larsson",
      treatment: "Microneedling",
      staff: "Lisa S.",
      status: "Väntar"
    },
    {
      id: 4,
      time: "15:00",
      duration: "30 min",
      customer: "Johan Petersson",
      treatment: "Konsultation",
      staff: "Maria L.",
      status: "Bekräftad"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Bekräftad': return 'bg-green-100 text-green-800';
      case 'Väntar': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kalender</h1>
          <p className="text-gray-600 mt-2">Hantera bokningar och schema</p>
        </div>
        <Button>
          <CalendarIcon className="h-4 w-4 mr-2" />
          Ny bokning
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Dagens schema - {selectedDate.toLocaleDateString('sv-SE')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm font-medium">{appointment.time}</div>
                        <div className="text-xs text-gray-500">{appointment.duration}</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{appointment.customer}</div>
                        <div className="text-sm text-gray-600">{appointment.treatment}</div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <User className="h-3 w-3" />
                          {appointment.staff}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Snabbstatistik</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Totala bokningar idag</span>
                <span className="font-semibold">{appointments.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Bekräftade</span>
                <span className="font-semibold text-green-600">
                  {appointments.filter(a => a.status === 'Bekräftad').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Väntar bekräftelse</span>
                <span className="font-semibold text-yellow-600">
                  {appointments.filter(a => a.status === 'Väntar').length}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kommande funktioner</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Månadsvy</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Resursbokningar</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Återkommande bokningar</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>SMS-påminnelser</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
