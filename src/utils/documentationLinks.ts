
import { Framework, Feature, DocLink } from './types';

// Fix for the missing documentation links
const createBaseDocLinks = (): Record<Feature, DocLink[]> => {
  return {
    // Core
    typescript: [{ name: 'TypeScript Documentation', url: 'https://www.typescriptlang.org/docs/' }],
    tailwind: [{ name: 'Tailwind Documentation', url: 'https://tailwindcss.com/docs' }],
    eslint: [{ name: 'ESLint Documentation', url: 'https://eslint.org/docs/latest/use/getting-started' }],
    router: [{ name: 'Routing Documentation', url: 'https://router.vuejs.org/' }],
    sass: [{ name: 'Sass Documentation', url: 'https://sass-lang.com/documentation/' }],
    pwa: [{ name: 'PWA Documentation', url: 'https://web.dev/progressive-web-apps/' }],
    prettier: [{ name: 'Prettier Documentation', url: 'https://prettier.io/docs/en/' }],
    jest: [{ name: 'Jest Documentation', url: 'https://jestjs.io/docs/getting-started' }],
    vitest: [{ name: 'Vitest Documentation', url: 'https://vitest.dev/guide/' }],
    // UI Libraries
    shadcn: [{ name: 'shadcn/ui Documentation', url: 'https://ui.shadcn.com/docs' }],
    radix: [{ name: 'Radix UI Documentation', url: 'https://www.radix-ui.com/docs/primitives/overview/introduction' }],
    aceternity: [{ name: 'Aceternity UI Documentation', url: 'https://ui.aceternity.com/components' }],
    nextui: [{ name: 'NextUI Documentation', url: 'https://nextui.org/docs/guide/introduction' }],
    mantine: [{ name: 'Mantine Documentation', url: 'https://mantine.dev/getting-started/' }],
    chakra: [{ name: 'Chakra UI Documentation', url: 'https://chakra-ui.com/getting-started' }],
    framer: [{ name: 'Framer Motion Documentation', url: 'https://www.framer.com/motion/' }],
    // Payment
    stripe: [{ name: 'Stripe Documentation', url: 'https://stripe.com/docs/js' }],
    razorpay: [{ name: 'Razorpay Documentation', url: 'https://razorpay.com/docs/#home-payments' }],
    paypal: [{ name: 'PayPal Documentation', url: 'https://developer.paypal.com/docs/checkout/' }],
    // Cloud
    aws: [{ name: 'AWS SDK Documentation', url: 'https://docs.aws.amazon.com/sdk-for-javascript/' }],
    azure: [{ name: 'Azure SDK Documentation', url: 'https://learn.microsoft.com/en-us/azure/developer/javascript/' }],
    gcp: [{ name: 'Google Cloud SDK', url: 'https://cloud.google.com/nodejs/docs/reference' }],
    firebase: [{ name: 'Firebase Documentation', url: 'https://firebase.google.com/docs/web/setup' }],
    supabase: [{ name: 'Supabase Documentation', url: 'https://supabase.com/docs' }],
    // AI
    openai: [{ name: 'OpenAI API Documentation', url: 'https://platform.openai.com/docs/introduction' }],
    huggingface: [{ name: 'Hugging Face Documentation', url: 'https://huggingface.co/docs/transformers/index' }],
    tensorflow: [{ name: 'TensorFlow.js Documentation', url: 'https://www.tensorflow.org/js' }],
    langchain: [{ name: 'LangChain Documentation', url: 'https://js.langchain.com/docs/' }],
    // Database & Auth
    prisma: [{ name: 'Prisma Documentation', url: 'https://www.prisma.io/docs' }],
    nextauth: [{ name: 'NextAuth.js Documentation', url: 'https://next-auth.js.org/getting-started/introduction' }],
    // State Management
    vuex: [{ name: 'Vuex Documentation', url: 'https://vuex.vuejs.org/' }],
    redux: [{ name: 'Redux Documentation', url: 'https://redux.js.org/introduction/getting-started' }],
    mobx: [{ name: 'MobX Documentation', url: 'https://mobx.js.org/README.html' }],
    recoil: [{ name: 'Recoil Documentation', url: 'https://recoiljs.org/docs/introduction/getting-started' }],
    jotai: [{ name: 'Jotai Documentation', url: 'https://jotai.org/docs/introduction' }],
    zustand: [{ name: 'Zustand Documentation', url: 'https://docs.pmnd.rs/zustand/getting-started/introduction' }],
    // Components & Libraries
    recharts: [{ name: 'Recharts Documentation', url: 'https://recharts.org/en-US/' }],
    'react-table': [{ name: 'React Table Documentation', url: 'https://tanstack.com/table/latest' }],
    mdsvex: [{ name: 'MDsveX Documentation', url: 'https://mdsvex.com/docs' }],
    workbox: [{ name: 'Workbox Documentation', url: 'https://developer.chrome.com/docs/workbox/' }],
  };
};

