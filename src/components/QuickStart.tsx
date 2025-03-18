
import { Code, ExternalLink, Zap } from "lucide-react";

const steps = [
  {
    title: "Select a Framework",
    description: "Choose the JavaScript framework you want to use for your project.",
  },
  {
    title: "Choose Features",
    description: "Select the libraries and tools you want to include in your project.",
  },
  {
    title: "Generate Command",
    description: "Copy the generated CLI command.",
  },
  {
    title: "Run Command",
    description: "Paste and run the command in your terminal to create your project.",
  },
  {
    title: "Start Coding",
    description: "Your project is set up and ready for development!",
  },
];

const QuickStart = () => {
  return (
    <div className="w-full max-w-3xl mx-auto my-12">
      <div className="flex items-center space-x-2 mb-6">
        <Zap className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Quick Start Guide</h2>
      </div>
      
      <div className="glass rounded-xl p-6">
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex">
              <div className="flex-shrink-0 flex flex-col items-center mr-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-full bg-primary/20 my-1" />
                )}
              </div>
              <div className="pt-1 pb-6">
                <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Code className="w-5 h-5 mr-2" />
            Example Commands
          </h3>
          <div className="space-y-3 font-mono text-sm">
            <div className="p-3 bg-secondary/50 rounded-lg">
              npx create-next-app my-app --typescript --tailwind --eslint
            </div>
            <div className="p-3 bg-secondary/50 rounded-lg">
              npm init vue@latest my-vue-app -- --typescript --router --eslint
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Need more help? Check out the documentation.
            </span>
            <a 
              href="#"
              className="flex items-center text-sm text-primary hover:underline"
            >
              Framework Docs
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStart;