import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../animations/variants';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/Card';
import { Code, Server, Smartphone, Database, Globe, Layers } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Frontend Development',
    description: 'Building responsive, accessible, and performant user interfaces using React, Next.js, and modern CSS frameworks like Tailwind.',
  },
  {
    icon: Server,
    title: 'Backend Development',
    description: 'Designing scalable APIs and microservices with Node.js, Express, and REST/GraphQL architecture.',
  },
  {
    icon: Database,
    title: 'Database Architecture',
    description: 'Modeling and optimizing databases in MongoDB, PostgreSQL, and Redis for high-throughput applications.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Creating cross-platform mobile applications using React Native for iOS and Android.',
  },
  {
    icon: Globe,
    title: 'SEO & Performance',
    description: 'Optimizing web applications for search engines and ensuring sub-second load times and perfect Core Web Vitals.',
  },
  {
    icon: Layers,
    title: 'System Design',
    description: 'Architecting robust, cloud-native applications tailored to enterprise requirements on AWS or GCP.',
  }
];

export function Services() {
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
        {services.map((service) => (
          <motion.div key={service.title} variants={fadeUp}>
            <Card className="h-full hover:-translate-y-1 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <service.icon className="h-6 w-6" />
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
        ))}
      </div>
    </motion.div>
  );
}
