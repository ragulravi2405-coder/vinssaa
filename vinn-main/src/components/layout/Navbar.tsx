import React, { useState } from 'react';
import { Menu, X, ChevronDown, GraduationCap, ArrowRight, ShieldCheck, Bell, Sparkles, BookOpen, Layers, Award, Building, Phone, Trophy, Globe, FileText, ExternalLink } from 'lucide-react';
import { NavigationTab, DocumentItem, CustomNavButton } from '../../types';
import { DEPARTMENTS_DATA } from '../../data/departmentsData';
import { DOCUMENTS_LIST } from '../../data/collegeData';
import { DocumentViewerModal } from '../common/DocumentViewerModal';
import { useAdminData } from '../../context/AdminDataContext';

interface NavbarProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab, anchorId?: string, departmentId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onTabChange }) => {
  const { customNavButtons, siteTheme } = useAdminData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  const mandatoryDoc = DOCUMENTS_LIST.find((d) => d.id === 'doc-mandatory') || DOCUMENTS_LIST[5];

  // Dynamic custom navbar buttons
  const navbarButtons = customNavButtons.filter(b => b.location === 'navbar' && b.isActive);

  const toggleMobileSection = (section: string) => {
    setExpandedMobileSection(expandedMobileSection === section ? null : section);
  };

  const handleNavClick = (tab: NavigationTab, anchorId?: string, departmentId?: string) => {
    onTabChange(tab, anchorId, departmentId);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleCustomButtonClick = (btn: CustomNavButton) => {
    if (btn.actionType === 'url' && btn.targetUrl) {
      if (btn.openInNewTab) {
        window.open(btn.targetUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = btn.targetUrl;
      }
    } else if (btn.actionType === 'tab' && btn.targetTab) {
      handleNavClick(btn.targetTab, btn.targetAnchor);
    }
  };

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-3.5 h-3.5 text-amber-400" />;
      case 'GraduationCap': return <GraduationCap className="w-3.5 h-3.5 text-sky-400" />;
      case 'Trophy': return <Trophy className="w-3.5 h-3.5 text-amber-400" />;
      case 'Award': return <Award className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Bell': return <Bell className="w-3.5 h-3.5 text-rose-400" />;
      case 'Globe': return <Globe className="w-3.5 h-3.5 text-blue-400" />;
      case 'FileText': return <FileText className="w-3.5 h-3.5 text-indigo-400" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <>
      <header className="relative w-full transition-all">
        {/* MAIN BRAND HEADER ROW: PURE WHITE */}
        <div className="bg-white border-b border-gray-200 shadow-sm relative">
          <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
            
            <div className="flex items-center justify-between gap-3 sm:gap-6 w-full">
              
              {/* BRANDING LEFT COLUMN: Logo + College Title */}
              <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                {/* VINS LOGO & TITLE */}
                <div 
                  onClick={() => handleNavClick('home')}
                  className="cursor-pointer group flex items-center gap-3 shrink-0 py-1"
                  title="VINS Christian College of Engineering - Home"
                >
                  <img
                    src="/images/logo/vins spell logo.png"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/logo/vins logooo.jpg';
                    }}
                    alt="VINS Logo"
                    className="h-12 min-[360px]:h-14 min-[390px]:h-16 sm:h-20 lg:h-24 w-auto max-w-[260px] min-[360px]:max-w-[290px] min-[390px]:max-w-[340px] sm:max-w-[480px] lg:max-w-[620px] object-contain drop-shadow-lg group-hover:scale-[1.01] transition-transform"
                  />
                </div>
              </div>

