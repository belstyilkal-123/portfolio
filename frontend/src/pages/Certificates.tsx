import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../animations/variants';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/Card';
import { Award, ExternalLink, Calendar } from 'lucide-react';

const certificates = [
  {
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    date: 'Dec 2025',
    credentialId: 'AWS-ASA-12345',
    url: '#',
  },
  {
    title: 'MongoDB Node.js Developer Path',
    issuer: 'MongoDB University',
    date: 'Aug 2025',
    credentialId: 'MDB-NODE-67890',
    url: '#',
  },
  {
    title: 'Advanced React and GraphQL',
    issuer: 'Frontend Masters',
    date: 'Feb 2025',
    credentialId: 'FM-ARG-54321',
    url: '#',
  },
];

export function Certificates() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-8"
    >
      <header className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Certifications & Awards</h2>
        <p className="text-text-muted mt-2">Professional certifications validating my expertise in cloud architecture and software development.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {certificates.map((cert) => (
          <motion.div key={cert.title} variants={fadeUp}>
            <Card className="h-full hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 group">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Award className="h-5 w-5" />
                </div>
                <a href={cert.url} target="_blank" rel="noreferrer" className="text-text-muted hover:text-primary transition-colors">
                  <ExternalLink className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl mb-2">{cert.title}</CardTitle>
                <CardDescription className="text-sm font-medium text-primary mb-4">{cert.issuer}</CardDescription>
                
                <div className="flex flex-col gap-2 text-sm text-text-muted mt-auto pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Issued: {cert.date}
                  </div>
                  <div className="font-mono text-xs opacity-75">
                    Credential ID: {cert.credentialId}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
