import { useState } from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiGrid, FiPackage, FiUsers, FiCalendar, FiStar, FiMessageSquare,
  FiSettings, FiLogOut, FiMenu, FiX, FiEdit2, FiTrash2, FiPlus, FiCheck,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import { packages, adminUsers, bookings, reviews, contactMessages } from '../data/dummyData';
import CountUp from 'react-countup';

const CountUpComponent = typeof CountUp === 'function' ? CountUp : (CountUp.default || CountUp);

const NAV = [
  { path: '/admin',          label: 'Dashboard', icon: FiGrid,         end: true },
  { path: '/admin/packages', label: 'Packages',  icon: FiPackage },
  { path: '/admin/bookings', label: 'Bookings',  icon: FiCalendar },
  { path: '/admin/users',    label: 'Users',     icon: FiUsers },
  { path: '/admin/reviews',  label: 'Reviews',   icon: FiStar },
  { path: '/admin/messages', label: 'Messages',  icon: FiMessageSquare },
  { path: '/admin/settings', label: 'Settings',  icon: FiSettings },
];

const S = {
  card: { background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(10,25,47,0.07)', padding: '24px' },
  badge: (s) => ({
    padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600,
    background: s === 'Confirmed' ? 'rgba(16,185,129,0.10)' : s === 'Pending' ? 'rgba(245,158,11,0.10)' : 'rgba(239,68,68,0.10)',
    color: s === 'Confirmed' ? '#065f46' : s === 'Pending' ? '#92400e' : '#991b1b',
  }),
  th: { padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#888' },
  td: { padding: '12px 16px', fontSize: 13, color: '#4a4a4a', borderTop: '1px solid #f0ede6' },
};

// ── Dashboard Overview ───────────────────────────────────────────────────────
function DashboardHome() {
  const cards = [
    { label: 'Total Users',    value: 1248,  icon: '👥', accent: '#0a192f', change: '+12%' },
    { label: 'Total Packages', value: 48,    icon: '✈️', accent: '#b8975a', change: '+3' },
    { label: 'Total Bookings', value: 324,   icon: '📋', accent: '#10b981', change: '+28' },
    { label: 'Revenue',        value: 84200, icon: '💰', accent: '#8b5cf6', change: '+18%', prefix: '$' },
  ];
  return (
    <div>
      <h1 className="text-3xl font-light mb-8" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
        Dashboard Overview
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="rounded-2xl p-5" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(10,25,47,0.06)', borderLeft: `3px solid ${c.accent}` }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{c.icon}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(16,185,129,0.10)', color: '#065f46' }}>
                ↑ {c.change}
              </span>
            </div>
            <div className="text-2xl font-light mb-0.5" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
              {c.prefix}<CountUpComponent end={c.value} duration={2} separator="," />
            </div>
            <div className="text-xs" style={{ color: '#888' }}>{c.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden" style={S.card}>
          <h3 className="font-semibold mb-5" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f', fontSize: '1.1rem' }}>
            Recent Bookings
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full" aria-label="Recent bookings">
              <thead style={{ background: '#f8f6f2' }}>
                <tr>
                  {['ID', 'Customer', 'Tour', 'Amount', 'Status'].map(h => (
                    <th key={h} style={S.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 4).map(b => (
                  <tr key={b.id}>
                    <td style={S.td}><span style={{ color: '#b8975a', fontWeight: 700 }}>{b.id}</span></td>
                    <td style={{ ...S.td, fontWeight: 600, color: '#0a192f' }}>{b.user}</td>
                    <td style={{ ...S.td, color: '#888' }}>{b.tour.slice(0, 22)}…</td>
                    <td style={{ ...S.td, fontWeight: 600, color: '#0a192f' }}>${b.amount.toLocaleString()}</td>
                    <td style={S.td}><span style={S.badge(b.status)}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="rounded-2xl" style={S.card}>
          <h3 className="font-semibold mb-5" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f', fontSize: '1.1rem' }}>
            Quick Stats
          </h3>
          <div className="space-y-3">
            {[
              ['Pending Bookings', '3', '#f59e0b'],
              ['New Messages',     '2', '#ef4444'],
              ['Active Tours',     '6', '#10b981'],
              ['Reviews Today',    '5', '#b8975a'],
            ].map(([l, v, c]) => (
              <div key={l} className="flex justify-between items-center p-3 rounded-xl" style={{ background: '#f8f6f2' }}>
                <span className="text-sm" style={{ color: '#4a4a4a' }}>{l}</span>
                <strong className="text-lg font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: c }}>{v}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Manage Packages ───────────────────────────────────────────────────────────
function ManagePackages() {
  const [list, setList]     = useState(packages);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]  = useState(null);
  const [form, setForm]        = useState({ title: '', destination: '', type: 'International', price: '', duration: '' });
  const { isAdmin } = useAuth();

  const save = () => {
    if (!form.title || !form.price) return;
    if (editing) {
      setList(list.map(p => p.id === editing.id ? { ...p, ...form, price: Number(form.price) } : p));
    } else {
      setList([...list, {
        ...form, id: Date.now(), price: Number(form.price),
        rating: 4.5, reviews: 0,
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80',
        badge: 'New', seats: 20, highlights: [],
      }]);
    }
    setShowForm(false); setEditing(null);
    setForm({ title: '', destination: '', type: 'International', price: '', duration: '' });
  };

  const inputClass = {
    width: '100%', border: '1.5px solid #e8e4dc', borderRadius: 10,
    padding: '10px 14px', fontSize: 13, fontFamily: 'DM Sans, sans-serif',
    outline: 'none', color: '#1a1a1a', background: '#fff',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
          Manage Packages
        </h1>
        <button onClick={() => { setShowForm(true); setEditing(null); }} className="btn-primary gap-2 !py-2.5 !text-xs">
          <FiPlus /> Add Package
        </button>
      </div>

      {showForm && (
        <div className="rounded-2xl p-6 mb-6" style={{ background: '#fff', boxShadow: '0 4px 24px rgba(10,25,47,0.07)' }}>
          <h3 className="font-semibold mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f', fontSize: '1.1rem' }}>
            {editing ? 'Edit' : 'Add New'} Package
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[['Title', 'title', 'text', 'Package name'],
              ['Destination', 'destination', 'text', 'e.g. Santorini, Greece'],
              ['Price (USD)', 'price', 'number', '0'],
              ['Duration', 'duration', 'text', '7D/6N']].map(([label, key, type, placeholder]) => (
              <div key={key}>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#0a192f' }}>{label}</label>
                <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder} style={inputClass} />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#0a192f' }}>Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={inputClass}>
                {['International', 'Domestic', 'Romance', 'Family', 'Group', 'Adventure'].map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={save} className="btn-primary !py-2.5 !text-xs">{editing ? 'Update' : 'Add'} Package</button>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="btn-outline !py-2.5 !text-xs">Cancel</button>
          </div>
        </div>
      )}

      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(10,25,47,0.06)' }}>
        <div className="overflow-x-auto">
          <table className="w-full" aria-label="Packages table">
            <thead style={{ background: '#f8f6f2' }}>
              <tr>
                {['Package', 'Destination', 'Type', 'Price', 'Rating', 'Actions'].map(h => (
                  <th key={h} style={S.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map(p => (
                <tr key={p.id}>
                  <td style={{ ...S.td, fontWeight: 600, color: '#0a192f' }}>{p.title}</td>
                  <td style={S.td}>{p.destination}</td>
                  <td style={S.td}>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: 'rgba(184,151,90,0.10)', color: '#b8975a' }}>
                      {p.type}
                    </span>
                  </td>
                  <td style={{ ...S.td, fontWeight: 600, color: '#b8975a' }}>${p.price.toLocaleString()}</td>
                  <td style={S.td}>⭐ {p.rating}</td>
                  <td style={S.td}>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setEditing(p); setForm({ title: p.title, destination: p.destination, type: p.type, price: p.price, duration: p.duration }); setShowForm(true); }}
                        className="p-1.5 rounded-lg transition-all"
                        style={{ background: 'rgba(184,151,90,0.10)', color: '#b8975a' }}
                        aria-label={`Edit ${p.title}`}>
                        <FiEdit2 size={13} />
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => { if (window.confirm(`Delete "${p.title}"?`)) setList(list.filter(x => x.id !== p.id)); }}
                          className="p-1.5 rounded-lg transition-all"
                          style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444' }}
                          aria-label={`Delete ${p.title}`}>
                          <FiTrash2 size={13} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Manage Bookings ───────────────────────────────────────────────────────────
function ManageBookings() {
  return (
    <div>
      <h1 className="text-3xl font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
        Manage Bookings
      </h1>
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(10,25,47,0.06)' }}>
        <div className="overflow-x-auto">
          <table className="w-full" aria-label="Bookings table">
            <thead style={{ background: '#f8f6f2' }}>
              <tr>{['ID', 'Customer', 'Tour', 'Date', 'Persons', 'Amount', 'Status'].map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td style={S.td}><span style={{ color: '#b8975a', fontWeight: 700 }}>{b.id}</span></td>
                  <td style={{ ...S.td, fontWeight: 600, color: '#0a192f' }}>{b.user}</td>
                  <td style={{ ...S.td, color: '#888' }}>{b.tour}</td>
                  <td style={{ ...S.td, color: '#888' }}>{b.date}</td>
                  <td style={{ ...S.td, textAlign: 'center' }}>{b.persons}</td>
                  <td style={{ ...S.td, fontWeight: 600, color: '#0a192f' }}>${b.amount.toLocaleString()}</td>
                  <td style={S.td}><span style={S.badge(b.status)}>{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Manage Users ───────────────────────────────────────────────────────────
function ManageUsers() {
  return (
    <div>
      <h1 className="text-3xl font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
        Manage Users
      </h1>
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(10,25,47,0.06)' }}>
        <div className="overflow-x-auto">
          <table className="w-full" aria-label="Users table">
            <thead style={{ background: '#f8f6f2' }}>
              <tr>{['Name', 'Email', 'Phone', 'Joined', 'Bookings', 'Status'].map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {adminUsers.map(u => (
                <tr key={u.id}>
                  <td style={{ ...S.td, fontWeight: 600, color: '#0a192f' }}>{u.name}</td>
                  <td style={S.td}>{u.email}</td>
                  <td style={S.td}>{u.phone}</td>
                  <td style={{ ...S.td, color: '#888' }}>{u.joinDate}</td>
                  <td style={{ ...S.td, textAlign: 'center' }}>{u.bookings}</td>
                  <td style={S.td}>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: u.status === 'Active' ? 'rgba(16,185,129,0.10)' : 'rgba(107,114,128,0.10)',
                        color: u.status === 'Active' ? '#065f46' : '#6b7280',
                      }}>
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Reviews ───────────────────────────────────────────────────────────────────
function ManageReviews() {
  return (
    <div>
      <h1 className="text-3xl font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
        Reviews
      </h1>
      <div className="space-y-4">
        {reviews.map(r => (
          <div key={r.id} className="rounded-2xl p-6" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(10,25,47,0.06)' }}>
            <div className="flex items-center gap-3 mb-3">
              <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
              <div>
                <p className="font-semibold text-sm" style={{ color: '#0a192f' }}>{r.name}</p>
                <div className="flex gap-0.5">
                  {'★'.repeat(r.rating).split('').map((s, i) => (
                    <span key={i} style={{ color: '#b8975a', fontSize: 13 }}>★</span>
                  ))}
                </div>
              </div>
              <span className="ml-auto text-xs" style={{ color: '#aaa' }}>{r.location} · {r.date}</span>
            </div>
            <p className="text-sm leading-7 italic" style={{ color: '#4a4a4a' }}>"{r.comment}"</p>
            <p className="text-xs mt-2 font-semibold" style={{ color: '#b8975a' }}>{r.tour}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Messages ─────────────────────────────────────────────────────────────────
function ManageMessages() {
  const [msgs, setMsgs] = useState(contactMessages);
  return (
    <div>
      <h1 className="text-3xl font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
        Contact Messages
      </h1>
      <div className="space-y-3">
        {msgs.map(m => (
          <div key={m.id} className="rounded-2xl p-6 transition-all"
            style={{
              background: '#fff',
              boxShadow: '0 2px 12px rgba(10,25,47,0.06)',
              borderLeft: !m.read ? '3px solid #b8975a' : '3px solid transparent',
            }}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm" style={{ color: '#0a192f' }}>{m.name}</span>
                <span className="text-xs" style={{ color: '#888' }}>— {m.email}</span>
                {!m.read && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                    style={{ background: 'rgba(184,151,90,0.12)', color: '#b8975a' }}>New</span>
                )}
              </div>
              <span className="text-xs" style={{ color: '#aaa' }}>{m.date}</span>
            </div>
            <p className="font-semibold text-sm mb-1" style={{ color: '#0a192f' }}>{m.subject}</p>
            <p className="text-sm mb-3" style={{ color: '#888', lineHeight: 1.7 }}>{m.message}</p>
            {!m.read && (
              <button
                onClick={() => setMsgs(msgs.map(x => x.id === m.id ? { ...x, read: true } : x))}
                className="text-xs font-bold flex items-center gap-1 transition-colors"
                style={{ color: '#b8975a' }}>
                <FiCheck size={12} /> Mark as Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Settings ─────────────────────────────────────────────────────────────────
function AdminSettings() {
  const inputClass = {
    width: '100%', border: '1.5px solid #e8e4dc', borderRadius: 10,
    padding: '12px 16px', fontSize: 13, fontFamily: 'DM Sans, sans-serif',
    outline: 'none', color: '#1a1a1a', background: '#fff',
  };
  return (
    <div>
      <h1 className="text-3xl font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
        Settings
      </h1>
      <div className="rounded-2xl p-8 max-w-lg" style={{ background: '#fff', boxShadow: '0 4px 24px rgba(10,25,47,0.06)' }}>
        <h3 className="font-semibold mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f', fontSize: '1.1rem' }}>
          Site Configuration
        </h3>
        <div className="space-y-4">
          {[['Site Name', 'TravelGo'], ['Contact Email', 'hello@travelgo.com'], ['Phone', '+91 12345 67890']].map(([l, v]) => (
            <div key={l}>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#0a192f' }}>{l}</label>
              <input defaultValue={v} style={inputClass} />
            </div>
          ))}
          <div>
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#0a192f' }}>Currency</label>
            <select style={inputClass}>
              <option>USD</option><option>INR</option><option>EUR</option>
            </select>
          </div>
          <button className="btn-primary w-full justify-center !py-3" style={{ width: '100%' }}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Admin Layout ─────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen" style={{ background: '#f8f6f2' }}>
      <SEO title="Admin Dashboard" description="TravelGo admin panel — manage packages, bookings, users and reviews." />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-60 z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ background: 'linear-gradient(180deg, #0a192f, #0d2340)' }}
        aria-label="Admin navigation"
      >
        {/* Logo */}
        <div className="p-5 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(184,151,90,0.15)', border: '1px solid rgba(184,151,90,0.30)' }}>
              <span className="text-xs font-bold" style={{ color: '#b8975a' }}>TG</span>
            </div>
            <span className="text-white font-light text-lg tracking-widest"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Travel<span style={{ color: '#b8975a' }}>Go</span>
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
            style={{ background: 'rgba(184,151,90,0.15)', color: '#b8975a' }}>
            {user?.role}
          </span>
        </div>

        {/* User info */}
        <div className="p-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #b8975a, #d4b483)' }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{user?.name}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV.map(item => (
            <NavLink key={item.path} to={item.path} end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                  ? 'bg-[#b8975a]/20 text-[#d4b483] border border-[#b8975a]/30'
                  : 'text-white/50 hover:bg-white/8 hover:text-white/90'
                }`
              }>
              <item.icon size={15} />{item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{ color: 'rgba(239,68,68,0.80)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.10)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <FiLogOut size={15} />Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4"
          style={{ background: '#fff', boxShadow: '0 2px 12px rgba(10,25,47,0.06)' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg transition-all"
            style={{ color: '#0a192f' }}
            aria-label="Toggle navigation">
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          <span className="font-semibold text-sm hidden lg:block" style={{ color: '#4a4a4a' }}>
            Admin Dashboard
          </span>
          <div className="flex items-center gap-2 text-sm" style={{ color: '#888' }}>
            <span>👋</span>
            <span>Welcome, <strong style={{ color: '#0a192f' }}>{user?.name?.split(' ')[0]}</strong></span>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="packages" element={<ManagePackages />} />
            <Route path="bookings" element={<ManageBookings />} />
            <Route path="users"    element={<ManageUsers />} />
            <Route path="reviews"  element={<ManageReviews />} />
            <Route path="messages" element={<ManageMessages />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
