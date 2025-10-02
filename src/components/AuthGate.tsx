'use client';
import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGate({ children }: { children: React.ReactNode }) {
const [ready, setReady] = useState(false);
const router = useRouter();
const path = usePathname();

useEffect(() => {
const unsub = onAuthStateChanged(auth, async (user) => {
if (!user) {
await signInAnonymously(auth);
return;
}
// Check username
const userRef = doc(db, 'users', user.uid);
const snap = await getDoc(userRef);
const hasUsername = snap.exists() && typeof snap.data()?.username === 'string';
if (!hasUsername && path !== '/welcome') {
router.replace('/welcome');
} else {
setReady(true);
}
});
return () => unsub();
}, [router, path]);

if (!ready) return <div className="p-8">Loading…</div>;
return <>{children}</>;
}