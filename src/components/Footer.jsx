import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const SOCIALS = [
  { Icon: FaFacebook,  href: 'https://facebook.com/travelgo',  label: 'Facebook' },
  { Icon: FaInstagram, href: 'https://instagram.com/travelgo',  label: 'Instagram' },
  { Icon: FaTwitter,   href: 'https://twitter.com/travelgo',    label: 'Twitter' },
  { Icon: FaYoutube,   href: 'https://youtube.com/travelgo',    label: 'YouTube' },
  { Icon: FaLinkedin,  href: 'https://linkedin.com/company/travelgo', label: 'LinkedIn' },
  { Icon: FaWhatsapp,  href: 'https://wa.me/911234567890',     label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0a192f', color: 'rgba(255,255,255,0.55)' }} role="contentinfo">

      {/* Top gold rule */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #b8975a 40%, #d4b483 60%, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-16">

          {/* Brand — spans 2 cols on lg */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5 group" aria-label="TravelGo Home">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(184,151,90,0.15)', border: '1px solid rgba(184,151,90,0.30)' }}>
                <span className="font-bold text-sm" style={{ color: '#b8975a' }}>TG</span>
              </div>
              <span className="text-2xl font-light tracking-widest" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff', letterSpacing: '0.15em' }}>
                TRAVEL<span style={{ color: '#b8975a' }}>GO</span>
              </span>
            </Link>

            <p className="text-sm leading-7 mb-6 max-w-xs">
              Your trusted partner for luxury travel experiences. Crafting unforgettable journeys since 2009 across 80+ destinations worldwide.
            </p>

            {/* Social */}
            <div className="flex flex-wrap gap-2 mb-6">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#b8975a'; e.currentTarget.style.borderColor = '#b8975a'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; e.currentTarget.style.transform = 'none'; }}
                >
                  <Icon size={14} color="#fff" />
                </a>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {['IATA Certified', 'ISO 9001:2015', 'Secure Payments'].map(b => (
                <span key={b} className="text-xs px-3 py-1 rounded-full"
                  style={{ background: 'rgba(184,151,90,0.10)', border: '1px solid rgba(184,151,90,0.25)', color: '#d4b483' }}>
                  ✓ {b}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="text-xs font-bold tracking-widest uppercase mb-5 pb-2"
              style={{ color: '#b8975a', borderBottom: '1px solid rgba(184,151,90,0.20)' }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[['Home','/'],['Packages','/packages'],['Destinations','/destinations'],['Blog','/blog'],['About Us','/about'],['Contact','/contact']].map(([label,path]) => (
                <li key={path}>
                  <Link to={path} className="text-sm transition-all inline-block"
                      style={{ color: 'rgba(255,255,255,0.55)' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#d4b483'; e.currentTarget.style.paddingLeft = '6px'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.paddingLeft = '0'; }}>
                      {label}
                    </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Tour Types */}
          <nav aria-label="Tour categories">
            <h3 className="text-xs font-bold tracking-widest uppercase mb-5 pb-2"
              style={{ color: '#b8975a', borderBottom: '1px solid rgba(184,151,90,0.20)' }}>
              Tour Types
            </h3>
            <ul className="space-y-3">
              {['International Tours','Domestic Tours','Honeymoon Packages','Family Tours','Group Tours','Adventure Tours'].map(t => (
                <li key={t}>
                  <Link to="/packages" className="text-sm transition-all inline-block"
                      style={{ color: 'rgba(255,255,255,0.55)' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#d4b483'; e.currentTarget.style.paddingLeft = '6px'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.paddingLeft = '0'; }}>
                      {t}
                    </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <address style={{ fontStyle: 'normal' }}>
            <h3 className="text-xs font-bold tracking-widest uppercase mb-5 pb-2"
              style={{ color: '#b8975a', borderBottom: '1px solid rgba(184,151,90,0.20)' }}>
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm">
                <FiMapPin style={{ color: '#b8975a', marginTop: 2, flexShrink: 0 }} />
                <span>123 Travel Street, Bandra West, Mumbai 400050</span>
              </li>
              <li className="flex gap-3 text-sm">
                <FiPhone style={{ color: '#b8975a', marginTop: 2, flexShrink: 0 }} />
                <a href="tel:+911234567890" style={{ color: 'rgba(255,255,255,0.55)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#d4b483'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}>
                  +91 12345 67890
                </a>
              </li>
              <li className="flex gap-3 text-sm">
                <FiMail style={{ color: '#b8975a', marginTop: 2, flexShrink: 0 }} />
                <a href="mailto:hello@travelgo.com" style={{ color: 'rgba(255,255,255,0.55)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#d4b483'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}>
                  hello@travelgo.com
                </a>
              </li>
            </ul>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: 'rgba(255,255,255,0.70)' }}>
          <p>© {new Date().getFullYear()} TravelGo Travel Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link to="/terms"   className="transition-colors hover:text-white">Terms &amp; Conditions</Link>
            <Link to="/faq"     className="transition-colors hover:text-white">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
