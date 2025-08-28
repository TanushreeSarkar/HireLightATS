'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Upload,
  FileText,
  History,
  Settings,
  Briefcase,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/upload', icon: Upload, label: 'Upload' },
  { href: '/reports', icon: FileText, label: 'Reports' },
  { href: '/history', icon: History, label: 'History' },
];

export function Sidebar() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  if (isAuthPage) {
    return null;
  }

  return (
    <aside className="hidden w-16 flex-col border-r border-border/20 bg-background/30 sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <Link
          href="/"
          className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-10 md:w-10 md:text-base glassmorphism-button"
        >
          <Briefcase className="h-5 w-5 transition-all group-hover:scale-110" />
          <span className="sr-only">HireLight</span>
        </Link>
        <TooltipProvider>
          {navLinks.map(({ href, icon: Icon, label }) => (
            <Tooltip key={href} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:text-foreground',
                    pathname === href
                      ? 'bg-primary/20 text-primary glassmorphism-card-inset'
                      : 'text-muted-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="glassmorphism-card">{label}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href="/profile"
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground',
                  pathname === '/profile' && 'bg-primary/20 text-primary glassmorphism-card-inset'
                )}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="glassmorphism-card">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
