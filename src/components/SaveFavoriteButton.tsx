
import { useState } from "react";
import { BookmarkCheck, Star } from "lucide-react";
import { Feature, Framework } from "../utils/generateCommand";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { useAuth } from "../context/AuthContext";
import SignUpModal from "./SignUpModal";

type SaveFavoriteButtonProps = {
  projectName: string;
  framework: Framework;
  features: Feature[];
};

const SaveFavoriteButton = ({ projectName, framework, features }: SaveFavoriteButtonProps) => {
  const [open, setOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSave = () => {
    if (!templateName.trim()) return;

    const newFavorite = {
      id: Date.now().toString(),
      name: templateName,
      framework,
      features,
      timestamp: Date.now(),
    };

    // Get existing favorites from localStorage
    const existingFavorites = localStorage.getItem("favoriteTemplates");
    let favorites = [];

    if (existingFavorites) {
      try {
        favorites = JSON.parse(existingFavorites);
      } catch (e) {
        console.error("Failed to parse favorites:", e);
      }
    }

    // Add new favorite and save back to localStorage
    favorites.push(newFavorite);
    localStorage.setItem("favoriteTemplates", JSON.stringify(favorites));

    // Reset and close dialog
    setTemplateName("");
    setOpen(false);
    setIsSaved(true);

    // Show toast
    toast({
      title: "Template saved!",
      description: `"${templateName}" has been added to your favorites.`,
    });
    
    // Reset the saved indicator after a delay
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  const handleClick = () => {
    if (user) {
      setOpen(true);
      setTemplateName(projectName || "My Template");
    } else {
      setSignUpOpen(true);
    }
  };

  return (
    <>
      <Button 
        variant={isSaved ? "secondary" : "outline"} 
        size="sm" 
        className={`gap-2 transition-all duration-300 ${isSaved ? "bg-primary/10 text-primary" : ""}`}
        onClick={handleClick}
      >
        {isSaved ? (
          <>
            <BookmarkCheck className="h-4 w-4" />
            <span>Saved!</span>
          </>
        ) : (
          <>
            <Star className="h-4 w-4" />
            <span>Save Template</span>
          </>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save Template</DialogTitle>
            <DialogDescription>
              Save your current configuration as a favorite template for later use.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder={projectName || "My Template"}
                className="col-span-3"
                autoFocus
              />
            </div>
            <div className="px-4">
              <p className="text-sm text-muted-foreground mb-2">Configuration:</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {framework}
                </span>
                {features.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!templateName.trim()}>
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SignUpModal open={signUpOpen} onOpenChange={setSignUpOpen} />
    </>
  );
};

export default SaveFavoriteButton;