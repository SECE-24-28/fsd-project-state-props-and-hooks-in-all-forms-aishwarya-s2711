import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';

const SECTIONS = [
  { id: 'acceptance', title: 'Acceptance of Terms' },
  { id: 'services', title: 'Our Services' },
  { id: 'bookings', title: 'Bookings & Payments' },
  { id: 'cancellation', title: 'Cancellations & Refunds' },
  { id: 'conduct', title: 'Traveler Conduct' },
  { id: 'liability', title: 'Limitation of Liability' },
  { id: 'ip', title: 'Intellectual Property' },
  { id: 'disputes', title: 'Disputes & Governing Law' },
  { id: 'modifications', title: 'Modifications' },
  { id: 'contact', title: 'Contact Information' },
];

export default function Terms() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-30% 0px -60% 0px' }
    );
    SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <SEO
        title="Terms & Conditions"
        description="Read TravelGo's Terms and Conditions governing the use of our travel booking services, cancellation policies, and traveler responsibilities."
        canonical="/terms"
      />
      <div className="min-h-screen page-enter" style={{ background: '#ffffff' }}>
        <PageHero
          badge="Legal"
          title="Terms & Conditions"
          subtitle="Last updated: January 1, 2025 · Effective immediately"
          image="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&q=50"
        />

        <section className="py-16" style={{ background: '#ffffff' }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex gap-12">

              {/* Sticky TOC */}
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-28 rounded-2xl p-6" style={{ background: '#fff', boxShadow: '0 4px 24px rgba(10,25,47,0.06)' }}>
                  <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#b8975a' }}>Contents</p>
                  <nav aria-label="Terms sections">
                    <ul className="space-y-2">
                      {SECTIONS.map(s => (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            className="block text-sm py-1.5 px-3 rounded-lg transition-all"
                            style={{
                              color: active === s.id ? '#0a192f' : '#888',
                              background: active === s.id ? 'rgba(184,151,90,0.10)' : 'transparent',
                              fontWeight: active === s.id ? 600 : 400,
                              borderLeft: active === s.id ? '2px solid #b8975a' : '2px solid transparent',
                            }}
                          >
                            {s.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </aside>

              {/* Content */}
              <article className="flex-1 min-w-0">
                <div className="rounded-2xl p-8 lg:p-12" style={{ background: '#fff', boxShadow: '0 4px 24px rgba(10,25,47,0.06)' }}>
                  <p className="text-sm leading-relaxed mb-10" style={{ color: '#4a4a4a', borderLeft: '3px solid #b8975a', paddingLeft: '16px' }}>
                    Please read these Terms and Conditions carefully before using TravelGo's services. By accessing our website or making a booking, you agree to be bound by these terms. If you disagree with any part, you may not use our services.
                  </p>

                  {[
                    { id: 'acceptance', title: 'Acceptance of Terms', content: `By using TravelGo's website, mobile application, or any of our services, you confirm that:
• You are at least 18 years of age or have parental/guardian consent
• You have the legal capacity to enter into binding contracts
• All information you provide is accurate and complete
• You will comply with all applicable laws and regulations

These Terms constitute a legally binding agreement between you ("traveler", "user") and TravelGo Travel Pvt. Ltd. ("TravelGo", "company").` },
                    { id: 'services', title: 'Our Services', content: `TravelGo provides travel-related services including:
• Tour package bookings (international and domestic)
• Hotel and accommodation reservations
• Flight and transport coordination
• Visa and travel documentation assistance
• Custom itinerary planning and travel consulting
• Travel insurance facilitation

We act as an intermediary between travelers and service providers (airlines, hotels, tour operators). While we carefully vet all partners, we are not directly responsible for third-party service failures beyond our reasonable control.` },
                    { id: 'bookings', title: 'Bookings & Payments', content: `Booking Confirmation:
A booking is confirmed only upon receipt of full or partial payment as specified. Confirmation emails are sent within 24 hours.

Pricing:
All prices are in Indian Rupees (INR) or US Dollars (USD) as displayed. Prices are subject to change until payment is received. We reserve the right to correct pricing errors.

Payment Terms:
• A deposit of 25–50% is required to secure bookings
• Full payment is due 30 days before departure
• Last-minute bookings (within 14 days) require full payment
• Returned/failed payments may incur a processing fee

GST and applicable taxes are included in the displayed price unless stated otherwise.` },
                    { id: 'cancellation', title: 'Cancellations & Refunds', content: `Traveler-Initiated Cancellations:
• 30+ days before departure: 90% refund of total amount paid
• 15–29 days before departure: 60% refund
• 7–14 days before departure: 30% refund
• Less than 7 days: No refund

Some packages (honeymoon suites, exclusive resorts, group tours) may have stricter policies. These are clearly marked on the package detail page.

TravelGo-Initiated Cancellations:
If we cancel due to reasons within our control: 100% refund. For force majeure events (natural disasters, government travel bans, pandemics): full credit note or rescheduling.

Refund Processing:
Refunds are processed to the original payment method within 7–10 business days.` },
                    { id: 'conduct', title: 'Traveler Conduct', content: `By booking with TravelGo, you agree to:
• Behave respectfully towards guides, hotel staff, and other travelers
• Comply with local laws and customs of all destinations visited
• Not engage in illegal activities during your tour
• Carry all required travel documents
• Inform us of any special needs, medical conditions, or dietary requirements at the time of booking
• Arrive punctually for all scheduled activities

We reserve the right to remove travelers from tours without refund if conduct is deemed harmful, illegal, or disruptive to others.` },
                    { id: 'liability', title: 'Limitation of Liability', content: `To the maximum extent permitted by law:
• TravelGo's total liability shall not exceed the total amount paid for the specific booking giving rise to the claim
• We are not liable for indirect, incidental, or consequential damages
• We are not responsible for loss caused by third-party service providers, natural events, government actions, or circumstances beyond our reasonable control
• Travel delays, missed connections, and force majeure events are excluded from liability

We strongly recommend purchasing comprehensive travel insurance to cover unforeseen circumstances.` },
                    { id: 'ip', title: 'Intellectual Property', content: `All content on the TravelGo website — including text, graphics, logos, images, videos, itineraries, and software — is the exclusive property of TravelGo Travel Pvt. Ltd. and is protected by copyright and trademark laws.

You may not reproduce, distribute, modify, or commercially exploit any content without express written permission. Personal, non-commercial use with attribution is permitted.` },
                    { id: 'disputes', title: 'Disputes & Governing Law', content: `These Terms are governed by the laws of India. Any disputes arising from these Terms or your use of our services shall be:

1. First resolved through good-faith negotiation (30-day resolution period)
2. If unresolved, submitted to mediation under the Indian Mediation and Conciliation Rules
3. If mediation fails, subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra

For consumer disputes below ₹50,000, you may use the Online Consumer Dispute Redressal platform (consumerhelpline.gov.in).` },
                    { id: 'modifications', title: 'Modifications', content: 'TravelGo reserves the right to modify these Terms at any time. Material changes will be communicated via email and a prominent website notice at least 30 days before taking effect. Continued use of our services after the effective date constitutes acceptance of the revised Terms. We recommend reviewing this page periodically.' },
                    { id: 'contact', title: 'Contact Information', content: `For questions about these Terms:

TravelGo Travel Pvt. Ltd.
123 Travel Street, Bandra West
Mumbai 400050, Maharashtra, India

Email: legal@travelgo.com
Phone: +91 12345 67890
Business Hours: Monday–Saturday, 9AM–6PM IST

CIN: U63040MH2009PTC123456
GST: 27AABCT1234A1ZV` },
                  ].map((section) => (
                    <section key={section.id} id={section.id} className="mb-10 scroll-mt-28">
                      <h2 className="text-2xl font-semibold mb-4 pb-3" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0a192f', borderBottom: '1px solid #e8e4dc' }}>
                        {section.title}
                      </h2>
                      <p className="text-sm leading-8 whitespace-pre-line" style={{ color: '#4a4a4a' }}>
                        {section.content}
                      </p>
                    </section>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
