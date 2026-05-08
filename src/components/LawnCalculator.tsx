import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../services/firebaseService';

export default function LawnCalculator() {
  const [address, setAddress] = useState<string>('');
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [area, setArea] = useState<number>(0);
  const [saving, setSaving] = useState(false);

  const calculateArea = () => {
    setArea(length * width);
  };

  const saveProperty = async () => {
    if (!auth.currentUser) return alert('Veuillez vous connecter pour sauvegarder.');
    if (!address || area <= 0) return alert('Veuillez entrer une adresse et calculer une aire valide.');

    setSaving(true);
    try {
      await addDoc(collection(db, 'properties'), {
        address: address,
        street: address.split(',')[0],
        lawnAreaSqFt: area,
        ownerId: auth.currentUser.uid,
      });
      alert('Propriété sauvegardée !');
    } catch (e) {
      console.error('Erreur:', e);
      alert('Erreur lors de la sauvegarde.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div id="lawn-calculator" className="p-4 bg-white rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Calculateur et Sauvegarde</h2>
      <input
        type="text"
        placeholder="Adresse"
        className="border border-gray-300 rounded p-2 w-full mb-4"
        onChange={(e) => setAddress(e.target.value)}
      />
      <div className="flex gap-4 mb-4">
        <input 
          type="number" 
          placeholder="Longueur (ft)" 
          className="border border-gray-300 rounded p-2 flex-grow" 
          onChange={(e) => setLength(Number(e.target.value))} 
        />
        <input 
          type="number" 
          placeholder="Largeur (ft)" 
          className="border border-gray-300 rounded p-2 flex-grow" 
          onChange={(e) => setWidth(Number(e.target.value))} 
        />
        <button 
          onClick={calculateArea} 
          className="bg-green-600 text-white font-medium rounded px-4 py-2 hover:bg-green-700"
        >
          Calculer
        </button>
      </div>
      <div className="text-lg font-bold text-gray-900 mb-4">
        Superficie: <span className="text-green-700">{area} ft²</span>
      </div>
      <button 
        onClick={saveProperty}
        disabled={saving}
        className="bg-blue-600 text-white font-medium rounded px-4 py-2 w-full hover:bg-blue-700 disabled:bg-blue-300"
      >
        {saving ? 'Sauvegarde...' : 'Sauvegarder la propriété'}
      </button>
    </div>
  )
}
