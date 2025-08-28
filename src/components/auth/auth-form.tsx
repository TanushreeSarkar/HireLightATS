import { Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React from 'react';

type AuthFormProps = {
  title: string;
  description: string;
  pageDescription: string;
  formFields: React.ReactNode;
  footer: React.ReactNode;
};

export function AuthForm({ title, description, pageDescription, formFields, footer }: AuthFormProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background/80 backdrop-blur-sm px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="glassmorphism-button mb-4 flex h-16 w-16 items-center justify-center rounded-full text-primary">
            <Briefcase className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold">{description}</h1>
          <p className="text-muted-foreground">{pageDescription}</p>
        </div>
        <Card className="glassmorphism-card rounded-2xl">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-center">{title}</h2>
          </CardHeader>
          <CardContent>
            {formFields}
            <div className="mt-6 text-center text-sm">
              {footer}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
