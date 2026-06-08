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
import PackageCard from '../components/PackageCard';
import { packages as dummyPackages } from '../data/dummyData';
import { useEffect } from 'react';
import api from '../utils/api';

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
      {/* white/80 ≈ 10:1 on navy — WCAG AA ✓ */}
      <p className="text-white/80 text-[0.8125rem] tracking-[1.5px] uppercase">{label}</p>
    </div>
  );
}

/* LuxuryCard removed — using shared PackageCard component instead */

export default function Home() {
  const [search, setSearch]     = useState({ destination: '', date: '', travelers: '2' });
    const [showVideo, setShowVideo] = useState(false);
  const [activeFilter, setFilter] = useState('All');
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await api.get('/packages');
        const fetched = data.packages || data || [];
        setPackages(fetched.length > 0 ? fetched : dummyPackages);
      } catch (err) {
        console.error('Failed to fetch packages, using local data:', err);
        setPackages(dummyPackages);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

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
                <div className="absolute inset-0 bg-black/50 sm:bg-black/40" />
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
                    className="text-5xl sm:text-6xl lg:text-8xl font-light leading-[1.05] mb-5 whitespace-pre-line drop-shadow-xl"
                    style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '-0.02em', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    key={`sub-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-white text-base md:text-lg tracking-widest mb-10 drop-shadow-md font-semibold"
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
          <div className="bg-white rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="flex items-center gap-3 flex-1 px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200">
                <FiMapPin className="text-[#b8975a] shrink-0" size={18} />
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-[1.5px] text-slate-900 mb-0.5">Destination</p>
                  <input
                    type="text"
                    placeholder="Where to go?"
                    value={search.destination}
                    onChange={e => setSearch({ ...search, destination: e.target.value })}
                    className="w-full outline-none text-base text-gray-900 bg-transparent placeholder-gray-500 focus:ring-2 focus:ring-[#b8975a] rounded px-1"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 flex-1 px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200">
                <FiCalendar className="text-[#b8975a] shrink-0" size={18} />
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-[1.5px] text-slate-900 mb-0.5">Travel Date</p>
                  <input
                    type="date"
                    value={search.date}
                    onChange={e => setSearch({ ...search, date: e.target.value })}
                    className="w-full outline-none text-base text-gray-900 bg-transparent focus:ring-2 focus:ring-[#b8975a] rounded px-1"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200">
                <FiUsers className="text-[#b8975a] shrink-0" size={18} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[1.5px] text-slate-900 mb-0.5">Travelers</p>
                  <select
                    value={search.travelers}
                    onChange={e => setSearch({ ...search, travelers: e.target.value })}
                    className="outline-none text-base text-gray-900 bg-transparent cursor-pointer focus:ring-2 focus:ring-[#b8975a] rounded px-1"
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
                <p className="overline text-white/75 mb-2">{featDest[0].country}</p>
                <h3 className="text-4xl text-white font-light mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{featDest[0].name}</h3>
                <p className="text-[#d4b483] text-sm">{featDest[0].tours} Curated Tours</p>
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
                  <p className="text-white/75 text-xs">{dest.country}</p>
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
                  className={`px-5 py-2 rounded-full text-xs font-bold tracking-[1px] uppercase transition-all ${
                    activeFilter === f
                      ? 'bg-[#0a192f] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {loading ? (
              <p className="col-span-full text-center py-10 text-gray-400">Loading packages...</p>
            ) : filtered.length > 0 ? (
              filtered.slice(0, 8).map((pkg, i) => <PackageCard key={pkg._id || pkg.id} pkg={pkg} index={i} />)
            ) : (
              <p className="col-span-full text-center py-10 text-gray-400">No packages found.</p>
            )}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { num: '01', icon: '✦', title: 'Hand-Selected 5-Star Hotels', sub: 'Curated stays only' },
              { num: '02', icon: '◈', title: 'Save More on Every Trip', sub: 'Exclusive partner rates' },
              { num: '03', icon: '⬡', title: 'Expert Local Hosts', sub: 'Guided experiences' },
              { num: '04', icon: '◇', title: 'Worldwide Support', sub: '24/7 global assistance' },
              { num: '05', icon: '❖', title: 'Price Match Guarantee', sub: 'Best rates, always' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="relative p-6 border border-white/8 rounded-2xl hover:border-[#b8975a]/50 transition-all duration-500 group hover:bg-white/3 flex flex-col items-center text-center h-full"
              >
                <p className="text-[#b8975a]/30 text-5xl font-bold mb-4 group-hover:text-[#b8975a]/50 transition-colors" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{item.num}</p>
                <div className="text-[#b8975a] text-2xl mb-4">{item.icon}</div>
                <h3 className="text-white text-lg font-light mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{item.title}</h3>
                 <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>{item.sub}</p>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#b8975a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
          style={{ animation: 'kenBurns 14s ease-in-out infinite alternate' }}
        />
        <div className="absolute inset-0 bg-[#0a192f]/75 backdrop-blur-[1.5px]" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl flex flex-col items-center"
          >
            <p className="label-text text-[#b8975a] justify-center mb-5">Limited Time Offer</p>
            <h2 className="text-5xl lg:text-7xl font-light text-white leading-[1.05] mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Your Dream <span className="italic text-[#d4b483]">Journey</span> Awaits
            </h2>
            <p className="mb-10 text-lg font-light" style={{ color: 'rgba(255,255,255,0.85)' }}>Get up to 30% off on select packages this season.</p>
            <div className="flex flex-wrap gap-4 justify-center">
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
      <section className="py-24 bg-[#fafaf9] relative overflow-hidden flex items-center justify-center">
        {/* Subtle background decorative shapes */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#b8975a]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0a192f]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="w-full max-w-3xl mx-auto px-6">
          <div className="bg-white border border-[#e8e4dc] rounded-[2.5rem] px-8 py-14 md:px-16 md:py-20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
            {/* Inner border line decoration */}
            <div className="absolute inset-4 border border-[#b8975a]/15 rounded-[2rem] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <span className="text-[#b8975a] text-xs font-bold uppercase tracking-[2px] mb-4">Stay in the Know</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0a192f] mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Exclusive Deals, First.
              </h2>
              <p className="text-gray-500 text-base md:text-lg mb-10 max-w-md leading-relaxed">
                Join 50,000+ travelers who receive our curated luxury travel offers directly to their inbox. Unsubscribe anytime.
              </p>
              
              <form onSubmit={e => e.preventDefault()} className="w-full max-w-md bg-white p-2 border border-gray-200 rounded-full shadow-sm flex flex-col sm:flex-row gap-2 transition-shadow hover:shadow-md focus-within:border-[#b8975a]/50 focus-within:shadow-md focus-within:ring-4 focus-within:ring-[#b8975a]/10">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  className="flex-1 px-6 py-3 bg-transparent text-base outline-none text-gray-800 placeholder-gray-400 w-full text-center sm:text-left"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                  required
                />
                <button type="submit" className="btn-luxury !rounded-full !py-3.5 !px-8 whitespace-nowrap shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer font-semibold w-full sm:w-auto">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