              {/* ACCREDITATION LOGOS RIGHT COLUMN (NIRF, NAAC, CODE 4982, IIC, ERP) */}
              <div className="hidden lg:flex items-center gap-2.5 shrink-0">
                {/* NIRF */}
                <div className="p-1 bg-white rounded shadow-2xs border border-gray-200 hover:scale-105 transition-transform cursor-pointer shrink-0">
                  <img src="/images/logo/nirf.jpeg" alt="NIRF" className="h-10 lg:h-11 object-contain rounded-xs" title="NIRF Ranked Institution" />
                </div>
                {/* NAAC */}
                <div className="p-1 bg-white rounded shadow-2xs border border-gray-200 hover:scale-105 transition-transform cursor-pointer shrink-0">
                  <img src="/images/logo/naac.png" alt="NAAC" className="h-10 lg:h-11 object-contain" title="NAAC Accredited" />
                </div>
                {/* CODE */}
                <div 
                  className="px-2.5 py-1 rounded bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-400 text-slate-950 font-black shadow-2xs border border-yellow-300 hover:scale-105 transition-transform cursor-pointer select-none flex flex-col items-center justify-center shrink-0 min-w-[70px]"
                  title="Anna University Counselling Code: 4982"
                >
                  <span className="text-[7px] font-black uppercase tracking-wider text-amber-950 leading-tight">CODE</span>
                  <span className="text-base font-black tracking-tight leading-none text-slate-950">{siteTheme?.tneaCode || '4982'}</span>
                </div>
                {/* IIC */}
                <div className="p-1 bg-white rounded shadow-2xs border border-gray-200 hover:scale-105 transition-transform cursor-pointer shrink-0">
                  <img src="/images/logo/iic.png" alt="IIC" className="h-10 lg:h-11 object-contain" title="Institution's Innovation Council" />
                </div>
                {/* ERP */}
                <div className="p-1 bg-white rounded shadow-2xs border border-gray-200 hover:scale-105 transition-transform cursor-pointer shrink-0">
                  <img src="/images/logo/erp.png" alt="ERP" className="h-10 lg:h-11 object-contain" title="ERP Automation System" />
                </div>
              </div>

