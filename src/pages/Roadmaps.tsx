import { useState } from "react";
import Header from "../components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, ArrowRight, CheckCircle2, Circle, CircleDashed, ExternalLink } from "lucide-react";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { motion } from "framer-motion";

type RoadmapStep = {
  id: string;
  title: string;
  description: string;
  status?: "required" | "recommended" | "optional";
  resources?: {
    title: string;
    url: string;
  }[];
  children?: RoadmapStep[];
};

const roadmaps = {
  frontend: [
    {
      id: "1",
      title: "HTML & CSS Fundamentals",
      description: "Learn the building blocks of the web",
      status: "required",
      resources: [
        { title: "MDN Web Docs - HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
        { title: "MDN Web Docs - CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        { title: "CSS Tricks", url: "https://css-tricks.com" }
      ],
      children: [
        {
          id: "1.1",
          title: "HTML Basics",
          description: "Tags, attributes, semantic HTML",
          status: "required"
        },
        {
          id: "1.2",
          title: "CSS Basics",
          description: "Selectors, properties, layouts",
          status: "required"
        },
        {
          id: "1.3",
          title: "Responsive Design",
          description: "Media queries, flexbox, grid",
          status: "required"
        }
      ]
    },
    {
      id: "2",
      title: "JavaScript",
      description: "Learn the programming language of the web",
      status: "required",
      resources: [
        { title: "JavaScript.info", url: "https://javascript.info" },
        { title: "Eloquent JavaScript", url: "https://eloquentjavascript.net" }
      ],
      children: [
        {
          id: "2.1",
          title: "JS Fundamentals",
          description: "Variables, types, functions, scope",
          status: "required"
        },
        {
          id: "2.2",
          title: "DOM Manipulation",
          description: "Selecting elements, events, manipulation",
          status: "required"
        },
        {
          id: "2.3",
          title: "ES6+ Features",
          description: "Arrow functions, destructuring, modules",
          status: "required"
        },
        {
          id: "2.4",
          title: "Asynchronous JS",
          description: "Promises, async/await, fetch API",
          status: "required"
        }
      ]
    },
    {
      id: "3",
      title: "Frontend Framework",
      description: "Learn a modern JavaScript framework",
      status: "required",
      children: [
        {
          id: "3.1",
          title: "React",
          description: "Components, state, hooks, context",
          status: "recommended",
          resources: [
            { title: "React Documentation", url: "https://react.dev" },
            { title: "React Tutorial", url: "https://react.dev/learn" }
          ]
        },
        {
          id: "3.2",
          title: "Vue",
          description: "Components, directives, composition API",
          status: "optional",
          resources: [
            { title: "Vue Documentation", url: "https://vuejs.org" }
          ]
        },
        {
          id: "3.3",
          title: "Angular",
          description: "Components, services, dependency injection",
          status: "optional",
          resources: [
            { title: "Angular Documentation", url: "https://angular.io/docs" }
          ]
        }
      ]
    },
    {
      id: "4",
      title: "State Management",
      description: "Learn how to manage application state",
      status: "recommended",
      children: [
        {
          id: "4.1",
          title: "React Context",
          description: "Built-in state management for React",
          status: "recommended"
        },
        {
          id: "4.2",
          title: "Redux",
          description: "Predictable state container",
          status: "optional",
          resources: [
            { title: "Redux Documentation", url: "https://redux.js.org" }
          ]
        },
        {
          id: "4.3",
          title: "Zustand",
          description: "Small, fast state management solution",
          status: "optional",
          resources: [
            { title: "Zustand GitHub", url: "https://github.com/pmndrs/zustand" }
          ]
        }
      ]
    },
    {
      id: "5",
      title: "TypeScript",
      description: "Add static typing to JavaScript",
      status: "recommended",
      resources: [
        { title: "TypeScript Documentation", url: "https://www.typescriptlang.org/docs/" },
        { title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html" }
      ]
    }
  ],
  backend: [
    {
      id: "1",
      title: "Server-side Language",
      description: "Choose a backend programming language",
      status: "required",
      children: [
        {
          id: "1.1",
          title: "Node.js",
          description: "JavaScript runtime for server-side code",
          status: "recommended",
          resources: [
            { title: "Node.js Documentation", url: "https://nodejs.org/en/docs/" }
          ]
        },
        {
          id: "1.2",
          title: "Python",
          description: "General-purpose programming language",
          status: "optional",
          resources: [
            { title: "Python Documentation", url: "https://docs.python.org/3/" }
          ]
        },
        {
          id: "1.3",
          title: "Ruby",
          description: "Dynamic, open source programming language",
          status: "optional",
          resources: [
            { title: "Ruby Documentation", url: "https://ruby-doc.org/" }
          ]
        }
      ]
    },
    {
      id: "2",
      title: "Web Framework",
      description: "Learn a web framework for your language",
      status: "required",
      children: [
        {
          id: "2.1",
          title: "Express.js (Node.js)",
          description: "Minimal web framework for Node.js",
          status: "recommended",
          resources: [
            { title: "Express Documentation", url: "https://expressjs.com/" }
          ]
        },
        {
          id: "2.2",
          title: "Django (Python)",
          description: "High-level Python web framework",
          status: "optional",
          resources: [
            { title: "Django Documentation", url: "https://docs.djangoproject.com/" }
          ]
        },
        {
          id: "2.3",
          title: "Ruby on Rails (Ruby)",
          description: "Server-side web framework",
          status: "optional",
          resources: [
            { title: "Rails Documentation", url: "https://guides.rubyonrails.org/" }
          ]
        }
      ]
    },
    {
      id: "3",
      title: "Database",
      description: "Learn to work with databases",
      status: "required",
      children: [
        {
          id: "3.1",
          title: "SQL Databases",
          description: "PostgreSQL, MySQL, SQLite",
          status: "recommended",
          resources: [
            { title: "PostgreSQL Documentation", url: "https://www.postgresql.org/docs/" }
          ]
        },
        {
          id: "3.2",
          title: "NoSQL Databases",
          description: "MongoDB, Firebase, DynamoDB",
          status: "optional",
          resources: [
            { title: "MongoDB Documentation", url: "https://docs.mongodb.com/" }
          ]
        },
        {
          id: "3.3",
          title: "ORMs",
          description: "Prisma, Sequelize, Mongoose",
          status: "recommended",
          resources: [
            { title: "Prisma Documentation", url: "https://www.prisma.io/docs/" }
          ]
        }
      ]
    },
    {
      id: "4",
      title: "API Development",
      description: "Learn to build APIs",
      status: "required",
      children: [
        {
          id: "4.1",
          title: "REST APIs",
          description: "Representational State Transfer",
          status: "required",
          resources: [
            { title: "REST API Tutorial", url: "https://restfulapi.net/" }
          ]
        },
        {
          id: "4.2",
          title: "GraphQL",
          description: "Query language for APIs",
          status: "optional",
          resources: [
            { title: "GraphQL Documentation", url: "https://graphql.org/learn/" }
          ]
        }
      ]
    },
    {
      id: "5",
      title: "Authentication & Authorization",
      description: "Learn to secure your applications",
      status: "required",
      resources: [
        { title: "Auth0 Documentation", url: "https://auth0.com/docs/" },
        { title: "JWT.io", url: "https://jwt.io/introduction/" }
      ]
    }
  ],
  devops: [
    {
      id: "1",
      title: "Version Control",
      description: "Learn Git and GitHub/GitLab",
      status: "required",
      resources: [
        { title: "Git Documentation", url: "https://git-scm.com/doc" },
        { title: "GitHub Guides", url: "https://guides.github.com/" }
      ]
    },
    {
      id: "2",
      title: "Containers",
      description: "Learn Docker and container orchestration",
      status: "recommended",
      resources: [
        { title: "Docker Documentation", url: "https://docs.docker.com/" }
      ],
      children: [
        {
          id: "2.1",
          title: "Docker",
          description: "Containerization platform",
          status: "recommended"
        },
        {
          id: "2.2",
          title: "Kubernetes",
          description: "Container orchestration",
          status: "optional"
        }
      ]
    },
    {
      id: "3",
      title: "CI/CD",
      description: "Continuous Integration and Deployment",
      status: "recommended",
      resources: [
        { title: "GitHub Actions", url: "https://docs.github.com/en/actions" },
        { title: "CircleCI Documentation", url: "https://circleci.com/docs/" }
      ]
    },
    {
      id: "4",
      title: "Cloud Providers",
      description: "Learn a major cloud platform",
      status: "recommended",
      children: [
        {
          id: "4.1",
          title: "AWS",
          description: "Amazon Web Services",
          status: "optional"
        },
        {
          id: "4.2",
          title: "Azure",
          description: "Microsoft Azure",
          status: "optional"
        },
        {
          id: "4.3",
          title: "GCP",
          description: "Google Cloud Platform",
          status: "optional"
        }
      ]
    }
  ]
};

const RoadmapStepComponent = ({ step, depth = 0 }: { step: RoadmapStep; depth?: number }) => {
  const [expanded, setExpanded] = useState(depth < 1);
  
  const statusIcons = {
    required: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    recommended: <Circle className="h-4 w-4 text-blue-500" />,
    optional: <CircleDashed className="h-4 w-4 text-gray-400" />
  };
  
  const statusColors = {
    required: "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400",
    recommended: "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-400",
    optional: "bg-gray-500/10 border-gray-500/30 text-gray-700 dark:text-gray-400"
  };
  
  return (
    <div className={`mb-3 ${depth > 0 ? 'ml-6' : ''}`}>
      <div 
        className={`p-4 rounded-lg border ${step.status ? statusColors[step.status] : 'border-border/50'} hover:border-primary/30 transition-colors cursor-pointer`}
        onClick={() => step.children && setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            {step.status && (
              <div className="mr-2 mt-1">
                {statusIcons[step.status]}
              </div>
            )}
            <div>
              <h3 className="font-medium">{step.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
              
              {step.resources && expanded && (
                <div className="mt-3 space-y-1.5">
                  <h4 className="text-xs text-muted-foreground uppercase tracking-wide">Resources:</h4>
                  <ul className="space-y-1 mt-1">
                    {step.resources.map((resource, idx) => (
                      <li key={idx}>
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs flex items-center text-primary hover:underline"
                        >
                          <ExternalLink className="h-3 w-3 mr-1.5" />
                          {resource.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          {step.children && (
            <div className="text-primary shrink-0">
              <ArrowRight className={`h-4 w-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
            </div>
          )}
        </div>
      </div>
      
      {expanded && step.children && (
        <div className="mt-3 space-y-3 border-l-2 border-dashed border-border/50 pt-2">
          {step.children.map((childStep) => (
            <RoadmapStepComponent key={childStep.id} step={childStep} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const RoadmapsPage = () => {
  const [activeRoadmap, setActiveRoadmap] = useState("frontend");
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="flex-grow container mx-auto px-6 py-8 max-w-5xl page-fade-in">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="p-3 rounded-full bg-primary/10 mb-4">
            <Map className="w-6 h-6 text-primary" />
          </div>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 tracking-tight animated-gradient-text"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Developer Roadmaps
          </motion.h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Step-by-step guides to becoming a modern developer in different domains.
          </p>
        </div>
        
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-xl opacity-30" />
          <Tabs value={activeRoadmap} onValueChange={setActiveRoadmap} className="relative">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
              <TabsTrigger value="frontend">
                Frontend
              </TabsTrigger>
              <TabsTrigger value="backend">
                Backend
              </TabsTrigger>
              <TabsTrigger value="devops">
                DevOps
              </TabsTrigger>
            </TabsList>
            
            <Card className="border border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {activeRoadmap === "frontend" && "Frontend Developer Roadmap"}
                  {activeRoadmap === "backend" && "Backend Developer Roadmap"}
                  {activeRoadmap === "devops" && "DevOps Engineer Roadmap"}
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                      <span className="text-xs">Required</span>
                    </div>
                    <div className="flex items-center">
                      <Circle className="h-3.5 w-3.5 text-blue-500 mr-1.5" />
                      <span className="text-xs">Recommended</span>
                    </div>
                    <div className="flex items-center">
                      <CircleDashed className="h-3.5 w-3.5 text-gray-400 mr-1.5" />
                      <span className="text-xs">Optional</span>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roadmaps[activeRoadmap as keyof typeof roadmaps].map((step) => (
                    <RoadmapStepComponent key={step.id} step={step} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </Tabs>
        </div>
        
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>These roadmaps are inspired by <a href="https://roadmap.sh" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">roadmap.sh</a> and represent common learning paths.</p>
          <p className="mt-2">Remember that everyone's journey is different, and you don't need to learn everything at once!</p>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default RoadmapsPage;
