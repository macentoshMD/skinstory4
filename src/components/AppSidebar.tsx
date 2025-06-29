
import { Home, Users, Calendar, Building, User, BarChart3, Settings, Sparkles, Clock, Activity } from "lucide-react";
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
  { name: "Insikter", href: "/insikter", icon: BarChart3 },
  { name: "Aktiviteter", href: "/aktiviteter", icon: Activity },
  { name: "Kunder", href: "/kunder", icon: Users },
  { name: "Behandlingar", href: "/behandlingar", icon: Sparkles },
  { name: "Personal", href: "/personal", icon: User },
  { name: "Företag", href: "/foretag", icon: Building },
  { name: "Statistik", href: "/statistik", icon: BarChart3 },
  { name: "Kalender", href: "/kalender", icon: Clock },
  { name: "Inställningar", href: "/installningar", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">SkinStory</h1>
        <p className="text-sm text-gray-500">Hudvårdsklinik</p>
      </div>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-gray-500 font-medium px-3 py-2">
            Huvudmeny
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
      </SidebarContent>
    </Sidebar>
  );
}
