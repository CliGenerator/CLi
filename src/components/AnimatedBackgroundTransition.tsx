import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Framework } from '../utils/generateCommand';

interface AnimatedBackgroundTransitionProps {
  framework: Framework;
}

const AnimatedBackgroundTransition = ({ framework }: AnimatedBackgroundTransitionProps) => {
  const [color, setColor] = useState<string>('rgba(124, 58, 237, 0.1)');

  useEffect(() => {
    // Change background color based on framework
    switch (framework) {
      case 'react':
        setColor('rgba(97, 218, 251, 0.1)');
        break;
      case 'next':
        setColor('rgba(0, 0, 0, 0.05)');
        break;
      case 'vue':
        setColor('rgba(65, 184, 131, 0.1)');
        break;
      case 'nuxt':
        setColor('rgba(0, 159, 127, 0.1)');
        break;
      case 'svelte':
        setColor('rgba(255, 62, 0, 0.1)');
        break;
      case 'solid':
        setColor('rgba(68, 107, 158, 0.1)');
        break;
      default:
        setColor('rgba(124, 58, 237, 0.1)');
    }
  }, [framework]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-0 opacity-50"
      animate={{ backgroundColor: color }}
      transition={{ duration: 1 }}
    />
  );
};

export default AnimatedBackgroundTransition;
