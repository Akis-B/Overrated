'use client';
import { useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore';
import { normalizeUsername } from '@/utils/username';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
const [name, setName] = useState('');
const [err, setErr] = useState('');
const [loading, setLoading] = useState(false);
const router = useRouter();

async function claim() {
setLoading(true); setErr('');
const user = auth.currentUser!;
const lower = normalizeUsername(name);
try {
await runTransaction(db, async (tx) => {
const usernameRef = doc(db, 'usernames', lower);
const userRef = doc(db, 'users', user.uid);
const usernameSnap = await tx.get(usernameRef);
if (usernameSnap.exists()) throw new Error('Username taken');
tx.set(usernameRef, { uid: user.uid });
tx.set(userRef, { username: name.trim(), createdAt: serverTimestamp(), contributionCount: 0 }, { merge: true });
});
router.replace('/');
} catch (e:any) {
setErr(e.message || 'Could not claim');
} finally { setLoading(false); }
}

return (
<div className="max-w-md mx-auto mt-16 card">
<h1 className="h1">Pick a nickname</h1>
<p className="muted mt-2">For privacy, please don’t use your real name.</p>
<div className="mt-4 flex gap-2">
<input
className="flex-1 bg-neutral-950 border border-neutral-700 rounded-2xl px-4 py-2"
placeholder="e.g., urban-gremlin"
value={name}
onChange={e=>setName(e.target.value)}
maxLength={24}
/>
<button onClick={claim} disabled={loading || name.trim().length < 3} className="btn btn-primary">Claim</button>
</div>
{err && <p className="text-red-400 mt-2">{err}</p>}
<p className="text-sm mt-3">By proceeding, you agree to post respectfully and avoid personal data.</p>
</div>
);
}