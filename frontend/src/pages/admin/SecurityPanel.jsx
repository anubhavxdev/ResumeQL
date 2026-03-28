import React, { useEffect, useState } from 'react';
import { 
  ShieldAlert, 
  RefreshCcw, 
  LogIn, 
  UserX, 
  Clock, 
  MapPin, 
  AlertTriangle,
  History,
  Activity
} from 'lucide-react';
import { getAdminSecurityEvents } from '../../services/api';
import useSocket from '../../hooks/useSocket';
import toast from 'react-hot-toast';

const SecurityPanel = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Real-time WebSocket handle
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    fetchEvents();
  }, []);

  // Listen for Live Events
  useEffect(() => {
    if (socket) {
      socket.on('security_event', (newEvent) => {
        setEvents(prev => [newEvent, ...prev].slice(0, 200));
        if (newEvent.message?.includes('REUSE')) {
           toast.error(`SECURITY ALERT: ${newEvent.message}`, { duration: 6000 });
        }
      });

      return () => socket.off('security_event');
    }
  }, [socket]);

  const fetchEvents = async () => {
    try {
      const { data } = await getAdminSecurityEvents();
      // Parse structured JSON logs if present, otherwise treat as lines
      const parsed = data.events.map(line => {
        try {
           return JSON.parse(line);
        } catch (e) {
           return { message: line, timestamp: new Date().toISOString(), level: 'info' };
        }
      });
      setEvents(parsed);
    } catch (err) {
      toast.error("Failed to sync security audit logs");
    } finally {
      setLoading(false);
    }
  };

  const EventIcon = ({ message }) => {
    if (message.includes('REUSE DETECTED')) return <AlertTriangle className="text-red-600" size={20} />;
    if (message.includes('Logged In')) return <LogIn className="text-green-600" size={20} />;
    if (message.includes('Logout')) return <UserX className="text-gray-500" size={20} />;
    if (message.includes('Registered')) return <ShieldAlert className="text-blue-600" size={20} />;
    return <Activity className="text-indigo-500" size={20} />;
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#111827]">Security Panel</h1>
        <p className="text-[#6B7280] mt-1">Real-time audit of critical authentication and session events.</p>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Critical Hits</p>
            <h3 className="text-2xl font-bold text-red-900">{events.filter(e => e.message?.includes('REUSE')).length}</h3>
            <p className="text-sm text-red-700 mt-1 italic">Token reuse attempts</p>
          </div>
          <AlertTriangle className="text-red-500 opacity-30" size={48} />
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Access Ops</p>
            <h3 className="text-2xl font-bold text-blue-900">{events.filter(e => e.message?.includes('Logged In')).length}</h3>
            <p className="text-sm text-blue-700 mt-1 italic">Successful logins (Tail)</p>
          </div>
          <ShieldAlert className="text-blue-500 opacity-30" size={48} />
        </div>
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Audit Depth</p>
            <h3 className="text-2xl font-bold text-gray-900">{events.length}</h3>
            <p className="text-sm text-gray-600 mt-1 italic">Tailed security events</p>
          </div>
          <History className="text-gray-400 opacity-30" size={48} />
        </div>
      </div>

      {/* Event Feed */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <h2 className="font-bold flex items-center gap-2">
            <Activity size={18} className="text-indigo-500" />
            Security Feed
          </h2>
          <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 font-bold rounded flex items-center gap-1.5 animate-pulse">
            <RefreshCcw size={12} />
            Live Tailing
          </span>
        </div>
        
        <div className="divide-y divide-gray-100 overflow-y-auto max-h-[600px]">
          {loading ? (
            <div className="p-12 text-center text-gray-400 flex flex-col items-center gap-3">
              <RefreshCcw className="animate-spin text-indigo-500" />
              Syncing security stream...
            </div>
          ) : events.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              No security events recorded in current tail window.
            </div>
          ) : (
            events.map((event, idx) => (
              <div 
                key={idx} 
                className={`p-5 flex items-start gap-4 transition-all hover:bg-gray-50/50 
                  ${event.message?.includes('REUSE') ? 'bg-red-50/30' : ''}`}
              >
                <div className={`p-2.5 rounded-xl flex-shrink-0 bg-white border border-[#E5E7EB] shadow-sm`}>
                  <EventIcon message={event.message || ""} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <p className={`text-sm font-bold truncate ${event.message?.includes('REUSE') ? 'text-red-700' : 'text-[#111827]'}`}>
                      {event.message}
                    </p>
                    <div className="flex items-center gap-3 shrink-0">
                       <span className="flex items-center gap-1 text-[10px] font-bold text-[#6B7280] uppercase tracking-tighter bg-gray-100 px-1.5 py-0.5 rounded">
                         <Clock size={10} />
                         {new Date(event.timestamp).toLocaleTimeString()}
                       </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                     <span className="flex items-center gap-1 font-medium italic">
                        Level: {event.level?.toUpperCase() || 'INFO'}
                     </span>
                     <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        Internal Audit System
                     </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="px-6 py-3 bg-[#F9FAFB] border-t border-[#E5E7EB] text-center">
           <button 
             onClick={fetchEvents}
             className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-1.5 mx-auto"
           >
             <RefreshCcw size={14} />
             Force Sync Feed
           </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityPanel;
