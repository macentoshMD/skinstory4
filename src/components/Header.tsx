
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell, User, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [globalSearch, setGlobalSearch] = useState("");
  const [currentPortal, setCurrentPortal] = useState("Admin Portal");

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement global search functionality
    console.log("Global search:", globalSearch);
  };

  const handlePortalSwitch = (portal: string) => {
    setCurrentPortal(portal);
    // TODO: Implement portal switching logic
    console.log("Switching to:", portal);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Portal Switcher Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 h-10">
                <span className="font-medium">{currentPortal}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 bg-white border shadow-lg">
              <DropdownMenuLabel className="font-semibold">Växla Portal</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => handlePortalSwitch("Admin Portal")}
                className={currentPortal === "Admin Portal" ? "bg-blue-50 text-blue-700" : ""}
              >
                <div className="flex flex-col">
                  <span className="font-medium">Admin Portal</span>
                  <span className="text-sm text-gray-500">Fullständig systemadministration</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handlePortalSwitch("User Portal")}
                className={currentPortal === "User Portal" ? "bg-blue-50 text-blue-700" : ""}
              >
                <div className="flex flex-col">
                  <span className="font-medium">User Portal</span>
                  <span className="text-sm text-gray-500">Personal- och behandlingshantering</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handlePortalSwitch("Customer Portal")}
                className={currentPortal === "Customer Portal" ? "bg-blue-50 text-blue-700" : ""}
              >
                <div className="flex flex-col">
                  <span className="font-medium">Customer Portal</span>
                  <span className="text-sm text-gray-500">Kundinloggning och bokningar</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Global Search */}
          <div className="flex-1 max-w-2xl">
            <form onSubmit={handleGlobalSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Sök kunder, tjänster, personal..."
                value={globalSearch}
                onChange={e => setGlobalSearch(e.target.value)}
                className="pl-10 h-11 text-base w-full bg-gray-50 border-gray-300 focus:bg-white focus:border-blue-500"
              />
            </form>
          </div>
        </div>

        <div className="flex items-center gap-4 ml-6">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>
          
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-blue-500 text-white">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium text-gray-900">Admin</div>
              <div className="text-gray-500">Specialist</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
