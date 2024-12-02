import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Wallet2, Settings, User, BarChart2, Image, Heart } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Dashboard() {
  const user = useStore((state) => state.user);
  const earnings = useStore((state) => state.earnings);
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: Image, label: 'My Pins', path: '/dashboard/pins' },
    { icon: BarChart2, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Heart, label: 'Engagement', path: '/dashboard/engagement' },
    { icon: Wallet2, label: 'Withdrawals', path: '/dashboard/withdrawals' },
  ];

  const handleLogout = () => {
    const logout = useStore.getState().logout;
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Earnings Summary */}
            <Link
              to="/dashboard/withdrawals"
              className="block bg-gray-50 rounded-lg p-4 mb-6 hover:bg-gray-100 transition-colors"
            >
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Earnings</h3>
              <p className="text-2xl font-bold text-gray-900">${earnings.total.toFixed(2)}</p>
              <div className="mt-2 text-sm text-gray-500">
                <p>This month: ${earnings.thisMonth.toFixed(2)}</p>
                <p>Pending: ${earnings.pending.toFixed(2)}</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-red-50 text-red-500'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
              >
                <User className="w-5 h-5" />
                Logout
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}