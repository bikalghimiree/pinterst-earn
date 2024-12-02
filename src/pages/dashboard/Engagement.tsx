import React from 'react';
import { useStore } from '../../store/useStore';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Engagement() {
  const pins = useStore((state) => state.pins);

  const engagementStats = {
    likes: pins.reduce((acc, pin) => acc + pin.saves, 0),
    comments: pins.reduce((acc, pin) => acc + pin.comments.length, 0),
    shares: 156, // Demo data
  };

  // Demo data for the engagement chart
  const engagementData = [
    { date: '2024-03-01', likes: 40, comments: 24, shares: 15 },
    { date: '2024-03-02', likes: 30, comments: 13, shares: 8 },
    { date: '2024-03-03', likes: 20, comments: 98, shares: 12 },
    { date: '2024-03-04', likes: 27, comments: 39, shares: 21 },
    { date: '2024-03-05', likes: 18, comments: 48, shares: 19 },
    { date: '2024-03-06', likes: 23, comments: 38, shares: 14 },
    { date: '2024-03-07', likes: 34, comments: 43, shares: 16 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Engagement</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-50 rounded-lg">
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Likes</h3>
              <p className="text-2xl font-bold">{engagementStats.likes}</p>
            </div>
          </div>
          <div className="text-sm text-green-500">+8.2% from last month</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <MessageCircle className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Comments</h3>
              <p className="text-2xl font-bold">{engagementStats.comments}</p>
            </div>
          </div>
          <div className="text-sm text-green-500">+12.4% from last month</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Share2 className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Shares</h3>
              <p className="text-2xl font-bold">{engagementStats.shares}</p>
            </div>
          </div>
          <div className="text-sm text-green-500">+5.7% from last month</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Engagement Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="likes" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="comments" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="shares" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recent Comments</h2>
        <div className="space-y-4">
          {pins.flatMap(pin => 
            pin.comments.map(comment => ({
              ...comment,
              pinTitle: pin.title,
              pinImage: pin.image,
            }))
          )
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5)
          .map(comment => (
            <div key={comment.id} className="flex items-start gap-4">
              <img
                src={comment.pinImage}
                alt=""
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  On "{comment.pinTitle}"
                </p>
                <p className="text-gray-900">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}