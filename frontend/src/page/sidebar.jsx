// Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { 
  FaGamepad, 
  FaChartLine, 
  FaMicrochip 
} from 'react-icons/fa';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { 
      path: '/', 
      label: 'Browse Games', 
      icon: <FaGamepad className="text-xl" />
    },
    { 
      path: '/fps-prediction', 
      label: 'FPS Prediction', 
      icon: <FaChartLine className="text-xl" />
    },
    { 
      path: '/hardware-benchmark', 
      label: 'Hardware Benchmark', 
      icon: <FaMicrochip className="text-xl" />
    }
  ];

  // Function to check if path is active (handles nested routes)
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-full h-full bg-[#0a0a0f] border-r border-[#2d1b4e] py-8">
      <ul className="space-y-2 px-3">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-[#2d1b4e] text-white'
                  : 'text-gray-400 hover:bg-[#1a1a2e] hover:text-[#9f7aea]'
              }`}
            >
              <span>{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}