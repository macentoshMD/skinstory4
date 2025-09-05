import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Booking } from "@/types/booking";
import { CreditCard, Banknote, Smartphone } from "lucide-react";

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onPaymentComplete: (bookingId: string, amount: number, method: string) => void;
}

export const CheckoutDialog: React.FC<CheckoutDialogProps> = ({
  isOpen,
  onClose,
  booking,
  onPaymentComplete
}) => {
  const [amount, setAmount] = useState(booking?.price?.toString() || '');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'swish'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  React.useEffect(() => {
    if (booking?.price) {
      setAmount(booking.price.toString());
    }
  }, [booking]);

  const handlePayment = async () => {
    if (!booking || !amount) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onPaymentComplete(booking.id, parseInt(amount), paymentMethod);
    setIsProcessing(false);
    onClose();
  };

  const handleClose = () => {
    setAmount(booking?.price?.toString() || '');
    setPaymentMethod('card');
    setIsProcessing(false);
    onClose();
  };

  if (!booking) return null;

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'card': return <CreditCard className="h-4 w-4" />;
      case 'cash': return <Banknote className="h-4 w-4" />;
      case 'swish': return <Smartphone className="h-4 w-4" />;
      default: return <CreditCard className="h-4 w-4" />;
    }
  };

  const getPaymentLabel = (method: string) => {
    switch (method) {
      case 'card': return 'Kort';
      case 'cash': return 'Kontant';
      case 'swish': return 'Swish';
      default: return 'Kort';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Betala behandling</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Booking Summary */}
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{booking.treatmentType}</h4>
                <p className="text-sm text-muted-foreground">{booking.customerName}</p>
              </div>
              <Badge variant="secondary">
                {booking.startTime.toLocaleTimeString('sv-SE', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {booking.staffName} • {booking.room}
            </div>
          </div>

          <Separator />

          {/* Payment Amount */}
          <div>
            <Label htmlFor="amount">Belopp att betala (kr) *</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1500"
              min="0"
              step="1"
            />
          </div>

          {/* Payment Method */}
          <div>
            <Label>Betalningssätt *</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <Button
                variant={paymentMethod === 'card' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPaymentMethod('card')}
                className="flex items-center gap-2"
              >
                <CreditCard className="h-4 w-4" />
                Kort
              </Button>
              <Button
                variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPaymentMethod('cash')}
                className="flex items-center gap-2"
              >
                <Banknote className="h-4 w-4" />
                Kontant
              </Button>
              <Button
                variant={paymentMethod === 'swish' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPaymentMethod('swish')}
                className="flex items-center gap-2"
              >
                <Smartphone className="h-4 w-4" />
                Swish
              </Button>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-muted/30 p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Behandling:</span>
              <span className="text-sm">{booking.price || 0} kr</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Att betala:</span>
              <span className="font-semibold">{amount || 0} kr</span>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                {getPaymentIcon(paymentMethod)}
                <span>Via {getPaymentLabel(paymentMethod)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleClose} disabled={isProcessing}>
              Avbryt
            </Button>
            <Button 
              onClick={handlePayment} 
              disabled={!amount || isProcessing}
            >
              {isProcessing ? 'Behandlar...' : `Bekräfta betalning`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};