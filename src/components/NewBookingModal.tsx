import React, { useState } from 'react';
import { Booking, ServicePackage, Cleaner } from '../types';

interface NewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServicePackage[];
  cleaners: Cleaner[];
  onCreateBooking: (newBooking: Partial<Booking>) => void;
}

export const NewBookingModal: React.FC<NewBookingModalProps> = ({
  isOpen,
  onClose,
  services,
  cleaners,
  onCreateBooking,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || '');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('2024-10-24');
  const [timeSlot, setTimeSlot] = useState('09:00 AM');
  const [selectedCleanerId, setSelectedCleanerId] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !address) {
      alert('Please fill out customer name and address.');
      return;
    }

    const assignedCleaner = cleaners.find((c) => c.id === selectedCleanerId);

    onCreateBooking({
      id: `TCS-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      customerPhone,
      customerEmail,
      serviceType: currentService.title,
      category: currentService.category,
      address,
      date,
      timeSlot,
      price: currentService.price,
      notes,
      status: assignedCleaner ? 'Assigned' : 'Pending',
      assignedCleaners: assignedCleaner ? [assignedCleaner] : [],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-[#c2c6d4] space-y-6 animate-in fade-in zoom-in-95 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e1e3e4]">
          <div>
            <span className="font-mono-code text-xs text-[#003f87] font-bold uppercase">Admin Dispatch</span>
            <h3 className="text-xl font-bold text-[#191c1d]">Create New Service Booking</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 text-[#727784]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Service Selection */}
          <div>
            <label className="font-bold text-[#191c1d] block mb-1">Select Service Package *</label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full bg-[#f8f9fa] border border-[#c2c6d4] rounded-xl px-3 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#003f87]"
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} (${s.price}) - {s.category}
                </option>
              ))}
            </select>
          </div>

          {/* Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#191c1d] block mb-1">Customer Name *</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full bg-[#f8f9fa] border border-[#c2c6d4] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#003f87]"
              />
            </div>
            <div>
              <label className="font-bold text-[#191c1d] block mb-1">Phone Number</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-[#f8f9fa] border border-[#c2c6d4] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#003f87]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#191c1d] block mb-1">Service Address *</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full street address, suite/apt..."
              className="w-full bg-[#f8f9fa] border border-[#c2c6d4] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#003f87]"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#191c1d] block mb-1">Schedule Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#f8f9fa] border border-[#c2c6d4] rounded-xl px-3 py-2 font-mono-code outline-none focus:ring-2 focus:ring-[#003f87]"
              />
            </div>
            <div>
              <label className="font-bold text-[#191c1d] block mb-1">Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-[#f8f9fa] border border-[#c2c6d4] rounded-xl px-3 py-2 font-mono-code outline-none focus:ring-2 focus:ring-[#003f87]"
              >
                <option value="08:00 AM">08:00 AM</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="11:30 PM">11:30 PM</option>
              </select>
            </div>
          </div>

          {/* Assign Cleaner Optional */}
          <div>
            <label className="font-bold text-[#191c1d] block mb-1">Assign Cleaner (Optional)</label>
            <select
              value={selectedCleanerId}
              onChange={(e) => setSelectedCleanerId(e.target.value)}
              className="w-full bg-[#f8f9fa] border border-[#c2c6d4] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#003f87]"
            >
              <option value="">-- Unassigned (Assign Later) --</option>
              {cleaners.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.status}) - Rating {c.rating}★
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-[#191c1d] block mb-1">Special Notes / Access Code</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Entry code, pet warnings, focus areas..."
              className="w-full bg-[#f8f9fa] border border-[#c2c6d4] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#003f87]"
            />
          </div>

          <div className="pt-4 border-t border-[#e1e3e4] flex items-center justify-between">
            <span className="font-mono-code font-extrabold text-base text-[#003f87]">
              Total: ${currentService.price}
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#727784] hover:bg-[#f3f4f5]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#003f87] hover:bg-[#0056b3] text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Create Booking
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
