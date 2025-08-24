
import Header from '@/components/layout/header';
import HeroSection from '@/components/sections/hero';
import SkillsSection from '@/components/sections/skills';
import CertificatesSection from '@/components/sections/certificates';
import ProjectsSection from '@/components/sections/projects';
import AiPlayground from '@/components/sections/ai-playground';
import ContactSection from '@/components/sections/contact';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SkillsSection />
        <CertificatesSection />
        <ProjectsSection />
        <AiPlayground />
        <div className="container mx-auto px-4 py-16 md:py-24">
            <ContactSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
