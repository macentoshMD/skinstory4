
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DetailedTreatmentRecommendation } from '@/types/consultation';

interface ServiceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableServices: DetailedTreatmentRecommendation[];
  onServiceSelect: (service: DetailedTreatmentRecommendation) => void;
}

export function ServiceSelectionModal({ 
  isOpen, 
  onClose, 
  availableServices, 
  onServiceSelect 
}: ServiceSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredServices = availableServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    const matchesPriority = priorityFilter === 'all' || service.priority === priorityFilter;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const categories = [...new Set(availableServices.map(s => s.category))];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'essential': return 'bg-red-100 text-red-800 border-red-200';
      case 'recommended': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'optional': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'essential': return 'Nödvändig';
      case 'recommended': return 'Rekommenderad';
      case 'optional': return 'Valfri';
      default: return priority;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Välj Behandlingar</DialogTitle>
        </DialogHeader>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Sök behandlingar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla kategorier</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Prioritet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla prioriteter</SelectItem>
              <SelectItem value="essential">Nödvändig</SelectItem>
              <SelectItem value="recommended">Rekommenderad</SelectItem>
              <SelectItem value="optional">Valfri</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="border rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => onServiceSelect(service)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-sm group-hover:text-blue-600">{service.name}</h3>
                <Badge className={getPriorityColor(service.priority)}>
                  {getPriorityText(service.priority)}
                </Badge>
              </div>
              <p className="text-xs text-gray-600 mb-2">{service.category}</p>
              <p className="text-xs text-gray-700 mb-3 line-clamp-2">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{service.price} kr/session</span>
                <span className="text-xs text-gray-500">{service.sessions} sessioner</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Avbryt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
