'use client';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { ToastHost } from '@/components/ui/toast';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
            <ToastHost />
        </ThemeProvider>
    );
}