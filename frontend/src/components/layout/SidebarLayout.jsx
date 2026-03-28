import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  User, 
  LogOut, 
  Menu, 
  X
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const SidebarLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Generate', path: '/generate', icon: FileText },
    { name: 'Coins', path: '/payments', icon: CreditCard },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="px-6 py-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-container font-bold text-on-primary shadow-ambient">
            R
          </div>
          <span className="text-2xl font-bold tracking-tight text-on-surface">ResumeQL</span>
        </div>
        
        <nav className="space-y-2 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-surface-container-highest text-primary shadow-ambient'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 space-y-2">
        {/* User Card */}
        <div className="flex items-center gap-3 rounded-xl bg-surface-container-low p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest text-primary font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-on-surface">{user?.name || 'User'}</span>
            <span className="text-xs font-medium text-surface-tint">{user?.coins || 0} Coins</span>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-on-surface-variant transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden absolute top-0 w-full glass-nav z-40 border-b border-outline-variant/30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-container font-bold text-on-primary">
            R
          </div>
          <span className="font-bold text-on-surface tracking-tight">ResumeQL</span>
        </div>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 text-on-surface-variant hover:text-on-surface"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-40 bg-on-surface/20 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-surface-container-lowest shadow-ambient lg:hidden"
            >
              <div className="absolute right-4 top-4">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 text-on-surface-variant hover:text-on-surface bg-surface rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-72 flex-col bg-surface-container-lowest border-r border-outline-variant/50 relative z-30">
        <SidebarContent />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full pt-16 lg:pt-0">
        <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8 min-h-full">
          {/* Context provider or Outlet for child routes */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SidebarLayout;
