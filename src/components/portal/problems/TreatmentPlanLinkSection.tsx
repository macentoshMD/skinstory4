import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const TreatmentPlanLinkSection = () => {
  return (
    <div className="border-t pt-6">
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-blue-900">Tillhörande behandlingsplan</h4>
            <p className="text-sm text-blue-800 mt-1">
              Se din personliga behandlingsplan för detta problem
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="border-blue-300 text-blue-700 hover:bg-blue-100"
            onClick={() => window.location.href = '/portal/behandlingsplan'}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Visa plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlanLinkSection;