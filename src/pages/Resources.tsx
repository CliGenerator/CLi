import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Code, ExternalLink, Github, Heart, Package, Star } from "lucide-react";
import ScrollToTop from "../components/ScrollToTop";

const resources = {
  uiLibraries: [
    {
      name: "shadcn/ui",
      description: "Beautifully designed components built with Radix UI and Tailwind CSS",
      url: "https://ui.shadcn.com",
      stars: "25k+",
      github: "https://github.com/shadcn/ui",
      tags: ["components", "tailwind", "radix"]
    },
    {
      name: "Radix UI",
      description: "Unstyled, accessible UI components for React",
      url: "https://www.radix-ui.com",
      stars: "11k+",
      github: "https://github.com/radix-ui/primitives",
      tags: ["headless", "accessible", "unstyled"]
    },
    {
      name: "Acertinity UI",
      description: "Beautiful, modern components with glassmorphism effects",
      url: "https://ui.aceternity.com",
      stars: "8k+",
      github: "https://github.com/aceternity/acertinity-ui",
      tags: ["animations", "modern", "glassmorphism"]
    },
    {
      name: "Tremor",
      description: "React components to build dashboards fast",
      url: "https://www.tremor.so",
      stars: "12k+",
      github: "https://github.com/tremorlabs/tremor",
      tags: ["dashboards", "charts", "analytics"]
    },
    {
      name: "NextUI",
      description: "Beautiful, modern and fast React UI library",
      url: "https://nextui.org",
      stars: "14k+",
      github: "https://github.com/nextui-org/nextui",
      tags: ["modern", "customizable", "animations"]
    },
    {
      name: "Mantine",
      description: "A fully featured React components library",
      url: "https://mantine.dev",
      stars: "20k+",
      github: "https://github.com/mantinedev/mantine",
      tags: ["components", "hooks", "forms"]
    }
  ],
  tools: [
    {
      name: "Framer Motion",
      description: "Production-ready animation library for React",
      url: "https://www.framer.com/motion",
      stars: "19k+",
      github: "https://github.com/framer/motion",
      tags: ["animations", "gestures", "transitions"]
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS framework",
      url: "https://tailwindcss.com",
      stars: "71k+",
      github: "https://github.com/tailwindlabs/tailwindcss",
      tags: ["css", "utilities", "responsive"]
    },
    {
      name: "TypeScript",
      description: "Typed JavaScript at Any Scale",
      url: "https://www.typescriptlang.org",
      stars: "92k+",
      github: "https://github.com/microsoft/TypeScript",
      tags: ["types", "javascript", "compiler"]
    },
    {
      name: "React Query",
      description: "Data fetching and state management library",
      url: "https://tanstack.com/query",
      stars: "35k+",
      github: "https://github.com/tanstack/query",
      tags: ["data-fetching", "caching", "state"]
    }
  ],
  learning: [
    {
      name: "React Documentation",
      description: "Official documentation for React",
      url: "https://react.dev",
      stars: "-",
      github: "https://github.com/reactjs/react.dev",
      tags: ["docs", "learning", "official"]
    },
    {
      name: "Josh Comeau's Blog",
      description: "Deep dives on React, CSS and web development",
      url: "https://www.joshwcomeau.com",
      stars: "-",
      github: "-",
      tags: ["tutorials", "css", "react"]
    },
    {
      name: "Kent C. Dodds Blog",
      description: "Articles on React, testing and JavaScript",
      url: "https://kentcdodds.com/blog",
      stars: "-",
      github: "-",
      tags: ["react", "testing", "patterns"]
    },
    {
      name: "Total TypeScript",
      description: "TypeScript tutorials and courses",
      url: "https://www.totaltypescript.com",
      stars: "-",
      github: "-",
      tags: ["typescript", "courses", "tutorials"]
    }
  ]
};

const ResourceCard = ({ resource }: { resource: any }) => {
  return (
    <Card className="hover-scale overflow-hidden border border-border/40 bg-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{resource.name}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            {resource.stars !== "-" && (
              <div className="flex items-center">
                <Star className="h-3.5 w-3.5 mr-1 text-yellow-500" />
                <span>{resource.stars}</span>
              </div>
            )}
          </div>
        </div>
        <CardDescription className="text-sm pt-1">{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1.5 mt-1">
          {resource.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <a 
          href={resource.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm flex items-center text-primary hover:underline"
        >
          <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
          Website
        </a>
        {resource.github !== "-" && (
          <a 
            href={resource.github}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm flex items-center text-primary hover:underline"
          >
            <Github className="h-3.5 w-3.5 mr-1.5" />
            GitHub
          </a>
        )}
      </CardFooter>
      <div className="absolute inset-0 border border-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </Card>
  );
};

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState("uiLibraries");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="flex-grow container mx-auto px-6 py-8 max-w-6xl page-fade-in">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="p-3 rounded-full bg-primary/10 mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Developer Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Curated collection of libraries, tools, and learning resources to accelerate your development workflow.
          </p>
        </div>
        
        <div className="relative mb-8 animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-xl opacity-30" />
          <Tabs value={activeTab} onValueChange={setActiveTab} className="relative">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
              <TabsTrigger value="uiLibraries" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">UI Libraries</span>
                <span className="sm:hidden">UI</span>
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span className="hidden sm:inline">Dev Tools</span>
                <span className="sm:hidden">Tools</span>
              </TabsTrigger>
              <TabsTrigger value="learning" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Learning</span>
                <span className="sm:hidden">Learn</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="uiLibraries" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {resources.uiLibraries.map((resource) => (
                  <ResourceCard key={resource.name} resource={resource} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tools" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {resources.tools.map((resource) => (
                  <ResourceCard key={resource.name} resource={resource} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="learning" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {resources.learning.map((resource) => (
                  <ResourceCard key={resource.name} resource={resource} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="flex flex-col items-center mt-14 pt-8 border-t border-border/30">
          <div className="flex items-center text-muted-foreground mb-2">
            <Heart className="h-4 w-4 text-red-500 mr-2" />
            <p className="text-sm">
              Have a resource suggestion? Let us know!
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ResourcesPage;