export const documentationLinks: Record<Framework, Record<Feature, DocLink[]>> = {
  react: {
    // Core
    typescript: [
      { name: 'TypeScript with React', url: 'https://react.dev/learn/typescript' },
      { name: 'TypeScript Documentation', url: 'https://www.typescriptlang.org/docs/' }
    ],
    tailwind: [
      { name: 'Tailwind with React', url: 'https://tailwindcss.com/docs/guides/create-react-app' },
      { name: 'Tailwind Documentation', url: 'https://tailwindcss.com/docs' }
    ],
    eslint: [
      { name: 'ESLint Setup', url: 'https://eslint.org/docs/latest/use/getting-started' },
      { name: 'ESLint with React', url: 'https://github.com/jsx-eslint/eslint-plugin-react' }
    ],
    router: [
      { name: 'React Router Documentation', url: 'https://reactrouter.com/en/main' }
    ],
    sass: [
      { name: 'Sass with React', url: 'https://create-react-app.dev/docs/adding-a-sass-stylesheet/' }
    ],
    pwa: [
      { name: 'PWA with React', url: 'https://create-react-app.dev/docs/making-a-progressive-web-app/' }
    ],
    prettier: [
      { name: 'Prettier with React', url: 'https://prettier.io/docs/en/integrating-with-linters.html' }
    ],
    jest: [
      { name: 'Jest with React', url: 'https://jestjs.io/docs/tutorial-react' }
    ],
    vitest: [
      { name: 'Vitest with React', url: 'https://vitest.dev/guide/index.html' }
    ],
    // UI Libraries
    shadcn: [
      { name: 'shadcn/ui Documentation', url: 'https://ui.shadcn.com/docs' }
    ],
    radix: [
      { name: 'Radix UI Documentation', url: 'https://www.radix-ui.com/docs/primitives/overview/introduction' }
    ],
    aceternity: [
      { name: 'Aceternity UI Documentation', url: 'https://ui.aceternity.com/components' }
    ],
    nextui: [
      { name: 'NextUI Documentation', url: 'https://nextui.org/docs/guide/introduction' }
    ],
    mantine: [
      { name: 'Mantine Documentation', url: 'https://mantine.dev/getting-started/' }
    ],
    chakra: [
      { name: 'Chakra UI Documentation', url: 'https://chakra-ui.com/getting-started' }
    ],
    framer: [
      { name: 'Framer Motion Documentation', url: 'https://www.framer.com/motion/' }
    ],
    // Payment
    stripe: [
      { name: 'Stripe React Documentation', url: 'https://stripe.com/docs/stripe-js/react' }
    ],
    razorpay: [
      { name: 'Razorpay Documentation', url: 'https://razorpay.com/docs/#home-payments' }
    ],
    paypal: [
      { name: 'PayPal React Documentation', url: 'https://paypal.github.io/react-paypal-js/' }
    ],
    // Cloud
    aws: [
      { name: 'AWS SDK Documentation', url: 'https://docs.aws.amazon.com/sdk-for-javascript/' }
    ],
    azure: [
      { name: 'Azure SDK Documentation', url: 'https://learn.microsoft.com/en-us/azure/developer/javascript/' }
    ],
    gcp: [
      { name: 'Google Cloud SDK', url: 'https://cloud.google.com/nodejs/docs/reference' }
    ],
    firebase: [
      { name: 'Firebase Documentation', url: 'https://firebase.google.com/docs/web/setup' }
    ],
    supabase: [
      { name: 'Supabase JavaScript Documentation', url: 'https://supabase.com/docs/reference/javascript/introduction' }
    ],
    // AI
    openai: [
      { name: 'OpenAI API Documentation', url: 'https://platform.openai.com/docs/introduction' }
    ],
    huggingface: [
      { name: 'Hugging Face Documentation', url: 'https://huggingface.co/docs/transformers/index' }
    ],
    tensorflow: [
      { name: 'TensorFlow.js Documentation', url: 'https://www.tensorflow.org/js' }
    ],
    langchain: [
      { name: 'LangChain JS Documentation', url: 'https://js.langchain.com/docs/' }
    ],
    // Database & Auth
    prisma: [
      { name: 'Prisma with React', url: 'https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices' }
    ],
    nextauth: [
      { name: 'NextAuth.js Documentation', url: 'https://next-auth.js.org/getting-started/introduction' }
    ],
    // State Management
    vuex: [
      { name: 'Vuex Documentation', url: 'https://vuex.vuejs.org/' }
    ],
    redux: [
      { name: 'Redux with React', url: 'https://react-redux.js.org/introduction/getting-started' }
    ],
    mobx: [
      { name: 'MobX with React', url: 'https://mobx.js.org/react-integration.html' }
    ],
    recoil: [
      { name: 'Recoil Documentation', url: 'https://recoiljs.org/docs/introduction/getting-started' }
    ],
    jotai: [
      { name: 'Jotai Documentation', url: 'https://jotai.org/docs/introduction' }
    ],
    zustand: [
      { name: 'Zustand Documentation', url: 'https://docs.pmnd.rs/zustand/getting-started/introduction' }
    ],
    // Components & Libraries
    recharts: [
      { name: 'Recharts Documentation', url: 'https://recharts.org/en-US/' }
    ],
    'react-table': [
      { name: 'React Table Documentation', url: 'https://tanstack.com/table/latest' }
    ],
    mdsvex: [
      { name: 'MDsveX Documentation', url: 'https://mdsvex.com/docs' }
    ],
    workbox: [
      { name: 'Workbox Documentation', url: 'https://developer.chrome.com/docs/workbox/' }
    ],
  },
  next: {
    // Core
    typescript: [
      { name: 'TypeScript with Next.js', url: 'https://nextjs.org/docs/pages/building-your-application/configuring/typescript' }
    ],
    tailwind: [
      { name: 'Tailwind with Next.js', url: 'https://tailwindcss.com/docs/guides/nextjs' }
    ],
    eslint: [
      { name: 'ESLint with Next.js', url: 'https://nextjs.org/docs/pages/building-your-application/configuring/eslint' }
    ],
    router: [
      { name: 'Next.js Routing', url: 'https://nextjs.org/docs/pages/building-your-application/routing' }
    ],
    sass: [
      { name: 'Sass with Next.js', url: 'https://nextjs.org/docs/pages/building-your-application/configuring/sass' }
    ],
    pwa: [
      { name: 'PWA with Next.js', url: 'https://github.com/shadowwalker/next-pwa' }
    ],
    prettier: [
      { name: 'Prettier with Next.js', url: 'https://nextjs.org/docs/pages/building-your-application/configuring/eslint#prettier' }
    ],
    jest: [
      { name: 'Jest with Next.js', url: 'https://nextjs.org/docs/pages/building-your-application/optimizing/testing#jest-and-react-testing-library' }
    ],
    vitest: [
      { name: 'Vitest with Next.js', url: 'https://vitest.dev/guide/index.html' }
    ],
    // UI Libraries
    shadcn: [
      { name: 'shadcn/ui Documentation', url: 'https://ui.shadcn.com/docs/installation/next' }
    ],
    radix: [
      { name: 'Radix UI Documentation', url: 'https://www.radix-ui.com/docs/primitives/overview/introduction' }
    ],
    aceternity: [
      { name: 'Aceternity UI Documentation', url: 'https://ui.aceternity.com/components' }
    ],
    nextui: [
      { name: 'NextUI Documentation', url: 'https://nextui.org/docs/frameworks/nextjs' }
    ],
    mantine: [
      { name: 'Mantine Documentation', url: 'https://mantine.dev/guides/next/' }
    ],
    chakra: [
      { name: 'Chakra UI Documentation', url: 'https://chakra-ui.com/getting-started/nextjs-guide' }
    ],
    framer: [
      { name: 'Framer Motion Documentation', url: 'https://www.framer.com/motion/' }
    ],
    // Payment
    stripe: [
      { name: 'Stripe Next.js Documentation', url: 'https://stripe.com/docs/stripe-js/react' }
    ],
    razorpay: [
      { name: 'Razorpay Documentation', url: 'https://razorpay.com/docs/#home-payments' }
    ],
    paypal: [
      { name: 'PayPal Next.js Integration', url: 'https://paypal.github.io/react-paypal-js/' }
    ],
    // Cloud
    aws: [
      { name: 'AWS SDK Documentation', url: 'https://docs.aws.amazon.com/sdk-for-javascript/' }
    ],
    azure: [
      { name: 'Azure SDK Documentation', url: 'https://learn.microsoft.com/en-us/azure/developer/javascript/' }
    ],
    gcp: [
      { name: 'Google Cloud SDK', url: 'https://cloud.google.com/nodejs/docs/reference' }
    ],
    firebase: [
      { name: 'Firebase Documentation', url: 'https://firebase.google.com/docs/web/setup' }
    ],
    supabase: [
      { name: 'Supabase Next.js Integration', url: 'https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs' }
    ],
    // AI
    openai: [
      { name: 'OpenAI API Documentation', url: 'https://platform.openai.com/docs/introduction' }
    ],
    huggingface: [
      { name: 'Hugging Face Documentation', url: 'https://huggingface.co/docs/transformers/index' }
    ],
    tensorflow: [
      { name: 'TensorFlow.js Documentation', url: 'https://www.tensorflow.org/js' }
    ],
    langchain: [
      { name: 'LangChain JS Documentation', url: 'https://js.langchain.com/docs/' }
    ],
    // Database & Auth
    prisma: [
      { name: 'Prisma with Next.js', url: 'https://www.prisma.io/nextjs' }
    ],
    nextauth: [
      { name: 'NextAuth.js Documentation', url: 'https://next-auth.js.org/getting-started/introduction' }
    ],
    // State Management
    vuex: [
      { name: 'Vuex Documentation', url: 'https://vuex.vuejs.org/' }
    ],
    redux: [
      { name: 'Redux with Next.js', url: 'https://redux.js.org/usage/nextjs' }
    ],
    mobx: [
      { name: 'MobX with Next.js', url: 'https://mobx.js.org/react-integration.html' }
    ],
    recoil: [
      { name: 'Recoil Documentation', url: 'https://recoiljs.org/docs/introduction/getting-started' }
    ],
    jotai: [
      { name: 'Jotai Documentation', url: 'https://jotai.org/docs/introduction' }
    ],
    zustand: [
      { name: 'Zustand Documentation', url: 'https://docs.pmnd.rs/zustand/getting-started/introduction' }
    ],
    // Components & Libraries
    recharts: [
      { name: 'Recharts Documentation', url: 'https://recharts.org/en-US/' }
    ],
    'react-table': [
      { name: 'React Table Documentation', url: 'https://tanstack.com/table/latest' }
    ],
    mdsvex: [
      { name: 'MDsveX Documentation', url: 'https://mdsvex.com/docs' }
    ],
    workbox: [
      { name: 'Workbox Documentation', url: 'https://developer.chrome.com/docs/workbox/' }
    ],
  },
  vue: {
    ...createBaseDocLinks(),
    typescript: [{ name: 'TypeScript with Vue', url: 'https://vuejs.org/guide/typescript/overview.html' }],
    tailwind: [{ name: 'Tailwind with Vue', url: 'https://tailwindcss.com/docs/guides/vue-3-vite' }],
    router: [{ name: 'Vue Router', url: 'https://router.vuejs.org/' }]
  },
  nuxt: {
    ...createBaseDocLinks(),
    typescript: [{ name: 'TypeScript with Nuxt', url: 'https://nuxt.com/docs/guide/concepts/typescript' }],
    tailwind: [{ name: 'Tailwind with Nuxt', url: 'https://tailwindcss.nuxtjs.org/getting-started/setup' }]
  },
  svelte: {
    ...createBaseDocLinks(),
    typescript: [{ name: 'TypeScript with Svelte', url: 'https://svelte.dev/docs/typescript' }],
    tailwind: [{ name: 'Tailwind with Svelte', url: 'https://tailwindcss.com/docs/guides/sveltekit' }]
  },
  solid: {
    ...createBaseDocLinks(),
    typescript: [{ name: 'TypeScript with SolidJS', url: 'https://www.solidjs.com/guides/typescript' }],
    tailwind: [{ name: 'Tailwind with SolidJS', url: 'https://tailwindcss.com/docs/guides/solidjs' }]
  }
};