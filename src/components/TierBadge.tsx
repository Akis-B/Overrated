import { tierFor } from '@/lib/tiers';

export default function TierBadge({ count }:{ count:number }) {
const tier = tierFor(count);
if (!tier) return <span className="px-2 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs">New</span>;
return <span className="px-2 py-1 rounded-full bg-[var(--maroon)]/50 border border-[var(--maroon)] text-xs">{tier.emoji} {tier.name}</span>;
}