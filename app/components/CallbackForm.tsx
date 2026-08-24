"use client";

import React, { useState } from 'react';

export default function CallbackForm() {
  const [contact, setContact] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;

    // Use mailto to send the request directly to the business email
    const subject = encodeURIComponent('New Callback / Inquiry Request');
    const body = encodeURIComponent(`Hello Malit Machines,\n\nPlease contact me back with advice and pricing.\n\nMy contact details: ${contact}\n\nThanks!`);
    
    window.location.href = `mailto:imranmalit@gmail.com?subject=${subject}&body=${body}`;
    
    // Optional: Clear the form after a short delay
    setTimeout(() => setContact(''), 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
      <input 
        type="text" 
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="Your Phone / WhatsApp or Email" 
        className="flex-1 border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#ab8b65]"
        required
      />
      <button type="submit" className="bg-[#ab8b65] hover:bg-[#927552] text-white text-sm font-bold uppercase tracking-widest py-3 px-8 transition-colors">
        Request Callback
      </button>
    </form>
  );
}
