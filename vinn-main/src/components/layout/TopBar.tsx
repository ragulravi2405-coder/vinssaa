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
      {/* Top Bar - Glassy Dark Charcoal / Cement Palette */}
      <div className="text-white text-[12px] sm:text-[13px] border-b border-[#b0aea9]/20 select-none shadow-md bg-gradient-to-r from-[#1c1c1e] via-[#2c2c2e] to-[#1c1c1e] backdrop-blur-md transition-all">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
          
          {/* Left: Search Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 text-[#f2f1ef] hover:text-white transition-all cursor-pointer py-1.5 px-3 rounded-lg bg-[#3a3a3c]/70 hover:bg-[#4e4c49]/80 border border-[#c8c6c2]/30 shadow-sm backdrop-blur-sm"
              title="Search VINS College"
              aria-label="Search VINS College"
            >
              <Search className="w-3.5 h-3.5 text-[#c8c6c2]" />
              <span className="hidden sm:inline text-xs text-[#e0dedb] font-semibold">Search website...</span>
            </button>
          </div>

          {/* Right: Sub-Navigation Utility Links + Dynamic Custom Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 text-[#d4d2ce] font-semibold text-xs sm:text-[13px] overflow-x-auto no-scrollbar">
            
            {/* Dynamic Custom TopBar Buttons added by Admin */}
            {topbarButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => handleCustomButtonClick(btn)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-bold transition-all text-xs whitespace-nowrap cursor-pointer ${
                  btn.buttonStyle === 'solid'
                    ? 'bg-[#3a3a3c] text-white hover:bg-[#4e4c49] border border-[#c8c6c2]/30'
                    : btn.buttonStyle === 'accent'
                    ? 'bg-[#2c2c2e]/90 text-[#e0dedb] border border-[#b0aea9]/40 hover:bg-[#3a3a3c]'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {renderButtonIcon(btn.iconName)}
                <span>{btn.label}</span>
                {btn.badge && (
                  <span className="px-1 py-0.2 bg-[#4e4c49] text-white font-bold text-[9px] rounded uppercase tracking-wider">
                    {btn.badge}
                  </span>
                )}
              </button>
            ))}

            <button 
              onClick={() => onNavigate?.('admissions')} 
              className="hover:text-white transition-colors cursor-pointer whitespace-nowrap px-1.5 py-0.5 rounded hover:bg-white/5"
            >
              FAQ
            </button>

            <button
              onClick={() => onNavigate?.('admin')}
              className="bg-white/10 hover:bg-[#3a3a3c] text-white px-2.5 sm:px-3 py-1 rounded-md font-bold flex items-center gap-1.5 transition-all whitespace-nowrap text-xs shadow-xs cursor-pointer border border-white/20"
              title="Open Admin Content Portal"
            >
              <Lock className="w-3 h-3 text-[#c8c6c2]" />
              <span>Admin Portal</span>
            </button>

            {/* Flag */}
            <div className="flex items-center gap-1 pl-2 border-l border-white/20 text-xs shrink-0" title="VINS Christian College, Nagercoil, India">
              <span className="text-base leading-none" role="img" aria-label="India">🇮🇳</span>
            </div>

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

