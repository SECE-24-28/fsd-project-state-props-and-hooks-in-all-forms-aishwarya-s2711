import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCalendar, FiHeart, FiStar, FiEdit2,
  FiLogOut, FiCheck, FiX, FiPackage, FiTrendingUp,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { packages } from '../data/dummyData';

const MOCK_BOOKINGS = [
  { id: 'BK001', tour: 'Santorini Sunset Escape', date: '2024-06-15', persons: 2, amount: 4998,  status: 'Confirmed', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=80&q=60' },
  { id: 'BK002', tour: 'Maldives Paradise Getaway', date: '2024-07-20', persons: 2, amount: 6598, status: 'Pending',   img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=80&q=60' },
];

const MOCK_REVIEWS = [
  { id: 1, tour: 'Santorini Sunset Escape', rating: 5, comment: 'Absolutely magical! TravelGo arranged everything perfectly. The guides were exceptional.', date: 'March 2024', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=80&q=60' },
];

const TABS = [
  { id: 'overview', label: 'Overview',     icon: FiTrendingUp },
  { id: 'bookings', label: 'My Bookings',  icon: FiCalendar },
  { id: 'wishlist', label: 'Wishlist',     icon: FiHeart },
  { id: 'reviews',  label: 'My Reviews',   icon: FiStar },
  { id: 'profile',  label: 'Edit Profile', icon: FiEdit2 },
];

const statusStyle = (s) => ({
  padding: '3px 12px', borderRadius: 100, fontSize: 11, fontWeight: 600,
  background: s === 'Confirmed' ? 'rgba(16,185,129,0.10)' : s === 'Pending' ? 'rgba(245,158,11,0.10)' : 'rgba(239,68,68,0.10)',
  color:      s === 'Confirmed' ? '#065f46' : s === 'Pending' ? '#92400e' : '#991b1b',
});

const card = { background: '#fff', borderRadius: 20, boxShadow: '0 4px 24px rgba(10,25,47,0.07)', padding: '24px' };

function EmptyState({ icon, title, sub, action, actionLabel }) {
  return (
    <div className="rounded-3xl py-20 text-center"
      style={{ background: 'rgba(184,151,90,0.04)', border: '2px dashed rgba(184,151,90,0.20)' }}>
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-light mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>{title}</h3>
      <p className="text-sm mb-6" style={{ color: '#888' }}>{sub}</p>
      {action && (
        <button onClick={action} className="btn-primary">{actionLabel}</button>
      )}
    </div>
  );
}

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Rating">
      {[1,2,3,4,5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          aria-pressed={value >= n}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
        >
          <FiStar
            size={22}
            style={{
              color: (hover || value) >= n ? '#b8975a' : '#e8e4dc',
              fill:  (hover || value) >= n ? '#b8975a' : 'none',
              transition: 'all 0.15s',
            }}
          />
        </button>
      ))}
    </div>
  );
}

