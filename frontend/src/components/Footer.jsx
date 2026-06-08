import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin, FiCheck } from 'react-icons/fi';

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
    /* rgba(255,255,255,0.80) on navy ≈ 10:1 — WCAG AA ✓ */
    <footer style={{ background: 'linear-gradient(to bottom, #0a192f 0%, #061020 100%)', color: 'rgba(255,255,255,0.80)' }} role="contentinfo">

      {/* Top gold rule - elegant fading glow */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(184, 151, 90, 0.1) 10%, rgba(184, 151, 90, 0.6) 50%, rgba(184, 151, 90, 0.1) 90%, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-16">

          {/* Brand — spans 2 cols on lg */}
          <div className="lg:col-span-2 flex flex-col justify-between h-full">
            <div>
              <Link to="/" className="flex items-center gap-3 mb-5 group" aria-label="TravelGo Home">
                <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-12 group-hover:scale-105" 
                     style={{ background: 'rgba(184,151,90,0.15)', border: '1px solid rgba(184,151,90,0.30)', boxShadow: '0 0 15px rgba(184,151,90,0.1)' }}>
                  <span className="font-bold text-sm transition-colors duration-300 group-hover:text-[#d4b483]" style={{ color: '#b8975a' }}>TG</span>
                </div>
                <span className="text-2xl font-light tracking-widest transition-colors duration-300 group-hover:text-white" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff', letterSpacing: '0.15em' }}>
                  TRAVEL<span style={{ color: '#b8975a' }}>GO</span>
                </span>
              </Link>
              
              <p className="text-sm text-white/50 mb-6 max-w-sm leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Crafting bespoke luxury journeys and unforgettable experiences across the globe. Certified standards of excellence.
              </p>

              {/* Social */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                    onMouseEnter={e => { 
                      e.currentTarget.style.background = 'linear-gradient(135deg, #b8975a, #d4b483)'; 
                      e.currentTarget.style.borderColor = '#b8975a'; 
                      e.currentTarget.style.transform = 'translateY(-4px)'; 
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(184,151,90,0.25)';
                    }}
                    onMouseLeave={e => { 
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; 
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; 
                      e.currentTarget.style.transform = 'none'; 
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Icon size={15} color="#fff" />
                  </a>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-col gap-2.5 border-t border-white/5 pt-6">
              <p className="text-[10px] uppercase tracking-[2px] text-white/40 font-bold mb-1">Accreditations</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'IATA Certified', desc: 'Global Travel Standards' },
                  { name: 'ISO 9001:2015', desc: 'Quality Management' },
                  { name: 'Secure Payments', desc: 'SSL Encrypted Checkout' }
                ].map(b => (
                  <div key={b.name} className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all duration-300 hover:bg-white/5"
                    style={{ background: 'rgba(184,151,90,0.06)', border: '1px solid rgba(184,151,90,0.20)', color: '#d4b483' }}>
                    <FiCheck size={12} className="text-[#b8975a] shrink-0" />
                    <div className="flex flex-col text-left">
                      <span className="text-[11px] font-semibold text-white/90 leading-tight">{b.name}</span>
                      <span className="text-[9px] text-white/45 leading-none mt-0.5">{b.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="text-xs font-bold tracking-widest uppercase mb-6 pb-2 font-sans"
              style={{ color: '#b8975a', borderBottom: '1px solid rgba(184,151,90,0.20)', lineHeight: '1.5' }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[['Home','/'],['Packages','/packages'],['Destinations','/destinations'],['Blog','/blog'],['About Us','/about'],['Contact','/contact']].map(([label,path]) => (
                <li key={path}>
                  <Link to={path} className="text-sm transition-all duration-300 inline-block"
                      style={{ color: 'rgba(255,255,255,0.70)' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#d4b483'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.70)'; e.currentTarget.style.transform = 'none'; }}>
                      {label}
                    </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Tour Types */}
          <nav aria-label="Tour categories">
            <h3 className="text-xs font-bold tracking-widest uppercase mb-6 pb-2 font-sans"
              style={{ color: '#b8975a', borderBottom: '1px solid rgba(184,151,90,0.20)', lineHeight: '1.5' }}>
              Tour Types
            </h3>
            <ul className="space-y-3">
              {['International Tours','Domestic Tours','Honeymoon Packages','Family Tours','Group Tours','Adventure Tours'].map(t => (
                <li key={t}>
                  <Link to="/packages" className="text-sm transition-all duration-300 inline-block"
                      style={{ color: 'rgba(255,255,255,0.70)' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#d4b483'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.70)'; e.currentTarget.style.transform = 'none'; }}>
                      {t}
                    </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <address style={{ fontStyle: 'normal' }}>
            <h3 className="text-xs font-bold tracking-widest uppercase mb-6 pb-2 font-sans"
              style={{ color: '#b8975a', borderBottom: '1px solid rgba(184,151,90,0.20)', lineHeight: '1.5' }}>
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm items-start">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(184,151,90,0.1)' }}>
                  <FiMapPin size={11} className="text-[#b8975a]" />
                </div>
                <span className="text-white/70 leading-relaxed">123 Travel Street, Bandra West, Mumbai 400050</span>
              </li>
              <li className="flex gap-3 text-sm items-center">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(184,151,90,0.1)' }}>
                  <FiPhone size={11} className="text-[#b8975a]" />
                </div>
                <a href="tel:+911234567890" className="text-white/70 transition-colors duration-300"
                  onMouseEnter={e => e.currentTarget.style.color = '#d4b483'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.70)'}>
                  +91 12345 67890
                </a>
              </li>
              <li className="flex gap-3 text-sm items-center">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(184,151,90,0.1)' }}>
                  <FiMail size={11} className="text-[#b8975a]" />
                </div>
                <a href="mailto:hello@travelgo.com" className="text-white/70 transition-colors duration-300"
                  onMouseEnter={e => e.currentTarget.style.color = '#d4b483'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.70)'}>
                  hello@travelgo.com
                </a>
              </li>
            </ul>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/50" style={{ fontSize: '0.8125rem' }}>
          <p>© {new Date().getFullYear()} TravelGo Travel Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            {[['Privacy Policy','/privacy'],['Terms & Conditions','/terms'],['FAQ','/faq']].map(([title, link]) => (
              <Link key={title} to={link} className="transition-colors duration-300 hover:text-[#d4b483]">
                {title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
