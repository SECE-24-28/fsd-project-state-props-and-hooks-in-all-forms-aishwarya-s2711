import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { FiUser, FiCalendar, FiClock, FiShare2, FiLink, FiSearch, FiArrowRight, FiTwitter, FiLinkedin } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import { blogs } from '../data/dummyData';

const BLOG_CONTENT = {
  1: {
    body: `Santorini is iconic for its whitewashed villages and blue-domed churches, but the island holds far more than its postcard image suggests.\n\n**Amoudi Bay** sits 200 steps below Oia and offers a cluster of seafood tavernas carved directly into the volcanic cliffs. At sunset, the crimson light reflecting off the water is nothing short of otherworldly.\n\n**Pyrgos Village** is the highest point on the island, completely overlooked by most tour groups. Its medieval castle ruins and traditional cafés reveal an authentic Santorini that tourism hasn't touched. The panoramic view of the caldera from Pyrgos is arguably better than Oia's.\n\n**Emporio** is another medieval settlement with a labyrinthine network of lanes designed to confuse pirates. Today, it confuses tourists just as effectively — which is precisely why it remains pristine.\n\n**Vlychada Beach** features dramatic lunar-like cliffs of compressed volcanic ash forming natural sculptures. Bring a camera and arrive before 9AM to have it entirely to yourself.\n\nFinally, the **Ancient Thera ruins** atop Mesa Vouno mountain reward the hour-long hike with 360-degree views of the entire island chain and artefacts spanning Ptolemaic, Roman, and Byzantine eras.`,
  },
  2: {
    body: `Planning a Maldives honeymoon requires far more thought than simply booking the most expensive resort. Here is exactly what we tell every couple who calls our concierge.\n\n**Choosing the right atoll matters enormously.** North Malé Atoll is closest to the airport and offers faster transfers, but South Malé and Ari Atolls have superior marine biodiversity. If you want to dive with whale sharks, Ari Atoll is non-negotiable.\n\n**Overwater bungalow versus beach villa?** The postcard images are overwater bungalows, but for privacy and space, a beach villa with direct lagoon access often wins. Many couples are surprised by how exposed overwater villas can feel during daylight hours.\n\n**Plan activities in advance, not on arrival.** Sunset dolphin cruises, private sandbank picnics, and whale shark excursions book out weeks ahead at peak resorts. Have your concierge arrange these before you fly.\n\n**The best months are November through April** when seas are calm, visibility is exceptional, and rainfall minimal. December and February command premium pricing — consider early November or late March for significant savings without compromising weather.\n\n**Pack light but think practically.** Sun protection, anti-seasickness medication for seaplane transfers, and a dry bag for water activities. The romantic photos all happen at golden hour, so note the exact sunset time for each day of your stay.`,
  },
  3: {
    body: `Bali's reputation as an expensive luxury destination is largely a myth constructed by boutique resort marketing. With the right approach, the island offers genuine luxury experiences at a fraction of comparable destinations.\n\n**The secret is in the villa economy.** Private pool villas in Ubud or Canggu that would cost $800/night at a branded resort can be rented through local agencies for $120–180/night. They include daily breakfast, a private chef option, and often a driver on request.\n\n**Eat where the guides eat, not where they take you.** Warung Ibu Oka in Ubud serves the most celebrated babi guling (suckling pig) on the island for under $5. Nasi ayam Kedewatan has the best chicken rice. These places are cash-only, open by 11AM, and closed when the food runs out.\n\n**Negotiate every single transaction** except in fixed-price shops. The first price quoted at markets is typically three to five times the fair price. Smile, express genuine appreciation for the product, then offer half. Meet somewhere in the middle.\n\n**Hire a private driver for $35–45/day** rather than paying per trip. A good driver becomes your guide, translator, and spontaneous itinerary planner. Ask your accommodation to recommend someone they personally know.\n\n**Visit temples at dawn.** Tanah Lot, Tirta Empul, and Besakih are mobbed by 9AM. Arrive at sunrise and you will have sacred spaces largely to yourself.`,
  },
  4: {
    body: `The Swiss Alps in winter present two entirely different experiences depending on which side of the mountain you approach from. Understanding this is the foundation of a perfect ski holiday.\n\n**The Jungfrau region** (Grindelwald, Wengen, Mürren) is the choice for atmosphere, village charm, and the iconic Jungfraujoch train to 3,454m. Skiing is excellent but intermediate-focused. The car-free villages of Wengen and Mürren add an unmatched tranquillity.\n\n**Verbier and Zermatt** are for serious skiers. Verbier's 4 Vallées links 410km of piste; Zermatt offers year-round skiing and the most recognisable mountain silhouette in the world — the Matterhorn. Both are extremely expensive but justify every franc for enthusiasts.\n\n**Booking strategy:** Book accommodation in December for the following January–February peak. The best chalets and ski-in/ski-out apartments disappear first. January after New Year offers the best value — Christmas crowds have left but snow conditions peak.\n\n**The Swiss Rail Pass** covers virtually all mountain railways, city trains, and many cable cars. For a 9-day trip, the savings over individual tickets easily exceed CHF 400.\n\n**Hire equipment on arrival,** not from home. Resort rental shops provide properly fitted, regularly serviced equipment at competitive prices and can swap skis if conditions change.`,
  },
  5: {
    body: `The conventional wisdom says avoid Kerala in monsoon season (June–September). The conventional wisdom is wrong.\n\n**The landscape transforms utterly.** Rice paddies that appear brown in winter glow an iridescent emerald. Waterfalls that trickle in dry season thunder down hillsides. The western ghats wear a perpetual mist that makes Munnar feel like a landscape from myth.\n\n**Ayurvedic retreats specifically schedule monsoon packages.** Traditional Ayurveda considers the rainy season optimal for panchakarma treatments because open pores and cool temperatures enhance absorption of herbal oils. Rates drop 30–40% from peak season pricing.\n\n**The backwaters are more beautiful, not less.** Tourist houseboats thin out dramatically, meaning the waterways around Alleppey feel genuinely wild. Kingfishers, egrets, and cormorants are easier to spot without motor traffic disturbing the banks.\n\n**Practical reality:** Rain falls in intense showers, typically for one to three hours, then stops completely. You are rarely unable to go outside for more than a few hours. A lightweight waterproof jacket and waterproof sandals are the only adaptations needed.\n\n**Prices drop significantly.** A luxury houseboat that costs ₹18,000/night in December can be negotiated to ₹9,000 in July. Resorts in Munnar offer 50% off during peak monsoon weeks.`,
  },
  6: {
    body: `Five days in Dubai sounds generous until you start listing everything worth doing. Here is the framework that consistently produces the best results for our clients.\n\n**Day 1: Old Dubai.** Al Fahidi Historical Neighbourhood in the morning while it's cool. Cross the creek by abra (water taxi, AED 1) to the Spice Souk and Gold Souk. Lunch at a traditional Emirati restaurant in Deira. Evening: Dubai Frame at sunset — overpriced at AED 50 but the view conceptually frames old and new Dubai perfectly.\n\n**Day 2: Modern Dubai.** Dubai Mall opens at 10AM. Burj Khalifa observation deck tickets must be pre-booked online — top deck (level 148) is worth the premium. Dubai Fountain show runs every 30 minutes after 6PM and is completely free.\n\n**Day 3: Desert Safari.** Book through a quality operator, not the hotel concierge (typically 40% markup). Afternoon departure for dune bashing, camel riding, henna painting, and a BBQ dinner under stars. Essential, not optional.\n\n**Day 4: Abu Dhabi day trip.** Sheikh Zayed Grand Mosque is architecturally extraordinary and free to enter. Dress code is strictly enforced — abayas are loaned at the entrance. Allow two hours minimum.\n\n**Day 5: The Palm and Marina.** Atlantis water park if traveling with children. Otherwise, Palm Jumeirah monorail for the perspective, then an afternoon in Dubai Marina for the restaurant and waterfront atmosphere. Dhow dinner cruise as a farewell.`,
  },
};

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div
      className="reading-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  );
}

