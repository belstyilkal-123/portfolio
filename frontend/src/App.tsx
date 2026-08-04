import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Skills } from './pages/Skills';
import { Experience } from './pages/Experience';
import { Education } from './pages/Education';
import { Contact } from './pages/Contact';
import { Timeline } from './pages/Timeline';
import { Blog } from './pages/Blog';
import { FAQ } from './pages/FAQ';
import { Services } from './pages/Services';
import { Certificates } from './pages/Certificates';
import { Gallery } from './pages/Gallery';
import { Achievements } from './pages/Achievements';
import { Resume } from './pages/Resume';
import { Testimonials } from './pages/Testimonials';
import { GitHubActivity } from './pages/GitHubActivity';
import { Statistics } from './pages/Statistics';
import { Downloads } from './pages/Downloads';
import { Settings } from './pages/SettingsPage';
import { useUIStore } from './stores/useUIStore';

// Helper for AnimatePresence logic if added later
function PortfolioRoutes() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/education" element={<Education />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/services" element={<Services />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/github" element={<GitHubActivity />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </AppLayout>
  );
}

function RootRoutes() {
  // Initialize theme on mount
  const { theme, setTheme } = useUIStore();
  React.useEffect(() => {
    setTheme(theme);
  }, []);

  return (
    <Routes>
      <Route path="/*" element={<PortfolioRoutes />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default RootRoutes;
