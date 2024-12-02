import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Bookmark, LayoutDashboard, Home } from 'lucide-react';
import { useStore } from '../store/useStore';
import { clsx } from 'clsx';
import { NotificationsDropdown } from './NotificationsDropdown';
import { UserMenu } from './UserMenu';

export function Header() {
  const user = useStore((state) => state.user);
  const notifications = useStore((state) => state.notifications);
  const trendingSearches = useStore((state) => state.trendingSearches);
  
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  return (
    <header className={clsx(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
      "backdrop-blur-md bg-white/75 shadow-sm"
    )}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-red-500 text-white w-8 h-8 rounded-md flex items-center justify-center font-bold">
                P
              </div>
              <span className="text-xl font-bold">PinSpire</span>
            </Link>
            
            {user && (
              <>
                <Link to="/" className="flex items-center gap-1 font-semibold text-gray-700 hover:text-gray-900">
                  <Home className="w-5 h-5" />
                  Home
                </Link>
                <Link to="/dashboard" className="flex items-center gap-1 font-semibold text-gray-700 hover:text-gray-900">
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
              </>
            )}
          </div>

          <div className="flex-1 max-w-3xl" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search for inspiration..."
                className="w-full py-3 pl-10 pr-4 bg-gray-100/75 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Trending Searches</h3>
                  <div className="space-y-2">
                    {trendingSearches.map((search) => (
                      <button
                        key={search}
                        onClick={() => setSearchQuery(search)}
                        className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div ref={notificationsRef} className="relative">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full relative"
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  >
                    <Bell className="w-6 h-6" />
                    {unreadNotifications > 0 && (
                      <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadNotifications}
                      </span>
                    )}
                  </button>
                  <NotificationsDropdown
                    isOpen={isNotificationsOpen}
                    onClose={() => setIsNotificationsOpen(false)}
                  />
                </div>
                <Link to="/collections" className="p-2 hover:bg-gray-100 rounded-full">
                  <Bookmark className="w-6 h-6" />
                </Link>
                <div ref={userMenuRef} className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="focus:outline-none"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  </button>
                  <UserMenu
                    isOpen={isUserMenuOpen}
                    onClose={() => setIsUserMenuOpen(false)}
                  />
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-medium text-gray-700 hover:text-gray-900"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-red-500 text-white px-4 py-2 rounded-full font-medium hover:bg-red-600"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}