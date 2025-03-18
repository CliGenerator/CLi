import { useEffect, useState, useRef } from "react";
import { Feature, Framework, TemplatePreset } from "../utils/generateCommand";
import { ArrowRight, ExternalLink, Search, Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "./ui/use-toast";
import SignUpModal from "./SignUpModal";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type PresetTemplatesProps = {
  onSelectPreset: (framework: Framework, features: Feature[]) => void;
  scrollToCommand: () => void;
};

const PresetTemplates = ({ onSelectPreset, scrollToCommand }: PresetTemplatesProps) => {
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTemplates, setFilteredTemplates] = useState<TemplatePreset[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const presetTemplatesRef = useRef<HTMLDivElement>(null);

  // Import templates once we're in component context
  useEffect(() => {
    import("../utils/presetTemplates").then((module) => {
      setFilteredTemplates(module.presetTemplates);
    });
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    if (!user) return;
    
    const savedFavorites = localStorage.getItem('favoriteTemplates');
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);
        // Extract just the names for simple comparison
        const favoriteNames = parsed.map((fav: any) => fav.name);
        setFavorites(favoriteNames);
      } catch (e) {
        console.error("Failed to parse favorites:", e);
      }
    }
  }, [user]);

  // Filter templates based on search query
  useEffect(() => {
    import("../utils/presetTemplates").then((module) => {
      if (!searchQuery.trim()) {
        setFilteredTemplates(module.presetTemplates);
        return;
      }
  
      const query = searchQuery.toLowerCase();
      const filtered = module.presetTemplates.filter(
        template => 
          template.name.toLowerCase().includes(query) || 
          template.description.toLowerCase().includes(query) ||
          template.framework.toLowerCase().includes(query) ||
          template.features.some(feature => feature.toLowerCase().includes(query)) ||
          (template.category && template.category.toLowerCase().includes(query))
      );
      
      setFilteredTemplates(filtered);
    });
  }, [searchQuery]);

  const addToFavorites = (e: React.MouseEvent, preset: TemplatePreset) => {
    e.stopPropagation(); // Prevent card click event
    
    if (!user) {
      setSignUpOpen(true);
      return;
    }

    // Check if already in favorites
    if (favorites.includes(preset.name)) {
      toast({
        title: "Already saved",
        description: `"${preset.name}" is already in your favorites.`,
      });
      return;
    }

    // Create favorite object
    const newFavorite = {
      id: Date.now().toString(),
      name: preset.name,
      framework: preset.framework,
      features: preset.features,
      timestamp: Date.now(),
    };

    // Get existing favorites from localStorage
    const existingFavorites = localStorage.getItem("favoriteTemplates");
    let favoritesArray = [];

    if (existingFavorites) {
      try {
        favoritesArray = JSON.parse(existingFavorites);
      } catch (e) {
        console.error("Failed to parse favorites:", e);
      }
    }

    // Add new favorite and save back to localStorage
    favoritesArray.push(newFavorite);
    localStorage.setItem("favoriteTemplates", JSON.stringify(favoritesArray));
    setFavorites([...favorites, preset.name]);

    // Show toast
    toast({
      title: "Template saved!",
      description: `"${preset.name}" has been added to your favorites.`,
    });
  };

  // Get framework icon
  const getFrameworkIcon = (framework: Framework) => {
    switch(framework) {
      case 'react':
        return '⚛️';
      case 'next':
        return '▲';
      case 'vue':
        return '🟢';
      case 'nuxt':
        return '💚';
      case 'svelte':
        return '🔶';
      case 'solid':
        return '💠';
      default:
        return '🧩';
    }
  };

  const handleTemplateClick = (preset: TemplatePreset) => {
    setActivePreset(preset.id);
    onSelectPreset(preset.framework, preset.features);
    // Scroll to command section
    setTimeout(() => {
      scrollToCommand();
    }, 100);
  };

  const getCategoryIcon = (category?: string) => {
    switch(category) {
      case 'core':
        return '🔍';
      case 'ui':
        return '🎨';
      case 'payment':
        return '💰';
      case 'cloud':
        return '☁️';
      case 'ai':
        return '🤖';
      case '2025-trend':
        return '🚀';
      case 'architecture':
        return '🏛️';
      default:
        return '📦';
    }
  };

  const animateBorder = (id: string, hovering: boolean) => {
    setHoveredCard(hovering ? id : null);
  };

  return (
    <div className="w-full mb-8" ref={presetTemplatesRef}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Preset Templates
        </h3>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search templates..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((preset) => (
            <motion.div
              key={preset.id}
              className={cn(
                `p-6 rounded-xl hover-scale transition-all duration-300 cursor-pointer relative overflow-hidden group`,
                activePreset === preset.id ? "border-primary/30 bg-primary/5" : "border-transparent",
                "snake-border-container"
              )}
              onClick={() => handleTemplateClick(preset)}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => animateBorder(preset.id, true)}
              onMouseLeave={() => animateBorder(preset.id, false)}
            >
              {/* Snake Border Animation */}
              <div className={cn(
                "absolute inset-0 pointer-events-none",
                hoveredCard === preset.id ? "snake-border" : ""
              )} />
              
              <div className="absolute top-3 right-3 z-10">
                <button
                  className={`p-1.5 rounded-full ${
                    favorites.includes(preset.name)
                      ? "bg-primary/20 text-primary"
                      : "bg-muted/80 text-muted-foreground opacity-0 group-hover:opacity-100"
                  } transition-all duration-200`}
                  onClick={(e) => addToFavorites(e, preset)}
                  title={favorites.includes(preset.name) ? "Already in favorites" : "Add to favorites"}
                >
                  <Star className={`h-4 w-4 ${favorites.includes(preset.name) ? "fill-primary" : ""}`} />
                </button>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl" aria-hidden="true">{getFrameworkIcon(preset.framework)}</span>
                <h3 className="text-lg font-semibold">{preset.name}</h3>
                {preset.category && (
                  <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5 ml-auto flex items-center gap-1">
                    {getCategoryIcon(preset.category)}
                    {preset.category}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {preset.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {preset.framework}
                </span>
                {preset.features.slice(0, 2).map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
                {preset.features.length > 2 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                    +{preset.features.length - 2}
                  </span>
                )}
              </div>
              {preset.documentation && (
                <a 
                  href={preset.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-4 text-xs flex items-center text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Documentation
                </a>
              )}
              <div className="absolute bottom-4 right-4">
                <ArrowRight
                  className={`w-5 h-5 transition-opacity duration-200 ${
                    activePreset === preset.id ? "opacity-100" : "opacity-0"
                  } text-primary`}
                />
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-3 text-center py-12 text-muted-foreground">
            No templates found matching "{searchQuery}". Try a different search term.
          </div>
        )}
      </div>
      
      <SignUpModal open={signUpOpen} onOpenChange={setSignUpOpen} />
    </div>
  );
};

export default PresetTemplates;