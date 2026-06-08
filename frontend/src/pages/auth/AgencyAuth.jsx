import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiBriefcase, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';
import SEO from '../../components/SEO';

export default function AgencyAuth() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const from = location.state?.from?.pathname || '/agency/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real app, the backend would verify the user is an agent.
      // For this demo, we'll assume any successful login here routes to agency dash if role allows.
      const res = await login(form.email, form.password);
      if (res.success) {
        if (res.user.role === 'agent' || res.user.role === 'admin') {
          toast.success('Welcome to Agency Portal');
          navigate(from, { replace: true });
        } else {
          toast.error('Unauthorized. Agency account required.');
        }
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Agency Partner Portal | TravelGo" />
      <div className="min-h-screen flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center">
                  <span className="text-sm font-bold">TG</span>
                </div>
                <span className="text-xl font-bold text-slate-900">TravelGo Agency</span>
              </Link>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Partner Portal</h2>
              <p className="mt-2 text-sm text-slate-600">
                Manage your packages, tours, and bookings.
              </p>
            </div>

            <div className="mt-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="form-label" htmlFor="email">Partner Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiBriefcase className="text-slate-400" />
                    </div>
                    <input
                      id="email" name="email" type="email" required
                      className="form-input !pl-10 focus:!border-slate-900 focus:!ring-slate-900/10" placeholder="agency@example.com"
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label" htmlFor="password">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-slate-400" />
                    </div>
                    <input
                      id="password" name="password" type={showPw ? 'text' : 'password'} required
                      className="form-input !pl-10 !pr-10 focus:!border-slate-900 focus:!ring-slate-900/10" placeholder="••••••••"
                      value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                      onClick={() => setShowPw(!showPw)}
                    >
                      {showPw ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-slate-900 focus:ring-slate-900 border-slate-300 rounded" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">Remember me</label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-slate-900 hover:underline">Forgot password?</a>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn bg-slate-900 text-white hover:bg-slate-800 py-2.5 shadow-md flex justify-center"
                >
                  {loading ? 'Authenticating...' : 'Sign in to Partner Portal'}
                </button>
              </form>
              
              <div className="mt-8 text-center text-sm text-slate-500">
                Not a partner yet? <a href="#" className="font-medium text-slate-900 hover:underline">Apply here</a>.
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Brand visual */}
        <div className="hidden lg:block relative w-0 flex-1 bg-slate-50 border-l border-slate-200">
          <div className="absolute inset-0 flex flex-col justify-center px-20">
            <h3 className="text-4xl font-bold text-slate-900 mb-6">Grow your travel business with TravelGo.</h3>
            <p className="text-lg text-slate-600 mb-10 max-w-lg">
              Get access to thousands of travelers, manage your bookings seamlessly, and grow your revenue with our modern platform.
            </p>
            <div className="grid grid-cols-2 gap-6 max-w-lg">
              <div className="p-4 modern-card">
                <div className="text-2xl font-bold text-slate-900 mb-1">10k+</div>
                <div className="text-sm text-slate-500">Active Travelers</div>
              </div>
              <div className="p-4 modern-card">
                <div className="text-2xl font-bold text-slate-900 mb-1">2.5x</div>
                <div className="text-sm text-slate-500">Average Revenue Growth</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
