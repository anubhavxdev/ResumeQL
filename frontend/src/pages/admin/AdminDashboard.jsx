import React, { useEffect, useState } from 'react';
import { 
  Users, 
  FileText, 
  Coins, 
  AlertCircle, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { getAdminStats } from '../../services/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data for charts (would be real in a production app with time-series DB)
  const chartData = [
    { name: 'Mon', usage: 400, users: 240 },
    { name: 'Tue', usage: 300, users: 139 },
    { name: 'Wed', usage: 200, users: 980 },
    { name: 'Thu', usage: 278, users: 390 },
    { name: 'Fri', usage: 189, users: 480 },
    { name: 'Sat', usage: 239, users: 380 },
    { name: 'Sun', usage: 349, users: 430 },
  ];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await getAdminStats();
      setStats(data);
    } catch (err) {
      toast.error("Failed to sync dashboard metrics");
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, trend, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#6B7280] mb-1">{title}</p>
          <h3 className="text-3xl font-bold tracking-tight text-[#111827]">
            {loading ? <div className="h-8 w-24 bg-gray-100 animate-pulse rounded" /> : value}
          </h3>
        </div>
        <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100 group-hover:scale-110 transition-transform`}>
           <Icon className={color.replace('bg-', 'text-')} size={24} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className={`flex items-center gap-0.5 font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-500'}`}>
          {trend >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {Math.abs(trend)}%
        </span>
        <span className="text-[#6B7280]">vs last week</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#111827]">Dashboard</h1>
        <p className="text-[#6B7280] mt-1">Real-time overview of the ResumeQL ecosystem.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={stats?.totalUsers?.toLocaleString()} 
          icon={Users} 
          trend={12} 
          color="bg-blue-600" 
        />
        <StatCard 
          title="Resumes Generated" 
          value={stats?.totalResumes?.toLocaleString()} 
          icon={FileText} 
          trend={24} 
          color="bg-purple-600" 
        />
        <StatCard 
          title="Active Capacity" 
          value={`${stats?.activeUsers || 0}%`} 
          icon={TrendingUp} 
          trend={-2} 
          color="bg-green-600" 
        />
        <StatCard 
          title="System Health" 
          value="Optimal" 
          icon={AlertCircle} 
          trend={0} 
          color="bg-orange-500" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-[#111827]">API Traffic & Usage</h3>
            <select className="text-sm border-none bg-gray-50 rounded-lg focus:ring-0 px-3 py-1 text-gray-600 font-medium">
              <span className="mr-2">Last 7 Days</span>
            </select>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#6366F1', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="usage" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-[#111827] mb-8">User Conversion</h3>
          <div className="h-[250px] mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis hide />
                <Tooltip 
                   cursor={{fill: 'transparent'}}
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="users" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#6366F1' : '#E5E7EB'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 pt-8 border-t border-[#F3F4F6]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Predicted Growth</span>
              <span className="text-green-600 font-bold">+14%</span>
            </div>
            <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
               <div className="h-full bg-indigo-500 w-[65%] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
