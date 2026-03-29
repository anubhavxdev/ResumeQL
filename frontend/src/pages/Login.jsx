import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { LogIn, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  useDocumentTitle('Sign In');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', formData);
      const { accessToken: token, user } = res.data;
      
      login(token, user);
      toast.success(`Welcome back, ${user.name}!`);

      // Micro-delay to ensure storage is flushed and context is ready
      setTimeout(() => {
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      }, 50);
    } catch (err) {
      const errorMsg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.msg || 'Login failed';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-surface overflow-hidden">
      {/* Left side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-surface-container-low border-r border-outline-variant/30 flex-col justify-between p-12 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[80px] -z-10 pointer-events-none translate-x-1/2 -translate-y-1/2" />
        
        <Link to="/" className="flex items-center gap-2 w-fit">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-container font-bold text-on-primary shadow-sm">
            R
          </div>
          <span className="text-2xl font-bold tracking-tight text-on-surface">ResumeQL</span>
        </Link>

        <div className="max-w-md">
          <h1 className="text-4xl font-bold tracking-tight text-on-surface mb-6 leading-tight">
            Curate your professional narrative.
          </h1>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            Log in to continue optimizing your resume against thousands of applicant tracking systems.
          </p>
          
          <div className="mt-12 flex items-center gap-4 bg-surface-container-highest/50 p-4 rounded-xl border border-ghost w-fit">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <div>
              <p className="font-semibold text-on-surface text-sm">Enterprise-grade Security</p>
              <p className="text-sm text-on-surface-variant">Your data is encrypted and secure.</p>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-on-surface-variant font-medium">
          © {new Date().getFullYear()} ResumeQL Inc.
        </p>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-8 sm:p-12 lg:p-24 shadow-[-20px_0_40px_rgba(25,28,29,0.02)] z-10 bg-surface">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-container font-bold text-on-primary shadow-sm text-xl">
                R
              </div>
            </Link>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-on-surface">Welcome back</h2>
            <p className="mt-2 text-on-surface-variant">Enter your credentials to access your workspace.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div className="space-y-5">
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
                    className="w-full rounded-lg border-none bg-surface-container-high px-10 py-3 text-on-surface placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary shadow-sm transition-all"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-semibold text-on-surface">Password</label>
                  <a href="#" className="text-xs font-semibold text-primary hover:text-primary-container transition-colors">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    id="password"
                    required
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-lg border-none bg-surface-container-high px-10 py-3 text-on-surface placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary shadow-sm transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className={`w-full h-12 text-base font-semibold mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Authenticating...' : (
                <span className="flex items-center justify-center gap-2">
                  Continue to Workspace <ArrowRight className="h-5 w-5" />
                </span>
              )}
            </Button>

            <p className="text-center text-sm text-on-surface-variant pt-4">
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold text-primary hover:text-primary-container transition-colors">
                Sign up
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
