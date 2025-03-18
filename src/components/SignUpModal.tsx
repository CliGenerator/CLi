
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Github, Loader2, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

type SignUpModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SignUpModal = ({ open, onOpenChange }: SignUpModalProps) => {
  const { login, isLoading } = useAuth();
  const [loggingProvider, setLoggingProvider] = useState<"github" | "google" | null>(null);

  const handleLogin = async (provider: "github" | "google") => {
    setLoggingProvider(provider);
    try {
      await login(provider);
      onOpenChange(false);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoggingProvider(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Create your account</DialogTitle>
          <DialogDescription>
            Sign up to save your favorite templates and access them anywhere.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-3 py-6">
          <Button
            variant="outline"
            className="w-full justify-between p-6 relative overflow-hidden group hover:border-primary/50"
            onClick={() => handleLogin("github")}
            disabled={isLoading}
          >
            <div className="absolute inset-0 w-3 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent -translate-x-full group-hover:translate-x-[1000px] transition-transform duration-700 ease-in-out" />
            <Github className="h-5 w-5 mr-2" />
            <span className="flex-1 text-left">Continue with GitHub</span>
            {loggingProvider === "github" && (
              <Loader2 className="h-5 w-5 animate-spin ml-2" />
            )}
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-between p-6 relative overflow-hidden group hover:border-primary/50"
            onClick={() => handleLogin("google")}
            disabled={isLoading}
          >
            <div className="absolute inset-0 w-3 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent -translate-x-full group-hover:translate-x-[1000px] transition-transform duration-700 ease-in-out" />
            <Mail className="h-5 w-5 mr-2" />
            <span className="flex-1 text-left">Continue with Google</span>
            {loggingProvider === "google" && (
              <Loader2 className="h-5 w-5 animate-spin ml-2" />
            )}
          </Button>
        </div>
        
        <div className="text-sm text-center text-muted-foreground pt-4 border-t">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
