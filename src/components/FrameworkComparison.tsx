
import { useState } from 'react';
import { Framework } from '../utils/generateCommand';
import { Scale, Info, ExternalLink, ArrowDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

interface FrameworkComparisonProps {
  onSelectFramework?: (framework: Framework) => void;
}

type ComparisonCategory = 'performance' | 'features' | 'ecosystem' | 'learning';

interface FrameworkData {
  name: string;
  id: Framework;
  description: string;
  performance: number;
  features: number;
  ecosystem: number;
  learning: number;
  pros: string[];
  cons: string[];
  idealFor: string[];
  docsUrl: string;
  githubStars: string;
  releaseYear: number;
}

const frameworksData: FrameworkData[] = [
  {
    name: 'React',
    id: 'react',
    description: 'A JavaScript library for building user interfaces',
    performance: 8,
    features: 7,
    ecosystem: 10,
    learning: 8,
    pros: [
      'Massive ecosystem and community',
      'Backed by Facebook',
      'Great for large applications',
      'Component-based architecture'
    ],
    cons: [
      'Requires additional libraries for routing, state management',
      'JSX syntax might be unfamiliar',
      'Updates can cause breaking changes'
    ],
    idealFor: [
      'Large-scale applications',
      'Teams with JavaScript experience',
      'Complex UIs with frequent updates'
    ],
    docsUrl: 'https://reactjs.org/docs/getting-started.html',
    githubStars: '214k+',
    releaseYear: 2013
  },
  {
    name: 'Next.js',
    id: 'next',
    description: 'The React framework for production',
    performance: 9,
    features: 10,
    ecosystem: 9,
    learning: 7,
    pros: [
      'Built-in SSR, SSG, and ISR',
      'File-based routing',
      'API routes',
      'Great developer experience'
    ],
    cons: [
      'More complex than plain React',
      'Requires Node.js server for SSR',
      'Some customizations are difficult'
    ],
    idealFor: [
      'SEO-focused React applications',
      'Production-grade websites',
      'Teams that need a complete framework'
    ],
    docsUrl: 'https://nextjs.org/docs',
    githubStars: '108k+',
    releaseYear: 2016
  },
  {
    name: 'Vue',
    id: 'vue',
    description: 'The progressive JavaScript framework',
    performance: 9,
    features: 8,
    ecosystem: 7,
    learning: 10,
    pros: [
      'Gentle learning curve',
      'Single-file components',
      'HTML-based templates',
      'Great documentation'
    ],
    cons: [
      'Smaller ecosystem than React',
      'Fewer job opportunities',
      'Less third-party libraries'
    ],
    idealFor: [
      'Projects that need a gentle learning curve',
      'Smaller to medium applications',
      'Teams familiar with HTML/CSS'
    ],
    docsUrl: 'https://vuejs.org/guide/introduction.html',
    githubStars: '205k+',
    releaseYear: 2014
  },
  {
    name: 'Nuxt',
    id: 'nuxt',
    description: 'The intuitive Vue framework',
    performance: 9,
    features: 9,
    ecosystem: 7,
    learning: 9,
    pros: [
      'Built-in SSR for Vue',
      'Auto-imports',
      'File-based routing',
      'Module system'
    ],
    cons: [
      'Documentation can be incomplete',
      'Version migrations can be challenging',
      'Smaller community than Next.js'
    ],
    idealFor: [
      'Vue developers building production apps',
      'SEO-friendly Vue applications',
      'Projects that need Vue with SSR'
    ],
    docsUrl: 'https://nuxt.com/docs/getting-started/introduction',
    githubStars: '47k+',
    releaseYear: 2016
  },
  {
    name: 'Svelte',
    id: 'svelte',
    description: 'Cybernetically enhanced web apps',
    performance: 10,
    features: 7,
    ecosystem: 6,
    learning: 9,
    pros: [
      'No virtual DOM, truly reactive',
      'Less boilerplate code',
      'Compiles to vanilla JavaScript',
      'Built-in animations'
    ],
    cons: [
      'Smaller ecosystem',
      'Fewer learning resources',
      'Less mature than React/Vue'
    ],
    idealFor: [
      'Performance-critical applications',
      'Simple to medium complexity apps',
      'Developers who prefer less boilerplate'
    ],
    docsUrl: 'https://svelte.dev/docs',
    githubStars: '71k+',
    releaseYear: 2016
  },
  {
    name: 'SolidJS',
    id: 'solid',
    description: 'Simple and performant reactivity for building user interfaces',
    performance: 10,
    features: 8,
    ecosystem: 5,
    learning: 6,
    pros: [
      'Extremely fast - often fastest in benchmarks',
      'React-like syntax but with true reactivity',
      'No VDOM overhead',
      'Small bundle size'
    ],
    cons: [
      'Newer with smaller community',
      'Limited ecosystem',
      'Fewer learning resources'
    ],
    idealFor: [
      'Performance-focused applications',
      'React developers looking for better performance',
      'Experimental projects'
    ],
    docsUrl: 'https://www.solidjs.com/docs/latest/api',
    githubStars: '28k+',
    releaseYear: 2018
  }
];

const FrameworkComparison = ({ onSelectFramework }: FrameworkComparisonProps) => {
  const [selectedCategory, setSelectedCategory] = useState<ComparisonCategory>('performance');
  const [selectedFrameworks, setSelectedFrameworks] = useState<Framework[]>(['react', 'vue']);
  
  const handleFrameworkToggle = (frameworkId: Framework) => {
    if (selectedFrameworks.includes(frameworkId)) {
      // Make sure we don't remove the last framework
      if (selectedFrameworks.length > 1) {
        setSelectedFrameworks(selectedFrameworks.filter(id => id !== frameworkId));
      }
    } else {
      // Limit to max 3 frameworks for comparison
      if (selectedFrameworks.length < 3) {
        setSelectedFrameworks([...selectedFrameworks, frameworkId]);
      }
    }
  };
  
  const filteredFrameworks = frameworksData.filter(framework => 
    selectedFrameworks.includes(framework.id)
  );
  
  // Sort frameworks by the selected category score
  const sortedFrameworks = [...filteredFrameworks].sort((a, b) => 
    b[selectedCategory] - a[selectedCategory]
  );
  
  const handleSelectFramework = (framework: Framework) => {
    if (onSelectFramework) {
      onSelectFramework(framework);
    }
  };
  
  const getCategoryLabel = (category: ComparisonCategory): string => {
    switch (category) {
      case 'performance': return 'Performance';
      case 'features': return 'Features';
      case 'ecosystem': return 'Ecosystem';
      case 'learning': return 'Learning Curve';
      default: return category;
    }
  };
  
  const getScoreColor = (score: number): string => {
    if (score >= 9) return 'text-green-500';
    if (score >= 7) return 'text-blue-500';
    if (score >= 5) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  return (
    <div className="rounded-xl glass p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center">
          <Scale className="w-5 h-5 mr-2" />
          Framework Comparison
        </h3>
        <div className="text-xs text-muted-foreground flex items-center">
          <Info className="w-3.5 h-3.5 mr-1" />
          Select up to 3 frameworks
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {frameworksData.map(framework => (
          <button
            key={framework.id}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              selectedFrameworks.includes(framework.id)
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
            }`}
            onClick={() => handleFrameworkToggle(framework.id)}
          >
            {framework.name}
          </button>
        ))}
      </div>
      
      <Tabs 
        value={selectedCategory} 
        onValueChange={(value) => setSelectedCategory(value as ComparisonCategory)}
        className="mb-6"
      >
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="ecosystem">Ecosystem</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
        </TabsList>
        
        {(Object.keys(frameworksData[0]) as Array<keyof FrameworkData>)
          .filter(key => ['performance', 'features', 'ecosystem', 'learning'].includes(key))
          .map(category => (
            <TabsContent key={category} value={category} className="pt-2">
              <div className="space-y-4">
                {sortedFrameworks.map((framework, index) => (
                  <motion.div 
                    key={framework.id}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg bg-secondary/20 relative"
                  >
                    {index === 0 && (
                      <div className="absolute -top-2 right-2 bg-primary px-2 py-0.5 rounded-full text-xs text-primary-foreground flex items-center">
                        <ArrowDown className="w-3 h-3 mr-1 rotate-180" />
                        Best in {getCategoryLabel(selectedCategory)}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold">{framework.name}</h4>
                      <span className={`text-lg font-bold ${getScoreColor(framework[category as ComparisonCategory])}`}>
                        {framework[category as ComparisonCategory]}/10
                      </span>
                    </div>
                    
                    <div className="w-full bg-secondary/40 rounded-full h-2.5 mb-4">
                      <div 
                        className="h-2.5 rounded-full bg-primary"
                        style={{ width: `${framework[category as ComparisonCategory] * 10}%` }}
                      ></div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-3">
                      {framework.description}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <h5 className="text-sm font-medium mb-2">Pros</h5>
                        <ul className="list-disc pl-5 space-y-1">
                          {framework.pros.slice(0, 3).map((pro, i) => (
                            <li key={i} className="text-xs text-muted-foreground">{pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-2">Cons</h5>
                        <ul className="list-disc pl-5 space-y-1">
                          {framework.cons.slice(0, 3).map((con, i) => (
                            <li key={i} className="text-xs text-muted-foreground">{con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-border/30">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{framework.githubStars} stars</span>
                        <span>Since {framework.releaseYear}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <a 
                          href={framework.docsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary flex items-center hover:underline"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Docs
                        </a>
                        
                        <button
                          className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-full"
                          onClick={() => handleSelectFramework(framework.id)}
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))
        }
      </Tabs>
    </div>
  );
};

export default FrameworkComparison;