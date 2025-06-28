
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  lastActivity: string;
  value: string;
}

interface CustomerDetailsDialogProps {
  customer: Customer;
  onSelect: (customer: Customer) => void;
  selectedCustomer: Customer | null;
}

export function CustomerDetailsDialog({ customer, onSelect, selectedCustomer }: CustomerDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" onClick={() => onSelect(customer)}>
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kunddetaljer</DialogTitle>
        </DialogHeader>
        {selectedCustomer && (
          <div className="space-y-4">
            <div>
              <label className="font-medium">Namn:</label>
              <p>{selectedCustomer.name}</p>
            </div>
            <div>
              <label className="font-medium">Företag:</label>
              <p>{selectedCustomer.company}</p>
            </div>
            <div>
              <label className="font-medium">E-post:</label>
              <p>{selectedCustomer.email}</p>
            </div>
            <div>
              <label className="font-medium">Telefon:</label>
              <p>{selectedCustomer.phone}</p>
            </div>
            <div>
              <label className="font-medium">Status:</label>
              <p>{selectedCustomer.status}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
