import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../../components/SEO';

export default function UserAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const res = await login(form.email, form.password);
        if (res.success) {
          toast.success('Welcome back to your journey!');
          if (res.user?.role === 'admin') navigate('/superadmin/dashboard', { replace: true });
          else if (res.user?.role === 'agent') navigate('/agency/dashboard', { replace: true });
          else navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
        } else {
          toast.error(res.message || 'Login failed. Please check your credentials.');
        }
      } else {
        const res = await signup({ ...form });
        if (res.success) {
          toast.success('Account created successfully!');
          if (form.role === 'admin') navigate('/superadmin/dashboard', { replace: true });
          else if (form.role === 'agent') navigate('/agency/dashboard', { replace: true });
          else navigate('/dashboard', { replace: true });
        } else {
          toast.error(res.message || 'Sign up failed.');
        }
      }
    } catch {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title={isLogin ? 'Log in | TravelGo' : 'Sign up | TravelGo'} />
      <div className="min-h-screen flex bg-white dark:bg-slate-950 font-sans">
        
        {/* LEFT SIDE: Scenic Brand Cover (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 select-none">
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 12, ease: 'easeOut' }}
            src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=1400&q=80"
            alt="Hot air balloons in Cappadocia"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Rich luxury overlay with deep navy & gold tones */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/60 to-transparent" />
          
          <div className="relative z-10 flex flex-col justify-between p-16 w-full h-full text-white">
            <Link to="/" className="inline-flex items-center gap-2 group self-start">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/35 transition-transform group-hover:scale-105">
                <span className="text-lg font-bold tracking-wider">TG</span>
              </div>
              <span className="text-xl font-bold tracking-wide text-white">TravelGo</span>
            </Link>

            <div className="space-y-6 max-w-md">
              <span className="text-xs uppercase tracking-widest text-blue-400 font-bold bg-blue-500/10 px-3 py-1 rounded-full border border-blue-400/20 w-fit block">
                Exclusive Escapes
              </span>
              <h1 className="text-5xl font-light leading-tight text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Your Passport to <br />
                <span className="font-semibold text-blue-300">Extraordinary</span> Journeys
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Explore hand-picked boutique hotels, personalized itineraries, and 5-star experiences across 80+ global destinations.
              </p>
            </div>

            <div className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
              © {new Date().getFullYear()} TravelGo Luxury Services.
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Auth Form Container */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 bg-slate-50 dark:bg-slate-900/40 relative">
          
          {/* Back to Home button */}
          <Link to="/" className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
            <FiArrowLeft size={14} /> Back to home
          </Link>

          <div className="w-full max-w-md">
            
            {/* Header tab selectors */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {isLogin ? 'Welcome Back' : 'Join TravelGo'}
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {isLogin ? 'New to our platform?' : 'Already registered?'}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors focus:outline-none"
                >
                  {isLogin ? 'Create an account' : 'Sign in here'}
                </button>
              </p>
            </div>

            {/* Glassmorphic/Modern form container */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-100 dark:shadow-none">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? 'login' : 'signup'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    
                    {/* Full Name input (for signup only) */}
                    {!isLogin && (
                      <>
                        <div>
                          <label className="form-label text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider" htmlFor="name">Full Name</label>
                          <div className="relative mt-1.5">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                              <FiUser size={16} />
                            </div>
                            <input
                              id="name" name="name" type="text" required
                              className="form-input !pl-11" placeholder="John Doe"
                              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="form-label text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-2 block">Account Type</label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" name="role" value="user" checked={form.role === 'user'} onChange={e => setForm({ ...form, role: e.target.value })} className="text-blue-600 focus:ring-blue-500 w-4 h-4" />
                              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Traveler</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" name="role" value="admin" checked={form.role === 'admin'} onChange={e => setForm({ ...form, role: e.target.value })} className="text-blue-600 focus:ring-blue-500 w-4 h-4" />
                              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Admin</span>
                            </label>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Email address */}
                    <div>
                      <label className="form-label text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider" htmlFor="email">Email address</label>
                      <div className="relative mt-1.5">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <FiMail size={16} />
                        </div>
                        <input
                          id="email" name="email" type="email" autoComplete="email" required
                          className="form-input !pl-11" placeholder="you@example.com"
                          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <div className="flex justify-between items-center">
                        <label className="form-label text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider" htmlFor="password">Password</label>
                        {isLogin && (
                          <Link to="/forgot-password" className="text-xs font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors">
                            Forgot password?
                          </Link>
                        )}
                      </div>
                      <div className="relative mt-1.5">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <FiLock size={16} />
                        </div>
                        <input
                          id="password" name="password" type={showPw ? 'text' : 'password'} required
                          className="form-input !pl-11 !pr-10" placeholder="••••••••"
                          value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                          onClick={() => setShowPw(!showPw)}
                        >
                          {showPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* Remember me (for login only) */}
                    {isLogin && (
                      <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer" />
                        <label htmlFor="remember-me" className="ml-2 block text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer select-none">Remember my login</label>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn btn-primary bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 text-white font-bold py-3 rounded-xl shadow-md transition-all flex justify-center text-xs uppercase tracking-widest mt-2"
                    >
                      {loading ? 'Processing Authentications...' : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>
                  </form>
                </motion.div>
              </AnimatePresence>



            </div>

          </div>
        </div>

      </div>
    </>
  );
}
