import React, { useState } from 'react';
import { Plus, Folder } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PinGrid } from '../components/PinGrid';

export function Collections() {
  const [isCreating, setIsCreating] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const collections = useStore((state) => state.collections);
  const createCollection = useStore((state) => state.createCollection);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      createCollection({
        id: Date.now().toString(),
        name: newCollectionName.trim(),
        pins: [],
        createdAt: new Date().toISOString(),
      });
      setNewCollectionName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="pt-24 pb-8 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Collections</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
        >
          <Plus className="w-5 h-5" />
          Create Collection
        </button>
      </div>

      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Collection</h2>
            <form onSubmit={handleCreateCollection}>
              <input
                type="text"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Collection name"
                className="w-full px-3 py-2 border rounded-md mb-4"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {collections.map((collection) => (
          <button
            key={collection.id}
            onClick={() => setSelectedCollection(collection.id)}
            className={`p-4 rounded-lg border ${
              selectedCollection === collection.id
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-red-500'
            }`}
          >
            <div className="flex items-center gap-3">
              <Folder className={`w-6 h-6 ${
                selectedCollection === collection.id ? 'text-red-500' : 'text-gray-400'
              }`} />
              <div className="text-left">
                <h3 className="font-medium">{collection.name}</h3>
                <p className="text-sm text-gray-500">
                  {collection.pins.length} pins
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedCollection && (
        <>
          <h2 className="text-2xl font-bold mb-4">
            {collections.find(c => c.id === selectedCollection)?.name}
          </h2>
          <PinGrid
            pins={collections
              .find(c => c.id === selectedCollection)
              ?.pins.map(pinId => useStore.getState().pins.find(p => p.id === pinId))
              .filter(Boolean) || []}
          />
        </>
      )}
    </div>
  );
}