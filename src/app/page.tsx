
'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import HeroSection from '@/components/sections/hero';
import SkillsSection from '@/components/sections/skills';
import CertificatesSection from '@/components/sections/certificates';
import ProjectsSection from '@/components/sections/projects';
import AiPlayground from '@/components/sections/ai-playground';
import ContactSection from '@/components/sections/contact';
import Footer from '@/components/layout/footer';
import type { Project } from '@/components/sections/projects';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SkillsSection />
        <CertificatesSection />
        <ProjectsSection setSelectedProject={setSelectedProject} />
        <AiPlayground selectedProject={selectedProject} />
        <div className="container mx-auto px-4 py-16 md:py-24">
            <ContactSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
