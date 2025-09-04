import React, { useState, useEffect } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Booking, BookingFormData } from '@/types/booking';
import { formatTimeRange, getStatusText, getStatusColor } from '@/utils/calendar';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  FileText,
  Calendar as CalendarIcon,
  Bell
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BookingDetailsDrawerProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (bookingId: string, data: BookingFormData) => void;
  onDelete?: (bookingId: string) => void;
}

export const BookingDetailsDrawer: React.FC<BookingDetailsDrawerProps> = ({
  booking,
  isOpen,
  onClose,
  onSave,
  onDelete
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<BookingFormData>({
    status: 'confirmed',
    notes: '',
    price: undefined,
    room: '',
    reminderSent: false
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        status: booking.status,
        notes: booking.notes || '',
        price: booking.price,
        room: booking.room || '',
        reminderSent: booking.reminderSent || false
      });
    }
  }, [booking]);

  const handleSave = () => {
    if (!booking) return;

    onSave(booking.id, formData);
    toast({
      title: 'Bokning uppdaterad',
      description: 'Ändringarna har sparats framgångsrikt.',
    });
    onClose();
  };

  const handleDelete = () => {
    if (!booking) return;

    onDelete?.(booking.id);
    toast({
      title: 'Bokning borttagen',
      description: 'Bokningen har tagits bort framgångsrikt.',
      variant: 'destructive'
    });
    onClose();
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      status: value as Booking['status']
    }));
  };

  if (!booking) return null;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-w-2xl mx-auto">
        <DrawerHeader className="text-left">
          <DrawerTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Bokningsdetaljer
          </DrawerTitle>
          <DrawerDescription>
            Visa och redigera information för denna bokning
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-4 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{booking.treatmentType}</h3>
              <Badge className={getStatusColor(booking.status)}>
                {getStatusText(booking.status)}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{format(booking.startTime, 'EEEE d MMMM yyyy', { locale: sv })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{formatTimeRange(booking.startTime, booking.endTime)} ({booking.duration} min)</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{booking.customerName}</span>
                {booking.isFirstVisit && (
                  <Badge variant="outline" className="text-xs">Ny kund</Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Behandlare: {booking.staffName}</span>
              </div>
              {booking.customerPhone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.customerPhone}</span>
                </div>
              )}
              {booking.customerEmail && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.customerEmail}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Editable Fields */}
          <div className="space-y-4">
            <h4 className="font-semibold">Redigera bokning</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">Bekräftad</SelectItem>
                    <SelectItem value="pending">Väntar</SelectItem>
                    <SelectItem value="completed">Genomförd</SelectItem>
                    <SelectItem value="cancelled">Avbokad</SelectItem>
                    <SelectItem value="no_show">Utebliven</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="room">Rum</Label>
                <Input
                  id="room"
                  placeholder="t.ex. Rum 1"
                  value={formData.room}
                  onChange={(e) => setFormData(prev => ({ ...prev, room: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Pris (kr)</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    placeholder="1200"
                    className="pl-10"
                    value={formData.price || ''}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      price: e.target.value ? Number(e.target.value) : undefined 
                    }))}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="reminder"
                  checked={formData.reminderSent}
                  onCheckedChange={(checked) => setFormData(prev => ({ 
                    ...prev, 
                    reminderSent: checked 
                  }))}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="reminder" className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Påminnelse skickad
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Anteckningar</Label>
              <Textarea
                id="notes"
                placeholder="Lägg till anteckningar om behandlingen..."
                className="min-h-[100px]"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <DrawerFooter className="flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Avbryt
          </Button>
          {onDelete && (
            <Button variant="destructive" onClick={handleDelete}>
              Ta bort
            </Button>
          )}
          <Button onClick={handleSave} className="flex-1">
            Spara ändringar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};