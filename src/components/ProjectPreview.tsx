
import { useState, useEffect } from 'react';
import { Framework, Feature } from '../utils/generateCommand';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Eye, EyeOff, Folder, FileCode, FileText } from 'lucide-react';

interface ProjectPreviewProps {
  framework: Framework;
  features: Feature[];
}

interface FileStructure {
  name: string;
  type: 'file' | 'directory';
  children?: FileStructure[];
}

const ProjectPreview = ({ framework, features }: ProjectPreviewProps) => {
  const [fileStructure, setFileStructure] = useState<FileStructure | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  // Generate file structure based on framework and features
  useEffect(() => {
    const generateFileStructure = () => {
      // Base structure common to most projects
      const baseStructure: FileStructure = {
        name: 'my-app',
        type: 'directory',
        children: [
          {
            name: 'src',
            type: 'directory',
            children: [
              { name: 'main.ts', type: 'file' },
              { name: 'App.tsx', type: 'file' },
            ]
          },
          { name: 'package.json', type: 'file' },
          { name: 'README.md', type: 'file' },
        ]
      };

      // Framework-specific files
      switch (framework) {
        case 'react':
          baseStructure.children?.push(
            { name: 'public', type: 'directory', children: [
              { name: 'index.html', type: 'file' },
              { name: 'favicon.ico', type: 'file' }
            ]}
          );
          break;
        case 'next':
          baseStructure.children?.push(
            { name: 'pages', type: 'directory', children: [
              { name: 'index.tsx', type: 'file' },
              { name: 'api', type: 'directory', children: [
                { name: 'hello.ts', type: 'file' }
              ]},
              { name: '_app.tsx', type: 'file' }
            ]},
            { name: 'public', type: 'directory', children: [
              { name: 'favicon.ico', type: 'file' }
            ]},
            { name: 'next.config.js', type: 'file' }
          );
          break;
        case 'vue':
          baseStructure.children?.push(
            { name: 'public', type: 'directory', children: [
              { name: 'index.html', type: 'file' }
            ]},
            { name: 'components', type: 'directory', children: [
              { name: 'HelloWorld.vue', type: 'file' }
            ]},
            { name: 'App.vue', type: 'file' },
            { name: 'vite.config.js', type: 'file' }
          );
          break;
        case 'nuxt':
          baseStructure.children?.push(
            { name: 'pages', type: 'directory', children: [
              { name: 'index.vue', type: 'file' }
            ]},
            { name: 'components', type: 'directory', children: [
              { name: 'AppHeader.vue', type: 'file' }
            ]},
            { name: 'assets', type: 'directory' },
            { name: 'nuxt.config.js', type: 'file' }
          );
          break;
        case 'svelte':
          baseStructure.children?.push(
            { name: 'public', type: 'directory', children: [
              { name: 'index.html', type: 'file' }
            ]},
            { name: 'src', type: 'directory', children: [
              { name: 'App.svelte', type: 'file' },
              { name: 'main.js', type: 'file' }
            ]},
            { name: 'svelte.config.js', type: 'file' }
          );
          break;
        case 'solid':
          baseStructure.children?.push(
            { name: 'public', type: 'directory', children: [
              { name: 'index.html', type: 'file' }
            ]},
            { name: 'src', type: 'directory', children: [
              { name: 'App.tsx', type: 'file' },
              { name: 'index.tsx', type: 'file' }
            ]},
            { name: 'vite.config.js', type: 'file' }
          );
          break;
      }

      // Add feature-specific files
      if (features.includes('typescript')) {
        baseStructure.children?.push({ name: 'tsconfig.json', type: 'file' });
        // Update src files to .ts/.tsx extensions
        const srcDir = baseStructure.children?.find(child => child.name === 'src');
        if (srcDir && srcDir.children) {
          srcDir.children = srcDir.children.map(file => {
            if (file.type === 'file' && file.name.endsWith('.js')) {
              return { ...file, name: file.name.replace('.js', '.ts') };
            }
            return file;
          });
        }
      }

      if (features.includes('tailwind')) {
        baseStructure.children?.push(
          { name: 'tailwind.config.js', type: 'file' },
          { name: 'postcss.config.js', type: 'file' }
        );
        // Add CSS file
        const srcDir = baseStructure.children?.find(child => child.name === 'src');
        if (srcDir && srcDir.children) {
          srcDir.children.push({ name: 'index.css', type: 'file' });
        }
      }

      if (features.includes('eslint')) {
        baseStructure.children?.push({ name: '.eslintrc.js', type: 'file' });
      }

      if (features.includes('prettier')) {
        baseStructure.children?.push(
          { name: '.prettierrc', type: 'file' },
          { name: '.prettierignore', type: 'file' }
        );
      }

      if (features.includes('jest') || features.includes('vitest')) {
        const testFileName = features.includes('jest') ? 'jest.config.js' : 'vitest.config.js';
        baseStructure.children?.push({ name: testFileName, type: 'file' });
        baseStructure.children?.push({
          name: '__tests__',
          type: 'directory',
          children: [
            { name: 'example.test.ts', type: 'file' }
          ]
        });
      }

      return baseStructure;
    };

    setFileStructure(generateFileStructure());
  }, [framework, features]);

  // Recursive component to render file structure
  const FileTree = ({ structure }: { structure: FileStructure }) => {
    const [expanded, setExpanded] = useState(true);

    if (structure.type === 'file') {
      return (
        <div className="flex items-center py-1 pl-2">
          {structure.name.endsWith('.js') || structure.name.endsWith('.ts') || structure.name.endsWith('.tsx') ? (
            <FileCode className="w-4 h-4 mr-2 text-blue-500" />
          ) : structure.name.endsWith('.md') ? (
            <FileText className="w-4 h-4 mr-2 text-green-500" />
          ) : (
            <FileText className="w-4 h-4 mr-2 text-gray-500" />
          )}
          <span className="text-sm">{structure.name}</span>
        </div>
      );
    }

    return (
      <div>
        <Collapsible open={expanded} onOpenChange={setExpanded}>
          <div className="flex items-center py-1 cursor-pointer" onClick={() => setExpanded(!expanded)}>
            <CollapsibleTrigger asChild>
              <div className="flex items-center">
                <Folder className="w-4 h-4 mr-2 text-yellow-500" />
                <span className="font-medium text-sm">{structure.name}</span>
              </div>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="pl-4 border-l border-dashed border-border/40">
              {structure.children?.map((child, index) => (
                <FileTree key={`${child.name}-${index}`} structure={child} />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  };

  if (!fileStructure) return null;

  return (
    <div className="rounded-xl glass p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-semibold">Project Structure Preview</h3>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          {isOpen ? (
            <>
              <EyeOff className="w-4 h-4 mr-1" />
              Hide Preview
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-1" />
              Show Preview
            </>
          )}
        </button>
      </div>
      
      {isOpen && (
        <div className="max-h-[400px] overflow-y-auto scrollbar-thin p-2 bg-secondary/20 rounded-lg">
          <FileTree structure={fileStructure} />
        </div>
      )}
    </div>
  );
};

export default ProjectPreview;