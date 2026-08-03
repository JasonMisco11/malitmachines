import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AdminDashboard } from './components/AdminDashboard';
import { CustomerPortal } from './components/CustomerPortal';
import { NewBookingModal } from './components/NewBookingModal';
import { AssignCleanerModal } from './components/AssignCleanerModal';
import { FleetMapModal } from './components/FleetMapModal';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { Booking, Cleaner, ServicePackage, SupabaseConfigState, DashboardStats } from './types';
import { INITIAL_BOOKINGS, INITIAL_CLEANERS, INITIAL_SERVICES, INITIAL_STATS } from './data/initialData';
import { getStoredSupabaseConfig, getSupabaseClient } from './lib/supabase';

export default function App() {
  const [currentView, setCurrentView] = useState<'admin' | 'customer'>('customer');
  const [searchQuery, setSearchQuery] = useState('');

  // Data Stores
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('tcs_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [cleaners, setCleaners] = useState<Cleaner[]>(() => {
    const saved = localStorage.getItem('tcs_cleaners');
    return saved ? JSON.parse(saved) : INITIAL_CLEANERS;
  });

  const [services] = useState<ServicePackage[]>(INITIAL_SERVICES);
  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfigState>(getStoredSupabaseConfig());

  // Modal States
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [assigningBooking, setAssigningBooking] = useState<Booking | null>(null);
  const [isFleetMapOpen, setIsFleetMapOpen] = useState(false);
  const [isSupabaseConfigOpen, setIsSupabaseConfigOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('tcs_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('tcs_cleaners', JSON.stringify(cleaners));
  }, [cleaners]);

  // Attempt sync with Supabase if configured
  useEffect(() => {
    const client = getSupabaseClient();
    if (client) {
      client
        .from('bookings')
        .select('*')
        .then(({ data, error }) => {
          if (!error && data && data.length > 0) {
            console.log('Fetched bookings from Supabase:', data.length);
          }
        });
    }
  }, [supabaseConfig]);

  // Derived Dashboard Stats
  const stats: DashboardStats = {
    ...INITIAL_STATS,
    todayJobs: bookings.length,
    pendingRequests: bookings.filter((b) => b.status === 'Pending').length,
    activeJobs: bookings.filter((b) => b.status === 'In Progress' || b.status === 'Assigned').length,
    onDutyCleaners: cleaners.filter((c) => c.status === 'On Duty').length,
  };

  // Handlers
  const handleCreateBooking = (newBookingData: Partial<Booking>) => {
    const fullBooking: Booking = {
      id: newBookingData.id || `TCS-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: newBookingData.customerName || 'Anonymous Customer',
      customerPhone: newBookingData.customerPhone || '',
      customerEmail: newBookingData.customerEmail || '',
      serviceType: newBookingData.serviceType || 'Standard Cleaning',
      category: newBookingData.category || 'REGULAR',
      address: newBookingData.address || 'Standard Location',
      date: newBookingData.date || new Date().toISOString().split('T')[0],
      timeSlot: newBookingData.timeSlot || '10:00 AM',
      durationHours: 3,
      status: newBookingData.status || 'Pending',
      assignedCleaners: newBookingData.assignedCleaners || [],
      price: newBookingData.price || 150,
      notes: newBookingData.notes || '',
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [fullBooking, ...prev]);

    // Backend API sync call
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullBooking),
    }).catch((e) => console.warn('Local Express server sync fallback:', e));
  };

  const handleAssignCleaner = (bookingId: string, cleaner: Cleaner) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            status: 'Assigned',
            assignedCleaners: [cleaner],
          };
        }
        return b;
      })
    );

    // Backend API sync call
    fetch(`/api/bookings/${bookingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Assigned', assignedCleaners: [cleaner] }),
    }).catch((e) => console.warn('Express server sync fallback:', e));
  };

  const handleUpdateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );

    fetch(`/api/bookings/${bookingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch((e) => console.warn('Express server sync fallback:', e));
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (confirm(`Are you sure you want to delete booking ${bookingId}?`)) {
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' }).catch((e) =>
        console.warn('Express server sync fallback:', e)
      );
    }
  };

  const pendingCount = bookings.filter((b) => b.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] flex flex-col font-sans">
      
      {/* Top Main Navigation Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenNewBooking={() => setIsNewBookingOpen(true)}
        onOpenSupabaseConfig={() => setIsSupabaseConfigOpen(true)}
        supabaseConfig={supabaseConfig}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        unreadNotificationsCount={pendingCount}
      />

      {/* Main Canvas View Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6">
        {currentView === 'admin' ? (
          <AdminDashboard
            bookings={bookings}
            cleaners={cleaners}
            stats={stats}
            onOpenAssignModal={(booking) => setAssigningBooking(booking)}
            onOpenFleetMap={() => setIsFleetMapOpen(true)}
            onOpenNewBooking={() => setIsNewBookingOpen(true)}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onDeleteBooking={handleDeleteBooking}
            searchQuery={searchQuery}
          />
        ) : (
          <CustomerPortal
            services={services}
            onCreateBooking={handleCreateBooking}
            bookings={bookings}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#c2c6d4] py-8 px-4 md:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#727784]">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-[#003f87] text-base">TCS</span>
            <span>© 2026 Ture Cleaning Services. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSupabaseConfigOpen(true)}
              className="hover:text-[#003f87] font-medium"
            >
              Supabase Backend Settings
            </button>
            <a href="#" className="hover:text-[#003f87]">Support</a>
            <a href="#" className="hover:text-[#003f87]">Privacy Policy</a>
            <a href="#" className="hover:text-[#003f87]">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <NewBookingModal
        isOpen={isNewBookingOpen}
        onClose={() => setIsNewBookingOpen(false)}
        services={services}
        cleaners={cleaners}
        onCreateBooking={handleCreateBooking}
      />

      <AssignCleanerModal
        booking={assigningBooking}
        cleaners={cleaners}
        onClose={() => setAssigningBooking(null)}
        onAssignCleaner={handleAssignCleaner}
      />

      <FleetMapModal
        isOpen={isFleetMapOpen}
        onClose={() => setIsFleetMapOpen(false)}
        cleaners={cleaners}
        bookings={bookings}
      />

      <SupabaseConfigModal
        isOpen={isSupabaseConfigOpen}
        onClose={() => setIsSupabaseConfigOpen(false)}
        config={supabaseConfig}
        onUpdateConfig={setSupabaseConfig}
      />

      {/* Floating Action Button for Mobile Admin Dispatch */}
      <button
        onClick={() => setIsNewBookingOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#003f87] text-white rounded-full shadow-xl flex items-center justify-center z-40 hover:bg-[#0056b3] active:scale-90 transition-all border-2 border-white md:hidden"
        title="Add New Booking"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>

    </div>
  );
}
