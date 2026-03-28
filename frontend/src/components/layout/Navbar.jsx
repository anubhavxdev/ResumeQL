import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, User, LayoutDashboard, FileText, CreditCard, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/button';

const Navbar = ({ theme = 'dark' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const isLight = theme === 'light';

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Generate', path: '/generate', icon: FileText },
    { name: 'Coins', path: '/payments', icon: CreditCard },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full backdrop-blur-xl ${
        isLight
          ? 'border-b border-outline-variant/40 bg-surface/85'
          : 'border-b border-zinc-800 bg-black/50'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-white">R</div>
              <span className={`text-xl font-bold tracking-tight ${isLight ? 'text-on-surface' : 'text-white'}`}>ResumeQL</span>
            </Link>

            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? isLight
                          ? 'bg-surface-container-high text-on-surface'
                          : 'bg-zinc-800 text-white'
                        : isLight
                          ? 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                          : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="mr-4 flex flex-col items-end">
                <span className={`text-sm font-medium ${isLight ? 'text-on-surface' : 'text-white'}`}>{user?.name}</span>
                <span className="text-xs text-purple-500 font-semibold">{user?.coins} Coins</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className={isLight ? 'text-on-surface-variant hover:text-on-surface' : 'text-zinc-400 hover:text-white'}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className={isLight ? 'text-on-surface-variant' : 'text-zinc-400'}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`md:hidden ${
            isLight
              ? 'border-b border-outline-variant/40 bg-surface-container-lowest'
              : 'border-b border-zinc-800 bg-zinc-900'
          }`}
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-md px-3 py-3 text-base font-medium ${
                  location.pathname === item.path
                    ? isLight
                      ? 'bg-surface-container-high text-on-surface'
                      : 'bg-zinc-800 text-white'
                    : isLight
                      ? 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-3 text-base font-medium text-red-400 ${
                isLight ? 'hover:bg-surface-container-low' : 'hover:bg-zinc-800'
              }`}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
