import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Star, Calendar, ChevronDown, CheckCircle, Briefcase, ThumbsUp, User } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] flex flex-col font-sans">
      {/* Header */}
      <header className="w-full bg-white px-4 py-4 flex items-center justify-between border-b">
        <div className="font-extrabold text-lg tracking-tight uppercase">
          Ture Cleaning Home
        </div>
        <Button variant="default" className="bg-[#003f87] text-white hover:bg-[#002f66] rounded-full px-6 font-semibold uppercase">
          Contact Us ↗
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-md mx-auto bg-white shadow-sm overflow-hidden flex flex-col relative pb-8">
        
        {/* Hero Section */}
        <section className="px-6 pt-10 pb-6 text-center z-10 relative">
          <h1 className="text-5xl font-black uppercase leading-[1.1] tracking-tight">
            Premier <span className="text-[#003f87] italic">Cleaning</span><br />
            Solution
          </h1>
          
          <div className="mt-6 flex flex-col items-center gap-4">
            <button className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-full px-4 py-2 font-semibold hover:bg-gray-50">
              <PlayCircle className="w-5 h-5 fill-black text-white" />
              Watch Video
            </button>
            
            <div className="flex items-center justify-center gap-6 mt-2">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-[#003f87]">4.5</span>
                <div className="flex text-yellow-400 gap-0.5 mt-0.5">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current opacity-50" />
                </div>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="flex flex-col items-start">
                <span className="text-3xl font-bold text-[#003f87]">326k</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Review</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Image & Booking Widget Container */}
        <section className="relative w-full mt-2 mb-12 px-6">
          <div className="relative w-full aspect-square -ml-8">
            {/* Fallback image if local image fails to load */}
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-3xl opacity-20 transform -translate-x-10 translate-y-10"></div>
            <img 
              src="/images/a_high_quality_studio_photograph_of_a_yellow_cleaning_bucket_filled_with/screen.png" 
              alt="Cleaning supplies bucket" 
              className="w-[120%] h-auto object-contain relative z-0 mix-blend-multiply"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>

          {/* Floating Booking Widget */}
          <Card className="absolute top-1/4 right-6 w-[220px] bg-white/90 backdrop-blur-md border border-gray-100 shadow-xl rounded-2xl z-20">
            <CardContent className="p-4 flex flex-col gap-3">
              <h3 className="font-bold text-sm uppercase tracking-wider">Get Our Service</h3>
              
              <div className="relative">
                <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003f87]">
                  <option>Service Type</option>
                  <option>Commercial Cleaning</option>
                  <option>Regular Cleaning</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="relative">
                <input 
                  type="date" 
                  className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003f87]" 
                  placeholder="Select Date"
                />
              </div>

              <Button className="w-full bg-[#003f87] text-white hover:bg-[#002f66] uppercase font-bold rounded-lg mt-1">
                See Details
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Services Offered Section */}
        <section className="px-6 py-4">
          <h2 className="text-xl font-extrabold uppercase tracking-tight mb-4">Services Offered</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
            
            <div className="min-w-[140px] snap-start flex flex-col gap-2">
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 relative">
                <img 
                  src="/images/a_professional_cleaner_in_a_green_apron_mopping_a_bright_modern_office_floor/screen.png" 
                  alt="Commercial Cleaning" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-sm uppercase leading-tight">Commercial<br/>Cleaning</h3>
            </div>

            <div className="min-w-[140px] snap-start flex flex-col gap-2">
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 relative">
                <img 
                  src="/images/a_professional_cleaner_vacuuming_a_living_room_with_light_colored_furniture/screen.png" 
                  alt="Regular Cleaning" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-sm uppercase leading-tight">Regular<br/>Cleaning</h3>
            </div>

            <div className="min-w-[140px] snap-start flex flex-col gap-2">
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 relative">
                <img 
                  src="/images/tcs_admin_dashboard_1/screen.png" 
                  alt="Kitchen Cleaning" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-sm uppercase leading-tight">Kitchen<br/>Cleaning</h3>
            </div>

            <div className="min-w-[140px] snap-start flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-xl">
              <div className="text-2xl font-black text-[#003f87]">25+</div>
              <div className="text-xs font-bold uppercase text-center mt-1">Services You Can Explore</div>
              <span className="material-symbols-outlined mt-2">arrow_forward</span>
            </div>

          </div>
        </section>

        {/* Stats Footer Section */}
        <section className="px-6 py-8 border-t border-gray-100 mt-4">
          <h2 className="text-lg font-extrabold uppercase tracking-tight text-center mb-6">Top Choice For Cleaning Services</h2>
          
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col items-center gap-1 text-center">
              <Briefcase className="w-6 h-6 text-[#003f87]" />
              <div className="font-black text-xl">5500+</div>
              <div className="text-[10px] font-semibold text-gray-500 uppercase">Projects Completed</div>
            </div>
            
            <div className="flex flex-col items-center gap-1 text-center">
              <ThumbsUp className="w-6 h-6 text-[#003f87]" />
              <div className="font-black text-xl">99%</div>
              <div className="text-[10px] font-semibold text-gray-500 uppercase">Satisfied Customer</div>
            </div>
            
            <div className="flex flex-col items-center gap-1 text-center">
              <User className="w-6 h-6 text-[#003f87]" />
              <div className="font-black text-xl">80+</div>
              <div className="text-[10px] font-semibold text-gray-500 uppercase">Expert cleaner</div>
            </div>
          </div>
        </section>
        
        {/* Admin Link (Temporary for navigation) */}
        <div className="px-6 pb-6 pt-2 text-center">
           <Link href="/admin">
             <Button variant="link" className="text-xs text-gray-400">Go to Admin Dashboard</Button>
           </Link>
        </div>
      </main>
    </div>
  );
}
