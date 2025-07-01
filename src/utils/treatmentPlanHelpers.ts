import { TreatmentStatus } from '@/types/treatment-plan';

export const getTreatmentStatusData = (treatmentStatus: TreatmentStatus) => {
  switch (treatmentStatus) {
    case 'aktiv':
      return { text: 'Aktiv', color: 'bg-green-100 text-green-800 border-green-200', iconType: 'play' };
    case 'pågående':
      return { text: 'Pågående', color: 'bg-blue-100 text-blue-800 border-blue-200', iconType: 'clock' };
    case 'slutförd':
      return { text: 'Slutförd', color: 'bg-purple-100 text-purple-800 border-purple-200', iconType: 'check' };
    case 'pending':
      return { text: 'Väntar', color: 'bg-orange-100 text-orange-800 border-orange-200', iconType: 'pause' };
    default:
      return { text: 'Okänd', color: 'bg-gray-100 text-gray-800 border-gray-200', iconType: 'clock' };
  }
};

export const getSeverityColor = (severity: string) => {
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

export const getButtonTextForStatus = (treatmentStatus: TreatmentStatus) => {
  switch (treatmentStatus) {
    case 'slutförd':
      return 'Behandling slutförd';
    case 'pending':
      return 'Starta behandlingsplan';
    default:
      return 'Hantera behandlingsplan';
  }
};