import React from 'react';
import { useStore } from '../../store/useStore';
import { BarChart2, TrendingUp, DollarSign, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Overview() {
  const user = useStore((state) => state.user);
  const earnings = useStore((state) => state.earnings);
  const pins = useStore((state) => state.pins);

  const stats = [
    {
      label: 'Total Earnings',
      value: `$${earnings.total.toFixed(2)}`,
      icon: DollarSign,
      change: '+12.5%',
      color: 'text-green-500',
      link: '/dashboard/withdrawals'
    },
    {
      label: 'Total Views',
      value: pins.reduce((acc, pin) => acc + pin.views, 0).toString(),
      icon: BarChart2,
      change: '+8.2%',
      color: 'text-blue-500',
      link: '/dashboard/analytics'
    },
    {
      label: 'Engagement Rate',
      value: '4.6%',
      icon: TrendingUp,
      change: '+2.1%',
      color: 'text-purple-500',
      link: '/dashboard/engagement'
    },
    {
      label: 'Unique Viewers',
      value: pins.reduce((acc, pin) => acc + pin.uniqueViews, 0).toString(),
      icon: Users,
      change: '+5.8%',
      color: 'text-orange-500',
      link: '/dashboard/analytics'
    },
  ];

  // Demo data for the chart
  const data = [
    { name: 'Jan', earnings: 400, views: 2400 },
    { name: 'Feb', earnings: 300, views: 1398 },
    { name: 'Mar', earnings: 200, views: 9800 },
    { name: 'Apr', earnings: 278, views: 3908 },
    { name: 'May', earnings: 189, views: 4800 },
    { name: 'Jun', earnings: 239, views: 3800 },
    { name: 'Jul', earnings: 349, views: 4300 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.link}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{stat.label}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Performance Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="earnings"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorEarnings)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="views"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorViews)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}