'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User, X, Loader, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getChatbotResponse } from '@/ai/flows/chatbot-flow';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const predefinedQuestions = [
    'What does this app do?',
    'How do I get started?',
    'How can I give feedback?',
  ];
  
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const scrollableView = scrollAreaRef.current.querySelector('div');
        if (scrollableView) {
            scrollableView.scrollTop = scrollableView.scrollHeight;
        }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { response } = await getChatbotResponse({ query: input });
      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting chatbot response:', error);
       const errorMessage: Message = { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again later." };
       setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
    const handlePredefinedQuestion = async (question: string) => {
        const userMessage: Message = { role: 'user', content: question };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
        const { response } = await getChatbotResponse({ query: question });
        const assistantMessage: Message = { role: 'assistant', content: response };
        setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
        console.error('Error getting chatbot response:', error);
        const errorMessage: Message = { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again later." };
        setMessages((prev) => [...prev, errorMessage]);
        } finally {
        setIsLoading(false);
        }
    };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn("fixed bottom-4 right-4 h-16 w-16 rounded-full glassmorphism-button z-50 transition-transform duration-300 ease-in-out hover:scale-110", isOpen ? 'rotate-90 scale-105' : 'rotate-0')}
      >
        <Avatar className="h-12 w-12 bg-background/50">
            <AvatarFallback className="bg-transparent">
                {isOpen ? <X className="h-8 w-8"/> : <Bot className="h-8 w-8 text-primary" />}
            </AvatarFallback>
        </Avatar>
      </Button>
      
      <div className={cn("fixed bottom-24 right-4 w-80 h-[28rem] z-50 transition-all duration-500 ease-in-out", isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none")}>
        <Card className="h-full flex flex-col rounded-2xl glassmorphism-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Hire Helper</CardTitle>
            <Avatar className="h-8 w-8 glassmorphism-card p-0.5">
              <AvatarFallback className="rounded-full bg-transparent"><Bot className="text-primary"/></AvatarFallback>
            </Avatar>
          </CardHeader>
          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <CardContent className="p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-sm text-muted-foreground p-4">
                  <p className="mb-4">Ask me anything about HireLight!</p>
                  <div className="flex flex-col gap-2">
                    {predefinedQuestions.map((q) => (
                      <Button
                        key={q}
                        variant="outline"
                        size="sm"
                        onClick={() => handlePredefinedQuestion(q)}
                        className="glassmorphism-button"
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="h-6 w-6 glassmorphism-card p-0.5">
                      <AvatarFallback className="rounded-full bg-transparent"><Bot className="h-4 w-4 text-primary"/></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-[75%] rounded-lg p-3 text-sm',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'glassmorphism-card-inset'
                    )}
                  >
                    {message.content}
                  </div>
                   {message.role === 'user' && (
                    <Avatar className="h-6 w-6 glassmorphism-card p-0.5">
                      <AvatarFallback className="rounded-full bg-transparent"><User className='h-4 w-4' /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
               {isLoading && (
                  <div className="flex items-start gap-3 justify-start">
                    <Avatar className="h-6 w-6 glassmorphism-card p-0.5">
                       <AvatarFallback className="rounded-full bg-transparent"><Bot className="h-4 w-4 text-primary" /></AvatarFallback>
                    </Avatar>
                    <div className="glassmorphism-card-inset rounded-lg p-2">
                      <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
            </CardContent>
          </ScrollArea>
          <CardFooter>
            <form
                className="flex w-full items-center space-x-2"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                }}
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
                className="glassmorphism-card-inset rounded-lg"
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="glassmorphism-button">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
