import { Terminal, Github, Star, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import Navigation from "./Navigation";
import { Button } from "./ui/button";
import SignUpModal from "./SignUpModal";
import UserMenu from "./UserMenu";
import { useIsMobile } from "../hooks/use-mobile";

const Header = () => {
  const [starCount, setStarCount] = useState<number | null>(null);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const isMobile = useIsMobile();

  useEffect(() => {
    fetch("https://api.github.com/repos/CliGenerator/CLi")
      .then(response => response.json())
      .then(data => {
        if (data.stargazers_count) {
          setStarCount(data.stargazers_count);
        }
      })
      .catch(error => console.error("Error fetching star count:", error));
  }, []);

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed w-full z-50">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-4 gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            <span className="font-semibold">CLIGenerator</span>
          </Link>
        </div>
        
        {!isMobile && (
          <div className="flex-1 flex justify-center">
            <Navigation />
          </div>
        )}
        
        <div className="flex items-center gap-3">
          {!isMobile && (
            <>
              <a 
                href="https://github.com/CliGenerator/CLi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                <div className="flex items-center">
                  <Star className="h-3.5 w-3.5 fill-current mr-1" />
                  <span>{starCount !== null ? `${starCount.toLocaleString()}` : "..."}</span>
                </div>
              </a>
              
              {user ? (
                <UserMenu />
              ) : (
                <Button size="sm" className="gap-1.5" onClick={() => setSignUpOpen(true)}>
                  <span>Sign Up</span>
                </Button>
              )}
              
              <ThemeToggle />
            </>
          )}
          
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-auto"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>
      
      {isMobile && mobileMenuOpen && (
        <div className="px-4 py-2 border-t border-border/40 bg-background/95">
          <Navigation />
          <div className="mt-4 pt-4 border-t border-border/40 space-y-4">
            <a 
              href="https://github.com/shadcn/ui" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              <div className="flex items-center">
                <Star className="h-3.5 w-3.5 fill-current mr-1" />
                <span>{starCount !== null ? `${starCount.toLocaleString()}` : "..."}</span>
              </div>
            </a>
            
            <div className="flex justify-between items-center">
              <div>
                {user ? (
                  <UserMenu />
                ) : (
                  <Button size="sm" className="gap-1.5" onClick={() => setSignUpOpen(true)}>
                    <span>Sign Up</span>
                  </Button>
                )}
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
      
      <SignUpModal open={signUpOpen} onOpenChange={setSignUpOpen} />
    </header>
  );
};

export default Header;