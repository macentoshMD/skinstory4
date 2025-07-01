import { Badge } from '@/components/ui/badge';
import { ProductPackage } from '@/types/consultation';
import { DurationIndicator } from '../../products/DurationIndicator';

interface PackageInfoCardProps {
  package: ProductPackage;
}

export function PackageInfoCard({ package: pkg }: PackageInfoCardProps) {
  const getBrandColor = (brand: string) => {
    const colors: { [key: string]: string } = {
      'DAHL': 'bg-blue-500',
      'La Roche-Posay': 'bg-green-500',
      'SkinCeuticals': 'bg-purple-500',
      'The Ordinary': 'bg-orange-500',
      'CeraVe': 'bg-teal-500'
    };
    return colors[brand] || 'bg-gray-500';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'need': return 'bg-red-100 text-red-800 border-red-200';
      case 'good': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'nice': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'need': return 'MÅSTE HA';
      case 'good': return 'BRA ATT HA';
      case 'nice': return 'TREVLIGT';
      default: return priority;
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex gap-4">
        <div className={`w-20 h-20 rounded-lg flex items-center justify-center text-white font-bold ${getBrandColor(pkg.brand)}`}>
          {pkg.image ? (
            <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <span className="text-sm">PAKET</span>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-lg">{pkg.name}</h3>
            <Badge className={getPriorityColor(pkg.priority)}>
              {getPriorityText(pkg.priority)}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mb-1">{pkg.description}</p>
          <p className="text-xs text-gray-500 mb-2">{pkg.brand}</p>
          <DurationIndicator 
            duration={pkg.duration} 
            costPerMonth={pkg.costPerMonth}
          />
        </div>
      </div>
    </div>
  );
}