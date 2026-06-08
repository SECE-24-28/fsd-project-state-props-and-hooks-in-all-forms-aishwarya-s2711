import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import { FiDollarSign, FiBriefcase, FiUsers, FiPackage } from 'react-icons/fi';

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/dashboard/stats');
        setStats(res.data);
      } catch (err) {
        toast.error('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!stats) return <div className="text-center py-10 text-red-500 font-semibold">Error loading stats</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Real-time stats and booking health metrics.</p>
      </div>

      {/* Main KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="modern-card bg-white p-6 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-3xl font-extrabold mt-2 text-blue-600">${stats.totalRevenue?.toLocaleString()}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FiDollarSign size={24} />
          </div>
        </div>

        <div className="modern-card bg-white p-6 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Bookings</p>
            <h3 className="text-3xl font-extrabold mt-2 text-sky-600">{stats.totalBookings}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <FiBriefcase size={24} />
          </div>
        </div>

        <div className="modern-card bg-white p-6 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Registered Users</p>
            <h3 className="text-3xl font-extrabold mt-2 text-emerald-600">{stats.totalUsers}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <FiUsers size={24} />
          </div>
        </div>

        <div className="modern-card bg-white p-6 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Packages</p>
            <h3 className="text-3xl font-extrabold mt-2 text-purple-600">{stats.totalPackages}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <FiPackage size={24} />
          </div>
        </div>
      </div>

      {/* Booking Summary - Status Counts */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Booking Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.bookingStatusData?.map((item) => {
            const colorMap = {
              Pending: 'text-amber-600 bg-amber-50/50 border-amber-100',
              Approved: 'text-emerald-600 bg-emerald-50/50 border-emerald-100',
              Denied: 'text-rose-600 bg-rose-50/50 border-rose-100',
              Cancelled: 'text-slate-600 bg-slate-50 border-slate-100',
            };
            const colorClass = colorMap[item.name] || 'text-slate-600 bg-slate-50 border-slate-100';
            return (
              <div key={item.name} className={`p-5 rounded-xl border flex flex-col items-center justify-center text-center shadow-sm ${colorClass}`}>
                <span className="text-xs font-semibold uppercase tracking-wider">{item.name}</span>
                <span className="text-3xl font-extrabold mt-2">{item.value || 0}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
