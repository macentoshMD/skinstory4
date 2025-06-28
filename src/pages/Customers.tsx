
import { useState } from "react";
import { CustomerStats } from "@/components/customers/CustomerStats";
import { CustomerTable } from "@/components/customers/CustomerTable";
import { AddCustomerDialog } from "@/components/customers/AddCustomerDialog";

// Mock customer data
const mockCustomers = [
  {
    id: 1,
    name: "Anna Andersson",
    company: "TechFlow AB",
    email: "anna@techflow.se",
    phone: "+46 70 123 4567",
    status: "Aktiv",
    lastActivity: "2024-06-27",
    value: "125 000 kr"
  },
  {
    id: 2,
    name: "Erik Johansson",
    company: "Design Studio Nordic",
    email: "erik@dsn.se",
    phone: "+46 70 234 5678",
    status: "Potentiell",
    lastActivity: "2024-06-25",
    value: "85 000 kr"
  },
  {
    id: 3,
    name: "Maria Larsson",
    company: "Green Energy Solutions",
    email: "maria@greenenergy.se",
    phone: "+46 70 345 6789",
    status: "Aktiv",
    lastActivity: "2024-06-28",
    value: "250 000 kr"
  },
  {
    id: 4,
    name: "Johan Petersson",
    company: "StartupHub",
    email: "johan@startuphub.se",
    phone: "+46 70 456 7890",
    status: "Inaktiv",
    lastActivity: "2024-06-20",
    value: "45 000 kr"
  }
];

const Customers = () => {
  const [customers] = useState(mockCustomers);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kunder</h1>
          <p className="text-gray-600 mt-2">Hantera dina kunder och kundrelationer</p>
        </div>
        <AddCustomerDialog />
      </div>

      <CustomerStats customers={customers} />
      <CustomerTable customers={customers} />
    </div>
  );
};

export default Customers;
