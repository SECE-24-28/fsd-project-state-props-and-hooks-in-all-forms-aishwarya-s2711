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
const Destinations   = lazy(() => import('../pages/Destinations.jsx'));
const DestinationDetail = lazy(() => import('../pages/DestinationDetail.jsx'));

// Auth Pages
const UserAuth         = lazy(() => import('../pages/auth/UserAuth'));
const AgencyAuth       = lazy(() => import('../pages/auth/AgencyAuth'));
const SuperAdminAuth   = lazy(() => import('../pages/auth/SuperAdminAuth'));

// Dashboard Pages
const UserDashboard       = lazy(() => import('../pages/UserDashboard'));
const AgencyDashboard     = lazy(() => import('../pages/dashboards/AgencyDashboard'));
const AdminDashboard      = lazy(() => import('../pages/admin/AdminDashboard'));

const FAQ            = lazy(() => import('../pages/FAQ'));
const Privacy        = lazy(() => import('../pages/Privacy'));
const Terms          = lazy(() => import('../pages/Terms'));
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
        background: '#f8fafc',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 40, height: 40,
          border: '2px solid #4f46e5',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          margin: '0 auto 12px',
          animation: 'tg-spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes tg-spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: '#4f46e5', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
          Loading
        </p>
      </div>
    </div>
  );
}

// ── Route wrapper: Suspense + ErrorBoundary per route ────────────────────────
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

// ── Profile Redirect component ────────────────────────────────────────────────
function ProfileRedirect() {
  const { user } = useAuth();
  if (user?.role === 'admin') {
    return <Navigate to="/superadmin/dashboard/settings" replace />;
  } else if (user?.role === 'agent') {
    return <Navigate to="/agency/dashboard" replace />;
  } else {
    return <Navigate to="/dashboard/profile" replace />;
  }
}

// ── Routes ────────────────────────────────────────────────────────────────────
export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/"                element={<SafeRoute><Home /></SafeRoute>} />
      <Route path="/packages"        element={<SafeRoute><Packages /></SafeRoute>} />
      <Route path="/packages/:id"    element={<SafeRoute><PackageDetail /></SafeRoute>} />
      <Route path="/destinations"    element={<SafeRoute><Destinations /></SafeRoute>} />
      <Route path="/destinations/:id" element={<SafeRoute><DestinationDetail /></SafeRoute>} />
      <Route path="/blog"            element={<SafeRoute><Blog /></SafeRoute>} />
      <Route path="/blog/:id"        element={<SafeRoute><BlogDetail /></SafeRoute>} />
      <Route path="/about"           element={<SafeRoute><About /></SafeRoute>} />
      <Route path="/contact"         element={<SafeRoute><Contact /></SafeRoute>} />
      <Route path="/faq"             element={<SafeRoute><FAQ /></SafeRoute>} />
      <Route path="/privacy"         element={<SafeRoute><Privacy /></SafeRoute>} />
      <Route path="/terms"           element={<SafeRoute><Terms /></SafeRoute>} />

      {/* Auth Pages */}
      <Route path="/login"               element={<SafeRoute><UserAuth /></SafeRoute>} />
      <Route path="/signup"              element={<SafeRoute><UserAuth /></SafeRoute>} />
      <Route path="/forgot-password"     element={<SafeRoute><UserAuth /></SafeRoute>} />
      <Route path="/agency/login"        element={<SafeRoute><AgencyAuth /></SafeRoute>} />
      <Route path="/superadmin/login"    element={<SafeRoute><SuperAdminAuth /></SafeRoute>} />

      {/* Dashboards */}
      <Route path="/dashboard/*"           element={<SafeRoute><Protected><UserDashboard /></Protected></SafeRoute>} />
      <Route path="/agency/dashboard/*"  element={<SafeRoute><Protected roles={['agent', 'admin']}><AgencyDashboard /></Protected></SafeRoute>} />
      <Route path="/superadmin/dashboard/*" element={<SafeRoute><Protected roles={['admin']}><AdminDashboard /></Protected></SafeRoute>} />
      <Route path="/profile"               element={<SafeRoute><Protected><ProfileRedirect /></Protected></SafeRoute>} />

      {/* Fallbacks */}
      <Route path="/admin/*"             element={<Navigate to="/superadmin/dashboard" replace />} />
      <Route path="/404"                 element={<SafeRoute><NotFound /></SafeRoute>} />
      <Route path="*"                    element={<SafeRoute><NotFound /></SafeRoute>} />
    </Routes>
  );
}