export default function UserDashboard({ defaultTab = 'overview' }) {
  const [activeTab, setActiveTab]   = useState(defaultTab);

  // Sync active tab when defaultTab prop changes (e.g. direct navigation to /profile or /bookings)
  const [prevDefaultTab, setPrevDefaultTab] = useState(defaultTab);
  if (defaultTab !== prevDefaultTab) {
    setActiveTab(defaultTab);
    setPrevDefaultTab(defaultTab);
  }
  const [reviews, setReviews]       = useState(MOCK_REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ tour: '', rating: 5, comment: '' });
  const [profile, setProfile]       = useState({ name: '', phone: '' });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Init profile from user once
  const profileName  = profile.name  || user?.name  || '';
  const profilePhone = profile.phone || user?.phone || '';

  const submitReview = (e) => {
    e.preventDefault();
    if (!reviewForm.tour)    { toast.error('Please select a tour'); return; }
    if (!reviewForm.comment.trim()) { toast.error('Please write a comment'); return; }
    const newReview = {
      id: Date.now(),
      tour: reviewForm.tour,
      rating: reviewForm.rating,
      comment: reviewForm.comment.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      img: packages.find(p => p.title === reviewForm.tour)?.image || '',
    };
    setReviews(prev => [newReview, ...prev]);
    setReviewForm({ tour: '', rating: 5, comment: '' });
    setShowReviewForm(false);
    toast.success('Review submitted! Thank you ✨');
  };

  const inputStyle = {
    width: '100%', border: '1.5px solid #e8e4dc', borderRadius: 10,
    padding: '12px 16px', fontSize: 13, fontFamily: 'DM Sans, sans-serif',
    outline: 'none', color: '#1a1a1a', background: '#fff',
  };

  return (
    <>
      <SEO title="My Dashboard" description="Manage your TravelGo bookings, wishlist, reviews and profile." />
      <div className="min-h-screen page-enter" style={{ background: '#f8f6f2', paddingTop: 80 }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* ── Sidebar ── */}
            <aside className="lg:w-64 shrink-0" aria-label="Dashboard navigation">
              <div style={card}>
                {/* User info */}
                <div className="flex flex-col items-center text-center pb-6 mb-5"
                  style={{ borderBottom: '1px solid #f0ede6' }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-light mb-3"
                    style={{ background: 'linear-gradient(135deg, #0a192f, #112a4a)', fontFamily: 'Cormorant Garamond, serif' }}>
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  <h2 className="font-semibold text-base mb-0.5" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
                    {user?.name}
                  </h2>
                  <p className="text-xs mb-2" style={{ color: '#888' }}>{user?.email}</p>
                  <span className="text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest"
                    style={{ background: 'rgba(184,151,90,0.10)', color: '#b8975a', border: '1px solid rgba(184,151,90,0.25)' }}>
                    {user?.role || 'Traveler'}
                  </span>
                </div>

                {/* Nav */}
                <nav className="space-y-1" role="navigation">
                  {TABS.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left"
                      style={{
                        background: activeTab === tab.id ? '#0a192f' : 'transparent',
                        color:      activeTab === tab.id ? '#fff' : '#4a4a4a',
                      }}
                      aria-current={activeTab === tab.id ? 'page' : undefined}>
                      <tab.icon size={15} style={{ color: activeTab === tab.id ? '#b8975a' : 'inherit' }} />
                      {tab.label}
                    </button>
                  ))}
                  <button
                    onClick={() => { logout(); navigate('/'); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{ color: '#ef4444' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.06)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <FiLogOut size={15} /> Sign Out
                  </button>
                </nav>
              </div>
            </aside>

            {/* ── Main ── */}
            <main className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >

                  {/* ── Overview ── */}
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <h1 className="text-3xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
                        Welcome back, {user?.name?.split(' ')[0]}! ✈️
                      </h1>

                      {/* Stat cards */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { label: 'Total Bookings', value: MOCK_BOOKINGS.length,  icon: FiCalendar,   accent: '#b8975a' },
                          { label: 'Upcoming Trips', value: 1,                      icon: FiPackage,    accent: '#10b981' },
                          { label: 'Wishlist Items', value: 4,                      icon: FiHeart,      accent: '#ec4899' },
                          { label: 'Reviews Given',  value: reviews.length,         icon: FiStar,       accent: '#f59e0b' },
                        ].map((s, i) => (
                          <motion.div key={i}
                            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="rounded-2xl p-5 cursor-pointer transition-all"
                            style={{ background: '#fff', boxShadow: '0 2px 12px rgba(10,25,47,0.06)', borderLeft: `3px solid ${s.accent}` }}
                            onClick={() => {
                              if (s.label === 'My Bookings') setActiveTab('bookings');
                              if (s.label === 'Wishlist Items') setActiveTab('wishlist');
                              if (s.label === 'Reviews Given') setActiveTab('reviews');
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                              style={{ background: `${s.accent}18` }}>
                              <s.icon size={18} style={{ color: s.accent }} />
                            </div>
                            <div className="text-2xl font-light mb-0.5" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
                              {s.value}
                            </div>
                            <div className="text-xs" style={{ color: '#888' }}>{s.label}</div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Recent Bookings */}
                      <div style={card}>
                        <h3 className="font-semibold mb-5" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f', fontSize: '1.1rem' }}>
                          Recent Bookings
                        </h3>
                        <div className="space-y-3">
                          {MOCK_BOOKINGS.map(b => (
                            <div key={b.id} className="flex items-center gap-4 p-4 rounded-2xl"
                              style={{ background: '#f8f6f2' }}>
                              <img src={b.img} alt={b.tour} className="w-14 h-14 rounded-xl object-cover shrink-0" loading="lazy" />
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm truncate" style={{ color: '#0a192f' }}>{b.tour}</p>
                                <p className="text-xs mt-0.5" style={{ color: '#888' }}>{b.date} · {b.persons} travelers</p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="font-semibold text-sm mb-1" style={{ color: '#b8975a' }}>${b.amount.toLocaleString()}</p>
                                <span style={statusStyle(b.status)}>{b.status}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button onClick={() => setActiveTab('bookings')}
                          className="mt-4 text-xs font-bold uppercase tracking-wider transition-colors"
                          style={{ color: '#b8975a' }}>
                          View All Bookings →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── Bookings ── */}
                  {activeTab === 'bookings' && (
                    <div>
                      <h2 className="text-3xl font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
                        My Bookings
                      </h2>
                      {MOCK_BOOKINGS.length === 0 ? (
                        <EmptyState icon="🎫" title="No Bookings Yet"
                          sub="Your confirmed tours will appear here"
                          action={() => navigate('/packages')} actionLabel="Browse Packages" />
                      ) : (
                        <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm" aria-label="Bookings table">
                              <thead style={{ background: '#f8f6f2' }}>
                                <tr>
                                  {['Booking ID', 'Tour', 'Date', 'Travelers', 'Amount', 'Status'].map(h => (
                                    <th key={h} className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider"
                                      style={{ color: '#888' }}>{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {MOCK_BOOKINGS.map(b => (
                                  <tr key={b.id} style={{ borderTop: '1px solid #f0ede6' }}>
                                    <td className="px-5 py-4 font-bold text-xs" style={{ color: '#b8975a' }}>{b.id}</td>
                                    <td className="px-5 py-4 font-medium text-sm" style={{ color: '#0a192f' }}>{b.tour}</td>
                                    <td className="px-5 py-4 text-sm" style={{ color: '#888' }}>{b.date}</td>
                                    <td className="px-5 py-4 text-sm" style={{ color: '#888' }}>{b.persons}</td>
                                    <td className="px-5 py-4 font-semibold text-sm" style={{ color: '#0a192f' }}>
                                      ${b.amount.toLocaleString()}
                                    </td>
                                    <td className="px-5 py-4">
                                      <span style={statusStyle(b.status)}>{b.status}</span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── Wishlist ── */}
                  {activeTab === 'wishlist' && (
                    <div>
                      <h2 className="text-3xl font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
                        My Wishlist
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {packages.slice(0, 4).map((pkg) => (
                          <div key={pkg.id} className="rounded-2xl overflow-hidden group transition-all"
                            style={{ background: '#fff', boxShadow: '0 2px 12px rgba(10,25,47,0.06)' }}>
                            <div className="relative h-44 overflow-hidden">
                              <img src={pkg.image} alt={pkg.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy" />
                              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,25,47,0.65), transparent 60%)' }} />
                              <div className="absolute bottom-3 left-4">
                                <h3 className="text-white text-lg font-light"
                                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>{pkg.title}</h3>
                                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>{pkg.destination}</p>
                              </div>
                            </div>
                            <div className="p-4 flex items-center justify-between">
                              <span className="text-xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
                                ${pkg.price.toLocaleString()}<span className="text-xs text-gray-400 ml-1">/person</span>
                              </span>
                              <Link to={`/packages/${pkg.id}`} className="btn-primary !py-2 !text-xs">
                                View Package
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Reviews ── */}
                  {activeTab === 'reviews' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
                          My Reviews
                        </h2>
                        <button onClick={() => setShowReviewForm(v => !v)} className="btn-primary !py-2.5 !text-xs">
                          {showReviewForm ? <><FiX size={13} /> Cancel</> : <><FiEdit2 size={13} /> Write Review</>}
                        </button>
                      </div>

                      {/* Review form */}
                      <AnimatePresence>
                        {showReviewForm && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mb-6"
                          >
                            <form onSubmit={submitReview} style={card} aria-label="Write a review">
                              <h3 className="font-semibold mb-5" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f', fontSize: '1.1rem' }}>
                                Share Your Experience
                              </h3>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#0a192f' }}>
                                    Select Tour <span style={{ color: '#b8975a' }}>*</span>
                                  </label>
                                  <select
                                    value={reviewForm.tour}
                                    onChange={e => setReviewForm(p => ({ ...p, tour: e.target.value }))}
                                    style={inputStyle} required>
                                    <option value="">Choose a tour you've taken</option>
                                    {MOCK_BOOKINGS.map(b => (
                                      <option key={b.id} value={b.tour}>{b.tour}</option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-xs font-semibold mb-2" style={{ color: '#0a192f' }}>
                                    Your Rating <span style={{ color: '#b8975a' }}>*</span>
                                  </label>
                                  <StarRating value={reviewForm.rating} onChange={r => setReviewForm(p => ({ ...p, rating: r }))} />
                                </div>
                                <div>
                                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#0a192f' }}>
                                    Your Review <span style={{ color: '#b8975a' }}>*</span>
                                  </label>
                                  <textarea
                                    rows={4}
                                    value={reviewForm.comment}
                                    onChange={e => setReviewForm(p => ({ ...p, comment: e.target.value }))}
                                    placeholder="Tell other travelers about your experience..."
                                    style={{ ...inputStyle, resize: 'none', paddingTop: 12 }}
                                    required
                                  />
                                </div>
                                <button type="submit" className="btn-primary">
                                  <FiCheck size={14} /> Submit Review
                                </button>
                              </div>
                            </form>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Review list */}
                      {reviews.length === 0 ? (
                        <EmptyState icon="✍️" title="No Reviews Yet"
                          sub="Share your travel experience to help other travelers"
                          action={() => setShowReviewForm(true)} actionLabel="Write a Review" />
                      ) : (
                        <div className="space-y-4">
                          {reviews.map(r => (
                            <motion.div key={r.id}
                              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                              style={card}>
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  {r.img && (
                                    <img src={r.img} alt={r.tour}
                                      className="w-12 h-12 rounded-xl object-cover shrink-0" loading="lazy" />
                                  )}
                                  <div>
                                    <p className="font-semibold text-sm mb-1" style={{ color: '#0a192f' }}>{r.tour}</p>
                                    <div className="flex gap-0.5">
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <FiStar key={i} size={13}
                                          style={{ color: i < r.rating ? '#b8975a' : '#e8e4dc', fill: i < r.rating ? '#b8975a' : 'none' }} />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <span className="text-xs shrink-0" style={{ color: '#aaa' }}>{r.date}</span>
                              </div>
                              <p className="text-sm leading-7 italic" style={{ color: '#4a4a4a' }}>"{r.comment}"</p>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── Profile ── */}
                  {activeTab === 'profile' && (
                    <div>
                      <h2 className="text-3xl font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
                        Edit Profile
                      </h2>
                      <div style={{ ...card, maxWidth: 520 }}>
                        <div className="flex flex-col items-center mb-8">
                          <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-light mb-3"
                            style={{ background: 'linear-gradient(135deg, #0a192f, #112a4a)', fontFamily: 'Cormorant Garamond, serif' }}>
                            {user?.name?.[0]?.toUpperCase()}
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider"
                            style={{ color: '#b8975a' }}>
                            {user?.role || 'Traveler'}
                          </span>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="prof-name" className="block text-xs font-semibold mb-1.5" style={{ color: '#0a192f' }}>
                              Full Name
                            </label>
                            <input id="prof-name"
                              value={profileName}
                              onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                              style={inputStyle} placeholder="Your full name"
                              onFocus={e => e.target.style.borderColor = '#b8975a'}
                              onBlur={e => e.target.style.borderColor = '#e8e4dc'} />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#0a192f' }}>
                              Email Address
                            </label>
                            <input value={user?.email || ''} readOnly
                              style={{ ...inputStyle, background: '#f8f6f2', cursor: 'not-allowed', color: '#aaa' }} />
                            <p className="text-xs mt-1" style={{ color: '#aaa' }}>Email cannot be changed</p>
                          </div>
                          <div>
                            <label htmlFor="prof-phone" className="block text-xs font-semibold mb-1.5" style={{ color: '#0a192f' }}>
                              Mobile Number
                            </label>
                            <input id="prof-phone"
                              value={profilePhone}
                              onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                              style={inputStyle} placeholder="+91 XXXXX XXXXX"
                              onFocus={e => e.target.style.borderColor = '#b8975a'}
                              onBlur={e => e.target.style.borderColor = '#e8e4dc'} />
                          </div>
                          <button
                            className="btn-primary w-full justify-center !py-3.5"
                            style={{ width: '100%' }}
                            onClick={() => toast.success('Profile updated! ✅')}>
                            <FiCheck size={15} /> Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
