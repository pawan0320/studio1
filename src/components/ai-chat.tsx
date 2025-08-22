'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Bot, User, CornerDownLeft, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getToolSuggestion } from '@/app/actions';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
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
      const result = await getToolSuggestion({ problemDescription: input });

      if (result.success && result.data) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: result.data.suggestedTools,
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
    <Card className="max-w-3xl mx-auto bg-card border-primary/20 glow-primary shadow-2xl shadow-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-xl text-glow-primary">
          <Bot />
          AI Tool Suggester
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 overflow-y-auto space-y-4 pr-4 border-b border-primary/10 mb-4">
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
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
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
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., How can I prevent SQL injection?"
            disabled={isLoading}
            className="flex-1 bg-background/50 focus:border-primary border-primary/50"
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
      </CardContent>
    </Card>
  );
}
