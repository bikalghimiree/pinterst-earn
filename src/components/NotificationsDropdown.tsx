import React from 'react';
import { useStore } from '../store/useStore';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from '../utils/date';

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsDropdown({ isOpen, onClose }: NotificationsDropdownProps) {
  const notifications = useStore((state) => state.notifications);
  const markNotificationsAsRead = useStore((state) => state.markNotificationsAsRead);

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <button
              onClick={markNotificationsAsRead}
              className="text-sm text-red-500 hover:text-red-600"
            >
              Mark all as read
            </button>
          )}
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No notifications yet
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-gray-50 ${!notification.isRead ? 'bg-red-50' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Bell className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">{notification.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(notification.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <Link
          to="/notifications"
          className="block text-center text-sm text-red-500 hover:text-red-600"
          onClick={onClose}
        >
          See all notifications
        </Link>
      </div>
    </div>
  );
}