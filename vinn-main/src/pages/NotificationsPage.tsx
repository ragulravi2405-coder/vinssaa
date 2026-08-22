import React, { useState } from 'react';
import { NOTIFICATIONS_DATA, CollegeNotification } from '../data/notificationsData';
import { Bell, Search, Filter, Calendar, FileText, Download, ShieldCheck, ChevronRight, CheckCircle2, Megaphone, Sparkles, X } from 'lucide-react';
import { DocumentViewerModal } from '../components/common/DocumentViewerModal';
import { DocumentItem } from '../types';

interface NotificationsPageProps {
  onNavigateAdmission?: (tab: 'admissions') => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ onNavigateAdmission }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [pdfOnly, setPdfOnly] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<DocumentItem | null>(null);
  const [expandedNotice, setExpandedNotice] = useState<CollegeNotification | null>(null);

  const categories = ['All', 'Admissions', 'Exams', 'Placements', 'Events', 'Circulars', 'Scholarships'];

  const filteredNotices = NOTIFICATIONS_DATA.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.issuedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesPdf = !pdfOnly || !!item.pdfAttachment;
    return matchesSearch && matchesCategory && matchesPdf;
  });

  return (
    <div className="min-h-screen bg-transparent text-[#252528] pb-20 font-sans">
      
      {/* Top Header Banner */}
      <div className="bg-[#363539]/90 backdrop-blur-xl text-white py-12 border-b border-[#dedcd7]/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-white/10 text-[#F7DC84] text-xs font-bold px-3 py-1 rounded-full border border-white/20 uppercase tracking-widest font-cinzel">
                <Bell className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                <span>Official Information Hub</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-playfair font-bold text-white">
                College Circulars & Notifications
              </h1>
              <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
                Stay updated with the latest live announcements, Anna University exam schedules, campus placement drives, admission notices, and downloadable official PDF circulars.
              </p>
            </div>

            {onNavigateAdmission && (
              <button
                onClick={() => onNavigateAdmission('admissions')}
                className="btn-valer-green text-xs uppercase tracking-widest px-6 py-3.5 shadow-lg active:scale-95 shrink-0 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Apply Online 2026-27</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Search & Filter Bar */}
        <div className="gold-card rounded-2xl p-4 sm:p-6 border border-amber-400/40 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-[#8e8c87] absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search circulars, exams, placement news..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#f6f5f2] border border-amber-400/40 rounded-xl text-sm text-[#252528] focus:outline-none focus:ring-2 focus:ring-[#9e9c96] font-outfit"
              />
            </div>

            {/* Checkbox for PDF attachments */}
            <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-semibold text-[#54524e] bg-[#f6f5f2] px-4 py-2.5 rounded-xl border border-amber-400/40 hover:bg-[#ebe9e4] transition-colors">
              <input
                type="checkbox"
                checked={pdfOnly}
                onChange={(e) => setPdfOnly(e.target.checked)}
                className="w-4 h-4 text-[#54524e] rounded focus:ring-[#9e9c96]"
              />
              <FileText className="w-4 h-4 text-[#54524e]" />
              Show Only Notices with PDF Attachments
            </label>

          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#363538] text-[#f7f6f4] shadow-sm'
                    : 'bg-[#ebe9e4] text-[#54524e] hover:bg-[#dedcd7]'
                }`}
              >
                {cat === 'All' ? 'All Notices' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Circulars List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-bold text-slate-700">
              Showing <span className="text-amber-700">{filteredNotices.length}</span> active circulars & announcements
            </span>
            <span className="text-xs text-slate-500">Official VINS College Notices</span>
          </div>

          {filteredNotices.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
              <Bell className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No Notifications Found</h3>
              <p className="text-sm text-slate-500">Try adjusting your search criteria or category filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-500/40 transition-all space-y-4 relative overflow-hidden"
                >
                  {/* Priority Strip */}
                  {notice.isUrgent && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-amber-500 to-red-500 animate-pulse" />
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase ${
                        notice.isUrgent ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-amber-100 text-amber-900 border border-amber-200'
                      }`}>
                        {notice.category}
                      </span>

                      {notice.isNew && (
                        <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                          NEW
                        </span>
                      )}

                      <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 ml-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {notice.date}
                      </span>
                    </div>

                    <span className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
                      Issued by: <strong className="text-slate-800">{notice.issuedBy}</strong>
                    </span>

                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-[#0b1b3d] leading-snug hover:text-amber-700 transition-colors">
                      {notice.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-outfit">
                      {notice.summary}
                    </p>
                  </div>

                  {/* Attachment Box & Buttons */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    
                    {notice.pdfAttachment ? (
                      <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-200/80 px-3 py-2 rounded-xl text-xs text-amber-950 font-medium">
                        <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Attached PDF: <strong>{notice.pdfAttachment.title}</strong> ({notice.pdfAttachment.fileSize})</span>
                      </div>
                    ) : (
                      <span className="text-xs text-[#8e8c87] italic">No external document attached</span>
                    )}

                    <div className="flex items-center gap-2 ml-auto">
                      <button
                        onClick={() => setExpandedNotice(notice)}
                        className="px-4 py-2 bg-[#ebe9e4] hover:bg-[#dedcd7] text-[#252528] font-bold rounded-xl text-xs transition-colors cursor-pointer"
                      >
                        Details
                      </button>

                      {notice.pdfAttachment && (
                        <button
                          onClick={() => setSelectedPdf(notice.pdfAttachment!)}
                          className="px-4 py-2 bg-[#363538] hover:bg-[#48474b] text-[#f7f6f4] font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#d3d1cc]" />
                          <span>View Circular</span>
                        </button>
                      )}
                    </div>

                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Notice Details Modal */}
      {expandedNotice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-amber-400/40 space-y-0">
            <div className="bg-[#363538] text-white p-6 flex items-start justify-between">
              <div>
                <span className="bg-[#54524e] text-white text-xs font-extrabold uppercase px-2.5 py-0.5 rounded">
                  {expandedNotice.category}
                </span>
                <h3 className="font-playfair text-xl font-bold mt-2">{expandedNotice.title}</h3>
              </div>
              <button 
                onClick={() => setExpandedNotice(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs text-[#54524e] bg-[#f6f5f2] p-3 rounded-xl border border-amber-400/40">
                <span>Issued Date: {expandedNotice.date}</span>
                <span className="font-bold text-[#252528]">Issued By: {expandedNotice.issuedBy}</span>
              </div>

              <p className="text-sm text-[#252528] leading-relaxed bg-[#f6f5f2] p-4 rounded-xl border border-amber-400/40">
                {expandedNotice.fullDetails}
              </p>

              {expandedNotice.pdfAttachment && (
                <div className="bg-[#ebe9e4] border border-amber-400/40 p-4 rounded-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#363538] text-white rounded-xl">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#252528]">Official Circular Document (PDF)</h4>
                      <p className="text-[11px] text-[#54524e]">Click button to view or download full official signed order.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPdf(expandedNotice.pdfAttachment!);
                    }}
                    className="bg-[#363538] hover:bg-[#48474b] text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Open PDF</span>
                  </button>
                </div>
              )}
            </div>

            <div className="bg-[#f6f5f2] px-6 py-4 border-t border-[#dedcd7] flex justify-end">
              <button
                onClick={() => setExpandedNotice(null)}
                className="bg-[#363538] hover:bg-[#48474b] text-white font-bold px-5 py-2 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Modal Viewer */}
      <DocumentViewerModal document={selectedPdf} onClose={() => setSelectedPdf(null)} />

    </div>
  );
};
