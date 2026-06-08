import { motion } from 'framer-motion';

export default function PageHero({ badge, title, subtitle, image }) {
  const bg = image || 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1400&q=60';
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: 'clamp(140px, 16vw, 200px)',
        paddingBottom: 'clamp(80px, 10vw, 120px)',
      }}
      aria-label={`${title} hero`}
    >
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/75" />
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
          className="text-5xl lg:text-7xl font-bold mb-5 tracking-wide"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            background: 'linear-gradient(to bottom, #ffffff 30%, #f7ebd3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.65))'
          }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl font-medium max-w-2xl mx-auto"
            style={{
              color: '#f4ede2',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))',
              letterSpacing: '0.02em'
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
