import React from 'react';
import { ShieldAlert, RefreshCcw } from 'lucide-react';
import { Button } from '../ui/button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught React Exception:", error, errorInfo);
    // In a real production app, log this to Sentry or LogRocket
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-surface p-4 text-on-surface">
          <div className="max-w-md rounded-3xl border border-ghost bg-surface-container-low p-8 text-center shadow-ambient">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500 mb-6 border border-red-100 shadow-sm">
              <ShieldAlert className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-on-surface mb-2">Something went wrong</h1>
            <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
              We encountered an unexpected error while rendering this page. Our team has been notified.
            </p>
            
            <div className="flex flex-col gap-3">
              <Button 
                onClick={() => window.location.reload()} 
                className="w-full shadow-ambient font-bold"
              >
                <RefreshCcw className="mr-2 h-4 w-4" /> Reload Page
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/'} 
                className="w-full bg-surface"
              >
                Return to Home
              </Button>
            </div>
            
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 text-left bg-surface-container-highest p-4 rounded-xl overflow-x-auto border border-ghost">
                 <p className="text-xs font-mono text-red-500 font-bold mb-1">Developer Details:</p>
                 <p className="text-xs font-mono text-on-surface-variant">{this.state.error?.toString()}</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
