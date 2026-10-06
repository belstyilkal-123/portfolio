import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../animations/variants';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/Card';

import { useServices } from '../hooks/useContent';
import * as Icons from 'lucide-react';

export function Services() {
  const { data: services = [], isLoading } = useServices();

  if (isLoading) {
    return <div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  }
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-8"
    >
      <header className="mb-8 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight">Services & Expertise</h2>
        <p className="text-text-muted mt-2">Comprehensive software engineering solutions tailored to modern business needs.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const IconComponent = (Icons as any)[service.icon] || Icons.Code;
          return (
            <motion.div key={service._id} variants={fadeUp}>
              <Card className="h-full hover:-translate-y-1 hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        )})}
      </div>
    </motion.div>
  );
}
