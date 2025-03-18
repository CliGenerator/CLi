
import { useState, useEffect } from 'react';
import { Framework } from '../utils/generateCommand';
import { Book, Video, ExternalLink, Link2, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'article' | 'video' | 'course' | 'documentation';
  level: 'beginner' | 'intermediate' | 'advanced';
  framework: Framework;
  tags: string[];
}

interface LearningResourcesProps {
  selectedFramework?: Framework;
}

const MOCK_RESOURCES: Resource[] = [
  // React resources
  {
    id: '1',
    title: 'React Official Documentation',
    description: 'The official React documentation with guides, API references, and examples',
    url: 'https://reactjs.org/docs/getting-started.html',
    type: 'documentation',
    level: 'beginner',
    framework: 'react',
    tags: ['documentation', 'official', 'guides', 'api']
  },
  {
    id: '2',
    title: 'React for Beginners',
    description: 'A comprehensive video course teaching React from scratch',
    url: 'https://reactforbeginners.com/',
    type: 'course',
    level: 'beginner',
    framework: 'react',
    tags: ['course', 'fundamentals', 'paid']
  },
  {
    id: '3',
    title: 'Advanced React Patterns',
    description: 'Learn advanced React design patterns for building scalable applications',
    url: 'https://kentcdodds.com/blog/advanced-react-patterns',
    type: 'article',
    level: 'advanced',
    framework: 'react',
    tags: ['patterns', 'advanced', 'component design']
  },
  
  // Next.js resources
  {
    id: '4',
    title: 'Next.js Documentation',
    description: 'Official documentation for Next.js framework',
    url: 'https://nextjs.org/docs',
    type: 'documentation',
    level: 'beginner',
    framework: 'next',
    tags: ['documentation', 'official', 'guides']
  },
  {
    id: '5',
    title: 'Mastering Next.js',
    description: 'A free comprehensive video course on Next.js',
    url: 'https://masteringnextjs.com/',
    type: 'course',
    level: 'intermediate',
    framework: 'next',
    tags: ['course', 'free', 'comprehensive']
  },
  
  // Vue resources
  {
    id: '6',
    title: 'Vue.js Documentation',
    description: 'Official Vue.js documentation with guides, API, and examples',
    url: 'https://vuejs.org/guide/introduction.html',
    type: 'documentation',
    level: 'beginner',
    framework: 'vue',
    tags: ['documentation', 'official', 'guides']
  },
  {
    id: '7',
    title: 'Vue Mastery',
    description: 'Premium Vue.js courses and tutorials',
    url: 'https://www.vuemastery.com/',
    type: 'course',
    level: 'intermediate',
    framework: 'vue',
    tags: ['course', 'paid', 'video tutorials']
  },
  
  // Nuxt resources
  {
    id: '8',
    title: 'Nuxt.js Documentation',
    description: 'Official documentation for Nuxt.js framework',
    url: 'https://nuxt.com/docs',
    type: 'documentation',
    level: 'beginner',
    framework: 'nuxt',
    tags: ['documentation', 'official', 'guides']
  },
  
  // Svelte resources
  {
    id: '9',
    title: 'Svelte Tutorial',
    description: 'Interactive Svelte tutorial from the official team',
    url: 'https://svelte.dev/tutorial',
    type: 'course',
    level: 'beginner',
    framework: 'svelte',
    tags: ['tutorial', 'interactive', 'official']
  },
  {
    id: '10',
    title: 'Svelte Documentation',
    description: 'Official Svelte documentation and API reference',
    url: 'https://svelte.dev/docs',
    type: 'documentation',
    level: 'beginner',
    framework: 'svelte',
    tags: ['documentation', 'official', 'api']
  },
  
  // SolidJS resources
  {
    id: '11',
    title: 'SolidJS Documentation',
    description: 'Official SolidJS documentation, tutorials and examples',
    url: 'https://www.solidjs.com/docs/latest/api',
    type: 'documentation',
    level: 'beginner',
    framework: 'solid',
    tags: ['documentation', 'official', 'api']
  },
  {
    id: '12',
    title: 'SolidJS for React Developers',
    description: 'Guide to SolidJS for those familiar with React',
    url: 'https://dev.to/ryansolid/solidjs-for-react-developers-2cp0',
    type: 'article',
    level: 'intermediate',
    framework: 'solid',
    tags: ['article', 'comparison', 'react']
  }
];

