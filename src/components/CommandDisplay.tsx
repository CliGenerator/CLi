
import { useState, useEffect, useRef } from "react";
import { Copy, Check, Terminal, Edit, Save, X, Code, ChevronDown, ChevronUp, ExternalLink, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Feature, Framework, getPostInstallationSteps, getDocumentationLinks } from "../utils/generateCommand";
import { Avatar, AvatarImage } from "./ui/avatar";

type CommandDisplayProps = {
  command: string;
  framework: Framework;
  features: Feature[];
};

type PackageManager = "npm" | "yarn" | "pnpm";

const CommandDisplay = ({ command, framework, features }: CommandDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const [focused, setFocused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCommand, setEditedCommand] = useState(command);
  const [showPostInstall, setShowPostInstall] = useState(false);
  const [packageManager, setPackageManager] = useState<PackageManager>("npm");
  const commandRef = useRef<HTMLDivElement>(null);
  
  const postInstallSteps = getPostInstallationSteps(framework, features);
  const documentationLinks = getDocumentationLinks(framework, features);
  const hasPostInstallSteps = postInstallSteps.length > 0 || documentationLinks.length > 0;

  // Update command when package manager changes
  useEffect(() => {
    if (!isEditing) {
      let updatedCommand = command;
      
      // Replace the package manager in the command
      if (packageManager === "yarn") {
        updatedCommand = updatedCommand.replace(/npm create/g, "yarn create");
        updatedCommand = updatedCommand.replace(/npx create/g, "yarn create");
      } else if (packageManager === "pnpm") {
        updatedCommand = updatedCommand.replace(/npm create/g, "pnpm create");
        updatedCommand = updatedCommand.replace(/npx create/g, "pnpm create");
      }
      
      setEditedCommand(updatedCommand);
    }
  }, [packageManager, command, isEditing]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(isEditing ? editedCommand : (packageManager === "npm" ? command : editedCommand));
      setCopied(true);
      toast({
        title: "Command copied!",
        description: "The command has been copied to your clipboard.",
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard. Try again.",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setIsEditing(false);
      toast({
        title: "Command updated",
        description: "Your custom command has been saved.",
        duration: 2000,
      });
    } else {
      // Start editing
      setEditedCommand(packageManager === "npm" ? command : editedCommand);
      setIsEditing(true);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditedCommand(packageManager === "npm" ? command : editedCommand);
  };

  // Reset edited command when original command changes
  useEffect(() => {
    if (!isEditing) {
      if (packageManager === "npm") {
        setEditedCommand(command);
      } else {
        // Apply package manager transformation
        let updatedCommand = command;
        if (packageManager === "yarn") {
          updatedCommand = updatedCommand.replace(/npm create/g, "yarn create");
          updatedCommand = updatedCommand.replace(/npx create/g, "yarn create");
        } else if (packageManager === "pnpm") {
          updatedCommand = updatedCommand.replace(/npm create/g, "pnpm create");
          updatedCommand = updatedCommand.replace(/npx create/g, "pnpm create");
        }
        setEditedCommand(updatedCommand);
      }
    }
  }, [command, isEditing, packageManager]);

  return (
    <div className="w-full mt-8" id="command-section" ref={commandRef}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-muted-foreground">
          Generated Command
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md overflow-hidden border border-input">
            <button
              onClick={() => setPackageManager("npm")}
              className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                packageManager === "npm" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-background hover:bg-accent"
              }`}
            >
              npm
            </button>
            <button
              onClick={() => setPackageManager("yarn")}
              className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                packageManager === "yarn" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-background hover:bg-accent"
              }`}
            >
              yarn
            </button>
            <button
              onClick={() => setPackageManager("pnpm")}
              className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                packageManager === "pnpm" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-background hover:bg-accent"
              }`}
            >
              pnpm
            </button>
          </div>
          
          {isEditing ? (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={cancelEdit}
                className="h-8 px-2 text-destructive hover:text-destructive/90"
              >
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditToggle}
                className="h-8 px-2"
              >
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEditToggle}
              className="h-8 px-2"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          )}
        </div>
      </div>
      <div 
        className={`glass p-4 rounded-xl flex items-start transition-all duration-300 ${
          focused ? "ring-2 ring-primary/20" : ""
        } ${isEditing ? "bg-background/80" : ""}`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        tabIndex={0}
      >
        <Terminal className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-1" />
        
        {isEditing ? (
          <textarea
            value={editedCommand}
            onChange={(e) => setEditedCommand(e.target.value)}
            className="font-mono text-sm bg-transparent border-none outline-none focus:ring-0 flex-grow resize-none min-h-[60px] py-1"
            autoFocus
          />
        ) : (
          <div 
            className="font-mono text-sm text-foreground overflow-x-auto whitespace-pre-wrap flex-grow py-1"
          >
            {packageManager === "npm" ? command : editedCommand}
          </div>
        )}
        
        <button
          onClick={copyToClipboard}
          className="ml-3 p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-200 flex-shrink-0"
          aria-label="Copy command to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {hasPostInstallSteps && (
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowPostInstall(!showPostInstall)}
            className="w-full flex justify-between items-center text-muted-foreground hover:text-foreground"
          >
            <div className="flex items-center">
              <Code className="w-4 h-4 mr-2" />
              Documentation & Setup
            </div>
            {showPostInstall ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          
          {showPostInstall && (
            <div className="mt-2 space-y-4">
              {/* Documentation Links */}
              {documentationLinks.length > 0 && (
                <div className="p-4 bg-muted/20 rounded-xl">
                  <h4 className="text-sm font-medium mb-3">Official Documentation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {documentationLinks.map((link, index) => (
                      <a 
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-2 rounded-md hover:bg-primary/10 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-2 text-primary" />
                        <span className="text-sm">{link.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Post Installation Steps if any */}
              {postInstallSteps.length > 0 && (
                <div className="p-4 bg-muted/20 rounded-xl font-mono text-xs overflow-x-auto whitespace-pre">
                  <h4 className="text-sm font-medium mb-3 font-sans">Quick Setup Steps</h4>
                  {postInstallSteps.map((step, index) => (
                    <div key={index} className="mb-1">
                      {step}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      <div className="flex flex-col items-center mt-10 mb-4">
        <p className="text-xs text-muted-foreground mb-8 flex justify-between">
          <span>Copy and paste this command into your terminal to create your project</span>
          {isEditing && (
            <span className="text-primary">You can customize the command before copying</span>
          )}
        </p>
        
        <div className="flex items-center justify-center gap-3">
          <Avatar className="h-10 w-10 rounded-full border border-border">
            <AvatarImage src="https://pbs.twimg.com/profile_images/1767217770876375040/xInW2nLo_400x400.jpg" alt="Founder" />
          </Avatar>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Founder:</p>
            <a 
              href="https://x.com/aadarshhx8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-primary hover:text-primary/80 text-sm transition-colors"
            >
              <Twitter className="w-4 h-4" />
              @aadarshhx8
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandDisplay;