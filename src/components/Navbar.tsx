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
import { Link, useLocation } from "react-router-dom";

const routes = [
  { name: "Services", path: "#about", id: 1 },
  { name: "About", path: "#about", id: 2 },
  { name: "Contact", path: "#contact", id: 3 },
];
const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <nav className="flex justify-between items-center py-4 px-6 border-b">
      <Link to="/">
        <div className="flex items-center space-x-1">
          <img src="/logo.png" alt="Typesight Logo" className="h-10 w-10" />
          <span className="font-bold text-xl">TYPESIGHT</span>
        </div>
      </Link>
      <div className="flex items-center space-x-6">
        {pathname === "/" && (
          <>
            {/* Desktop Navbar */}
            <div className="hidden sm:flex gap-4">
            <iframe src="https://ghbtns.com/github-btn.html?user=amitjimiwal&repo=TypeSight&type=star&size=large" width="70" height="30" title="GitHub"></iframe>
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
            {/* Mobile Navbar */}
            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                <iframe src="https://ghbtns.com/github-btn.html?user=amitjimiwal&repo=TypeSight&type=star&size=large" width="70" height="30" title="GitHub"></iframe>
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
                  <DropdownMenuItem key="pricing">
                    <Link
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-200"
                      to="/pricing"
                    >
                      Pricing
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
        <Link
          className="text-gray-600 hover:text-gray-900 dark:text-gray-200"
          to="/pricing"
        >
          Pricing
        </Link>
        <ModeToggle />
        {/* <Button
          className="bg-blue-600 text-white"
          onClick={() => {
            status
              ? user?.isEmailVerified
                ? navigate(`/dashboard/${user?.id}`)
                : navigate("/verify")
              : navigate("/signup");
          }}
        >
          Start
        </Button> */}
      </div>
    </nav>
  );
};

export default Navbar;
