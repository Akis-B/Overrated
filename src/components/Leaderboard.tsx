'use client';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import TierBadge from './TierBadge';

export default function Leaderboard() {
const [rows, setRows] = useState<{ username:string; contributionCount:number }[]>([]);

useEffect(() => {
const q = query(collection(db, 'users'), orderBy('contributionCount', 'desc'), limit(50));
const unsub = onSnapshot(q, s => setRows(s.docs.map(d => d.data() as any)));
return () => unsub();
}, []);

return (
<div>
<h2 className="h2">Leaderboard 🔥</h2>
<ol className="mt-3 space-y-2">
{rows.map((r, i) => (
<li key={i} className="flex items-center justify-between border-b border-neutral-800 pb-2">
<div className="flex items-center gap-3">
<span className="text-neutral-400 w-6">{i+1}</span>
<span className="font-semibold">{r.username}</span>
</div>
<div className="flex items-center gap-2">
<TierBadge count={r.contributionCount} />
<span className="text-sm">{r.contributionCount}</span>
</div>
</li>
))}
</ol>
</div>
);
}