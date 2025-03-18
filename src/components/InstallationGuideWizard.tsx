
import { useState } from 'react';
import { Framework, Feature } from '../utils/generateCommand';
import { ChevronRight, ChevronLeft, Check, Terminal, Package, Cog, Play } from 'lucide-react';

interface InstallationGuideWizardProps {
  framework: Framework;
  features: Feature[];
  projectName: string;
}

const InstallationGuideWizard = ({ framework, features, projectName }: InstallationGuideWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Define steps based on framework and features
  const getSteps = () => {
    const allSteps = [
      {
        title: 'Installation',
        description: `Install the ${framework} project with the CLI command`,
        icon: <Terminal className="w-5 h-5" />,
        content: (
          <div className="p-4 bg-secondary/20 rounded-lg font-mono text-sm overflow-x-auto">
            {getInstallationCommand()}
          </div>
        )
      },
      {
        title: 'Navigate to Project',
        description: 'Change directory to your new project',
        icon: <ChevronRight className="w-5 h-5" />,
        content: (
          <div className="p-4 bg-secondary/20 rounded-lg font-mono text-sm">
            <code>cd {projectName}</code>
          </div>
        )
      },
      {
        title: 'Install Dependencies',
        description: 'Install all required dependencies',
        icon: <Package className="w-5 h-5" />,
        content: (
          <div className="p-4 bg-secondary/20 rounded-lg font-mono text-sm">
            <code>{getPackageManager()} install</code>
          </div>
        )
      },
      {
        title: 'Configuration',
        description: 'Configure your development environment',
        icon: <Cog className="w-5 h-5" />,
        content: (
          <div className="space-y-4">
            {features.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Configure the following tools:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  {features.includes('eslint') && (
                    <li className="text-sm">
                      ESLint: Edit <code className="bg-secondary/20 px-1 rounded">.eslintrc.js</code> for linting preferences
                    </li>
                  )}
                  {features.includes('prettier') && (
                    <li className="text-sm">
                      Prettier: Edit <code className="bg-secondary/20 px-1 rounded">.prettierrc</code> for formatting rules
                    </li>
                  )}
                  {features.includes('tailwind') && (
                    <li className="text-sm">
                      Tailwind CSS: Configure <code className="bg-secondary/20 px-1 rounded">tailwind.config.js</code> for styling
                    </li>
                  )}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No additional configuration needed for basic setup.
              </p>
            )}
          </div>
        )
      },
      {
        title: 'Start Development',
        description: 'Launch your development server',
        icon: <Play className="w-5 h-5" />,
        content: (
          <div className="space-y-4">
            <div className="p-4 bg-secondary/20 rounded-lg font-mono text-sm">
              <code>{getPackageManager()} run dev</code>
            </div>
            <p className="text-sm text-muted-foreground">
              Your application will be available at <span className="font-medium">http://localhost:3000</span>
            </p>
          </div>
        )
      }
    ];
    
    return allSteps;
  };
  
  const steps = getSteps();
  
  // Helper function to get installation command
  function getInstallationCommand() {
    switch (framework) {
      case 'react':
        return `npx create-react-app ${projectName} ${features.includes('typescript') ? '--template typescript' : ''}`;
      case 'next':
        return `npx create-next-app ${projectName}`;
      case 'vue':
        return `npm init vue@latest ${projectName}`;
      case 'nuxt':
        return `npx nuxi init ${projectName}`;
      case 'svelte':
        return `npm create svelte@latest ${projectName}`;
      case 'solid':
        return `npx degit solidjs/templates/js ${projectName}`;
      default:
        return `npx create-${framework}-app ${projectName}`;
    }
  }
  
  // Helper function to get package manager command
  function getPackageManager() {
    // This is simplified - in real world, we might detect the user's preferred package manager
    return 'npm';
  }
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="rounded-xl glass p-6">
      <h3 className="text-xl font-semibold mb-6">Installation Guide</h3>
      
      <div className="mb-8">
        <div className="flex items-center">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center">
              <div 
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                  idx === currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : idx < currentStep 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-secondary text-muted-foreground'
                }`}
                onClick={() => setCurrentStep(idx)}
              >
                {idx < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step.icon}</span>
                )}
              </div>
              {idx < steps.length - 1 && (
                <div 
                  className={`w-12 h-0.5 ${
                    idx < currentStep ? 'bg-primary' : 'bg-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-1">{steps[currentStep].title}</h4>
        <p className="text-muted-foreground">{steps[currentStep].description}</p>
      </div>
      
      <div className="mb-8">
        {steps[currentStep].content}
      </div>
      
      <div className="flex justify-between">
        <button 
          onClick={handlePrevious}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            currentStep === 0 
              ? 'text-muted-foreground bg-secondary/50 cursor-not-allowed' 
              : 'text-foreground bg-secondary hover:bg-secondary/80'
          }`}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </button>
        
        <button 
          onClick={handleNext}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            currentStep === steps.length - 1 
              ? 'text-muted-foreground bg-secondary/50 cursor-not-allowed' 
              : 'text-primary-foreground bg-primary hover:bg-primary/80'
          }`}
          disabled={currentStep === steps.length - 1}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default InstallationGuideWizard;