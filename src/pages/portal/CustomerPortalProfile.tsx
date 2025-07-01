import { CustomerPortalLayout } from '@/components/portal/CustomerPortalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  User,
  Activity,
  AlertCircle
} from 'lucide-react';

const CustomerPortalProfile = () => {
  // Simple customer data
  const customerData = {
    name: 'Anna Andersson',
    email: 'anna.andersson@email.com',
    initials: 'AA',
    avatar: undefined
  };

  return (
    <CustomerPortalLayout customer={customerData}>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Min Profil</h1>
          <p className="text-muted-foreground">Hantera din profil och behandlingsinformation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Min Profil */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Min Profil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Grundläggande profilinformation kommer här</p>
            </CardContent>
          </Card>

          {/* Mina Problem */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Mina Problem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Hudproblem och områden kommer här</p>
            </CardContent>
          </Card>

          {/* Min Behandlingsplan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Min Behandlingsplan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Behandlingsplan och framsteg kommer här</p>
            </CardContent>
          </Card>

          {/* Min Historik */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Min Historik
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Behandlingshistorik kommer här</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </CustomerPortalLayout>
  );
};

export default CustomerPortalProfile;