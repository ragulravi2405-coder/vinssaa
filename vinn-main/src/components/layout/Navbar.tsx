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
      <header className="sticky top-0 z-40 shadow-lg transition-all">
        {/* TOP BRANDING ROW: PURE WHITE */}
        <div className="bg-white border-b border-gray-200 shadow-sm relative overflow-hidden">
          <div className="relative max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8">
            
            {/* TOP ROW: Flex Responsive Layout */}
            <div className="flex flex-col xl:flex-row items-center justify-between py-1.5 sm:py-3.5 gap-0 sm:gap-4 w-full">
              
              {/* ═══════════════════════════════════════════════════════════ */}
              {/* MOBILE LAYOUT (hidden on xl+)                              */}
              {/* ═══════════════════════════════════════════════════════════ */}

              {/* MOBILE ROW 1: VINS Logo CENTERED + Hamburger floating right */}
              <div className="w-full xl:hidden relative flex items-center justify-center py-1.5">
                
                {/* VINSPELL LOGO — Centered */}
                <div 
                  onClick={() => handleNavClick('home')}
                  className="cursor-pointer group"
                  title="VINS Christian College of Engineering - Home"
                >
                  <div className="px-3 py-2 bg-white rounded-xl border border-gray-200 shadow-sm group-hover:border-gray-400 transition-all flex items-center justify-center">
                    <img
                      src="/images/logo/vins spell logo.png"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/logo/vins logooo.jpg';
                      }}
                      alt="VINS Spell Logo"
                      className="h-12 min-[360px]:h-13 min-[390px]:h-14 sm:h-16 w-auto max-w-[240px] min-[360px]:max-w-[260px] min-[390px]:max-w-[290px] sm:max-w-[380px] object-contain drop-shadow-xl group-hover:scale-[1.02] transition-transform"
                    />
                  </div>
                </div>

                {/* Hamburger — Absolutely positioned to the right */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 sm:p-2.5 rounded-lg text-gray-700 hover:bg-gray-100 bg-gray-50 border border-gray-200 transition-colors shadow-sm active:scale-95 cursor-pointer touch-manipulation"
                    aria-label="Toggle Navigation Menu"
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-amber-500" />}
                  </button>
                </div>
              </div>

              {/* MOBILE ROW 2: All Badges & Icons in a centered balanced row */}
              <div className="w-full xl:hidden flex items-center justify-center gap-2 sm:gap-3 pb-2">
                {/* NIRF */}
                <div className="p-1 sm:p-1.5 bg-white rounded-md shadow-sm border border-gray-200 hover:border-gray-400 hover:scale-105 transition-all cursor-pointer shrink-0">
                  <img src="/images/logo/nirf.jpeg" alt="NIRF" className="h-7 sm:h-9 object-contain rounded-xs" title="NIRF Ranked Institution" />
                </div>
                {/* NAAC */}
                <div className="p-1 sm:p-1.5 bg-white rounded-md shadow-sm border border-gray-200 hover:border-gray-400 hover:scale-105 transition-all cursor-pointer shrink-0">
                  <img src="/images/logo/naac.png" alt="NAAC" className="h-7 sm:h-9 object-contain" title="NAAC Accredited" />
                </div>
                {/* CODE */}
                <div 
                  className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-md bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-400 text-slate-950 font-black shadow-md border border-yellow-300 hover:scale-105 transition-transform cursor-pointer select-none flex flex-col items-center justify-center shrink-0"
                  title="Anna University Counselling Code: 4982"
                >
                  <span className="text-[6px] sm:text-[7px] font-black uppercase tracking-wider text-amber-950 leading-tight">CODE</span>
                  <span className="text-[10px] sm:text-[11px] font-black tracking-tight leading-none text-slate-950">{siteTheme?.tneaCode || '4982'}</span>
                </div>
                {/* IIC */}
                <div className="p-1 sm:p-1.5 bg-white rounded-md shadow-sm border border-gray-200 hover:border-gray-400 hover:scale-105 transition-all cursor-pointer shrink-0">
                  <img src="/images/logo/iic.png" alt="IIC" className="h-7 sm:h-9 object-contain" title="Institution's Innovation Council" />
                </div>
                {/* ERP */}
                <div className="p-1 sm:p-1.5 bg-white rounded-md shadow-sm border border-gray-200 hover:border-gray-400 hover:scale-105 transition-all cursor-pointer shrink-0">
                  <img src="/images/logo/erp.png" alt="ERP" className="h-7 sm:h-9 object-contain" title="ERP Automation System" />
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════════ */}
              {/* DESKTOP LAYOUT (hidden below xl)                           */}
              {/* ═══════════════════════════════════════════════════════════ */}

              {/* DESKTOP LEFT COLUMN: Accreditations */}
              <div className="hidden xl:flex xl:w-auto xl:flex-1 items-center justify-start gap-2.5">
                <div className="p-1.5 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-gray-400 hover:scale-105 transition-all cursor-pointer shrink-0">
                  <img src="/images/logo/nirf.jpeg" alt="NIRF" className="h-12 object-contain rounded-xs" title="NIRF Ranked Institution" />
                </div>
                <div className="p-1.5 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-gray-400 hover:scale-105 transition-all cursor-pointer shrink-0">
                  <img src="/images/logo/naac.png" alt="NAAC" className="h-12 object-contain" title="NAAC Accredited" />
                </div>
                <div 
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-400 text-slate-950 font-black shadow-md border border-yellow-300 hover:scale-105 transition-transform cursor-pointer select-none flex flex-col items-center justify-center min-w-[80px] shrink-0"
                  title="Anna University Counselling Code: 4982"
                >
                  <span className="text-[8px] font-black uppercase tracking-wider text-amber-950 leading-tight text-center">CODE</span>
                  <span className="text-lg font-black tracking-tight leading-none text-slate-950">{siteTheme?.tneaCode || '4982'}</span>
                </div>
              </div>

              {/* DESKTOP CENTER COLUMN: VINS SPELL LOGO */}
              <div 
                onClick={() => handleNavClick('home')}
                className="hidden xl:flex xl:flex-none items-center justify-center cursor-pointer group py-0.5 text-center px-1 mx-4"
                title="VINS Christian College of Engineering - Home"
              >
                <div className="p-2.5 bg-white rounded-2xl border border-gray-200 shadow-sm group-hover:border-gray-400 transition-all flex items-center justify-center w-[580px]">
                  <img
                    src="/images/logo/vins spell logo.png"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/logo/vins logooo.jpg';
                    }}
                    alt="VINS Spell Logo"
                    className="h-24 object-contain drop-shadow-2xl group-hover:scale-[1.02] transition-transform"
                  />
                </div>
              </div>

              {/* DESKTOP RIGHT COLUMN: Icons (IIC, ERP) + Contact Button */}
              <div className="hidden xl:flex xl:flex-1 items-center justify-end gap-3 shrink-0">
                
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-gray-400 hover:scale-105 transition-all cursor-pointer">
                    <img
                      src="/images/logo/iic.png"
                      alt="IIC"
                      className="h-12 object-contain"
                      title="Institution's Innovation Council"
                    />
                  </div>
                  <div className="p-1.5 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-gray-400 hover:scale-105 transition-all cursor-pointer">
                    <img
                      src="/images/logo/erp.png"
                      alt="ERP"
                      className="h-12 object-contain"
                      title="ERP Automation System"
                    />
                  </div>
                </div>

                {/* Contact Button */}
                <div className="flex items-center pl-1">
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="btn-valer-green text-xs uppercase tracking-widest px-4 py-2 cursor-pointer active:scale-95 transition-transform font-bold whitespace-nowrap shadow-md"
                  >
                    <span>CONTACT</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: DESKTOP NAVIGATION MENU — Soft Cement Grey Glass */}
        <div className="border-t border-[#dedcd7]/15 py-2.5 w-full bg-[#252427]/92 backdrop-blur-xl shadow-[0_2px_20px_rgba(37,36,39,0.35)]">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hidden xl:flex items-center justify-center w-full">
            <nav className="flex items-center justify-center space-x-1.5 2xl:space-x-2.5 font-sans-clean flex-nowrap mx-auto">
              
              {/* Home */}
              <button
                onClick={() => handleNavClick('home')}
                className={`px-3.5 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-extrabold uppercase tracking-widest transition-all duration-[220ms] cursor-pointer whitespace-nowrap relative ${
                  currentTab === 'home'
                    ? 'text-[#F7DC84] bg-gradient-to-r from-amber-500/20 to-amber-400/12 shadow-[0_0_0_1px_rgba(212,168,67,0.3)_inset]'
                    : 'text-white/75 hover:text-[#F7DC84] hover:bg-gradient-to-r hover:from-amber-500/18 hover:to-amber-400/10'
                }`}
              >
                Home
              </button>

              {/* Pages Dropdown (About, Placements, Campus, Facilities, NAAC) */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('pages')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleNavClick('about')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-extrabold uppercase tracking-widest transition-all duration-[220ms] flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                    ['about', 'placement', 'facilities', 'campus', 'naac', 'iqac', 'committees'].includes(currentTab)
                      ? 'text-[#F7DC84] bg-gradient-to-r from-amber-500/20 to-amber-400/12 shadow-[0_0_0_1px_rgba(212,168,67,0.3)_inset]'
                      : 'text-white/85 hover:text-[#F7DC84] hover:bg-gradient-to-r hover:from-amber-500/18 hover:to-amber-400/10'
                  }`}
                >
                  <span>Pages</span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/60 group-hover:rotate-180 transition-transform" />
                </button>

                {activeDropdown === 'pages' && (
                  <div className="absolute top-full left-0 w-72 bg-[#28272b]/95 backdrop-blur-2xl text-white rounded-2xl shadow-2xl border border-[#dedcd7]/25 py-2.5 animate-fade-in z-50">
                    <div className="px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-amber-400/90 border-b border-white/10">
                      College &amp; Institutional Pages
                    </div>
                    <button
                      onClick={() => handleNavClick('about', 'vision')}
                      className="w-full text-left px-4 py-2.5 text-xs font-bold text-white/85 hover:bg-gradient-to-r hover:from-amber-500/15 hover:to-transparent hover:text-[#F7DC84] transition-all pl-4 hover:pl-5"
                    >
                      About VINS Legacy &amp; Vision
                    </button>
                    <button
                      onClick={() => handleNavClick('about', 'chairman')}
                      className="w-full text-left px-4 py-2.5 text-xs font-bold text-white/85 hover:bg-gradient-to-r hover:from-amber-500/15 hover:to-transparent hover:text-[#F7DC84] transition-all pl-4 hover:pl-5"
                    >
                      Founder Chairman Desk
                    </button>
                    <button
                      onClick={() => handleNavClick('about', 'principal')}
                      className="w-full text-left px-4 py-2.5 text-xs font-bold text-white/85 hover:bg-gradient-to-r hover:from-amber-500/15 hover:to-transparent hover:text-[#F7DC84] transition-all pl-4 hover:pl-5"
                    >
                      Principal&apos;s Desk
                    </button>
                    <button
                      onClick={() => handleNavClick('facilities')}
                      className="w-full text-left px-4 py-2.5 text-xs font-bold text-white/85 hover:bg-gradient-to-r hover:from-amber-500/15 hover:to-transparent hover:text-[#F7DC84] transition-all pl-4 hover:pl-5 border-t border-amber-500/10"
                    >
                      Campus Infrastructure &amp; Labs
                    </button>
                    <button
                      onClick={() => handleNavClick('committees')}
                      className="w-full text-left px-4 py-2.5 text-xs font-bold text-white/85 hover:bg-gradient-to-r hover:from-amber-500/15 hover:to-transparent hover:text-[#F7DC84] transition-all pl-4 hover:pl-5"
                    >
                      Statutory Committees &amp; Grievance
                    </button>
                  </div>
                )}
              </div>

              {/* News & Circulars */}
              <button
                onClick={() => handleNavClick('notifications')}
                className={`px-3.5 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-extrabold uppercase tracking-widest transition-all duration-[220ms] flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  currentTab === 'notifications'
                    ? 'text-[#F7DC84] bg-gradient-to-r from-amber-500/20 to-amber-400/12 shadow-[0_0_0_1px_rgba(212,168,67,0.3)_inset]'
                    : 'text-white/75 hover:text-[#F7DC84] hover:bg-gradient-to-r hover:from-amber-500/18 hover:to-amber-400/10'
                }`}
              >
                <span>News</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8c6c2] opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e0dedb]"></span>
                </span>
              </button>

              {/* Events */}
              <button
                onClick={() => handleNavClick('campus')}
                className={`px-3.5 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-extrabold uppercase tracking-widest transition-all duration-[220ms] cursor-pointer whitespace-nowrap ${
                  currentTab === 'campus'
                    ? 'text-[#F7DC84] bg-gradient-to-r from-amber-500/20 to-amber-400/12 shadow-[0_0_0_1px_rgba(212,168,67,0.3)_inset]'
                    : 'text-white/75 hover:text-[#F7DC84] hover:bg-gradient-to-r hover:from-amber-500/18 hover:to-amber-400/10'
                }`}
              >
                Events
              </button>

              {/* Courses / Departments Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('courses')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleNavClick('department')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-extrabold uppercase tracking-widest transition-all duration-[220ms] flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                    currentTab === 'department'
                      ? 'text-[#F7DC84] bg-gradient-to-r from-amber-500/20 to-amber-400/12 shadow-[0_0_0_1px_rgba(212,168,67,0.3)_inset]'
                      : 'text-white/85 hover:text-[#F7DC84] hover:bg-gradient-to-r hover:from-amber-500/18 hover:to-amber-400/10'
                  }`}
                >
                  <span>Courses</span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/60 group-hover:rotate-180 transition-transform" />
                </button>

                {activeDropdown === 'courses' && (
                  <div className="absolute top-full left-0 w-[540px] max-w-[calc(100vw-2rem)] bg-[#28272b]/95 backdrop-blur-2xl text-white rounded-2xl shadow-2xl border border-[#dedcd7]/25 p-4 grid grid-cols-2 gap-2 animate-fade-in z-50">
                    <div className="col-span-2 pb-2 mb-1 border-b border-white/10 flex items-center justify-between">
                      <span className="text-[11px] font-extrabold text-amber-400/90 uppercase tracking-widest">Engineering &amp; Management Programs</span>
                      <button
                        onClick={() => handleNavClick('department')}
                        className="text-xs text-white/80 hover:text-[#F7DC84] font-bold transition-colors"
                      >
                        All Departments →
                      </button>
                    </div>
                    {DEPARTMENTS_DATA.map((dept) => (
                      <button
                        key={dept.id}
                        onClick={() => handleNavClick('department', undefined, dept.id)}
                        className="text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-amber-500/15 hover:to-transparent text-xs font-semibold text-white/85 hover:text-[#F7DC84] transition-all flex items-center justify-between border border-white/8 hover:border-amber-500/30"
                      >
                        <span className="truncate pr-1">{dept.shortName ? `${dept.shortName} - ` : ''}{dept.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-[#1c1c1e]/80 text-amber-400/80 rounded font-black shrink-0 border border-amber-500/20">
                          {dept.degree}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Admissions Tab */}
              <button
                onClick={() => handleNavClick('admissions')}
                className={`px-3.5 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-extrabold uppercase tracking-widest transition-all duration-[220ms] cursor-pointer whitespace-nowrap ${
                  currentTab === 'admissions'
                    ? 'text-[#F7DC84] bg-gradient-to-r from-amber-500/20 to-amber-400/12 shadow-[0_0_0_1px_rgba(212,168,67,0.3)_inset]'
                    : 'text-white/75 hover:text-[#F7DC84] hover:bg-gradient-to-r hover:from-amber-500/18 hover:to-amber-400/10'
                }`}
              >
                Admissions
              </button>

              {/* Placement Tab */}
              <button
                onClick={() => handleNavClick('placement')}
                className={`px-3.5 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-extrabold uppercase tracking-widest transition-all duration-[220ms] cursor-pointer whitespace-nowrap ${
                  currentTab === 'placement'
                    ? 'text-[#F7DC84] bg-gradient-to-r from-amber-500/20 to-amber-400/12 shadow-[0_0_0_1px_rgba(212,168,67,0.3)_inset]'
                    : 'text-white/75 hover:text-[#F7DC84] hover:bg-gradient-to-r hover:from-amber-500/18 hover:to-amber-400/10'
                }`}
              >
                Placement
              </button>

              {/* NAAC Tab */}
              <button
                onClick={() => handleNavClick('naac')}
                className={`px-3.5 py-1.5 rounded-lg text-xs 2xl:text-[13px] font-extrabold uppercase tracking-widest transition-all duration-[220ms] cursor-pointer whitespace-nowrap ${
                  currentTab === 'naac'
                    ? 'text-[#F7DC84] bg-gradient-to-r from-amber-500/20 to-amber-400/12 shadow-[0_0_0_1px_rgba(212,168,67,0.3)_inset]'
                    : 'text-white/75 hover:text-[#F7DC84] hover:bg-gradient-to-r hover:from-amber-500/18 hover:to-amber-400/10'
                }`}
              >
                NAAC
              </button>

              {/* Dynamic Custom Navbar Action Buttons */}
              {navbarButtons.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => handleCustomButtonClick(btn)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-[220ms] flex items-center gap-1.5 cursor-pointer whitespace-nowrap bg-gradient-to-r from-amber-500/12 to-amber-400/8 hover:from-amber-500/22 hover:to-amber-400/16 text-amber-300/90 hover:text-[#F7DC84] border border-amber-500/20 hover:border-amber-400/40 shadow-xs"
                >
                  {renderIcon(btn.iconName)}
                  <span>{btn.label}</span>
                  {btn.badge && (
                    <span className="px-1 py-0.2 bg-amber-900/60 text-amber-300 text-[9px] rounded font-black uppercase border border-amber-500/30">
                      {btn.badge}
                    </span>
                  )}
                </button>
              ))}

              {/* Admin Console Shortcut */}
              <button
                onClick={() => handleNavClick('admin')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-[220ms] flex items-center gap-1.5 cursor-pointer whitespace-nowrap border ${
                  currentTab === 'admin'
                    ? 'text-[#F7DC84] bg-gradient-to-r from-amber-500/20 to-amber-400/12 border-amber-500/35'
                    : 'text-white/65 bg-white/5 hover:bg-gradient-to-r hover:from-amber-500/15 hover:to-amber-400/8 hover:text-[#F7DC84] border-white/10 hover:border-amber-500/30'
                }`}
                title="Admin Content Management Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400/80" />
                <span className="text-[11px] uppercase tracking-wider">Admin</span>
              </button>

            </nav>
          </div>
        </div>
      </div>

        {/* Mobile Drawer Menu - Styled in Frosted Dark Cement Glass */}
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
