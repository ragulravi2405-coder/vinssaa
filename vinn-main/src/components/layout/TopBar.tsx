import React, { useState } from 'react';
import { Search, MapPin, Phone, Mail, Lock, Globe, X, ArrowRight, BookOpen, GraduationCap, Building2, FileText, Sparkles, Trophy, Award, Bell, ExternalLink } from 'lucide-react';
import { COLLEGE_INFO, DOCUMENTS_LIST } from '../../data/collegeData';
import { DEPARTMENTS_DATA } from '../../data/departmentsData';
import { DocumentViewerModal } from '../common/DocumentViewerModal';
import { DocumentItem, CustomNavButton, NavigationTab } from '../../types';
import { useAdminData } from '../../context/AdminDataContext';

interface TopBarProps {
  onNavigate?: (tab: string, anchorId?: string, departmentId?: string) => void;
  currentTab?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ onNavigate, currentTab }) => {
  const { customNavButtons, siteTheme } = useAdminData();
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic custom buttons for topbar
  const topbarButtons = customNavButtons.filter(b => b.location === 'topbar' && b.isActive);

  const renderButtonIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-3 h-3 text-amber-500" />;
      case 'GraduationCap': return <GraduationCap className="w-3 h-3 text-sky-500" />;
      case 'Trophy': return <Trophy className="w-3 h-3 text-amber-500" />;
      case 'Award': return <Award className="w-3 h-3 text-emerald-500" />;
      case 'Bell': return <Bell className="w-3 h-3 text-rose-500 animate-pulse" />;
      case 'FileText': return <FileText className="w-3 h-3 text-indigo-500" />;
      case 'Globe': return <Globe className="w-3 h-3 text-blue-500" />;
      default: return null;
    }
  };

  const handleCustomButtonClick = (btn: CustomNavButton) => {
    if (btn.actionType === 'url' && btn.targetUrl) {
      if (btn.openInNewTab) {
        window.open(btn.targetUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = btn.targetUrl;
      }
    } else if (btn.actionType === 'tab' && btn.targetTab) {
      onNavigate?.(btn.targetTab, btn.targetAnchor);
    }
  };

  // Search items list
  const searchResults = searchQuery.trim() === '' ? [] : [
    ...DEPARTMENTS_DATA.filter(d => 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (d.shortName && d.shortName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      d.degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(d => ({
      type: 'Department',
      title: `${d.shortName ? `${d.shortName} - ` : ''}${d.name}`,
      subtitle: `Degree: ${d.degree} · Intake: ${d.intake} seats`,
      action: () => {
        onNavigate?.('department', undefined, d.id);
        setIsSearchOpen(false);
      }
    })),
    ...DOCUMENTS_LIST.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.category && doc.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.fileType.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(doc => ({
      type: 'Official Document',
      title: doc.title,
      subtitle: `${doc.category || doc.fileType} · ${doc.fileSize}`,
      action: () => {
        setSelectedDoc(doc);
        setIsSearchOpen(false);
      }
    })),
    {
      type: 'Quick Page',
      title: 'Admissions 2026-2027 (Code: 4982)',
      subtitle: 'Eligibility, Fees & Online Application',
      action: () => {
        onNavigate?.('admissions', 'online-form');
        setIsSearchOpen(false);
      }
    },
    {
      type: 'Quick Page',
      title: 'Placements & Top Recruiters',
      subtitle: 'Placement statistics, training & corporate partners',
      action: () => {
        onNavigate?.('placement');
        setIsSearchOpen(false);
      }
    },
    {
      type: 'Quick Page',
      title: 'NAAC & Accreditation',
      subtitle: 'SSR, IIQA, Certificates & AQAR Reports',
      action: () => {
        onNavigate?.('naac');
        setIsSearchOpen(false);
      }
    }
  ].slice(0, 8);

  return (
    <>
      {/* Top Bar - Solid Deep Dark Pink / Magenta (#C81E51) */}
      <div className="bg-[#C81E51] text-white text-[12px] sm:text-[13px] border-b border-white/20 select-none shadow-md transition-all">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
          
          {/* Left: Email & Phone Number */}
          <div className="flex items-center gap-4 text-xs sm:text-[13px] font-medium text-white/95">
            <a href="mailto:info@vinschristiancollege.in" className="flex items-center gap-1.5 hover:underline transition-all">
              <Mail className="w-3.5 h-3.5 text-white" />
              <span>info@vinschristiancollege.in</span>
            </a>
            <span className="text-white/40">|</span>
            <a href="tel:+914651255000" className="flex items-center gap-1.5 hover:underline transition-all">
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>+91 4651 255 000</span>
            </a>
          </div>

          {/* Right: Social Icons & Admin Portal Button */}
          <div className="flex items-center gap-3 text-white font-medium text-xs sm:text-[13px]">
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 text-white">
              <a href="#" className="hover:opacity-80 transition-opacity" title="Facebook"><span className="font-bold text-xs">f</span></a>
              <a href="#" className="hover:opacity-80 transition-opacity" title="Instagram"><span className="font-bold text-xs">📷</span></a>
              <a href="#" className="hover:opacity-80 transition-opacity" title="YouTube"><span className="font-bold text-xs">▶</span></a>
            </div>

            <span className="text-white/40">|</span>

            {/* Admin Portal Button */}
            <button 
              onClick={() => onNavigate?.('admin')}
              className="bg-white/20 hover:bg-white/30 text-white px-2.5 sm:px-3 py-1 rounded-md font-bold flex items-center gap-1.5 transition-all whitespace-nowrap text-xs shadow-xs cursor-pointer border border-white/30"
              title="Open Admin Content Portal"
            >
              <Lock className="w-3 h-3 text-white" />
              <span>Admin Portal</span>
            </button>
          </div>

        </div>
      </div>

      {/* QUICK SEARCH MODAL - Mobile Responsive */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-8 sm:pt-20 p-3 sm:p-4 animate-fade-in">
          <div className="bg-[#363539] border border-[#dedcd7]/30 w-full max-w-sm sm:max-w-2xl rounded-2xl shadow-2xl overflow-hidden text-white font-sans">
            <div className="p-3.5 sm:p-4 border-b border-[#dedcd7]/20 flex items-center gap-2 sm:gap-3 bg-[#28272b]">
              <Search className="w-4 sm:w-5 h-4 sm:h-5 text-[#d3d1cc] shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search departments, admissions..."
                className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-white placeholder-[#d3d1cc]/60"
              />
              <button 
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                className="p-1 text-[#d3d1cc] hover:text-white rounded-lg hover:bg-white/10 shrink-0 cursor-pointer"
              >
                <X className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] sm:max-h-[70vh] overflow-y-auto p-3 sm:p-4 space-y-2 bg-[#2d2c30]">
              {searchQuery.trim() === '' ? (
                <div className="text-center py-4 sm:py-6 text-[#d3d1cc] space-y-2">
                  <p className="text-xs sm:text-sm">Quickly search across VINS College portal</p>
                  <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 pt-2">
                    {['CSE', 'Mechanical', 'Admissions', 'Placement', 'AICTE', 'NAAC'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs font-semibold text-white transition-colors cursor-pointer border border-white/10"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-1.5">
                  {searchResults.map((res, i) => (
                    <div
                      key={i}
                      onClick={res.action}
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer flex items-center justify-between group transition-all active:scale-95"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-[#d3d1cc] tracking-wider block">
                          {res.type}
                        </span>
                        <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#eceae6] truncate">
                          {res.title}
                        </h4>
                        <p className="text-xs text-[#d3d1cc]/80 truncate">{res.subtitle}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#d3d1cc] group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8 text-[#d3d1cc]">
                  <p className="text-xs sm:text-sm">No results found for &ldquo;{searchQuery}&rdquo;</p>
                </div>
              )}
            </div>

            <div className="p-2.5 sm:p-3 bg-[#252528] border-t border-[#dedcd7]/20 flex items-center justify-between text-xs text-[#d3d1cc]">
              <span>Press ESC to close</span>
              <span className="hidden sm:inline">Counselling Code: 4982</span>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <DocumentViewerModal document={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </>
  );
};

