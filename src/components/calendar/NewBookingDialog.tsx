import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Booking } from "@/types/booking";
import { TREATMENT_DURATIONS, BUFFER_TIME } from "@/utils/calendar";
import { format, addMinutes } from 'date-fns';

interface NewBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => void;
  defaultStartTime?: Date;
}

export const NewBookingDialog: React.FC<NewBookingDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  defaultStartTime = new Date()
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [treatmentType, setTreatmentType] = useState('');
  const [treatmentCategory, setTreatmentCategory] = useState<Booking['treatmentCategory']>('consultation');
  const [startTime, setStartTime] = useState(format(defaultStartTime, 'HH:mm'));
  const [duration, setDuration] = useState<number>(TREATMENT_DURATIONS.consultation);
  const [staffName, setStaffName] = useState('');
  const [room, setRoom] = useState('');
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');

  const handleCategoryChange = (category: Booking['treatmentCategory']) => {
    setTreatmentCategory(category);
    setDuration(TREATMENT_DURATIONS[category]);
    
    // Set default treatment type based on category
    const defaultTypes = {
      consultation: 'Konsultation',
      facial: 'Ansiktsbehandling',
      laser: 'Laser hårborttagning',
      microneedling: 'Microneedling',
      other: 'Annan behandling'
    };
    setTreatmentType(defaultTypes[category]);
  };

  const handleSave = () => {
    if (!customerName || !treatmentType || !staffName) return;

    const [hours, minutes] = startTime.split(':').map(Number);
    const bookingStartTime = new Date(defaultStartTime);
    bookingStartTime.setHours(hours, minutes, 0, 0);
    
    const bookingEndTime = addMinutes(bookingStartTime, duration + BUFFER_TIME);

    const newBooking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'> = {
      customerId: `temp-${Date.now()}`,
      customerName,
      customerPhone: customerPhone || undefined,
      customerEmail: customerEmail || undefined,
      staffId: `temp-staff-${Date.now()}`,
      staffName,
      treatmentType,
      treatmentCategory,
      startTime: bookingStartTime,
      endTime: bookingEndTime,
      duration,
      bufferTime: BUFFER_TIME,
      status: 'confirmed',
      notes: notes || undefined,
      price: price ? parseInt(price) : undefined,
      room: room || undefined,
      isFirstVisit: false,
      reminderSent: false
    };

    onSave(newBooking);
    handleClose();
  };

  const handleClose = () => {
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setTreatmentType('');
    setTreatmentCategory('consultation');
    setStartTime(format(new Date(), 'HH:mm'));
    setDuration(TREATMENT_DURATIONS.consultation);
    setStaffName('');
    setRoom('');
    setPrice('');
    setNotes('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ny bokning</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="customerName">Kundnamn *</Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Anna Andersson"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="customerPhone">Telefon</Label>
              <Input
                id="customerPhone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="070-1234567"
              />
            </div>
            <div>
              <Label htmlFor="customerEmail">E-post</Label>
              <Input
                id="customerEmail"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="anna@example.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="treatmentCategory">Kategori *</Label>
            <Select value={treatmentCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consultation">Konsultation (20 min)</SelectItem>
                <SelectItem value="facial">Ansiktsbehandling (50 min)</SelectItem>
                <SelectItem value="laser">Laser (90 min)</SelectItem>
                <SelectItem value="microneedling">Microneedling (60 min)</SelectItem>
                <SelectItem value="other">Annan behandling (50 min)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="treatmentType">Behandling *</Label>
            <Input
              id="treatmentType"
              value={treatmentType}
              onChange={(e) => setTreatmentType(e.target.value)}
              placeholder="Specificera behandling"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="startTime">Starttid *</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="duration">Längd (min)</Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || TREATMENT_DURATIONS.consultation)}
                min="10"
                max="180"
                step="10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="staffName">Personal *</Label>
            <Select value={staffName} onValueChange={setStaffName}>
              <SelectTrigger>
                <SelectValue placeholder="Välj personal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dr. Lindström">Dr. Lindström</SelectItem>
                <SelectItem value="Syster Bergman">Syster Bergman</SelectItem>
                <SelectItem value="Dr. Karlsson">Dr. Karlsson</SelectItem>
                <SelectItem value="Syster Nordström">Syster Nordström</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="room">Rum</Label>
              <Select value={room} onValueChange={setRoom}>
                <SelectTrigger>
                  <SelectValue placeholder="Välj rum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rum 1">Rum 1</SelectItem>
                  <SelectItem value="Rum 2">Rum 2</SelectItem>
                  <SelectItem value="Rum 3">Rum 3</SelectItem>
                  <SelectItem value="Laser rum">Laser rum</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="price">Pris (kr)</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="1500"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Anteckningar</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Speciella behov eller noteringar..."
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleClose}>
              Avbryt
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!customerName || !treatmentType || !staffName}
            >
              Skapa bokning
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};