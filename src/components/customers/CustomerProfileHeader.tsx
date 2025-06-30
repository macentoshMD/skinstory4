
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Customer } from '@/types/customer';

interface CustomerProfileHeaderProps {
  customer: Customer;
}

export function CustomerProfileHeader({ customer }: CustomerProfileHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktiv':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'Potentiell':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'Inaktiv':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
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
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Avatar and Status */}
          <div className="space-y-3">
            <Avatar className="h-24 w-24">
              <AvatarImage src={customer.avatar} />
              <AvatarFallback className="text-xl font-semibold bg-gray-200">
                {customer.initials}
              </AvatarFallback>
            </Avatar>
            
            <Badge variant="secondary" className={getStatusColor(customer.status)}>
              {customer.status}
            </Badge>
          </div>

          {/* Name and Since */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
            <p className="text-gray-600">Since {formatDate(customer.created)}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            {customer.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-gray-100">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Change tags button */}
          <Button variant="outline" className="w-full max-w-xs">
            Change tags
          </Button>

          {/* Activities Section */}
          <div className="w-full pt-4 border-t">
            <h3 className="text-lg font-semibold mb-4 text-left">Activities</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Orders</span>
                <span className="font-medium">{customer.orders}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Treatments</span>
                <span className="font-medium">{customer.treatments}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last active</span>
                <span className="font-medium">{formatDate(customer.lastActivity)}</span>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className="w-full pt-4 border-t">
            <h3 className="text-lg font-semibold mb-4 text-left">Profile</h3>
            <div className="space-y-3">
              {customer.birthday && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Birthday</span>
                  <span className="font-medium">
                    {formatDate(customer.birthday)} ({calculateAge(customer.birthday)} y.o.)
                  </span>
                </div>
              )}
              {customer.gender && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Gender</span>
                  <span className="font-medium">{customer.gender}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Email</span>
                <span className="font-medium truncate max-w-[200px]" title={customer.email}>
                  {customer.email}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Phone</span>
                <span className="font-medium">{customer.phone}</span>
              </div>
            </div>
          </div>

          {/* User assigned Section */}
          <div className="w-full pt-4 border-t">
            <h3 className="text-lg font-semibold mb-4 text-left">User assigned</h3>
            <p className="text-gray-500 text-left">
              {customer.userAssigned || 'No user assigned yet'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
