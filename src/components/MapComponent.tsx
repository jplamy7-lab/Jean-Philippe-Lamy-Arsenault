import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function MapComponent() {
  const [center, setCenter] = useState<[number, number]>([45.4215, -75.6972]);
  const [markerPos, setMarkerPos] = useState<[number, number]>([45.4215, -75.6972]);
  const [address, setAddress] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`, {
        headers: { 'User-Agent': 'LawnScanMetricsApp/1.0' }
      });
      const data = await response.json();
      if (data && data.length > 0) {
        const result = [Number(data[0].lat), Number(data[0].lon)] as [number, number];
        setCenter(result);
        setMarkerPos(result);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  return (
    <div id="map" className="w-full h-96 rounded-lg overflow-hidden border border-gray-300 relative">
      <div className="absolute top-2 left-2 z-[1000] flex gap-2 w-[calc(100%-16px)]">
        <input 
          type="text" 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Rechercher une adresse..." 
          className="bg-white border rounded p-2 flex-grow shadow-sm"
        />
        <button onClick={handleSearch} className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 shadow-sm">
          Chercher
        </button>
      </div>
      <MapContainer center={center} zoom={12} className="h-full w-full">
        <ChangeView center={center} zoom={13} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={markerPos}>
          <Popup>Propriété sélectionnée.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
