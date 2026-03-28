import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, History, Coins, FileText, Download, ArrowRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import { Button } from '../components/ui/button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const Dashboard = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  useDocumentTitle('Workspace Dashboard');

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
    { label: 'Total Resumes Generated', value: user?.resumesGenerated || 0, icon: FileText, color: 'text-primary' },
    { label: 'Available Coins', value: user?.coins || 0, icon: Coins, color: 'text-orange-500' },
    { label: 'Account Status', value: user?.isLPU ? 'LPU Verified' : 'Standard', icon: Activity, color: 'text-green-600' },
  ];

  return (
    <div className="pb-12 text-on-surface">
      <header className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end w-full border-b border-outline-variant/30 pb-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Workspace</h1>
          <p className="text-on-surface-variant text-lg">Manage your career assets and track optimization history.</p>
        </div>
        <Link to="/generate">
          <Button className="rounded-full shadow-ambient font-semibold">
            <Plus className="mr-2 h-5 w-5" /> New Resume
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
            className="rounded-2xl border border-ghost bg-surface-container-lowest p-6 shadow-sm hover:shadow-ambient transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-low ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface-variant">{stat.label}</p>
                <p className="text-2xl font-bold tracking-tight mt-1">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* History Section */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-on-surface">
            <History className="h-5 w-5 text-on-surface-variant" />
            <h2 className="text-xl font-bold tracking-tight">Recent Generations</h2>
          </div>
          <Link to="/generate" className="text-sm font-semibold text-primary hover:text-primary-container flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex h-32 w-full animate-pulse items-center justify-center rounded-2xl bg-surface-container-low border border-ghost">
            <p className="text-on-surface-variant font-medium">Loading workspace data...</p>
          </div>
        ) : history.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {history.map((resume, i) => (
              <motion.div 
                key={resume._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group flex flex-col justify-between rounded-2xl bg-surface-container-lowest border border-ghost p-5 transition-all hover:border-outline-variant hover:shadow-ambient md:flex-row md:items-center gap-4"
              >
                <div>
                  <h3 className="font-bold text-lg tracking-tight mb-1 text-on-surface">Resume for {resume.jd.slice(0, 45)}...</h3>
                  <p className="text-sm text-on-surface-variant font-medium">
                    Created {new Date(resume.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <Button variant="outline" className="w-full md:w-auto h-10 px-4 bg-surface hover:bg-surface-container-low font-semibold text-on-surface">
                    <Download className="mr-2 h-4 w-4" /> Export
                  </Button>
                  <Button variant="ghost" className="hidden md:flex h-10 px-4 text-primary font-semibold hover:bg-primary/5">
                    View Run
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-surface-container-low border border-dashed border-outline-variant py-16 px-4 text-center">
            <div className="h-16 w-16 mb-4 bg-surface rounded-full flex items-center justify-center border border-ghost">
              <FileText className="h-8 w-8 text-on-surface-variant" />
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-2">No resumes yet</h3>
            <p className="text-on-surface-variant max-w-sm mb-6">
              Start by pasting your current CV and target Job Description. Our AI will handle the rest.
            </p>
            <Link to="/generate">
              <Button className="rounded-full shadow-sm font-semibold px-6">
                Create First Document
              </Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
