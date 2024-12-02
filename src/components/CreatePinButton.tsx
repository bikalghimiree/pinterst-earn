import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export function CreatePinButton() {
  const user = useStore((state) => state.user);

  if (!user) return null;

  return (
    <Link
      to="/create"
      className="fixed bottom-6 right-6 bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
    >
      <Plus className="w-6 h-6" />
    </Link>
  );
}