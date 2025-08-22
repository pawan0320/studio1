import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DownloadCloud } from "lucide-react";

export default function DriveSection() {
  return (
    <Card className="h-full flex flex-col bg-card border-primary/20 glow-primary shadow-2xl shadow-primary/10">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-3 rounded-full">
            <DownloadCloud className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl text-glow-primary">Project Resources</CardTitle>
        </div>
        <CardDescription className="pt-2">
          Access presentations, source code, and other project files directly from my shared Google Drive folder.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center">
        <p className="text-muted-foreground italic">Link to be provided soon.</p>
      </CardContent>
    </Card>
  );
}
