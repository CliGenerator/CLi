
import { Check, Info } from "lucide-react";
import { Feature, Framework } from "../utils/generateCommand";
import { useState } from "react";

type FeatureOption = {
  id: Feature;
  name: string;
  description: string;
  availableFor: Framework[];
  category: 'core' | 'payment' | 'cloud' | 'ai' | 'ui';
};

const featureOptions: FeatureOption[] = [
  // Core features
  {
    id: "typescript",
    name: "TypeScript",
    description: "Static typing for JavaScript",
    availableFor: ["react", "next", "vue", "nuxt", "svelte", "solid"],
    category: "core",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    description: "Utility-first CSS framework",
    availableFor: ["react", "next", "vue", "nuxt", "svelte", "solid"],
    category: "core",
  },
  {
    id: "eslint",
    name: "ESLint",
    description: "Code quality and consistency",
    availableFor: ["react", "next", "vue", "nuxt", "svelte"],
    category: "core",
  },
  {
    id: "router",
    name: "Router",
    description: "Client-side routing",
    availableFor: ["react", "vue", "svelte", "solid"],
    category: "core",
  },
  {
    id: "sass",
    name: "Sass",
    description: "CSS pre-processor",
    availableFor: ["react", "next", "vue", "nuxt", "svelte", "solid"],
    category: "core",
  },
  {
    id: "pwa",
    name: "PWA",
    description: "Progressive Web App support",
    availableFor: ["react", "next", "vue", "nuxt", "svelte", "solid"],
    category: "core",
  },
  // UI Libraries
  {
    id: "shadcn",
    name: "shadcn/ui",
    description: "Beautifully designed components with Radix UI",
    availableFor: ["react", "next"],
    category: "ui",
  },
  {
    id: "radix",
    name: "Radix UI",
    description: "Unstyled, accessible components",
    availableFor: ["react", "next"],
    category: "ui",
  },
  {
    id: "aceternity",
    name: "Aceternity UI",
    description: "Modern UI with glassmorphism effects",
    availableFor: ["react", "next"],
    category: "ui",
  },
  {
    id: "nextui",
    name: "NextUI",
    description: "Beautiful, modern React UI library",
    availableFor: ["react", "next"],
    category: "ui",
  },
  {
    id: "mantine",
    name: "Mantine",
    description: "Fully featured React components library",
    availableFor: ["react", "next"],
    category: "ui",
  },
  {
    id: "chakra",
    name: "Chakra UI",
    description: "Accessible component library",
    availableFor: ["react", "next"],
    category: "ui",
  },
  // Payment features
  {
    id: "stripe",
    name: "Stripe",
    description: "Payment processing",
    availableFor: ["react", "next", "vue", "nuxt", "svelte", "solid"],
    category: "payment",
  },
  {
    id: "razorpay",
    name: "Razorpay",
    description: "Payment gateway (popular in India)",
    availableFor: ["react", "next", "vue", "nuxt", "svelte", "solid"],
    category: "payment",
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Online payment platform",
    availableFor: ["react", "next", "vue", "nuxt", "svelte", "solid"],
    category: "payment",
  },
  // Cloud features
  {
    id: "aws",
    name: "AWS SDK",
    description: "Amazon Web Services integration",
    availableFor: ["react", "next", "vue", "nuxt", "svelte", "solid"],
    category: "cloud",
  },
  {
    id: "azure",
    name: "Azure",
    description: "Microsoft Azure cloud services",
    availableFor: ["react", "next", "vue", "nuxt", "svelte", "solid"],
    category: "cloud",
  },
  {
    id: "gcp",
    name: "Google Cloud",
    description: "Google Cloud Platform services",
    availableFor: ["react", "next", "vue", "nuxt", "svelte", "solid"],
    category: "cloud",
  },
  {
    id: "firebase",
    name: "Firebase",
    description: "Google's app development platform",
    availableFor: ["react", "next", "vue", "nuxt", "svelte", "solid"],
    category: "cloud",
  },
  {
    id: "supabase",
    name: "Supabase",
    description: "Open source Firebase alternative",
    availableFor: ["react", "next", "vue", "nuxt", "svelte", "solid"],
    category: "cloud",
  },
  // AI features
  {
    id: "openai",
    name: "OpenAI",
    description: "AI models integration (GPT)",
    availableFor: ["react", "next", "vue", "nuxt", "svelte", "solid"],
    category: "ai",
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    description: "Machine learning models and tools",
    availableFor: ["react", "next", "vue", "nuxt", "svelte", "solid"],
    category: "ai",
  },
  {
    id: "tensorflow",
    name: "TensorFlow.js",
    description: "Machine learning for JavaScript",
    availableFor: ["react", "next", "vue", "nuxt", "svelte", "solid"],
    category: "ai",
  },
  {
    id: "langchain",
    name: "LangChain",
    description: "Building LLM-powered applications",
    availableFor: ["react", "next", "vue", "nuxt", "svelte", "solid"],
    category: "ai",
  },
];

type FeatureSelectProps = {
  selectedFramework: Framework;
  selectedFeatures: Feature[];
  onFeatureToggle: (feature: Feature) => void;
};

const FeatureSelect = ({
  selectedFramework,
  selectedFeatures,
  onFeatureToggle,
}: FeatureSelectProps) => {
  const [hoveredFeature, setHoveredFeature] = useState<Feature | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("core");

  const categories = [
    { id: "core", name: "Core" },
    { id: "ui", name: "UI Libraries" },
    { id: "payment", name: "Payment" },
    { id: "cloud", name: "Cloud" },
    { id: "ai", name: "AI" },
  ];

  return (
    <div className="w-full">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">
        Select Features
      </h3>

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-300 ${
              activeCategory === category.id
                ? "bg-primary text-primary-foreground glow"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {featureOptions
          .filter((feature) => feature.availableFor.includes(selectedFramework))
          .filter((feature) => feature.category === activeCategory)
          .map((feature) => {
            const isSelected = selectedFeatures.includes(feature.id);
            return (
              <div
                key={feature.id}
                className={`glass p-4 rounded-xl flex items-center space-x-3 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "border-beam border-primary/30 bg-primary/5"
                    : "border-transparent hover:border-primary/20 hover-scale"
                }`}
                onClick={() => onFeatureToggle(feature.id)}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "border border-muted-foreground/30"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                </div>
                <div>
                  <div className="font-medium text-foreground">
                    {feature.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {feature.description}
                  </div>
                </div>
                {hoveredFeature === feature.id && (
                  <Info className="w-4 h-4 text-muted-foreground ml-auto shimmer" />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FeatureSelect;