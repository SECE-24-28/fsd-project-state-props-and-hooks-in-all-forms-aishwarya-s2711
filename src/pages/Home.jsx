import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const CountUpComponent = typeof CountUp === 'function' ? CountUp : (CountUp.default || CountUp);
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { FiSearch, FiCalendar, FiUsers, FiArrowUpRight, FiMapPin, FiStar, FiPlay } from 'react-icons/fi';
import { HiArrowLongRight } from 'react-icons/hi2';
import VideoModal from '../components/VideoModal';
// Hook moved inside Home component
import { packages, reviews, galleryImages } from '../data/dummyData';

/* ── Hero slides ── */
const heroSlides = [
  {
    img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1600&q=90',
    label: 'MALDIVES',
    title: 'Where Heaven\nMeets the Sea',
    sub: 'Overwater villas · Crystal lagoons · Endless serenity',
  },
  {
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=90',
    label: 'BALI',
    title: 'Soul of the\nEast Awaits',
    sub: 'Ancient temples · Rice terraces · Jungle retreats',
  },
  {
    img: 'https://www.easysim.global/img/85f83345-accc-470b-b829-3545e60c0961/greece-santorini-thumb.webp?fm=webp&q=90&auto=compress%2Cformat&fit=min&crop=800%2C450%2C0%2C83',
    label: 'SANTORINI',
    title: 'Dream in\nBlue and White',
    sub: 'Sunset vistas · Volcanic islands · Aegean magic',
  },
  {
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=90',
    label: 'SWISS ALPS',
    title: 'Above the\nClouds You Rise',
    sub: 'Snow peaks · Pristine lakes · Alpine luxury',
  },
];

