import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiPhone } from 'react-icons/fi';
import { FaGoogle, FaApple } from 'react-icons/fa';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';

const HERO_IMG = 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&q=80';

function SocialButton({ Icon, label, onClick }) {
  return (
    <button type="button" onClick={onClick}
      className="flex items-center justify-center gap-3 w-full py-3 rounded-xl text-sm font-semibold transition-all"
      style={{ border: '1.5px solid #e8e4dc', background: '#fff', color: '#0a192f' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#b8975a'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(184,151,90,0.15)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e4dc'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <Icon size={17} /> {label}
    </button>
  );
}

/* ─── Login ─────────────────────────────────────────────── */
export function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: '' })); };

  const validate = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (form.password.length < 6) e.password = 'Minimum 6 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    const result = await login(form.email, form.password);
    setLoading(false);
    if (result.success) {
      toast.success(`Welcome back, ${result.user.name}! ✈️`);
      navigate(result.user.role === 'admin' || result.user.role === 'agent' ? '/admin' : '/');
    } else {
      toast.error(result.message || 'Login failed');
    }
  };

  return (
    <>
      <SEO title="Sign In" description="Sign in to your TravelGo account to manage bookings and access exclusive travel deals." canonical="/login" />
      <div className="min-h-screen flex" style={{ background: '#f8f6f2', paddingTop: '60px' }}>

        {/* Left panel */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <img src={HERO_IMG} alt="Santorini luxury travel" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,25,47,0.85), rgba(10,25,47,0.50))' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-12 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
              style={{ background: 'rgba(184,151,90,0.15)', border: '1px solid rgba(184,151,90,0.35)' }}>
              <span className="text-lg font-bold" style={{ color: '#b8975a' }}>TG</span>
            </div>
            <h2 className="text-5xl font-light mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Your Journey<br />Begins Here
            </h2>
            <p className="text-sm mb-10" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.9 }}>
              Join 50,000+ travelers who trust TravelGo for their luxury getaways.
            </p>
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              {[['500+', 'Packages'], ['80+', 'Destinations'], ['50K+', 'Travelers'], ['15+', 'Years']].map(([v, l]) => (
                <div key={l} className="rounded-xl p-4 text-center"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <div className="text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#d4b483' }}>{v}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.60)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">

            <h1 className="text-4xl font-light mb-1" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
              Welcome Back
            </h1>
            <p className="text-sm mb-8" style={{ color: '#888' }}>Sign in to continue your journey</p>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <SocialButton Icon={FaGoogle} label="Google"
                onClick={() => toast.info('Google login coming soon')} />
              <SocialButton Icon={FaApple} label="Apple"
                onClick={() => toast.info('Apple login coming soon')} />
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px" style={{ background: '#e8e4dc' }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#aaa' }}>or continue with email</span>
              <div className="flex-1 h-px" style={{ background: '#e8e4dc' }} />
            </div>

            <form onSubmit={handleSubmit} noValidate aria-label="Login form" className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-xs font-semibold mb-1.5" style={{ color: '#0a192f' }}>
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#aaa' }} />
                  <input id="login-email" type="email" value={form.email} onChange={e => set('email', e.target.value)}
                    className="auth-input" placeholder="your@email.com"
                    style={errors.email ? { borderColor: '#ef4444' } : {}}
                    aria-describedby={errors.email ? 'le-err' : undefined} />
                </div>
                {errors.email && <p id="le-err" role="alert" className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="login-pass" className="block text-xs font-semibold mb-1.5" style={{ color: '#0a192f' }}>
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#aaa' }} />
                  <input id="login-pass" type={showPass ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)}
                    className="auth-input pr-12" placeholder="Enter your password"
                    style={errors.password ? { borderColor: '#ef4444' } : {}}
                    aria-describedby={errors.password ? 'lp-err' : undefined} />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa' }}>
                    {showPass ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && <p id="lp-err" role="alert" className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: '#4a4a4a' }}>
                  <input type="checkbox" className="w-4 h-4" style={{ accentColor: '#b8975a' }} /> Remember me
                </label>
                <Link to="/forgot-password" className="text-sm font-semibold" style={{ color: '#b8975a' }}>
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5"
                style={{ width: '100%', fontSize: '0.9rem' }}>
                {loading ? 'Signing in...' : 'Sign In →'}
              </button>
            </form>

            {/* Demo accounts */}
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-px" style={{ background: '#e8e4dc' }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#aaa' }}>Demo Accounts</span>
                <div className="flex-1 h-px" style={{ background: '#e8e4dc' }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[{ label: '🛡️ Admin', email: 'admin@travelgo.com', password: 'admin123' },
                  { label: '🧳 Agent', email: 'agent@travelgo.com', password: 'agent123' }].map(acc => (
                  <button key={acc.email} type="button"
                    onClick={() => setForm({ email: acc.email, password: acc.password })}
                    className="flex flex-col items-center p-3 rounded-xl text-sm transition-all"
                    style={{ border: '1.5px solid #e8e4dc', background: '#fff' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#b8975a'; e.currentTarget.style.background = 'rgba(184,151,90,0.04)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e4dc'; e.currentTarget.style.background = '#fff'; }}>
                    <span className="font-semibold" style={{ color: '#0a192f' }}>{acc.label}</span>
                    <span className="text-xs mt-0.5" style={{ color: '#aaa' }}>Click to fill</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="text-center text-sm mt-6" style={{ color: '#888' }}>
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold" style={{ color: '#b8975a' }}>Sign Up</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

/* ─── Signup ─────────────────────────────────────────────── */
export function Signup() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '', role: 'user' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { signup } = useAuth();
  const navigate = useNavigate();

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: '' })); };

  const getStrength = (p) => {
    if (!p) return null;
    if (p.length < 6) return { color: '#ef4444', text: 'Weak', w: '33%' };
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(p)) return { color: '#10b981', text: 'Strong', w: '100%' };
    return { color: '#f59e0b', text: 'Medium', w: '66%' };
  };
  const strength = getStrength(form.password);

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = 'Full name required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!/^\+?[\d\s-]{10,}$/.test(form.phone)) e.phone = 'Valid phone required';
    if (form.password.length < 6) e.password = 'Minimum 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    const result = await signup(form);
    setLoading(false);
    if (result.success) { toast.success('Welcome to TravelGo! 🎉'); navigate('/'); }
    else toast.error(result.message || 'Signup failed');
  };

  return (
    <>
      <SEO title="Create Account" description="Join TravelGo and unlock exclusive luxury travel deals, personalized packages, and concierge support." canonical="/signup" />
      <div className="min-h-screen flex" style={{ background: '#f8f6f2', paddingTop: '60px' }}>

        <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=900&q=80" alt="Maldives luxury travel" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,25,47,0.85), rgba(10,25,47,0.45))' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-10 text-center">
            <div className="text-6xl mb-5">✈️</div>
            <h2 className="text-4xl font-light mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Start Your Adventure</h2>
            <p className="text-sm max-w-xs" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.9 }}>
              Create your account and unlock exclusive travel deals, personalized packages and concierge support.
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md py-8">

            <h1 className="text-4xl font-light mb-1" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>Create Account</h1>
            <p className="text-sm mb-6" style={{ color: '#888' }}>Join thousands of happy travelers</p>

            {/* Social */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <SocialButton Icon={FaGoogle} label="Google" onClick={() => toast.info('Google signup coming soon')} />
              <SocialButton Icon={FaApple}  label="Apple"  onClick={() => toast.info('Apple signup coming soon')} />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px" style={{ background: '#e8e4dc' }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#aaa' }}>or with email</span>
              <div className="flex-1 h-px" style={{ background: '#e8e4dc' }} />
            </div>

            {/* Role */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[{ value: 'user', label: '👤 Traveler', desc: 'Browse & book tours' },
                { value: 'agent', label: '🧳 Travel Agent', desc: 'Manage & sell tours' }].map(r => (
                <button key={r.value} type="button" onClick={() => set('role', r.value)}
                  className="p-4 rounded-xl text-left transition-all"
                  style={{
                    border: `2px solid ${form.role === r.value ? '#b8975a' : '#e8e4dc'}`,
                    background: form.role === r.value ? 'rgba(184,151,90,0.06)' : '#fff',
                  }}>
                  <div className="font-semibold text-sm mb-0.5" style={{ color: '#0a192f' }}>{r.label}</div>
                  <div className="text-xs" style={{ color: '#aaa' }}>{r.desc}</div>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} noValidate aria-label="Signup form" className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="su-name" className="block text-xs font-semibold mb-1.5" style={{ color: '#0a192f' }}>Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#aaa' }} />
                  <input id="su-name" value={form.name} onChange={e => set('name', e.target.value)}
                    className="auth-input" placeholder="Your full name"
                    style={errors.name ? { borderColor: '#ef4444' } : {}} />
                </div>
                {errors.name && <p role="alert" className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.name}</p>}
              </div>
              {/* Email */}
              <div>
                <label htmlFor="su-email" className="block text-xs font-semibold mb-1.5" style={{ color: '#0a192f' }}>Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#aaa' }} />
                  <input id="su-email" type="email" value={form.email} onChange={e => set('email', e.target.value)}
                    className="auth-input" placeholder="your@email.com"
                    style={errors.email ? { borderColor: '#ef4444' } : {}} />
                </div>
                {errors.email && <p role="alert" className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.email}</p>}
              </div>
              {/* Phone */}
              <div>
                <label htmlFor="su-phone" className="block text-xs font-semibold mb-1.5" style={{ color: '#0a192f' }}>Mobile Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#aaa' }} />
                  <input id="su-phone" value={form.phone} onChange={e => set('phone', e.target.value)}
                    className="auth-input" placeholder="+91 XXXXX XXXXX"
                    style={errors.phone ? { borderColor: '#ef4444' } : {}} />
                </div>
                {errors.phone && <p role="alert" className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.phone}</p>}
              </div>
              {/* Password */}
              <div>
                <label htmlFor="su-pass" className="block text-xs font-semibold mb-1.5" style={{ color: '#0a192f' }}>Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#aaa' }} />
                  <input id="su-pass" type={showPass ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)}
                    className="auth-input pr-12" placeholder="Create a strong password"
                    style={errors.password ? { borderColor: '#ef4444' } : {}} />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa' }}>
                    {showPass ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {form.password && strength && (
                  <div className="mt-2">
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e8e4dc' }}>
                      <div className="h-full rounded-full transition-all" style={{ width: strength.w, background: strength.color }} />
                    </div>
                    <p className="text-xs mt-1" style={{ color: strength.color }}>{strength.text} password</p>
                  </div>
                )}
                {errors.password && <p role="alert" className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.password}</p>}
              </div>
              {/* Confirm */}
              <div>
                <label htmlFor="su-confirm" className="block text-xs font-semibold mb-1.5" style={{ color: '#0a192f' }}>Confirm Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#aaa' }} />
                  <input id="su-confirm" type="password" value={form.confirm} onChange={e => set('confirm', e.target.value)}
                    className="auth-input" placeholder="Confirm your password"
                    style={errors.confirm ? { borderColor: '#ef4444' } : {}} />
                </div>
                {errors.confirm && <p role="alert" className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.confirm}</p>}
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5"
                style={{ width: '100%', fontSize: '0.9rem' }}>
                {loading ? 'Creating Account...' : 'Create Account 🚀'}
              </button>
            </form>

            <p className="text-center text-sm mt-6" style={{ color: '#888' }}>
              Already have an account?{' '}
              <Link to="/login" className="font-semibold" style={{ color: '#b8975a' }}>Sign In</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

