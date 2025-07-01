import { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Home, 
  User, 
  Activity, 
  Calendar, 
  History,
  LogOut
} from 'lucide-react';

interface CustomerPortalLayoutProps {
  children: ReactNode;
  customer?: {
    name: string;
    email: string;
    avatar?: string;
    initials: string;
  };
}

const navigationItems = [
  { to: '/portal', icon: Home, label: 'Hem', exact: true },
  { to: '/portal/profil', icon: User, label: 'Min Profil' },
  { to: '/portal/problem', icon: Activity, label: 'Mina Problem' },
  { to: '/portal/behandlingsplan', icon: Calendar, label: 'Behandlingsplan' },
  { to: '/portal/historik', icon: History, label: 'Historik' },
];

export function CustomerPortalLayout({ children, customer }: CustomerPortalLayoutProps) {
  const navigate = useNavigate();

  const defaultCustomer = {
    name: 'Anna Andersson',
    email: 'anna.andersson@email.com',
    initials: 'AA',
    avatar: undefined
  };

  const currentCustomer = customer || defaultCustomer;

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              SkinStory
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                  <AvatarImage src={currentCustomer.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs sm:text-sm">
                    {currentCustomer.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{currentCustomer.name}</p>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground p-1 sm:p-2"
              >
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-2 sm:px-4 lg:px-8">
          <div className="flex space-x-1 sm:space-x-4 overflow-x-auto scrollbar-hide">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`
                }
              >
                <item.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {children}
      </main>
    </div>
  );
}