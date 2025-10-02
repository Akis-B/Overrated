import { nextTierInfo } from '@/lib/tiers';

export default function ProgressBar({ count }:{ count:number }) {
const { next, remaining, progressPct } = nextTierInfo(count);
return (
<div>
<div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
<div className="h-full bg-[var(--red)]" style={{ width: `${progressPct}%` }} />
</div>
<div className="text-xs mt-1 muted">
{next ? `${remaining} more to ${next.name}` : `Max tier reached`}
</div>
</div>
);
}