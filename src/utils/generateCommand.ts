
import { Framework, Feature, DocLink, TemplatePreset } from './types';
import { frameworkCommands, featureFlags } from './frameworkCommands';
import { postInstallationSteps } from './postInstallationSteps';
import { documentationLinks } from './documentationLinks';
import { presetTemplates } from './presetTemplates';

export type { Framework, Feature, DocLink, TemplatePreset };
export { presetTemplates, postInstallationSteps, documentationLinks };

export function generateCommand(
  projectName: string,
  framework: Framework,
  features: Feature[]
): string {
  let command = `${frameworkCommands[framework]} ${projectName}`;
  
  features.forEach(feature => {
    const flag = featureFlags[framework][feature];
    if (flag) {
      command += ` ${flag}`;
    }
  });

  return command;
}

export function getPostInstallationSteps(
  framework: Framework,
  features: Feature[]
): string[] {
  let steps: string[] = [];
  
  features.forEach(feature => {
    const featureSteps = postInstallationSteps[framework][feature];
    if (featureSteps && featureSteps.length > 0) {
      steps = [...steps, `\n# ${feature} setup:`, ...featureSteps];
    }
  });
  
  return steps;
}

export function getDocumentationLinks(
  framework: Framework,
  features: Feature[]
): DocLink[] {
  let links: DocLink[] = [
    // Always include framework documentation
    {
      name: `${framework.charAt(0).toUpperCase() + framework.slice(1)} Documentation`,
      url: getFrameworkDocUrl(framework)
    }
  ];
  
  features.forEach(feature => {
    const featureLinks = documentationLinks[framework][feature];
    if (featureLinks && featureLinks.length > 0) {
      links = [...links, ...featureLinks];
    }
  });
  
  return links;
}

function getFrameworkDocUrl(framework: Framework): string {
  switch (framework) {
    case 'react':
      return 'https://react.dev/';
    case 'next':
      return 'https://nextjs.org/docs';
    case 'vue':
      return 'https://vuejs.org/guide/introduction.html';
    case 'nuxt':
      return 'https://nuxt.com/docs';
    case 'svelte':
      return 'https://svelte.dev/docs';
    case 'solid':
      return 'https://www.solidjs.com/guides/getting-started';
    default:
      return '';
  }
}
