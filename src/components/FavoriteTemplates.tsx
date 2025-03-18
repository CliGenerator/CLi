
import { useState, useEffect } from "react";
import { BookmarkIcon, Star, Trash } from "lucide-react";
import { Feature, Framework } from "../utils/generateCommand";
import { Button } from "./ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useAuth } from "../context/AuthContext";
import SignUpModal from "./SignUpModal";

type FavoriteTemplate = {
  id: string;
  name: string;
  framework: Framework;
  features: Feature[];
  timestamp: number;
};

type FavoriteTemplatesProps = {
  onSelectTemplate: (framework: Framework, features: Feature[]) => void;
};

const FavoriteTemplates = ({ onSelectTemplate }: FavoriteTemplatesProps) => {
  const [favorites, setFavorites] = useState<FavoriteTemplate[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteTemplates');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Failed to parse favorites:", e);
      }
    }
  }, []);

  const saveToLocalStorage = (updatedFavorites: FavoriteTemplate[]) => {
    localStorage.setItem('favoriteTemplates', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const removeFavorite = (id: string) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    saveToLocalStorage(updatedFavorites);
  };

  const loadTemplate = (template: FavoriteTemplate) => {
    onSelectTemplate(template.framework, template.features);
    setShowDialog(false);
  };

  const handleClick = () => {
    if (user) {
      setShowDialog(true);
    } else {
      setSignUpOpen(true);
    }
  };

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleClick}
          >
            <BookmarkIcon className="w-4 h-4" />
            <span>Favorites</span>
            {favorites.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Favorite Templates</DialogTitle>
            <DialogDescription>
              Your saved templates for quick access
            </DialogDescription>
          </DialogHeader>
          
          <div className="max-h-[60vh] overflow-y-auto pr-2 mt-4">
            {favorites.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Star className="w-10 h-10 mx-auto mb-2 opacity-20" />
                <p>You don't have any favorite templates yet.</p>
                <p className="text-sm">Save your configurations to use them later.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {favorites.map((favorite) => (
                  <div 
                    key={favorite.id} 
                    className="glass p-4 rounded-lg flex justify-between items-start hover-scale"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{favorite.name}</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {favorite.framework}
                        </span>
                        {favorite.features.slice(0, 3).map((feature) => (
                          <span
                            key={feature}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                          >
                            {feature}
                          </span>
                        ))}
                        {favorite.features.length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                            +{favorite.features.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => loadTemplate(favorite)}
                        className="h-8 w-8"
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeFavorite(favorite.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive/90"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <SignUpModal open={signUpOpen} onOpenChange={setSignUpOpen} />
    </>
  );
};

export default FavoriteTemplates;
