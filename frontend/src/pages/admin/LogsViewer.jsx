import React, { useState, useEffect } from 'react';
import { 
  getAdminErrors, 
  getAdminSecurityEvents, 
  getAdminCombinedLogs 
} from '../../services/api';
import useSocket from '../../hooks/useSocket';
import { 
  Terminal, 
  AlertCircle, 
  ShieldAlert, 
  List, 
  Search, 
  RefreshCcw,
  Copy,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';

const LogsViewer = () => {
  const [activeTab, setActiveTab] = useState('combined');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  
  // Real-time WebSocket handle
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    fetchLogs();
  }, [activeTab]);

  // Listen for Live Logs
  useEffect(() => {
    if (socket) {
      socket.on('new_log', (newLine) => {
        // Simple heuristic to determine if log belongs to current tab
        if (activeTab === 'combined' || 
           (activeTab === 'error' && newLine.includes('"level":"error"')) ||
           (activeTab === 'security' && (newLine.includes('"level":"warn"') || newLine.includes('REUSE')))) {
           
           setLogs(prev => [newLine, ...prev].slice(0, 200));
        }
      });

      return () => socket.off('new_log');
    }
  }, [socket, activeTab]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      let data;
      if (activeTab === 'error') data = await getAdminErrors();
      else if (activeTab === 'security') data = await getAdminSecurityEvents();
      else data = await getAdminCombinedLogs();

      const rawLogs = data.data.errors || data.data.events || data.data.logs || [];
      setLogs(rawLogs);
    } catch (err) {
      toast.error(`Sync failure for ${activeTab} stream`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedId(idx);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success("Log line copied");
  };

  const Tab = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all border-b-2 
        ${activeTab === id 
          ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' 
          : 'border-transparent text-[#6B7280] hover:text-[#111827] hover:bg-gray-50'}`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="h-full flex flex-col gap-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#111827]">Log Explorer</h1>
          <p className="text-[#6B7280] mt-1">Deep-dive into production streams and system events.</p>
        </div>
        <button 
          onClick={fetchLogs}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-sm font-bold text-indigo-600 hover:bg-indigo-50 transition-all"
        >
          <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
          Refresh Stream
        </button>
      </header>

      {/* Control Bar */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden flex flex-col h-full">
        <div className="flex flex-col md:flex-row md:items-center border-b border-[#E5E7EB]">
          <div className="flex flex-1">
             <Tab id="combined" label="Combined" icon={List} />
             <Tab id="error" label="Errors" icon={AlertCircle} />
             <Tab id="security" label="Security" icon={ShieldAlert} />
          </div>
          <div className="px-4 py-2 border-l border-[#E5E7EB] flex items-center gap-2 flex-1 max-w-sm">
             <Search size={18} className="text-gray-400" />
             <input 
               type="text" 
               placeholder="Filter log output..." 
               className="w-full text-sm outline-none bg-transparent"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
          </div>
        </div>

        {/* Terminal Area */}
        <div className="flex-1 bg-[#0F172A] text-[#F8FAFC] p-4 font-mono text-[13px] overflow-y-auto selection:bg-[#6366F1]/40 custom-scrollbar relative">
          {loading ? (
             <div className="absolute inset-0 flex items-center justify-center bg-[#0F172A]/80 z-10">
                <div className="flex items-center gap-3">
                   <RefreshCcw className="animate-spin text-indigo-400" />
                   <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Streaming...</span>
                </div>
             </div>
          ) : null}
          
          <div className="space-y-1.5">
            {logs.length === 0 ? (
               <div className="text-gray-500 italic py-8 text-center">
                  No log data available in this tail window.
               </div>
            ) : (
               logs.filter(l => l.toLowerCase().includes(search.toLowerCase())).map((line, idx) => (
                 <div key={idx} className="group flex items-start gap-4 hover:bg-white/5 transition-colors py-1 px-2 rounded -mx-2">
                    <span className="text-[#475569] select-none text-[11px] pt-0.5 w-6 shrink-0">{logs.length - idx}</span>
                    <span className={`flex-1 break-all 
                       ${line.includes('"level":"error"') || line.includes('ERR') ? 'text-red-400' : 
                         line.includes('"level":"warn"') || line.includes('REUSE') ? 'text-orange-400' : 
                         line.includes('GET') || line.includes('POST') ? 'text-blue-400' : 'text-gray-300'}`}>
                       {line}
                    </span>
                    <button 
                      onClick={() => handleCopy(line, idx)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-all text-gray-400"
                    >
                       {copiedId === idx ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                 </div>
               ))
            )}
          </div>
        </div>
        
        {/* Terminal Footer */}
        <div className="px-6 py-2 bg-[#1E293B] border-t border-[#334155] flex items-center justify-between text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest">
           <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><Terminal size={12} /> Standard Output</span>
              <span className="flex items-center gap-1.5"><List size={12} /> {logs.length} Lines Tailed</span>
           </div>
           <div>
              Tail Window: Last 200 Events
           </div>
        </div>
      </div>
    </div>
  );
};

export default LogsViewer;
