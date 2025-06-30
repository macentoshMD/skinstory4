
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, Upload, X, Image as ImageIcon, Info } from 'lucide-react';
import { ConsultationHeader } from './ConsultationHeader';
import { StepWrapper } from './StepWrapper';
import { PhotoDocumentation } from '@/types/consultation';

interface PhotoDocumentationStepProps {
  photos: PhotoDocumentation[];
  onPhotosChange: (photos: PhotoDocumentation[]) => void;
  onBack: () => void;
  onContinue: () => void;
}

const PHOTO_CATEGORIES = [
  { id: 'before', name: 'Före-bilder', description: 'Bilder innan behandling' },
  { id: 'problem-area', name: 'Problemområden', description: 'Fokus på specifika områden' },
  { id: 'general', name: 'Allmänna', description: 'Övergripande dokumentation' },
] as const;

const PHOTO_ANGLES = [
  { id: 'front', name: 'Framifrån' },
  { id: 'left', name: 'Vänster profil' },
  { id: 'right', name: 'Höger profil' },
  { id: 'close-up', name: 'Närbild' },
] as const;

export function PhotoDocumentationStep({
  photos,
  onPhotosChange,
  onBack,
  onContinue
}: PhotoDocumentationStepProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newPhotos: PhotoDocumentation[] = [];
    
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const photo: PhotoDocumentation = {
          id: `photo-${Date.now()}-${Math.random()}`,
          file,
          url: URL.createObjectURL(file),
          category: 'general',
          angle: 'front',
          notes: '',
          timestamp: new Date()
        };
        newPhotos.push(photo);
      }
    });

    onPhotosChange([...photos, ...newPhotos]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handlePhotoUpdate = (photoId: string, updates: Partial<PhotoDocumentation>) => {
    onPhotosChange(photos.map(photo => 
      photo.id === photoId ? { ...photo, ...updates } : photo
    ));
  };

  const handlePhotoDelete = (photoId: string) => {
    const photoToDelete = photos.find(p => p.id === photoId);
    if (photoToDelete) {
      URL.revokeObjectURL(photoToDelete.url);
    }
    onPhotosChange(photos.filter(photo => photo.id !== photoId));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'before': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'problem-area': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'general': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <ConsultationHeader
        onBack={onBack}
        onContinue={onContinue}
        canContinue={true}
        currentStep={9}
        totalSteps={11}
        continueText="Fortsätt till behandlingsplan"
      />

      <StepWrapper 
        title="Fotodokumentation"
        subtitle="Ladda upp bilder för att dokumentera konsultationen"
      >
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            Lägg till bilder för att dokumentera kundens hudstatus. Detta hjälper med uppföljning och behandlingsplanering.
            Bilder sparas säkert och används endast för behandlingsändamål.
          </AlertDescription>
        </Alert>

        {/* Upload Area */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-blue-600" />
              Ladda upp bilder
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOver 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
            >
              <div className="flex flex-col items-center gap-4">
                <Upload className="h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    Dra och släpp bilder här
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    eller klicka för att välja filer
                  </p>
                </div>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                  id="photo-upload"
                />
                <Label
                  htmlFor="photo-upload"
                  className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Välj bilder
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photo Grid */}
        {photos.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={photo.url}
                    alt="Konsultationsfoto"
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => handlePhotoDelete(photo.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Badge 
                    className={`absolute top-2 left-2 ${getCategoryColor(photo.category)}`}
                  >
                    {PHOTO_CATEGORIES.find(c => c.id === photo.category)?.name}
                  </Badge>
                </div>
                
                <CardContent className="p-4 space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Kategori</Label>
                    <select
                      value={photo.category}
                      onChange={(e) => handlePhotoUpdate(photo.id, { 
                        category: e.target.value as PhotoDocumentation['category'] 
                      })}
                      className="w-full mt-1 p-2 border border-gray-200 rounded-md text-sm"
                    >
                      {PHOTO_CATEGORIES.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Vinkel</Label>
                    <select
                      value={photo.angle}
                      onChange={(e) => handlePhotoUpdate(photo.id, { 
                        angle: e.target.value as PhotoDocumentation['angle'] 
                      })}
                      className="w-full mt-1 p-2 border border-gray-200 rounded-md text-sm"
                    >
                      {PHOTO_ANGLES.map(angle => (
                        <option key={angle.id} value={angle.id}>
                          {angle.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Anteckningar</Label>
                    <Textarea
                      value={photo.notes}
                      onChange={(e) => handlePhotoUpdate(photo.id, { notes: e.target.value })}
                      placeholder="Lägg till anteckningar om bilden..."
                      className="mt-1 text-sm"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {photos.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Inga bilder uppladdade än</p>
            <p className="text-sm mt-1">Bilder hjälper till med behandlingsplanering och uppföljning</p>
          </div>
        )}
      </StepWrapper>
    </div>
  );
}
