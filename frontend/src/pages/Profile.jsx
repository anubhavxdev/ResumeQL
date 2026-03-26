import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Shield, CreditCard, LogOut, GraduationCap, Building } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/layout/Navbar';
import { Button } from '../components/ui/button';

const Profile = () => {
  const { user, logout } = useAuth();

  const infoItems = [
    { label: 'Full Name', value: user?.name, icon: User },
    { label: 'Email Address', value: user?.email, icon: Mail },
    { label: 'Registration Number', value: user?.registrationNumber || 'N/A', icon: GraduationCap },
    { label: 'Academic Year', value: user?.year || 'N/A', icon: Calendar },
  ];

  const stats = [
    { label: 'Current Balance', value: `${user?.coins || 0} Coins`, icon: CreditCard, color: 'text-purple-500' },
    { label: 'Account Type', value: user?.isLPU ? 'LPU Student' : 'General', icon: Shield, color: 'text-green-500' },
    { label: 'Joined On', value: new Date(user?.createdAt).toLocaleDateString(), icon: Building, color: 'text-blue-500' },
  ];

  return (
    <div className="min-h-screen bg-black pt-16">
      <Navbar />
      
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-bold text-white">Your Profile</h1>
          <p className="mt-2 text-zinc-400">Manage your account settings and preferences.</p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Sidebar Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-8 text-center backdrop-blur-xl">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-purple-600/20 text-purple-500 border-2 border-purple-500/30">
                <User className="h-12 w-12" />
              </div>
              <h2 className="text-xl font-bold text-white">{user?.name}</h2>
              <p className="text-sm text-zinc-500">{user?.email}</p>
              
              <Button onClick={logout} variant="destructive" className="mt-8 w-full gap-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <section className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-8 backdrop-blur-xl">
              <h3 className="mb-6 text-lg font-bold text-white">Security & Stats</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-zinc-950 p-4 border border-zinc-800/50">
                    <stat.icon className={`mb-2 h-5 w-5 ${stat.color}`} />
                    <p className="text-xs text-zinc-500">{stat.label}</p>
                    <p className="text-sm font-bold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-8 backdrop-blur-xl text-white">
              <h3 className="mb-6 text-lg font-bold">Personal Information</h3>
              <div className="space-y-6">
                {infoItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-zinc-400">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">{item.label}</p>
                      <p className="text-sm font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
