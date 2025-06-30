
import { useState, useMemo } from "react";
import { Customer, CustomerFilters, CustomerSort } from "@/types/customer";

export function useCustomerFiltering(customers: Customer[]) {
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

  // Get unique values for filters
  const uniqueCompanies = [...new Set(customers.map(c => c.company))];
  const uniqueTags = [...new Set(customers.flatMap(c => c.tags))];
  const uniqueAssignees = [...new Set(customers.map(c => c.userAssigned))];

  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = customers.filter(customer => {
      const matchesSearch = filters.search === "" || 
        customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        customer.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        customer.phone.toLowerCase().includes(filters.search.toLowerCase()) ||
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

  return {
    filters,
    setFilters,
    sort,
    handleSort,
    filteredAndSortedCustomers,
    uniqueCompanies,
    uniqueTags,
    uniqueAssignees
  };
}
