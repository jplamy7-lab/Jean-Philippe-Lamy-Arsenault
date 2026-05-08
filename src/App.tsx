import MapComponent from './components/MapComponent';
import LawnCalculator from './components/LawnCalculator';
import AppComparison from './components/AppComparison';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">LawnScan Metrics</h1>
        <p className="text-gray-600">Mesurez votre terrain et comparez avec les outils existants.</p>
      </header>
      
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <MapComponent />
          <LawnCalculator />
        </div>
        <AppComparison />
      </main>
    </div>
  );
}
