import React, { useState } from 'react';
import { Booking, Cleaner } from '../types';

interface AssignCleanerModalProps {
  booking: Booking | null;
  cleaners: Cleaner[];
  onClose: () => void;
  onAssignCleaner: (bookingId: string, cleaner: Cleaner) => void;
}

export const AssignCleanerModal: React.FC<AssignCleanerModalProps> = ({
  booking,
  cleaners,
  onClose,
  onAssignCleaner,
}) => {
  const [selectedCleanerId, setSelectedCleanerId] = useState<string>('');

  if (!booking) return null;

  const handleAssign = () => {
    const cleaner = cleaners.find((c) => c.id === selectedCleanerId);
    if (!cleaner) {
      alert('Please select a cleaner to assign.');
      return;
    }
    onAssignCleaner(booking.id, cleaner);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#c2c6d4] space-y-4 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e1e3e4]">
          <div>
            <span className="font-mono-code text-xs text-[#003f87] font-bold uppercase">{booking.id}</span>
            <h3 className="text-lg font-bold text-[#191c1d]">Assign Cleaner</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 text-[#727784]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Booking Summary */}
        <div className="bg-[#f8f9fa] p-3 rounded-xl border border-[#e1e3e4] text-xs space-y-1">
          <p className="font-bold text-[#191c1d]">{booking.customerName} - {booking.serviceType}</p>
          <p className="text-[#424752]">{booking.address}</p>
          <p className="font-mono-code text-[#003f87] font-bold">{booking.date} @ {booking.timeSlot}</p>
        </div>

        {/* Cleaner List Selector */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-[#191c1d]">Select Available Cleaner:</p>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {cleaners.map((cleaner) => {
              const isSelected = selectedCleanerId === cleaner.id;
              return (
                <div
                  key={cleaner.id}
                  onClick={() => setSelectedCleanerId(cleaner.id)}
                  className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-2 border-[#003f87] bg-blue-50/50 ring-1 ring-blue-100'
                      : 'border-[#c2c6d4] hover:bg-[#f8f9fa]'
                  }`}
                >
                  <img src={cleaner.avatar} alt={cleaner.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="font-bold text-[#191c1d] truncate">{cleaner.name}</p>
                    <p className="text-[#727784] truncate">{cleaner.role}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-amber-600 font-bold">★ {cleaner.rating}</span>
                      <span className="text-[#424752]">({cleaner.completedJobs} jobs)</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono-code font-bold px-2 py-0.5 rounded ${
                    cleaner.status === 'On Duty' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {cleaner.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-3 border-t border-[#e1e3e4] flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#727784] hover:bg-[#f3f4f5]"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            className="px-5 py-2 bg-[#003f87] hover:bg-[#0056b3] text-white font-bold text-xs rounded-xl shadow-xs"
          >
            Confirm Assignment
          </button>
        </div>

      </div>
    </div>
  );
};
