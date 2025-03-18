
import { useState, useEffect } from 'react';
import { Framework, Feature } from '../utils/generateCommand';
import { User, ThumbsUp, Flag, Search, Users, DownloadCloud } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface CommunityTemplate {
  id: string;
  name: string;
  author: string;
  description: string;
  framework: Framework;
  features: Feature[];
  votes: number;
  downloads: number;
  createdAt: number;
}

interface CommunityTemplatesProps {
  onSelectTemplate: (framework: Framework, features: Feature[]) => void;
}

const MOCK_TEMPLATES: CommunityTemplate[] = [
  {
    id: '1',
    name: 'Full Stack Next.js Starter',
    author: 'sarah_dev',
    description: 'Complete Next.js setup with authentication, database, and styling',
    framework: 'next',
    features: ['typescript', 'tailwind', 'prisma', 'nextauth'],
    votes: 289,
    downloads: 1240,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7 // 7 days ago
  },
  {
    id: '2',
    name: 'React Dashboard',
    author: 'dashmaster',
    description: 'Pre-configured dashboard with charts, tables and responsive design',
    framework: 'react',
    features: ['typescript', 'tailwind', 'recharts', 'react-table'],
    votes: 156,
    downloads: 823,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14 // 14 days ago
  },
  {
    id: '3',
    name: 'Vue e-Commerce',
    author: 'shopbuilder',
    description: 'E-commerce starter with product listings, cart and checkout',
    framework: 'vue',
    features: ['typescript', 'vuex', 'tailwind', 'stripe'],
    votes: 132,
    downloads: 714,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 21 // 21 days ago
  },
  {
    id: '4',
    name: 'Svelte Blog Engine',
    author: 'blogcraft',
    description: 'Simple but powerful blog starter with markdown support',
    framework: 'svelte',
    features: ['typescript', 'mdsvex', 'tailwind'],
    votes: 98,
    downloads: 456,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30 // 30 days ago
  },
  {
    id: '5',
    name: 'Solid.js PWA',
    author: 'mobilefirst',
    description: 'Progressive Web App template with offline support',
    framework: 'solid',
    features: ['typescript', 'tailwind', 'workbox', 'pwa'],
    votes: 67,
    downloads: 289,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 45 // 45 days ago
  }
];

