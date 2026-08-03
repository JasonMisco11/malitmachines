import React, { useState } from 'react';
import { Logo } from './Logo';
import { SupabaseConfigState } from '../types';

interface HeaderProps {
  currentView: 'admin' | 'customer';
  setCurrentView: (view: 'admin' | 'customer') => void;
  onOpenNewBooking: () => void;
  onOpenSupabaseConfig: () => void;
  onToggleMobileDrawer?: () => void;
  supabaseConfig: SupabaseConfigState;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  unreadNotificationsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  onOpenNewBooking,
  onOpenSupabaseConfig,
  onToggleMobileDrawer,
  supabaseConfig,
  searchQuery,
  setSearchQuery,
  unreadNotificationsCount
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#c2c6d4] px-4 md:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left Section: Mobile Menu & Logo */}
        <div className="flex items-center gap-3">
          {onToggleMobileDrawer && (
            <button 
              onClick={onToggleMobileDrawer}
              className="p-2 hover:bg-[#f3f4f5] rounded-full text-[#003f87] transition-colors md:hidden"
              aria-label="Open Navigation Drawer"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          )}

          <div 
            className="cursor-pointer"
            onClick={() => setCurrentView('admin')}
          >
            <Logo size="md" showSubtitle={false} />
          </div>

          {/* View Switcher Pills */}
          <div className="hidden lg:flex items-center bg-[#edeeef] p-1 rounded-full text-xs font-bold ml-4">
            <button
              onClick={() => setCurrentView('customer')}
              className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                currentView === 'customer' 
                  ? 'bg-[#003f87] text-white shadow-sm' 
                  : 'text-[#424752] hover:text-[#191c1d]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">storefront</span>
              Customer Portal
            </button>
            <button
              onClick={() => setCurrentView('admin')}
              className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                currentView === 'admin' 
                  ? 'bg-[#003f87] text-white shadow-sm' 
                  : 'text-[#424752] hover:text-[#191c1d]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">dashboard</span>
              Admin Operations
            </button>
          </div>
        </div>

        {/* Center Section: Global Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#727784] text-lg">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search appointments, cleaners, address..."
            className="w-full bg-[#f3f4f5] border border-transparent focus:border-[#0056b3] focus:bg-white rounded-xl pl-10 pr-4 py-2 text-sm text-[#191c1d] outline-none transition-all placeholder-[#727784]"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#727784] hover:text-[#191c1d]"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>

        {/* Right Section: Actions & Utilities */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* Supabase Status Pill */}
          <button
            onClick={onOpenSupabaseConfig}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              supabaseConfig.isConnected
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
            }`}
            title="Configure Supabase Database"
          >
            <span className={`w-2 h-2 rounded-full ${supabaseConfig.isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            {supabaseConfig.isConnected ? 'Supabase Connected' : 'Connect Supabase'}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 rounded-full hover:bg-[#f3f4f5] text-[#003f87] relative transition-colors"
              title="Notifications"
            >
              <span className="material-symbols-outlined">notifications</span>
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-[#ba1a1a] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#c2c6d4] p-4 z-50 text-sm animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#e1e3e4]">
                  <span className="font-bold text-[#191c1d]">Live Activity</span>
                  <span className="text-[10px] font-mono-code bg-[#d7e2ff] text-[#001a40] px-2 py-0.5 rounded-full font-bold">
                    {unreadNotificationsCount} NEW
                  </span>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  <div className="p-2.5 rounded-lg bg-[#f3f4f5] border-l-4 border-[#003f87]">
                    <p className="font-bold text-[#003f87] text-xs">New Booking Request</p>
                    <p className="text-xs text-[#424752]">The Grill House Resto - Kitchen Deep Clean ($450)</p>
                    <span className="text-[10px] text-[#727784]">2 mins ago</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#f3f4f5] border-l-4 border-emerald-600">
                    <p className="font-bold text-emerald-800 text-xs">Cleaner Status Update</p>
                    <p className="text-xs text-[#424752]">David Lynch is 1.2mi away from TechHub Office.</p>
                    <span className="text-[10px] text-[#727784]">12 mins ago</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#f3f4f5] border-l-4 border-blue-600">
                    <p className="font-bold text-blue-800 text-xs">Job Started</p>
                    <p className="text-xs text-[#424752]">Marcus Rivera started Penthouse A cleaning.</p>
                    <span className="text-[10px] text-[#727784]">45 mins ago</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="w-full mt-3 pt-2 border-t text-center text-xs text-[#003f87] font-bold hover:underline"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {/* New Booking Action Button */}
          <button
            onClick={onOpenNewBooking}
            className="bg-[#003f87] hover:bg-[#0056b3] text-white font-bold text-xs md:text-sm px-4 md:px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            <span>New Booking</span>
          </button>

          {/* User Profile Avatar */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#c2c6d4]">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250"
              alt="Admin Profile"
              className="w-9 h-9 rounded-full object-cover border-2 border-[#003f87]"
            />
          </div>

        </div>

      </div>

      {/* Mobile Sub-Header View Switcher */}
      <div className="flex lg:hidden items-center justify-center gap-2 mt-2 pt-2 border-t border-[#e1e3e4]">
        <button
          onClick={() => setCurrentView('admin')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all flex items-center justify-center gap-1 ${
            currentView === 'admin'
              ? 'bg-[#003f87] text-white'
              : 'bg-[#f3f4f5] text-[#424752]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">dashboard</span>
          Admin Dashboard
        </button>
        <button
          onClick={() => setCurrentView('customer')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all flex items-center justify-center gap-1 ${
            currentView === 'customer'
              ? 'bg-[#003f87] text-white'
              : 'bg-[#f3f4f5] text-[#424752]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">storefront</span>
          Customer Booking
        </button>
      </div>
    </header>
  );
};
