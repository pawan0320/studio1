
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { getMoleculeAnalysis } from '@/app/actions';
import Image from 'next/image';
import { FlaskConical, Loader2, TestTube } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface MoleculeResult {
    molecularWeight: number;
    logP: number;
    hBondDonors: number;
    hBondAcceptors: number;
    tpsa: number;
    drugLikeness: string;
    summary: string;
}

const exampleSmiles = {
    "Aspirin": "CC(=O)OC1=CC=CC=C1C(=O)O",
    "Ibuprofen": "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O",
    "Caffeine": "CN1C=NC2=C1C(=O)N(C(=O)N2C)C",
};

export default function DrugDiscoveryDemo() {
  const [smiles, setSmiles] = useState(exampleSmiles['Aspirin']);
  const [result, setResult] = useState<MoleculeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const moleculeImageUrl = `https://www.chemspider.com/ImagesHandler.ashx?id=0&w=400&h=400&smi=${encodeURIComponent(smiles)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!smiles.trim()) {
      toast({
        variant: 'destructive',
        title: 'Invalid SMILES',
        description: 'Please enter a valid SMILES string.',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const res = await getMoleculeAnalysis({ smiles });
      if (res.success && res.data) {
        setResult(res.data);
      } else {
        toast({
          variant: 'destructive',
          title: 'AI Error',
          description: res.error || 'Could not get an analysis.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Submission Error',
        description: 'Failed to connect to the AI model.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const PropertyDisplay = ({ label, value }: { label: string, value: string | number }) => (
    <div className="flex justify-between items-baseline p-2 bg-muted/50 rounded-md">
        <dt className="text-sm text-muted-foreground">{label}</dt>
        <dd className="font-mono text-base">{value}</dd>
    </div>
  );

  return (
    <Card className="h-full bg-card border-accent/20 overflow-hidden glow-accent shadow-2xl shadow-accent/10">
      <CardHeader>
        <div className="flex items-start gap-4">
            <div className="bg-accent/20 p-3 rounded-full">
                <FlaskConical className="h-8 w-8 text-accent" />
            </div>
            <div>
                <CardTitle className="text-2xl font-headline text-glow-accent">Drug Discovery Analysis Demo</CardTitle>
                <CardDescription className="pt-2">Enter a molecule's SMILES string to get a conceptual analysis of its drug-like properties from an AI model.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="smiles-input" className="block text-sm font-medium mb-2">SMILES String</label>
                <Input 
                    id="smiles-input"
                    value={smiles}
                    onChange={(e) => setSmiles(e.target.value)}
                    placeholder="e.g., CC(=O)OC1=CC=CC=C1C(=O)O"
                    className="bg-background/50 focus:border-accent border-accent/50"
                    disabled={isLoading}
                />
                 <div className="flex gap-2 mt-2">
                    {Object.entries(exampleSmiles).map(([name, s]) => (
                        <Button key={name} type="button" variant="outline" size="sm" onClick={() => setSmiles(s)} disabled={isLoading}>
                            {name}
                        </Button>
                    ))}
                 </div>
            </div>
          <Button type="submit" disabled={isLoading} className="w-full glow-accent bg-accent text-accent-foreground hover:bg-accent/90">
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <TestTube className="mr-2 h-5 w-5" />}
              Analyze Molecule
          </Button>
        </form>

        {isLoading && (
            <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
                <Loader2 className="h-12 w-12 text-accent animate-spin" />
                <p className="text-muted-foreground">AI is running analysis... this may take a moment.</p>
            </div>
        )}

        {result ? (
            <div className="space-y-6 animate-in fade-in-50">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-muted rounded-lg">
                         <h3 className="text-lg font-bold text-center mb-2">Molecule Structure</h3>
                         <div className="aspect-square bg-white rounded-md p-2">
                            <Image src={moleculeImageUrl} alt={`Structure of ${smiles}`} width={400} height={400} className="object-contain w-full h-full" unoptimized/>
                         </div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg space-y-2">
                        <h3 className="text-lg font-bold">AI Analysis</h3>
                        <dl className="space-y-2">
                            <PropertyDisplay label="Molecular Wt." value={result.molecularWeight.toFixed(2)} />
                            <PropertyDisplay label="LogP" value={result.logP.toFixed(2)} />
                            <PropertyDisplay label="H-Bond Donors" value={result.hBondDonors} />
                            <PropertyDisplay label="H-Bond Acceptors" value={result.hBondAcceptors} />
                            <PropertyDisplay label="TPSA" value={result.tpsa.toFixed(2)} />
                             <PropertyDisplay label="Drug-Likeness" value={result.drugLikeness} />
                        </dl>
                        <div className="pt-2">
                             <p className="text-sm text-muted-foreground font-medium">Summary</p>
                             <p className="text-sm">{result.summary}</p>
                        </div>
                    </div>
                 </div>
            </div>
        ) : (
             !isLoading && <div className="text-center text-muted-foreground italic p-8">Enter a SMILES string to begin analysis.</div>
        )}

        <Alert>
          <FlaskConical className="h-4 w-4" />
          <AlertTitle>Disclaimer</AlertTitle>
          <AlertDescription>
            This tool is for educational purposes only. The analysis is generated by a Large Language Model and may not be accurate. It is not a substitute for professional scientific or medical advice.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