/* ─── Forgot Password ─────────────────────────────────────── */
export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  return (
    <>
      <SEO title="Forgot Password" description="Reset your TravelGo account password. Enter your email and we'll send you a secure reset link." canonical="/forgot-password" />
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a192f, #112a4a)', paddingTop: '60px' }}>
        <img src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=20"
          alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.07 }} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-3xl p-8 relative z-10"
          style={{ background: '#fff', boxShadow: '0 32px 80px rgba(0,0,0,0.25)' }}>

          {sent ? (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">📧</div>
              <h2 className="text-3xl font-light mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>Check Your Email</h2>
              <p className="text-sm mb-6" style={{ color: '#888' }}>
                We've sent a reset link to <strong style={{ color: '#0a192f' }}>{email}</strong>
              </p>
              <button onClick={() => setSent(false)} className="btn-outline">Try Again</button>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-light mb-1 text-center" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>Forgot Password?</h2>
              <p className="text-sm text-center mb-6" style={{ color: '#888' }}>We'll send a reset link to your email</p>
              <div className="relative mb-3">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#aaa' }} />
                <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }}
                  className="auth-input" placeholder="your@email.com"
                  aria-label="Email address"
                  style={error ? { borderColor: '#ef4444' } : {}} />
              </div>
              {error && <p role="alert" className="text-xs mb-3" style={{ color: '#ef4444' }}>{error}</p>}
              <button onClick={() => {
                if (!email.includes('@')) { setError('Valid email required'); return; }
                setSent(true);
                toast.success('Reset link sent! Check your inbox.');
              }} className="btn-primary w-full justify-center py-3.5 mb-4"
                style={{ width: '100%' }}>
                Send Reset Link 📧
              </button>
            </>
          )}

          <p className="text-center text-sm mt-2" style={{ color: '#888' }}>
            <Link to="/login" className="font-semibold" style={{ color: '#b8975a' }}>← Back to Login</Link>
          </p>
        </motion.div>
      </div>
    </>
  );
}
