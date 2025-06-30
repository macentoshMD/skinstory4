import { useState } from 'react';
import { CustomerFormData, DiagnosisData, ContraIndicationsData } from '@/types/consultation';
import { useToast } from '@/hooks/use-toast';
import { CONTRAINDICATIONS } from '@/data/contraindications';

interface ConsultationData {
  customer: CustomerFormData;
  diagnosis: DiagnosisData;
  contraindications: ContraIndicationsData;
  selectedAreas: string[];
  selectedZones: string[];
  completedAt: Date;
}

export function useConsultationData(customerName: string, customerId?: string) {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<CustomerFormData>({
    personalNumber: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    gender: '',
    language: '',
    howFoundUs: ''
  });

  const [diagnosisData, setDiagnosisData] = useState<DiagnosisData>({
    method: '',
    selectedProblems: [],
    aiPhoto: undefined,
    problemSeverity: '',
    problemSubcategory: '',
    symptoms: [],
    skinScore: 0,
    generalDetails: {
      whenProblemStartsYear: '',
      whenProblemStartsMonth: '',
      skinStatusAtMoment: '',
      treatProblemBefore: '',
      treatmentDetails: '',
      skinTexture: '',
      skinSensitivity: ''
    }
  });

  const [contraindicationsData, setContraindicationsData] = useState<ContraIndicationsData>({
    selectedContraindications: [],
    riskLevel: 'none',
    notes: ''
  });

  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedZones, setSelectedZones] = useState<string[]>([]);

  const updateFormData = (field: keyof CustomerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateDiagnosisMethod = (method: 'ai' | 'manual') => {
    setDiagnosisData(prev => ({ ...prev, method }));
  };

  const updateProblemSubcategory = (subcategory: string) => {
    setDiagnosisData(prev => ({ ...prev, problemSubcategory: subcategory }));
  };

  const updateSymptomSeverity = (symptomId: string, severity: number) => {
    setDiagnosisData(prev => ({
      ...prev,
      symptoms: prev.symptoms.some(s => s.symptomId === symptomId)
        ? prev.symptoms.map(s => s.symptomId === symptomId ? { ...s, severity } : s)
        : [...prev.symptoms, { symptomId, severity }]
    }));
  };

  const updateSkinScore = (score: number) => {
    setDiagnosisData(prev => ({ ...prev, skinScore: score }));
  };

  const updateGeneralDetails = (field: keyof typeof diagnosisData.generalDetails, value: string) => {
    setDiagnosisData(prev => ({
      ...prev,
      generalDetails: { ...prev.generalDetails, [field]: value }
    }));
  };

  const handleProblemToggle = (problemId: string) => {
    setDiagnosisData(prev => ({
      ...prev,
      selectedProblems: prev.selectedProblems.includes(problemId)
        ? prev.selectedProblems.filter(id => id !== problemId)
        : [...prev.selectedProblems, problemId]
    }));
  };

  const updateContraindicationToggle = (contraindicationId: string) => {
    setContraindicationsData(prev => {
      const newSelected = prev.selectedContraindications.includes(contraindicationId)
        ? prev.selectedContraindications.filter(id => id !== contraindicationId)
        : [...prev.selectedContraindications, contraindicationId];
      
      // Calculate risk level
      const selectedItems = CONTRAINDICATIONS.filter(item => 
        newSelected.includes(item.id)
      );
      
      let riskLevel: 'none' | 'low' | 'medium' | 'high' = 'none';
      if (selectedItems.some(item => item.severity === 'high')) riskLevel = 'high';
      else if (selectedItems.some(item => item.severity === 'medium')) riskLevel = 'medium';
      else if (selectedItems.length > 0) riskLevel = 'low';
      
      return {
        ...prev,
        selectedContraindications: newSelected,
        riskLevel
      };
    });
  };

  const initializeCustomerData = () => {
    const [firstName, lastName] = customerName.split(' ');
    setFormData(prev => ({
      ...prev,
      firstName: firstName || '',
      lastName: lastName || '',
      email: `${firstName?.toLowerCase()}.${lastName?.toLowerCase()}@email.se`,
      phone: '+46 70 123 45 67'
    }));
  };

  const saveConsultation = () => {
    const consultationData: ConsultationData = {
      customer: formData,
      diagnosis: diagnosisData,
      contraindications: contraindicationsData,
      selectedAreas,
      selectedZones,
      completedAt: new Date()
    };
    
    console.log('Complete consultation data:', consultationData);
    
    if (customerId) {
      const savedConsultations = JSON.parse(localStorage.getItem('customer-consultations') || '{}');
      if (!savedConsultations[customerId]) {
        savedConsultations[customerId] = [];
      }
      savedConsultations[customerId].push(consultationData);
      localStorage.setItem('customer-consultations', JSON.stringify(savedConsultations));
      
      toast({
        title: "Konsultation sparad",
        description: `Konsultation för ${customerName} har sparats framgångsrikt.`,
        variant: "default"
      });
    }
  };

  return {
    formData,
    diagnosisData,
    contraindicationsData,
    selectedAreas,
    selectedZones,
    setSelectedAreas,
    setSelectedZones,
    updateFormData,
    updateDiagnosisMethod,
    updateProblemSubcategory,
    updateSymptomSeverity,
    updateSkinScore,
    updateGeneralDetails,
    handleProblemToggle,
    updateContraindicationToggle,
    initializeCustomerData,
    saveConsultation
  };
}
