import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory backing data for API endpoints (mirrors frontend sync)
let bookingsStore = [
  {
    id: 'TCS-1001',
    customerName: 'Northgate Business Center',
    customerPhone: '+1 (555) 890-1234',
    customerEmail: 'admin@northgate.com',
    serviceType: 'Commercial Standard Cleaning',
    category: 'COMMERCIAL',
    address: '124 Corporate Way, Suite 400',
    date: '2024-10-23',
    timeSlot: '09:00 AM',
    durationHours: 3.5,
    status: 'In Progress',
    assignedCleaners: [
      {
        id: 'cl-5',
        name: 'David Miller',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
        role: 'Kitchen & Industrial Specialist',
        status: 'On Duty',
        currentTask: 'Northgate Business Center',
        location: '124 Corporate Way',
        gpsDistance: 'On site',
        phone: '+1 (555) 678-9012',
        email: 'd.miller@turecleaning.com',
        rating: 4.85,
        completedJobs: 265,
      }
    ],
    price: 320,
    notes: 'Access card required at front desk. Focus on glass partitions and floor buffing.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'TCS-1002',
    customerName: 'Sarah Jenkins',
    customerPhone: '+1 (555) 901-2345',
    customerEmail: 'sarah.j@gmail.com',
    serviceType: 'Regular Residential Cleaning',
    category: 'REGULAR',
    address: '42 Oak Ridge, Apartment 4B',
    date: '2024-10-23',
    timeSlot: '11:30 AM',
    durationHours: 2,
    status: 'Assigned',
    assignedCleaners: [
      {
        id: 'cl-4',
        name: 'Elena Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
        role: 'Residential Deep Clean Expert',
        status: 'On Duty',
        currentTask: 'Residence: Sarah Jenkins',
        location: '42 Oak Ridge, Apt 4B',
        gpsDistance: 'On site',
        phone: '+1 (555) 567-8901',
        email: 'e.rodriguez@turecleaning.com',
        rating: 4.95,
        completedJobs: 310,
      }
    ],
    price: 120,
    notes: 'Key in lockbox code 4821. Friendly indoor cat.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'TCS-1003',
    customerName: 'The Grill House Resto',
    customerPhone: '+1 (555) 012-3456',
    customerEmail: 'manager@grillhouse.com',
    serviceType: 'Commercial Kitchen Deep Clean',
    category: 'KITCHEN DEEP CLEAN',
    address: '88 Main St, Downtown',
    date: '2024-10-23',
    timeSlot: '02:00 PM',
    durationHours: 4,
    status: 'Pending',
    assignedCleaners: [],
    price: 450,
    notes: 'Grease trap degreasing & stainless steel hood sanitization required.',
    createdAt: new Date().toISOString(),
  }
];

let cleanersStore = [
  {
    id: 'cl-1',
    name: 'Marcus Rivera',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
    role: 'Senior Sanitation Specialist',
    status: 'On Duty',
    currentTask: 'Penthouse A • Est. Finish 10:30',
    location: '122 West 42nd St.',
    gpsDistance: 'On site',
    phone: '+1 (555) 234-5678',
    email: 'm.rivera@turecleaning.com',
    rating: 4.9,
    completedJobs: 342,
  },
  {
    id: 'cl-2',
    name: 'Elena Soprano',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    role: 'Commercial Lead Cleaner',
    status: 'On Duty',
    currentTask: 'TechHub • Starting 10:30',
    location: '500 Broadway',
    gpsDistance: '0.4mi away',
    phone: '+1 (555) 345-6789',
    email: 'e.soprano@turecleaning.com',
    rating: 5.0,
    completedJobs: 418,
  },
  {
    id: 'cl-3',
    name: 'David Lynch',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250',
    role: 'Mobile Operations & Fleet',
    status: 'En Route',
    currentTask: 'En route to TechHub',
    location: 'Broadway & 14th St',
    gpsDistance: '1.2mi away',
    phone: '+1 (555) 456-7890',
    email: 'd.lynch@turecleaning.com',
    rating: 4.8,
    completedJobs: 289,
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // GET all bookings
  app.get("/api/bookings", (req, res) => {
    res.json({ success: true, bookings: bookingsStore });
  });

  // CREATE booking
  app.post("/api/bookings", (req, res) => {
    const newBooking = {
      id: `TCS-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'Pending',
      assignedCleaners: [],
      ...req.body,
    };
    bookingsStore.unshift(newBooking);
    res.status(201).json({ success: true, booking: newBooking });
  });

  // UPDATE booking
  app.patch("/api/bookings/:id", (req, res) => {
    const { id } = req.params;
    const index = bookingsStore.findIndex((b) => b.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    bookingsStore[index] = { ...bookingsStore[index], ...req.body };
    res.json({ success: true, booking: bookingsStore[index] });
  });

  // DELETE booking
  app.delete("/api/bookings/:id", (req, res) => {
    const { id } = req.params;
    bookingsStore = bookingsStore.filter((b) => b.id !== id);
    res.json({ success: true, message: "Booking deleted" });
  });

  // GET cleaners
  app.get("/api/cleaners", (req, res) => {
    res.json({ success: true, cleaners: cleanersStore });
  });

  // UPDATE cleaner status
  app.patch("/api/cleaners/:id", (req, res) => {
    const { id } = req.params;
    const index = cleanersStore.findIndex((c) => c.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Cleaner not found" });
    }
    cleanersStore[index] = { ...cleanersStore[index], ...req.body };
    res.json({ success: true, cleaner: cleanersStore[index] });
  });

  // GET dashboard stats summary
  app.get("/api/stats", (req, res) => {
    const pendingCount = bookingsStore.filter(b => b.status === 'Pending').length;
    const activeCount = bookingsStore.filter(b => b.status === 'In Progress' || b.status === 'Assigned').length;
    
    res.json({
      success: true,
      stats: {
        totalMonthlyRevenue: 42850.00,
        totalRequests: 148 + bookingsStore.length - 3,
        todayJobs: bookingsStore.length,
        activeJobs: activeCount,
        pendingRequests: pendingCount,
        activeCleaners: 48,
        onDutyCleaners: 18,
        customerSatisfactionPercent: 98.2,
      }
    });
  });

  // Vite middleware for development or static serving in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TCS Application server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
