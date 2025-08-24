
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import ChatbotWidget from '@/components/layout/chatbot-widget';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Pawan Sai Kodali | AI & Security Developer',
  description: 'Personal portfolio of Pawan Sai Kodali, showcasing projects in AI and Security.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.51/build/spline-viewer.js" />
        {children}
        <ChatbotWidget />
        <Toaster />
      </body>
    </html>
  );
}

    