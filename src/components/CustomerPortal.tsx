import React, { useState } from 'react';
import { Booking, ServicePackage } from '../types';

interface CustomerPortalProps {
  services: ServicePackage[];
  onCreateBooking: (newBooking: Partial<Booking>) => void;
  bookings: Booking[];
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  services,
  onCreateBooking,
  bookings,
}) => {
  // Booking state
  const [selectedService, setSelectedService] = useState<ServicePackage>(services[0]);
  const [selectedDate, setSelectedDate] = useState<string>('2024-10-26');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:00 AM');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('Roomtuinjes 18, 1093 SN Amsterdam');
  const [notes, setNotes] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [lastCreatedId, setLastCreatedId] = useState<string>('');

  // Lookup state
  const [lookupQuery, setLookupQuery] = useState<string>('');
  const [foundBooking, setFoundBooking] = useState<Booking | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Modals state
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAllServicesOpen, setIsAllServicesOpen] = useState(false);

  const availableSlots = [
    { time: '08:00 AM', status: 'Available' },
    { time: '10:00 AM', status: 'Available' },
    { time: '11:30 AM', status: 'Booked' },
    { time: '12:00 PM', status: 'Available' },
    { time: '02:00 PM', status: 'Booked' },
    { time: '04:00 PM', status: 'Available' },
    { time: '06:00 PM', status: 'Available' },
  ];

  const extendedServices = [
    { title: 'Commercial Office Cleaning', category: 'Commercial', desc: 'Comprehensive desk, floor, and sanitation maintenance for modern workplaces.' },
    { title: 'Residential Regular Cleaning', category: 'Residential', desc: 'Routine dusting, vacuuming, and kitchen & bath scrubbing for busy homes.' },
    { title: 'Commercial Kitchen Deep Clean', category: 'Kitchen', desc: 'Heavy-duty degreasing, exhaust hood scrub, and health-code compliant hygiene.' },
    { title: 'Move-in / Move-out Turnover', category: 'Residential', desc: 'End-of-lease spotlessness for tenants, landlords, and real estate agents.' },
    { title: 'Deep Carpet & Upholstery Steam', category: 'Specialized', desc: 'Hot-water extraction removing deep stains, allergens, and pet odors.' },
    { title: 'High-Rise & Exterior Window Washing', category: 'Exterior', desc: 'Streak-free interior and exterior glass cleaning for corporate and residential buildings.' },
    { title: 'Post-Construction Dust Scrub', category: 'Industrial', desc: 'Removal of drywall dust, debris, paint splatters, and builder residue.' },
    { title: 'HVAC & Air Duct Sanitation', category: 'Specialized', desc: 'Eradicate indoor airborne dust, mold spores, and pollen from ventilation systems.' },
    { title: 'Medical Clinic & Lab Disinfection', category: 'Healthcare', desc: 'Hospital-grade EPA registered germicidal sanitization for patient areas.' },
    { title: 'Airbnb & Vacation Rental Prep', category: 'Hospitality', desc: 'Fast-turnaround linen changes, restock, and 5-star host cleanliness.' },
    { title: 'Gym & Sports Facility Sterilization', category: 'Specialized', desc: 'Anti-microbial equipment wipedown, locker room scrub, and mat sanitization.' },
    { title: 'Solar Panel Washing', category: 'Exterior', desc: 'De-ionized water rinse restoring maximum solar energy output efficiency.' },
  ];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !address) {
      alert('Please enter your name and service address.');
      return;
    }

    const newId = `TCS-${Math.floor(1000 + Math.random() * 9000)}`;
    onCreateBooking({
      id: newId,
      customerName,
      customerEmail,
      customerPhone,
      serviceType: selectedService.title,
      category: selectedService.category,
      address,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      price: selectedService.price,
      notes,
      status: 'Pending',
    });

    setLastCreatedId(newId);
    setBookingConfirmed(true);
  };

  const handleLookupBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const result = bookings.find(
      (b) =>
        b.id.toLowerCase() === lookupQuery.trim().toLowerCase() ||
        (b.customerEmail && b.customerEmail.toLowerCase() === lookupQuery.trim().toLowerCase()) ||
        (b.customerPhone && b.customerPhone.includes(lookupQuery.trim()))
    );
    setFoundBooking(result || null);
  };

  const scrollToBooking = () => {
    const el = document.getElementById('booking-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6">

      {/* Hero Section - Minimalist */}
      <section className="bg-white pt-8 pb-12">
        
        {/* Top Mini Header inside Landing Hero */}
        <div className="flex items-center justify-between mb-16">
          <div className="font-black text-sm md:text-base tracking-widest text-[#191c1d] uppercase">
            TURE CLEANING HOME
          </div>

          <button
            onClick={() => setIsContactOpen(true)}
            className="bg-[#003f87] text-white font-bold text-xs px-6 py-2.5 rounded-full hover:bg-[#0056b3] transition-all"
          >
            CONTACT US
          </button>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-black text-[#191c1d] leading-[1.05] tracking-tight mb-12">
          PREMIER <span className="text-[#003f87] italic font-serif">CLEANING</span><br className="hidden md:block" />
          SOLUTION
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Clean Image */}
          <div className="relative w-full max-w-lg mx-auto lg:mx-0 flex justify-center lg:justify-start">
             <img
                src="https://images.unsplash.com/photo-1584820927498-cafe3c0702d8?auto=format&fit=crop&q=80&w=800"
                alt="Cleaning Product"
                className="w-full max-w-sm h-auto object-contain mix-blend-multiply"
              />
          </div>

          {/* Right Side - Actions & Form */}
          <div className="flex flex-col w-full max-w-md mx-auto lg:ml-auto lg:mr-0 space-y-12">
            
            {/* Top right - Watch Video */}
            <button
              onClick={() => setIsVideoOpen(true)}
              className="flex items-center gap-4 font-bold text-[#191c1d] hover:opacity-80 transition-opacity w-fit lg:ml-auto"
            >
              <div className="w-12 h-12 rounded-full border-[3px] border-[#191c1d] flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">play_arrow</span>
              </div>
              <span className="text-sm">Watch Video</span>
            </button>

            {/* Ratings */}
            <div className="flex items-center gap-5 w-fit lg:ml-auto">
              <span className="text-5xl font-black text-[#003f87]">4.5</span>
              <div className="flex flex-col gap-1">
                <div className="flex items-center text-amber-400">
                  <span className="material-symbols-outlined fill-1 text-sm">star</span>
                  <span className="material-symbols-outlined fill-1 text-sm">star</span>
                  <span className="material-symbols-outlined fill-1 text-sm">star</span>
                  <span className="material-symbols-outlined fill-1 text-sm">star</span>
                  <span className="material-symbols-outlined fill-1 text-sm">star_half</span>
                </div>
                <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">326k Total Review</div>
              </div>
            </div>

            {/* GET OUR SERVICE Box */}
            <div className="bg-white border border-[#e1e3e4] p-8 rounded-[2rem] w-full shadow-sm">
              <h3 className="font-black text-sm uppercase tracking-widest text-[#191c1d] mb-6">
                GET OUR SERVICE
              </h3>
              
              <div className="space-y-4">
                <div className="relative">
                  <select
                    value={selectedService.id}
                    onChange={(e) => {
                      const s = services.find((srv) => srv.id === e.target.value);
                      if (s) setSelectedService(s);
                    }}
                    className="w-full bg-[#f8f9fa] border-none rounded-2xl px-5 py-4 text-xs text-[#191c1d] font-bold outline-none focus:ring-2 focus:ring-[#003f87] appearance-none cursor-pointer"
                  >
                    {services.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.title}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-lg">
                    expand_more
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#f8f9fa] border-none rounded-2xl px-5 py-4 text-xs text-[#191c1d] font-bold outline-none focus:ring-2 focus:ring-[#003f87] appearance-none cursor-pointer"
                  />
                </div>

                <button
                  type="button"
                  onClick={scrollToBooking}
                  className="w-full bg-[#003f87] hover:bg-[#0056b3] text-white font-extrabold py-4 rounded-2xl text-center text-xs uppercase tracking-widest transition-all mt-2"
                >
                  SEE DETAILS
                </button>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* SERVICES OFFERED Section */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-[#191c1d] uppercase tracking-tight">SERVICES OFFERED</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className={`flex flex-col justify-between transition-all group cursor-pointer ${
                selectedService.id === service.id
                  ? 'opacity-100'
                  : 'opacity-70 hover:opacity-100'
              }`}
              onClick={() => {
                setSelectedService(service);
                scrollToBooking();
              }}
            >
              <div>
                <div className={`h-48 rounded-3xl overflow-hidden mb-4 relative transition-all ${selectedService.id === service.id ? 'ring-2 ring-offset-2 ring-[#003f87]' : ''}`}>
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                <h3 className="text-lg font-black text-[#191c1d] uppercase">{service.title}</h3>
                <p className="text-xs text-[#727784] mt-1.5 leading-relaxed line-clamp-2">{service.description}</p>
              </div>
            </div>
          ))}

          {/* "25+ SERVICES YOU CAN EXPLORE" Card */}
          <div
            onClick={() => setIsAllServicesOpen(true)}
            className="border border-[#e1e3e4] rounded-3xl p-6 flex flex-col justify-center cursor-pointer hover:border-[#191c1d] transition-all group"
          >
            <h3 className="text-[3rem] leading-none font-black text-[#003f87] mb-2">
              25+
            </h3>
            <p className="text-xs font-bold text-[#191c1d] uppercase tracking-widest leading-tight pr-4">
              SERVICES YOU CAN EXPLORE
            </p>
            <div className="mt-8">
              <span className="material-symbols-outlined text-2xl group-hover:translate-x-1 transition-transform text-[#191c1d]">
                arrow_forward
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TOP CHOICE FOR CLEANING SERVICES Metric Bar */}
      <section className="py-12 border-y border-[#e1e3e4]">
        <h2 className="text-center font-black text-sm text-[#191c1d] uppercase tracking-widest mb-12">
          TOP CHOICE FOR CLEANING SERVICES
        </h2>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-center">
          <div>
            <div className="w-12 h-12 mx-auto rounded-full bg-[#f8f9fa] flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[#003f87] text-xl">check_circle</span>
            </div>
            <h4 className="text-3xl font-black text-[#191c1d]">5,500+</h4>
            <p className="text-[10px] font-bold text-[#727784] uppercase tracking-widest mt-1">Projects Completed</p>
          </div>

          <div>
            <div className="w-12 h-12 mx-auto rounded-full bg-[#f8f9fa] flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[#003f87] text-xl">thumb_up</span>
            </div>
            <h4 className="text-3xl font-black text-[#191c1d]">99%</h4>
            <p className="text-[10px] font-bold text-[#727784] uppercase tracking-widest mt-1">Satisfied Customer</p>
          </div>

          <div>
            <div className="w-12 h-12 mx-auto rounded-full bg-[#f8f9fa] flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[#003f87] text-xl">groups</span>
            </div>
            <h4 className="text-3xl font-black text-[#191c1d]">80+</h4>
            <p className="text-[10px] font-bold text-[#727784] uppercase tracking-widest mt-1">Expert Cleaner</p>
          </div>
        </div>
      </section>

      {/* Interactive Customer Booking Section */}
      <section id="booking-section" className="bg-[#f8f9fa] border border-[#e1e3e4] rounded-[2rem] p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-[#e1e3e4] gap-4">
          <div>
            <span className="font-mono-code text-xs text-[#003f87] font-extrabold uppercase tracking-wider">
              CUSTOMER BOOKING SECTION
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#191c1d] mt-1">
              Configure Your Cleaning Appointment
            </h2>
            <p className="text-xs text-[#424752]">Select date, time slot, and enter your delivery details below.</p>
          </div>

          <div className="flex items-center gap-2 bg-[#f3f4f5] px-3.5 py-2 rounded-xl border border-[#c2c6d4]">
            <span className="material-symbols-outlined text-[#003f87]">shopping_bag</span>
            <span className="text-xs font-bold text-[#191c1d]">Selected: {selectedService.title}</span>
            <span className="font-mono-code text-xs font-black text-[#003f87]">${selectedService.price}</span>
          </div>
        </div>

        {bookingConfirmed ? (
          <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-8 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto text-3xl shadow-md">
              <span className="material-symbols-outlined text-4xl">check</span>
            </div>
            <h3 className="text-2xl font-extrabold text-emerald-900">Booking Confirmed!</h3>
            <p className="text-sm text-emerald-800">
              Your appointment <span className="font-bold font-mono-code">{lastCreatedId}</span> has been dispatched to our TCS admin team.
            </p>
            <div className="bg-white p-4 rounded-xl text-left border text-xs space-y-2">
              <p><strong>Service:</strong> {selectedService.title}</p>
              <p><strong>Date & Time:</strong> {selectedDate} @ {selectedTimeSlot}</p>
              <p><strong>Location:</strong> {address}</p>
              <p><strong>Total Price:</strong> ${selectedService.price}</p>
            </div>
            <button
              onClick={() => {
                setBookingConfirmed(false);
                setCustomerName('');
              }}
              className="bg-[#003f87] text-white font-bold text-xs px-6 py-2.5 rounded-full hover:bg-[#0056b3]"
            >
              Book Another Cleaning
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirmBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Calendar & Time Slots (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Date Input */}
              <div className="bg-[#f8f9fa] border border-[#c2c6d4] p-5 rounded-2xl">
                <label className="font-bold text-sm text-[#191c1d] block mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#003f87]">calendar_month</span>
                  Select Preferred Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-white border border-[#c2c6d4] rounded-xl px-4 py-3 text-sm font-bold text-[#191c1d] outline-none focus:ring-2 focus:ring-[#003f87]"
                />
              </div>

              {/* Time Slots */}
              <div className="bg-[#f8f9fa] border border-[#c2c6d4] p-5 rounded-2xl">
                <label className="font-bold text-sm text-[#191c1d] block mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#003f87]">schedule</span>
                  Select Cleaner Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {availableSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot.time;
                    const isBooked = slot.status === 'Booked';

                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={isBooked}
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`py-3 px-3 rounded-xl text-xs font-bold font-mono-code transition-all border ${
                          isBooked
                            ? 'bg-[#e7e8e9] text-[#727784] border-transparent cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-[#003f87] text-white border-[#003f87] shadow-sm'
                            : 'bg-white text-[#191c1d] border-[#c2c6d4] hover:border-[#003f87]'
                        }`}
                      >
                        {slot.time}
                        <span className="block text-[10px] font-normal opacity-80 mt-0.5">
                          {isBooked ? 'Booked' : 'Available'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Customer Info Form */}
              <div className="bg-[#f8f9fa] border border-[#c2c6d4] p-5 rounded-2xl space-y-3">
                <label className="font-bold text-sm text-[#191c1d] block flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#003f87]">person</span>
                  Contact & Location Information
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white border border-[#c2c6d4] rounded-xl px-3.5 py-2.5 text-xs text-[#191c1d] outline-none focus:ring-2 focus:ring-[#003f87]"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-white border border-[#c2c6d4] rounded-xl px-3.5 py-2.5 text-xs text-[#191c1d] outline-none focus:ring-2 focus:ring-[#003f87]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-white border border-[#c2c6d4] rounded-xl px-3.5 py-2.5 text-xs text-[#191c1d] outline-none focus:ring-2 focus:ring-[#003f87]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Service Address *"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-white border border-[#c2c6d4] rounded-xl px-3.5 py-2.5 text-xs text-[#191c1d] outline-none focus:ring-2 focus:ring-[#003f87]"
                  />
                </div>

                <textarea
                  rows={2}
                  placeholder="Special instructions or gate/lockbox codes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white border border-[#c2c6d4] rounded-xl px-3.5 py-2.5 text-xs text-[#191c1d] outline-none focus:ring-2 focus:ring-[#003f87]"
                />
              </div>

            </div>

            {/* Service Summary Card (5 Cols) */}
            <div className="lg:col-span-5 bg-[#f8f9fa] border border-[#c2c6d4] p-6 rounded-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#191c1d] pb-2 border-b border-[#e1e3e4] flex items-center justify-between">
                  <span>Booking Summary</span>
                  <span className="text-xs bg-[#d7e2ff] text-[#001a40] px-2 py-0.5 rounded font-mono-code font-bold">LIVE</span>
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#e1e3e4]">
                    <span className="text-[#727784]">Service Package:</span>
                    <span className="font-bold text-[#191c1d]">{selectedService.title}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#e1e3e4]">
                    <span className="text-[#727784]">Selected Date:</span>
                    <span className="font-bold font-mono-code text-[#191c1d]">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#e1e3e4]">
                    <span className="text-[#727784]">Time Slot:</span>
                    <span className="font-bold font-mono-code text-[#003f87]">{selectedTimeSlot}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#e1e3e4]">
                    <span className="text-[#727784]">Location:</span>
                    <span className="font-medium text-[#191c1d] max-w-[200px] truncate text-right">
                      {address || 'Not provided'}
                    </span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#c2c6d4]">
                  <p className="text-[11px] font-bold text-[#727784] uppercase">Total Cost</p>
                  <p className="text-3xl font-black text-[#003f87] font-mono-code mt-1">
                    ${selectedService.price}.00
                  </p>
                  <p className="text-[10px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">verified</span>
                    Includes equipment, insurance & sanitization
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#003f87] hover:bg-[#0056b3] text-white font-extrabold text-sm uppercase tracking-wide py-4 rounded-xl shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>CONFIRM BOOKING NOW</span>
                <span className="material-symbols-outlined text-lg">check_circle</span>
              </button>
            </div>

          </form>
        )}
      </section>

      {/* Pricing Plans */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="font-mono-code text-xs text-[#003f87] font-extrabold uppercase tracking-widest">
            TRANSPARENT RATES
          </span>
          <h2 className="text-3xl font-extrabold text-[#191c1d] mt-1">BEST PRICING PLAN</h2>
          <p className="text-xs text-[#424752] mt-1">Flexible packages tailored for home and enterprise needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#c2c6d4] p-6 rounded-2xl space-y-4">
            <span className="font-mono-code text-xs text-[#727784] font-bold uppercase">RESIDENTIAL</span>
            <div>
              <span className="text-3xl font-extrabold text-[#003f87]">$49</span>
              <span className="text-xs text-[#727784] font-mono-code"> / monthly</span>
            </div>
            <ul className="space-y-2 text-xs text-[#424752]">
              <li>✓ Monthly Cleaning Visit</li>
              <li>✓ 2 Bathroom Deep Scrub</li>
              <li>✓ Full Surface Disinfection</li>
            </ul>
            <button onClick={scrollToBooking} className="w-full py-2.5 bg-[#f3f4f5] text-[#003f87] font-bold text-xs rounded-xl hover:bg-[#dde3ea]">
              CHOOSE PACKAGE
            </button>
          </div>

          <div className="bg-white border-2 border-[#191c1d] p-6 rounded-2xl space-y-4 relative">
            <span className="absolute top-3 right-3 bg-[#191c1d] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">BEST VALUE</span>
            <span className="font-mono-code text-xs text-[#727784] font-bold uppercase">APARTMENT</span>
            <div>
              <span className="text-3xl font-extrabold text-[#191c1d]">$69</span>
              <span className="text-xs text-[#727784] font-mono-code"> / monthly</span>
            </div>
            <ul className="space-y-2 text-xs text-[#424752]">
              <li>✓ Bi-weekly Cleaning Visits</li>
              <li>✓ Kitchen Equipment Degrease</li>
              <li>✓ Window Interior Wash</li>
            </ul>
            <button onClick={scrollToBooking} className="w-full py-2.5 bg-[#191c1d] text-white font-bold text-xs rounded-xl hover:bg-black">
              CHOOSE PACKAGE
            </button>
          </div>

          <div className="bg-white border border-[#c2c6d4] p-6 rounded-2xl space-y-4">
            <span className="font-mono-code text-xs text-[#727784] font-bold uppercase">COMMERCIAL</span>
            <div>
              <span className="text-3xl font-extrabold text-[#003f87]">$79</span>
              <span className="text-xs text-[#727784] font-mono-code"> / monthly</span>
            </div>
            <ul className="space-y-2 text-xs text-[#424752]">
              <li>✓ Weekly Commercial Maintenance</li>
              <li>✓ Floor Buffing & Trash Haul</li>
              <li>✓ 24/7 Priority Cleaner Dispatch</li>
            </ul>
            <button onClick={scrollToBooking} className="w-full py-2.5 bg-[#f3f4f5] text-[#003f87] font-bold text-xs rounded-xl hover:bg-[#dde3ea]">
              CHOOSE PACKAGE
            </button>
          </div>
        </div>
      </section>

      {/* Booking Tracker Widget */}
      <section className="bg-[#f8f9fa] border border-[#c2c6d4] rounded-2xl p-6 max-w-xl mx-auto space-y-4">
        <h3 className="text-lg font-bold text-[#191c1d] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#003f87]">search</span>
          Track Your Cleaning Booking Status
        </h3>
        
        <form onSubmit={handleLookupBooking} className="flex gap-2">
          <input
            type="text"
            required
            placeholder="Enter Booking ID (e.g. TCS-1001) or email..."
            value={lookupQuery}
            onChange={(e) => setLookupQuery(e.target.value)}
            className="flex-1 bg-white border border-[#c2c6d4] rounded-xl px-3.5 py-2 text-xs outline-none focus:ring-2 focus:ring-[#003f87]"
          />
          <button
            type="submit"
            className="bg-[#003f87] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#0056b3]"
          >
            Lookup
          </button>
        </form>

        {hasSearched && (
          <div className="pt-3 border-t border-[#e1e3e4]">
            {foundBooking ? (
              <div className="p-3 bg-white rounded-xl border text-xs space-y-1">
                <div className="flex justify-between font-bold">
                  <span>{foundBooking.id} - {foundBooking.serviceType}</span>
                  <span className="text-[#003f87] font-mono-code">{foundBooking.status}</span>
                </div>
                <p className="text-[#727784]">{foundBooking.date} @ {foundBooking.timeSlot}</p>
                <p className="text-[#424752]">{foundBooking.address}</p>
              </div>
            ) : (
              <p className="text-xs text-[#ba1a1a] font-semibold">No booking found for "{lookupQuery}".</p>
            )}
          </div>
        )}
      </section>

      {/* Video Demonstration Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-[#c2c6d4] animate-in fade-in zoom-in-95">
            <div className="p-4 bg-[#003f87] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">play_circle</span>
                <span className="font-bold text-sm">Ture Cleaning Demonstration Video</span>
              </div>
              <button onClick={() => setIsVideoOpen(false)} className="hover:opacity-80">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1200"
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 bg-black/30">
                  <div className="w-16 h-16 rounded-full bg-[#003f87] flex items-center justify-center shadow-lg text-white mb-2 cursor-pointer hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">play_arrow</span>
                  </div>
                  <h4 className="font-bold text-lg">Hospital-Grade Sanitize Protocol</h4>
                  <p className="text-xs text-gray-200 max-w-md mt-1">
                    See how our certified cleaners sterilize surfaces and deep-clean commercial facilities.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsVideoOpen(false)}
                  className="bg-[#003f87] text-white text-xs font-bold px-5 py-2 rounded-xl"
                >
                  Close Video
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Us Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-[#c2c6d4] space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#e1e3e4]">
              <h3 className="font-extrabold text-lg text-[#191c1d] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#003f87]">support_agent</span>
                Contact Ture Cleaning
              </h3>
              <button onClick={() => setIsContactOpen(false)} className="text-[#727784] hover:text-black">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#c2c6d4] flex items-center gap-3">
                <span className="material-symbols-outlined text-[#003f87] text-xl">phone</span>
                <div>
                  <p className="font-bold text-[#191c1d]">Customer Hotline</p>
                  <p className="text-[#727784] font-mono-code">+1 (800) 555-TURE (8873)</p>
                </div>
              </div>

              <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#c2c6d4] flex items-center gap-3">
                <span className="material-symbols-outlined text-[#003f87] text-xl">mail</span>
                <div>
                  <p className="font-bold text-[#191c1d]">Support Email</p>
                  <p className="text-[#727784] font-mono-code">support@turecleaning.com</p>
                </div>
              </div>

              <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#c2c6d4] flex items-center gap-3">
                <span className="material-symbols-outlined text-[#003f87] text-xl">location_on</span>
                <div>
                  <p className="font-bold text-[#191c1d]">Headquarters</p>
                  <p className="text-[#727784]">Roomtuinjes 18, 1093 SN Amsterdam</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsContactOpen(false)}
              className="w-full bg-[#003f87] text-white font-bold py-3 rounded-xl text-xs hover:bg-[#0056b3]"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* 25+ Extended Services Catalog Modal */}
      {isAllServicesOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl p-6 shadow-2xl border border-[#c2c6d4] max-h-[85vh] overflow-y-auto space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#e1e3e4]">
              <div>
                <span className="font-mono-code text-[10px] text-[#003f87] font-bold uppercase">FULL CATALOG</span>
                <h3 className="font-extrabold text-xl text-[#191c1d]">25+ Cleaning Specializations</h3>
              </div>
              <button onClick={() => setIsAllServicesOpen(false)} className="text-[#727784] hover:text-black">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {extendedServices.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#f8f9fa] border border-[#c2c6d4] space-y-1 hover:border-[#003f87] transition-all">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold text-[#191c1d]">{item.title}</span>
                    <span className="text-[10px] bg-[#d7e2ff] text-[#001a40] px-2 py-0.5 rounded font-mono-code font-bold">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#727784] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#e1e3e4] flex justify-between items-center">
              <span className="text-xs text-[#727784]">Need custom enterprise cleaning contracts?</span>
              <button
                onClick={() => {
                  setIsAllServicesOpen(false);
                  scrollToBooking();
                }}
                className="bg-[#003f87] text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-[#0056b3]"
              >
                Go to Booking Section
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

