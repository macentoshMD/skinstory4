
import { Home, Users, ShoppingCart, Calendar, Building, Hospital, BarChart3, User, Calendar as CalendarIcon, DollarSign, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
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

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Kunder", href: "/kunder", icon: Users },
  { name: "Beställningar", href: "/bestallningar", icon: ShoppingCart },
  { name: "Bokningar", href: "/bokningar", icon: Calendar },
  { name: "Företag", href: "/foretag", icon: Building },
  { name: "Kliniker", href: "/kliniker", icon: Hospital },
  { name: "Statistik", href: "/statistik", icon: BarChart3 },
  { name: "Användare", href: "/anvandare", icon: User },
  { name: "Kalender", href: "/kalender", icon: CalendarIcon },
  { name: "Löner", href: "/loner", icon: DollarSign },
  { name: "Systeminställningar", href: "/systeminstallningar", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">SaaS MVP</h1>
      </div>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-gray-500 font-medium px-3 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-gray-100 text-gray-900"
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
      </SidebarContent>
    </Sidebar>
  );
}
