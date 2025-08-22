import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero';
import SkillsSection from '@/components/sections/skills';
import SecuritySection from '@/components/sections/security';
import ProjectsSection from '@/components/sections/projects';
import AiPlayground from '@/components/sections/ai-playground';
import ContactSection from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SkillsSection />
        <SecuritySection />
        <ProjectsSection />
        <AiPlayground />
        <div className="container mx-auto px-4 py-16 md:py-24">
            <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
