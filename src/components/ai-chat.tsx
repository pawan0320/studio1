'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Bot, User, CornerDownLeft, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getPortfolioAnswer } from '@/app/actions';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
        role: 'assistant',
        content: "Hi there! I'm Pawan's AI assistant. Ask me anything about his skills, projects, or background."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await getPortfolioAnswer({ query: input });

      if (result.success && result.data) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: result.data.answer,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const errorMessage: Message = {
          role: 'assistant',
          content: result.error || 'Sorry, something went wrong.',
        };
        setMessages((prev) => [...prev, errorMessage]);
        toast({
          variant: 'destructive',
          title: 'AI Error',
          description: result.error || 'Could not get a response from the assistant.',
        });
      }
    } catch (error) {
       const errorMessage: Message = {
          role: 'assistant',
          content: 'An unexpected error occurred.',
        };
       setMessages((prev) => [...prev, errorMessage]);
       toast({
          variant: 'destructive',
          title: 'Submission Error',
          description: 'Failed to connect to the AI assistant.',
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent">
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3',
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {msg.role === 'assistant' && (
                <div className="bg-primary/20 p-2 rounded-full">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
              )}
              <div
                className={cn(
                  'max-w-sm rounded-lg px-4 py-2',
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
              </div>
              {msg.role === 'user' && (
                 <div className="bg-muted p-2 rounded-full">
                  <User className="h-6 w-6" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
               <div className="bg-primary/20 p-2 rounded-full">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
              <div className="bg-muted rounded-lg px-4 py-3 flex items-center">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t border-primary/20">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about projects..."
            disabled={isLoading}
            className="bg-background/50 focus:border-primary border-primary/50"
          />
          <Button type="submit" disabled={isLoading} className="glow-primary">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CornerDownLeft className="h-4 w-4" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </form>
    </div>
  );
}
