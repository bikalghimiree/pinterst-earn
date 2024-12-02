import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import type { Pin } from '../types';

interface PinCardProps {
  pin: Pin;
}

export function PinCard({ pin }: PinCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageNaturalSize, setImageNaturalSize] = useState({ width: 0, height: 0 });

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    setImageNaturalSize({
      width: img.naturalWidth,
      height: img.naturalHeight
    });
    setImageLoaded(true);
  };

  const aspectRatio = imageNaturalSize.height / imageNaturalSize.width;
  const gridRowSpan = Math.ceil(aspectRatio * 20); // Adjust the multiplier as needed

  return (
    <div 
      className="relative group mb-4 break-inside-avoid"
      style={{ gridRow: `span ${gridRowSpan}` }}
    >
      <Link to={`/pin/${pin.id}`} className="block">
        <div className="relative rounded-lg overflow-hidden bg-gray-100">
          <img
            src={pin.image}
            alt={pin.title}
            className={`w-full object-cover transition-opacity duration-200 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={() => setImageError(true)}
            style={{ aspectRatio: imageNaturalSize.width ? `${imageNaturalSize.width}/${imageNaturalSize.height}` : undefined }}
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
        </div>
      </Link>

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100">
          <Heart className="w-5 h-5" />
        </button>
        <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100">
              <MessageCircle className="w-5 h-5" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm text-white">
            <span>{pin.saves} saves</span>
            <span>•</span>
            <span>{pin.comments.length} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}