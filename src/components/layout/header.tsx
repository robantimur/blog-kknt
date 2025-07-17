
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpenText, Home, LogIn, Users, Menu, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'Tentang Kami', icon: Users },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Also fetch the initial session
    const getInitialUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        setLoading(false);
    }
    getInitialUser();

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase.auth]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Logout Gagal',
        description: error.message,
      });
    } else {
      toast({
        title: 'Anda telah logout',
      });
      router.push('/');
      router.refresh();
    }
  };

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold font-headline text-primary hover:text-primary/80 transition-colors">
              <BookOpenText className="w-7 h-7" />
              <span>Roban Berkarya</span>
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
            {!loading && (
              user ? (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/admin/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dasbor
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button variant="outline" asChild>
                  <Link href="/admin/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Admin
                  </Link>
                </Button>
              )
            )}
          </nav>
           <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Buka menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-0">
                 <div className="flex flex-col h-full">
                  <SheetHeader className="p-4 border-b">
                    <SheetTitle>
                       <SheetClose asChild>
                        <Link href="/" className="flex items-center gap-2 text-xl font-bold font-headline text-primary">
                            <BookOpenText className="w-7 h-7" />
                            <span>Roban Berkarya</span>
                        </Link>
                       </SheetClose>
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                      Menu navigasi utama. Pilih salah satu link untuk menuju ke halaman yang diinginkan.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex-grow p-4 space-y-2">
                    {navLinks.map((link) => (
                      <SheetClose key={link.href} asChild>
                        <Link
                          href={link.href}
                          className={cn(
                            'flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-colors',
                            pathname === link.href
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                          )}
                        >
                          <link.icon className="w-5 h-5" />
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                   <div className="p-4 border-t mt-auto space-y-2">
                    {!loading && (
                      user ? (
                        <>
                          <SheetClose asChild>
                             <Button variant="secondary" asChild className="w-full">
                                <Link href="/admin/dashboard">
                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                    Dasbor Admin
                                </Link>
                            </Button>
                          </SheetClose>
                          <SheetClose asChild>
                            <Button variant="outline" className="w-full" onClick={handleLogout}>
                              <LogOut className="mr-2 h-4 w-4" />
                              Logout
                            </Button>
                          </SheetClose>
                        </>
                      ) : (
                        <SheetClose asChild>
                          <Button variant="outline" asChild className="w-full">
                              <Link href="/admin/login">
                                  <LogIn className="mr-2 h-4 w-4" />
                                  Admin Login
                              </Link>
                          </Button>
                        </SheetClose>
                      )
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
