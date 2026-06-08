import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiUser, FiLogOut, FiSettings, FiChevronDown, FiCalendar, FiBell } from 'react-icons/fi';

const links = [
  { label: 'Home',         path: '/' },
  { label: 'Packages',     path: '/packages' },
  { label: 'Destinations', path: '/destinations' },
  { label: 'Blog',         path: '/blog' },
  { label: 'About',        path: '/about' },
  { label: 'Contact',      path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen]     = useState(false);
  const [notifOpen, setNotifOpen]   = useState(false);
  const { user, logout, isAdmin, isAgent } = useAuth();
  const location  = useLocation();
  const navigate  = useNavigate();
  const isHome    = location.pathname === '/';

  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (location.pathname !== prevPath) {
    setMobileOpen(false);
    setDropOpen(false);
    setNotifOpen(false);
    setPrevPath(location.pathname);
  }

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const solid = scrolled || !isHome;

  const dashboardLink = () => {
    if (isAdmin) return '/superadmin/dashboard';
    if (isAgent) return '/agency/dashboard';
    return '/dashboard';
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-white shadow-md py-3'
          : 'bg-black/40 backdrop-blur-md py-4'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              solid ? 'bg-primary text-white' : 'bg-white text-primary'
            }`}>
              <span className="text-sm font-bold tracking-wider">TG</span>
            </div>
            <span className={`text-xl font-extrabold tracking-tight transition-colors ${
              solid ? 'text-slate-900' : 'text-white'
            }`}>
              TravelGo
            </span>
          </Link>

          {/* ── Desktop Links ── */}
          <ul className="hidden lg:flex items-center gap-8">
            {links.map(link => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-base font-bold transition-all duration-200 tracking-wide ${
                    location.pathname === link.path
                      ? solid ? 'text-primary' : 'text-white drop-shadow-md'
                      : solid ? 'text-slate-700 hover:text-primary' : 'text-white/90 hover:text-white drop-shadow-sm hover:drop-shadow-md'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Auth / Actions ── */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                {/* Notification Bell */}
                <div className="relative" ref={notifRef}>
                  <button 
                    onClick={() => setNotifOpen(!notifOpen)}
                    className={`p-2 rounded-full transition-all ${
                      solid ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <FiBell size={18} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                  </button>
                  <AnimatePresence>
                    {notifOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                          <span className="font-semibold text-sm">Notifications</span>
                          <span className="text-xs text-primary cursor-pointer">Mark all as read</span>
                        </div>
                        <div className="p-4 text-center text-sm text-slate-500">
                          No new notifications.
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropOpen(!dropOpen)}
                    className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full transition-all border ${
                      solid
                        ? 'border-slate-200 hover:bg-slate-50'
                        : 'border-white/30 text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {user.name?.[0]?.toUpperCase()}
                    </div>
                    <span className="text-sm font-medium">{user.name?.split(' ')[0]}</span>
                    <FiChevronDown className={`transition-transform ${dropOpen ? 'rotate-180' : ''}`} size={14} />
                  </button>

                  <AnimatePresence>
                    {dropOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="font-semibold text-slate-900 text-sm truncate">{user.name}</p>
                          <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                          <span className="inline-block mt-2 px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">{user.role || 'User'}</span>
                        </div>
                        
                        <div className="py-1">
                          <Link to={dashboardLink()} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                            <FiSettings size={14} className="text-slate-400" /> Dashboard
                          </Link>
                          <Link to="/dashboard/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                            <FiUser size={14} className="text-slate-400" /> Profile
                          </Link>
                          {!isAdmin && !isAgent && (
                            <Link to="/dashboard/bookings" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                              <FiCalendar size={14} className="text-slate-400" /> My Bookings
                            </Link>
                          )}
                        </div>
                        
                        <div className="border-t border-slate-100 pt-1">
                          <button onClick={() => { logout(); setDropOpen(false); navigate('/'); }} className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full transition-colors">
                            <FiLogOut size={14} /> Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className={`px-6 py-2 rounded-full font-bold text-sm tracking-wide transition-all shadow-sm ${
                  solid 
                    ? 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md' 
                    : 'bg-white text-slate-900 hover:bg-gray-100 hover:shadow-md'
                }`}>
                  Sign In
                </Link>
              </div>
            )}
          </div>

          {/* ── Hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 transition-colors ${solid ? 'text-slate-900' : 'text-white'}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100"
          >
            <div className="px-6 py-4 space-y-1">
              {links.map(link => (
                <Link key={link.path} to={link.path}
                  className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-primary hover:bg-slate-50 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-100 flex gap-3 mt-2">
                {user ? (
                  <button onClick={() => { logout(); navigate('/'); }}
                    className="flex-1 py-2.5 text-center text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-all"
                  >Log out</button>
                ) : (
                    <Link to="/login" className="flex-1 py-3 text-center text-sm font-bold text-white bg-slate-900 rounded-xl shadow-sm">Sign In</Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
