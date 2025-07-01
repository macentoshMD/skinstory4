import { ProblemStatus, ProblemSeverity } from '@/types/problem';

export const getProblemStatusData = (status: ProblemStatus) => {
  switch (status) {
    case 'Aktivt':
      return { 
        text: 'Aktivt', 
        color: 'bg-red-100 text-red-800 border-red-200', 
        iconType: 'alert',
        textColor: 'text-red-600'
      };
    case 'Förbättras':
      return { 
        text: 'Förbättras', 
        color: 'bg-green-100 text-green-800 border-green-200', 
        iconType: 'trending-up',
        textColor: 'text-green-600'
      };
    case 'Stabil':
      return { 
        text: 'Stabil', 
        color: 'bg-blue-100 text-blue-800 border-blue-200', 
        iconType: 'minus',
        textColor: 'text-blue-600'
      };
    case 'Löst':
      return { 
        text: 'Löst', 
        color: 'bg-purple-100 text-purple-800 border-purple-200', 
        iconType: 'check',
        textColor: 'text-purple-600'
      };
    case 'Försämras':
      return { 
        text: 'Försämras', 
        color: 'bg-orange-100 text-orange-800 border-orange-200', 
        iconType: 'trending-down',
        textColor: 'text-orange-600'
      };
    default:
      return { 
        text: 'Okänd', 
        color: 'bg-gray-100 text-gray-800 border-gray-200', 
        iconType: 'help',
        textColor: 'text-gray-600'
      };
  }
};

export const getProblemSeverityColor = (severity: ProblemSeverity) => {
  switch (severity) {
    case 'Lindrig':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Måttlig':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Svår':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const formatProblemAreas = (areas: Array<{region: string; subAreas?: string[]; isComplete?: boolean}>) => {
  return areas.map(area => {
    if (area.isComplete) {
      return `${area.region} - Hela`;
    } else if (area.subAreas && area.subAreas.length > 0) {
      return `${area.region} - ${area.subAreas.join(', ')}`;
    } else {
      return area.region;
    }
  }).join('; ');
};

export const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Inte fastställt';
  return new Date(dateString).toLocaleDateString('sv-SE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};