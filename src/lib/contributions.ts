import { doc, increment, runTransaction } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';

export async function bumpCount() {
  const uid = auth.currentUser!.uid;
  const userRef = doc(db, 'users', uid);
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(userRef);
    if (!snap.exists()) throw new Error('No user');
    tx.update(userRef, { contributionCount: increment(1) });
  });
}
