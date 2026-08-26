import React, { useState, useEffect } from 'react';
import { Target, Compass, Award, UserCheck, Network, Building2, MapPin, CheckCircle2, Sparkles, GraduationCap, Quote, Landmark } from 'lucide-react';
import { 
  COLLEGE_INFO, 
  VISION_MISSION_DATA, 
  COLLEGE_PROFILE_DATA, 
  FOUNDER_CHAIRMAN_DATA, 
  PRINCIPAL_DESK_DATA 
} from '../data/collegeData';
import { AssetBadge } from '../components/common/AssetBadge';

interface AboutPageProps {
  initialAnchor?: string;
}

export const AboutPage: React.FC<AboutPageProps> = ({ initialAnchor = 'vision' }) => {
  const [activeSection, setActiveSection] = useState(initialAnchor);

  useEffect(() => {
    if (initialAnchor) {
      setActiveSection(initialAnchor);
      const element = document.getElementById(initialAnchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [initialAnchor]);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      
      {/* Header Banner - Dark Pink / Magenta Theme */}
      <div className="bg-[#C81E51] text-white p-8 sm:p-12 rounded-3xl border border-white/20 shadow-xl space-y-3 relative overflow-hidden">
        <img
          src="/images/college events and news galeery/h9.jpg"
          alt="VINS College Campus"
          className="absolute inset-0 w-full h-full object-cover opacity-20 filter brightness-90 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#C81E51] via-[#A0163E]/80 to-transparent pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold border border-white/30">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Established 2004 · Chunkankadai, Nagercoil</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-white">About VINS Group of Engineering Colleges</h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-3xl leading-relaxed font-medium">
            Founded by Shri Nanjil M. Vincent in Chunkankadai, Nagercoil, Kanyakumari District. Approved by AICTE, New Delhi & Affiliated to Anna University, Chennai.
          </p>
        </div>
      </div>

      {/* Main Grid: Left Sub-Nav + Right Content Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sub-Nav Sidebar */}
        <div className="lg:col-span-3 sticky top-24 gold-card rounded-2xl border border-amber-400/40 p-4 shadow-sm space-y-1">
          <span className="text-[11px] font-extrabold text-[#6B4C14] uppercase tracking-widest block px-3 py-1 font-cinzel">
            Section Directory
          </span>

          <button
            onClick={() => scrollTo('vision')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSection === 'vision'
                ? 'bg-[#363538] text-white border-l-4 border-[#9e9c96] shadow-sm'
                : 'text-[#252528] hover:bg-[#ebe9e4]'
            }`}
          >
            <Target className="w-4 h-4 shrink-0 text-[#8e8c87]" />
            Vision & Mission
          </button>

          <button
            onClick={() => scrollTo('profile')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSection === 'profile'
                ? 'bg-[#363538] text-white border-l-4 border-[#9e9c96] shadow-sm'
                : 'text-[#252528] hover:bg-[#ebe9e4]'
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0 text-[#8e8c87]" />
            College Profile
          </button>

          <button
            onClick={() => scrollTo('chairman')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSection === 'chairman'
                ? 'bg-[#363538] text-white border-l-4 border-[#9e9c96] shadow-sm'
                : 'text-[#252528] hover:bg-[#ebe9e4]'
            }`}
          >
            <Award className="w-4 h-4 shrink-0 text-[#8e8c87]" />
            Founder Chairman
          </button>

          <button
            onClick={() => scrollTo('principal')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSection === 'principal'
                ? 'bg-[#363538] text-white border-l-4 border-[#9e9c96] shadow-sm'
                : 'text-[#252528] hover:bg-[#ebe9e4]'
            }`}
          >
            <UserCheck className="w-4 h-4 shrink-0 text-[#8e8c87]" />
            Principal's Desk
          </button>

          <button
            onClick={() => scrollTo('organogram')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSection === 'organogram'
                ? 'bg-[#363538] text-white border-l-4 border-[#9e9c96] shadow-sm'
                : 'text-[#252528] hover:bg-[#ebe9e4]'
            }`}
          >
            <Network className="w-4 h-4 shrink-0 text-[#8e8c87]" />
            Administrative Organogram
          </button>
        </div>

        {/* Right Content Sections */}
        <div className="lg:col-span-9 space-y-10">
          
          {/* Section 1: Vision & Mission */}
          <div id="vision" className="gold-card rounded-3xl p-8 border border-amber-400/40 shadow-sm space-y-6 scroll-mt-28">
            <div className="flex items-center gap-3 border-b border-[#dedcd7]/60 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#ebe9e4] text-[#363538] flex items-center justify-center font-bold">
                <Target className="w-5 h-5 text-[#54524e]" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-playfair text-[#252528]">Vision & Mission</h2>
                <p className="text-xs text-[#6B4C14]">Institutional Goals & Long-Term Educational Objectives</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vision Card */}
              <div className="gold-surface rounded-2xl p-6 space-y-3 relative overflow-hidden">
                <div className="flex items-center gap-2 text-[#5C4010] font-black text-sm uppercase tracking-wider font-cinzel">
                  <Compass className="w-4 h-4 text-[#8A6418]" />
                  <span>Our Vision</span>
                </div>
                <p className="text-xs text-[#3A2A08] leading-relaxed italic">
                  &ldquo;{VISION_MISSION_DATA.vision}&rdquo;
                </p>
              </div>

              {/* Mission Card */}
              <div className="gold-card-dark rounded-2xl p-6 space-y-3 border border-amber-600/40 shadow-md">
                <div className="flex items-center gap-2 text-[#FEF6DC] font-black text-sm uppercase tracking-wider font-cinzel">
                  <Target className="w-4 h-4 text-[#F7E5A8]" />
                  <span>Our Mission</span>
                </div>
                <p className="text-xs text-[#FEF6DC]/90 leading-relaxed">
                  {VISION_MISSION_DATA.mission}
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: College Profile */}
          <div id="profile" className="gold-card rounded-3xl p-8 border border-amber-400/40 shadow-sm space-y-6 scroll-mt-28">
            <div className="flex items-center gap-3 border-b border-[#dedcd7]/60 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#ebe9e4] text-[#363538] flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5 text-[#54524e]" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-playfair text-[#252528]">College Profile</h2>
                <p className="text-xs text-[#6B4C14]">History, AICTE Approval, and Campus Infrastructure</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-[#3a3936] leading-relaxed">
              <div className="gold-surface rounded-xl space-y-2 p-5">
                <p className="font-bold text-[#3A2A08] text-sm">
                  {COLLEGE_PROFILE_DATA.welcomeText}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-xs text-[#3a3936] leading-relaxed">{COLLEGE_PROFILE_DATA.historyP1}</p>
                <p className="text-xs text-[#3a3936] leading-relaxed">{COLLEGE_PROFILE_DATA.womensCollegeP}</p>
                <p className="text-xs text-[#3a3936] leading-relaxed font-semibold">📍 {COLLEGE_PROFILE_DATA.connectivity}</p>
              </div>

              {/* Official AICTE / Anna University Affiliation Notice */}
              <div className="gold-card-dark rounded-2xl p-5 border border-amber-600/30 flex items-center gap-4 mt-4">
                <Landmark className="w-8 h-8 text-[#F7E5A8] shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-[#FEF6DC]">Statutory Approval &amp; Affiliation Status</h4>
                  <p className="text-[11px] text-[#FEF6DC]/85">
                    VINS Christian College of Engineering is permanently approved by AICTE, New Delhi and affiliated with Anna University, Chennai. Anna University Counselling TNEA Code: <strong className="text-[#F7DC84]">{COLLEGE_INFO.code}</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Founder Chairman Desk */}
          <div id="chairman" className="gold-card rounded-3xl p-8 border border-amber-400/40 shadow-sm space-y-6 scroll-mt-28">
            <div className="flex items-center gap-4 border-b border-[#dedcd7]/60 pb-4">
              <div>
                <h2 className="text-xl font-bold font-playfair text-[#252528]">Founder Chairman</h2>
                <p className="text-xs text-[#54524e] font-bold">{FOUNDER_CHAIRMAN_DATA.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Chairman Photo */}
              <div className="md:col-span-4 space-y-3">
                <div className="rounded-2xl overflow-hidden border border-amber-400/40 shadow-md bg-[#252528] aspect-[3/4] relative">
                  <img
                    src="/images/chairman and pricipal img/chairman img.jpg"
                    alt={FOUNDER_CHAIRMAN_DATA.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="bg-[#363539] text-white p-5 rounded-2xl border border-amber-400/40/20 text-xs space-y-2">
                  <p className="font-bold text-sm text-[#d3d1cc]">{FOUNDER_CHAIRMAN_DATA.name}</p>
                  <p className="text-white/80 font-medium">{FOUNDER_CHAIRMAN_DATA.designation}</p>
                  <div className="pt-2 border-t border-white/10 text-[11px] text-white/70 space-y-1">
                    <p>📍 {COLLEGE_INFO.location}</p>
                    <p>🎓 Founder: VINS Group of Engineering Colleges</p>
                  </div>
                </div>
              </div>

              {/* Chairman Message */}
              <div className="md:col-span-8 space-y-4">
                <div className="bg-[#f6f5f2] border border-amber-400/40 p-4 rounded-xl text-[#252528] font-medium">
                  <p className="italic text-xs leading-relaxed text-[#3a3936]">&ldquo;{FOUNDER_CHAIRMAN_DATA.aboutIntro}&rdquo;</p>
                </div>

                <div className="space-y-3 text-xs text-[#3a3936] leading-relaxed">
                  <h3 className="font-bold font-playfair text-[#252528] text-sm uppercase tracking-wide flex items-center gap-2 border-b border-[#dedcd7]/50 pb-2">
                    <Quote className="w-4 h-4 text-[#54524e]" />
                    Chairman's Address to Students &amp; Parents
                  </h3>
                  {FOUNDER_CHAIRMAN_DATA.messageParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#dedcd7] flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#252528]">{FOUNDER_CHAIRMAN_DATA.name}</p>
                    <p className="text-[#54524e] font-bold">Founder Chairman, Vins Group of Engineering Colleges</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Principal Desk */}
          <div id="principal" className="gold-card rounded-3xl p-8 border border-amber-400/40 shadow-sm space-y-6 scroll-mt-28">
            <div className="flex items-center gap-4 border-b border-[#dedcd7]/60 pb-4">
              <div>
                <h2 className="text-xl font-bold font-playfair text-[#252528]">Principal's Desk</h2>
                <p className="text-xs text-[#54524e] font-bold">{PRINCIPAL_DESK_DATA.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Principal Photo */}
              <div className="md:col-span-4 space-y-3">
                <div className="rounded-2xl overflow-hidden border border-amber-400/40 shadow-md bg-[#252528] aspect-[3/4] relative">
                  <img
                    src="/images/chairman and pricipal img/principal img.jpg"
                    alt={PRINCIPAL_DESK_DATA.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="bg-[#f6f5f2] p-4 rounded-2xl border border-amber-400/40 text-xs space-y-1 text-center">
                  <p className="font-bold text-[#252528]">{PRINCIPAL_DESK_DATA.name}</p>
                  <p className="text-[#54524e] font-bold">Principal, Vins Christian College of Engineering</p>
                </div>
              </div>

              {/* Principal Message */}
              <div className="md:col-span-8 space-y-4">
                <h3 className="font-bold font-playfair text-[#252528] text-sm uppercase tracking-wide border-b border-[#dedcd7]/50 pb-2">
                  Academic Leadership &amp; Vision Message
                </h3>
                <div className="space-y-3 text-xs text-[#3a3936] leading-relaxed">
                  {PRINCIPAL_DESK_DATA.messageParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#dedcd7] flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#252528]">{PRINCIPAL_DESK_DATA.name}</p>
                    <p className="text-[#54524e] font-bold">Principal, Vins Christian College of Engineering</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Administrative Organogram */}
          <div id="organogram" className="gold-card rounded-3xl p-8 border border-amber-400/40 shadow-sm space-y-6 scroll-mt-28">
            <div className="flex items-center gap-3 border-b border-[#dedcd7]/60 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#ebe9e4] text-[#363538] flex items-center justify-center font-bold">
                <Network className="w-5 h-5 text-[#54524e]" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-playfair text-[#252528]">Administrative Organogram</h2>
                <p className="text-xs text-[#6B4C14]">Institutional Governance Hierarchy &amp; Organizational Structure</p>
              </div>
            </div>

            <div className="gold-surface-mid border border-amber-400/30 rounded-2xl p-6 flex flex-col items-center space-y-4">
              <div className="p-3 gold-card-dark font-bold text-xs rounded-xl shadow text-center w-64 border border-amber-600/30">
                Board of Management / Founder Chairman
              </div>
              <div className="w-0.5 h-6 bg-amber-600/50" />
              <div className="p-3 gold-badge rounded-xl shadow text-center w-64 text-sm">
                Principal &amp; Academic Council
              </div>
              <div className="w-0.5 h-6 bg-amber-600/50" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
                <div className="p-3 gold-card border border-amber-400/40 text-[#3A2A08] font-bold text-xs rounded-xl shadow-xs text-center">
                  Heads of Departments (HODs)
                </div>
                <div className="p-3 gold-card border border-amber-400/40 text-[#3A2A08] font-bold text-xs rounded-xl shadow-xs text-center">
                  Training &amp; Placement Head
                </div>
                <div className="p-3 gold-card border border-amber-400/40 text-[#3A2A08] font-bold text-xs rounded-xl shadow-xs text-center">
                  Administrative Officer &amp; Labs
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
