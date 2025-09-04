
import { Home, Users, Calendar, Building, User, BarChart3, Settings, Sparkles, Clock, Activity, Target, Package, DollarSign, ChevronDown } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
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

const mainNavigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Insikter", href: "/insikter", icon: BarChart3 },
  { name: "Loggar", href: "/aktiviteter", icon: Activity },
  { name: "Kunder", href: "/kunder", icon: Users },
  { name: "Statistik", href: "/statistik", icon: BarChart3 },
  { name: "Kalender", href: "/kalender", icon: Clock },
];

const settingsNavigation = [
  { name: "Tjänster", href: "/tjanster", icon: Sparkles },
  { name: "Produkter", href: "/produkter", icon: Package },
  { name: "Problem & Områden", href: "/problem-omraden", icon: Target },
  { name: "Användare", href: "/personal", icon: User },
  { name: "Företag", href: "/foretag", icon: Building },
  { name: "Ekonomi", href: "/ekonomi", icon: DollarSign },
  { name: "Inställningar", href: "/installningar", icon: Settings },
];

const userTypes = [
  { 
    id: 'admin', 
    name: 'Admin', 
    description: 'Full tillgång till alla funktioner',
    permissions: ['all']
  },
  { 
    id: 'klinikagare', 
    name: 'Klinikägare', 
    description: 'Hantera klinik och personal',
    permissions: ['clinic_management', 'staff_management', 'finances', 'reports']
  },
  { 
    id: 'anstalld', 
    name: 'Anställd', 
    description: 'Behandlingar och kundhantering',
    permissions: ['treatments', 'customers', 'bookings']
  },
  { 
    id: 'konsult', 
    name: 'Konsult/Egenföretagare', 
    description: 'Egna kunder och behandlingar',
    permissions: ['own_customers', 'own_treatments', 'own_bookings']
  },
  { 
    id: 'customer', 
    name: 'Kund Portal', 
    description: 'Kundinloggning och bokningar',
    permissions: ['customer_portal']
  }
];

export function AppSidebar() {
  const [currentUserType, setCurrentUserType] = useState(userTypes[0]);
  const navigate = useNavigate();

  const handleUserTypeChange = (userType: typeof userTypes[0]) => {
    setCurrentUserType(userType);
    if (userType.id === 'customer') {
      navigate('/portal');
    }
  };

  const getFilteredNavigation = () => {
    if (currentUserType.id === 'admin') {
      return { main: mainNavigation, settings: settingsNavigation };
    }
    
    if (currentUserType.id === 'klinikagare') {
      return {
        main: mainNavigation,
        settings: settingsNavigation.filter(item => 
          !['Problem & Områden', 'Tjänster'].includes(item.name)
        )
      };
    }
    
    if (currentUserType.id === 'anstalld') {
      return {
        main: mainNavigation.filter(item => 
          ['Dashboard', 'Kunder', 'Kalender'].includes(item.name)
        ),
        settings: settingsNavigation.filter(item => 
          ['Användare'].includes(item.name)
        )
      };
    }
    
    if (currentUserType.id === 'konsult') {
      return {
        main: mainNavigation.filter(item => 
          ['Dashboard', 'Kunder', 'Kalender', 'Ekonomi'].includes(item.name)
        ),
        settings: []
      };
    }
    
    if (currentUserType.id === 'customer') {
      return { main: [], settings: [] };
    }
    
    return { main: mainNavigation, settings: settingsNavigation };
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
                  {currentUserType.name}
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
      
      {currentUserType.id !== 'customer' && (
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
