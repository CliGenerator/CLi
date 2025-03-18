
import React from 'react';
import { Framework } from '../utils/generateCommand';

interface Framework3DIconProps {
  framework: Framework;
  size?: number;
}

const Framework3DIcon = ({ framework, size = 24 }: Framework3DIconProps) => {
  // Generate a framework-specific icon or logo
  const getIconContent = (framework: Framework) => {
    switch (framework) {
      case 'react':
        return '⚛️';
      case 'next':
        return '▲';
      case 'vue':
        return '🟢';
      case 'nuxt':
        return '💚';
      case 'svelte':
        return '🔶';
      case 'solid':
        return '💠';
      default:
        return '🧩';
    }
  };

  return (
    <div 
      className="flex items-center justify-center bg-primary/10 rounded-full p-1 text-primary"
      style={{ 
        width: size, 
        height: size, 
        fontSize: size * 0.6
      }}
    >
      {getIconContent(framework)}
    </div>
  );
};

export default Framework3DIcon;