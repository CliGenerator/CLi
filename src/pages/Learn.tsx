import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Code, ExternalLink, FileBadge, Github, Lightbulb, Sparkles } from "lucide-react";
import { documentationLinks } from "../utils/documentationLinks";
import { Framework, Feature } from "../utils/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import ScrollToTop from "../components/ScrollToTop";
import { motion } from "framer-motion";

const frameworks: Framework[] = ["react", "next", "vue", "nuxt", "svelte", "solid"];

const LearnPage = () => {
  const [selectedFramework, setSelectedFramework] = useState<Framework>("react");
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  const filteredDocs = Object.entries(documentationLinks[selectedFramework])
    .filter(([feature, _]) => {
      return feature.toLowerCase().includes(searchQuery.toLowerCase());
    });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="flex-grow container mx-auto px-6 py-8 max-w-6xl page-fade-in pt-24">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="p-3 rounded-full bg-primary/10 mb-4">
            <Lightbulb className="w-6 h-6 text-primary" />
          </div>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 tracking-tight animated-gradient-text"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Learning Resources
          </motion.h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Comprehensive documentation and learning materials for your favorite frameworks and tools
          </p>
        </div>
        
        <div className="relative mb-8 animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-xl opacity-30" />
          
          <div className="relative">
            <Tabs 
              value={selectedFramework} 
              onValueChange={(value) => setSelectedFramework(value as Framework)}
              className="mb-8"
            >
              <TabsList className="w-full max-w-lg mx-auto grid grid-cols-3 md:grid-cols-6">
                {frameworks.map((framework) => (
                  <TabsTrigger key={framework} value={framework} className="capitalize">
                    {framework}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            <div className="mb-8">
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search documentation..."
                    className="w-full p-3 pl-10 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </div>
            
            <ScrollArea className="h-full w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {filteredDocs.map(([feature, docs]) => (
                  <Card key={feature} className="hover:scale-[1.02] transition-transform duration-200 overflow-hidden border border-border/40 bg-card">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg capitalize">{feature.replace('-', ' ')}</CardTitle>
                        <Badge variant="outline" className="font-normal">
                          {selectedFramework}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm pt-1">
                        Documentation for {feature} with {selectedFramework}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <ul className="space-y-2">
                        {docs.map((doc, index) => (
                          <li key={index}>
                            <a 
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-primary hover:underline text-sm"
                            >
                              <FileBadge className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
                              <span className="flex-grow">{doc.name}</span>
                              <ExternalLink className="w-3 h-3 ml-1.5 opacity-70 flex-shrink-0" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="pt-2 flex justify-end">
                      <span className="text-xs text-muted-foreground">{docs.length} resources</span>
                    </CardFooter>
                  </Card>
                ))}
                
                {filteredDocs.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                    <Sparkles className="w-8 h-8 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No resources found</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Try searching for a different term or select a different framework
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default LearnPage;
