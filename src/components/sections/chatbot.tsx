import AIChat from "@/components/ai-chat";

export default function ChatbotSection() {
  return (
    <section id="chatbot" className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <h2 className="font-headline text-4xl font-bold tracking-tighter text-glow-primary sm:text-5xl">AI Assistant</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Have a programming or security problem? Describe it below, and my AI assistant will suggest relevant tools or approaches to help you out.
        </p>
      </div>
      <div className="mt-12">
        <AIChat />
      </div>
    </section>
  );
}