const LearningResources = ({ selectedFramework }: LearningResourcesProps) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'documentation' | 'courses' | 'articles'>('all');
  const [activeLevel, setActiveLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [activeFramework, setActiveFramework] = useState<Framework | 'all'>(selectedFramework || 'all');
  
  // Load resources
  useEffect(() => {
    setResources(MOCK_RESOURCES);
  }, []);
  
  // Update active framework when prop changes
  useEffect(() => {
    if (selectedFramework) {
      setActiveFramework(selectedFramework);
    }
  }, [selectedFramework]);
  
  // Filter resources based on active tab, level and framework
  useEffect(() => {
    let filtered = [...resources];
    
    // Filter by framework
    if (activeFramework !== 'all') {
      filtered = filtered.filter(resource => resource.framework === activeFramework);
    }
    
    // Filter by type
    if (activeTab !== 'all') {
      const typeMap: Record<string, string[]> = {
        'documentation': ['documentation'],
        'courses': ['course', 'video'],
        'articles': ['article']
      };
      
      filtered = filtered.filter(resource => 
        typeMap[activeTab]?.includes(resource.type)
      );
    }
    
    // Filter by level
    if (activeLevel !== 'all') {
      filtered = filtered.filter(resource => resource.level === activeLevel);
    }
    
    setFilteredResources(filtered);
  }, [resources, activeTab, activeLevel, activeFramework]);
  
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'documentation':
        return <Book className="w-4 h-4 text-blue-500" />;
      case 'video':
      case 'course':
        return <Video className="w-4 h-4 text-red-500" />;
      case 'article':
        return <Link2 className="w-4 h-4 text-green-500" />;
      default:
        return <Link2 className="w-4 h-4 text-primary" />;
    }
  };
  
  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'beginner':
        return <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">Beginner</span>;
      case 'intermediate':
        return <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">Intermediate</span>;
      case 'advanced':
        return <span className="px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-800">Advanced</span>;
      default:
        return null;
    }
  };
  
  const getFrameworkBadge = (framework: Framework) => {
    const colors: Record<Framework, string> = {
      'react': 'bg-blue-100 text-blue-800',
      'next': 'bg-black text-white',
      'vue': 'bg-green-100 text-green-800',
      'nuxt': 'bg-emerald-100 text-emerald-800',
      'svelte': 'bg-orange-100 text-orange-800',
      'solid': 'bg-indigo-100 text-indigo-800'
    };
    
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs ${colors[framework]}`}>
        {framework}
      </span>
    );
  };
  
  return (
    <div className="rounded-xl glass p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center">
          <Book className="w-5 h-5 mr-2" />
          Learning Resources
        </h3>
        
        <div className="flex items-center">
          <Filter className="w-4 h-4 mr-1 text-muted-foreground" />
          <span className="text-xs text-muted-foreground mr-2">Level:</span>
          <select
            className="text-xs bg-secondary/20 rounded-lg px-2 py-1 border-none"
            value={activeLevel}
            onChange={(e) => setActiveLevel(e.target.value as any)}
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={`px-3 py-1 rounded-full text-xs transition-colors ${
            activeFramework === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
          }`}
          onClick={() => setActiveFramework('all')}
        >
          All Frameworks
        </button>
        
        {['react', 'next', 'vue', 'nuxt', 'svelte', 'solid'].map((framework) => (
          <button
            key={framework}
            className={`px-3 py-1 rounded-full text-xs transition-colors ${
              activeFramework === framework
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
            }`}
            onClick={() => setActiveFramework(framework as Framework)}
          >
            {framework}
          </button>
        ))}
      </div>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="courses">Courses & Videos</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-0">
          <ResourceList resources={filteredResources} />
        </TabsContent>
        
        <TabsContent value="documentation" className="space-y-0">
          <ResourceList resources={filteredResources} />
        </TabsContent>
        
        <TabsContent value="courses" className="space-y-0">
          <ResourceList resources={filteredResources} />
        </TabsContent>
        
        <TabsContent value="articles" className="space-y-0">
          <ResourceList resources={filteredResources} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Separate component for the resource list
const ResourceList = ({ resources }: { resources: Resource[] }) => {
  if (resources.length === 0) {
    return (
      <div className="text-center py-8">
        <Book className="w-12 h-12 text-muted-foreground opacity-20 mx-auto mb-4" />
        <h4 className="text-lg font-medium mb-2">No resources found</h4>
        <p className="text-muted-foreground">
          Try changing your filters to see more learning resources.
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {resources.map((resource, index) => (
        <motion.a
          key={resource.id}
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-all block"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className="flex items-start">
            <div className="mr-3 mt-1">
              {resource.type === 'documentation' ? (
                <Book className="w-5 h-5 text-blue-500" />
              ) : resource.type === 'course' || resource.type === 'video' ? (
                <Video className="w-5 h-5 text-red-500" />
              ) : (
                <Link2 className="w-5 h-5 text-green-500" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-sm mb-1 pr-2 hover:underline">{resource.title}</h4>
                <div className="flex items-center">
                  <ExternalLink className="w-3 h-3 text-muted-foreground" />
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mb-2">
                {resource.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-2">
                {resource.level === 'beginner' ? (
                  <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">Beginner</span>
                ) : resource.level === 'intermediate' ? (
                  <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">Intermediate</span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-800">Advanced</span>
                )}
                
                <span className={`px-2 py-0.5 rounded-full text-xs 
                  ${resource.framework === 'react' ? 'bg-blue-100 text-blue-800' : 
                    resource.framework === 'next' ? 'bg-black text-white' :
                    resource.framework === 'vue' ? 'bg-green-100 text-green-800' :
                    resource.framework === 'nuxt' ? 'bg-emerald-100 text-emerald-800' :
                    resource.framework === 'svelte' ? 'bg-orange-100 text-orange-800' :
                    'bg-indigo-100 text-indigo-800'}`
                }>
                  {resource.framework}
                </span>
              </div>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
};

export default LearningResources;