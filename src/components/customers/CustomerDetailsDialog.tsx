
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

export function CustomerDetailsDialog({ customer }: CustomerDetailsDialogProps) {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/kunder/${customer.id}`);
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleViewProfile}>
      <Eye className="h-4 w-4" />
    </Button>
  );
}
