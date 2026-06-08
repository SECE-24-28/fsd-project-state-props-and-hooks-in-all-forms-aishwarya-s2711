import { useParams, Link } from 'react-router-dom';
import { destinations } from '../data/destinations';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';
import { FiMapPin, FiArrowLeft } from 'react-icons/fi';

export default function DestinationDetail() {
  const { id } = useParams();
  const destination = destinations.find(d => d.id === parseInt(id));

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <SEO title="Destination Not Found" />
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Destination Not Found</h1>
        <Link to="/destinations" className="text-blue-600 flex items-center gap-2 hover:underline">
          <FiArrowLeft /> Back to Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={`${destination.name} - TravelGo`} 
        description={destination.description} 
      />
      
      <PageHero
        badge={destination.category}
        title={destination.name}
        subtitle={destination.country}
        image={destination.image}
      />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link to="/destinations" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors font-semibold text-sm">
          <FiArrowLeft /> Back to all destinations
        </Link>

        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mb-12 shadow-sm">
          <h2 className="text-3xl font-light text-slate-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            About {destination.name}
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-6">
            {destination.description}
          </p>
          <div className="flex items-center gap-2 text-slate-500 font-semibold uppercase tracking-wider text-sm">
            <FiMapPin className="text-blue-600" /> {destination.country}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to visit {destination.name}?</h3>
          <Link to={`/packages?search=${destination.name}`} className="btn btn-primary px-8 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all">
            View Tour Packages
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
