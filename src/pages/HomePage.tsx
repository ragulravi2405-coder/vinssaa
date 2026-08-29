import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, ChevronLeft, ChevronRight, Play, Award, Users, GraduationCap, 
  Trophy, BookOpen, UserCheck, Cpu, Briefcase, FlaskConical, Bus, PartyPopper, 
  Calendar, CheckCircle2, Sparkles, ShieldCheck, HeartHandshake, Globe, Shield,
  Building, Star, Quote, Eye, Image as ImageIcon, MapPin, Clock, Share2, Pause,
  Bell, FileText, Download, Megaphone, Video, ExternalLink
} from 'lucide-react';
import { COLLEGE_INFO, STATS_COUNTERS, HERO_SLIDES, NEWS_EVENTS, GALLERY_IMAGES } from '../data/collegeData';
import { DEPARTMENTS_DATA } from '../data/departmentsData';
import { NOTIFICATIONS_DATA } from '../data/notificationsData';
import { NavigationTab, DocumentItem } from '../types';
import { RunningTickerBar } from '../components/common/RunningTickerBar';
import { DocumentViewerModal } from '../components/common/DocumentViewerModal';
import { useAdminData } from '../context/AdminDataContext';

interface HomePageProps {
  onTabChange: (tab: NavigationTab, anchorId?: string, departmentId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onTabChange }) => {
  const { heroSlides, galleryImages, events, departments, notifications, siteTheme } = useAdminData();
  const activeSlides = heroSlides && heroSlides.length > 0 ? heroSlides : HERO_SLIDES;
  const activeGallery = galleryImages && galleryImages.length > 0 ? galleryImages : GALLERY_IMAGES;
  const activeEvents = events && events.length > 0 ? events : NEWS_EVENTS;
  const activeDepartments = departments && departments.length > 0 ? departments : DEPARTMENTS_DATA;
  const activeNotifications = notifications && notifications.length > 0 ? notifications : NOTIFICATIONS_DATA;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<typeof NEWS_EVENTS[0] | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<string>('All');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<typeof GALLERY_IMAGES[0] | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedPdfDoc, setSelectedPdfDoc] = useState<DocumentItem | null>(null);

  // Auto-slide image timer (5 seconds)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, activeSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);

  // Filter gallery images
  const filteredGallery = galleryFilter === 'All' 
    ? activeGallery 
    : activeGallery.filter(img => img.category.toLowerCase().includes(galleryFilter.toLowerCase()) || (galleryFilter === 'Campus' && img.category.toLowerCase().includes('campus')));

  return (
    <div className="space-y-0 pb-0 bg-transparent text-[#252528] font-sans">
      
      {/* LIVE ANNOUNCEMENT RUNNING MARQUEE TICKER BAR */}
      <RunningTickerBar onNavigateNotifications={() => onTabChange('notifications')} />

      {/* Responsive Mobile Background Fix for Hero Section */}
      <style>{`
        /* Hero Section Height Optimization */
        .hero-responsive-container {
          /* Mobile: Full-screen height */
          min-height: 100vh;
        }
        @media (min-width: 640px) {
          .hero-responsive-container {
            /* Desktop: Original layout and height */
            min-height: clamp(520px, 85vh, 900px);
          }
        }

        /* Hero Background Image Optimization */
        .hero-responsive-bg {
          background-image: url('/images/clg%20photo/vins%20colleg%20bg%20img.png');
          background-repeat: no-repeat;
          /* Mobile: Force edge-to-edge vertical and horizontal stretching */
          background-size: 100% 100%;
          background-position: center;
        }
        
        @media (min-width: 640px) {
          .hero-responsive-bg {
            /* Desktop: Original positioning unchanged */
            background-size: cover;
            background-position: 50% 22%;
          }
        }
      `}</style>

      {/* 1. HERO SECTION - Transparent: Crisp Campus BG with direct Text */}
      <section className="relative text-white overflow-hidden hero-responsive-container">

        {/* ── Layer 1: Crisp HD Campus Background Photo ── */}
        <div className="absolute inset-0 z-0 hero-responsive-bg" aria-hidden="true" />

        {/* ── Layer 2: Centered Content — Transparent Card ── */}
        <div className="relative z-10 flex items-center justify-center w-full h-full min-h-[inherit] py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">

          {/*
            Transparent container:
            No background, no blur.
            Text shadows provide readability directly over the image.
          */}
          <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center gap-5 sm:gap-8 px-6 sm:px-10 py-8 sm:py-12 rounded-2xl sm:rounded-3xl">

            {/* Institution Crest inside a transparent ring */}
            <div className="flex justify-center">
              <div
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl p-2 sm:p-3 flex items-center justify-center hover:scale-105 transition-transform duration-300 shrink-0"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                }}
              >
                <img
                  src="/images/logo/vins logooo.jpg"
                  alt="VINS College Crest"
                  className="w-full h-full object-contain rounded-xl filter drop-shadow-lg"
                />
              </div>
            </div>

            {/* "WELCOME TO" label */}
            <span
              className="text-[10px] sm:text-sm font-extrabold tracking-[0.28em] uppercase font-cinzel block"
              style={{
                color: 'rgba(255,255,255,0.95)',
                letterSpacing: '0.28em',
                textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0px 4px rgba(0,0,0,0.5)',
              }}
            >
              WELCOME TO
            </span>

            {/* Main Heading — Solid Pure White, text shadow for readability */}
            <div className="space-y-2 sm:space-y-3">
              <h1
                className="font-extrabold font-playfair leading-[1.08] tracking-tight"
                style={{
                  fontSize: 'clamp(2rem, 6.5vw, 5.25rem)',
                  color: '#ffffff',
                  textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0px 60px rgba(0,0,0,0.7)',
                }}
              >
                VINS Christian College
              </h1>

              {/* Divider accent line - Premium Gold Accent */}
              <div className="flex items-center justify-center gap-3 py-1">
                <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(to right, transparent, rgba(250,204,21,0.6))' }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#facc15', boxShadow: '0 0 8px rgba(250,204,21,0.6)' }} />
                <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(to left, transparent, rgba(250,204,21,0.6))' }} />
              </div>

              {/* Sub-heading – college details in Premium Light Gold */}
              <p
                className="font-bold tracking-[0.18em] uppercase font-cinzel leading-relaxed"
                style={{
                  fontSize: 'clamp(0.6rem, 1.4vw, 0.95rem)',
                  color: '#fde047', // Premium Light Gold
                  textShadow: '0 2px 10px rgba(0,0,0,0.85), 0 0px 4px rgba(0,0,0,0.5)',
                }}
              >
                OF ENGINEERING · NAGERCOIL · ANNA UNIVERSITY CODE: {siteTheme?.tneaCode || '4982'}
              </p>
            </div>

            {/* Body paragraph in slightly warm white */}
            <p
              className="font-medium max-w-2xl mx-auto leading-relaxed"
              style={{
                fontSize: 'clamp(0.85rem, 1.6vw, 1.1rem)',
                color: '#fdfbf7', // slightly warm pure white
                textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.6)',
              }}
            >
              A premier institution for engineering excellence, transformative research, and holistic career leadership in South India.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 w-full pt-1">
              <button
                onClick={() => onTabChange('admissions', 'online-form')}
                className="btn-valer-green text-xs sm:text-sm uppercase tracking-widest px-6 sm:px-10 py-3.5 sm:py-4 shadow-[0_4px_15px_rgba(0,0,0,0.4)] hover:scale-105 active:scale-95 cursor-pointer font-extrabold w-full sm:w-auto justify-center"
              >
                <span>EXPLORE WITH US</span>
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 text-white shrink-0" />
              </button>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="btn-hero-outline text-xs sm:text-sm uppercase tracking-widest px-6 sm:px-9 py-3.5 sm:py-4 shadow-[0_4px_15px_rgba(0,0,0,0.4)] active:scale-95 cursor-pointer hover:border-white hover:bg-white/10 font-extrabold w-full sm:w-auto justify-center"
                style={{ border: '1px solid rgba(255,255,255,0.7)', backgroundColor: 'rgba(0,0,0,0.2)' }}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.5)' }}
                >
                  <Play className="w-3 h-3 fill-current ml-0.5 shrink-0 text-white" />
                </span>
                <span className="text-white drop-shadow-md">WATCH CAMPUS TOUR</span>
              </button>
            </div>

          </div>{/* end transparent card */}
        </div>

      </section>

      {/* 2. MINIMAL DISTRACTION-FREE IMAGE SLIDER */}
      <section className="relative w-full max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 mb-10 sm:mb-16 z-20">
        
        {/* Floating Organic Halo Effect */}
        <div className="relative organic-glass-slider-wrapper">
          <div className="organic-glass-halo" />
          
          <div className="organic-glass-slider-inner aspect-[21/10] sm:aspect-[21/9] min-h-[340px] sm:min-h-[520px] lg:min-h-[620px] overflow-hidden">
            
            {/* Pure Slide Image with Smooth Ken-Burns Motion & Auto Transitions */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                key={`slide-img-${currentSlide}`}
                src={activeSlides[currentSlide]?.visualUrl || '/images/college events and news galeery/h9.jpg'}
                alt={activeSlides[currentSlide]?.title || 'VINS Campus Slide'}
                className="w-full h-full object-cover object-center animate-ken-burns transition-all duration-1000"
              />
            </div>

          </div>
        </div>

      </section>

      {/* 3. REST OF HOME PAGE - LAYERED GLASSY CEMENT GREY */}
      <div className="bg-transparent text-[#252528] space-y-16 sm:space-y-24 py-12 sm:py-24 relative">

        {/* SECTION A: "CELEBRATING THE BRIGHTEST MIND" */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              
              <div className="space-y-2 sm:space-y-3">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#54524e] font-cinzel block">
                  ACADEMIC EXCELLENCE &amp; LEADERSHIP
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-playfair text-[#252528] leading-[1.15]">
                  CELEBRATING THE BRIGHTEST MIND
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#3A2A08] leading-relaxed font-sans">
                Our goal is to prepare the next generation of creative engineering professionals and industry leaders. We offer undergraduate, postgraduate, and management degrees in high-demand technological sectors.
              </p>

              <p className="text-sm sm:text-base text-[#3A2A08] leading-relaxed font-sans">
                Whether you begin your journey in our state-of-the-art AI &amp; GPU computing laboratories, modern robotics workshops, or through comprehensive research internships, our programs are engineered to help you along your path to global success.
              </p>

              {/* "VIEW PROGRAMS →" with hover link */}
              <div className="pt-2">
                <button
                  onClick={() => onTabChange('department')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#252528] hover:text-[#54524e] transition-colors border-b-2 border-[#252528] hover:border-[#54524e] pb-1 cursor-pointer group"
                >
                  <span>VIEW PROGRAMS</span>
                  <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                </button>
              </div>

              {/* 3 Key Stats Box */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-5 sm:pt-6 border-t border-[#dedcd7]">
                <div>
                  <p className="text-xl sm:text-3xl font-bold font-playfair text-[#252528]">25+</p>
                  <p className="text-[9px] sm:text-[10px] font-bold text-[#6B4C14] uppercase tracking-wider mt-0.5">Years Legacy</p>
                </div>
                <div>
                  <p className="text-xl sm:text-3xl font-bold font-playfair text-[#252528]">15:1</p>
                  <p className="text-[9px] sm:text-[10px] font-bold text-[#6B4C14] uppercase tracking-wider mt-0.5">Student Ratio</p>
                </div>
                <div>
                  <p className="text-xl sm:text-3xl font-bold font-playfair text-[#363538]">90%+</p>
                  <p className="text-[9px] sm:text-[10px] font-bold text-[#6B4C14] uppercase tracking-wider mt-0.5">Placements</p>
                </div>
              </div>

            </div>

            {/* Right Column: Asymmetric Dual Image Editorial Collage with Royal Framed Layout */}
            <div className="lg:col-span-6 relative">
              <div className="relative">
                
                {/* Grand Campus / Library Main Photo in Royal Frame */}
                <div className="royal-image-frame w-full">
                  <div className="royal-image-inner w-full aspect-[4/3]">
                    <img 
                      src="/images/college events and news galeery/h6.jpg" 
                      alt="VINS College Central Library and Quadrangle" 
                      className="w-full h-full object-cover img-hover-zoom"
                    />
                  </div>
                </div>

                {/* Overlapping Framed Portrait Photo in Royal Frame */}
                <div className="absolute bottom-0 right-0 sm:-bottom-6 sm:-right-4 w-1/2 royal-image-frame z-10 shadow-2xl">
                  <div className="royal-image-inner w-full aspect-[4/3]">
                    <img 
                      src="/images/college events and news galeery/1 (2).jpg" 
                      alt="VINS Academic Dignitaries and Students" 
                      className="w-full h-full object-cover img-hover-zoom"
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* SECTION B: EDITORIAL QUOTE SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gold-card rounded-3xl p-8 sm:p-12 lg:p-16 border border-amber-400/40 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Big Typography Quote & Attribution */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Giant Serif Quotation Mark */}
                <div className="text-6xl sm:text-7xl font-serif text-[#54524e] leading-none select-none">
                  “
                </div>

                <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#252528] leading-tight -mt-4">
                  Wisdom and character are the true cornerstones of engineering excellence; our mission is to ignite visionary minds that create meaningful solutions for the world.
                </blockquote>

                <div className="pt-2">
                  <p className="text-xs sm:text-sm font-bold text-[#6B4C14] font-cinzel tracking-wider uppercase">
                    Founder Chairman Shri Nanjil M. Vincent · (Ex-MLA, Ex-MP Rajya Sabha)
                  </p>
                </div>

                <div className="pt-4 border-t border-[#dedcd7]">
                  <button
                    onClick={() => onTabChange('about', 'chairman')}
                    className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#252528] hover:text-[#54524e] transition-colors group cursor-pointer"
                  >
                    <span>CONTINUE READING</span>
                    <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                  </button>
                </div>

              </div>

              {/* Right Column: Large Vertical Chairman Photo in Royal Frame */}
              <div className="lg:col-span-5">
                <div className="royal-image-frame w-full">
                  <div className="royal-image-inner w-full aspect-[4/5] relative group">
                    <img 
                      src="/images/chairman and pricipal img/chairman img.jpg" 
                      alt="Founder Chairman Nanjil M. Vincent" 
                      className="w-full h-full object-cover img-hover-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#252528]/90 via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#eceae6] block">LEADERSHIP SPOTLIGHT</span>
                      <p className="text-sm font-playfair font-bold">VINS Group of Educational Institutions</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION C: "UPCOMING EVENTS" */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#dedcd7]" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#6B4C14] font-cinzel">
                FEEL FREE TO JOIN OUR ACADEMIC &amp; PUBLIC EVENTS
              </span>
              <span className="h-px w-10 bg-[#dedcd7]" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-[#252528] tracking-tight">
              UPCOMING EVENTS
            </h2>
          </div>

          {/* Valer-Style Event Rows */}
          <div className="space-y-4">
            {activeEvents.map((evt) => (
              <div 
                key={evt.id}
                onClick={() => setSelectedEvent({
                  id: evt.id,
                  title: evt.title,
                  date: evt.date,
                  category: evt.category,
                  imagePath: evt.imagePath,
                  description: evt.description
                })}
                className="valer-event-row flex-col sm:flex-row group cursor-pointer shadow-xs rounded-2xl overflow-hidden border border-amber-400/40"
              >
                
                {/* Left Dark Cement Date Badge */}
                <div className="valer-date-badge flex flex-col justify-center items-center py-4 px-6 sm:w-56 shrink-0 bg-[#363539] text-white">
                  <span className="text-sm sm:text-base font-bold font-playfair tracking-wide text-center">
                    {evt.date}
                  </span>
                  <span className="text-[10px] text-[#eceae6] font-bold uppercase tracking-wider mt-1">
                    {evt.category}
                  </span>
                </div>

                {/* Right Event Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-amber-50/60 group-hover:bg-amber-100/70 transition-colors">
                  
                  <div className="space-y-1 min-w-0 pr-4">
                    <h3 className="text-base sm:text-lg font-bold font-playfair text-[#252528] group-hover:text-[#54524e] transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-[#54524e] font-sans line-clamp-1">
                      {evt.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#dedcd7]">
                    <span className="text-xs font-semibold text-[#6B4C14] font-sans whitespace-nowrap">
                      {evt.subtitle || '10:00 am'}
                    </span>

                    <button className="text-xs font-bold uppercase tracking-wider text-[#252528] group-hover:text-[#54524e] transition-colors flex items-center gap-1.5 cursor-pointer">
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>

          {/* View All Events Button */}
          <div className="text-center pt-2">
            <button
              onClick={() => onTabChange('campus', 'events')}
              className="btn-valer-green text-xs uppercase tracking-widest px-8 py-3.5 shadow-md cursor-pointer font-bold inline-flex items-center gap-2"
            >
              <span>VIEW ALL UPCOMING EVENTS</span>
              <ArrowRight className="w-4 h-4 text-white shrink-0" />
            </button>
          </div>

        </section>

        {/* SECTION D: EDITORIAL MAGAZINE & NEWS GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#dedcd7] pb-4">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#54524e] font-cinzel block">
                CAMPUS JOURNAL &amp; HAPPENINGS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-playfair text-[#252528]">
                Latest News &amp; Stories
              </h2>
            </div>

            <button
              onClick={() => onTabChange('notifications')}
              className="text-xs font-bold uppercase tracking-widest text-[#252528] hover:text-[#54524e] transition-colors flex items-center gap-1.5 group cursor-pointer"
            >
              <span>ALL OFFICIAL CIRCULARS</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 3-Column Magazine Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Featured Article Card */}
            <div className="gold-card rounded-2xl p-6 border border-amber-400/40 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-xl transition-all">
              <div className="space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#6B4C14] block">
                  SEPTEMBER 8, 2026 · RESEARCH
                </span>
                <h3 className="text-xl font-bold font-playfair text-[#252528] leading-snug">
                  Advanced AI &amp; Robotics Innovation Laboratory Commissioned at VINS
                </h3>
                <p className="text-xs text-[#3A2A08] leading-relaxed">
                  Equipped with cutting-edge Nvidia GPUs, humanoid robotics kits, and cloud compute nodes to accelerate student research in machine intelligence and computer vision.
                </p>
              </div>

              <div className="pt-4 border-t border-[#dedcd7]">
                <button
                  onClick={() => onTabChange('notifications')}
                  className="text-xs font-bold uppercase tracking-widest text-[#252528] hover:text-[#54524e] transition-colors flex items-center gap-1.5 group cursor-pointer"
                >
                  <span>READ MORE</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Column 2: Center Full-Height Featured Photo Card with Royal Frame */}
            <div className="royal-image-frame aspect-[3/4] md:aspect-auto">
              <div className="royal-image-inner w-full h-full relative group">
                <img 
                  src="/images/college events and news galeery/h1.jpg" 
                  alt="VINS College Event Lamp Lighting" 
                  className="w-full h-full object-cover img-hover-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#252528]/90 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#eceae6]">ANNUAL MILESTONE</span>
                  <h3 className="text-lg font-playfair font-bold text-white">Inauguration of the 2026-27 Academic Year</h3>
                </div>
              </div>
            </div>

            {/* Column 3: Secondary Article Card */}
            <div className="gold-card rounded-2xl p-6 border border-amber-400/40 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-xl transition-all">
              <div className="space-y-3">
                <div className="royal-card-highlight w-full aspect-[16/9]">
                  <div className="rounded-xl overflow-hidden w-full h-full bg-[#ebe9e4]">
                    <img 
                      src="/images/college events and news galeery/h5.jpg" 
                      alt="VINS Architectural Complex" 
                      className="w-full h-full object-cover img-hover-zoom"
                    />
                  </div>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#6B4C14] block">
                  AUGUST 17, 2026 · CAMPUS INFRASTRUCTURE
                </span>
                <h3 className="text-lg font-bold font-playfair text-[#252528] leading-snug">
                  Expansion of High-Tech Research Quadrangle &amp; Digital Library
                </h3>
                <p className="text-xs text-[#3A2A08] leading-relaxed">
                  State-of-the-art facility housing 50,000+ technical volumes, IEEE Xplore access, and dedicated team collaboration pods.
                </p>
              </div>

              <div className="pt-4 border-t border-[#dedcd7]">
                <button
                  onClick={() => onTabChange('facilities')}
                  className="text-xs font-bold uppercase tracking-widest text-[#252528] hover:text-[#54524e] transition-colors flex items-center gap-1.5 group cursor-pointer"
                >
                  <span>READ MORE</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>

        </section>

        {/* SECTION E: ACADEMICS & 8 ENGINEERING DEPARTMENTS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#54524e] font-cinzel block">
              DEGREE PROGRAMS &amp; DISCIPLINES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-playfair text-[#252528]">
              Engineering &amp; Management Courses
            </h2>
            <p className="text-xs sm:text-sm text-[#6B4C14]">
              Anna University curriculum with state-of-the-art laboratories, expert PhD professors, and hands-on industrial projects.
            </p>
          </div>

          {/* Departments Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeDepartments.slice(0, 8).map((dept) => (
              <div
                key={dept.id}
                onClick={() => onTabChange('department', undefined, dept.id)}
                className="gold-card rounded-2xl border border-amber-400/40 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3 p-4">
                  <div className="royal-card-highlight w-full aspect-[16/10]">
                    <div className="w-full h-full rounded-xl overflow-hidden bg-[#ebe9e4] relative">
                      <img
                        src={dept.courseImage || dept.bannerPath}
                        alt={dept.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#252528]/80 text-white font-extrabold text-[10px] backdrop-blur-xs">
                        {dept.degree}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-[#54524e] uppercase tracking-wider block">
                      Intake: {dept.intake} Seats
                    </span>
                    <h3 className="text-sm font-playfair font-bold text-[#252528] mt-1 group-hover:text-[#54524e] transition-colors line-clamp-1">
                      {dept.name}
                    </h3>
                    <p className="text-[11px] text-[#6B4C14] line-clamp-2 mt-1">
                      {dept.description}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-amber-800/20 border-t border-amber-400/30 flex items-center justify-between text-xs font-bold text-[#5C4010] group-hover:text-[#8A6418]">
                  <span>Explore Curriculum</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onTabChange('department')}
              className="btn-valer-green text-xs uppercase tracking-widest px-8 py-3.5 shadow-md cursor-pointer font-bold inline-flex items-center gap-2"
            >
              <span>VIEW ALL DEGREE PROGRAMS</span>
              <ArrowRight className="w-4 h-4 text-white shrink-0" />
            </button>
          </div>

        </section>

        {/* DEDICATED FEATURED YOUTUBE VIDEOS SECTION - WITH SOLID DEEP NAVY BLUE (#0A2540) CANVAS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0A2540] rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-white/20 space-y-8">
            
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6B00] text-white text-xs font-bold tracking-widest uppercase border border-white/30 shadow-md">
                <Video className="w-3.5 h-3.5 text-white" />
                <span>OFFICIAL VIDEO BROADCASTS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-white leading-tight">
                Experience VINS in Motion
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl mx-auto font-normal">
                Watch our official institutional documentaries, state-of-the-art laboratory infrastructure, student innovations, and campus celebrations directly below.
              </p>
            </div>

          {/* 2 Responsive Video Frames: Side-by-Side on Desktop, Stacked on Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            
            {/* Video 1: Official Campus & Academic Tour */}
            <div className="organic-video-card-left flex flex-col justify-between">
              <div className="p-3 sm:p-5 flex flex-col h-full space-y-4">
                
                {/* Header bar of Video Card 1 */}
                <div className="flex items-center justify-between gap-3 border-b border-[#dedcd7]/60 pb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-8 h-8 rounded-full bg-[#363538] text-white flex items-center justify-center shrink-0 shadow-xs text-xs font-bold">
                      01
                    </span>
                    <div className="truncate">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#54524e] block">CAMPUS DOCUMENTARY</span>
                      <h3 className="font-playfair font-bold text-sm sm:text-base text-[#252528] truncate">
                        VINS Christian College Institutional Tour
                      </h3>
                    </div>
                  </div>

                  <a
                    href="https://youtu.be/LtP5bsUIWew?si=_WX5lBdkREoxqx1B"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-full bg-[#363538] hover:bg-[#48474b] text-white text-[11px] font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-xs"
                    title="Open on YouTube"
                  >
                    <Play className="w-3 h-3 fill-current text-white" />
                    <span>YouTube</span>
                    <ExternalLink className="w-3 h-3 text-[#d3d1cc]" />
                  </a>
                </div>

                {/* Embedded Video Player 1 */}
                <div className="organic-video-screen-left aspect-video w-full shadow-inner">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/LtP5bsUIWew?rel=0&modestbranding=1"
                    title="VINS Christian College of Engineering Official Campus Documentary"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                {/* Caption / Description for Video 1 */}
                <div className="bg-white/60 backdrop-blur-xs p-3.5 rounded-2xl border border-amber-400/40/60 text-xs text-[#3a3936] leading-relaxed flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#54524e] shrink-0 mt-0.5" />
                  <p>
                    Discover our high-tech computing centres, robotics labs, smart lecture halls, mechanical engineering workshops, and lush green Chunkankadai campus.
                  </p>
                </div>

              </div>
            </div>

            {/* Video 2: Campus Life, Culture & Student Excellence */}
            <div className="organic-video-card-right flex flex-col justify-between">
              <div className="p-3 sm:p-5 flex flex-col h-full space-y-4">
                
                {/* Header bar of Video Card 2 */}
                <div className="flex items-center justify-between gap-3 border-b border-[#dedcd7]/60 pb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-8 h-8 rounded-full bg-[#363538] text-white flex items-center justify-center shrink-0 shadow-xs text-xs font-bold">
                      02
                    </span>
                    <div className="truncate">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#54524e] block">CAMPUS LIFE &amp; CELEBRATION</span>
                      <h3 className="font-playfair font-bold text-sm sm:text-base text-[#252528] truncate">
                        Annual Day, Cultural Fest &amp; Student Events
                      </h3>
                    </div>
                  </div>

                  <a
                    href="https://youtu.be/LtP5bsUIWew?si=_WX5lBdkREoxqx1B"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-full bg-[#363538] hover:bg-[#48474b] text-white text-[11px] font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-xs"
                    title="Open on YouTube"
                  >
                    <Play className="w-3 h-3 fill-current text-white" />
                    <span>YouTube</span>
                    <ExternalLink className="w-3 h-3 text-[#d3d1cc]" />
                  </a>
                </div>

                {/* Embedded Video Player 2 */}
                <div className="organic-video-screen-right aspect-video w-full shadow-inner">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/LtP5bsUIWew?rel=0&modestbranding=1"
                    title="VINS Engineering Annual Day & Student Life Highlights"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                {/* Caption / Description for Video 2 */}
                <div className="bg-white/60 backdrop-blur-xs p-3.5 rounded-2xl border border-amber-400/40/60 text-xs text-[#3a3936] leading-relaxed flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#54524e] shrink-0 mt-0.5" />
                  <p>
                    Experience the dynamic pulse of student extracurriculars, technical symposiums, hackathon competitions, campus placement drives, and cultural celebrations.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

        {/* SECTION F: CAMPUS PHOTO & VIDEO TOUR GALLERY */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#54524e] font-cinzel block">
              CAMPUS VISUAL TOUR
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-playfair text-[#252528]">
              Campus Life &amp; Gallery
            </h2>
          </div>

          {/* Gallery Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['All', 'College Day', 'Campus', 'Labs', 'Events', 'Sports'].map((cat) => (
              <button
                key={cat}
                onClick={() => setGalleryFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  galleryFilter === cat
                    ? 'bg-[#363538] text-white shadow-md border border-amber-400/40/20'
                    : 'bg-white text-[#252528] hover:bg-[#ebe9e4] border border-amber-400/40'
                }`}
              >
                {cat === 'All' ? 'All Photos' : cat}
              </button>
            ))}
          </div>

          {/* Gallery Image Grid with Royal Highlighted Borders */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGallery.slice(0, 8).map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedGalleryImg(img)}
                className="royal-card-highlight aspect-[4/3] cursor-pointer"
              >
                <div className="group relative w-full h-full rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 bg-[#ebe9e4]">
                  <img
                    src={img.imagePath || 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800'}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#252528]/95 via-[#252528]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                    <span className="text-[10px] font-extrabold text-[#eceae6] uppercase tracking-wider">{img.category}</span>
                    <p className="text-xs font-playfair font-bold line-clamp-1">{img.title}</p>
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-white/80">
                      <Eye className="w-3 h-3 text-[#eceae6]" />
                      <span>Click to view full photo</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* SECTION G: ADMISSIONS CTA BANNER - Deep Navy Blue (#0A2540) + Vibrant Amber Orange (#FF6B00) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0A2540] text-white rounded-3xl p-6 sm:p-12 lg:p-14 shadow-2xl border-2 border-white/20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative overflow-hidden">
            
            {/* Subtle Royal Indigo / Orange lighting accents */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#1E40AF]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#FF6B00]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="lg:col-span-7 space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF6B00] text-white text-xs font-bold tracking-wider uppercase shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>ADMISSIONS OPEN 2026-2027</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-poppins text-white leading-tight">
                Begin Your Engineering Journey at VINS
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-white/90 leading-relaxed max-w-xl font-normal">
                Join a distinguished community where curious minds are empowered with cutting-edge skills, global recruitment access, and leadership values.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() => onTabChange('admissions', 'online-form')}
                  className="bg-[#FF6B00] hover:bg-[#E05E00] text-white hover:scale-105 active:scale-95 text-xs font-bold uppercase tracking-widest px-6 sm:px-8 py-3.5 rounded-full cursor-pointer shadow-xl transition-all flex items-center justify-center gap-2 w-full sm:w-auto border border-white/20"
                >
                  <span>APPLY ONLINE NOW</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <button
                  onClick={() => onTabChange('admissions', 'scholarships')}
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0A2540] hover:scale-105 active:scale-95 text-xs font-bold uppercase tracking-widest px-5 sm:px-6 py-3.5 rounded-full cursor-pointer shadow-lg transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <span>SCHOLARSHIPS &amp; AID</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative z-10">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/30 shadow-2xl p-1.5 bg-white/10 backdrop-blur-xs">
                <div className="w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-[#061727]">
                  <img 
                    src="/images/college events and news galeery/5 (1).jpg" 
                    alt="VINS College Students" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* MODAL 1: EVENT DETAILS MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-[#28272b]/95 backdrop-blur-xl text-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-[#dedcd7]/25 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#dedcd7]/20 pb-3">
              <span className="bg-[#363538] text-[#f7f6f4] text-xs font-bold px-3 py-1 rounded-full uppercase border border-amber-400/30">
                {selectedEvent.category}
              </span>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-xs cursor-pointer border border-white/15"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-black/40 border border-white/10">
              <img
                src={selectedEvent.imagePath}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#d3d1cc] font-bold">
                <Calendar className="w-4 h-4 text-[#D4A843]" />
                <span>{selectedEvent.date}</span>
                <span>•</span>
                <MapPin className="w-4 h-4 text-[#D4A843]" />
                <span>VINS Auditorium / Campus Grounds</span>
              </div>
              <h3 className="text-xl font-playfair font-bold text-white">
                {selectedEvent.title}
              </h3>
              <p className="text-xs text-[#d3d1cc] leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#dedcd7]/20 flex items-center justify-between">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs cursor-pointer border border-white/15 transition-all"
              >
                Close Details
              </button>
              <a
                href={`mailto:${COLLEGE_INFO.email}?subject=Inquiry regarding ${selectedEvent.title}`}
                className="btn-valer-green text-xs uppercase tracking-wider px-5 py-2"
              >
                Inquire Details →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: GALLERY LIGHTBOX VIEWER */}
      {selectedGalleryImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="max-w-4xl w-full space-y-4">
            <div className="flex items-center justify-between text-white">
              <div>
                <span className="text-xs text-[#D4A843] font-bold uppercase tracking-wider">{selectedGalleryImg.category}</span>
                <h3 className="font-playfair font-bold text-base">{selectedGalleryImg.title}</h3>
              </div>
              <button
                onClick={() => setSelectedGalleryImg(null)}
                className="w-10 h-10 rounded-full bg-white/15 text-white hover:bg-white/25 flex items-center justify-center font-bold cursor-pointer border border-white/20"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[16/10] bg-black/60 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <img
                src={selectedGalleryImg.imagePath}
                alt={selectedGalleryImg.title}
                className="w-full h-full object-cover"
              />
            </div>
            {selectedGalleryImg.description && (
              <p className="text-xs text-[#d3d1cc] bg-[#28272b]/85 backdrop-blur-md p-3.5 rounded-xl border border-white/15 leading-relaxed">
                {selectedGalleryImg.description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: VIDEO TOUR MODAL */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-[#28272b]/95 backdrop-blur-xl rounded-2xl max-w-3xl w-full p-5 border border-[#dedcd7]/25 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between text-white border-b border-white/10 pb-3">
              <h3 className="font-playfair font-bold text-sm">VINS Campus Video Tour</h3>
              <button onClick={() => setVideoModalOpen(false)} className="text-white/60 hover:text-white font-bold cursor-pointer">✕</button>
            </div>
            <div className="aspect-video bg-black/80 rounded-xl overflow-hidden border border-white/10 shadow-inner">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/LtP5bsUIWew"
                title="VINS Campus Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: DOCUMENT VIEWER FOR PDF NOTICES */}
      <DocumentViewerModal document={selectedPdfDoc} onClose={() => setSelectedPdfDoc(null)} />

    </div>
  );
};
