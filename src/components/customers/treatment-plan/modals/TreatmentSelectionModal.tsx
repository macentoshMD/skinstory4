import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DetailedTreatmentRecommendation } from '@/types/consultation';
import { TreatmentFilterBar } from '../treatments/TreatmentFilterBar';
import { EnhancedTreatmentCard } from '../treatments/EnhancedTreatmentCard';

interface TreatmentSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableTreatments: DetailedTreatmentRecommendation[];
  onTreatmentSelect: (treatment: DetailedTreatmentRecommendation) => void;
  selectedProblems?: string[];
}

export function TreatmentSelectionModal({ 
  isOpen, 
  onClose, 
  availableTreatments, 
  onTreatmentSelect,
  selectedProblems = []
}: TreatmentSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProblemFilters, setSelectedProblemFilters] = useState<string[]>([]);
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  // Auto-set problem filters based on diagnosis
  useEffect(() => {
    if (selectedProblems.length > 0) {
      setSelectedProblemFilters(selectedProblems);
    }
  }, [selectedProblems]);

  // Get available filter options from treatments
  const availableProblems = ['acne', 'rosacea', 'pigment', 'wrinkles', 'scars'];
  const availableMethods = ['Laser', 'LED', 'Peeling', 'HydraFacial', 'Microneedling'];
  const availableModels = ['Alma Hybrid', 'Nordlys', 'Fraxel', 'CO2 Laser', 'IPL'];

  // Enhanced treatment data with method and model information
  const enhancedTreatments = availableTreatments.map(treatment => ({
    ...treatment,
    method: getMethodFromTreatment(treatment),
    model: getModelFromTreatment(treatment),
    problems: getProblemsFromTreatment(treatment)
  }));

  function getMethodFromTreatment(treatment: DetailedTreatmentRecommendation): string {
    if (treatment.name.toLowerCase().includes('laser')) return 'Laser';
    if (treatment.name.toLowerCase().includes('led')) return 'LED';
    if (treatment.name.toLowerCase().includes('peeling')) return 'Peeling';
    if (treatment.name.toLowerCase().includes('hydrafacial')) return 'HydraFacial';
    if (treatment.name.toLowerCase().includes('microneedling')) return 'Microneedling';
    return 'Övrigt';
  }

  function getModelFromTreatment(treatment: DetailedTreatmentRecommendation): string {
    if (treatment.name.toLowerCase().includes('alma')) return 'Alma Hybrid';
    if (treatment.name.toLowerCase().includes('nordlys')) return 'Nordlys';
    if (treatment.name.toLowerCase().includes('fraxel')) return 'Fraxel';
    if (treatment.name.toLowerCase().includes('co2')) return 'CO2 Laser';
    return treatment.name;
  }

  function getProblemsFromTreatment(treatment: DetailedTreatmentRecommendation): string[] {
    const problems = [];
    const name = treatment.name.toLowerCase();
    const desc = treatment.description.toLowerCase();
    
    if (name.includes('akne') || desc.includes('akne')) problems.push('acne');
    if (name.includes('rosacea') || desc.includes('rosacea')) problems.push('rosacea');
    if (name.includes('pigment') || desc.includes('pigment')) problems.push('pigment');
    if (name.includes('rynk') || desc.includes('rynk')) problems.push('wrinkles');
    if (name.includes('ärr') || desc.includes('ärr')) problems.push('scars');
    
    return problems;
  }

  // Filter treatments based on all selected criteria
  const filteredTreatments = enhancedTreatments.filter(treatment => {
    const matchesSearch = treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProblems = selectedProblemFilters.length === 0 || 
                           selectedProblemFilters.some(problem => treatment.problems.includes(problem));
    
    const matchesMethods = selectedMethods.length === 0 || selectedMethods.includes(treatment.method);
    const matchesModels = selectedModels.length === 0 || selectedModels.includes(treatment.model);
    
    return matchesSearch && matchesProblems && matchesMethods && matchesModels;
  });

  const handleProblemToggle = (problem: string) => {
    setSelectedProblemFilters(prev => 
      prev.includes(problem) 
        ? prev.filter(p => p !== problem)
        : [...prev, problem]
    );
  };

  const handleMethodToggle = (method: string) => {
    setSelectedMethods(prev => 
      prev.includes(method) 
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };

  const handleModelToggle = (model: string) => {
    setSelectedModels(prev => 
      prev.includes(model) 
        ? prev.filter(m => m !== model)
        : [...prev, model]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedProblemFilters(selectedProblems); // Keep auto-set problems
    setSelectedMethods([]);
    setSelectedModels([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Välj Behandling</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Enhanced Filter Bar */}
          <TreatmentFilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedProblems={selectedProblemFilters}
            onProblemToggle={handleProblemToggle}
            selectedMethods={selectedMethods}
            onMethodToggle={handleMethodToggle}
            selectedModels={selectedModels}
            onModelToggle={handleModelToggle}
            availableProblems={availableProblems}
            availableMethods={availableMethods}
            availableModels={availableModels}
            onClearFilters={handleClearFilters}
            totalCount={enhancedTreatments.length}
            filteredCount={filteredTreatments.length}
          />

          {/* Enhanced Treatments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-h-[500px] overflow-y-auto p-1">
            {filteredTreatments.map(treatment => {
              console.log('Rendering treatment card:', treatment.name);
              return (
                <EnhancedTreatmentCard
                  key={treatment.id}
                  treatment={treatment}
                  onSelect={() => {
                    console.log('Treatment card clicked:', treatment.name);
                    onTreatmentSelect(treatment);
                  }}
                />
              );
            })}
          </div>

          {filteredTreatments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Inga behandlingar hittades med de valda filtren
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