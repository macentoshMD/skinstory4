
import { Home, Users, Calendar, Building, User, BarChart3, Settings, Sparkles, Clock, Activity, Target, Package, DollarSign, ChevronDown, Wallet, TimerIcon, UserCircle, GraduationCap } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useUserRole } from '@/contexts/UserRoleContext';
import { userTypes } from '@/state/userRole';

// Navigation configurations per user type
const navigationConfigs = {
  admin: {
    main: [
      { name: "Dashboard", href: "/", icon: Home },
      { name: "Insikter", href: "/insikter", icon: BarChart3 },
      { name: "Loggar", href: "/aktiviteter", icon: Activity },
      { name: "Kunder", href: "/kunder", icon: Users },
      { name: "Statistik", href: "/statistik", icon: BarChart3 },
      { name: "Kalender", href: "/kalender", icon: Clock },
    ],
    settings: [
      { name: "Tjänster", href: "/tjanster", icon: Sparkles },
      { name: "Lager", href: "/produkter", icon: Package },
      { name: "Problem & Områden", href: "/problem-omraden", icon: Target },
      { name: "Användare", href: "/personal", icon: User },
      { name: "Företag", href: "/foretag", icon: Building },
      { name: "Ekonomi", href: "/ekonomi", icon: DollarSign },
      { name: "Inställningar", href: "/installningar", icon: Settings },
    ]
  },
  klinikagare: {
    main: [
      { name: "Dashboard", href: "/", icon: Home },
      { name: "Insikter", href: "/insikter", icon: BarChart3 },
      { name: "Loggar", href: "/aktiviteter", icon: Activity },
      { name: "Kunder", href: "/kunder", icon: Users },
      { name: "Statistik", href: "/statistik", icon: BarChart3 },
      { name: "Kalender", href: "/kalender", icon: Clock },
    ],
    settings: [
      { name: "Lager", href: "/produkter", icon: Package },
      { name: "Användare", href: "/personal", icon: User },
      { name: "Företag", href: "/foretag", icon: Building },
      { name: "Ekonomi", href: "/ekonomi", icon: DollarSign },
      { name: "Inställningar", href: "/installningar", icon: Settings },
    ]
  },
  anstalld: {
    main: [
      { name: "Dashboard", href: "/", icon: Home },
      { name: "Kunder", href: "/kunder", icon: Users },
      { name: "Kalender", href: "/kalender", icon: Clock },
      { name: "Utbildning", href: "/utbildning", icon: GraduationCap },
      { name: "Lön", href: "/lon", icon: Wallet },
      { name: "Statistik", href: "/statistik", icon: BarChart3 },
    ],
    settings: [
      { name: "Profil", href: "/profil", icon: UserCircle },
      { name: "Kliniker", href: "/kliniker", icon: Building },
      { name: "Arbetstid", href: "/arbetstid", icon: TimerIcon },
    ]
  },
  konsult: {
    main: [
      { name: "Dashboard", href: "/", icon: Home },
      { name: "Kunder", href: "/kunder", icon: Users },
      { name: "Kalender", href: "/kalender", icon: Clock },
      { name: "Ekonomi", href: "/ekonomi", icon: DollarSign },
    ],
    settings: []
  },
  customer: {
    main: [],
    settings: []
  }
};

// User types are now defined in /state/userRole.ts

export function AppSidebar() {
  const { currentRole, setRole } = useUserRole();
  const navigate = useNavigate();

  const handleUserTypeChange = (userType: typeof userTypes[0]) => {
    setRole(userType.id);
    
    // Navigate to appropriate homepage for each user type
    switch (userType.id) {
      case 'customer':
        navigate('/portal');
        break;
      case 'admin':
        navigate('/');
        break;
      case 'klinikagare':
        navigate('/');
        break;
      case 'anstalld':
        navigate('/');
        break;
      case 'konsult':
        navigate('/');
        break;
      default:
        navigate('/');
    }
  };

  const getFilteredNavigation = () => {
    return navigationConfigs[currentRole.id as keyof typeof navigationConfigs] || navigationConfigs.admin;
  };

  const { main: filteredMainNav, settings: filteredSettingsNav } = getFilteredNavigation();
  return (
    <Sidebar className="border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">SkinStory</h1>
        <p className="text-sm text-gray-500">Hudvårdsklinik</p>
        
        {/* User Type Selector */}
        <div className="mt-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between text-sm bg-white hover:bg-gray-50 border-gray-200"
              >
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {currentRole.name}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-56 bg-white border border-gray-200 shadow-lg z-50"
              align="start"
            >
              {userTypes.map((userType) => (
                <DropdownMenuItem
                  key={userType.id}
                  onClick={() => handleUserTypeChange(userType)}
                  className="flex flex-col items-start p-3 hover:bg-gray-50 cursor-pointer"
                >
                  <span className="font-medium text-gray-900">{userType.name}</span>
                  <span className="text-xs text-gray-500">{userType.description}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {currentRole.id !== 'customer' && (
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-gray-500 font-medium px-3 py-2">
              Huvudmeny
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredMainNav.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          }`
                        }
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {filteredSettingsNav.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs uppercase tracking-wider text-gray-500 font-medium px-3 py-2">
                Inställningar
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {filteredSettingsNav.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.href}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              isActive
                                ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            }`
                          }
                        >
                          <item.icon className="h-5 w-5" />
                          {item.name}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>
      )}
    </Sidebar>
  );
}
