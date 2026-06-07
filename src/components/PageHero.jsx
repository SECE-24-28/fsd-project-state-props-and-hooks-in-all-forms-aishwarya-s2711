import { motion } from 'framer-motion';

export default function PageHero({ badge, title, subtitle, image }) {
  const bg = image || 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1400&q=60';
  return (
    <section className="relative pt-32 pb-20 overflow-hidden" aria-label={`${title} hero`}>
      {/* Background */}
      <img
        src={bg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ animation: 'kenBurns 14s ease-in-out infinite alternate' }}
      />
      {/* Overlays */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,25,47,0.95) 0%, rgba(10,25,47,0.82) 60%, rgba(10,25,47,0.68) 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to top, #ffffff, transparent)' }} />

      {/* Decorative gold line */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #b8975a, transparent)' }} />

      <div className="relative max-w-4xl mx-auto px-6 text-center" style={{ zIndex: 1 }}>
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-5"
          >
            <span className="section-badge" style={{ color: '#d4b483', borderColor: 'rgba(212,180,131,0.35)', background: 'rgba(212,180,131,0.10)' }}>
              {badge}
            </span>
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl lg:text-7xl font-light text-white mb-5"
          style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '-0.02em' }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg font-light max-w-xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.92)' }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
