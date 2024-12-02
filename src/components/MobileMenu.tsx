import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, LayoutDashboard, Bookmark, Settings, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-64 bg-white">
        <div className="p-4 border-b">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4">
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              
              <Link to="/" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md" onClick={onClose}>
                <Home className="w-5 h-5" />
                Home
              </Link>
              <Link to="/dashboard" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md" onClick={onClose}>
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </Link>
              <Link to="/collections" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md" onClick={onClose}>
                <Bookmark className="w-5 h-5" />
                Collections
              </Link>
              <Link to="/settings" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md" onClick={onClose}>
                <Settings className="w-5 h-5" />
                Settings
              </Link>
              <button 
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="flex items-center gap-2 p-2 text-red-500 hover:bg-red-50 rounded-md w-full"
              >
                <LogOut className="w-5 h-5" />
                Log out
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <Link
                to="/login"
                className="block w-full px-4 py-2 text-center text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={onClose}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="block w-full px-4 py-2 text-center bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={onClose}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}