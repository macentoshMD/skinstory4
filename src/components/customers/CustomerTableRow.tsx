
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Customer } from "@/types/customer";
import { CustomerDetailsDialog } from "./CustomerDetailsDialog";

interface CustomerTableRowProps {
  customer: Customer;
  onRowClick: (customer: Customer) => void;
  onSelectCustomer: (customer: Customer) => void;
  selectedCustomer: Customer | null;
}

export function CustomerTableRow({ customer, onRowClick, onSelectCustomer, selectedCustomer }: CustomerTableRowProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktiv":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Potentiell":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Inaktiv":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getTagColor = (index: number) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-purple-100 text-purple-800", 
      "bg-pink-100 text-pink-800",
      "bg-indigo-100 text-indigo-800"
    ];
    return colors[index % colors.length];
  };

  const getProblemColor = (index: number) => {
    const colors = [
      "bg-orange-100 text-orange-800",
      "bg-cyan-100 text-cyan-800",
      "bg-teal-100 text-teal-800"
    ];
    return colors[index % colors.length];
  };

  return (
    <TableRow 
      key={customer.id} 
      className="hover:bg-gray-50 cursor-pointer"
      onClick={() => onRowClick(customer)}
    >
      <TableCell>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs font-medium bg-gradient-to-br from-blue-400 to-purple-500 text-white">
            {customer.initials}
          </AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell className="font-medium">{customer.name}</TableCell>
      <TableCell>
        <div className="flex flex-col">
          <div className="text-sm text-gray-900">{customer.email}</div>
          <div className="text-xs text-gray-500">{customer.phone}</div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="secondary" className={getStatusColor(customer.status)}>
          {customer.status}
        </Badge>
      </TableCell>
      <TableCell className="text-sm text-gray-600">{customer.created}</TableCell>
      <TableCell className="text-sm text-gray-600">{customer.lastActivity}</TableCell>
      <TableCell>
        <span className="font-semibold text-blue-600">{customer.orders}</span>
      </TableCell>
      <TableCell>
        <span className="font-semibold text-green-600">{customer.treatments}</span>
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {customer.problems.slice(0, 2).map((problem, index) => (
            <Badge key={problem} variant="outline" className={`text-xs ${getProblemColor(index)}`}>
              {problem}
            </Badge>
          ))}
          {customer.problems.length > 2 && (
            <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600">
              +{customer.problems.length - 2}
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {customer.tags.slice(0, 2).map((tag, index) => (
            <Badge key={tag} variant="secondary" className={`text-xs ${getTagColor(index)}`}>
              {tag}
            </Badge>
          ))}
          {customer.tags.length > 2 && (
            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
              +{customer.tags.length - 2}
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell className="text-sm text-gray-600">{customer.userAssigned}</TableCell>
      <TableCell className="font-medium">{customer.value}</TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <div className="flex gap-1">
          <CustomerDetailsDialog
            customer={customer}
            onSelect={onSelectCustomer}
            selectedCustomer={selectedCustomer}
          />
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
