export type Tier = {
name: string;
min: number; // inclusive threshold
emoji: string;
};

export const TIERS: Tier[] = [
{ name: 'Irked', min: 1, emoji: '💢' },
{ name: 'Disliker', min: 5, emoji: '😡' },
{ name: 'Hater', min: 15, emoji: '😈' },
{ name: 'Major Hater', min: 30, emoji: '🔥' },
{ name: 'Doing too much', min: 100, emoji: '🔥' },
];

export function tierFor(count: number) {
const eligible = TIERS.filter(t => count >= t.min);
return eligible.length ? eligible[eligible.length - 1] : null;
}

export function nextTierInfo(count: number) {
const next = TIERS.find(t => count < t.min);
if (!next) return { next: null, remaining: 0, progressPct: 100 };
const prev = tierFor(count);
const base = prev?.min ?? 0;
const span = next.min - base;
const into = Math.max(0, count - base);
return { next, remaining: Math.max(0, next.min - count), progressPct: Math.round((into / span) * 100) };
}