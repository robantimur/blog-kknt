'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpenText, Home, LogIn, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'Tentang Kami', icon: Users },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-card shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-headline text-primary hover:text-primary/80 transition-colors">
              <BookOpenText className="w-8 h-8" />
              <span>KKN Connect</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
            <Button asChild variant="outline">
              <Link href="/admin/login">
                <LogIn className="mr-2 h-4 w-4" />
                Admin
              </Link>
            </Button>
          </nav>
           <div className="md:hidden">
            {/* Mobile menu could be implemented here with a Sheet component */}
            <Button asChild variant="ghost" size="icon">
              <Link href="/admin/login">
                <LogIn className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
