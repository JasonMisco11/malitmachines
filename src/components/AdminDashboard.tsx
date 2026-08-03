import React, { useState } from 'react';
import { Booking, Cleaner, DashboardStats } from '../types';

interface AdminDashboardProps {
  bookings: Booking[];
  cleaners: Cleaner[];
  stats: DashboardStats;
  onOpenAssignModal: (booking: Booking) => void;
  onOpenFleetMap: () => void;
  onOpenNewBooking: () => void;
  onUpdateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  onDeleteBooking: (bookingId: string) => void;
  searchQuery: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  bookings,
  cleaners,
  stats,
  onOpenAssignModal,
  onOpenFleetMap,
  onOpenNewBooking,
  onUpdateBookingStatus,
  onDeleteBooking,
  searchQuery,
}) => {
  const [scheduleViewMode, setScheduleViewMode] = useState<'Day' | 'Week' | 'Month'>('Day');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');
  const [selectedDetailBooking, setSelectedDetailBooking] = useState<Booking | null>(null);

  // Filter bookings based on searchQuery and category filter
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategoryFilter === 'ALL' || b.category === selectedCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  const onDutyCleaners = cleaners.filter((c) => c.status === 'On Duty');
  const enRouteCleaners = cleaners.filter((c) => c.status === 'En Route');

  return (
    <div className="space-y-8 pb-16">

      {/* Top Section: Overview Header & Quick Category Pills */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#003f87] tracking-tight">
            Executive Overview
          </h2>
          <p className="text-sm text-[#424752] mt-0.5">
            Real-time operations, daily schedule, and cleaner dispatch system.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {['ALL', 'COMMERCIAL', 'REGULAR', 'RESIDENTIAL DEEP', 'KITCHEN DEEP CLEAN', 'MOVE-IN CLEAN'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategoryFilter === cat
                  ? 'bg-[#003f87] text-white shadow-sm'
                  : 'bg-white text-[#424752] border border-[#c2c6d4] hover:bg-[#f3f4f5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Bento KPI Cards Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        
        {/* KPI Card 1: Total Monthly Revenue */}
        <div className="bg-white border border-[#c2c6d4] p-5 md:p-6 rounded-xl shadow-xs hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-[#d7e2ff] text-[#001a40] rounded-lg">
              <span className="material-symbols-outlined text-xl">payments</span>
            </div>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +{stats.monthlyGrowthPercent}%
            </span>
          </div>
          <p className="font-mono-code text-xs text-[#595f65] uppercase font-semibold tracking-wider mb-1">
            Total Monthly Revenue
          </p>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#191c1d]">
            ${stats.totalMonthlyRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </h3>
        </div>

        {/* KPI Card 2: Active Cleaners */}
        <div className="bg-white border border-[#c2c6d4] p-5 md:p-6 rounded-xl shadow-xs hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-[#dde3ea] text-[#161c21] rounded-lg">
              <span className="material-symbols-outlined text-xl">groups</span>
            </div>
            <span className="text-xs font-semibold text-[#424752] bg-[#f3f4f5] px-2 py-0.5 rounded">
              {stats.onDutyCleaners} On Duty
            </span>
          </div>
          <p className="font-mono-code text-xs text-[#595f65] uppercase font-semibold tracking-wider mb-1">
            Active Cleaners
          </p>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#191c1d]">
            {stats.activeCleaners}
          </h3>
        </div>

        {/* KPI Card 3: Pending Requests */}
        <div className="bg-white border border-[#c2c6d4] p-5 md:p-6 rounded-xl shadow-xs hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-[#ffdad6] text-[#93000a] rounded-lg">
              <span className="material-symbols-outlined text-xl">pending_actions</span>
            </div>
            <span className="text-[#ba1a1a] bg-red-50 px-2 py-0.5 rounded text-xs font-bold">
              Priority: {stats.priorityPending}
            </span>
          </div>
          <p className="font-mono-code text-xs text-[#595f65] uppercase font-semibold tracking-wider mb-1">
            Pending Requests
          </p>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#191c1d]">
            {bookings.filter(b => b.status === 'Pending').length}
          </h3>
        </div>

        {/* KPI Card 4: Customer Satisfaction */}
        <div className="bg-white border border-[#c2c6d4] p-5 md:p-6 rounded-xl shadow-xs hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 bg-[#e5e2e1] text-[#1c1b1b] rounded-lg">
              <span className="material-symbols-outlined text-xl">star</span>
            </div>
            <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded">
              ★ {stats.averageRating} Avg
            </span>
          </div>
          <p className="font-mono-code text-xs text-[#595f65] uppercase font-semibold tracking-wider mb-1">
            Satisfaction Rate
          </p>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#191c1d]">
            {stats.customerSatisfactionPercent}%
          </h3>
        </div>

      </section>

      {/* 2. Main Grid: Master Schedule + Cleaner Status Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Master Schedule Section (8 Columns) */}
        <section className="lg:col-span-8 bg-white border border-[#c2c6d4] rounded-2xl shadow-xs overflow-hidden">
          
          {/* Header Bar */}
          <div className="p-5 md:p-6 border-b border-[#e1e3e4] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#f8f9fa]">
            <div>
              <h3 className="text-xl font-bold text-[#191c1d] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#003f87]">calendar_today</span>
                Master Schedule
              </h3>
              <p className="text-xs text-[#424752] mt-0.5">
                Wednesday, Oct 23rd, 2024 • Active Dispatch Timeline
              </p>
            </div>

            {/* Time Toggle */}
            <div className="flex items-center bg-[#e7e8e9] p-1 rounded-lg text-xs font-bold">
              {(['Day', 'Week', 'Month'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setScheduleViewMode(mode)}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    scheduleViewMode === mode
                      ? 'bg-white text-[#003f87] shadow-xs'
                      : 'text-[#424752] hover:text-[#191c1d]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Agenda Timeline List */}
          <div className="p-5 md:p-6 space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12 text-[#727784]">
                <span className="material-symbols-outlined text-4xl mb-2 text-[#c2c6d4]">event_busy</span>
                <p className="font-semibold">No appointments found matching search criteria.</p>
              </div>
            ) : (
              filteredBookings.map((booking) => {
                // Color border mapping based on status
                const borderColors = {
                  'In Progress': 'border-l-4 border-l-[#003f87]',
                  'Assigned': 'border-l-4 border-l-blue-500',
                  'Pending': 'border-l-4 border-l-amber-500',
                  'Completed': 'border-l-4 border-l-emerald-500',
                  'Cancelled': 'border-l-4 border-l-gray-400',
                };

                const statusPillStyles = {
                  'In Progress': 'bg-blue-100 text-blue-800',
                  'Assigned': 'bg-emerald-100 text-emerald-800',
                  'Pending': 'bg-amber-100 text-amber-800',
                  'Completed': 'bg-gray-100 text-gray-700',
                  'Cancelled': 'bg-red-100 text-red-700',
                };

                return (
                  <div
                    key={booking.id}
                    className={`bg-white border border-[#e1e3e4] rounded-xl p-4 transition-all hover:bg-[#f8f9fa] ${borderColors[booking.status]}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono-code text-[11px] font-bold px-2 py-0.5 rounded bg-[#dde3ea] text-[#161c21]">
                            {booking.category}
                          </span>
                          <span className={`text-[10px] font-mono-code font-bold uppercase px-2 py-0.5 rounded-full ${statusPillStyles[booking.status]}`}>
                            {booking.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-base text-[#191c1d]">
                          {booking.customerName} - {booking.serviceType}
                        </h4>
                      </div>

                      <div className="sm:text-right">
                        <span className="font-mono-code text-xs font-bold text-[#003f87] block">
                          {booking.timeSlot}
                        </span>
                        <span className="text-[11px] text-[#727784]">
                          Est. {booking.durationHours || 2}h duration
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#424752] mb-3">
                      <span className="material-symbols-outlined text-sm text-[#727784]">location_on</span>
                      <span>{booking.address}</span>
                    </div>

                    {/* Footer: Assigned Cleaners & Actions */}
                    <div className="pt-3 border-t border-[#e1e3e4] flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {booking.assignedCleaners.length > 0 ? (
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {booking.assignedCleaners.map((cleaner) => (
                                <img
                                  key={cleaner.id}
                                  src={cleaner.avatar}
                                  alt={cleaner.name}
                                  className="w-7 h-7 rounded-full border-2 border-white object-cover"
                                  title={cleaner.name}
                                />
                              ))}
                            </div>
                            <span className="text-xs font-medium text-[#191c1d]">
                              {booking.assignedCleaners.map((c) => c.name).join(', ')}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs text-[#ba1a1a] font-bold">
                            <span className="material-symbols-outlined text-sm">warning</span>
                            <span>Unassigned Cleaner</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {booking.status === 'Pending' && (
                          <button
                            onClick={() => onOpenAssignModal(booking)}
                            className="bg-[#003f87] text-white font-bold text-xs px-3.5 py-1.5 rounded-lg hover:bg-[#0056b3] transition-all shadow-xs"
                          >
                            Assign Now
                          </button>
                        )}

                        <button
                          onClick={() => setSelectedDetailBooking(booking)}
                          className="text-[#003f87] hover:bg-blue-50 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Cleaner Status & Fleet Map Widget (4 Columns) */}
        <section className="lg:col-span-4 space-y-6">
          
          {/* Status Box */}
          <div className="bg-white border border-[#c2c6d4] rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-[#191c1d] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#003f87]">engineering</span>
                Cleaner Status
              </h3>
              <button
                onClick={onOpenFleetMap}
                className="text-[#003f87] hover:bg-blue-50 p-1.5 rounded-full transition-colors"
                title="View Fleet Map"
              >
                <span className="material-symbols-outlined">map</span>
              </button>
            </div>

            {/* On Duty Cleaners */}
            <div className="mb-5">
              <p className="font-mono-code text-xs text-[#424752] uppercase font-bold mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                On Duty ({onDutyCleaners.length})
              </p>
              <div className="space-y-3">
                {onDutyCleaners.map((cleaner) => (
                  <div key={cleaner.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f8f9fa] transition-colors">
                    <img
                      src={cleaner.avatar}
                      alt={cleaner.name}
                      className="w-9 h-9 rounded-full object-cover border border-[#c2c6d4]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#191c1d] truncate">{cleaner.name}</p>
                      <p className="text-xs text-[#727784] truncate">{cleaner.currentTask || 'Assigned active route'}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* En Route Cleaners */}
            <div className="mb-5 border-t border-[#e1e3e4] pt-4">
              <p className="font-mono-code text-xs text-[#424752] uppercase font-bold mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                En Route ({enRouteCleaners.length})
              </p>
              <div className="space-y-3">
                {enRouteCleaners.map((cleaner) => (
                  <div key={cleaner.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f8f9fa] transition-colors">
                    <img
                      src={cleaner.avatar}
                      alt={cleaner.name}
                      className="w-9 h-9 rounded-full object-cover border border-[#c2c6d4]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#191c1d] truncate">{cleaner.name}</p>
                      <p className="text-xs text-[#727784] truncate">GPS: {cleaner.gpsDistance}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800">
                      Tracking
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* View Map Action */}
            <button
              onClick={onOpenFleetMap}
              className="w-full py-2.5 bg-[#003f87] text-white rounded-xl font-bold text-xs hover:bg-[#0056b3] transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">my_location</span>
              View Fleet Map & Live GPS
            </button>
          </div>

        </section>

      </div>

      {/* 3. Recent Service Requests Data Table */}
      <section className="bg-white border border-[#c2c6d4] rounded-2xl overflow-hidden shadow-xs">
        <div className="p-6 border-b border-[#e1e3e4] flex items-center justify-between bg-[#f8f9fa]">
          <div>
            <h3 className="text-xl font-bold text-[#191c1d]">Recent Service Requests</h3>
            <p className="text-xs text-[#424752] mt-0.5">Comprehensive request log & status management</p>
          </div>

          <button
            onClick={onOpenNewBooking}
            className="text-[#003f87] hover:underline font-bold text-xs flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">add</span> Add New
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f3f4f5] border-b border-[#e1e3e4]">
              <tr>
                <th className="px-6 py-3.5 font-mono-code text-xs text-[#424752]">CUSTOMER</th>
                <th className="px-6 py-3.5 font-mono-code text-xs text-[#424752]">SERVICE TYPE</th>
                <th className="px-6 py-3.5 font-mono-code text-xs text-[#424752]">DATE / TIME</th>
                <th className="px-6 py-3.5 font-mono-code text-xs text-[#424752]">STATUS</th>
                <th className="px-6 py-3.5 font-mono-code text-xs text-[#424752]">PRICE</th>
                <th className="px-6 py-3.5 font-mono-code text-xs text-[#424752] text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e3e4]">
              {filteredBookings.map((booking) => {
                const initials = booking.customerName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2)
                  .toUpperCase();

                return (
                  <tr key={booking.id} className="hover:bg-[#f8f9fa] transition-colors group">
                    {/* Customer */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#d7e2ff] text-[#001a40] font-bold text-xs flex items-center justify-center shrink-0">
                          {initials}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-[#191c1d]">{booking.customerName}</p>
                          <p className="text-xs text-[#727784] truncate max-w-[180px]">{booking.address}</p>
                        </div>
                      </div>
                    </td>

                    {/* Service Type */}
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-[#191c1d]">{booking.serviceType}</span>
                    </td>

                    {/* Date / Time */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#191c1d] font-medium">{booking.date}</p>
                      <p className="text-xs text-[#727784] font-mono-code">{booking.timeSlot}</p>
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-6 py-4">
                      <select
                        value={booking.status}
                        onChange={(e) => onUpdateBookingStatus(booking.id, e.target.value as Booking['status'])}
                        className="text-xs font-mono-code font-bold py-1 px-2.5 rounded-full border border-[#c2c6d4] bg-white text-[#191c1d] outline-none cursor-pointer focus:ring-1 focus:ring-[#003f87]"
                      >
                        <option value="Pending">PENDING</option>
                        <option value="Assigned">ASSIGNED</option>
                        <option value="In Progress">IN PROGRESS</option>
                        <option value="Completed">COMPLETED</option>
                        <option value="Cancelled">CANCELLED</option>
                      </select>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 font-mono-code font-bold text-sm text-[#003f87]">
                      ${booking.price}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 text-[#727784]">
                        {booking.status === 'Pending' && (
                          <button
                            onClick={() => onOpenAssignModal(booking)}
                            className="p-1.5 hover:bg-blue-50 text-[#003f87] rounded"
                            title="Assign Cleaner"
                          >
                            <span className="material-symbols-outlined text-lg">person_add</span>
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedDetailBooking(booking)}
                          className="p-1.5 hover:bg-gray-100 text-[#424752] rounded"
                          title="View Details"
                        >
                          <span className="material-symbols-outlined text-lg">visibility</span>
                        </button>
                        <button
                          onClick={() => onDeleteBooking(booking.id)}
                          className="p-1.5 hover:bg-red-50 text-[#ba1a1a] rounded"
                          title="Delete Request"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Booking Details Modal */}
      {selectedDetailBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#c2c6d4] space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#e1e3e4]">
              <div>
                <span className="font-mono-code text-xs text-[#003f87] font-bold">{selectedDetailBooking.id}</span>
                <h3 className="text-xl font-bold text-[#191c1d]">{selectedDetailBooking.serviceType}</h3>
              </div>
              <button
                onClick={() => setSelectedDetailBooking(null)}
                className="p-1 rounded-full hover:bg-gray-100 text-[#727784]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-bold text-[#727784]">CUSTOMER</p>
                <p className="font-semibold text-[#191c1d]">{selectedDetailBooking.customerName}</p>
                <p className="text-xs text-[#424752]">{selectedDetailBooking.customerPhone || 'N/A'} • {selectedDetailBooking.customerEmail || 'N/A'}</p>
              </div>

              <div>
                <p className="text-xs font-bold text-[#727784]">LOCATION</p>
                <p className="text-[#191c1d]">{selectedDetailBooking.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-[#727784]">DATE & TIME</p>
                  <p className="text-[#191c1d] font-semibold">{selectedDetailBooking.date} @ {selectedDetailBooking.timeSlot}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#727784]">PRICE</p>
                  <p className="text-[#003f87] font-bold font-mono-code text-base">${selectedDetailBooking.price}</p>
                </div>
              </div>

              {selectedDetailBooking.notes && (
                <div className="bg-[#f3f4f5] p-3 rounded-xl border border-[#e1e3e4]">
                  <p className="text-xs font-bold text-[#424752] mb-1">NOTES / INSTRUCTIONS</p>
                  <p className="text-xs text-[#191c1d] italic">{selectedDetailBooking.notes}</p>
                </div>
              )}

              <div>
                <p className="text-xs font-bold text-[#727784] mb-2">ASSIGNED CLEANER(S)</p>
                {selectedDetailBooking.assignedCleaners.length > 0 ? (
                  <div className="space-y-2">
                    {selectedDetailBooking.assignedCleaners.map((c) => (
                      <div key={c.id} className="flex items-center gap-3 p-2 rounded-lg bg-[#f8f9fa] border">
                        <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="font-bold text-xs text-[#191c1d]">{c.name}</p>
                          <p className="text-[10px] text-[#727784]">{c.role} • {c.phone}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#ba1a1a] font-bold">No cleaner currently assigned.</p>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-[#e1e3e4] flex justify-end gap-2">
              <button
                onClick={() => setSelectedDetailBooking(null)}
                className="px-4 py-2 bg-[#f3f4f5] rounded-xl text-xs font-bold text-[#424752] hover:bg-[#e1e3e4]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
