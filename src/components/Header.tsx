
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useUserRole } from '@/contexts/UserRoleContext';

export function Header() {
  const [globalSearch, setGlobalSearch] = useState("");
  const { currentRole } = useUserRole();

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement global search functionality
    console.log("Global search:", globalSearch);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
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
              <div className="font-medium text-gray-900">{currentRole.name}</div>
              <div className="text-gray-500">{currentRole.description}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
