'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="text-zinc-400 hover:text-zinc-100"
    >
      <Sun className="h-4 w-4 scale-100 transition-all dark:scale-0" suppressHydrationWarning />
      <Moon className="absolute h-4 w-4 scale-0 transition-all dark:scale-100" suppressHydrationWarning />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
