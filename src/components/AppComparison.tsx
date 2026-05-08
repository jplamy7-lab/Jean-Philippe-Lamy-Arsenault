const apps = [
  { name: "Mapulator", rating: 4.8 },
  { name: "Moasure", rating: 4.5 },
  { name: "SiteRecon", rating: 4.7 }
];

export default function AppComparison() {
  return (
    <div id="app-comparison" className="p-4 bg-white rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Applications de mesure comparées</h2>
      <div className="space-y-4">
        {apps.sort((a,b) => b.rating - a.rating).map(app => (
          <div key={app.name} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
            <span className="font-medium text-gray-700">{app.name}</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-semibold">
              Note: {app.rating}/5.0
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
