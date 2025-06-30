
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    <div className="p-6 space-y-6">
      {/* Avatar and Status */}
      <div className="flex flex-col items-center space-y-3">
        <Avatar className="h-20 w-20">
          <AvatarImage src={customer.avatar} />
          <AvatarFallback className="text-lg font-semibold bg-gray-200">
            {customer.initials}
          </AvatarFallback>
        </Avatar>
        
        <Badge variant="secondary" className={getStatusColor(customer.status)}>
          {customer.status}
        </Badge>
      </div>

      {/* Name and Since */}
      <div className="text-center space-y-1">
        <h1 className="text-xl font-bold text-gray-900">{customer.name}</h1>
        <p className="text-sm text-gray-600">Since {formatDate(customer.created)}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 justify-center">
        {customer.tags.map((tag, index) => (
          <Badge key={index} variant="outline" className="bg-gray-100 text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Change tags button */}
      <Button variant="outline" className="w-full text-sm">
        Change tags
      </Button>

      {/* Activities Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Activities</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Orders</span>
            <span className="font-medium text-sm">{customer.orders}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Treatments</span>
            <span className="font-medium text-sm">{customer.treatments}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Last active</span>
            <span className="font-medium text-sm">{formatDate(customer.lastActivity)}</span>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Profile</h3>
        <div className="space-y-3">
          {customer.birthday && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Birthday</span>
              <span className="font-medium text-sm">
                {formatDate(customer.birthday)} ({calculateAge(customer.birthday)} y.o.)
              </span>
            </div>
          )}
          {customer.gender && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Gender</span>
              <span className="font-medium text-sm">{customer.gender}</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Email</span>
            <span className="font-medium text-sm truncate max-w-[120px]" title={customer.email}>
              {customer.email}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Phone</span>
            <span className="font-medium text-sm">{customer.phone}</span>
          </div>
        </div>
      </div>

      {/* User assigned Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">User assigned</h3>
        <p className="text-gray-500 text-sm">
          {customer.userAssigned || 'No user assigned yet'}
        </p>
      </div>
    </div>
  );
}
