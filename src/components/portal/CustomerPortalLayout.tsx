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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-bold text-foreground">
              SkinStory
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 ring-2 ring-primary/10">
                  <AvatarImage src={currentCustomer.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                    {currentCustomer.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-foreground">{currentCustomer.name}</p>
                  <p className="text-xs text-muted-foreground">{currentCustomer.email}</p>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card/50 backdrop-blur-sm border-b border-border/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-1 py-6 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {children}
      </main>
    </div>
  );
}