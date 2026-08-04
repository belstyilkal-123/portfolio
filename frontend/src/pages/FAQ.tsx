import { motion } from 'framer-motion';
import { fadeUp } from '../animations/variants';
import { Card, CardContent } from '../components/ui/Card';

const faqs = [
  {
    question: "What is your primary tech stack?",
    answer: "I specialize in the MERN stack (MongoDB, Express, React, Node.js) but I also have extensive experience with Next.js, PostgreSQL, and TypeScript."
  },
  {
    question: "Do you take on freelance projects?",
    answer: "Yes, I am currently open to freelance opportunities depending on the scope and timeline. Please use the Contact form to get in touch."
  },
  {
    question: "How do you handle state management in large React apps?",
    answer: "I typically use a combination of Zustand for global UI state and React Query (TanStack Query) for server state, caching, and data synchronization."
  },
  {
    question: "What is your approach to testing?",
    answer: "I follow a Test-Driven Development (TDD) approach where appropriate, using Jest and React Testing Library for unit and integration tests, and Cypress for E2E testing."
  }
];

export function FAQ() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="space-y-8 max-w-3xl mx-auto"
    >
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <p className="text-text-muted mt-2">Answers to common questions about my skills, process, and availability.</p>
      </header>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="overflow-hidden hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
