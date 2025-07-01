import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Calendar } from "lucide-react";

interface PaymentOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPayment: (type: 'commit' | 'payAsYouGo') => void;
  type: 'treatment' | 'product';
  itemName: string;
  pricing: {
    commitTotal: string;
    commitMonthly: string;
    payAsYouGoTotal: string;
    savings: string;
  };
}

const PaymentOptionModal = ({
  isOpen,
  onClose,
  onSelectPayment,
  type,
  itemName,
  pricing
}: PaymentOptionModalProps) => {
  const actionText = type === 'treatment' ? 'boka behandling' : 'beställa produkter';
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Välj betalningsalternativ</DialogTitle>
          <DialogDescription className="text-lg">
            För att {actionText} för <strong>{itemName}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {/* Commit Option */}
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 relative cursor-pointer hover:shadow-lg transition-all"
                onClick={() => onSelectPayment('commit')}>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-green-600 text-white px-4 py-1">SPARA {pricing.savings}</Badge>
            </div>
            <CardContent className="p-6 pt-8">
              <div className="text-center space-y-4">
                <h4 className="font-bold text-xl text-purple-800">Betala direkt</h4>
                <div className="text-4xl font-bold text-purple-600">{pricing.commitTotal}</div>
                <p className="text-sm text-purple-700">{pricing.commitMonthly}</p>
                <Button 
                  size="lg" 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPayment('commit');
                  }}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Välj detta alternativ
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pay as you go */}
          <Card className="border-2 border-gray-200 bg-white cursor-pointer hover:shadow-lg transition-all"
                onClick={() => onSelectPayment('payAsYouGo')}>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h4 className="font-bold text-xl text-gray-800">Betala per tillfälle</h4>
                <div className="text-4xl font-bold text-gray-600">{pricing.payAsYouGoTotal}</div>
                <p className="text-sm text-gray-600">Ingen förskottsbetalning</p>
                <Button 
                  variant="outline"
                  size="lg" 
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPayment('payAsYouGo');
                  }}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Välj detta alternativ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentOptionModal;