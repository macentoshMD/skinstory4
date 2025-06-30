
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Info, CheckCircle, X } from 'lucide-react';
import { ConsultationHeader } from './ConsultationHeader';
import { StepWrapper } from './StepWrapper';
import { getRelevantContraindications, getContraindicationContext } from '@/utils/contraindicationFiltering';
import { useState } from 'react';

interface ContraIndicationsStepProps {
  selectedContraindications: string[];
  selectedProblems: string[];
  onContraindicationToggle: (contraindicationId: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function ContraIndicationsStep({
  selectedContraindications,
  selectedProblems,
  onContraindicationToggle,
  onBack,
  onContinue
}: ContraIndicationsStepProps) {
  const relevantContraindications = getRelevantContraindications(selectedProblems);
  const contextMessage = getContraindicationContext(selectedProblems);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Group questions by type for better flow
  const questionGroups = [
    {
      title: "Mediciner",
      icon: "💊",
      questions: relevantContraindications.filter(c => 
        c.id.includes('retinoids') || c.id.includes('tetracycline') || 
        c.id.includes('hydrochlorothiazide') || c.id.includes('photosensitive')
      )
    },
    {
      title: "Hälsotillstånd",
      icon: "🏥", 
      questions: relevantContraindications.filter(c =>
        c.id.includes('pregnancy') || c.id.includes('breastfeeding') ||
        c.id.includes('diabetes') || c.id.includes('immunodeficiency') ||
        c.id.includes('bleeding_disorders')
      )
    },
    {
      title: "Hudförhållanden",
      icon: "✨",
      questions: relevantContraindications.filter(c =>
        c.id.includes('dermatitis') || c.id.includes('eczema') ||
        c.id.includes('herpes') || c.id.includes('wounds') ||
        c.id.includes('infection') || c.id.includes('cancer')
      )
    },
    {
      title: "Sol & Behandlingar",
      icon: "☀️",
      questions: relevantContraindications.filter(c =>
        c.id.includes('sunburn') || c.id.includes('spray_tan') ||
        c.id.includes('laser') || c.id.includes('peel') ||
        c.id.includes('fitzpatrick')
      )
    }
  ].filter(group => group.questions.length > 0);

  const currentGroup = questionGroups[Math.floor(currentQuestionIndex / 3)] || questionGroups[0];
  const questionIndexInGroup = currentQuestionIndex % 3;
  const currentQuestion = currentGroup?.questions[questionIndexInGroup];

  const totalQuestions = questionGroups.reduce((sum, group) => sum + group.questions.length, 0);
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswer = (answer: boolean) => {
    if (currentQuestion) {
      if (answer) {
        if (!selectedContraindications.includes(currentQuestion.id)) {
          onContraindicationToggle(currentQuestion.id);
        }
      } else {
        if (selectedContraindications.includes(currentQuestion.id)) {
          onContraindicationToggle(currentQuestion.id);
        }
      }
    }
    
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const isCurrentAnswered = currentQuestion ? 
    (selectedContraindications.includes(currentQuestion.id) ? 'yes' : 'no') : null;

  const getRiskLevel = () => {
    const selectedItems = relevantContraindications.filter(item => 
      selectedContraindications.includes(item.id)
    );
    
    if (selectedItems.some(item => item.severity === 'high')) return 'high';
    if (selectedItems.some(item => item.severity === 'medium')) return 'medium';
    if (selectedItems.length > 0) return 'low';
    return 'none';
  };

  const riskLevel = getRiskLevel();
  const canContinue = currentQuestionIndex >= totalQuestions - 1;

  if (!currentQuestion) {
    return (
      <div className="space-y-6">
        <ConsultationHeader
          onBack={onBack}
          onContinue={onContinue}
          canContinue={true}
          currentStep={8}
          totalSteps={9}
          continueText="Fortsätt"
        />
        <StepWrapper title="Inga kontraindikationer" subtitle="Inga relevanta frågor för dina valda behandlingar">
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Inga specifika kontraindikationer behöver kontrolleras för dina valda behandlingar.
            </AlertDescription>
          </Alert>
        </StepWrapper>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ConsultationHeader
        onBack={onBack}
        onContinue={canContinue ? onContinue : undefined}
        canContinue={canContinue}
        currentStep={8}
        totalSteps={9}
        continueText="Fortsätt"
      />

      <StepWrapper 
        title="Säkerhetsfrågor"
        subtitle={`${currentGroup.icon} ${currentGroup.title} - Fråga ${currentQuestionIndex + 1} av ${totalQuestions}`}
      >
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Framsteg</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Context Information */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            {contextMessage}
          </AlertDescription>
        </Alert>

        {/* Current Question */}
        <Card className="border-2 border-blue-200">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{currentQuestion.emoji}</div>
              <div>
                <CardTitle className="text-xl">{currentQuestion.name}</CardTitle>
                {currentQuestion.severity === 'high' && (
                  <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 mt-1">
                    Viktigt
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              {currentQuestion.description}
            </p>

            {/* Answer Buttons */}
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                variant={isCurrentAnswered === 'yes' ? 'default' : 'outline'}
                onClick={() => handleAnswer(true)}
                className={`px-8 py-4 ${
                  isCurrentAnswered === 'yes' 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'hover:bg-red-50 hover:border-red-300'
                }`}
              >
                <X className="w-5 h-5 mr-2" />
                Ja
              </Button>
              <Button
                size="lg"
                variant={isCurrentAnswered === 'no' ? 'default' : 'outline'}
                onClick={() => handleAnswer(false)}
                className={`px-8 py-4 ${
                  isCurrentAnswered === 'no' 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'hover:bg-green-50 hover:border-green-300'
                }`}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Nej
              </Button>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Föregående fråga
              </Button>
              <span className="text-sm text-gray-500 self-center">
                {currentQuestionIndex + 1} av {totalQuestions}
              </span>
              {currentQuestionIndex < totalQuestions - 1 && (
                <Button
                  variant="ghost"
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  disabled={!isCurrentAnswered}
                >
                  Nästa fråga
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment (shown when done) */}
        {canContinue && riskLevel !== 'none' && (
          <Alert className={`mt-6 ${
            riskLevel === 'high' ? 'border-red-200 bg-red-50' :
            riskLevel === 'medium' ? 'border-yellow-200 bg-yellow-50' :
            'border-blue-200 bg-blue-50'
          }`}>
            <AlertTriangle className={`h-4 w-4 ${
              riskLevel === 'high' ? 'text-red-600' :
              riskLevel === 'medium' ? 'text-yellow-600' :
              'text-blue-600'
            }`} />
            <AlertDescription className={
              riskLevel === 'high' ? 'text-red-800' :
              riskLevel === 'medium' ? 'text-yellow-800' :
              'text-blue-800'
            }>
              {riskLevel === 'high' && 'Vissa faktorer identifierade. Vi kommer att diskutera detta vidare.'}
              {riskLevel === 'medium' && 'Några faktorer att ta hänsyn till. Vi anpassar behandlingen därefter.'}
              {riskLevel === 'low' && 'Inga allvarliga hinder för behandling identifierade.'}
            </AlertDescription>
          </Alert>
        )}
      </StepWrapper>
    </div>
  );
}
