import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Camera, User, Bot } from 'lucide-react';
import { PROBLEM_TYPES } from '@/types/problem-areas';
import { ProblemSelection } from './ProblemSelection';

interface ConsultationFlowProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
}

interface CustomerFormData {
  personalNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  gender: 'Female' | 'Male' | '';
  language: string;
  howFoundUs: string;
}

interface DiagnosisData {
  method: 'ai' | 'manual' | '';
  selectedProblems: string[];
  aiPhoto?: File;
}

export function ConsultationFlow({ isOpen, onClose, customerName }: ConsultationFlowProps) {
  const [step, setStep] = useState(1);
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
    aiPhoto: undefined
  });

  const handlePersonalNumberSubmit = () => {
    // Simulera att vi fyller i information baserat på personnummer
    const [firstName, lastName] = customerName.split(' ');
    setFormData(prev => ({
      ...prev,
      firstName: firstName || '',
      lastName: lastName || '',
      email: `${firstName?.toLowerCase()}.${lastName?.toLowerCase()}@email.se`,
      phone: '+46 70 123 45 67'
    }));
    setStep(2);
  };

  const handleCustomerFormSubmit = () => {
    console.log('Customer form submitted:', formData);
    setStep(3);
  };

  const handleDiagnosisMethodSelect = () => {
    if (diagnosisData.method === 'manual') {
      setStep(4); // Go to problem selection
    } else if (diagnosisData.method === 'ai') {
      // AI diagnosis - stay on current step (coming soon)
    }
  };

  const handleProblemToggle = (problemId: string) => {
    setDiagnosisData(prev => ({
      ...prev,
      selectedProblems: prev.selectedProblems.includes(problemId)
        ? prev.selectedProblems.filter(id => id !== problemId)
        : [...prev.selectedProblems, problemId]
    }));
  };

  const handleDiagnosisSubmit = () => {
    console.log('Diagnosis submitted:', diagnosisData);
    console.log('Full consultation data:', { customer: formData, diagnosis: diagnosisData });
    // Här skulle vi spara datan och gå vidare till nästa steg
    onClose();
  };

  const updateFormData = (field: keyof CustomerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateDiagnosisData = (field: keyof DiagnosisData, value: any) => {
    setDiagnosisData(prev => ({ ...prev, [field]: value }));
  };

  const toggleProblem = (problemId: string) => {
    setDiagnosisData(prev => ({
      ...prev,
      selectedProblems: prev.selectedProblems.includes(problemId)
        ? prev.selectedProblems.filter(id => id !== problemId)
        : [...prev.selectedProblems, problemId]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${step === 4 ? 'max-w-5xl' : 'max-w-2xl'} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle>
            {step === 4 ? 'Välj Hudproblem' : `Starta Konsultation - Steg ${step} av ${step === 4 ? 4 : 3}`}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center py-6">
              <h3 className="text-lg font-semibold mb-4">Ange personnummer för att hämta kundinformation</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="personalNumber">Personnummer</Label>
                  <Input
                    id="personalNumber"
                    placeholder="YYYYMMDD-XXXX"
                    value={formData.personalNumber}
                    onChange={(e) => updateFormData('personalNumber', e.target.value)}
                  />
                </div>
                <Button onClick={handlePersonalNumberSubmit} className="w-full">
                  Hämta information
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Customer</h3>
            
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-700">Customer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Second name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                    />
                  </div>
                </div>

                {/* Contacts section with blue border */}
                <Card className="border-2 border-blue-400">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-700 border-b border-dashed border-gray-400 pb-2">
                      Contacts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Birthday */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-700">Birthday</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Select value={formData.birthDay} onValueChange={(value) => updateFormData('birthDay', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 31 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select value={formData.birthMonth} onValueChange={(value) => updateFormData('birthMonth', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 
                          'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'].map((month, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select value={formData.birthYear} onValueChange={(value) => updateFormData('birthYear', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 80 }, (_, i) => {
                          const year = new Date().getFullYear() - i;
                          return (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gender */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-700">Gender</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => updateFormData('gender', value)}
                  className="grid grid-cols-2 gap-8"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Additional */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-700">Additional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Select value={formData.language} onValueChange={(value) => updateFormData('language', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="svenska">Svenska</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="arabic">العربية</SelectItem>
                      <SelectItem value="spanish">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={formData.howFoundUs} onValueChange={(value) => updateFormData('howFoundUs', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="How found us?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google</SelectItem>
                      <SelectItem value="social-media">Social Media</SelectItem>
                      <SelectItem value="friend">Vän/Bekant</SelectItem>
                      <SelectItem value="website">Hemsida</SelectItem>
                      <SelectItem value="other">Annat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 pt-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Tillbaka
              </Button>
              <Button onClick={handleCustomerFormSubmit} className="flex-1">
                Nästa: Välj problem
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Diagnos & Problem</h3>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Välj diagnosmetod</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={diagnosisData.method}
                  onValueChange={(value) => updateDiagnosisData('method', value)}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="ai" id="ai-diagnosis" />
                    <div className="flex items-center space-x-3 flex-1">
                      <Bot className="h-8 w-8 text-blue-600" />
                      <div>
                        <Label htmlFor="ai-diagnosis" className="text-base font-medium cursor-pointer">
                          AI Diagnos
                        </Label>
                        <p className="text-sm text-gray-600">Ta foto för automatisk hudanalys</p>
                        <p className="text-xs text-orange-600 font-medium">Coming soon</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="manual" id="manual-diagnosis" />
                    <div className="flex items-center space-x-3 flex-1">
                      <User className="h-8 w-8 text-green-600" />
                      <div>
                        <Label htmlFor="manual-diagnosis" className="text-base font-medium cursor-pointer">
                          Manuell diagnos
                        </Label>
                        <p className="text-sm text-gray-600">Välj problem manuellt från listan</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {diagnosisData.method === 'ai' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-orange-600">AI Diagnos - Coming Soon</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">AI-baserad hudanalys kommer snart!</p>
                    <p className="text-sm text-gray-500">
                      Funktionen för att ta foto och få automatisk diagnos är under utveckling.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-4 pt-4">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Tillbaka
              </Button>
              <Button 
                onClick={handleDiagnosisMethodSelect} 
                className="flex-1"
                disabled={!diagnosisData.method}
              >
                {diagnosisData.method === 'manual' ? 'Välj problem' : 'Fortsätt'}
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="p-0">
            <ProblemSelection
              selectedProblems={diagnosisData.selectedProblems}
              onProblemToggle={handleProblemToggle}
              onBack={() => setStep(3)}
              onContinue={handleDiagnosisSubmit}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
