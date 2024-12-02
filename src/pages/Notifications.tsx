import React from 'react';
import { useStore } from '../store/useStore';
import { Bell, Heart, MessageCircle, UserPlus, Bookmark } from 'lucide-react';
import { formatDistanceToNow } from '../utils/date';

export function Notifications() {
  const notifications = useStore((state) => state.notifications);
  const markNotificationsAsRead = useStore((state) => state.markNotificationsAsRead);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'follow':
        return <UserPlus className="w-5 h-5 text-green-500" />;
      case 'save':
        return <Bookmark className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-24 pb-8">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <button
              onClick={markNotificationsAsRead}
              className="text-sm text-red-500 hover:text-red-600 font-medium"
            >
              Mark all as read
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No notifications yet
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  !notification.isRead ? 'bg-red-50' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">{notification.content}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDistanceToNow(notification.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}