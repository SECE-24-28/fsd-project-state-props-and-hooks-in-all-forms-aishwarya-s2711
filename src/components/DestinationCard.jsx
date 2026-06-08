import { Link } from 'react-router-dom';
import { FiMapPin, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

/**
 * DestinationCard – displays a travel destination with image, title, country, category, and description.
 * Props:
 *   destination: object containing id, name, country, category, image, description.
 */
export default function DestinationCard({ destination }) {
  const { id, name, country, category, image, description } = destination;
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="luxury-card group h-full"
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden img-hover">
        <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 overlay-dark opacity-50" />
        {category && (
          <span
            className="absolute top-3 left-3 text-[0.6875rem] font-bold tracking-widest uppercase px-2.5 py-1.5 rounded"
            style={{ background: 'linear-gradient(135deg, #b8975a, #d4b483)', color: '#0a192f' }}
          >
            {category}
          </span>
        )}
        {/* Favorite button */}
        <button
          className="absolute top-3 right-3 text-white hover:text-[#b8975a] transition-colors"
          aria-label="Add to favorites"
        >
          <FiHeart size={18} />
        </button>
      </div>
      {/* Content */}
      <div className="p-5" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 className="text-xl font-light mb-1" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>{name}</h3>
        <p className="text-[0.8125rem] font-bold tracking-wider uppercase mb-2 flex items-center gap-1.5" style={{ color: '#8f6c31' }}>
          <FiMapPin size={12} />{country}
        </p>
        <p className="text-[0.9375rem] line-clamp-2 mb-4" style={{ color: 'var(--text-mid)', lineHeight: 1.65 }}>{description}</p>
        <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #f0ede6', marginTop: 'auto' }}>
          <Link to={`/destinations/${id}`} className="text-[0.8125rem] font-bold uppercase tracking-widest transition-colors hover:text-[#b8975a]" style={{ color: '#0a192f' }}>View Details</Link>
          <Link
            to={`/destinations/${id}`}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{ background: '#0a192f', color: '#fff' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#b8975a'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0a192f'; }}
            aria-label={`View ${name} details`}
          >
            <FiMapPin size={13} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
