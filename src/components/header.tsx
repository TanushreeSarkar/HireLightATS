'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  PanelLeft,
  Briefcase,
  User,
  Search
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/upload', label: 'Upload' },
  { href: '/reports', label: 'Reports' },
  { href: '/history', label: 'History' },
];

export default function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  if (isAuthPage) {
    return null;
  }
  
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/20 bg-background/50 px-4 backdrop-blur-md sm:px-6">
       <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden glassmorphism-button">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs bg-background/80 backdrop-blur-lg border-r-border/20">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="group flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base glassmorphism-button"
            >
              <Briefcase className="h-6 w-6 transition-all group-hover:scale-110" />
              <span className="sr-only">HireLight</span>
            </Link>
            {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-4 px-2.5 hover:text-foreground",
                    pathname === href ? 'text-foreground font-semibold' : 'text-muted-foreground'
                  )}
                >
                  {label}
                </Link>
            ))}
             <Link
                  href='/profile'
                  className={cn(
                    "flex items-center gap-4 px-2.5 hover:text-foreground",
                    pathname === '/profile' ? 'text-foreground font-semibold' : 'text-muted-foreground'
                  )}
                >
                  Settings
                </Link>
          </nav>
        </SheetContent>
      </Sheet>
      
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search reports..."
          className="w-full rounded-full bg-background/50 pl-10 md:w-[200px] lg:w-[336px] glassmorphism-card-inset"
        />
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <ThemeToggle />
        <span className="hidden sm:inline-block text-sm font-medium">
          Welcome, John Doe
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Avatar className='h-9 w-9 glassmorphism-card p-0.5'>
                <AvatarImage src="https://picsum.photos/36/36" alt="User" data-ai-hint="profile avatar" className="rounded-full" />
                <AvatarFallback className="rounded-full bg-transparent">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glassmorphism-card">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/login">Logout</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