function ShareButtons({ title }) {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const copy = () => {
    navigator.clipboard.writeText(url);
    toast.success('Link copied!');
  };
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#888' }}>
        <FiShare2 style={{ display: 'inline', marginRight: 4 }} />Share
      </span>
      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer"
        className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
        style={{ background: '#1da1f2', color: '#fff' }}
        aria-label="Share on Twitter">
        <FiTwitter size={14} />
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer"
        className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
        style={{ background: '#1877f2', color: '#fff' }}
        aria-label="Share on Facebook">
        <FaFacebook size={14} />
      </a>
      <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
        target="_blank" rel="noopener noreferrer"
        className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
        style={{ background: '#0a66c2', color: '#fff' }}
        aria-label="Share on LinkedIn">
        <FiLinkedin size={14} />
      </a>
      <a href={`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`}
        target="_blank" rel="noopener noreferrer"
        className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
        style={{ background: '#25d366', color: '#fff' }}
        aria-label="Share on WhatsApp">
        <FaWhatsapp size={14} />
      </a>
      <button onClick={copy}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
        style={{ background: '#f0ede6', color: '#0a192f' }}
        aria-label="Copy link">
        <FiLink size={14} />
      </button>
    </div>
  );
}

export function BlogList() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(blogs.map(b => b.category))];
  const filtered = blogs.filter(b => {
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || b.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen page-enter" style={{ background: '#ffffff' }}>
      <SEO
        title="Travel Blog — Insights & Guides"
        description="Expert travel advice, destination guides and inspiring stories from TravelGo's team of travel specialists."
        canonical="/blog"
      />

      <PageHero
        badge="Our Blog"
        title="Travel Insights"
        subtitle="Expert guides, destination stories, and insider tips from our travel specialists"
        image="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1400&q=60"
      />

      <section className="py-16" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-6">

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <div className="flex items-center gap-2 flex-1 min-w-52 rounded-xl px-5 py-3"
              style={{ background: '#fff', border: '1.5px solid #e8e4dc' }}>
              <FiSearch style={{ color: '#b8975a' }} />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 outline-none text-sm"
                style={{ fontFamily: 'DM Sans, sans-serif', background: 'transparent', color: '#1a1a1a' }}
                aria-label="Search blog articles"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button key={c} onClick={() => setCategory(c)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all"
                  style={{
                    background: category === c ? '#0a192f' : 'transparent',
                    color: category === c ? '#fff' : '#4a4a4a',
                    border: `1.5px solid ${category === c ? '#0a192f' : '#e8e4dc'}`,
                  }}
                  aria-pressed={category === c}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Featured */}
          {filtered.length > 0 && category === 'All' && !search && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden mb-12 group"
              style={{ boxShadow: '0 24px 64px rgba(10,25,47,0.12)' }}
            >
              <Link to={`/blog/${filtered[0].id}`} className="block">
                <div className="relative h-80 lg:h-[420px] overflow-hidden">
                  <img
                    src={filtered[0].image}
                    alt={filtered[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,25,47,0.92) 0%, rgba(10,25,47,0.30) 60%, transparent 100%)' }} />
                  <div className="absolute bottom-0 left-0 p-8 lg:p-12 max-w-2xl">
                    <span className="section-badge" style={{ color: '#d4b483', borderColor: 'rgba(212,180,131,0.35)', background: 'rgba(212,180,131,0.12)', marginBottom: 12 }}>
                      {filtered[0].category}
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-light text-white mb-3"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {filtered[0].title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm" style={{ color: 'rgba(255,255,255,0.90)' }}>
                      <span className="flex items-center gap-1.5"><FiUser size={11} />{filtered[0].author}</span>
                      <span className="flex items-center gap-1.5"><FiCalendar size={11} />{filtered[0].date}</span>
                      <span className="flex items-center gap-1.5"><FiClock size={11} />{filtered[0].readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(category === 'All' && !search ? filtered.slice(1) : filtered).map((blog, i) => (
              <motion.article key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="luxury-card group h-full"
                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <div className="relative h-52 overflow-hidden img-hover">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute top-4 left-4">
                    <span className="section-badge" style={{ background: 'rgba(10,25,47,0.75)', color: '#d4b483', borderColor: 'rgba(212,180,131,0.30)', marginBottom: 0 }}>
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-8" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div className="flex items-center gap-3 text-xs mb-4" style={{ color: '#4b5563' }}>
                    <span className="flex items-center gap-1"><FiCalendar size={12} />{blog.date}</span>
                    <span className="flex items-center gap-1"><FiClock size={12} />{blog.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-2xl mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {blog.title}
                  </h3>
                  <p className="text-[0.9375rem] mb-5" style={{ color: '#374151', lineHeight: 1.75, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{blog.excerpt}</p>
                  <div className="flex items-center justify-between pt-5" style={{ borderTop: '1px solid #f0ede6', marginTop: 'auto' }}>
                    <span className="flex items-center gap-2 text-sm font-medium" style={{ color: '#444' }}>
                      <FiUser size={14} style={{ color: '#b8975a' }} />{blog.author}
                    </span>
                    <Link to={`/blog/${blog.id}`}
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all px-4 py-2 rounded-md bg-[#0a192f] hover:bg-[#112a4a] text-white"
                      aria-label={`Read ${blog.title}`}>
                      Read More <FiArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-light mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>No articles found</h3>
              <p className="text-sm" style={{ color: '#888' }}>Try a different search term or category</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export function BlogDetail() {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === Number(id));
  const related = blog ? blogs.filter(b => b.id !== blog.id && b.category === blog.category).slice(0, 3) : [];
  const content = blog ? BLOG_CONTENT[blog.id] : null;

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f8f6f2' }}>
        <div className="text-center">
          <div className="text-5xl mb-4">📄</div>
          <h2 className="text-2xl font-light mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>Article not found</h2>
          <Link to="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const paragraphs = content?.body?.split('\n\n') || [blog.excerpt];

  return (
    <div className="min-h-screen page-enter" style={{ background: '#ffffff' }}>
      <ReadingProgress />
      <SEO
        title={blog.title}
        description={blog.excerpt}
        image={blog.image}
        canonical={`/blog/${blog.id}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: blog.title,
          description: blog.excerpt,
          image: blog.image,
          author: { '@type': 'Person', name: blog.author },
          datePublished: blog.date,
        }}
      />

      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover ken-burns" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,25,47,0.95) 0%, rgba(10,25,47,0.82) 60%, rgba(10,25,47,0.68) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to top, #ffffff, transparent)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center px-6" style={{ zIndex: 1 }}>
          <span className="section-badge mb-4" style={{ color: '#d4b483', borderColor: 'rgba(212,180,131,0.35)', background: 'rgba(212,180,131,0.12)' }}>
            {blog.category}
          </span>
          <h1 className="text-4xl lg:text-6xl font-light text-white max-w-4xl mb-5"
            style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '-0.02em' }}>
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm" style={{ color: 'rgba(255,255,255,0.90)' }}>
            <span className="flex items-center gap-1.5"><FiUser size={13} />{blog.author}</span>
            <span className="flex items-center gap-1.5"><FiCalendar size={13} />{blog.date}</span>
            <span className="flex items-center gap-1.5"><FiClock size={13} />{blog.readTime}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex gap-12">

          {/* Article */}
          <article className="flex-1 min-w-0">
            <div className="rounded-3xl p-8 lg:p-12 mb-8" style={{ background: '#fff', boxShadow: '0 8px 32px rgba(10,25,47,0.07)' }}>
              <p className="text-lg leading-relaxed mb-8 italic"
                style={{ color: '#374151', borderLeft: '3px solid #b8975a', paddingLeft: 20, fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem' }}>
                {blog.excerpt}
              </p>
              <div className="space-y-6">
                {paragraphs.map((para, i) => {
                  if (para.startsWith('**') && para.includes('**')) {

                    const isHeading = para.match(/^\*\*[^*]+\*\*/);
                    if (isHeading) {
                      const heading = para.match(/^\*\*([^*]+)\*\*/)?.[1] || '';
                      const body = para.replace(/^\*\*[^*]+\*\*/, '').trim();
                      return (
                        <div key={i}>
                          <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
                            {heading}
                          </h3>
                          {body && <p className="text-[1.0625rem] leading-[1.85]" style={{ color: '#374151' }}>{body}</p>}
                        </div>
                      );
                    }
                  }
                  return (
                    <p key={i} className="text-[1.0625rem] leading-[1.85]" style={{ color: '#374151' }}>{para}</p>
                  );
                })}
              </div>

              {/* Tags */}
              {blog.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-10 pt-8" style={{ borderTop: '1px solid #e8e4dc' }}>
                  {blog.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 rounded-full text-xs font-semibold"
                      style={{ background: 'rgba(184,151,90,0.10)', color: '#b8975a', border: '1px solid rgba(184,151,90,0.25)' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Share */}
              <div className="mt-8 pt-8 flex items-center gap-4 flex-wrap" style={{ borderTop: '1px solid #e8e4dc' }}>
                <ShareButtons title={blog.title} />
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 rounded-full" style={{ background: '#b8975a' }} />
                  <h2 className="text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
                    Related Articles
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {related.map(b => (
                    <Link key={b.id} to={`/blog/${b.id}`}
                      className="luxury-card group block"
                      aria-label={`Read ${b.title}`}>
                      <div className="relative h-40 overflow-hidden img-hover">
                        <img src={b.image} alt={b.title} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="p-4">
                        <p className="text-xs mb-1" style={{ color: '#b8975a', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                          {b.category}
                        </p>
                        <h4 className="font-light text-base line-clamp-2 group-hover:text-[#b8975a] transition-colors"
                          style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f' }}>
                          {b.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 space-y-6">
              {/* Author card */}
              <div className="rounded-2xl p-6" style={{ background: '#fff', boxShadow: '0 4px 24px rgba(10,25,47,0.06)' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#b8975a' }}>About the Author</p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ background: 'linear-gradient(135deg, #0a192f, #112a4a)' }}>
                    {blog.author[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#0a192f' }}>{blog.author}</p>
                    <p className="text-xs" style={{ color: '#888' }}>Travel Specialist</p>
                  </div>
                </div>
                <p className="text-[0.8125rem] leading-relaxed" style={{ color: '#4b5563' }}>
                  Passionate travel writer and destination expert with years of first-hand experience across luxury destinations worldwide.
                </p>
              </div>

              {/* More articles */}
              <div className="rounded-2xl p-6" style={{ background: '#fff', boxShadow: '0 4px 24px rgba(10,25,47,0.06)' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#b8975a' }}>More Articles</p>
                <div className="space-y-4">
                  {blogs.filter(b => b.id !== blog.id).slice(0, 4).map(b => (
                    <Link key={b.id} to={`/blog/${b.id}`} className="flex gap-3 group">
                      <img src={b.image} alt={b.title} className="w-14 h-14 rounded-lg object-cover shrink-0" loading="lazy" />
                      <div>
                        <p className="text-[0.8125rem] font-medium line-clamp-2 group-hover:text-[#b8975a] transition-colors"
                          style={{ color: '#0a192f' }}>{b.title}</p>
                        <p className="text-xs mt-1" style={{ color: '#6b7280' }}>{b.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
