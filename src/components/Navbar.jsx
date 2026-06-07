import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiUser, FiLogOut, FiSettings, FiChevronDown, FiCalendar, FiHelpCircle, FiShield, FiFileText } from 'react-icons/fi';
import { toast } from 'react-toastify';

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
  const { user, logout, isAdmin, isAgent } = useAuth();
  const location  = useLocation();
  const navigate  = useNavigate();
  const isHome    = location.pathname === '/';

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change — intentional synchronization with navigation
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (location.pathname !== prevPath) {
    setMobileOpen(false);
    setDropOpen(false);
    setPrevPath(location.pathname);
  }

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const solid = scrolled || !isHome;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid
          ? 'bg-white/95 backdrop-blur-2xl shadow-[0_2px_40px_rgba(0,0,0,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              solid ? 'bg-[#0a192f]' : 'bg-white/20 border border-white/40'
            }`}>
              <span className="text-white text-sm font-bold tracking-widest">TG</span>
            </div>
            <span className={`text-xl tracking-widest font-light transition-colors ${
              solid ? 'text-[#0a192f]' : 'text-white'
            }`} style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.15em' }}>
              TRAVEL<span className={solid ? 'text-[#b8975a]' : 'text-[#d4b483]'}>GO</span>
            </span>
          </Link>

          {/* ── Desktop Links ── */}
          <ul className="hidden lg:flex items-center gap-8">
            {links.map(link => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-xs tracking-[2px] uppercase font-medium transition-all duration-300 pb-0.5 ${
                    location.pathname === link.path
                      ? solid ? 'text-[#b8975a] border-b border-[#b8975a]' : 'text-[#d4b483] border-b border-[#d4b483]'
                      : solid ? 'text-gray-600 hover:text-[#0a192f]' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Auth ── */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropOpen(!dropOpen)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all ${
                    solid
                      ? 'bg-[#0a192f]/5 text-[#0a192f] hover:bg-[#0a192f]/10'
                      : 'bg-white/15 text-white border border-white/30 hover:bg-white/25'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#b8975a] to-[#d4b483] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  {user.name?.split(' ')[0]}
                  <FiChevronDown className={`transition-transform ${dropOpen ? 'rotate-180' : ''}`} size={13} />
                </button>

                <AnimatePresence>
                  {dropOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.14)] border border-gray-100/80 py-2 overflow-hidden z-50"
                    >
                      <div className="px-5 py-4 border-b border-gray-100">
                        <p className="font-semibold text-[#0a192f] text-sm">{user.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
                        <span className="inline-block mt-2 px-2.5 py-0.5 bg-[#b8975a]/10 text-[#b8975a] rounded-full text-[10px] font-bold uppercase tracking-wider">{user.role}</span>
                      </div>
                      <Link to="/profile" onClick={() => setDropOpen(false)} className="flex items-center gap-3 px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <FiUser size={14} className="text-[#b8975a]" /> Profile
                      </Link>
                      <Link to="/bookings" onClick={() => setDropOpen(false)} className="flex items-center gap-3 px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <FiCalendar size={14} className="text-[#b8975a]" /> My Bookings
                      </Link>
                      <Link to="/faq" onClick={() => setDropOpen(false)} className="flex items-center gap-3 px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <FiHelpCircle size={14} className="text-[#b8975a]" /> FAQ
                      </Link>
                      <Link to="/privacy" onClick={() => setDropOpen(false)} className="flex items-center gap-3 px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <FiShield size={14} className="text-[#b8975a]" /> Privacy Policy
                      </Link>
                      <Link to="/terms" onClick={() => setDropOpen(false)} className="flex items-center gap-3 px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <FiFileText size={14} className="text-[#b8975a]" /> Terms &amp; Conditions
                      </Link>
                      <button onClick={() => { setDropOpen(false); toast.info('Settings panel coming soon'); }} className="flex items-center gap-3 px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left transition-colors">
                        <FiSettings size={14} className="text-[#b8975a]" /> Settings
                      </button>
                      {(isAdmin || isAgent) && (
                        <Link to="/admin" onClick={() => setDropOpen(false)} className="flex items-center gap-3 px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          <FiSettings size={14} className="text-purple-500" /> Admin Panel
                        </Link>
                      )}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button onClick={() => { logout(); setDropOpen(false); navigate('/'); }} className="flex items-center gap-3 px-5 py-2 text-sm text-red-500 hover:bg-red-50 w-full transition-colors">
                          <FiLogOut size={14} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className={`text-xs tracking-[2px] uppercase font-semibold transition-all ${
                  solid ? 'text-[#0a192f] hover:text-[#b8975a]' : 'text-white/90 hover:text-white'
                }`}>
                  Login
                </Link>
                <Link to="/signup" className="btn-luxury !py-2.5 !px-6 !text-[0.7rem]">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* ── Hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 transition-colors ${solid ? 'text-[#0a192f]' : 'text-white'}`}
          >
            {mobileOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
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
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="px-6 py-6 space-y-1">
              {links.map(link => (
                <Link key={link.path} to={link.path}
                  className="block px-4 py-3.5 text-xs tracking-[2px] uppercase font-semibold text-gray-700 hover:text-[#b8975a] hover:bg-[#b8975a]/5 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 flex gap-3 mt-2">
                {user ? (
                  <button onClick={() => { logout(); navigate('/'); }}
                    className="flex-1 py-3 text-center text-xs tracking-widest uppercase font-semibold text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-all"
                  >Sign Out</button>
                ) : (
                  <>
                    <Link to="/login" className="flex-1 py-3 text-center text-xs tracking-widest uppercase font-semibold text-[#0a192f] border border-[#0a192f] rounded-lg hover:bg-gray-50 transition-all">Login</Link>
                    <Link to="/signup" className="flex-1 py-3 text-center text-xs tracking-widest uppercase font-semibold text-white bg-gradient-to-r from-[#b8975a] to-[#d4b483] rounded-lg">Sign Up</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
