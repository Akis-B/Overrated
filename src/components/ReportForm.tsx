'use client';
import { useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { bumpCount } from '@/lib/contributions';
import type { ReportDoc } from '@/lib/types';

const EMOJIS: ReportDoc['emoji'][] = ['🔥','😡','😈','💢'];

export default function ReportForm({ lat, lng, onClose }:{ lat:number; lng:number; onClose:()=>void }) {
const [emoji, setEmoji] = useState<ReportDoc['emoji']>('😈');
const [placeName, setPlaceName] = useState('');
const [note, setNote] = useState('');
const [loading, setLoading] = useState(false);

async function submit() {
await addDoc(collection(db, 'reports'), payload);
await bumpCount();
onClose();
if (!auth.currentUser) return;
setLoading(true);
const user = auth.currentUser;
const username = (await import('firebase/firestore')).getDoc
? undefined : undefined; // placeholder to keep tree-shaking friendly
try {
// lightweight: include username as snapshot; we’ll fetch fresh value via user doc in parent
const userName = (window as any).__username || 'anon';
const payload: ReportDoc = {
userId: user.uid,
username: userName,
emoji,
placeName: placeName.trim() || 'Unnamed spot',
note: note.trim() || undefined,
lat, lng,
createdAt: serverTimestamp(),
} as any;
await addDoc(collection(db, 'reports'), payload);
onClose();
} finally { setLoading(false); }
}

return (
<div className="card absolute left-4 right-4 bottom-4 md:left-1/2 md:translate-x-[-50%] md:w-[560px]">
<div className="flex items-center gap-2">
{EMOJIS.map(e => (
<button key={e} className={`btn ${emoji===e?'btn-primary':'btn-ghost'}`} onClick={()=>setEmoji(e)}>{e}</button>
))}
</div>
<div className="mt-3 grid gap-3">
<input className="bg-neutral-950 border border-neutral-700 rounded-2xl px-4 py-2" placeholder="Place name" value={placeName} onChange={e=>setPlaceName(e.target.value)} />
<textarea className="bg-neutral-950 border border-neutral-700 rounded-2xl px-4 py-2" placeholder="Why was it overrated? (optional)" value={note} onChange={e=>setNote(e.target.value)} maxLength={300} />
</div>
<div className="mt-3 flex gap-2 justify-end">
<button className="btn btn-ghost" onClick={onClose}>Cancel</button>
<button className="btn btn-primary" onClick={submit} disabled={loading}>Add pin</button>
</div>
</div>
);
}