// @ts-nocheck
'use client';
import { useState } from 'react';
import { SAMPLE_ANIMALS } from '@/data/sampleAnimals';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');

  const filteredAnimals = SAMPLE_ANIMALS.filter(animal => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      animal.common_name.toLowerCase().includes(query) || 
      animal.scientific_name.toLowerCase().includes(query) ||
      (animal.taxonomic_group && animal.taxonomic_group.toLowerCase().includes(query));
    
    const matchesGroup = selectedGroup === 'All' || animal.taxonomic_group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  return (
    <div className="min-h-screen bg-[#0a1910] text-gray-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-400 mb-2">Global Species Catalogue</h1>
        <p className="text-gray-400 mb-6">Explore wildlife species from around the world with instant search.</p>

        {/* Search Bar */}
        <div className="mb-8 flex gap-4">
          <input 
            type="text"
            placeholder="Search any animal (e.g., Elephant, Tiger, Lion)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#11291c] border border-green-800/60 rounded-xl px-6 py-4 text-white text-lg focus:outline-none focus:border-green-500 shadow-lg"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="px-6 bg-green-800/50 hover:bg-green-700 text-white rounded-xl font-medium transition-all"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnimals.length > 0 ? (
            filteredAnimals.map((animal, idx) => (
              <div key={idx} className="bg-[#11291c] border border-green-900/50 rounded-xl p-6 shadow-xl hover:border-green-600 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs bg-green-900/60 text-green-300 px-2.5 py-1 rounded-full">{animal.taxonomic_group || 'Animal'}</span>
                  <span className="text-xs text-amber-400 font-semibold">{animal.conservation_status || 'LC'}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{animal.common_name}</h3>
                <p className="text-sm italic text-green-400/80 mb-3">{animal.scientific_name}</p>
                <p className="text-gray-300 text-sm mb-4">{animal.short_description || 'Explore detailed habitat and ecological data for this species.'}</p>
                <div className="flex justify-between items-center pt-4 border-t border-green-900/40 text-xs text-gray-400">
                  <span>Habitat: {animal.habitat || 'Global'}</span>
                  <span className="text-green-400 font-medium">Profile →</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-400">
              <p className="text-xl">No animals found matching "{searchQuery}".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
