
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody } from "@/components/ui/table";
import { Download, Upload } from "lucide-react";
import { Customer } from "@/types/customer";
import { CustomerTableFilters } from "./CustomerTableFilters";
import { CustomerTableHeader } from "./CustomerTableHeader";
import { CustomerTableRow } from "./CustomerTableRow";
import { useCustomerFiltering } from "@/hooks/useCustomerFiltering";
import { useNavigate } from "react-router-dom";

interface EnhancedCustomerTableProps {
  customers: Customer[];
}

export function EnhancedCustomerTable({ customers }: EnhancedCustomerTableProps) {
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
  const {
    filters,
    setFilters,
    handleSort,
    filteredAndSortedCustomers,
    uniqueCompanies,
    uniqueTags,
    uniqueAssignees
  } = useCustomerFiltering(customers);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleRowClick = (customer: Customer) => {
    console.log('Navigating to customer profile:', customer.id, customer.name);
    navigate(`/kunder/${customer.id}`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">Customers - {filteredAndSortedCustomers.length}</CardTitle>
            <CardDescription>Hantera alla dina kunder på ett ställe</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <CustomerTableFilters
          filters={filters}
          setFilters={setFilters}
          uniqueCompanies={uniqueCompanies}
          uniqueTags={uniqueTags}
          uniqueAssignees={uniqueAssignees}
        />
      </CardHeader>

      <CardContent>
        <Table>
          <CustomerTableHeader onSort={handleSort} />
          <TableBody>
            {filteredAndSortedCustomers.map(customer => (
              <CustomerTableRow
                key={customer.id}
                customer={customer}
                onRowClick={handleRowClick}
                onSelectCustomer={handleSelectCustomer}
                selectedCustomer={selectedCustomer}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
