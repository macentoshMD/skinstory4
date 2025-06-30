
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { CustomerFilters } from "@/types/customer";

interface CustomerTableFiltersProps {
  filters: CustomerFilters;
  setFilters: React.Dispatch<React.SetStateAction<CustomerFilters>>;
  uniqueCompanies: string[];
  uniqueTags: string[];
  uniqueAssignees: string[];
}

export function CustomerTableFilters({ 
  filters, 
  setFilters, 
  uniqueCompanies, 
  uniqueTags, 
  uniqueAssignees 
}: CustomerTableFiltersProps) {
  return (
    <div className="mt-6">
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          placeholder="Sök kunder efter namn, e-post, telefon, företag, taggar eller problem..."
          value={filters.search}
          onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
          className="pl-12 h-12 text-base bg-gray-50 border-gray-300 focus:bg-white focus:border-blue-500"
        />
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
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
    </div>
  );
}
