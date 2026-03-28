import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { Toaster } from 'react-hot-toast';
import SidebarLayout from './components/layout/SidebarLayout';
import PageSpinner from './components/common/PageSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy load all major route components for performance (Code Splitting)
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Creator = lazy(() => import('./pages/Creator'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Generate = lazy(() => import('./pages/Generate'));
const Result = lazy(() => import('./pages/Result'));
const Payments = lazy(() => import('./pages/Payments'));
const Profile = lazy(() => import('./pages/Profile'));

// Admin Pages
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminProtectedRoute = lazy(() => import('./components/AdminProtectedRoute'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('./pages/admin/UserManagement'));
const AdminSecurity = lazy(() => import('./pages/admin/SecurityPanel'));
const AdminLogs = lazy(() => import('./pages/admin/LogsViewer'));
const AdminHealth = lazy(() => import('./pages/admin/SystemHealth'));

import { useNavigate } from 'react-router-dom';
import { setupInterceptor } from './services/api';

/**
 * Syncs the global interceptor with the React Router lifecycle.
 * This ensures 401 redirects happen inside the SPA without hard reloads. 
 */
const AuthInterceptor = ({ children }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  React.useEffect(() => {
    // Inject the React context function into the raw Axios instance
    setupInterceptor(() => {
      logout();
      navigate('/login?expired=true');
    });
  }, [logout, navigate]);

  return children;
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <PageSpinner />;
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
};

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AuthInterceptor>
            <div className="min-h-screen bg-surface text-on-surface font-sans selection:bg-primary-fixed">
              <Toaster 
                position="top-right" 
                toastOptions={{
                  className: 'font-sans text-sm tracking-tight border border-ghost shadow-ambient rounded-xl text-on-surface',
                  duration: 4000
                }} 
              />
              
              <Suspense fallback={<PageSpinner />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/about" element={<Creator />} />
                  
                  {/* User Protected Routes using SidebarLayout */}
                  <Route element={<ProtectedRoute><SidebarLayout /></ProtectedRoute>}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/generate" element={<Generate />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="/payments" element={<Payments />} />
                    <Route path="/profile" element={<Profile />} />
                  </Route>

                  {/* Admin Protected Routes using AdminLayout */}
                  <Route element={<AdminProtectedRoute />}>
                    <Route element={<AdminLayout />}>
                       <Route path="/admin/dashboard" element={<AdminDashboard />} />
                       <Route path="/admin/users" element={<AdminUsers />} />
                       <Route path="/admin/security" element={<AdminSecurity />} />
                       <Route path="/admin/logs" element={<AdminLogs />} />
                       <Route path="/admin/health" element={<AdminHealth />} />
                    </Route>
                  </Route>
                </Routes>
              </Suspense>
            </div>
          </AuthInterceptor>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
