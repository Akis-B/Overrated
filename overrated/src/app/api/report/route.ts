import { NextRequest, NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';
import { geohashForLocation } from 'geofire-common';

export async function POST(req: NextRequest) {
try {
const body = await req.json();
const { userId, username, emoji, placeName, note, lat, lng } = body;
if (!userId || typeof lat !== 'number' || typeof lng !== 'number') {
return NextResponse.json({ error: 'Bad request' }, { status: 400 });
}
const geohash = geohashForLocation([lat, lng]);
await addDoc(collection(db, 'reports'), {
userId, username, emoji, placeName, note, lat, lng, geohash, createdAt: serverTimestamp(),
});
return NextResponse.json({ ok: true });
} catch (e:any) {
return NextResponse.json({ error: e.message }, { status: 500 });
}
}