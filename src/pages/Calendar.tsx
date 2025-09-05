
import React, { useState, useMemo } from 'react';
import { CalendarView, Booking, BookingFormData } from '@/types/booking';
import { generateMockBookings } from '@/utils/calendar';
import { CalendarHeader } from '@/components/calendar/CalendarHeader';
import { DayView } from '@/components/calendar/DayView';
import { WeekView } from '@/components/calendar/WeekView';
import { BookingDetailsDrawer } from '@/components/calendar/BookingDetailsDrawer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, Users, TrendingUp } from "lucide-react";
import { getBookingsForDate, getBookingsForWeek, getStatusText } from '@/utils/calendar';
import { startOfWeek } from 'date-fns';

  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('day');
  const [bookings, setBookings] = useState(() => generateMockBookings(new Date(), 14));
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDrawerOpen(true);
  };

  const handleNewBooking = (startTime?: Date) => {
    console.log('New booking for:', startTime);
  };

  const handleUpdateBooking = (bookingId: string, updates: Partial<Booking>) => {
    setBookings(prev => 
      prev.map(b => b.id === bookingId ? { ...b, ...updates } : b)
    );
  };

  const handleSaveBooking = (bookingId: string, data: BookingFormData) => {
    // TODO: Implement booking update functionality
    console.log('Save booking:', bookingId, data);
  };

  const handleDeleteBooking = (bookingId: string) => {
    // TODO: Implement booking deletion functionality
    console.log('Delete booking:', bookingId);
  };

  // Get relevant bookings based on current view
  const relevantBookings = useMemo(() => {
    if (view === 'day') {
      return getBookingsForDate(bookings, currentDate);
    } else {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
      return getBookingsForWeek(bookings, weekStart);
    }
  }, [bookings, currentDate, view]);

  // Calculate statistics
  const stats = useMemo(() => {
    const today = new Date();
    const todayBookings = getBookingsForDate(bookings, today);
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    const weekBookings = getBookingsForWeek(bookings, weekStart);

    return {
      today: {
        total: todayBookings.length,
        confirmed: todayBookings.filter(b => b.status === 'confirmed').length,
        pending: todayBookings.filter(b => b.status === 'pending').length,
        completed: todayBookings.filter(b => b.status === 'completed').length,
      },
      week: {
        total: weekBookings.length,
        revenue: weekBookings.reduce((sum, b) => sum + (b.price || 0), 0),
        newCustomers: weekBookings.filter(b => b.isFirstVisit).length,
      }
    };
  }, [bookings]);

  return (
    <div className="space-y-6">
      <CalendarHeader
        currentDate={currentDate}
        view={view}
        onDateChange={setCurrentDate}
        onViewChange={setView}
        onNewBooking={handleNewBooking}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main calendar view */}
        <div className="lg:col-span-3">
          {view === 'day' ? (
            <DayView
              date={currentDate}
              bookings={bookings}
              onBookingClick={handleBookingClick}
              onNewBooking={handleNewBooking}
              onUpdateBooking={handleUpdateBooking}
            />
          ) : (
            <WeekView
              date={currentDate}
              bookings={bookings}
              onBookingClick={handleBookingClick}
              onNewBooking={handleNewBooking}
              onUpdateBooking={handleUpdateBooking}
            />
          )}
        </div>

        {/* Stats sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Idag
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Totalt</span>
                <Badge variant="secondary">{stats.today.total}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Bekräftade</span>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  {stats.today.confirmed}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Väntar</span>
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                  {stats.today.pending}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Genomförda</span>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  {stats.today.completed}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Denna vecka
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Bokningar</span>
                <span className="font-semibold">{stats.week.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Intäkter</span>
                <span className="font-semibold">{stats.week.revenue.toLocaleString()} kr</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Nya kunder</span>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                  {stats.week.newCustomers}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" />
                Kommande
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {relevantBookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking.id}
                    className="p-2 border rounded cursor-pointer hover:bg-muted/50"
                    onClick={() => handleBookingClick(booking)}
                  >
                    <div className="text-xs font-medium truncate">
                      {booking.customerName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {booking.treatmentType}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs">
                        {booking.startTime.toLocaleTimeString('sv-SE', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                {relevantBookings.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    Inga bokningar att visa
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BookingDetailsDrawer
        booking={selectedBooking}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleSaveBooking}
        onDelete={handleDeleteBooking}
      />
    </div>
  );
};

export default Calendar;