const CommunityTemplates = ({ onSelectTemplate }: CommunityTemplatesProps) => {
  const [templates, setTemplates] = useState<CommunityTemplate[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<CommunityTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'votes' | 'downloads' | 'newest'>('votes');
  const [visibleFrameworks, setVisibleFrameworks] = useState<Framework[]>([
    'react', 'next', 'vue', 'nuxt', 'svelte', 'solid'
  ]);
  
  const { toast } = useToast();
  
  // Simulate API fetch
  useEffect(() => {
    const fetchTemplates = () => {
      setIsLoading(true);
      
      // Simulate network delay
      setTimeout(() => {
        setTemplates(MOCK_TEMPLATES);
        setFilteredTemplates(MOCK_TEMPLATES);
        setIsLoading(false);
      }, 800);
    };
    
    fetchTemplates();
  }, []);
  
  // Filter and sort templates whenever search, sort, or framework filters change
  useEffect(() => {
    let result = [...templates];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        template => 
          template.name.toLowerCase().includes(query) ||
          template.description.toLowerCase().includes(query) ||
          template.author.toLowerCase().includes(query) ||
          template.features.some(feature => feature.toLowerCase().includes(query))
      );
    }
    
    // Filter by frameworks
    result = result.filter(template => 
      visibleFrameworks.includes(template.framework)
    );
    
    // Sort results
    switch (sortBy) {
      case 'votes':
        result.sort((a, b) => b.votes - a.votes);
        break;
      case 'downloads':
        result.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'newest':
        result.sort((a, b) => b.createdAt - a.createdAt);
        break;
    }
    
    setFilteredTemplates(result);
  }, [searchQuery, sortBy, visibleFrameworks, templates]);
  
  const handleVote = (templateId: string) => {
    // In a real app, we would call an API to update vote count
    // Here we're just updating the local state
    const updatedTemplates = templates.map(template => 
      template.id === templateId 
        ? { ...template, votes: template.votes + 1 }
        : template
    );
    
    setTemplates(updatedTemplates);
    
    toast({
      title: 'Vote recorded!',
      description: 'Thanks for voting on this template.',
    });
  };
  
  const handleDownload = (template: CommunityTemplate) => {
    // In a real app, we would track downloads
    // Here we just update the count and call the callback
    const updatedTemplates = templates.map(t => 
      t.id === template.id 
        ? { ...t, downloads: t.downloads + 1 }
        : t
    );
    
    setTemplates(updatedTemplates);
    onSelectTemplate(template.framework, template.features);
    
    toast({
      title: 'Template applied!',
      description: `Using ${template.name} as your template.`,
    });
  };
  
  const handleFrameworkFilter = (framework: Framework) => {
    if (visibleFrameworks.includes(framework)) {
      // Make sure we don't hide all frameworks
      if (visibleFrameworks.length > 1) {
        setVisibleFrameworks(visibleFrameworks.filter(f => f !== framework));
      }
    } else {
      setVisibleFrameworks([...visibleFrameworks, framework]);
    }
  };
  
  const formatDateFromNow = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days !== 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  };
  
  const getFrameworkColor = (framework: Framework): string => {
    switch (framework) {
      case 'react': return 'bg-blue-100 text-blue-800';
      case 'next': return 'bg-black text-white';
      case 'vue': return 'bg-green-100 text-green-800';
      case 'nuxt': return 'bg-emerald-100 text-emerald-800';
      case 'svelte': return 'bg-orange-100 text-orange-800';
      case 'solid': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="rounded-xl glass p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Community Templates
        </h3>
        <div className="text-xs text-muted-foreground">
          Share and discover templates
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            className="bg-secondary/20 border border-border rounded-lg px-3 py-2 text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'votes' | 'downloads' | 'newest')}
          >
            <option value="votes">Most Popular</option>
            <option value="downloads">Most Downloaded</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {['react', 'next', 'vue', 'nuxt', 'svelte', 'solid'].map((framework) => (
          <button
            key={framework}
            className={`px-3 py-1 rounded-full text-xs ${
              visibleFrameworks.includes(framework as Framework)
                ? getFrameworkColor(framework as Framework)
                : 'bg-secondary/40 text-muted-foreground'
            }`}
            onClick={() => handleFrameworkFilter(framework as Framework)}
          >
            {framework}
          </button>
        ))}
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredTemplates.length > 0 ? (
        <div className="space-y-4">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              className="p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">{template.name}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getFrameworkColor(template.framework)}`}>
                  {template.framework}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                {template.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {template.features.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex items-center text-xs text-muted-foreground">
                  <User className="w-3 h-3 mr-1" />
                  <span className="mr-3">{template.author}</span>
                  <span>{formatDateFromNow(template.createdAt)}</span>
                </div>
                
                <div className="flex space-x-4 mt-2 sm:mt-0">
                  <button 
                    className="flex items-center text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => handleVote(template.id)}
                  >
                    <ThumbsUp className="w-3.5 h-3.5 mr-1" />
                    {template.votes}
                  </button>
                  
                  <button
                    className="flex items-center text-primary text-xs font-medium"
                    onClick={() => handleDownload(template)}
                  >
                    <DownloadCloud className="w-3.5 h-3.5 mr-1" />
                    Use Template ({template.downloads})
                  </button>
                  
                  <button className="text-muted-foreground hover:text-foreground">
                    <Flag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <div className="flex justify-center mb-4">
            <Search className="w-12 h-12 text-muted-foreground opacity-20" />
          </div>
          <h4 className="text-lg font-medium mb-2">No templates found</h4>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default CommunityTemplates;
