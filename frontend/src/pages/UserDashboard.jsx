import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FiTrendingUp, FiCalendar, FiHeart, FiStar, FiEdit2, FiPackage, FiCheck, FiTrash2 } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import api from '../utils/api';

// ── Shared Loading Spinner ──
const Loader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// ── Sub-components ──

function Overview({ user }) {
  const [stats, setStats] = useState({ bookings: 0, upcoming: 0, wishlist: 0, reviews: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const [bkRes, revRes, wishRes] = await Promise.all([
          api.get('/bookings/user').catch(() => ({ data: [] })),
          api.get('/reviews/user').catch(() => ({ data: [] })),
          api.get('/users/wishlist').catch(() => ({ data: [] }))
        ]);
        const bk = bkRes.data || [];
        const rv = revRes.data || [];
        const ws = wishRes.data || [];

        setStats({ 
          bookings: bk.length, 
          upcoming: bk.filter(b => b.status === 'Approved' || b.status === 'Confirmed').length, 
          wishlist: ws.length, 
          reviews: rv.length 
        });
        setRecent(bk.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name?.split(' ')[0]}!</h1>
        <p className="text-sm text-slate-500 mt-1">Here is what's happening with your travel plans today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: stats.bookings, icon: FiCalendar, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Upcoming Trips', value: stats.upcoming, icon: FiPackage, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Wishlist Items', value: stats.wishlist, icon: FiHeart, color: 'text-rose-500', bg: 'bg-rose-50' },
          { label: 'Reviews Given', value: stats.reviews, icon: FiStar, color: 'text-amber-500', bg: 'bg-amber-50' }
        ].map((s, i) => (
          <div key={i} className="modern-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{s.label}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{s.value}</h3>
              </div>
              <div className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center ${s.color}`}>
                <s.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="modern-card">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">Recent Bookings</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {recent.length === 0 ? (
            <p className="p-6 text-center text-slate-500">No recent bookings found.</p>
          ) : (
            recent.map(b => {
              const tourTitle = b.package?.title || b.tour || 'Unknown Tour';
              const tourDate = b.travelDate ? new Date(b.travelDate).toLocaleDateString() : (b.date || 'Soon');
              const tourAmount = b.totalAmount !== undefined ? b.totalAmount : (b.amount || 0);
              return (
                <div key={b.id || b._id} className="p-4 flex items-center gap-4 hover:bg-slate-55 transition-colors">
                  <div className="w-16 h-16 rounded-lg bg-slate-200 flex-shrink-0 overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&q=60" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-slate-900 truncate">{tourTitle}</p>
                    <p className="text-xs text-slate-500 mt-1">{tourDate} • ${tourAmount.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      b.status === 'Approved' || b.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' :
                      b.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                      'bg-rose-50 text-rose-600'
                    }`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function MyBookings({ user }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/bookings/user')
      .then(res => setData(res.data || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
      <div className="modern-card overflow-hidden">
        {data.length === 0 ? (
          <div className="p-12 text-center bg-slate-55"><FiCalendar className="mx-auto h-12 w-12 text-slate-300 mb-4" /><p className="text-slate-500">No bookings yet.</p></div>
        ) : (
          <div className="divide-y divide-slate-100">
            {data.map(b => {
              const tourTitle = b.package?.title || b.tour || 'Unknown Tour';
              const tourDate = b.travelDate ? new Date(b.travelDate).toLocaleDateString() : (b.date || 'TBD');
              const tourAmount = b.totalAmount !== undefined ? b.totalAmount : (b.amount || 0);
              return (
                <div key={b.id || b._id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50">
                  <div>
                    <h3 className="font-bold text-slate-900">{tourTitle}</h3>
                    <p className="text-sm text-slate-500 mt-1">Booking ID: {b.bookingId || b._id} • {tourDate}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-bold text-slate-900">${tourAmount.toLocaleString()}</p>
                    <span className={`badge ${
                      b.status === 'Approved' || b.status === 'Confirmed' ? 'badge-primary bg-emerald-50 text-emerald-600' :
                      b.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                      'bg-rose-50 text-rose-600'
                    }`}>{b.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Wishlist() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users/wishlist')
      .then(res => setData(res.data || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  const remove = async (id) => {
    try {
      // If there's an API route to remove from wishlist, we call it
      await api.delete(`/users/wishlist/${id}`).catch(() => {});
      setData(data.filter(p => p.id !== id && p._id !== id));
      toast.success('Removed from wishlist');
    } catch (err) {
      toast.error('Failed to remove');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Wishlist</h1>
      {data.length === 0 ? (
        <div className="modern-card p-12 text-center bg-slate-50"><FiHeart className="mx-auto h-12 w-12 text-slate-300 mb-4" /><p className="text-slate-500">Your wishlist is empty.</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map(p => (
            <div key={p.id || p._id} className="modern-card overflow-hidden group">
              <div className="relative h-48">
                <img src={p.image || p.images?.[0] || 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&q=80'} alt={p.title} className="w-full h-full object-cover" />
                <button onClick={() => remove(p.id || p._id)} className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-rose-500 shadow hover:bg-rose-500 hover:text-white transition-colors">
                  <FiTrash2 size={14} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 truncate">{p.title}</h3>
                <p className="text-sm text-slate-500 mt-1">${p.price?.toLocaleString()} / person</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MyReviews({ user }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/reviews/user')
      .then(res => setData(res.data || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">My Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.length === 0 ? (
          <div className="md:col-span-2 modern-card p-12 text-center bg-slate-50"><FiStar className="mx-auto h-12 w-12 text-slate-300 mb-4" /><p className="text-slate-500">No reviews submitted yet.</p></div>
        ) : (
          data.map((r, i) => {
            const tourTitle = r.package?.title || 'Tour Package';
            return (
              <div key={i} className="modern-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{tourTitle}</h3>
                    <div className="flex text-amber-400 mt-1">
                      {[...Array(5)].map((_, j) => <FiStar key={j} className={j < r.rating ? 'fill-current' : 'text-slate-200'} size={14} />)}
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'Recent'}</span>
                </div>
                <p className="text-sm text-slate-700 italic">"{r.comment}"</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function EditProfile({ user }) {
  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/users/profile', profile);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900">Edit Profile</h1>
      <div className="modern-card p-6">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} required />
          </div>
          <div>
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input bg-slate-50 text-slate-500" value={profile.email} disabled />
            <p className="text-xs text-slate-400 mt-1">Email cannot be changed.</p>
          </div>
          <div>
            <label className="form-label">Phone Number</label>
            <input type="text" className="form-input" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} />
          </div>
          <button type="submit" disabled={saving} className="btn btn-primary w-full sm:w-auto mt-4">
            {saving ? 'Saving...' : <><FiCheck size={16} className="inline mr-2" /> Save Changes</>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function UserDashboard() {
  const { user } = useAuth();

  const links = [
    { label: 'Overview', path: '/dashboard', icon: FiTrendingUp },
    { label: 'My Bookings', path: '/dashboard/bookings', icon: FiCalendar },
    { label: 'Wishlist', path: '/dashboard/wishlist', icon: FiHeart },
    { label: 'My Reviews', path: '/dashboard/reviews', icon: FiStar },
    { label: 'Edit Profile', path: '/dashboard/profile', icon: FiEdit2 },
  ];

  return (
    <DashboardLayout sidebarLinks={links}>
      <SEO title="User Dashboard | TravelGo" />
      <Routes>
        <Route index element={<Overview user={user} />} />
        <Route path="bookings" element={<MyBookings user={user} />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="reviews" element={<MyReviews user={user} />} />
        <Route path="profile" element={<EditProfile user={user} />} />
      </Routes>
    </DashboardLayout>
  );
}
