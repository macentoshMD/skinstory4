
import { Button } from "@/components/ui/button";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { Customer } from "@/types/customer";

interface CustomerTableHeaderProps {
  onSort: (field: keyof Customer) => void;
}

export function CustomerTableHeader({ onSort }: CustomerTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[60px]"></TableHead>
        <TableHead>
          <Button variant="ghost" onClick={() => onSort('name')} className="h-auto p-0 font-medium">
            Namn <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        </TableHead>
        <TableHead>Kontakt</TableHead>
        <TableHead>
          <Button variant="ghost" onClick={() => onSort('status')} className="h-auto p-0 font-medium">
            Status <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        </TableHead>
        <TableHead>
          <Button variant="ghost" onClick={() => onSort('created')} className="h-auto p-0 font-medium">
            Created <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        </TableHead>
        <TableHead>
          <Button variant="ghost" onClick={() => onSort('lastActivity')} className="h-auto p-0 font-medium">
            Last Activity <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        </TableHead>
        <TableHead>
          <Button variant="ghost" onClick={() => onSort('orders')} className="h-auto p-0 font-medium">
            Orders <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        </TableHead>
        <TableHead>
          <Button variant="ghost" onClick={() => onSort('treatments')} className="h-auto p-0 font-medium">
            Treatments <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        </TableHead>
        <TableHead>Problems</TableHead>
        <TableHead>Tags</TableHead>
        <TableHead>User assigned</TableHead>
        <TableHead>
          <Button variant="ghost" onClick={() => onSort('value')} className="h-auto p-0 font-medium">
            Värde <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        </TableHead>
        <TableHead>Åtgärder</TableHead>
      </TableRow>
    </TableHeader>
  );
}
