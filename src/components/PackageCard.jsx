import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiStar, FiClock, FiMapPin, FiUsers } from 'react-icons/fi';
import { HiArrowLongRight } from 'react-icons/hi2';

export default function PackageCard({ pkg, index = 0 }) {
  const discount = pkg.originalPrice ? Math.round((1 - pkg.price / pkg.originalPrice) * 100) : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="luxury-card group h-full"
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden img-hover">
        <img
          src={pkg.image}
          alt={`${pkg.title} — ${pkg.destination}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 overlay-dark opacity-60" />

        {/* Badges */}
        {pkg.badge && (
          <span className="absolute top-4 left-4 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest"
            style={{ background: 'linear-gradient(135deg, #b8975a, #d4b483)' }}>
            {pkg.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-widest">
            -{discount}%
          </span>
        )}

        {/* Bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/60 text-[9px] tracking-[2px] uppercase mb-1">{pkg.type}</p>
              <h3 className="text-white text-lg font-light leading-tight"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {pkg.title}
              </h3>
            </div>
            <div className="flex items-center gap-1 shrink-0 ml-2"
              style={{ color: '#d4b483' }}>
              <FiStar size={11} className="fill-current" />
              <span className="text-xs font-semibold">{pkg.rating}</span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.85)' }}>({pkg.reviews})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="flex items-center gap-4 text-xs mb-4" style={{ color: '#555' }}>
          <span className="flex items-center gap-1.5">
            <FiMapPin size={11} style={{ color: '#b8975a' }} />{pkg.destination}
          </span>
          <span className="flex items-center gap-1.5">
            <FiClock size={11} style={{ color: '#b8975a' }} />{pkg.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <FiUsers size={11} style={{ color: '#b8975a' }} />{pkg.seats} seats
          </span>
        </div>

        {pkg.highlights?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {pkg.highlights.slice(0, 3).map((h, i) => (
              <span key={i} className="text-[10px] px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(184,151,90,0.08)', color: '#b8975a', border: '1px solid rgba(184,151,90,0.20)' }}>
                {h}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #f0ede6', marginTop: 'auto' }}>
          <div>
            <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: '#666' }}>From</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
                ${pkg.price.toLocaleString()}
              </span>
              {pkg.originalPrice && (
                <span className="text-xs line-through" style={{ color: '#bbb' }}>
                  ${pkg.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-[10px]" style={{ color: '#666' }}>per person</p>
          </div>
          <Link
            to={`/packages/${pkg.id}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
            style={{ background: '#0a192f', color: '#fff', letterSpacing: '1px' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#b8975a'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0a192f'; }}
            aria-label={`View details for ${pkg.title}`}
          >
            View <HiArrowLongRight size={14} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
