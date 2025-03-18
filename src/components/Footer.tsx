
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-6 px-6 border-t border-border/30">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarImage src="https://pbs.twimg.com/profile_images/1901017595182247936/JkVtcRSv_400x400.jpg" alt="Founder" />
            <AvatarFallback>DEV</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium flex items-center">
              Founder: <span className="text-primary ml-1">✓</span> <a href="https://x.com/aadarshhx8/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">@aadarshhx8</a>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <a 
            href="https://discord.gg/developer-community" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Join Discord</span>
          </a>
          
          <a 
            href="https://github.com/devsetup/cli" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
