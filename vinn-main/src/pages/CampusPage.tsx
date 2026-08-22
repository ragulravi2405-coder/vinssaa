import React, { useState } from 'react';
import { 
  Users, HeartHandshake, Lightbulb, Cpu, Trees, Music, CheckCircle2, Sparkles, Calendar, Award, Eye, X, Camera 
} from 'lucide-react';
import { CAMPUS_CLUBS, COLLEGE_DAY_GALLERY, CollegeDayGalleryItem } from '../data/collegeData';
import { AssetBadge } from '../components/common/AssetBadge';

export const CampusPage: React.FC = () => {
  const [activeClubId, setActiveClubId] = useState(CAMPUS_CLUBS[0].id);
  const [selectedDayCategory, setSelectedDayCategory] = useState<string>('All');
  const [selectedDayPhoto, setSelectedDayPhoto] = useState<CollegeDayGalleryItem | null>(null);

  const clubIconMap: Record<string, React.ReactNode> = {
    nss: <Users className="w-5 h-5 text-amber-500" />,
    yrc: <HeartHandshake className="w-5 h-5 text-amber-500" />,
    edc: <Lightbulb className="w-5 h-5 text-amber-500" />,
    'innovation-centre': <Cpu className="w-5 h-5 text-amber-500" />,
    'nature-club': <Trees className="w-5 h-5 text-amber-500" />,
    'cultural-events': <Music className="w-5 h-5 text-amber-500" />
  };

  const dayCategories = ['All', 'Ceremony', 'Cultural Dance', 'Awards', 'Workshop', 'Campus', 'Seminar', 'Finale'];

  const filteredCollegeDayPhotos = selectedDayCategory === 'All'
    ? COLLEGE_DAY_GALLERY
    : COLLEGE_DAY_GALLERY.filter((item) => item.category === selectedDayCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-[#363539]/90 backdrop-blur-xl text-white p-8 sm:p-12 rounded-3xl border border-[#dedcd7]/25 shadow-2xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Student Life & Annual Cultural Fests</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-white">VINS Campus Life & Events Gallery</h1>
        <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
          Extracurricular student development through NSS, YRC, EDC, Innovation Center, Nature Club, and our Annual College Day Cultural Extravaganza.
        </p>
      </div>

      {/* DEDICATED COLLEGE DAY CELEBRATIONS GALLERY SECTION */}
      <div className="gold-card rounded-3xl p-6 sm:p-10 border border-amber-400/40 shadow-lg space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-400/20 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-[#8A6418] font-extrabold text-xs uppercase tracking-wider font-cinzel">
              <Camera className="w-4 h-4" />
              <span>Special Cultural Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-[#252528]">
              Annual College Day & Cultural Fest Gallery
            </h2>
            <p className="text-xs text-[#3A2A08] max-w-2xl">
              Highlights from our annual stage extravaganza featuring classical dance, rock band music night, award ceremony, theatrical dramas, and ethnic fashion parade.
            </p>
          </div>

          <div className="bg-amber-100/60 border border-amber-400/30 p-3 rounded-2xl flex items-center gap-3 shrink-0">
            <Award className="w-8 h-8 text-[#8A6418] shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#252528]">VINS Annual College Day</p>
              <p className="text-[11px] text-[#6B4C14] font-semibold">1500+ Audience · AC Auditorium Stage</p>
            </div>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {dayCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedDayCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                selectedDayCategory === cat
                  ? 'bg-[#363538] text-white shadow-md border border-amber-400/40'
                  : 'bg-white/80 text-[#252528] hover:bg-white border border-amber-400/30'
              }`}
            >
              {cat === 'All' ? 'All College Day Photos' : cat}
            </button>
          ))}
        </div>

        {/* College Day Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCollegeDayPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedDayPhoto(photo)}
              className="group bg-[#363539]/90 backdrop-blur-md rounded-2xl overflow-hidden border border-amber-400/40/30 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="aspect-[16/11] relative overflow-hidden bg-[#28272b]">
                  <img
                    src={photo.imagePath}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#252528]/90 text-[#f7f6f4] text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-400/40/30 backdrop-blur-md">
                    {photo.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 text-[#252528] text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
                    <Calendar className="w-3 h-3 text-[#54524e]" />
                    {photo.date}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-[#d3d1cc] transition-colors line-clamp-2">
                    {photo.title}
                  </h3>
                  <p className="text-[11px] text-[#eceae6] font-medium">
                    {photo.subtitle}
                  </p>
                  <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
                    {photo.description}
                  </p>
                </div>
              </div>

              <div className="px-4 py-3 bg-[#28272b]/80 border-t border-[#dedcd7]/15 flex items-center justify-between text-xs text-[#d3d1cc] font-extrabold group-hover:bg-[#48474b] group-hover:text-white transition-all">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>View High-Res Photo</span>
                </span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid of All 6 Campus Clubs */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-[#252528]">VINS Student Clubs &amp; Societies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAMPUS_CLUBS.map((club) => (
            <div
              key={club.id}
              onClick={() => setActiveClubId(club.id)}
              className={`bg-white rounded-3xl p-6 border transition-all cursor-pointer space-y-4 flex flex-col justify-between group ${
                activeClubId === club.id
                  ? 'border-amber-400 shadow-lg ring-2 ring-amber-400/20'
                  : 'border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-200 group-hover:scale-110 transition-transform">
                  {clubIconMap[club.id]}
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  {club.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {club.description}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <p className="text-[11px] font-bold text-slate-700">Key Student Activities:</p>
                  <ul className="text-[11px] text-slate-600 space-y-1">
                    {club.activities.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <AssetBadge path={club.bannerPath} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* College Day Photo Modal Lightbox */}
      {selectedDayPhoto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#363539] text-white rounded-3xl max-w-3xl w-full overflow-hidden border border-amber-400/40/30 shadow-2xl space-y-4 relative">
            <button
              onClick={() => setSelectedDayPhoto(null)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full z-10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] bg-black relative">
              <img
                src={selectedDayPhoto.imagePath}
                alt={selectedDayPhoto.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#54524e] text-white text-xs font-black px-3 py-1 rounded-full uppercase">
                {selectedDayPhoto.category}
              </div>
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#d3d1cc] font-bold border-b border-[#dedcd7]/20 pb-2">
                <span>VINS Annual College Day Celebrations</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedDayPhoto.date}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white">{selectedDayPhoto.title}</h3>
              <p className="text-xs font-semibold text-[#eceae6]">{selectedDayPhoto.subtitle}</p>
              <p className="text-xs text-white/70 leading-relaxed">{selectedDayPhoto.description}</p>

              {selectedDayPhoto.chiefGuest && (
                <div className="bg-[#28272b] border border-amber-400/40/20 p-3 rounded-xl text-xs space-y-1 mt-2">
                  <p className="text-[#d3d1cc] font-bold">Dignitary / Chief Guest:</p>
                  <p className="text-slate-200 font-medium">{selectedDayPhoto.chiefGuest}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
