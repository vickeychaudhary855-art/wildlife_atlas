// @ts-nocheck
'use client';
import { useState } from 'react';
import Link from 'next/link';

// Comprehensive Global Species Database for Instant Search & Explore
const ALL_ANIMALS = [
  { id: 'lion', name: 'African Lion', scientific: 'Panthera leo', group: 'Mammals', status: 'Vulnerable', habitat: 'Savanna', desc: 'The king of the jungle, living in social prides across African grasslands.' },
  { id: 'tiger', name: 'Bengal Tiger', scientific: 'Panthera tigris tigris', group: 'Mammals', status: 'Endangered', habitat: 'Tropical Rainforest', desc: 'A majestic apex predator native to the Indian subcontinent.' },
  { id: 'elephant', name: 'African Bush Elephant', scientific: 'Loxodonta africana', group: 'Mammals', status: 'Endangered', habitat: 'Savanna', desc: 'The largest living land animal on Earth with iconic large ears and tusks.' },
  { id: 'blue-whale', name: 'Blue Whale', scientific: 'Balaenoptera musculus', group: 'Marine Mammals', status: 'Endangered', habitat: 'Ocean', desc: 'The largest animal ever known to have lived, roaming deep ocean waters.' },
  { id: 'snow-leopard', name: 'Snow Leopard', scientific: 'Panthera uncia', group: 'Mammals', status: 'Vulnerable', habitat: 'Tundra', desc: 'An elusive big cat adapted to cold, rugged mountain ranges of Central Asia.' },
  { id: 'great-white', name: 'Great White Shark', scientific: 'Carcharodon carcharias', group: 'Sharks & Rays', status: 'Vulnerable', habitat: 'Ocean', desc: 'A powerful apex marine predator found in coastal temperate waters worldwide.' },
  { id: 'bald-eagle', name: 'Bald Eagle', scientific: 'Haliaeetus leucocephalus', group: 'Birds', status: 'Least Concern', habitat: 'Freshwater', desc: 'A large bird of prey and the national symbol of the United States.' },
  { id: 'komodo-dragon', name: 'Komodo Dragon', scientific: 'Varanus komodoensis', group: 'Reptiles', status: 'Endangered', habitat: 'Tropical Rainforest', desc: 'The largest living species of lizard, found on Indonesian islands.' },
  { id: 'giant-panda', name: 'Giant Panda', scientific: 'Ailuropoda melanoleuca', group: 'Mammals', status: 'Vulnerable', habitat: 'Temperate Forest', desc: 'A bear native to South-Central China, famous for its distinctive black and white coat and bamboo diet.' },
  { id: 'cheetah', name: 'Cheetah', scientific: 'Acinonyx jubatus', group: 'Mammals', status: 'Vulnerable', habitat: 'Savanna', desc: 'The fastest land mammal, capable of reaching speeds up to 120 km/h.' },
  { id: 'wolf', name: 'Gray Wolf', scientific: 'Canis lupus', group: 'Mammals', status: 'Least Concern', habitat: 'Temperate Forest', desc: 'A highly adaptable canine native to the wilderness and remote areas of North America and Eurasia.' },
  { id: 'gorilla', name: 'Mountain Gorilla', scientific: 'Gorilla beringei beringei', group: 'Mammals', status: 'Endangered', habitat: 'Tropical Rainforest', desc: 'Powerful primates living in the high-altitude forests of central Africa.' }
];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');

  const filteredAnimals = ALL_ANIMALS.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.scientific.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = selectedGroup === 'All' || animal.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  return (
    <div className="min-h-screen bg-[#0a1910] text-gray-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-400 mb-2">Global Species Catalogue</h1>
        <p className="text-gray-400 mb-6">Explore animals from around the world with instant search and taxonomy filters.</p>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search any animal (e.g., Lion, Tiger, Elephant, Shark)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#11291c] border border-green-800/60 rounded-xl px-6 py-4 text-white text-lg focus:outline-none focus:border-green-500 shadow-lg"
          />
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['All', 'Mammals', 'Birds', 'Reptiles', 'Marine Mammals', 'Sharks & Rays'].map(group => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedGroup === group ? 'bg-green-600 text-white' : 'bg-[#11291c] text-gray-300 hover:bg-green-900/40'}`}
            >
              {group}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnimals.length > 0 ? (
            filteredAnimals.map(animal => (
              <div key={animal.id} className="bg-[#11291c] border border-green-900/50 rounded-xl p-6 shadow-xl hover:border-green-600 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs bg-green-900/60 text-green-300 px-2.5 py-1 rounded-full">{animal.group}</span>
                  <span className="text-xs text-amber-400 font-semibold">{animal.status}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{animal.name}</h3>
                <p className="text-sm italic text-green-400/80 mb-3">{animal.scientific}</p>
                <p className="text-gray-300 text-sm mb-4">{animal.desc}</p>
                <div className="flex justify-between items-center pt-4 border-t border-green-900/40 text-xs text-gray-400">
                  <span>Habitat: {animal.habitat}</span>
                  <span className="text-green-400 font-medium hover:underline cursor-pointer">Profile →</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-400">
              <p className="text-xl">No animals found matching "{searchQuery}". Try searching for Lion, Tiger, Elephant, or Whale!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}