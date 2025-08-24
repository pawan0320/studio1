
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function CertificatesSection() {
  return (
    <section id="certificates" className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        <Card className="h-full bg-card border-accent/20 glow-accent shadow-2xl shadow-accent/10 text-center">
            <CardHeader>
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-accent/20 p-4 rounded-full">
                        <Award className="h-10 w-10 text-accent" />
                    </div>
                    <CardTitle className="font-headline text-3xl text-glow-accent">Certificates & Resume</CardTitle>
                </div>
                <CardDescription className="pt-2">
                    View my professional certificates and detailed resume.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 glow-accent">
                    <Link href="https://drive.google.com/file/d/1V1QLhGdQt3amrdFOTivPQyLaS9lNPNTH/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-5 w-5" />
                        Open Google Drive
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    </section>
  );
}
