import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, ExternalLink } from "lucide-react";
import Link from "next/link";

const certificates = [
  {
    name: "Career Essentials in GitHub Professional Certificate",
    url: "https://drive.google.com/file/d/1cuJ9adeOYTBcXAkBCXwxePDyUAaoHOgt/view?usp=sharing",
  },
  {
    name: "General Resume & All Certificates",
    url: "https://drive.google.com/file/d/1V1QLhGdQt3amrdFOTivPQyLaS9lNPNTH/view?usp=sharing",
  },
  {
    name: "Cpp in Spoken Tutorial Project, IIT Bombay",
    url: "https://drive.google.com/file/d/1RKlqqSKtgyztwSCPiVnY1xI4L1NSql0Y/view?usp=sharing",
  },
  {
    name: "C in Spoken Tutorial Project, IIT Bombay",
    url: "https://drive.google.com/file/d/1JYI6onMcyHb17g-k_QUZ8surno8VQiDY/view?usp=sharing",
  },
  {
    name: "Master Data Management for Beginners in tcsioN",
    url: "https://drive.google.com/file/d/1QZX9loHlK_KgZk1oeLghJzxMJ-vS7fSc/view?usp=sharing",
  },
  {
    name: "AI & Prompt Engineering intern at VaultofCodes",
    url: "https://drive.google.com/file/d/12mPChkaRPQ_2_Zho67KbGxjgtBYSy4ak/view?usp=sharing",
  },
  {
    name: "Python Foundation Certification in Infosys SpringBoard",
    url: "https://drive.google.com/file/d/146mwnDmif_TeiLhdeuzrWnnGzSo5smcM/view?usp=sharing",
  },
  {
    name: "Advanced Full Stack Development Internship Program in Innomatics Research Labs",
    url: "https://drive.google.com/file/d/1WOeuTfaFZ_-tnvaYAzmai92INIwAwQ5y/view?usp=sharing",
  },
];

export default function CertificatesSection() {
  return (
    <section id="certificates" className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <Card className="h-full bg-card border-accent/20 glow-accent shadow-2xl shadow-accent/10">
            <CardHeader className="text-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-accent/20 p-4 rounded-full">
                        <Award className="h-10 w-10 text-accent" />
                    </div>
                    <CardTitle className="font-headline text-3xl text-glow-accent">Certificates & Resume</CardTitle>
                </div>
                <CardDescription className="pt-2">
                    View my professional certificates and detailed resume below.
                </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <Card key={cert.name} className="bg-muted/50 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-medium text-center sm:text-left">{cert.name}</p>
                    <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 glow-accent shrink-0">
                      <Link href={cert.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </Button>
                  </Card>
                ))}
              </div>
            </CardContent>
        </Card>
      </div>
    </section>
  );
}
