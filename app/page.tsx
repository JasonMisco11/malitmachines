export default function Home() {
  const galleryItems = [
    '/images/mm1.webp',
    '/images/mm3.webp',
    '/images/mm2.webp',
    '/images/photo_5771629550210060536_x.jpg'
  ];
  

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="nav-bar">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#c8102e] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6l3 1 3-1 3 1 3-1 3 1 3-1v13l-3 1-3-1-3 1-3-1-3 1-3-1z" />
                <path d="M6 7v13M12 6v13M18 7v13" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-[#1a1a1a]">
              Malit<span className="font-light ml-0.5">Machines</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6b6b6b]">
            <a href="#about" className="hover:text-[#1a1a1a] transition-colors">About</a>
            <a href="#gallery" className="hover:text-[#1a1a1a] transition-colors">Gallery</a>
            <a href="#location" className="hover:text-[#1a1a1a] transition-colors">Location</a>
          </div>
          <a href="tel:+23344749719 " className="btn-primary !py-2.5 !px-5 !text-sm !rounded-lg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <span className="hidden sm:inline">Call Now</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient texture-overlay relative pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-44 lg:pb-36" style={{ backgroundImage: 'linear-gradient(rgba(26, 26, 26, 0.8), rgba(26, 26, 26, 0.95)), url(/api/hero)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Quality Sewing{" "}
              <span className="text-[#c8102e]">Machines</span>{" "}
              You Can Trust
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-10 max-w-lg">
              From industrial workhorses to home essentials — find the perfect machine for every stitch, hem, and creation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+23344749719 " className="btn-primary !text-base !py-4 !px-8">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Call Now
              </a>
              <a href="#contact" className="btn-hero-secondary !text-base !py-4 !px-8">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                </svg>
                Save Contact
              </a>
            </div>
          </div>
        </div>
        {/* Decorative sewing thread accent */}
        <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-[0.04] pointer-events-none hidden lg:block">
          <svg viewBox="0 0 400 600" fill="none" className="w-full h-full">
            <circle cx="200" cy="300" r="180" stroke="#fff" strokeWidth="0.5" />
            <circle cx="200" cy="300" r="140" stroke="#fff" strokeWidth="0.5" />
            <circle cx="200" cy="300" r="100" stroke="#fff" strokeWidth="0.5" />
            <circle cx="200" cy="300" r="60" stroke="#fff" strokeWidth="0.5" />
            <line x1="200" y1="120" x2="200" y2="480" stroke="#fff" strokeWidth="0.5" />
            <line x1="20" y1="300" x2="380" y2="300" stroke="#fff" strokeWidth="0.5" />
          </svg>
        </div>
      </section>

      {/* About / Description Section */}
      <section id="about" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label">About Us</span>
              <h2 className="section-title">
                Your Trusted Partner in Sewing Excellence
              </h2>
              <p className="section-subtitle mb-6">
                At Malit Machines, we bring you a curated selection of high-quality sewing machines for every need — 
                whether you&apos;re a seasoned tailor, a garment manufacturer, or just starting your creative journey.
              </p>
              <p className="text-[#6b6b6b] leading-relaxed mb-8">
                We carry top brands and provide expert guidance to help you choose the perfect machine. 
                From heavy-duty industrial units to compact portable models, every machine in our collection 
                is selected for reliability, performance, and value.
              </p>
              <div className="flex gap-8">
                <div>
                  <div className="text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>500+</div>
                  <div className="text-sm text-[#999] mt-1">Machines Sold</div>
                </div>
                <div className="w-px bg-[#e5e5e5]" />
                <div>
                  <div className="text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>15+</div>
                  <div className="text-sm text-[#999] mt-1">Years Experience</div>
                </div>
                <div className="w-px bg-[#e5e5e5]" />
                <div>
                  <div className="text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>50+</div>
                  <div className="text-sm text-[#999] mt-1">Brands Available</div>
                </div>
              </div>
            </div>
            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="feature-card">
                <div className="w-12 h-12 rounded-xl bg-[#fef2f2] flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8102e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 7V5a4 4 0 00-8 0v2"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-[#1a1a1a] mb-2">Wide Selection</h3>
                <p className="text-sm text-[#999] leading-relaxed">Industrial, domestic & portable models</p>
              </div>
              <div className="feature-card">
                <div className="w-12 h-12 rounded-xl bg-[#fef2f2] flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8102e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-[#1a1a1a] mb-2">Warranty</h3>
                <p className="text-sm text-[#999] leading-relaxed">All machines backed by manufacturer warranty</p>
              </div>
              <div className="feature-card">
                <div className="w-12 h-12 rounded-xl bg-[#fef2f2] flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8102e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-[#1a1a1a] mb-2">Expert Advice</h3>
                <p className="text-sm text-[#999] leading-relaxed">Personalized help choosing the right machine</p>
              </div>
              <div className="feature-card">
                <div className="w-12 h-12 rounded-xl bg-[#fef2f2] flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8102e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-[#1a1a1a] mb-2">Repair Service</h3>
                <p className="text-sm text-[#999] leading-relaxed">Professional maintenance & repair support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 sm:py-28 bg-[#f5f3f0]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <span className="section-label">Our Collection</span>
            <h2 className="section-title mx-auto">Browse Our Machines</h2>
            <p className="section-subtitle mx-auto">
              Explore our extensive inventory of sewing machines — from compact home units to heavy-duty industrial models.
            </p>
          </div>
          <div className="gallery-grid">
            {galleryItems.map((src, index) => (
              <div key={index} className="gallery-item group relative overflow-hidden bg-[#e5e5e5]">
                <img 
                  src={src} 
                  alt={`Sewing Machine ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="text-white text-sm font-medium drop-shadow-lg">Machine #{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="section-label">Find Us</span>
              <h2 className="section-title">Visit Our Showroom</h2>
              <p className="section-subtitle mb-10">
                Come see our full range of sewing machines in person. Our knowledgeable team is ready to help you find the perfect machine.
              </p>

              {/* Contact Cards */}
              <div className="space-y-4 mb-10" id="contact">
                <div className="contact-card">
                  <div className="w-10 h-10 rounded-lg bg-[#fef2f2] flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8102e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#1a1a1a] mb-1">Address</div>
                    <div className="text-sm text-[#6b6b6b] leading-relaxed">16 Basswood Street, Madina Doku Clinic</div>
                  </div>
                </div>
                <a href="tel:+23344749719 " className="contact-card no-underline">
                  <div className="w-10 h-10 rounded-lg bg-[#fef2f2] flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8102e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#1a1a1a] mb-1">Phone</div>
                    <div className="text-sm text-[#6b6b6b]">+123 456 7890</div>
                  </div>
                </a>
                <div className="contact-card">
                  <div className="w-10 h-10 rounded-lg bg-[#fef2f2] flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8102e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#1a1a1a] mb-1">Hours</div>
                    <div className="text-sm text-[#6b6b6b]">Mon — Sat: 8:00 AM – 6:00 PM</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:+23344749719 " className="btn-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  Call Now
                </a>
                <a href="#" className="btn-secondary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Save Contact
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.5!2d-0.17!3d5.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwNDAnMTIuMCJOIDDCsDEwJzEyLjAiVw!5e0!3m2!1sen!2sgh!4v1234567890"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Malit Machines Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Main footer content */}
          <div className="py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#c8102e] flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6l3 1 3-1 3 1 3-1 3 1 3-1v13l-3 1-3-1-3 1-3-1-3 1-3-1z" />
                    <path d="M6 7v13M12 6v13M18 7v13" />
                  </svg>
                </div>
                <span className="text-lg font-bold tracking-tight text-white">
                  Malit<span className="font-light ml-0.5">Machines</span>
                </span>
              </div>
              <p className="text-sm text-[#999] leading-relaxed max-w-xs">
                Your trusted source for quality sewing machines. Serving tailors, designers, and home sewers for over 20 years.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-sm">About Us</a></li>
                <li><a href="#gallery" className="text-sm">Gallery</a></li>
                <li><a href="#location" className="text-sm">Location</a></li>
                <li><a href="#contact" className="text-sm">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">Contact Info</h4>
              <ul className="space-y-3 text-sm text-[#999]">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  16 Basswood Street, Madina Doku Clinic
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  +123 456 7890
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Mon - Sat: 8:00 AM – 6:00 PM
                </li>
              </ul>
            </div>
          </div>
          {/* Bottom bar */}
          <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#666]">
              © {new Date().getFullYear()} Malit Machines. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <a href="#" aria-label="Facebook" className="text-[#666] hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-[#666] hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" aria-label="WhatsApp" className="text-[#666] hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