/* ── Featured destinations ── */
const featDest = [
  { name: 'Santorini',   country: 'Greece',    img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=85', tours: 12 },
  { name: 'Maldives',    country: 'Indian Ocean', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=85', tours: 8 },
  { name: 'Bali',        country: 'Indonesia', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=85', tours: 15 },
  { name: 'Switzerland', country: 'Europe',    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85', tours: 9 },
  { name: 'Dubai',       country: 'UAE',       img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=85', tours: 11 },
  { name: 'Paris',       country: 'France',    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=85', tours: 10 },
];

/* ── Stat counter ── */
function StatItem({ end, suffix, prefix = '', label }) {
  const [ref, inView] = useInView({ triggerOnce: true });
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl lg:text-5xl font-light text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        {inView ? <CountUpComponent start={0} end={end} duration={2.5} separator="," prefix={prefix} suffix={suffix} /> : `${prefix}0${suffix}`}
      </div>
      <p className="text-white/50 text-xs tracking-[2px] uppercase">{label}</p>
    </div>
  );
}

/* ── Package card ── */
function LuxuryCard({ pkg, i }) {
  const discount = pkg.originalPrice ? Math.round((1 - pkg.price / pkg.originalPrice) * 100) : 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.12, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="luxury-card group h-full"
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <div className="relative h-64 overflow-hidden img-hover shrink-0">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 overlay-dark opacity-60" />
        {discount > 0 && (
          <div className="absolute top-4 right-4 bg-[#b8975a] text-white text-[10px] font-bold px-2.5 py-1 rounded tracking-widest uppercase">
            Save {discount}%
          </div>
        )}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <p className="text-white/60 text-[10px] tracking-[2px] uppercase mb-1">{pkg.type}</p>
            <h3 className="text-white text-xl font-light leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{pkg.title}</h3>
          </div>
          <div className="flex items-center gap-1 text-[#d4b483]">
            <FiStar size={12} className="fill-current" />
            <span className="text-xs font-semibold">{pkg.rating}</span>
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-4">
          <FiMapPin size={11} className="text-[#b8975a]" />
          <span>{pkg.destination}</span>
          <span className="mx-1">·</span>
          <span>{pkg.duration}</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">From</p>
            <p className="text-2xl font-light text-[#0a192f]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              ${pkg.price.toLocaleString()}
              <span className="text-sm text-gray-400 font-normal ml-1">/person</span>
            </p>
          </div>
          <Link to={`/packages/${pkg.id}`}
            className="w-10 h-10 rounded-full bg-[#0a192f] flex items-center justify-center text-white hover:bg-[#b8975a] transition-all duration-300 group-hover:bg-[#b8975a]"
          >
            <HiArrowLongRight size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [search, setSearch]     = useState({ destination: '', date: '', travelers: '2' });
    const [showVideo, setShowVideo] = useState(false);
  const [activeFilter, setFilter] = useState('All');
  const navigate = useNavigate();

  const filters  = ['All', 'International', 'Romance', 'Family', 'Adventure'];
  const filtered = activeFilter === 'All' ? packages : packages.filter(p => p.type === activeFilter);

  return (
    <div className="overflow-x-hidden">
      <SEO
        title="Luxury Travel & Tour Packages"
        description="Discover 500+ curated luxury tour packages to Santorini, Maldives, Bali, Swiss Alps and 80+ destinations. Book your dream journey with TravelGo today."
        canonical="/"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'TravelGo — Luxury Travel',
          description: 'Premium luxury travel agency. 500+ curated packages.'
        }}
      />

      {/* ═══════════════════════════════════════════
          HERO — Full screen Swiper slideshow
      ═══════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={heroSlides.length >= 3}
          className="w-full h-full"
        >
          {heroSlides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full">
                <img
                  src={slide.img}
                  alt={slide.label}
                  className="w-full h-full object-cover scale-105"
                  style={{ animation: 'kenBurns 10s ease-in-out infinite alternate' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                  <motion.p
                    key={`label-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="overline text-white/70 mb-5"
                  >
                    {slide.label}
                  </motion.p>
                  <motion.h1
                    key={`title-${i}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-5xl sm:text-6xl lg:text-8xl font-light leading-[1.05] mb-5 whitespace-pre-line"
                    style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '-0.02em' }}
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    key={`sub-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-white/65 text-sm tracking-widest mb-10"
                  >
                    {slide.sub}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex flex-wrap gap-4 justify-center"
                  >
                    <button onClick={() => navigate('/packages')} className="btn-hero">
                      Explore Packages
                    </button>
                    <button onClick={() => setShowVideo(true)} className="btn-hero flex items-center gap-2">
                      <FiPlay size={12} /> Watch Video
                    </button>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {showVideo && <VideoModal videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" onClose={() => setShowVideo(false)} />}
        {/* ── Floating Search Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-20"
        >
          <div className="glass-light rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.25)] overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="flex items-center gap-3 flex-1 px-6 py-4 border-b md:border-b-0 md:border-r border-white/30">
                <FiMapPin className="text-[#b8975a] shrink-0" size={18} />
                <div className="flex-1">
                  <p className="text-[9px] font-bold uppercase tracking-[2px] text-gray-500 mb-0.5">Destination</p>
                  <input
                    type="text"
                    placeholder="Where to go?"
                    value={search.destination}
                    onChange={e => setSearch({ ...search, destination: e.target.value })}
                    className="w-full outline-none text-sm text-gray-800 bg-transparent placeholder-gray-400"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 flex-1 px-6 py-4 border-b md:border-b-0 md:border-r border-white/30">
                <FiCalendar className="text-[#b8975a] shrink-0" size={18} />
                <div className="flex-1">
                  <p className="text-[9px] font-bold uppercase tracking-[2px] text-gray-500 mb-0.5">Travel Date</p>
                  <input
                    type="date"
                    value={search.date}
                    onChange={e => setSearch({ ...search, date: e.target.value })}
                    className="w-full outline-none text-sm text-gray-800 bg-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 px-6 py-4 border-b md:border-b-0 md:border-r border-white/30">
                <FiUsers className="text-[#b8975a] shrink-0" size={18} />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[2px] text-gray-500 mb-0.5">Travelers</p>
                  <select
                    value={search.travelers}
                    onChange={e => setSearch({ ...search, travelers: e.target.value })}
                    className="outline-none text-sm text-gray-800 bg-transparent cursor-pointer"
                  >
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n > 1 ? 'People' : 'Person'}</option>)}
                  </select>
                </div>
              </div>
              <button
                onClick={() => navigate(`/packages?search=${search.destination}`)}
                className="bg-[#0a192f] text-white px-8 py-4 flex items-center justify-center gap-2 text-[10px] font-bold tracking-[2px] uppercase hover:bg-[#b8975a] transition-all duration-300 whitespace-nowrap"
              >
                <FiSearch size={16} /> Search
              </button>
            </div>
          </div>
        </motion.div>

        <style>{`
          @keyframes kenBurns { from { transform: scale(1.05); } to { transform: scale(1.12); } }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════ */}
      <section className="bg-[#0a192f] py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-white/10">
            {[
              { end: 50000, suffix: '+', label: 'Happy Travelers' },
              { end: 500,   suffix: '+', label: 'Tour Packages' },
              { end: 80,    suffix: '+', label: 'Destinations' },
              { end: 15,    suffix: 'yrs', label: 'Experience' },
            ].map((s, i) => <StatItem key={i} {...s} />)}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          POPULAR DESTINATIONS
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#fafaf9]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="label-text mb-3">Where to Go</p>
              <h2 className="text-5xl lg:text-6xl font-light text-[#0a192f] line-accent" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Iconic Destinations
              </h2>
            </div>
            <Link to="/destinations" className="flex items-center gap-2 text-[10px] tracking-[2px] uppercase font-bold text-[#b8975a] hover:gap-4 transition-all shrink-0">
              View All <HiArrowLongRight size={20} />
            </Link>
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-3 auto-rows-[160px]">
            {/* Large card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 row-span-2 relative overflow-hidden rounded-2xl cursor-pointer group img-hover"
            >
              <img src={featDest[0].img} alt={featDest[0].name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 overlay-dark" />
              <div className="absolute bottom-0 left-0 p-7">
                <p className="overline text-white/60 mb-2">{featDest[0].country}</p>
                <h3 className="text-4xl text-white font-light mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{featDest[0].name}</h3>
                <p className="text-[#d4b483] text-xs">{featDest[0].tours} Curated Tours</p>
              </div>
              <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                  <FiArrowUpRight className="text-white" size={16} />
                </div>
              </div>
            </motion.div>

            {/* Medium + small cards */}
            {featDest.slice(1).map((dest, i) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 1) * 0.1, duration: 0.6 }}
                className={`${i === 0 ? 'lg:col-span-4 row-span-2' : i === 1 ? 'lg:col-span-3' : i === 2 ? 'lg:col-span-3' : 'lg:col-span-4'} relative overflow-hidden rounded-2xl cursor-pointer group img-hover`}
              >
                <img src={dest.img} alt={dest.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 overlay-dark" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className={`text-white font-light mb-0.5 ${i === 0 ? 'text-2xl' : 'text-lg'}`} style={{ fontFamily: 'Cormorant Garamond, serif' }}>{dest.name}</h3>
                  <p className="text-white/55 text-xs">{dest.country}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRENDING PACKAGES
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="label-text mb-3">Curated For You</p>
              <h2 className="text-5xl lg:text-6xl font-light text-[#0a192f] line-accent" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Trending Packages
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2 rounded-full text-[10px] font-bold tracking-[1.5px] uppercase transition-all ${
                    activeFilter === f
                      ? 'bg-[#0a192f] text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.slice(0, 8).map((pkg, i) => <LuxuryCard key={pkg.id} pkg={pkg} i={i} />)}
          </div>

          <div className="text-center mt-14">
            <Link to="/packages" className="btn-dark">
              View All Packages <HiArrowLongRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY TRAVEL WITH US — 4 icon cards
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0a192f] relative overflow-hidden">
        {/* Background image subtle */}
        <div className="absolute inset-0 opacity-[0.04]">
          <img src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1600&q=30" className="w-full h-full object-cover" alt="" />
        </div>
        {/* Gold accent lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/40 to-transparent" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="text-center mb-16">
            <p className="label-text text-[#b8975a]/80 justify-center mb-3">Our Promise</p>
            <h2 className="text-5xl lg:text-6xl font-light text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Why <span className="italic text-[#d4b483]">TravelGo</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', icon: '✦', title: 'Curated Luxury', sub: 'Hand-selected 5★ stays only' },
              { num: '02', icon: '◈', title: 'Private Guides', sub: 'Expert local hosts, always' },
              { num: '03', icon: '⬡', title: '24/7 Concierge', sub: 'White-glove support worldwide' },
              { num: '04', icon: '◇', title: 'Best Rate', sub: 'Price-match guarantee, always' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="relative p-8 border border-white/8 rounded-2xl hover:border-[#b8975a]/50 transition-all duration-500 group hover:bg-white/3"
              >
                <p className="text-[#b8975a]/30 text-5xl font-bold mb-6 group-hover:text-[#b8975a]/50 transition-colors" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{item.num}</p>
                <div className="text-[#b8975a] text-2xl mb-4">{item.icon}</div>
                <h3 className="text-white text-xl font-light mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{item.title}</h3>
                <p className="text-white/40 text-sm">{item.sub}</p>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#b8975a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          REVIEWS CAROUSEL
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-[#fafaf9]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <p className="label-text justify-center mb-3">Testimonials</p>
            <h2 className="text-5xl lg:text-6xl font-light text-[#0a192f]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Voices of Our Travelers
            </h2>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {reviews.map((r, i) => (
              <SwiperSlide key={r.id}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col"
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <FiStar key={j} size={13} className={j < r.rating ? 'text-[#b8975a] fill-current' : 'text-gray-200'} />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">&ldquo;{r.comment}&rdquo;</p>
                  {/* Author */}
                  <div className="flex items-center gap-3 mt-auto">
                    <img src={r.avatar} alt={r.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-[#b8975a]/30" />
                    <div>
                      <p className="text-[#0a192f] font-semibold text-sm">{r.name}</p>
                      <p className="text-gray-400 text-xs">{r.location}</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-[10px] text-[#b8975a] font-semibold uppercase tracking-wider">{r.tour.split(' ').slice(0,2).join(' ')}</span>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INSTAGRAM-STYLE GALLERY
      ═══════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="label-text mb-3">Visual Journey</p>
              <h2 className="text-5xl lg:text-6xl font-light text-[#0a192f]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Travel Gallery
              </h2>
            </div>
            <p className="text-gray-400 text-sm hidden md:block">@travelgo</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {[
              { img: galleryImages[0], span: 'row-span-2', h: '420px' },
              { img: galleryImages[1], span: '',           h: '200px' },
              { img: galleryImages[2], span: '',           h: '200px' },
              { img: galleryImages[3], span: 'row-span-2', h: '420px' },
              { img: galleryImages[4], span: '',           h: '200px' },
              { img: galleryImages[5], span: '',           h: '200px' },
              { img: galleryImages[6], span: '',           h: '200px' },
              { img: galleryImages[7], span: '',           h: '200px' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`relative overflow-hidden rounded-xl group cursor-pointer img-hover ${item.span}`}
                style={{ height: item.h }}
              >
                <img src={item.img} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 glass-dark rounded-full p-3">
                    <FiArrowUpRight className="text-white" size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════════ */}
      <section className="relative py-36 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=85"
          alt="CTA"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/90 via-[#0a192f]/70 to-transparent" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <p className="label-text text-[#b8975a] mb-5">Limited Time Offer</p>
            <h2 className="text-5xl lg:text-7xl font-light text-white leading-[1.05] mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Your Dream<br /><span className="italic text-[#d4b483]">Journey</span> Awaits
            </h2>
            <p className="text-white/60 mb-10 text-lg font-light">Get up to 30% off on select packages this season.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/packages" className="btn-hero">
                Explore Packages
              </Link>
              <Link to="/contact" className="btn-ghost">
                Talk to an Expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          NEWSLETTER
      ═══════════════════════════════════════════ */}
      <section className="py-20 bg-[#fafaf9] border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="label-text justify-center mb-4">Stay in the Know</p>
          <h2 className="text-4xl lg:text-5xl font-light text-[#0a192f] mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Exclusive Deals, First
          </h2>
          <p className="text-gray-400 text-sm mb-8">Join 50,000+ travelers. Unsubscribe anytime.</p>
          <form onSubmit={e => e.preventDefault()} className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-5 py-4 rounded-l-xl border-2 border-gray-200 text-sm focus:border-[#b8975a] outline-none transition-colors bg-white"
            />
            <button type="submit" className="btn-luxury !rounded-r-xl !rounded-l-none !py-4 !px-7 whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
