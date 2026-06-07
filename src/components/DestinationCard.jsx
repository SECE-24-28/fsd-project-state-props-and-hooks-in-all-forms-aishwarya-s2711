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
            className="absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded"
            style={{ background: 'linear-gradient(135deg, #b8975a, #d4b483)' }}
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
        <p className="text-xs font-medium mb-2 flex items-center gap-1.5" style={{ color: '#b8975a' }}>
          <FiMapPin size={11} />{country}
        </p>
        <p className="text-xs line-clamp-2 mb-4" style={{ color: '#555', lineHeight: 1.7 }}>{description}</p>
        <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #f0ede6', marginTop: 'auto' }}>
          <Link to={`/destinations/${id}`} className="text-xs font-bold uppercase tracking-widest transition-colors hover:text-[#0a192f]" style={{ color: '#b8975a' }}>View Details</Link>
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
