import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/toggle-theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { useNavigate } from "react-router-dom";

const routes = [
  { name: "Services", path: "#about", id: 1 },
  { name: "About", path: "#about", id: 2 },
  { name: "Contact", path: "#contact", id: 3 },
];
const Navbar: React.FC = () => {
  const { status, user } = useAuthStatus();
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center py-4 px-8 border-b">
      <div className="flex items-center space-x-4">
        <img src="/logo.png" alt="Typesight Logo" className="h-10 w-10" />
        <span className="font-bold text-xl">TYPESIGHT</span>
      </div>
      <div className="flex items-center space-x-6">
        {/* Desktop Navbar */}
        <div className="hidden sm:flex gap-4">
          {routes.map((route) => (
            <a
              key={route.id}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-200"
              href={route.path}
            >
              {route.name}
            </a>
          ))}
        </div>
        <ModeToggle />
        {/* Mobile Navbar */}
        <div className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {routes.map((route) => (
                <DropdownMenuItem key={route.id}>
                  <a
                    key={route.id}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-200"
                    href={route.path}
                  >
                    {route.name}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button
          className="bg-blue-600 text-white"
          onClick={() => {
            status ? navigate(`/dashboard/${user?.id}`) : navigate("/signup");
          }}
        >
          {status ? "DashBoard" : "Join"}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
