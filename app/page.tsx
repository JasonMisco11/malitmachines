import React from 'react';
import SaveContactButton from './components/SaveContactButton';
import CallbackForm from './components/CallbackForm';
import productsData from '../public/images/machines/products.json';

export default function Home() {
  const featuredProducts = productsData;

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-[#1a1a1a]">
      {/* Utility Top Bar */}
      <div className="bg-[#1a1a1a] text-white text-xs sm:text-sm py-2">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#ab8b65]">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <div className="flex items-center gap-1.5 font-medium">
              <a href="tel:0244749719" className="hover:text-[#ab8b65] transition-colors">0244749719</a>
              <span className="opacity-50 text-gray-500">/</span>
              <a href="tel:0209929990" className="hover:text-[#ab8b65] transition-colors">0209929990</a>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <SaveContactButton />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex-shrink-0">
              <img src="/images/logo.png" alt="Malit Machines Logo" className="h-12 w-auto" />
            </a>

            {/* Desktop Categories */}
            <div className="hidden lg:flex items-center gap-8 text-[13px] font-bold tracking-wider text-[#1a1a1a] uppercase">
              <a href="#gallery" className="hover:text-[#c8102e] transition-colors py-8 border-b-2 border-transparent hover:border-[#c8102e]">Manual</a>
              <a href="#gallery" className="hover:text-[#c8102e] transition-colors py-8 border-b-2 border-transparent hover:border-[#c8102e]">Automatic</a>
              <a href="#gallery" className="hover:text-[#c8102e] transition-colors py-8 border-b-2 border-transparent hover:border-[#c8102e]">Knitting</a>
              <a href="#gallery" className="hover:text-[#c8102e] transition-colors py-8 border-b-2 border-transparent hover:border-[#c8102e]">Parts</a>
              <a href="#gallery" className="hover:text-[#c8102e] transition-colors py-8 border-b-2 border-transparent hover:border-[#c8102e]">Accessories</a>
              <a href="#gallery" className="hover:text-[#c8102e] transition-colors py-8 border-b-2 border-transparent hover:border-[#c8102e]">Gallery</a>
            </div>

            {/* Right Icons removed */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-4xl sm:text-6xl font-bold uppercase tracking-tight mb-4">
              Malit Machines
            </h1>
            <p className="text-[#ab8b65] text-lg sm:text-xl font-medium tracking-widest uppercase mb-4">
              The Number 1 supplier in Ghana
            </p>
            <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-md mx-auto lg:mx-0">
              From manual and automatic sewing machines to knitting machines, Malit Machines supplies reliable equipment for tailors, fashion designers, manufacturers, and entrepreneurs across Ghana.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <SaveContactButton className="bg-[#ab8b65] hover:bg-[#927552] text-white text-sm font-bold uppercase tracking-widest py-4 px-8 transition-colors w-full sm:w-auto flex justify-center items-center gap-2" />
              <a 
                href={`https://wa.me/233244749719?text=${encodeURIComponent("Hello Malit Machines, I would like to inquire about your sewing machines.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#222] hover:bg-[#333] border border-[#333] text-white text-sm font-bold uppercase tracking-widest py-4 px-8 transition-colors w-full sm:w-auto text-center"
              >
                Inquire Now
              </a>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center relative w-full">
            {/* Blurred glowing backdrop matching the typical image color to soften edges */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/20 blur-[100px] rounded-full pointer-events-none"></div>
            
            <img 
              src="https://res.cloudinary.com/dm2jtckdc/image/upload/v1787577953/hero_up4lvk.png" 
              alt="Featured Sewing Machine" 
              className="relative z-10 max-w-full h-auto drop-shadow-2xl"
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
          </div>
        </div>
      </section>

      {/* Featured Categories (3 Blocks) */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="#gallery" className="group block relative h-64 bg-[#222] overflow-hidden flex items-center">
            <div className="absolute inset-0 bg-black/40 z-10 transition-colors group-hover:bg-black/20" />
            <div className="relative z-20 p-8 w-1/2">
              <h3 className="text-white text-2xl font-bold mb-3">MANUAL</h3>
              <div className="flex items-center text-white/80 text-sm font-semibold tracking-wide uppercase group-hover:text-white transition-colors">
                <span className="w-4 h-[2px] bg-[#ab8b65] mr-3"></span>
                View Products
              </div>
            </div>
            <div className="absolute right-[-20%] top-1/2 -translate-y-1/2 w-3/4 h-3/4 transition-transform duration-500 group-hover:scale-110">
              <img src="/images/mm2.webp" className="w-full h-full object-contain opacity-80" alt="Manual" />
            </div>
          </a>

          <a href="#gallery" className="group block relative h-64 bg-[#c8102e] overflow-hidden flex items-center">
            <div className="absolute inset-0 bg-black/10 z-10 transition-colors group-hover:bg-transparent" />
            <div className="relative z-20 p-8 w-1/2">
              <h3 className="text-white text-2xl font-bold mb-3">AUTOMATIC</h3>
              <div className="flex items-center text-white/90 text-sm font-semibold tracking-wide uppercase group-hover:text-white transition-colors">
                <span className="w-4 h-[2px] bg-white mr-3"></span>
                View Products
              </div>
            </div>
            <div className="absolute right-[-20%] top-1/2 -translate-y-1/2 w-3/4 h-3/4 transition-transform duration-500 group-hover:scale-110">
              <img src="/images/mm1.webp" className="w-full h-full object-contain drop-shadow-xl" alt="Automatic" />
            </div>
          </a>

          <a href="#gallery" className="group block relative h-64 bg-fff overflow-hidden flex items-center">
            <div className="absolute inset-0 bg-black/5 z-10 transition-colors group-hover:bg-transparent" />
            <div className="relative z-20 p-8 w-1/2">
              <h3 className="text-[#1a1a1a] text-2xl font-bold mb-3">KNITTING</h3>
              <div className="flex items-center text-[#1a1a1a]/80 text-sm font-semibold tracking-wide uppercase group-hover:text-[#1a1a1a] transition-colors">
                <span className="w-4 h-[2px] bg-[#1a1a1a] mr-3"></span>
                View Products
              </div>
            </div>
            <div className="absolute right-[-20%] top-1/2 -translate-y-1/2 w-3/4 h-3/4 transition-transform duration-500 group-hover:scale-110">
               <img src="/images/knitting-image.jpeg" className="w-full h-full object-contain mix-blend-multiply" alt="Knitting" />
            </div>
          </a>
        </div>
      </section>

      {/* Machine Gallery Grid */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-5 sm:px-8" id="gallery">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest mb-4">Machine Gallery</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            Browse our full catalog of high-quality sewing and interlock machines. Find the perfect fit for your craft.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div key={index} className="group border border-gray-100 hover:border-gray-200 p-6 flex flex-col items-center text-center transition-shadow hover:shadow-lg bg-white">
              <div className="h-48 w-full mb-6 relative overflow-hidden">
                <img 
                  src={product.src} 
                  alt={product.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="font-bold text-[#1a1a1a] text-[15px] mb-2 px-2">{product.title}</h3>
              <p className="text-xs text-gray-400 font-medium tracking-wider mb-6 uppercase">{product.sku}</p>
              <a 
                href={`https://wa.me/233244749719?text=${encodeURIComponent(`Hello Malit Machines, I am interested in the ${product.title} (SKU: ${product.sku}). Could you please provide more information and pricing?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a1a1a] hover:bg-[#333] text-white text-xs font-bold uppercase tracking-widest py-3 px-8 w-full mt-auto transition-colors block text-center"
              >
                Inquire Now
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry Section */}
      <section className="bg-[#fcf8f6] py-16 border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Need Help Choosing a Machine?</h2>
          <p className="text-gray-500 text-sm mb-8">Leave your contact details and our experts will get back to you with custom advice and pricing.</p>
          <CallbackForm />
        </div>
      </section>

      {/* Location / Map Section */}
      <section className="border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-10 lg:p-20 flex flex-col justify-center bg-[#fcf8f6]">
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest mb-6">Visit Our Showroom</h2>
            <p className="text-gray-500 mb-8 max-w-md leading-relaxed text-sm sm:text-base">
              Come see our full range of manual, automatic, and knitting machines in person. Our experts are ready to help you find the perfect fit.
            </p>
            <div className="space-y-4 text-sm font-medium text-gray-700">
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ab8b65]"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                16 Basswood Street, Madina Doku Clinic, Accra, Ghana
              </div>
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ab8b65]"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Mon - Sat: 8:00 AM – 6:00 PM
              </div>
            </div>
          </div>
          <div className="h-[400px] lg:h-auto min-h-[400px] relative bg-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.5!2d-0.17!3d5.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwNDAnMTIuMCJOIDDCsDEwJzEyLjAiVw!5e0!3m2!1sen!2sgh!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', inset: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Malit Machines Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400">Contact Us</h4>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#ab8b65]"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>16 Basswood Street,<br/>Madina Doku Clinic</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#ab8b65]"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  0244749719 | 0209929990
                </li>
                <li className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#ab8b65]"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  imranmalit@gmail.com
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400">About Malit Machines</h4>
              <div className="text-sm text-gray-300 leading-relaxed space-y-3">
                <p className="text-white font-semibold">The Machines Behind Great Work.</p>
                <p>Arguably the best supplier in Ghana.</p>
                <p>
                  We provide quality sewing machines built for precision, reliability, and performance. From <strong className="text-white">manual to automatic and knitting machines</strong>, we have the right equipment for your craft.
                </p>
                <p>We don't just sell machines — <strong className="text-white">we help you find the right machine for the work you do.</strong></p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400">Shop With Confidence</h4>
              <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
                <li>Manual Sewing Machines</li>
                <li>Automatic Sewing Machines</li>
                <li>Knitting Machines</li>
                <li>For Professionals & Businesses</li>
                <li>Competitive Prices</li>
              </ul>
              <p className="mt-6 text-[#ab8b65] font-semibold text-sm italic">
                Malit Machines - Powering Your Craft.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400">Follow Us</h4>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#c8102e] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#c8102e] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#c8102e] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33 2.78 2.78 0 001.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Malit Machines. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/privacy-policy" className="hover:text-gray-300">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-gray-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
