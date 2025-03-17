
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FeatureSelect from "../components/FeatureSelect";
import CommandDisplay from "../components/CommandDisplay";
import PresetTemplates from "../components/PresetTemplates";
import QuickStart from "../components/QuickStart";
import FAQ from "../components/FAQ";
import FavoriteTemplates from "../components/FavoriteTemplates";
import SaveFavoriteButton from "../components/SaveFavoriteButton";
import GridBackground from "../components/GridBackground";
import ScrollToTop from "../components/ScrollToTop";
import { Feature, Framework, generateCommand } from "../utils/generateCommand";
import { ArrowDown, Box, ChevronDown, Terminal, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const frameworks: { id: Framework; name: string; description: string }[] = [
  { 
    id: "react", 
    name: "React", 
    description: "A JavaScript library for building user interfaces" 
  },
  { 
    id: "next", 
    name: "Next.js", 
    description: "The React framework for production" 
  },
  { 
    id: "vue", 
    name: "Vue", 
    description: "The progressive JavaScript framework" 
  },
  { 
    id: "nuxt", 
    name: "Nuxt", 
    description: "The intuitive Vue framework" 
  },
  { 
    id: "svelte", 
    name: "Svelte", 
    description: "Cybernetically enhanced web apps" 
  },
  { 
    id: "solid", 
    name: "SolidJS", 
    description: "Simple and performant reactivity for building user interfaces" 
  },
];

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const commandSectionRef = useRef<HTMLDivElement>(null);
  
  const [projectName, setProjectName] = useState("my-app");
  const [selectedFramework, setSelectedFramework] = useState<Framework>("react");
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>(["typescript", "tailwind"]);
  const [showFrameworkSelector, setShowFrameworkSelector] = useState(false);
  const [activeTab, setActiveTab] = useState("generator");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const frameworkParam = params.get("framework");
    const featuresParam = params.get("features");
    
    if (frameworkParam && frameworks.some(f => f.id === frameworkParam)) {
      setSelectedFramework(frameworkParam as Framework);
    }
    
    if (featuresParam) {
      const features = featuresParam.split(",") as Feature[];
      if (features.length > 0) {
        setSelectedFeatures(features);
      }
    }
  }, [location.search]);

  const toggleFeature = (feature: Feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const handlePresetSelection = (framework: Framework, features: Feature[]) => {
    setSelectedFramework(framework);
    setSelectedFeatures(features);
    navigate(`/?framework=${framework}&features=${features.join(",")}`);
  };

  const scrollToCommand = () => {
    if (commandSectionRef.current) {
      commandSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const command = generateCommand(
    projectName,
    selectedFramework,
    selectedFeatures
  );

  const selectedFrameworkData = frameworks.find(f => f.id === selectedFramework);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <GridBackground />
      <Header />
      
      <main className="flex-grow container mx-auto px-6 py-8 max-w-5xl page-fade-in pt-24">
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div 
            className="p-3 rounded-full bg-primary/10 mb-4 floating"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Terminal className="w-6 h-6 text-primary" />
          </motion.div>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 tracking-tight animated-gradient-text"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            CLI Generator
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Select your tech stack and get the command to scaffold your project in seconds.
          </motion.p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="generator" className="flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>Generator</span>
              </TabsTrigger>
              <TabsTrigger value="quickstart" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Quick Start</span>
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center gap-2">
                <Box className="w-4 h-4" />
                <span>FAQ</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="generator" className="mt-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Create Your Project</h3>
              <div className="flex gap-2">
                <FavoriteTemplates onSelectTemplate={handlePresetSelection} />
                <SaveFavoriteButton 
                  projectName={projectName}
                  framework={selectedFramework}
                  features={selectedFeatures}
                />
              </div>
            </div>

            <PresetTemplates 
              onSelectPreset={handlePresetSelection}
              scrollToCommand={scrollToCommand}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Project Name
                </h3>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full p-4 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  placeholder="my-app"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Framework
                </h3>
                <div className="relative">
                  <button
                    className="w-full p-4 rounded-xl glass flex items-center justify-between hover-scale focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    onClick={() => setShowFrameworkSelector(!showFrameworkSelector)}
                  >
                    <div className="flex items-center">
                      <Box className="w-5 h-5 text-primary mr-3" />
                      <div className="text-left">
                        <div className="font-medium">{selectedFrameworkData?.name}</div>
                        <div className="text-xs text-muted-foreground">{selectedFrameworkData?.description}</div>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${showFrameworkSelector ? 'rotate-180' : ''}`} />
                  </button>

                  {showFrameworkSelector && (
                    <div className="absolute z-10 mt-2 w-full rounded-xl glass border border-border shadow-lg animate-fade-in">
                      <div className="p-2">
                        {frameworks.map((framework) => (
                          <div
                            key={framework.id}
                            className={`p-3 rounded-lg flex items-center cursor-pointer hover:bg-primary/5 transition-colors duration-200 ${
                              selectedFramework === framework.id ? "bg-primary/10" : ""
                            }`}
                            onClick={() => {
                              setSelectedFramework(framework.id);
                              setShowFrameworkSelector(false);
                            }}
                          >
                            <Box className="w-5 h-5 text-primary mr-3" />
                            <div>
                              <div className="font-medium">{framework.name}</div>
                              <div className="text-xs text-muted-foreground">{framework.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <FeatureSelect
              selectedFramework={selectedFramework}
              selectedFeatures={selectedFeatures}
              onFeatureToggle={toggleFeature}
            />

            <div ref={commandSectionRef}>
              <CommandDisplay 
                command={command} 
                framework={selectedFramework} 
                features={selectedFeatures}
              />
            </div>

            <div className="flex items-center justify-center mt-16 text-center">
              <div className="animate-bounce">
                <ArrowDown className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="ml-2 text-sm text-muted-foreground">
                The command will be copied to your clipboard
              </p>
            </div>
          </TabsContent>

          <TabsContent value="quickstart">
            <QuickStart />
          </TabsContent>

          <TabsContent value="faq">
            <FAQ />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
