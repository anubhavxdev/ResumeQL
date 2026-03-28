import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShieldAlert, 
  ScrollText, 
  Activity, 
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Security Panel', path: '/admin/security', icon: ShieldAlert },
    { name: 'System Logs', path: '/admin/logs', icon: ScrollText },
    { name: 'Health Status', path: '/admin/health', icon: Activity },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] flex font-sans selection:bg-[#6366F1]/20">
      
      {/* Sidebar Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            className="fixed lg:static w-[260px] h-screen bg-white border-r border-[#E5E7EB] z-50 flex flex-col pt-8 pb-4"
          >
            <div className="px-6 mb-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">R</div>
                <h1 className="text-xl font-bold tracking-tight">Admin<span className="text-[#6366F1]">QL</span></h1>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-1 hover:bg-gray-100 rounded-md"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 px-4 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group
                    ${isActive 
                      ? 'bg-[#F3F4F6] text-[#111827] font-medium shadow-sm ring-1 ring-[#E5E7EB]' 
                      : 'text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827]'}
                  `}
                >
                  <item.icon size={20} className="shrink-0 transition-colors duration-200" />
                  <span className="flex-1 text-sm">{item.name}</span>
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                </NavLink>
              ))}
            </nav>

            <div className="px-4 mt-auto">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#EF4444] hover:bg-red-50 rounded-lg transition-all"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-[#E5E7EB] flex items-center justify-between px-6 shrink-0 mix-blend-multiply z-40">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <Menu size={20} />
              </button>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="hover:text-black cursor-pointer">ResumeQL</span>
              <span>/</span>
              <span className="font-semibold text-black">Administrative Suite</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-full ring-1 ring-green-600/20">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Service Operational
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">
              A
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-7xl mx-auto h-full">
            <AnimatePresence mode="wait">
               <motion.div
                 key={location.pathname}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.2 }}
                 className="h-full"
               >
                 <Outlet />
               </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
