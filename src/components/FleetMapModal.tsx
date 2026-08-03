import React, { useState } from 'react';
import { Cleaner, Booking } from '../types';

interface FleetMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  cleaners: Cleaner[];
  bookings: Booking[];
}

export const FleetMapModal: React.FC<FleetMapModalProps> = ({
  isOpen,
  onClose,
  cleaners,
  bookings,
}) => {
  const [selectedPin, setSelectedPin] = useState<{ type: 'cleaner' | 'job'; item: any } | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl border border-[#c2c6d4] space-y-4 animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e1e3e4] shrink-0">
          <div>
            <span className="font-mono-code text-xs text-[#003f87] font-bold uppercase">GPS Fleet Operations</span>
            <h3 className="text-xl font-bold text-[#191c1d]">Live Cleaner Dispatch & Map Tracking</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 text-[#727784]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Map Container Simulation */}
        <div className="relative flex-1 min-h-[360px] bg-[#e7e8e9] rounded-2xl overflow-hidden border border-[#c2c6d4] p-4 flex flex-col justify-between">
          
          {/* Simulated Map Background Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#003f87 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Map Controls Top Bar */}
          <div className="relative z-10 flex justify-between items-center bg-white/90 backdrop-blur-md p-3 rounded-xl border shadow-xs text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-bold text-emerald-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                {cleaners.filter(c => c.status === 'On Duty').length} Active Cleaners
              </span>
              <span className="text-[#727784]">|</span>
              <span className="text-[#003f87] font-bold">
                {bookings.filter(b => b.status === 'In Progress').length} Jobs In Progress
              </span>
            </div>

            <span className="font-mono-code text-[11px] text-[#727784]">
              Center: Manhattan & Brooklyn Dispatch
            </span>
          </div>

          {/* Simulated GPS Pins */}
          <div className="relative z-10 flex-1 my-4 relative">
            
            {/* Cleaner Pin 1 */}
            <div
              onClick={() => setSelectedPin({ type: 'cleaner', item: cleaners[0] })}
              className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-blue-500/30 animate-ping" />
                <div className="w-10 h-10 rounded-full bg-[#003f87] text-white border-2 border-white shadow-lg flex items-center justify-center text-xs font-bold">
                  MR
                </div>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-0.5 rounded shadow text-[10px] font-bold text-[#191c1d] whitespace-nowrap">
                Marcus R. (On Duty)
              </div>
            </div>

            {/* Cleaner Pin 2 */}
            <div
              onClick={() => setSelectedPin({ type: 'cleaner', item: cleaners[1] })}
              className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            >
              <div className="relative flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white border-2 border-white shadow-lg flex items-center justify-center text-xs font-bold">
                  ES
                </div>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-0.5 rounded shadow text-[10px] font-bold text-[#191c1d] whitespace-nowrap">
                Elena S. (On Site)
              </div>
            </div>

            {/* Cleaner Pin 3 (En Route) */}
            <div
              onClick={() => setSelectedPin({ type: 'cleaner', item: cleaners[2] })}
              className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            >
              <div className="relative flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-white border-2 border-white shadow-lg flex items-center justify-center text-xs font-bold animate-bounce">
                  DL
                </div>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-0.5 rounded shadow text-[10px] font-bold text-[#191c1d] whitespace-nowrap">
                David L. (En Route 1.2mi)
              </div>
            </div>

            {/* Active Job Pins */}
            {bookings.slice(0, 3).map((b, idx) => (
              <div
                key={b.id}
                onClick={() => setSelectedPin({ type: 'job', item: b })}
                style={{ top: `${30 + idx * 22}%`, left: `${20 + idx * 25}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              >
                <div className="w-7 h-7 bg-white text-[#003f87] border-2 border-[#003f87] rounded-md shadow flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">home_pin</span>
                </div>
              </div>
            ))}

          </div>

          {/* Pin Information Popover Banner */}
          {selectedPin && (
            <div className="relative z-10 bg-white p-3 rounded-xl border shadow-md text-xs flex items-center justify-between">
              {selectedPin.type === 'cleaner' ? (
                <div className="flex items-center gap-3">
                  <img src={selectedPin.item.avatar} alt={selectedPin.item.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-[#191c1d]">{selectedPin.item.name} ({selectedPin.item.role})</p>
                    <p className="text-[#727784]">{selectedPin.item.currentTask}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="font-bold text-[#191c1d]">{selectedPin.item.customerName} - {selectedPin.item.serviceType}</p>
                  <p className="text-[#727784]">{selectedPin.item.address}</p>
                </div>
              )}
              <button
                onClick={() => setSelectedPin(null)}
                className="text-xs text-[#003f87] font-bold hover:underline ml-4"
              >
                Deselect
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 shrink-0">
          <span className="text-xs text-[#727784]">
            GPS data updates automatically every 15 seconds.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#003f87] text-white rounded-xl text-xs font-bold hover:bg-[#0056b3]"
          >
            Close Map
          </button>
        </div>

      </div>
    </div>
  );
};