              {/* MOBILE HAMBURGER BUTTON */}
              <div className="xl:hidden flex items-center gap-2">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 bg-gray-50 border border-gray-200 transition-colors shadow-xs active:scale-95 cursor-pointer touch-manipulation"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-[#C81E51]" />}
                </button>
              </div>

            </div>

            {/* MOBILE ACCREDITATION LOGOS HORIZONTAL SCROLL ROW */}
            <div className="lg:hidden flex items-center justify-start gap-2 pt-2.5 overflow-x-auto no-scrollbar border-t border-gray-100 mt-2">
              <div className="p-1 bg-white rounded border border-gray-200 shrink-0">
                <img src="/images/logo/nirf.jpeg" alt="NIRF" className="h-7 object-contain rounded-xs" />
              </div>
              <div className="p-1 bg-white rounded border border-gray-200 shrink-0">
                <img src="/images/logo/naac.png" alt="NAAC" className="h-7 object-contain" />
              </div>
              <div className="px-2 py-0.5 rounded bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-400 text-slate-950 font-black border border-yellow-300 shrink-0 flex flex-col items-center justify-center">
                <span className="text-[6px] font-black uppercase text-amber-950 leading-tight">CODE</span>
                <span className="text-[10px] font-black leading-none text-slate-950">{siteTheme?.tneaCode || '4982'}</span>
              </div>
              <div className="p-1 bg-white rounded border border-gray-200 shrink-0">
                <img src="/images/logo/iic.png" alt="IIC" className="h-7 object-contain" />
              </div>
              <div className="p-1 bg-white rounded border border-gray-200 shrink-0">
                <img src="/images/logo/erp.png" alt="ERP" className="h-7 object-contain" />
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM ROW: DESKTOP NAVIGATION MENU — Dark Pink Magenta Accent */}
        <div className="border-t border-white/15 py-2.5 w-full bg-[#C81E51] backdrop-blur-xl shadow-[0_2px_20px_rgba(200,30,81,0.35)]">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hidden xl:flex items-center justify-center relative w-full">
            <nav className="flex items-center space-x-1.5 2xl:space-x-3 font-sans-clean flex-nowrap mx-auto">
              
              {/* Home */}
              <button
                onClick={() => handleNavClick('home')}
                className={`px-3 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-extrabold uppercase tracking-wider transition-all duration-[220ms] cursor-pointer whitespace-nowrap relative ${
                  currentTab === 'home'
                    ? 'text-white bg-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.4)_inset]'
                    : 'text-white/85 hover:text-white hover:bg-white/15'
                }`}
              >
                Home
              </button>

              {/* About */}
              <button
                onClick={() => handleNavClick('about')}
                className={`px-3 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-extrabold uppercase tracking-wider transition-all duration-[220ms] cursor-pointer whitespace-nowrap ${
                  currentTab === 'about'
                    ? 'text-white bg-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.4)_inset]'
                    : 'text-white/85 hover:text-white hover:bg-white/15'
                }`}
              >
                About
              </button>

              {/* Academics */}
              <button
                onClick={() => handleNavClick('department')}
                className={`px-3 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-extrabold uppercase tracking-wider transition-all duration-[220ms] cursor-pointer whitespace-nowrap ${
                  currentTab === 'department'
                    ? 'text-white bg-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.4)_inset]'
                    : 'text-white/85 hover:text-white hover:bg-white/15'
                }`}
              >
                Academics
              </button>

              {/* Admissions */}
              <button
                onClick={() => handleNavClick('admissions')}
                className={`px-3 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-extrabold uppercase tracking-wider transition-all duration-[220ms] cursor-pointer whitespace-nowrap ${
                  currentTab === 'admissions'
                    ? 'text-white bg-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.4)_inset]'
                    : 'text-white/85 hover:text-white hover:bg-white/15'
                }`}
              >
                Admissions
              </button>

              {/* Departments */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('courses')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleNavClick('department')}
                  className={`px-3 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-extrabold uppercase tracking-wider transition-all duration-[220ms] flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                    currentTab === 'department'
                      ? 'text-white bg-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.4)_inset]'
                      : 'text-white/85 hover:text-white hover:bg-white/15'
                  }`}
                >
                  <span>Departments</span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/70 group-hover:rotate-180 transition-transform" />
                </button>

                {activeDropdown === 'courses' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[520px] max-w-[calc(100vw-2rem)] bg-white text-slate-900 rounded-2xl shadow-2xl border border-gray-200 p-4 grid grid-cols-2 gap-2 animate-fade-in z-50">
                    <div className="col-span-2 pb-2 mb-1 border-b border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] font-extrabold text-[#C81E51] uppercase tracking-widest">Engineering &amp; Management Programs</span>
                    </div>
                    {DEPARTMENTS_DATA.map((dept) => (
                      <button
                        key={dept.id}
                        onClick={() => handleNavClick('department', undefined, dept.id)}
                        className="text-left px-3 py-2 rounded-xl bg-gray-50 hover:bg-[#C81E51] text-xs font-bold text-slate-800 hover:text-white transition-all flex items-center justify-between border border-gray-200/60 hover:border-[#C81E51] shadow-2xs group cursor-pointer"
                      >
                        <span className="truncate pr-1">{dept.shortName ? `${dept.shortName} - ` : ''}{dept.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Placements */}
              <button
                onClick={() => handleNavClick('placement')}
                className={`px-3 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-extrabold uppercase tracking-wider transition-all duration-[220ms] cursor-pointer whitespace-nowrap ${
                  currentTab === 'placement'
                    ? 'text-white bg-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.4)_inset]'
                    : 'text-white/85 hover:text-white hover:bg-white/15'
                }`}
              >
                Placements
              </button>

              {/* NAAC */}
              <button
                onClick={() => handleNavClick('naac')}
                className={`px-3 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-extrabold uppercase tracking-wider transition-all duration-[220ms] cursor-pointer whitespace-nowrap ${
                  currentTab === 'naac'
                    ? 'text-white bg-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.4)_inset]'
                    : 'text-white/85 hover:text-white hover:bg-white/15'
                }`}
              >
                NAAC
              </button>

              {/* Contact */}
              <button
                onClick={() => handleNavClick('contact')}
                className={`px-3 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-extrabold uppercase tracking-wider transition-all duration-[220ms] cursor-pointer whitespace-nowrap ${
                  currentTab === 'contact'
                    ? 'text-white bg-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.4)_inset]'
                    : 'text-white/85 hover:text-white hover:bg-white/15'
                }`}
              >
                Contact
              </button>

            </nav>

            {/* APPLY ONLINE NOW CTA BUTTON */}
            <button
              onClick={() => handleNavClick('admissions', 'online-form')}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-[#C81E51] font-black text-xs uppercase tracking-wider px-5 py-2 rounded-full hover:bg-slate-100 transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>APPLY ONLINE NOW</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C81E51]" />
            </button>

            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#1e1e20]/95 backdrop-blur-2xl border-t border-[#dedcd7]/20 px-4 py-6 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto animate-fade-in shadow-2xl text-white mobile-dropdown-menu">
            <button
              onClick={() => handleNavClick('admissions', 'online-form')}
              className="w-full btn-gold text-xs font-extrabold uppercase tracking-wider py-3 px-4 rounded-full shadow-lg flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Apply Online</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Custom Dynamic Buttons */}
            {navbarButtons.length > 0 && (
              <div className="grid grid-cols-2 gap-2 pt-1 pb-1">
                {navbarButtons.map((btn) => (
                  <button
                    key={`mob-${btn.id}`}
                    onClick={() => handleCustomButtonClick(btn)}
                    className="p-2.5 rounded-lg bg-white/10 border border-white/20 text-left text-xs font-bold flex items-center gap-2 hover:bg-white/20 text-white"
                  >
                    {renderIcon(btn.iconName)}
                    <span className="truncate">{btn.label}</span>
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => handleNavClick('home')}
              className="w-full text-left py-2.5 font-bold text-sm text-white/85 hover:text-[#F7DC84] border-b border-white/10 px-2 hover:bg-gradient-to-r hover:from-amber-500/12 hover:to-transparent rounded transition-all duration-200"
            >
              Home
            </button>

            {/* Placement & NAAC Top-Level */}
            <button
              onClick={() => handleNavClick('placement')}
              className="w-full text-left py-2.5 font-bold text-sm text-white/85 hover:text-[#F7DC84] border-b border-white/10 px-2 hover:bg-gradient-to-r hover:from-amber-500/12 hover:to-transparent rounded transition-all duration-200"
            >
              Placement
            </button>
            <button
              onClick={() => handleNavClick('naac')}
              className="w-full text-left py-2.5 font-bold text-sm text-white/85 hover:text-[#F7DC84] border-b border-white/10 px-2 hover:bg-gradient-to-r hover:from-amber-500/12 hover:to-transparent rounded transition-all duration-200"
            >
              NAAC
            </button>

            {/* Pages Accordion */}
            <div className="border-b border-white/10 pb-2">
              <button
                onClick={() => toggleMobileSection('pages')}
                className="w-full text-left py-2.5 font-bold text-sm text-white flex items-center justify-between px-2 hover:bg-white/5 rounded"
              >
                Pages
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedMobileSection === 'pages' ? 'rotate-180' : ''}`} />
              </button>
              {expandedMobileSection === 'pages' && (
                <div className="pl-4 pt-2 space-y-1.5 text-xs text-white/80">
                  <button onClick={() => handleNavClick('about', 'vision')} className="block py-1.5 hover:text-[#F7DC84] w-full text-left px-2 rounded hover:bg-amber-500/10 transition-all duration-200">Vision &amp; Mission</button>
                  <button onClick={() => handleNavClick('about', 'profile')} className="block py-1.5 hover:text-[#F7DC84] w-full text-left px-2 rounded hover:bg-amber-500/10 transition-all duration-200">College Profile &amp; Legacy</button>
                  <button onClick={() => handleNavClick('about', 'chairman')} className="block py-1.5 hover:text-[#F7DC84] w-full text-left px-2 rounded hover:bg-amber-500/10 transition-all duration-200">Founder Chairman</button>
                  <button onClick={() => handleNavClick('facilities')} className="block py-1.5 hover:text-[#F7DC84] w-full text-left px-2 rounded hover:bg-amber-500/10 transition-all duration-200">Campus Facilities &amp; Labs</button>
                  <button onClick={() => handleNavClick('committees')} className="block py-1.5 hover:text-[#F7DC84] w-full text-left px-2 rounded hover:bg-amber-500/10 transition-all duration-200">Statutory Committees</button>
                </div>
              )}
            </div>

            {/* Courses Accordion */}
            <div className="border-b border-white/10 pb-2">
              <button
                onClick={() => toggleMobileSection('courses')}
                className="w-full text-left py-2.5 font-bold text-sm text-white flex items-center justify-between px-2 hover:bg-white/5 rounded"
              >
                Courses & Departments (8)
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedMobileSection === 'courses' ? 'rotate-180' : ''}`} />
              </button>
              {expandedMobileSection === 'courses' && (
                <div className="pl-4 pt-2 space-y-1 text-xs text-white/80 max-h-48 overflow-y-auto">
                  <button onClick={() => handleNavClick('department')} className="block py-1.5 font-bold text-[#c8c6c2] w-full text-left px-2 rounded hover:bg-white/5">View All Degree Programs</button>
                  {DEPARTMENTS_DATA.map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => handleNavClick('department', undefined, dept.id)}
                      className="block py-1.5 hover:text-[#c8c6c2] w-full text-left px-2 rounded hover:bg-white/5 w-full truncate"
                    >
                      {dept.shortName ? `${dept.shortName} - ` : ''}{dept.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => handleNavClick('notifications')} className="w-full text-left py-2.5 font-bold text-sm text-white bg-white/5 px-3 rounded-lg flex items-center justify-between hover:bg-white/10 transition-all border border-[#c8c6c2]/15">
              <span className="flex items-center gap-2 min-w-0">
                <Bell className="w-4 h-4 text-[#c8c6c2] shrink-0" />
                <span className="truncate">Live Notifications & News</span>
              </span>
              <span className="text-[10px] bg-[#3a3a3c] text-[#c8c6c2] font-bold px-2 py-0.5 rounded-full animate-pulse shrink-0">LIVE</span>
            </button>

            <button onClick={() => handleNavClick('campus')} className="w-full text-left py-2.5 font-bold text-sm text-white border-b border-white/10 px-2 hover:bg-white/5 rounded">Events & Campus Life</button>
            <button onClick={() => handleNavClick('admissions')} className="w-full text-left py-2.5 font-bold text-sm text-white border-b border-white/10 px-2 hover:bg-white/5 rounded">Admissions 2026-27</button>
            <button onClick={() => handleNavClick('contact')} className="w-full text-left py-2.5 font-bold text-sm text-white border-b border-white/10 px-2 hover:bg-white/5 rounded">Contact Us</button>

            <button onClick={() => handleNavClick('admin')} className="w-full text-left py-3 font-bold text-sm text-white/85 bg-gradient-to-r from-amber-500/10 to-transparent px-3 rounded-lg flex items-center justify-between hover:from-amber-500/20 hover:text-[#F7DC84] transition-all duration-200 border border-amber-500/20 hover:border-amber-500/35">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#c8c6c2]" />
                <span>Admin Management Console</span>
              </span>
              <span className="text-[10px] bg-[#3a3a3c] text-[#c8c6c2] font-bold px-2 py-0.5 rounded border border-[#c8c6c2]/20">PORTAL</span>
            </button>

            <button
              onClick={() => setSelectedDoc(mandatoryDoc)}
              className="w-full py-2.5 text-xs font-bold text-white/90 bg-white/10 rounded-lg text-center border border-white/20 hover:bg-white/20 transition-all active:scale-95"
            >
              📄 Mandatory Disclosure PDF
            </button>
          </div>
        )}
      </header>

      {/* Document Modal */}
      <DocumentViewerModal document={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </>
  );
};
