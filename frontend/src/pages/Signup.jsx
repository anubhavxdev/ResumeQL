import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { UserPlus, Mail, Lock, User, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import api from '../services/api';
import { Button } from '../components/ui/button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    registrationNumber: '',
    year: '2024'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useDocumentTitle('Create Account');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/signup', formData);
      toast.success('Account created! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-surface overflow-hidden">
      {/* Left side - Form */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-8 sm:p-12 shadow-[20px_0_40px_rgba(25,28,29,0.02)] z-10 bg-surface">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-6 lg:ml-auto lg:mr-16"
        >
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-container font-bold text-on-primary shadow-sm text-xl">
                R
              </div>
            </Link>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-on-surface">Create an account</h2>
            <p className="mt-2 text-on-surface-variant">Start optimizing your career with AI.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-on-surface">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    id="name"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-surface-container-high px-10 py-3 text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all shadow-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-on-surface">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    id="email"
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-surface-container-high px-10 py-3 text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all shadow-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold text-on-surface">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    id="password"
                    required
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-surface-container-high px-10 py-3 text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all shadow-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="regNo" className="text-sm font-semibold text-on-surface">Registration Number</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    id="regNo"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-surface-container-high px-10 py-3 text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all shadow-sm"
                    placeholder="1221XXXX"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="year" className="text-sm font-semibold text-on-surface">Expected Graduation Year</label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-surface-container-high px-4 py-3 text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all shadow-sm appearance-none"
                >
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                </select>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className={`w-full h-12 text-base font-semibold mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating Account...' : (
                <span className="flex items-center justify-center gap-2">
                  Create Personal Workspace <ArrowRight className="h-5 w-5" />
                </span>
              )}
            </Button>

            <p className="text-center text-sm text-on-surface-variant pt-4">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-primary hover:text-primary-container transition-colors">
                Log in
              </Link>
            </p>
          </form>
        </motion.div>
      </div>

      {/* Right side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-surface-container-low border-l border-outline-variant/30 flex-col justify-center p-12 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none -translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-md mx-auto relative z-10 w-full">
          <div className="mb-10 text-right w-full flex justify-end">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-on-surface">ResumeQL</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-container font-bold text-on-primary shadow-sm text-sm">
                R
              </div>
            </Link>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-8 border border-ghost shadow-ambient">
             <div className="flex gap-1 text-yellow-400 mb-6">
                {"★★★★★".split('').map((star, i) => (
                  <span key={i} className="text-xl">{star}</span>
                ))}
            </div>
            <h3 className="text-2xl font-bold text-on-surface leading-tight mb-6">
              "This platform completely changed how I apply for roles. The ATS optimization feature bumped my callback rate by 40%."
            </h3>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-surface-container-high flex items-center justify-center text-xl font-bold text-primary border border-ghost">
                S
              </div>
              <div>
                <p className="font-bold text-on-surface">Sarah J.</p>
                <p className="text-sm text-on-surface-variant flex items-center gap-1">
                  Product Designer <Sparkles className="h-3 w-3 text-primary" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
