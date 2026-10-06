import { motion } from 'framer-motion';
import { fadeUp } from '../animations/variants';
import { Card, CardContent } from '../components/ui/Card';

import { useFAQs } from '../hooks/useContent';

export function FAQ() {
  const { data: faqs = [], isLoading } = useFAQs();

  if (isLoading) {
    return <div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  }
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
        {faqs.map((faq) => (
          <Card key={faq._id} className="overflow-hidden hover:border-primary/50 transition-colors">
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
