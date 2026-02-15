// Header.jsx
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaBell, FaUser, FaGamepad } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';

export default function Header() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/browse', label: 'Browse' },
    { path: '/mylist', label: 'My List' },
    { path: '/popular', label: 'Popular' }
  ];

  return (
    <div className="w-full h-full bg-[#0a0a0f] flex items-center px-8 border-b border-[#2d1b4e]">
      {/* Logo Section */}
      <div className="flex items-center gap-2 mr-10">
        <FaGamepad className="text-3xl text-[#9f7aea]" />
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="text-white">Game</span>
          <span className="text-[#9f7aea]">Spec</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-8 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`text-sm font-medium transition-colors duration-200 ${
              location.pathname === item.path 
                ? 'text-[#9f7aea]' 
                : 'text-gray-300 hover:text-[#9f7aea]'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <FaSearch className="text-gray-300 text-lg cursor-pointer hover:text-[#9f7aea] transition-colors" />
        <div className="relative">
          <FaBell className="text-gray-300 text-lg cursor-pointer hover:text-[#9f7aea] transition-colors" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#9f7aea] rounded-full text-[10px] flex items-center justify-center text-white font-bold">
            3
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#2d1b4e] rounded-md flex items-center justify-center">
            <FaUser className="text-white text-sm" />
          </div>
          <IoMdArrowDropdown className="text-gray-300" />
        </div>
      </div>
    </div>
  );
}