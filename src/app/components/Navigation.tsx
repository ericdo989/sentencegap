import { Link, useLocation } from 'react-router';
import { Scale, BarChart3, FileText, Home, AlertCircle } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/simulator', label: 'Simulator', icon: Scale },
    { to: '/outliers', label: 'Outlier Cases', icon: AlertCircle },
    { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { to: '/report', label: 'AI Report', icon: FileText },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center gap-2 mr-8">
              <Scale className="w-6 h-6 text-red-600" />
              <span className="font-semibold text-lg">SentenceGap</span>
            </Link>
            <div className="flex gap-1">
              {links.map(({ to, label, icon: Icon }) => {
                const isActive = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`inline-flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                      isActive
                        ? 'border-red-600 text-gray-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
