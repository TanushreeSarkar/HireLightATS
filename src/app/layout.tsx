import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Sidebar } from '@/components/sidebar';
import Header from '@/components/header';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { Chatbot } from '@/components/chatbot';
import Footer from '@/components/footer';
import { ProBanner } from '@/components/pro-banner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'HireLight ATS Lite',
  description: 'AI-Powered Resume Optimization',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen font-sans antialiased',
          inter.variable
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen w-full">
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <Header />
              <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
              <ProBanner />
              <Footer />
            </div>
            <Chatbot />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
