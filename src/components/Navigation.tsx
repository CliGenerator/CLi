
import { Link, useLocation } from "react-router-dom";
import { Home, Map, Book, Lightbulb } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isMobile = useIsMobile();

  const links = [
    { path: "/", label: "Home", icon: Home },
    { path: "/resources", label: "Resources", icon: Book },
    { path: "/roadmaps", label: "Roadmaps", icon: Map },
    { path: "/learn", label: "Learn", icon: Lightbulb },
  ];

  return (
    <nav className={`flex items-center ${isMobile ? "flex-col space-y-2 w-full" : "space-x-1"}`}>
      {links.map((link) => {
        const isActive = currentPath === link.path;
        const LinkIcon = link.icon;
        
        return (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors hover:bg-primary/10 ${
              isMobile ? "w-full justify-center" : ""
            } ${
              isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"
            }`}
          >
            <LinkIcon className="w-4 h-4 mr-2" />
            <span className="inline">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
