"use client";

import React, { useState, useEffect } from 'react';
import { AdminDashboard } from '@/src/components/AdminDashboard';
import { Header } from '@/src/components/Header';
import { NewBookingModal } from '@/src/components/NewBookingModal';
import { AssignCleanerModal } from '@/src/components/AssignCleanerModal';
import { FleetMapModal } from '@/src/components/FleetMapModal';
import { SupabaseConfigModal } from '@/src/components/SupabaseConfigModal';
import { Booking, Cleaner, ServicePackage, SupabaseConfigState, DashboardStats } from '@/src/types';
import { INITIAL_BOOKINGS, INITIAL_CLEANERS, INITIAL_SERVICES, INITIAL_STATS } from '@/src/data/initialData';
import { getStoredSupabaseConfig, getSupabaseClient } from '@/src/lib/supabase';

export default function AdminPage() {
  const [currentView, setCurrentView] = useState<'admin' | 'customer'>('admin');
  const [searchQuery, setSearchQuery] = useState('');

  // Data Stores
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [services] = useState<ServicePackage[]>([]);
  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfigState>({ url: '', anonKey: '', isConfigured: false });

  // Modal States
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [assigningBooking, setAssigningBooking] = useState<Booking | null>(null);
  const [isFleetMapOpen, setIsFleetMapOpen] = useState(false);
  const [isSupabaseConfigOpen, setIsSupabaseConfigOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedBookings = localStorage.getItem('tcs_bookings');
    setBookings(savedBookings ? JSON.parse(savedBookings) : INITIAL_BOOKINGS);
    const savedCleaners = localStorage.getItem('tcs_cleaners');
    setCleaners(savedCleaners ? JSON.parse(savedCleaners) : INITIAL_CLEANERS);
    setSupabaseConfig(getStoredSupabaseConfig());
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('tcs_bookings', JSON.stringify(bookings));
      localStorage.setItem('tcs_cleaners', JSON.stringify(cleaners));
    }
  }, [bookings, cleaners, isMounted]);

  // Derived Dashboard Stats
  const stats: DashboardStats = {
    ...INITIAL_STATS,
    todayJobs: bookings.length,
    pendingRequests: bookings.filter((b) => b.status === 'Pending').length,
    activeJobs: bookings.filter((b) => b.status === 'In Progress' || b.status === 'Assigned').length,
    onDutyCleaners: cleaners.filter((c) => c.status === 'On Duty').length,
  };

  const handleUpdateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (confirm(`Are you sure you want to delete booking ${bookingId}?`)) {
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    }
  };

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
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] flex flex-col font-sans">
      <Header
        currentView={currentView}
        setCurrentView={(v) => { if (v === 'customer') window.location.href = '/' }}
        onOpenNewBooking={() => setIsNewBookingOpen(true)}
        onOpenSupabaseConfig={() => setIsSupabaseConfigOpen(true)}
        supabaseConfig={supabaseConfig}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        unreadNotificationsCount={stats.pendingRequests}
      />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6">
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
      </main>
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
    </div>
  );
}
