'use client';
});
return null;
}

export default function MapView() {
const [reports, setReports] = useState<(ReportDoc & { id: string })[]>([]);
const [formAt, setFormAt] = useState<{lat:number; lng:number}|null>(null);

// Load last 500 reports (upgrade later to geohash-by-viewport)
useEffect(() => {
const q = query(collection(db, 'reports'), orderBy('createdAt', 'desc'), limit(500));
const unsub = onSnapshot(q, s => {
const rows = s.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
setReports(rows as any);
});
return () => unsub();
}, []);

// cache username on window for ReportForm (to avoid extra read)
useEffect(() => {
(async () => {
const u = auth.currentUser; if (!u) return;
const snap = await getDoc(doc(db, 'users', u.uid));
(window as any).__username = snap.data()?.username || 'anon';
})();
}, []);

const center = useMemo(() => ({ lat: 40.7, lng: -73.9 }), []); // NYC default

return (
<div className="relative w-full h-[70vh] md:h-[80vh]">
<MapContainer center={center} zoom={11} scrollWheelZoom className="h-full w-full">
<TileLayer
attribution='&copy; OpenStreetMap contributors'
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
{reports.map(r => (
<Marker key={r.id} position={[r.lat, r.lng]} icon={emojiIcon(r.emoji)}>
<Popup>
<div className="text-sm">
<div className="font-semibold">{r.placeName} {r.emoji}</div>
<div className="muted">by {r.username}</div>
{r.note && <p className="mt-1">{r.note}</p>}
</div>
</Popup>
</Marker>
))}
<ClickHandler onClick={(lat,lng)=>setFormAt({lat,lng})} />
</MapContainer>
{formAt && (
<ReportForm lat={formAt.lat} lng={formAt.lng} onClose={()=>setFormAt(null)} />
)}
</div>
);
}