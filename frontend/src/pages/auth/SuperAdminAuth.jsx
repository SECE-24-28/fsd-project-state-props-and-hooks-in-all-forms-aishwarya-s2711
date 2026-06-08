import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiShield, FiKey } from 'react-icons/fi';
import { toast } from 'react-toastify';
import SEO from '../../components/SEO';

export default function SuperAdminAuth() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ username: '', password: '', token: '' });
  const from = location.state?.from?.pathname || '/superadmin/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await login(form.username, form.password); // Using email in place of username for demo
      if (res.success) {
        if (res.user.role === 'admin') {
          toast.success('Admin authentication successful');
          navigate(from, { replace: true });
        } else {
          toast.error('Security Violation. Access Denied.');
        }
      } else {
        toast.error('Invalid credentials');
      }
    } catch (err) {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="System Administration | TravelGo" />
      <div className="min-h-screen flex items-center justify-center bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-mono">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <FiShield className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h2 className="text-2xl font-bold text-white tracking-widest uppercase">
              System Admin
            </h2>
            <p className="mt-2 text-sm text-slate-400 uppercase tracking-widest">
              Restricted Access
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-sm p-8 shadow-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2" htmlFor="username">
                  Admin ID
                </label>
                <input
                  id="username" name="username" type="text" required
                  className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-slate-300 focus:outline-none focus:border-slate-600 font-mono text-sm"
                  placeholder="admin@example.com"
                  value={form.username} onChange={e => setForm({ ...form, username: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2" htmlFor="password">
                  Passphrase
                </label>
                <div className="relative">
                  <input
                    id="password" name="password" type="password" required
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-slate-300 focus:outline-none focus:border-slate-600 font-mono text-sm"
                    placeholder="••••••••••••"
                    value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FiKey className="text-slate-600" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2" htmlFor="token">
                  2FA Token
                </label>
                <input
                  id="token" name="token" type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-slate-300 focus:outline-none focus:border-slate-600 font-mono text-sm tracking-widest"
                  placeholder="000-000"
                  value={form.token} onChange={e => setForm({ ...form, token: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-200 text-slate-900 hover:bg-white font-bold py-3 text-sm uppercase tracking-widest transition-colors flex justify-center mt-8 rounded-sm"
              >
                {loading ? 'Authenticating...' : 'Authorize'}
              </button>
            </form>
          </div>
          
          <div className="mt-8 text-center text-xs text-slate-600 uppercase tracking-widest">
            TravelGo Core Systems © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </>
  );
}
