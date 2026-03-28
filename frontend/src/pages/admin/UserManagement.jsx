import React, { useEffect, useState } from 'react';
import { 
  getAdminUsers, 
  updateUserStatus 
} from '../../services/api';
import { 
  Search, 
  MoreVertical, 
  CheckCircle, 
  Slash, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  UserCheck,
  UserMinus
} from 'lucide-react';
import toast from 'react-hot-toast';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await getAdminUsers(page);
      setUsers(data.users);
      setTotalPages(data.pages);
    } catch (err) {
      toast.error("Failed to fetch user directory");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (user) => {
    const newStatus = user.status === 'active' ? 'blocked' : 'active';
    const confirmMsg = `Are you sure you want to ${newStatus === 'blocked' ? 'SUSPEND' : 'REACTIVATE'} ${user.email}?`;
    
    if (!window.confirm(confirmMsg)) return;

    try {
      await updateUserStatus(user._id, newStatus);
      toast.success(`User ${newStatus === 'blocked' ? 'suspended' : 'activated'}`);
      fetchUsers(); // Refresh
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  const StatusBadge = ({ status }) => (
    <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit
      ${status === 'active' ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20' : 'bg-red-50 text-red-700 ring-1 ring-red-600/20'}`}
    >
      {status === 'active' ? <CheckCircle size={14} /> : <Slash size={14} />}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#111827]">User Management</h1>
          <p className="text-[#6B7280] mt-1">Audit, monitor, and regulate user accounts.</p>
        </div>
        
        <div className="relative group max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                     <td className="px-6 py-4"><div className="h-4 w-32 bg-gray-100 rounded" /></td>
                     <td className="px-6 py-4"><div className="h-4 w-16 bg-gray-100 rounded" /></td>
                     <td className="px-6 py-4"><div className="h-6 w-20 bg-gray-100 rounded-full" /></td>
                     <td className="px-6 py-4"><div className="h-4 w-24 bg-gray-100 rounded" /></td>
                     <td className="px-6 py-4 text-right"><div className="h-4 w-8 bg-gray-100 rounded ml-auto" /></td>
                  </tr>
                ))
              ) : (
                users.filter(u => u.email.toLowerCase().includes(search.toLowerCase()) || u.name.toLowerCase().includes(search.toLowerCase())).map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#E0E7FF] text-indigo-700 flex items-center justify-center font-bold text-sm ring-2 ring-white shadow-sm capitalize">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#111827]">{user.name}</div>
                          <div className="text-xs text-[#6B7280]">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 lowercase">
                        {user.role === 'admin' ? <ShieldCheck size={14} className="text-indigo-500" /> : <UserCheck size={14} />}
                        {user.role}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                           onClick={() => handleToggleStatus(user)}
                           className={`p-2 rounded-lg transition-all ${user.status === 'active' ? 'hover:bg-red-50 text-red-600' : 'hover:bg-green-50 text-green-600'}`}
                           title={user.status === 'active' ? 'Block User' : 'Unblock User'}
                         >
                            {user.status === 'active' ? <UserMinus size={20} /> : <CheckCircle size={20} />}
                         </button>
                         <button className="p-2 hover:bg-gray-100 text-[#6B7280] rounded-lg">
                            <MoreVertical size={20} />
                         </button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <footer className="px-6 py-4 border-t border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-between">
          <p className="text-sm text-[#6B7280]">
            Showing page <span className="font-semibold text-black">{page}</span> of <span className="font-semibold text-black">{totalPages}</span>
          </p>
          <div className="flex items-center gap-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="p-2 border border-[#E5E7EB] rounded-lg hover:bg-white text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="p-2 border border-[#E5E7EB] rounded-lg hover:bg-white text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default UserManagement;
