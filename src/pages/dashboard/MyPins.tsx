import React from 'react';
import { useStore } from '../../store/useStore';
import { PlusCircle, Trash2, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MyPins() {
  const user = useStore((state) => state.user);
  const pins = useStore((state) => state.pins.filter(pin => pin.userId === user?.id));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Pins</h1>
        <Link
          to="/create"
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
        >
          <PlusCircle className="w-5 h-5" />
          Create New Pin
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pins.map((pin) => (
          <div key={pin.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={pin.image}
              alt={pin.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold mb-2">{pin.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>{pin.views} views</span>
                <span>${pin.earnings.toFixed(2)} earned</span>
              </div>
              <div className="flex items-center justify-between">
                <button className="text-gray-600 hover:text-gray-800">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="text-red-500 hover:text-red-600">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}