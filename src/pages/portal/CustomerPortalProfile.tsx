import { CustomerPortalLayout } from '@/components/portal/CustomerPortalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Edit, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin,
  User
} from 'lucide-react';

const CustomerPortalProfile = () => {
  // Mock customer data
  const customerData = {
    name: 'Anna Andersson',
    email: 'anna.andersson@email.com',
    phone: '+46 70 123 45 67',
    birthday: '1990-05-15',
    gender: 'Kvinna',
    address: 'Storgatan 123, 114 55 Stockholm',
    memberSince: '2023-02-15',
    avatar: undefined,
    initials: 'AA',
    tags: ['Premium kund', 'Akne-behandling', 'Regelbunden'],
    skinType: 'Kombinerad hud',
    allergies: ['Parfym', 'Lanolin'],
    currentProblems: ['Akne', 'Ojämn hudton', 'Förstorade porer'],
    preferredTherapist: 'Maria Svensson',
    notes: 'Föredrar morgonbehandlingar. Känslig för starka produkter.'
  };

  const calculateAge = (birthday: string) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sv-SE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <CustomerPortalLayout customer={customerData}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Min Profil</h1>
          <Button className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Redigera profil
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={customerData.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl">
                    {customerData.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-center space-y-2">
                  <h2 className="text-xl font-bold">{customerData.name}</h2>
                  <p className="text-muted-foreground">{calculateAge(customerData.birthday)} år</p>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {customerData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="w-full pt-4 border-t space-y-3">
                  <p className="text-sm text-muted-foreground text-center">
                    Kund sedan {formatDate(customerData.memberSince)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information & Personal Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Kontaktuppgifter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">E-post</label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{customerData.email}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Telefon</label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{customerData.phone}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Adress</label>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{customerData.address}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personlig information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Födelsedag</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(customerData.birthday)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Kön</label>
                    <span>{customerData.gender}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Hudtyp</label>
                    <span>{customerData.skinType}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Föredragen terapeut</label>
                    <span>{customerData.preferredTherapist}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skin Information */}
            <Card>
              <CardHeader>
                <CardTitle>Hudinformation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Nuvarande hudproblem</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {customerData.currentProblems.map((problem, index) => (
                        <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          {problem}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Allergier & Intoleranser</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {customerData.allergies.map((allergy, index) => (
                        <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Anteckningar</label>
                    <p className="text-sm text-gray-700 mt-1 p-3 bg-gray-50 rounded-lg">
                      {customerData.notes}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalProfile;