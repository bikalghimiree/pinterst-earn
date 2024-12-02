import React from 'react';
import { PinGrid } from '../components/PinGrid';
import { useStore } from '../store/useStore';

export function Home() {
  const pins = useStore((state) => state.pins);

  return (
    <div className="pt-20 pb-8">
      <div className="text-center max-w-3xl mx-auto px-4 mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Discover AI-Generated Artwork
        </h1>
        <p className="text-gray-600 text-lg">
          Explore a world of creative possibilities powered by artificial intelligence
        </p>
      </div>

      {pins.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold mb-2">No pins found</h2>
          <p className="text-gray-600">
            Sign up to start sharing your creations
          </p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4">
          <PinGrid />
        </div>
      )}
    </div>
  );
}