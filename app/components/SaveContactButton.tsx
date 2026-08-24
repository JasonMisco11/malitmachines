"use client";

import React from 'react';

export default function SaveContactButton() {
  const handleSaveContact = () => {
    // Generate vCard
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Malit Machines
ORG:Malit Machines
TEL;TYPE=WORK,VOICE:0244749719
TEL;TYPE=WORK,VOICE:0209929990
EMAIL;TYPE=PREF,INTERNET:imranmalit@gmail.com
END:VCARD`;

    // Detect iOS to open in a new tab (Safari handles data URIs for vCards better this way)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    if (isIOS) {
      window.location.href = url;
    } else {
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'MalitMachines.vcf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <button 
      onClick={handleSaveContact} 
      className="flex items-center gap-1.5 hover:text-gray-300 transition-colors cursor-pointer"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
        <polyline points="17 21 17 13 7 13 7 21"></polyline>
        <polyline points="7 3 7 8 15 8"></polyline>
      </svg>
      Save Contact
    </button>
  );
}
