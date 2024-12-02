import React from 'react';
import { useStore } from '../../store/useStore';
import { TrendingUp, TrendingDown, DollarSign, BarChart2, Eye } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export function Analytics() {
  const pins = useStore((state) => state.pins);
  const earnings = useStore((state) => state.earnings);

  const topPerformingPins = [...pins]
    .sort((a, b) => b.earnings - a.earnings)
    .slice(0, 5);

  // Enhanced demo data for charts
  const monthlyData = [
    { name: 'Jan', views: 4000, earnings: 240, uniqueViews: 3200 },
    { name: 'Feb', views: 3000, earnings: 180, uniqueViews: 2400 },
    { name: 'Mar', views: 2000, earnings: 120, uniqueViews: 1600 },
    { name: 'Apr', views: 2780, earnings: 167, uniqueViews: 2224 },
    { name: 'May', views: 1890, earnings: 113, uniqueViews: 1512 },
    { name: 'Jun', views: 2390, earnings: 143, uniqueViews: 1912 },
    { name: 'Jul', views: 3490, earnings: 209, uniqueViews: 2792 },
  ];

  const dailyData = [
    { day: 'Mon', views: 1200, earnings: 72 },
    { day: 'Tue', views: 1400, earnings: 84 },
    { day: 'Wed', views: 1600, earnings: 96 },
    { day: 'Thu', views: 1800, earnings: 108 },
    { day: 'Fri', views: 2000, earnings: 120 },
    { day: 'Sat', views: 1700, earnings: 102 },
    { day: 'Sun', views: 1300, earnings: 78 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'earnings' ? `$${entry.value}` : entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Analytics Overview</h1>
        <select className="px-4 py-2 border rounded-lg bg-white">
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="180">Last 6 months</option>
          <option value="365">Last year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Eye className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-2xl font-bold">{pins.reduce((acc, pin) => acc + pin.views, 0).toLocaleString()}</p>
              <p className="text-sm text-green-500 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +12.5% from last month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <BarChart2 className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Unique Viewers</p>
              <p className="text-2xl font-bold">{pins.reduce((acc, pin) => acc + pin.uniqueViews, 0).toLocaleString()}</p>
              <p className="text-sm text-green-500 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +8.2% from last month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold">${earnings.total.toFixed(2)}</p>
              <p className="text-sm text-green-500 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +15.3% from last month
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-6">Monthly Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorViews)"
                  name="Views"
                />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#ef4444"
                  fillOpacity={1}
                  fill="url(#colorEarnings)"
                  name="Earnings ($)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-6">Daily Engagement</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="views" fill="#3b82f6" name="Views" radius={[4, 4, 0, 0]} />
                <Bar dataKey="earnings" fill="#ef4444" name="Earnings ($)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-6">Top Performing Pins</h2>
        <div className="space-y-6">
          {topPerformingPins.map((pin) => (
            <div key={pin.id} className="flex items-center gap-4">
              <img
                src={pin.image}
                alt={pin.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium mb-1">{pin.title}</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Views</p>
                    <p className="font-medium">{pin.views.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Unique Views</p>
                    <p className="font-medium">{pin.uniqueViews.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Earnings</p>
                    <p className="font-medium">${pin.earnings.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div className={`flex items-center gap-1 ${
                pin.views > 1000 ? 'text-green-500' : 'text-red-500'
              }`}>
                {pin.views > 1000 ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )}
                <span className="font-medium">
                  {pin.views > 1000 ? '+12.5%' : '-5.2%'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}