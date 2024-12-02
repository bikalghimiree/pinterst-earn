import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, LogOut, LayoutDashboard, User, Heart } from 'lucide-react';
import { useStore } from '../store/useStore';

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserMenu({ isOpen, onClose }: UserMenuProps) {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);

  if (!isOpen || !user) return null;

  return (
    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200">
        <Link to="/profile" onClick={onClose} className="flex items-center gap-3 hover:opacity-80">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </Link>
      </div>

      <div className="py-2">
        <Link
          to="/profile"
          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
          onClick={onClose}
        >
          <User className="w-5 h-5" />
          View Profile
        </Link>
        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
          onClick={onClose}
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>
        <Link
          to="/collections"
          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
          onClick={onClose}
        >
          <Heart className="w-5 h-5" />
          Collections
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
          onClick={onClose}
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </div>

      <div className="border-t border-gray-200 py-2">
        <button
          onClick={() => {
            logout();
            onClose();
          }}
          className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-gray-50 w-full text-left"
        >
          <LogOut className="w-5 h-5" />
          Log out
        </button>
      </div>
    </div>
  );
}