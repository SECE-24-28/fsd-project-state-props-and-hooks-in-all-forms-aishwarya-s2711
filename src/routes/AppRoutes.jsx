import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RouteErrorBoundary } from '../components/ErrorBoundary';

// ── Lazy-loaded pages ─────────────────────────────────────────────────────────
const Home           = lazy(() => import('../pages/Home'));
const Packages       = lazy(() => import('../pages/Packages'));
const PackageDetail  = lazy(() => import('../pages/PackageDetail'));
const Blog           = lazy(() => import('../pages/Blog').then(m => ({ default: m.BlogList })));
const BlogDetail     = lazy(() => import('../pages/Blog').then(m => ({ default: m.BlogDetail })));
const About          = lazy(() => import('../pages/About'));
const Contact        = lazy(() => import('../pages/Contact'));
const Auth           = lazy(() => import('../pages/Auth').then(m => ({ default: m.Login })));
const Signup         = lazy(() => import('../pages/Auth').then(m => ({ default: m.Signup })));
const Destinations   = lazy(() => import('../pages/Destinations.jsx'));
const ForgotPw       = lazy(() => import('../pages/Auth').then(m => ({ default: m.ForgotPassword })));
const UserDashboard  = lazy(() => import('../pages/UserDashboard'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'));
const FAQ            = lazy(() => import('../pages/FAQ'));
const Privacy        = lazy(() => import('../pages/Privacy'));
const Terms          = lazy(() => import('../pages/Terms'));
const MyProfile      = lazy(() => import('../pages/MyProfile'));
const MyBookings     = lazy(() => import('../pages/MyBookings'));
const NotFound       = lazy(() => import('../pages/NotFound'));

// ── Suspense fallback ─────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8f6f2',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 40, height: 40,
          border: '2px solid #b8975a',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          margin: '0 auto 12px',
          animation: 'tg-spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes tg-spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: '#b8975a', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif' }}>
          Loading
        </p>
      </div>
    </div>
  );
}

// ── Route wrapper: Suspense + ErrorBoundary per route ────────────────────────
// This ensures a crash in ONE page never affects other pages or the shell.
function SafeRoute({ children }) {
  return (
    <RouteErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
    </RouteErrorBoundary>
  );
}

// ── Auth guard ────────────────────────────────────────────────────────────────
function Protected({ children, roles }) {
  const { user, isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user?.role)) return <Navigate to="/" replace />;
  return children;
}

// ── Routes ────────────────────────────────────────────────────────────────────
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/"                element={<SafeRoute><Home /></SafeRoute>} />
      <Route path="/packages"        element={<SafeRoute><Packages /></SafeRoute>} />
      <Route path="/packages/:id"    element={<SafeRoute><PackageDetail /></SafeRoute>} />
      <Route path="/destinations"    element={<SafeRoute><Destinations /></SafeRoute>} />
      <Route path="/blog"            element={<SafeRoute><Blog /></SafeRoute>} />
      <Route path="/blog/:id"        element={<SafeRoute><BlogDetail /></SafeRoute>} />
      <Route path="/about"           element={<SafeRoute><About /></SafeRoute>} />
      <Route path="/contact"         element={<SafeRoute><Contact /></SafeRoute>} />
      <Route path="/faq"             element={<SafeRoute><FAQ /></SafeRoute>} />
      <Route path="/privacy"         element={<SafeRoute><Privacy /></SafeRoute>} />
      <Route path="/terms"           element={<SafeRoute><Terms /></SafeRoute>} />
      <Route path="/profile"         element={<SafeRoute><Protected><MyProfile /></Protected></SafeRoute>} />
      <Route path="/bookings"        element={<SafeRoute><Protected><MyBookings /></Protected></SafeRoute>} />
      <Route path="/login"           element={<SafeRoute><Auth /></SafeRoute>} />
      <Route path="/signup"          element={<SafeRoute><Signup /></SafeRoute>} />
      <Route path="/forgot-password" element={<SafeRoute><ForgotPw /></SafeRoute>} />
      <Route path="/dashboard"       element={<SafeRoute><Protected><UserDashboard /></Protected></SafeRoute>} />
      <Route path="/admin/*"         element={<SafeRoute><Protected roles={['admin','agent']}><AdminDashboard /></Protected></SafeRoute>} />
      <Route path="/404"             element={<SafeRoute><NotFound /></SafeRoute>} />
      <Route path="*"                element={<SafeRoute><NotFound /></SafeRoute>} />
    </Routes>
  );
}
