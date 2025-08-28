'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { AuthForm } from '@/components/auth/auth-form';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export default function LoginPage() {
    const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // TODO: Add actual login logic
    router.push('/');
  }

  const formFields = (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                <Input placeholder="john.doe@example.com" {...field} className="glassmorphism-card-inset rounded-lg" />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                <Input type="password" placeholder="••••••••" {...field} className="glassmorphism-card-inset rounded-lg" />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <Button type="submit" className="w-full glassmorphism-button text-primary font-bold">
            Sign In
        </Button>
        </form>
    </Form>
  );

  const footer = (
    <>
      Don't have an account?{' '}
      <Link href="/signup" className="font-semibold text-primary hover:underline">
        Sign up
      </Link>
    </>
  );

  return (
    <AuthForm
      title="Sign In"
      description="Welcome Back"
      pageDescription="Sign in to continue to HireLight"
      formFields={formFields}
      footer={footer}
    />
  );
}
