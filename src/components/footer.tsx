import Link from 'next/link';
import { Briefcase, Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/20 bg-background/50 py-8 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2">
              <div className="glassmorphism-button flex h-10 w-10 items-center justify-center rounded-full text-primary">
                <Briefcase className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">HireLight</span>
            </Link>
            <p className="mt-4 text-center text-sm text-muted-foreground md:text-left">
              AI-Powered Resume Optimization to land your dream job.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              © {new Date().getFullYear()} HireLight. All rights reserved.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/upload" className="text-muted-foreground hover:text-primary">
                  Upload Resume
                </Link>
              </li>
              <li>
                <Link href="/reports" className="text-muted-foreground hover:text-primary">
                  View Reports
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-primary">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="font-semibold">Contact & Support</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="mailto:support@hirelight.app" className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary md:justify-start">
                  <Mail className="h-4 w-4" />
                  <span>support@hirelight.app</span>
                </a>
              </li>
            </ul>
            <div className="mt-4 flex justify-center gap-4 md:justify-start">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
