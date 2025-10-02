import dynamic from 'next/dynamic'
import Leaderboard from '@/components/Leaderboard'

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false })

export default function HomePage() {
return (
<main className="grid md:grid-cols-[2fr_1fr] gap-4 p-4">
<section className="card p-0 overflow-hidden">
<MapView />
</section>
<aside className="card">
<Leaderboard />
</aside>
</main>
)
}