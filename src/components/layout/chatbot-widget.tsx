'use client';

import { useState } from 'react';
import { Bot, X, MessageSquare } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import AIChat from '@/components/ai-chat';
import { cn } from '@/lib/utils';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                size="icon"
                className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 glow-primary shadow-lg"
                onClick={() => setIsOpen(true)}
                aria-label="Open AI Assistant"
              >
                <MessageSquare className="h-8 w-8" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-0 right-0 z-50 sm:bottom-6 sm:right-6 w-full h-full sm:h-[calc(100vh-4rem)] sm:max-h-[700px] sm:w-[440px]"
          >
            <div className="h-full w-full flex flex-col bg-card/80 backdrop-blur-xl border border-primary/20 sm:rounded-2xl shadow-2xl shadow-primary/20 glow-primary">
              <header className="flex items-center justify-between p-4 border-b border-primary/20">
                <div className="flex items-center gap-2">
                  <Bot className="h-6 w-6 text-primary text-glow-primary" />
                  <h3 className="font-headline text-lg text-glow-primary">Ask Pawan</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close chat">
                  <X className="h-5 w-5" />
                </Button>
              </header>
              <div className="flex-1 overflow-hidden">
                <AIChat />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
