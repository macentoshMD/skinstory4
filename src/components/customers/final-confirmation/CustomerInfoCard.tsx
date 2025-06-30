
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Phone, Mail } from 'lucide-react';

interface CustomerData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  gender: string;
  personalNumber: string;
}

interface CustomerInfoCardProps {
  customerData: CustomerData;
}

export function CustomerInfoCard({ customerData }: CustomerInfoCardProps) {
  return (
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
  );
}
