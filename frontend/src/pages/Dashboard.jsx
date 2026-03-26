import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, History, Coins, FileText, ExternalLink, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import Navbar from '../components/layout/Navbar';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const Dashboard = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/generate/history');
        setHistory(res.data.resumes || []);
      } catch (err) {
        console.error('Failed to fetch history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const stats = [
    { label: 'Total Generations', value: user?.resumesGenerated || 0, icon: FileText, color: 'text-blue-500' },
    { label: 'Available Coins', value: user?.coins || 0, icon: Coins, color: 'text-purple-500' },
    { label: 'LPU Student', value: user?.isLPU ? 'Verified' : 'No', icon: Badge, color: 'text-green-500' },
  ];

  return (
    <div className="min-h-screen bg-black pt-16">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name}</h1>
            <p className="text-zinc-400">Manage your resumes and available credits.</p>
          </div>
          <Link to="/generate">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-5 w-5" /> Generate New Resume
            </Button>
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-lg"
            >
              <div className="flex items-center gap-4">
                <div className={`rounded-xl bg-zinc-800 p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* History Section */}
        <section>
          <div className="mb-6 flex items-center gap-2">
            <History className="h-6 w-6 text-purple-500" />
            <h2 className="text-xl font-bold text-white">Recent Generations</h2>
          </div>

          {loading ? (
            <div className="flex h-32 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/30">
              <p className="text-zinc-500">Loading your history...</p>
            </div>
          ) : history.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {history.map((resume) => (
                <div 
                  key={resume._id}
                  className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4 transition-all hover:border-zinc-700 hover:bg-zinc-900/50 md:flex-row md:items-center"
                >
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-semibold text-white">Resume for {resume.jd.slice(0, 40)}...</h3>
                    <p className="text-xs text-zinc-500">
                      Generated on {new Date(resume.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 border-zinc-800 bg-transparent text-xs hover:bg-zinc-800">
                      <Download className="mr-2 h-4 w-4" /> Download PDF
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-xs hover:bg-zinc-800 text-zinc-400">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 py-12">
              <FileText className="mb-4 h-12 w-12 text-zinc-700" />
              <p className="text-zinc-500">You haven't generated any resumes yet.</p>
              <Link to="/generate" className="mt-4 text-purple-500 font-medium hover:underline">
                Create your first tailored resume
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
