
import { useState } from 'react';
import { Feature, Framework } from '../utils/generateCommand';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Zap, Scale, Book, Users, Clock, Eye, Lightbulb } from 'lucide-react';

// Import all the components we created
import AnimatedBackgroundTransition from './AnimatedBackgroundTransition';
import Framework3DIcon from './Framework3DIcon';
import ConfettiAnimation from './ConfettiAnimation';
import ProjectPreview from './ProjectPreview';
import InstallationGuideWizard from './InstallationGuideWizard';
import CommandHistory from './CommandHistory';
import FrameworkComparison from './FrameworkComparison';
import CommunityTemplates from './CommunityTemplates';
import LearningResources from './LearningResources';

interface EnhancedFeaturesProps {
  framework: Framework;
  features: Feature[];
  projectName: string;
  onSelectFramework: (framework: Framework) => void;
  onSelectTemplate: (framework: Framework, features: Feature[]) => void;
}

const EnhancedFeatures = ({
  framework,
  features,
  projectName,
  onSelectFramework,
  onSelectTemplate
}: EnhancedFeaturesProps) => {
  const [activeTab, setActiveTab] = useState('preview');
  const [showConfetti, setShowConfetti] = useState(false);
  
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto">
      <ConfettiAnimation active={showConfetti} />
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center">
          <Sparkles className="w-5 h-5 text-primary mr-2" />
          Enhanced Features
        </h2>
        <p className="text-muted-foreground">
          Explore additional tools and resources to boost your development workflow
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="preview" className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span className="hidden md:inline">Preview</span>
          </TabsTrigger>
          <TabsTrigger value="install" className="flex items-center gap-1">
            <Zap className="w-4 h-4" />
            <span className="hidden md:inline">Install</span>
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span className="hidden md:inline">Community</span>
          </TabsTrigger>
          <TabsTrigger value="compare" className="flex items-center gap-1">
            <Scale className="w-4 h-4" />
            <span className="hidden md:inline">Compare</span>
          </TabsTrigger>
          <TabsTrigger value="learn" className="flex items-center gap-1">
            <Book className="w-4 h-4" />
            <span className="hidden md:inline">Learn</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ProjectPreview 
                framework={framework} 
                features={features} 
              />
            </div>
            <div>
              <CommandHistory 
                onSelectCommand={(cmd, fw, feat) => {
                  onSelectTemplate(fw, feat);
                  triggerConfetti();
                }} 
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="install" className="space-y-6">
          <InstallationGuideWizard 
            framework={framework}
            features={features}
            projectName={projectName}
          />
        </TabsContent>
        
        <TabsContent value="community" className="space-y-6">
          <CommunityTemplates 
            onSelectTemplate={(fw, feat) => {
              onSelectTemplate(fw, feat);
              triggerConfetti();
            }} 
          />
        </TabsContent>
        
        <TabsContent value="compare" className="space-y-6">
          <FrameworkComparison 
            onSelectFramework={(fw) => {
              onSelectFramework(fw);
            }} 
          />
        </TabsContent>
        
        <TabsContent value="learn" className="space-y-6">
          <LearningResources selectedFramework={framework} />
        </TabsContent>
      </Tabs>
      
      <div className="flex items-center justify-center gap-4 mt-8 pt-4 border-t border-border">
        <Framework3DIcon framework={framework} size={40} />
        <div className="text-center">
          <h4 className="text-sm font-medium">Need more inspiration?</h4>
          <p className="text-xs text-muted-foreground">
            Check out the trending technologies and emerging patterns
          </p>
        </div>
        <button 
          className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          onClick={triggerConfetti}
        >
          <Lightbulb className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default EnhancedFeatures;