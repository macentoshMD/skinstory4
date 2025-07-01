
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TreatmentMethod, TREATMENT_METHODS } from '@/types/treatment-methods';

interface MethodSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMethodSelect: (method: TreatmentMethod) => void;
  selectedProblems?: string[];
}

export function MethodSelectionModal({
  isOpen,
  onClose,
  onMethodSelect,
  selectedProblems = []
}: MethodSelectionModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Alla metoder', color: 'bg-gray-100 text-gray-800' },
    { id: 'laser', name: 'Laser', color: 'bg-red-100 text-red-800' },
    { id: 'facial', name: 'Ansiktsbehandling', color: 'bg-green-100 text-green-800' },
    { id: 'light', name: 'Ljusterapi', color: 'bg-orange-100 text-orange-800' },
    { id: 'acne', name: 'Aknebehandling', color: 'bg-blue-100 text-blue-800' }
  ];

  const filteredMethods = selectedCategory === 'all' 
    ? TREATMENT_METHODS 
    : TREATMENT_METHODS.filter(method => method.category === selectedCategory);

  const handleMethodSelect = (method: TreatmentMethod) => {
    onMethodSelect(method);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Välj Behandlingsmetod</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-medium mb-3">Filtrera efter kategori</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="text-xs"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Method Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMethods.map(method => (
              <div
                key={method.id}
                className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                onClick={() => handleMethodSelect(method)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">{method.icon}</div>
                  <div>
                    <h4 className="font-medium">{method.name}</h4>
                    <Badge className={method.color} variant="secondary">
                      {method.category}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500">Tillgänglig utrustning:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {method.equipment.slice(0, 2).map(equipment => (
                        <Badge key={equipment} variant="outline" className="text-xs">
                          {equipment}
                        </Badge>
                      ))}
                      {method.equipment.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{method.equipment.length - 2} mer
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMethods.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Inga metoder hittades för den valda kategorin.
            </div>
          )}
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
