import React, { useEffect, useState } from 'react';
import { PinCard } from './PinCard';
import { useStore } from '../store/useStore';
import type { Pin } from '../types';

interface PinGridProps {
  pins?: Pin[];
  loadMore?: () => void;
}

export function PinGrid({ pins: propPins, loadMore }: PinGridProps) {
  const storePins = useStore((state) => state.pins);
  const [loading, setLoading] = useState(false);
  const pins = propPins || storePins;

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !loadMore) return;

      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000;

      if (scrolledToBottom) {
        setLoading(true);
        loadMore().finally(() => setLoading(false));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, loadMore]);

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
      {pins.map((pin) => (
        <PinCard key={pin.id} pin={pin} />
      ))}
      {loading && (
        <div className="col-span-full flex justify-center p-4">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}