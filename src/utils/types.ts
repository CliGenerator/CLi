
export type Framework = 'react' | 'next' | 'vue' | 'nuxt' | 'svelte' | 'solid';
export type Feature = 
  // Core
  'typescript' | 'tailwind' | 'eslint' | 'router' | 'sass' | 'pwa' | 'prettier' | 'jest' | 'vitest' | 
  // UI Libraries
  'shadcn' | 'radix' | 'aceternity' | 'nextui' | 'mantine' | 'chakra' | 'framer' |
  // Payment
  'stripe' | 'razorpay' | 'paypal' | 
  // Cloud
  'aws' | 'azure' | 'gcp' | 'firebase' | 'supabase' | 
  // AI
  'openai' | 'huggingface' | 'tensorflow' | 'langchain' |
  // Database & Auth
  'prisma' | 'nextauth' | 
  // State Management
  'vuex' | 'redux' | 'mobx' | 'recoil' | 'jotai' | 'zustand' |
  // Components & Libraries
  'recharts' | 'react-table' | 'mdsvex' | 'workbox';

export type TemplatePreset = {
  id: string;
  name: string;
  description: string;
  framework: Framework;
  features: Feature[];
  documentation?: string;
  category?: string;
  logo?: string;
  postInstallation?: string[];
};

export type DocLink = {
  name: string;
  url: string;
};