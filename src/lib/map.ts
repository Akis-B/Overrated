import L from 'leaflet';

export function emojiIcon(emoji: string) {
return L.divIcon({
className: 'emoji-pin',
html: `<div style="font-size:24px; filter: drop-shadow(0 1px 2px rgba(0,0,0,.8));">${emoji}</div>`,
iconSize: [24, 24],
iconAnchor: [12, 12],
});
}