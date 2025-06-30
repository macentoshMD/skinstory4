
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera } from 'lucide-react';
import { PhotoDocumentation } from '@/types/consultation';

interface PhotoDocumentationCardProps {
  photos: PhotoDocumentation[];
}

export function PhotoDocumentationCard({ photos }: PhotoDocumentationCardProps) {
  if (photos.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-pink-600" />
          Fotodokumentation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.slice(0, 4).map(photo => (
            <div key={photo.id} className="relative">
              <img
                src={photo.url}
                alt="Konsultationsfoto"
                className="w-full h-24 object-cover rounded-lg"
              />
              <Badge className="absolute bottom-1 left-1 text-xs">
                {photo.category}
              </Badge>
            </div>
          ))}
          {photos.length > 4 && (
            <div className="flex items-center justify-center bg-gray-100 rounded-lg h-24">
              <span className="text-sm text-gray-600">+{photos.length - 4} bilder</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
