
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: "github" | "google";
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (provider: "github" | "google") => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is logged in when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("devsetup_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Simulate login with GitHub or Google
  const login = async (provider: "github" | "google") => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user data based on provider
      const newUser: User = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        name: provider === "github" ? "GitHub User" : "Google User",
        email: `user_${Math.random().toString(36).substr(2, 9)}@example.com`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
        provider,
      };
      
      // Save user to localStorage
      localStorage.setItem("devsetup_user", JSON.stringify(newUser));
      setUser(newUser);
      
      toast({
        title: "Logged in successfully",
        description: `Welcome, ${newUser.name}!`,
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    
    // Update localStorage
    localStorage.setItem("devsetup_user", JSON.stringify(updatedUser));
    
    // Update state
    setUser(updatedUser);
  };

  const logout = () => {
    localStorage.removeItem("devsetup_user");
    localStorage.removeItem("favoriteTemplates");
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
