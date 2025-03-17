
import { Framework, Feature } from './types';

export const frameworkCommands: Record<Framework, string> = {
  react: 'npx create-react-app',
  next: 'npx create-next-app',
  vue: 'npm init vue@latest',
  nuxt: 'npx nuxi init',
  svelte: 'npm create svelte@latest',
  solid: 'npx degit solidjs/templates/js',
};

export const featureFlags: Record<Framework, Record<Feature, string>> = {
  react: {
    // Core
    typescript: '--template typescript',
    tailwind: '&& npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p',
    eslint: '',
    router: '&& npm install react-router-dom',
    sass: '&& npm install sass',
    pwa: '&& npm install workbox-webpack-plugin',
    prettier: '&& npm install -D prettier',
    jest: '',
    vitest: '&& npm install -D vitest',
    // UI Libraries
    shadcn: '&& npx shadcn-ui@latest init',
    radix: '&& npm install @radix-ui/react-icons @radix-ui/react-dropdown-menu @radix-ui/react-dialog',
    aceternity: '&& npm install framer-motion tailwindcss-animate class-variance-authority clsx tailwind-merge',
    nextui: '&& npm install @nextui-org/react framer-motion',
    mantine: '&& npm install @mantine/core @mantine/hooks',
    chakra: '&& npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion',
    framer: '&& npm install framer-motion',
    // Payment
    stripe: '&& npm install @stripe/stripe-js @stripe/react-stripe-js',
    razorpay: '&& npm install razorpay',
    paypal: '&& npm install @paypal/react-paypal-js',
    // Cloud
    aws: '&& npm install aws-sdk',
    azure: '&& npm install @azure/storage-blob',
    gcp: '&& npm install @google-cloud/storage',
    firebase: '&& npm install firebase',
    supabase: '&& npm install @supabase/supabase-js',
    // AI
    openai: '&& npm install openai',
    huggingface: '&& npm install @huggingface/inference',
    tensorflow: '&& npm install @tensorflow/tfjs',
    langchain: '&& npm install langchain',
    // Database & Auth
    prisma: '&& npm install prisma @prisma/client',
    nextauth: '&& npm install next-auth',
    // State Management
    vuex: '&& echo "Vuex is not designed for React"',
    redux: '&& npm install redux react-redux @reduxjs/toolkit',
    mobx: '&& npm install mobx mobx-react',
    recoil: '&& npm install recoil',
    jotai: '&& npm install jotai',
    zustand: '&& npm install zustand',
    // Components & Libraries
    recharts: '&& npm install recharts',
    'react-table': '&& npm install @tanstack/react-table',
    mdsvex: '&& echo "MDsveX is not designed for React"',
    workbox: '&& npm install workbox-window',
  },
  next: {
    // Core
    typescript: '--typescript',
    tailwind: '--tailwind',
    eslint: '--eslint',
    router: '',
    sass: '--src-dir',
    pwa: '&& npm install next-pwa',
    prettier: '&& npm install -D prettier',
    jest: '&& npm install -D jest jest-environment-jsdom @testing-library/react',
    vitest: '&& npm install -D vitest',
    // UI Libraries
    shadcn: '&& npx shadcn-ui@latest init',
    radix: '&& npm install @radix-ui/react-icons @radix-ui/react-dropdown-menu @radix-ui/react-dialog',
    aceternity: '&& npm install framer-motion tailwindcss-animate class-variance-authority clsx tailwind-merge',
    nextui: '&& npm install @nextui-org/react framer-motion',
    mantine: '&& npm install @mantine/core @mantine/hooks',
    chakra: '&& npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion',
    framer: '&& npm install framer-motion',
    // Payment
    stripe: '&& npm install @stripe/stripe-js @stripe/react-stripe-js',
    razorpay: '&& npm install razorpay',
    paypal: '&& npm install @paypal/react-paypal-js',
    // Cloud
    aws: '&& npm install aws-sdk',
    azure: '&& npm install @azure/storage-blob',
    gcp: '&& npm install @google-cloud/storage',
    firebase: '&& npm install firebase',
    supabase: '&& npm install @supabase/supabase-js',
    // AI
    openai: '&& npm install openai',
    huggingface: '&& npm install @huggingface/inference',
    tensorflow: '&& npm install @tensorflow/tfjs',
    langchain: '&& npm install langchain',
    // Database & Auth
    prisma: '&& npm install prisma @prisma/client',
    nextauth: '&& npm install next-auth',
    // State Management
    vuex: '&& echo "Vuex is not designed for Next.js"',
    redux: '&& npm install redux react-redux @reduxjs/toolkit',
    mobx: '&& npm install mobx mobx-react',
    recoil: '&& npm install recoil',
    jotai: '&& npm install jotai',
    zustand: '&& npm install zustand',
    // Components & Libraries
    recharts: '&& npm install recharts',
    'react-table': '&& npm install @tanstack/react-table',
    mdsvex: '&& echo "MDsveX is not designed for Next.js"',
    workbox: '&& npm install workbox-window',
  },
  vue: {
    // Core
    typescript: '--typescript',
    tailwind: '--with-tailwind',
    eslint: '--eslint',
    router: '--router',
    sass: '--with-sass',
    pwa: '--pwa',
    prettier: '--prettier',
    jest: '--unit-jest',
    vitest: '--unit-vitest',
    // UI Libraries
    shadcn: '&& echo "shadcn/ui is not available for Vue"',
    radix: '&& echo "Radix UI is not available for Vue"',
    aceternity: '&& npm install framer-motion tailwindcss-animate',
    nextui: '&& npm install @nextui-org/vue',
    mantine: '&& npm install @mantine/core @mantine/hooks',
    chakra: '&& npm install @chakra-ui/vue',
    framer: '&& npm install @framer-motion/vue',
    // Payment
    stripe: '&& npm install @stripe/stripe-js',
    razorpay: '&& npm install razorpay',
    paypal: '&& npm install vue-paypal-js',
    // Cloud
    aws: '&& npm install aws-sdk',
    azure: '&& npm install @azure/storage-blob',
    gcp: '&& npm install @google-cloud/storage',
    firebase: '&& npm install firebase',
    supabase: '&& npm install @supabase/supabase-js',
    // AI
    openai: '&& npm install openai',
    huggingface: '&& npm install @huggingface/inference',
    tensorflow: '&& npm install @tensorflow/tfjs',
    langchain: '&& npm install langchain',
    // Database & Auth
    prisma: '&& npm install prisma @prisma/client',
    nextauth: '&& echo "NextAuth is designed for Next.js only"',
    // State Management
    vuex: '&& npm install vuex',
    redux: '&& echo "Redux is not commonly used with Vue"',
    mobx: '&& npm install mobx',
    recoil: '&& echo "Recoil is not designed for Vue"',
    jotai: '&& echo "Jotai is not designed for Vue"',
    zustand: '&& echo "Zustand is not designed for Vue"',
    // Components & Libraries
    recharts: '&& echo "Recharts is not designed for Vue"',
    'react-table': '&& echo "React Table is not designed for Vue"',
    mdsvex: '&& echo "MDsveX is not designed for Vue"',
    workbox: '&& npm install workbox-window',
  },
  nuxt: {
    // Core
    typescript: '&& npm install -D typescript',
    tailwind: '&& npm install -D @nuxtjs/tailwindcss',
    eslint: '&& npm install -D @nuxtjs/eslint-module',
    router: '',
    sass: '&& npm install -D sass',
    pwa: '&& npm install -D @nuxtjs/pwa',
    prettier: '&& npm install -D prettier',
    jest: '&& npm install -D jest @nuxt/test-utils',
    vitest: '&& npm install -D vitest',
    // UI Libraries
    shadcn: '&& echo "shadcn/ui is not available for Nuxt"',
    radix: '&& echo "Radix UI is not available for Nuxt"',
    aceternity: '&& npm install framer-motion tailwindcss-animate',
    nextui: '&& npm install @nextui-org/nuxt',
    mantine: '&& npm install @mantine/core @mantine/hooks',
    chakra: '&& npm install @chakra-ui/nuxt',
    framer: '&& npm install @framer-motion/vue',
    // Payment
    stripe: '&& npm install @stripe/stripe-js',
    razorpay: '&& npm install razorpay',
    paypal: '&& npm install vue-paypal-js',
    // Cloud
    aws: '&& npm install aws-sdk',
    azure: '&& npm install @azure/storage-blob',
    gcp: '&& npm install @google-cloud/storage',
    firebase: '&& npm install firebase',
    supabase: '&& npm install @supabase/supabase-js',
    // AI
    openai: '&& npm install openai',
    huggingface: '&& npm install @huggingface/inference',
    tensorflow: '&& npm install @tensorflow/tfjs',
    langchain: '&& npm install langchain',
    // Database & Auth
    prisma: '&& npm install prisma @prisma/client',
    nextauth: '&& echo "NextAuth is designed for Next.js only"',
    // State Management
    vuex: '&& npm install vuex',
    redux: '&& echo "Redux is not commonly used with Nuxt"',
    mobx: '&& npm install mobx',
    recoil: '&& echo "Recoil is not designed for Nuxt"',
    jotai: '&& echo "Jotai is not designed for Nuxt"',
    zustand: '&& echo "Zustand is not designed for Nuxt"',
    // Components & Libraries
    recharts: '&& echo "Recharts is not designed for Nuxt"',
    'react-table': '&& echo "React Table is not designed for Nuxt"',
    mdsvex: '&& echo "MDsveX is not designed for Nuxt"',
    workbox: '&& npm install workbox-window',
  },
  svelte: {
    // Core
    typescript: '--with-typescript',
    tailwind: '--with-tailwindcss',
    eslint: '--with-eslint',
    router: '--with-router',
    sass: '--with-scss',
    pwa: '--with-pwa',
    prettier: '--prettier',
    jest: '&& npm install -D jest svelte-jester',
    vitest: '&& npm install -D vitest @testing-library/svelte',
    // UI Libraries
    shadcn: '&& echo "shadcn/ui is not available for Svelte"',
    radix: '&& echo "Radix UI is not available for Svelte"',
    aceternity: '&& npm install framer-motion tailwindcss-animate',
    nextui: '&& echo "NextUI is not available for Svelte"',
    mantine: '&& echo "Mantine is not available for Svelte"',
    chakra: '&& echo "Chakra UI is not available for Svelte"',
    framer: '&& npm install framer-motion',
    // Payment
    stripe: '&& npm install @stripe/stripe-js',
    razorpay: '&& npm install razorpay',
    paypal: '&& npm install svelte-paypal-js',
    // Cloud
    aws: '&& npm install aws-sdk',
    azure: '&& npm install @azure/storage-blob',
    gcp: '&& npm install @google-cloud/storage',
    firebase: '&& npm install firebase',
    supabase: '&& npm install @supabase/supabase-js',
    // AI
    openai: '&& npm install openai',
    huggingface: '&& npm install @huggingface/inference',
    tensorflow: '&& npm install @tensorflow/tfjs',
    langchain: '&& npm install langchain',
    // Database & Auth
    prisma: '&& npm install prisma @prisma/client',
    nextauth: '&& echo "NextAuth is designed for Next.js only"',
    // State Management
    vuex: '&& echo "Vuex is not designed for Svelte"',
    redux: '&& echo "Redux is not commonly used with Svelte"',
    mobx: '&& echo "MobX is not commonly used with Svelte"',
    recoil: '&& echo "Recoil is not designed for Svelte"',
    jotai: '&& echo "Jotai is not designed for Svelte"',
    zustand: '&& echo "Zustand is not designed for Svelte"',
    // Components & Libraries
    recharts: '&& echo "Recharts is not designed for Svelte"',
    'react-table': '&& echo "React Table is not designed for Svelte"',
    mdsvex: '&& npm install mdsvex',
    workbox: '&& npm install workbox-window',
  },
  solid: {
    // Core
    typescript: '&& npm install -D typescript',
    tailwind: '&& npm install -D tailwindcss postcss autoprefixer',
    eslint: '&& npm install -D eslint',
    router: '&& npm install solid-router',
    sass: '&& npm install -D sass',
    pwa: '&& npm install workbox-webpack-plugin',
    prettier: '&& npm install -D prettier',
    jest: '&& npm install -D jest',
    vitest: '&& npm install -D vitest',
    // UI Libraries
    shadcn: '&& echo "shadcn/ui is not available for SolidJS"',
    radix: '&& echo "Radix UI is not available for SolidJS"',
    aceternity: '&& npm install framer-motion tailwindcss-animate',
    nextui: '&& echo "NextUI is not available for SolidJS"',
    mantine: '&& echo "Mantine is not available for SolidJS"',
    chakra: '&& echo "Chakra UI is not available for SolidJS"',
    framer: '&& npm install framer-motion',
    // Payment
    stripe: '&& npm install @stripe/stripe-js',
    razorpay: '&& npm install razorpay',
    paypal: '&& npm install @paypal/paypal-js',
    // Cloud
    aws: '&& npm install aws-sdk',
    azure: '&& npm install @azure/storage-blob',
    gcp: '&& npm install @google-cloud/storage',
    firebase: '&& npm install firebase',
    supabase: '&& npm install @supabase/supabase-js',
    // AI
    openai: '&& npm install openai',
    huggingface: '&& npm install @huggingface/inference',
    tensorflow: '&& npm install @tensorflow/tfjs',
    langchain: '&& npm install langchain',
    // Database & Auth
    prisma: '&& npm install prisma @prisma/client',
    nextauth: '&& echo "NextAuth is designed for Next.js only"',
    // State Management
    vuex: '&& echo "Vuex is not designed for SolidJS"',
    redux: '&& echo "Redux is not commonly used with SolidJS"',
    mobx: '&& npm install mobx',
    recoil: '&& echo "Recoil is not designed for SolidJS"',
    jotai: '&& echo "Jotai is not designed for SolidJS"',
    zustand: '&& echo "Zustand is not designed for SolidJS"',
    // Components & Libraries
    recharts: '&& echo "Recharts is not designed for SolidJS"',
    'react-table': '&& echo "React Table is not designed for SolidJS"',
    mdsvex: '&& echo "MDsveX is not designed for SolidJS"',
    workbox: '&& npm install workbox-window',
  },
};