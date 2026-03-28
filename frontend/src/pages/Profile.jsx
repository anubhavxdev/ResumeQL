import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Shield, CreditCard, LogOut, GraduationCap, Building, Edit3 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const Profile = () => {
  const { user, logout } = useAuth();
  useDocumentTitle('Account Settings');

  const infoItems = [
    { label: 'Full Name', value: user?.name, icon: User },
    { label: 'Email Address', value: user?.email, icon: Mail },
    { label: 'Registration Number', value: user?.registrationNumber || 'N/A', icon: GraduationCap },
    { label: 'Academic Year', value: user?.year || 'N/A', icon: Calendar },
  ];

  const stats = [
    { label: 'Current Balance', value: `${user?.coins || 0} Credits`, icon: CreditCard, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Account Type', value: user?.isLPU ? 'LPU Verified' : 'Standard', icon: Shield, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Joined On', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A', icon: Building, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="pb-12 text-on-surface">
      <header className="mb-12 border-b border-outline-variant/30 pb-6 w-full flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Account Settings</h1>
          <p className="text-on-surface-variant text-lg">Manage your identity and preferences.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {/* Sidebar Info */}
        <div className="md:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-ghost bg-surface-container-low p-8 text-center shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary/10 to-primary-container/20 rounded-t-3xl -z-10" />
            
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-surface shadow-ambient mt-4">
              <span className="text-4xl font-bold text-primary">{user?.name?.charAt(0) || 'U'}</span>
            </div>
            
            <h2 className="text-2xl font-bold tracking-tight text-on-surface">{user?.name}</h2>
            <p className="text-sm font-medium text-on-surface-variant mt-1">{user?.email}</p>
            
            <div className="flex justify-center gap-2 mt-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-highest px-3 py-1 text-xs font-bold text-on-surface-variant">
                <Shield className="h-3 w-3" /> {user?.isLPU ? 'Verified' : 'Unverified'}
              </span>
            </div>
            
            <div className="mt-8 pt-6 border-t border-outline-variant/50">
              <Button onClick={logout} variant="outline" className="w-full text-red-600 hover:bg-red-50 border-ghost hover:border-red-200 shadow-none font-bold">
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-ghost bg-surface p-8 shadow-sm"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-on-surface">Security & Stats</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((stat, i) => (
                <div key={stat.label} className="rounded-2xl bg-surface-container-lowest p-6 border border-ghost shadow-sm hover:shadow-ambient transition-shadow">
                  <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <p className="text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-lg font-bold text-on-surface tracking-tight">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-ghost bg-surface p-8 shadow-sm text-on-surface"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Personal Information</h3>
              <Button variant="ghost" size="sm" className="hidden">
                <Edit3 className="h-4 w-4 mr-2" /> Edit
              </Button>
            </div>
            
            <div className="space-y-6">
              {infoItems.map((item) => (
                <div key={item.label} className="flex items-center gap-5 pb-5 border-b border-outline-variant/30 last:border-0 last:pb-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-low text-on-surface-variant">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">{item.label}</p>
                    <p className="text-base font-semibold">{item.value || '-'}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
