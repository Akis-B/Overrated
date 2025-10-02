import '@/styles/globals.css'
import AuthGate from '@/components/AuthGate'
import type { Metadata } from 'next'

export const metadata: Metadata = {
title: 'Overrated',
description: 'Places people didn\'t enjoy — anonymously.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body>
<header className="p-4 flex items-center justify-between">
<div className="h1">Overrated <span className="text-[var(--red)]">😈</span></div>
<nav className="muted">Black • Red • Maroon • Helvetica Neue</nav>
</header>
<AuthGate>
{children}
</AuthGate>
</body>
</html>
)
}