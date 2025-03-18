
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is this tool for?",
    answer:
      "This CLI Generator helps you quickly bootstrap new projects with your preferred framework and features. It generates the exact command you need to run in your terminal to set up a new project with all the selected technologies.",
  },
  {
    question: "Which frameworks are supported?",
    answer:
      "We currently support React, Next.js, Vue, Nuxt, Svelte, SolidJS, Angular, and more. Each framework comes with its own set of compatible features and tools.",
  },
  {
    question: "Can I customize the generated command?",
    answer:
      "Yes! The generated command is based on your selections, but you can manually edit it or add additional flags before running it in your terminal.",
  },
  {
    question: "Are the preset templates customizable?",
    answer:
      "The preset templates provide quick starting points, but you can always modify the selected features after choosing a preset to tailor it to your needs.",
  },
  {
    question: "How do I add additional packages after project creation?",
    answer:
      "After creating your project, you can add more packages using npm, yarn, or pnpm. For example: 'npm install package-name'.",
  },
  {
    question: "Can I contribute to this tool?",
    answer:
      "Absolutely! This is an open-source project, and contributions are welcome. Check out our GitHub repository to learn more about how to contribute.",
  },
  {
    question: "Is there a way to save my preferred configurations?",
    answer:
      "Yes, you can save your configurations as favorites for quick access later. Just click the 'Save as Favorite' button after configuring your project setup.",
  },
  {
    question: "What UI libraries are supported?",
    answer:
      "We support many popular UI libraries including shadcn/ui, Radix UI, Aceternity UI, Material UI, Chakra UI, Tailwind CSS, and more.",
  },
];

const FAQ = () => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-12 mb-8">
      <div className="flex items-center space-x-2 mb-6">
        <HelpCircle className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      </div>
      
      <div className="glass rounded-xl overflow-hidden border-beam">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border-b border-border/50 last:border-0"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-primary/5">
                <span className="text-left font-medium">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
