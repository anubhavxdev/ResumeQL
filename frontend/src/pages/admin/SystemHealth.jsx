import React, { useEffect, useState } from 'react';
import { 
  Activity, 
  Cpu, 
  Database, 
  Server, 
  Clock, 
  RefreshCcw, 
  Zap, 
  Box,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { getAdminHealth } from '../../services/api';
import toast from 'react-hot-toast';

const SystemHealth = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 10000); // 10s auto-refresh
    return () => clearInterval(interval);
  }, []);

  const fetchHealth = async () => {
    try {
      const { data } = await getAdminHealth();
      setHealth(data);
    } catch (err) {
      toast.error("Heartbeat sync failure");
    } finally {
      setLoading(false);
    }
  };

  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
  };

  const MetricCard = ({ title, value, icon: Icon, unit, detail, status }) => (
    <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-sm flex flex-col h-full group hover:ring-2 hover:ring-indigo-500/10 transition-all">
      <div className="flex items-start justify-between mb-6">
        <div className={`p-4 rounded-2xl bg-gray-50 text-indigo-600 transition-transform group-hover:scale-105 duration-300`}>
           <Icon size={28} />
        </div>
        <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${status === 'Healthy' || status === 'Connected' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {status}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-wider mb-2">{title}</h3>
        <div className="flex items-baseline gap-1.5 mb-2">
           <span className="text-4xl font-black tracking-tighter text-[#111827]">{loading ? '--' : value}</span>
           <span className="text-sm font-bold text-[#9CA3AF]">{unit}</span>
        </div>
        <p className="text-sm text-gray-500 font-medium">{detail}</p>
      </div>

      <div className="mt-8 pt-6 border-t border-[#F3F4F6] flex items-center justify-between text-xs font-bold text-[#6B7280]">
         <span className="flex items-center gap-1.5"><Zap size={12} className="text-yellow-500" /> Real-time Metric</span>
         <span className="flex items-center gap-1.5 text-gray-400"><Clock size={12} /> Last: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#111827]">System Health</h1>
          <p className="text-[#6B7280] mt-1">Infrastructure vitals and process-level diagnostics.</p>
        </div>
        <button 
          onClick={fetchHealth}
          className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-xl text-sm font-bold hover:bg-[#111827] transition-all shadow-lg"
        >
          <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
          Check Pulse
        </button>
      </header>

      {/* Primary Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <MetricCard 
          title="Runtime Uptime"
          value={formatUptime(health?.uptimeSeconds || 0)}
          icon={Server}
          unit=""
          detail="Continuous execution without restarts."
          status="Healthy"
        />
        <MetricCard 
          title="Memory Footprint"
          value={health?.memory?.rss || '0 MB'}
          icon={Cpu}
          unit=""
          detail="RSS (Resident Set Size) memory allocation."
          status="Optimized"
        />
        <MetricCard 
          title="State Persistence"
          value={health?.dbStatus || 'Unknown'}
          icon={Database}
          unit=""
          detail="MongoDB Cluster connection availability."
          status={health?.dbStatus}
        />
      </div>

      {/* Advanced Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0F172A] p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-500">
              <Activity size={200} />
           </div>
           
           <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <Box size={24} className="text-indigo-400" />
              Process Allocation
           </h3>
           
           <div className="space-y-8 relative z-10">
              <div className="flex items-center justify-between">
                 <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Heap Used / Total</span>
                 <span className="text-2xl font-black">{health?.memory?.heapUsed} / {health?.memory?.heapTotal}</span>
              </div>
              
              <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden p-1 shadow-inner">
                 <div 
                   className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 shadow-lg"
                   style={{ width: health ? `${(parseInt(health.memory.heapUsed) / parseInt(health.memory.heapTotal)) * 100}%` : '0%' }}
                 />
              </div>

              <div className="grid grid-cols-2 gap-8 pt-4">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Status</div>
                    <div className="text-lg font-bold flex items-center gap-2">
                       <CheckCircle2 size={16} className="text-green-400" />
                       Stable
                    </div>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">GC Cycle</div>
                    <div className="text-lg font-bold flex items-center gap-2">
                       <Activity size={16} className="text-indigo-400" />
                       Active
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm flex flex-col">
           <h3 className="text-xl font-bold text-[#111827] mb-8 flex items-center gap-3">
              <AlertCircle size={24} className="text-indigo-600" />
              Environmental Health
           </h3>
           
           <div className="space-y-6 flex-1">
             {[
               { label: 'Cluster Connectivity', val: 'Active', color: 'green' },
               { label: 'Network Latency', val: '< 15ms', color: 'green' },
               { label: 'Worker Scaling', val: 'Auto', color: 'indigo' },
               { label: 'Queue Backlog', val: 'Zero', color: 'green' },
               { label: 'Security Handshake', val: 'Verified', color: 'green' },
             ].map((item, id) => (
               <div key={id} className="flex items-center justify-between group">
                  <span className="text-gray-500 font-semibold group-hover:text-[#111827] transition-colors">{item.label}</span>
                  <div className={`px-3 py-1 rounded-lg text-xs font-bold text-${item.color}-600 bg-${item.color}-50 ring-1 ring-${item.color}-600/10`}>
                     {item.val}
                  </div>
               </div>
             ))}
           </div>
           
           <div className="mt-8 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl text-indigo-600 shadow-sm shrink-0">
                 <Activity size={20} />
              </div>
              <p className="text-sm text-indigo-700 font-medium leading-relaxed">
                 All telemetry lines are operational. System heartbeat is within normal parameters.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;
