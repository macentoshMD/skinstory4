
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowUpDown, Download, Upload, Eye, Edit } from "lucide-react";
import { Customer, CustomerFilters, CustomerSort } from "@/types/customer";
import { CustomerDetailsDialog } from "./CustomerDetailsDialog";

interface EnhancedCustomerTableProps {
  customers: Customer[];
}

export function EnhancedCustomerTable({ customers }: EnhancedCustomerTableProps) {
  const [filters, setFilters] = useState<CustomerFilters>({
    search: "",
    status: "alla",
    company: "alla", 
    tag: "alla",
    userAssigned: "alla"
  });
  
  const [sort, setSort] = useState<CustomerSort>({
    field: 'name',
    direction: 'asc'
  });

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Get unique values for filters
  const uniqueCompanies = [...new Set(customers.map(c => c.company))];
  const uniqueTags = [...new Set(customers.flatMap(c => c.tags))];
  const uniqueAssignees = [...new Set(customers.map(c => c.userAssigned))];

  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = customers.filter(customer => {
      const matchesSearch = filters.search === "" || 
        customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        customer.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        customer.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        customer.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase())) ||
        customer.problems.some(problem => problem.toLowerCase().includes(filters.search.toLowerCase()));

      const matchesStatus = filters.status === "alla" || customer.status === filters.status;
      const matchesCompany = filters.company === "alla" || customer.company === filters.company;
      const matchesTag = filters.tag === "alla" || customer.tags.includes(filters.tag);
      const matchesAssignee = filters.userAssigned === "alla" || customer.userAssigned === filters.userAssigned;

      return matchesSearch && matchesStatus && matchesCompany && matchesTag && matchesAssignee;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sort.direction === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sort.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

    return filtered;
  }, [customers, filters, sort]);

  const handleSort = (field: keyof Customer) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

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
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Customers - {filteredAndSortedCustomers.length}</CardTitle>
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
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="relative min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Sök kunder..."
              value={filters.search}
              onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="pl-10"
            />
          </div>

          <Select value={filters.status} onValueChange={value => setFilters(prev => ({ ...prev, status: value }))}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alla">Alla statusar</SelectItem>
              <SelectItem value="Aktiv">Aktiv</SelectItem>
              <SelectItem value="Potentiell">Potentiell</SelectItem>
              <SelectItem value="Inaktiv">Inaktiv</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.company} onValueChange={value => setFilters(prev => ({ ...prev, company: value }))}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Företag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alla">Alla företag</SelectItem>
              {uniqueCompanies.map(company => (
                <SelectItem key={company} value={company}>{company}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.tag} onValueChange={value => setFilters(prev => ({ ...prev, tag: value }))}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Taggar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alla">Alla taggar</SelectItem>
              {uniqueTags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.userAssigned} onValueChange={value => setFilters(prev => ({ ...prev, userAssigned: value }))}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Specialist" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alla">Alla specialister</SelectItem>
              {uniqueAssignees.map(assignee => (
                <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]"></TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('name')} className="h-auto p-0 font-medium">
                  Namn <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>E-post</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('status')} className="h-auto p-0 font-medium">
                  Status <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('orders')} className="h-auto p-0 font-medium">
                  Orders <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('treatments')} className="h-auto p-0 font-medium">
                  Treatments <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Problems</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>User assigned</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('value')} className="h-auto p-0 font-medium">
                  Värde <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Åtgärder</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedCustomers.map(customer => (
              <TableRow key={customer.id} className="hover:bg-gray-50">
                <TableCell>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs font-medium bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                      {customer.initials}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell className="text-sm text-gray-600">{customer.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(customer.status)}>
                    {customer.status}
                  </Badge>
                </TableCell>
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
                <TableCell>
                  <div className="flex gap-1">
                    <CustomerDetailsDialog
                      customer={customer}
                      onSelect={handleSelectCustomer}
                      selectedCustomer={selectedCustomer}
                    />
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
