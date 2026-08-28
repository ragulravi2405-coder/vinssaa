import React, { useState } from 'react';
import { Megaphone, Pause, Play, ChevronRight, Bell, FileText, Download, ExternalLink } from 'lucide-react';
import { CollegeNotification } from '../../data/notificationsData';
import { useAdminData } from '../../context/AdminDataContext';
import { DocumentViewerModal } from './DocumentViewerModal';
import { DocumentItem } from '../../types';

interface RunningTickerBarProps {
  onNavigateNotifications?: () => void;
}

export const RunningTickerBar: React.FC<RunningTickerBarProps> = ({ onNavigateNotifications }) => {
  const { notifications, runningTickerTitle, siteBanner, updateSiteBanner } = useAdminData();
  const [isPaused, setIsPaused] = useState(false);
  const [activeModalNotice, setActiveModalNotice] = useState<CollegeNotification | null>(null);
  const [selectedPdfDoc, setSelectedPdfDoc] = useState<DocumentItem | null>(null);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);

  const handleNoticeClick = (notice: CollegeNotification) => {
    setActiveModalNotice(notice);
  };

  return (
    <>
      {/* Dynamic Top Announcement Banner from Admin Portal */}
      {(siteBanner?.enabled ?? siteBanner?.isActive ?? false) && !isBannerDismissed && (
        <div className={`px-4 py-2 text-xs sm:text-sm font-semibold transition-all border-b shadow-xs flex items-center justify-between ${
          siteBanner.type === 'alert' || siteBanner.type === 'urgent'
            ? 'bg-[#363539] text-white border-[#dedcd7]/30'
            : siteBanner.type === 'announcement' || siteBanner.type === 'admissions'
            ? 'bg-[#48474b] text-white border-[#dedcd7]/30'
            : 'bg-[#28272b] text-white border-[#dedcd7]/30'
        }`}>
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <span className="p-1 rounded bg-white/20 text-white shrink-0">
                <Megaphone className="w-3.5 h-3.5" />
              </span>
              <span className="font-bold shrink-0 uppercase tracking-wide text-[11px] px-2 py-0.5 rounded bg-white/20">
                {siteBanner.badge || siteBanner.type.toUpperCase()}
              </span>
              <p className="truncate text-white font-medium text-xs sm:text-[13px]">
                {siteBanner.headline ? `${siteBanner.headline} - ` : ''}{siteBanner.message}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {(siteBanner.linkUrl || siteBanner.buttonUrl) && (
                <a
                  href={siteBanner.linkUrl || siteBanner.buttonUrl}
                  className="bg-white text-[#252528] px-2.5 py-1 rounded text-xs font-black hover:bg-[#ebe9e4] transition-colors uppercase tracking-wider flex items-center gap-1"
                >
                  <span>{siteBanner.linkText || siteBanner.buttonText || 'Learn More'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <button
                onClick={() => setIsBannerDismissed(true)}
                className="text-white/80 hover:text-white p-1 rounded hover:bg-white/20 transition-colors text-xs cursor-pointer"
                title="Dismiss Banner"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Live Ticker Bar - Light Academic Theme */}
      <div
        className="relative z-30"
        style={{
          background: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          borderBottom: '2px solid #0284c7',
        }}
      >
        <div className="max-w-[1600px] mx-auto px-2 sm:px-4 flex items-center h-10 sm:h-11 overflow-hidden">

          {/* Badge Label - Vivid Blue Academic Tag */}
          <div
            className="flex items-center gap-1.5 font-black text-xs sm:text-[13px] px-3 py-1 shrink-0 tracking-wider z-10 mr-3"
            style={{
              background: '#0284c7',
              color: '#ffffff',
              borderRadius: '4px',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <Megaphone className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline font-bold uppercase">{runningTickerTitle || 'ANNOUNCEMENT'}</span>
            <span className="sm:hidden font-bold">NEWS</span>
          </div>

          {/* Scrolling Marquee Container */}
          <div
            className="flex-1 overflow-hidden relative py-1 cursor-pointer"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className={`flex items-center gap-8 whitespace-nowrap text-xs sm:text-sm font-semibold transition-all ${
                isPaused ? '[animation-play-state:paused]' : ''
              } animate-marquee`}
              style={{
                animation: 'marquee 35s linear infinite',
                animationPlayState: isPaused ? 'paused' : 'running',
                color: '#0f172a',
              }}
            >
              {notifications.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNoticeClick(item)}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded text-left shrink-0 cursor-pointer group transition-colors"
                  style={{ background: 'transparent', border: 'none' }}
                >
                  <span
                    className={`px-1.5 py-0.5 text-[10px] uppercase font-black ${
                      item.isUrgent ? 'animate-pulse' : ''
                    }`}
                    style={{
                      background: '#0284c7',
                      color: '#ffffff',
                      borderRadius: '4px',
                    }}
                  >
                    {item.category}
                  </span>
                  <span
                    className="font-semibold group-hover:underline transition-colors"
                    style={{ color: '#0f172a' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#0284c7')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#0f172a')}
                  >
                    {item.title}
                  </span>
                  {item.pdfAttachment && (
                    <span
                      className="inline-flex items-center gap-0.5 text-[10px] px-1.5 rounded"
                      style={{ background: '#e0f2fe', color: '#0284c7', border: '1px solid #bae6fd' }}
                    >
                      <FileText className="w-3 h-3" />
                      PDF
                    </span>
                  )}
                  <span className="font-bold ml-2" style={{ color: '#94a3b8' }}>•</span>
                </button>
              ))}

              {/* Duplicate array for continuous loop */}
              {notifications.map((item) => (
                <button
                  key={`dup-${item.id}`}
                  onClick={() => handleNoticeClick(item)}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded text-left shrink-0 cursor-pointer group transition-colors"
                  style={{ background: 'transparent', border: 'none' }}
                >
                  <span
                    className={`px-1.5 py-0.5 text-[10px] uppercase font-black ${
                      item.isUrgent ? 'animate-pulse' : ''
                    }`}
                    style={{
                      background: '#0284c7',
                      color: '#ffffff',
                      borderRadius: '4px',
                    }}
                  >
                    {item.category}
                  </span>
                  <span
                    className="font-semibold group-hover:underline transition-colors"
                    style={{ color: '#0f172a' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#0284c7')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#0f172a')}
                  >
                    {item.title}
                  </span>
                  {item.pdfAttachment && (
                    <span
                      className="inline-flex items-center gap-0.5 text-[10px] px-1.5 rounded"
                      style={{ background: '#e0f2fe', color: '#0284c7', border: '1px solid #bae6fd' }}
                    >
                      <FileText className="w-3 h-3" />
                      PDF
                    </span>
                  )}
                  <span className="font-bold ml-2" style={{ color: '#94a3b8' }}>•</span>
                </button>
              ))}
            </div>
          </div>

          {/* Marquee Play/Pause & View All Button */}
          <div
            className="flex items-center gap-2 pl-3 z-10 shrink-0"
            style={{ borderLeft: '1px solid #e2e8f0' }}
          >
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1 rounded transition-colors cursor-pointer"
              style={{ background: '#e0f2fe', color: '#0284c7' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#0284c7';
                (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#e0f2fe';
                (e.currentTarget as HTMLButtonElement).style.color = '#0284c7';
              }}
              title={isPaused ? "Play Marquee" : "Pause Marquee"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            {onNavigateNotifications && (
              <button
                onClick={onNavigateNotifications}
                className="font-bold px-3 py-1 rounded text-xs flex items-center gap-1 transition-all shrink-0 cursor-pointer"
                style={{ background: '#0284c7', color: '#ffffff', borderRadius: '4px' }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#0369a1')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#0284c7')}
              >
                <span>All Circulars</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Modal Popup when a ticker item is clicked */}
      {activeModalNotice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white/95 backdrop-blur-md text-[#252528] rounded-2xl max-w-2xl w-full border border-[#dedcd7] shadow-2xl overflow-hidden animate-in zoom-in-95">
            
            <div className="bg-[#363539] text-white p-5 border-b border-[#dedcd7]/20 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-white/20 text-white text-[11px] font-black uppercase px-2 py-0.5 rounded border border-white/20">
                    {activeModalNotice.category}
                  </span>
                  <span className="text-xs text-[#eceae6] font-medium">{activeModalNotice.date}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-cinzel font-bold text-white leading-snug">
                  {activeModalNotice.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalNotice(null)}
                className="text-[#d3d1cc] hover:text-white bg-white/10 p-1.5 rounded-lg text-lg leading-none transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-[#f6f5f2] border border-[#dedcd7] p-4 rounded-xl text-xs sm:text-sm text-[#3a3936] leading-relaxed font-outfit">
                <p className="font-bold text-[#252528] mb-1">Notice Summary:</p>
                <p>{activeModalNotice.fullDetails}</p>
              </div>

              <div className="flex items-center justify-between text-xs text-[#787671] pt-2 border-t border-[#dedcd7]">
                <span>Issued by: <strong className="text-[#252528]">{activeModalNotice.issuedBy}</strong></span>
                <span>Date: <strong>{activeModalNotice.date}</strong></span>
              </div>

              {activeModalNotice.pdfAttachment && (
                <div className="bg-[#ebe9e4] border border-[#dedcd7] p-4 rounded-xl flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-[#363538] text-white">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-[#252528]">
                        {activeModalNotice.pdfAttachment.title}
                      </p>
                      <p className="text-[11px] text-[#54524e]">
                        {activeModalNotice.pdfAttachment.fileSize} · {activeModalNotice.pdfAttachment.fileType} Circular
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPdfDoc(activeModalNotice.pdfAttachment!);
                    }}
                    className="bg-[#363538] hover:bg-[#48474b] text-white font-bold px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer border border-[#dedcd7]/20"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Open PDF Document
                  </button>
                </div>
              )}
            </div>

            <div className="bg-[#f6f5f2] px-6 py-3 border-t border-[#dedcd7] flex items-center justify-between">
              {onNavigateNotifications && (
                <button
                  onClick={() => {
                    setActiveModalNotice(null);
                    onNavigateNotifications();
                  }}
                  className="text-xs font-bold text-[#54524e] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  View All College Notifications →
                </button>
              )}
              <button
                onClick={() => setActiveModalNotice(null)}
                className="bg-[#363538] hover:bg-[#48474b] text-white font-bold px-4 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* PDF Modal Viewer */}
      <DocumentViewerModal document={selectedPdfDoc} onClose={() => setSelectedPdfDoc(null)} />
    </>
  );
};
