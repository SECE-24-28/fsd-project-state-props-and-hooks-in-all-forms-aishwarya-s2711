import { useEffect, useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/ErrorBoundary';
import { FiArrowUp } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

// ── Global error listeners — catch unhandled errors before React sees them ────
if (typeof window !== 'undefined') {
  window.addEventListener('error', (e) => {
    // Only log — never redirect or crash the page
    console.error('[Global Error]', e.message, e.filename, e.lineno);
  });

  window.addEventListener('unhandledrejection', (e) => {
    // Prevent unhandled promise rejections from showing as uncaught errors
    console.error('[Unhandled Promise Rejection]', e.reason);
    // Don't call e.preventDefault() — let the browser still surface it in DevTools
  });
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  const [showScroll, setShowScroll] = useState(false);

  const isAuthPage  = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password';
  const isAdminPage = pathname.startsWith('/admin');

  useEffect(() => {
    const fn = () => setShowScroll(window.scrollY > 400);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      {/* Accessibility skip link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <ScrollToTop />

      {/* Navbar — not on admin pages, not on auth pages */}
      {!isAdminPage && !isAuthPage && (
        <ErrorBoundary fallback={null}>
          <Navbar />
        </ErrorBoundary>
      )}

      {/* Logo on auth pages */}
      {isAuthPage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <a href="/" className="flex items-center gap-2" aria-label="TravelGo Home">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#0a192f' }}>
              <span className="text-white text-xs font-bold tracking-widest">TG</span>
            </div>
            <span className="text-sm tracking-[0.15em] font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
              TRAVEL<span style={{ color: '#b8975a' }}>GO</span>
            </span>
          </a>
        </div>
      )}

      {/* Main content — routes */}
      <main id="main-content">
        <AppRoutes />
      </main>

      {/* WhatsApp float */}
      {!isAdminPage && (
        <a
          href="https://wa.me/911234567890?text=Hi%20TravelGo!%20I'd%20like%20to%20plan%20a%20trip."
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label="Chat with us on WhatsApp"
        >
          <FaWhatsapp size={24} color="#fff" />
        </a>
      )}

      {/* Scroll to top */}
      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all z-50"
          style={{ background: 'linear-gradient(135deg, #b8975a, #d4b483)' }}
          aria-label="Scroll to top"
        >
          <FiArrowUp size={20} />
        </button>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        toastStyle={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}
      />
    </>
  );
}

export default function App() {
  return (
    // Top-level ErrorBoundary — last resort, prevents full blank screen
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
