import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';

const SECTIONS = [
  { id: 'information', title: 'Information We Collect' },
  { id: 'use', title: 'How We Use Your Information' },
  { id: 'sharing', title: 'Information Sharing' },
  { id: 'cookies', title: 'Cookies & Tracking' },
  { id: 'security', title: 'Data Security' },
  { id: 'rights', title: 'Your Rights' },
  { id: 'retention', title: 'Data Retention' },
  { id: 'children', title: 'Children\'s Privacy' },
  { id: 'changes', title: 'Policy Changes' },
  { id: 'contact', title: 'Contact Us' },
];

export default function Privacy() {
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
        title="Privacy Policy"
        description="Learn how TravelGo collects, uses, and protects your personal information. Your privacy and data security are our top priority."
        canonical="/privacy"
      />
      <div className="min-h-screen page-enter" style={{ background: '#ffffff' }}>
        <PageHero
          badge="Legal"
          title="Privacy Policy"
          subtitle="Last updated: January 1, 2025"
          image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=50"
        />

        <section className="py-16" style={{ background: '#ffffff' }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex gap-12">

              {/* Sticky TOC */}
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-28 rounded-2xl p-6" style={{ background: '#fff', boxShadow: '0 4px 24px rgba(10,25,47,0.06)' }}>
                  <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#b8975a' }}>Contents</p>
                  <nav aria-label="Privacy policy sections">
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
                    At TravelGo ("we", "us", "our"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                  </p>

                  {[
                    { id: 'information', title: 'Information We Collect', content: `We collect information you provide directly, such as:
• Personal identification (name, email address, phone number, date of birth)
• Payment information (processed securely through PCI-DSS compliant gateways — we never store card details)
• Travel preferences, passport details, and visa information for booking purposes
• Communication records when you contact our support team
• Profile information when you create an account

We also automatically collect:
• Device and browser information, IP address, and operating system
• Pages visited, links clicked, and time spent on our website
• Booking and search history to personalize your experience` },
                    { id: 'use', title: 'How We Use Your Information', content: `We use your information to:
• Process and confirm tour bookings and payments
• Provide customer support and respond to inquiries
• Send booking confirmations, travel documents, and updates
• Personalize your experience and recommend relevant packages
• Send promotional offers and newsletters (with your consent — you can unsubscribe anytime)
• Improve our website, products, and services
• Comply with legal obligations and prevent fraud` },
                    { id: 'sharing', title: 'Information Sharing', content: `We do not sell or rent your personal information. We share data only with:
• Travel service providers (hotels, airlines, tour operators) necessary to fulfill your booking
• Payment processors for secure transaction handling
• Government authorities when required by law
• Analytics providers (data anonymized) to improve our services

All third parties are contractually bound to maintain confidentiality and cannot use your data for their own marketing purposes.` },
                    { id: 'cookies', title: 'Cookies & Tracking', content: `We use cookies and similar technologies to:
• Keep you logged in and remember preferences
• Analyze website traffic and performance (Google Analytics, anonymized)
• Enable social media sharing features
• Deliver relevant advertising (you can opt out at any time)

You can control cookies through your browser settings. Disabling essential cookies may affect website functionality. Visit our Cookie Settings page to manage your preferences.` },
                    { id: 'security', title: 'Data Security', content: `We implement industry-standard security measures:
• SSL/TLS encryption for all data transmission
• PCI-DSS compliant payment processing
• Regular security audits and penetration testing
• Two-factor authentication for admin accounts
• Encrypted database storage for sensitive data

No method of transmission over the Internet is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.` },
                    { id: 'rights', title: 'Your Rights', content: `Under GDPR and applicable data protection laws, you have the right to:
• Access: Request a copy of all personal data we hold about you
• Rectification: Correct any inaccurate or incomplete data
• Erasure: Request deletion of your data ("right to be forgotten")
• Portability: Receive your data in a structured, machine-readable format
• Objection: Object to processing of your data for marketing purposes
• Withdrawal: Withdraw consent at any time

To exercise these rights, email privacy@travelgo.com. We will respond within 30 days.` },
                    { id: 'retention', title: 'Data Retention', content: `We retain your data for as long as necessary:
• Active account data: Duration of your account plus 3 years
• Booking records: 7 years (legal and tax compliance)
• Marketing data: Until you unsubscribe or request deletion
• Support communications: 2 years

When data is no longer needed, it is securely deleted or anonymized.` },
                    { id: 'children', title: "Children's Privacy", content: "Our services are not directed to children under 18. We do not knowingly collect personal information from minors. If you believe a child has provided us with personal information, please contact us immediately at privacy@travelgo.com and we will delete such information promptly." },
                    { id: 'changes', title: 'Policy Changes', content: "We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes via email or a prominent notice on our website at least 30 days before they take effect. Continued use of our services after changes constitutes acceptance of the updated policy." },
                    { id: 'contact', title: 'Contact Us', content: `For privacy-related questions or to exercise your rights:

Email: privacy@travelgo.com
Post: Data Protection Officer, TravelGo, 123 Travel Street, Bandra West, Mumbai 400050, India
Phone: +91 12345 67890 (Mon–Sat, 9AM–6PM IST)

Response time: Within 3 business days for general inquiries, within 30 days for formal data requests.` },
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
