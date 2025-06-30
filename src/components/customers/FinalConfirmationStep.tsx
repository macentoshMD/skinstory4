
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ConsultationHeader } from './ConsultationHeader';
import { StepWrapper } from './StepWrapper';
import { CheckCircle, AlertTriangle, User, Calendar, Phone, Mail, MapPin, Activity, Stethoscope, Clock, Palette } from 'lucide-react';
import { DiagnosisData, GeneralDetailsData } from '@/types/consultation';

interface FinalConfirmationStepProps {
  customerName: string;
  customerData: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    gender: string;
    personalNumber: string;
  };
  diagnosisData: DiagnosisData;
  selectedAreas: string[];
  selectedZones: string[];
  riskLevel: string;
  selectedContraindications: string[];
  onBack: () => void;
  onFinish: () => void;
}

export function FinalConfirmationStep({
  customerName,
  customerData,
  diagnosisData,
  selectedAreas,
  selectedZones,
  riskLevel,
  selectedContraindications,
  onBack,
  onFinish
}: FinalConfirmationStepProps) {
  const getRiskColor = () => {
    switch (riskLevel) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getRiskText = () => {
    switch (riskLevel) {
      case 'high': return 'Hög risk - Läkarkonsultation rekommenderas';
      case 'medium': return 'Måttlig risk - Extra försiktighet krävs';
      case 'low': return 'Låg risk - Informera om faktorer';
      default: return 'Ingen känd risk';
    }
  };

  const getSkinStatusText = (status: string) => {
    switch (status) {
      case 'worse': return 'Sämre';
      case 'same': return 'Samma';
      case 'better': return 'Bättre';
      default: return 'Ej angivet';
    }
  };

  const getSkinTextureText = (texture: string) => {
    switch (texture) {
      case 'dry': return 'Torr';
      case 'oily': return 'Fet';
      case 'combination': return 'Blandhud';
      default: return 'Ej angivet';
    }
  };

  const getSkinSensitivityText = (sensitivity: string) => {
    switch (sensitivity) {
      case 'low': return 'Låg';
      case 'medium': return 'Medel';
      case 'high': return 'Hög';
      default: return 'Ej angivet';
    }
  };

  const formatSymptoms = () => {
    return diagnosisData.symptoms.map(symptom => {
      const symptomName = symptom.symptomId.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      return `${symptomName} (${symptom.severity}/5)`;
    }).join(', ');
  };

  return (
    <div className="space-y-6">
      <ConsultationHeader
        onBack={onBack}
        onContinue={onFinish}
        canContinue={true}
        currentStep={9}
        totalSteps={9}
        continueText="Slutför konsultation"
      />

      <StepWrapper 
        title="Slutför Konsultation"
        subtitle={`Detaljerad sammanfattning för ${customerName}`}
      >
        <div className="space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Kundinformation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p><span className="font-medium">Namn:</span> {customerData.firstName} {customerData.lastName}</p>
                  <p><span className="font-medium">Personnummer:</span> {customerData.personalNumber || 'Ej angivet'}</p>
                  <p><span className="font-medium">Kön:</span> {customerData.gender || 'Ej angivet'}</p>
                  <p><span className="font-medium">Födelsedatum:</span> {customerData.birthDay}/{customerData.birthMonth}/{customerData.birthYear}</p>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {customerData.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {customerData.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Problem Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-green-600" />
                Diagnos & Problemanalys
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Identifierade hudproblem:</h4>
                <div className="flex flex-wrap gap-2">
                  {diagnosisData.selectedProblems.map(problem => (
                    <Badge key={problem} variant="outline" className="bg-blue-50">
                      {problem}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {diagnosisData.problemSubcategory && (
                <div>
                  <h4 className="font-medium mb-2">Problemkategori:</h4>
                  <Badge variant="outline" className="bg-purple-50">
                    {diagnosisData.problemSubcategory}
                  </Badge>
                </div>
              )}

              {diagnosisData.symptoms.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Identifierade symptom:</h4>
                  <p className="text-sm text-gray-700">{formatSymptoms()}</p>
                </div>
              )}

              <div className="flex items-center gap-4">
                <div>
                  <h4 className="font-medium">Hudpoäng:</h4>
                  <div className="text-2xl font-bold text-blue-600">{diagnosisData.skinScore}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Treatment Areas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                Behandlingsområden
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Valda områden:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAreas.map(area => (
                    <Badge key={area} variant="outline" className="bg-purple-50">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {selectedZones.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Specifika zoner:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedZones.map(zone => (
                      <Badge key={zone} variant="outline" className="bg-indigo-50">
                        {zone}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* General Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-orange-600" />
                Allmän Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p><span className="font-medium">Problem började:</span> {diagnosisData.generalDetails.whenProblemStartsMonth} {diagnosisData.generalDetails.whenProblemStartsYear}</p>
                  <p><span className="font-medium">Nuvarande hudstatus:</span> {getSkinStatusText(diagnosisData.generalDetails.skinStatusAtMoment)}</p>
                  <p><span className="font-medium">Tidigare behandling:</span> {diagnosisData.generalDetails.treatProblemBefore === 'yes' ? 'Ja' : 'Nej'}</p>
                </div>
                <div className="space-y-2">
                  <p><span className="font-medium">Hudtextur:</span> {getSkinTextureText(diagnosisData.generalDetails.skinTexture)}</p>
                  <p><span className="font-medium">Hudkänslighet:</span> {getSkinSensitivityText(diagnosisData.generalDetails.skinSensitivity)}</p>
                </div>
              </div>
              
              {diagnosisData.generalDetails.treatProblemBefore === 'yes' && diagnosisData.generalDetails.treatmentDetails && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Tidigare behandlingsdetaljer:</h4>
                  <p className="text-sm text-gray-700">{diagnosisData.generalDetails.treatmentDetails}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {riskLevel === 'high' ? (
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
                Riskbedömning & Kontraindikationer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Badge className={getRiskColor()}>
                {getRiskText()}
              </Badge>
              
              {selectedContraindications.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Identifierade faktorer:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedContraindications.map(contraindication => (
                      <Badge key={contraindication} variant="outline" className="bg-yellow-50 text-yellow-800">
                        {contraindication.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {riskLevel === 'high' && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>Rekommendation:</strong> Konsultera med läkare innan behandling påbörjas. 
                    Vissa kontraindikationer kräver medicinsk bedömning.
                  </p>
                </div>
              )}
              
              {riskLevel === 'medium' && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Rekommendation:</strong> Anpassa behandlingen baserat på identifierade faktorer. 
                    Följ upp noga och informera kunden om risker.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-indigo-600" />
                Nästa steg
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Konsultation sparas i kundens journal
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Behandlingsplan skapas baserat på bedömning
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Uppföljning schemaläggs vid behov
                </li>
                {riskLevel === 'high' && (
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-red-600">Läkarkonsultation krävs före behandling</span>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </StepWrapper>
    </div>
  );
}
