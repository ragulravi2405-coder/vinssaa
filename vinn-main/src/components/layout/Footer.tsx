import React, { useState } from 'react';
import { MapPin, Phone, Mail, GraduationCap, Clock, ExternalLink, ShieldCheck, Send, CheckCircle2 } from 'lucide-react';
import { COLLEGE_INFO } from '../../data/collegeData';
import { NavigationTab } from '../../types';

interface FooterProps {
  onTabChange: (tab: NavigationTab, anchorId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange }) => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && (formState.email || formState.phone)) {
      setSubmitted(true);
      setTimeout(() => {
        setFormState({ name: '', email: '', phone: '', message: '' });
      }, 5000);
    }
  };

  return (
    <footer className="bg-[#C81E51] text-white border-t border-white/20">
      {/* Quick Contact Inquiry Banner Box */}
      <div className="bg-[#C81E51] border-b border-white/20 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#A0163E] p-6 sm:p-8 rounded-3xl border border-white/30 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-5 space-y-2">
                <span className="text-white font-extrabold uppercase text-xs tracking-widest font-cinzel opacity-90 block">Quick Inquiry</span>
                <h3 className="text-xl sm:text-2xl font-bold font-playfair text-white leading-snug">
                  Get in Touch with Admissions Office
                </h3>
                <p className="text-sm text-white/90 font-medium">
                  Enter your details below for degree counseling, fee structure, scholarship assistance, and campus visits.
                </p>
              </div>

              <div className="lg:col-span-7">
                {submitted ? (
                  <div className="bg-white text-slate-900 border border-white p-6 rounded-2xl flex items-center gap-4 shadow-lg">
                    <CheckCircle2 className="w-8 h-8 text-[#C81E51] shrink-0" />
                    <div>
                      <h4 className="font-bold text-base text-slate-900">Inquiry Submitted Successfully!</h4>
                      <p className="text-xs text-slate-700 font-medium">
                        Thank you {formState.name || 'Student'}. Our admissions officer will call or email you shortly.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-white mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Enter full name"
                        className="w-full bg-white text-slate-900 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm placeholder-slate-400 font-semibold focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white mb-1">Mail ID *</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="name@email.com"
                        className="w-full bg-white text-slate-900 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm placeholder-slate-400 font-semibold focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-white mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="10-digit mobile"
                        className="w-full bg-white text-slate-900 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm placeholder-slate-400 font-semibold focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                      />
                    </div>

                    <div className="sm:col-span-3 flex items-center justify-end gap-3 pt-1">
                      <button
                        type="submit"
                        className="bg-white hover:bg-slate-100 text-[#C81E51] font-black text-xs uppercase tracking-widest px-8 py-3 rounded-full cursor-pointer shadow-lg active:scale-95 transition-all w-full sm:w-auto justify-center flex items-center gap-2"
                      >
                        <Send className="w-4 h-4 text-[#C81E51]" />
                        <span>Submit Inquiry</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Upper 4 Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: College Info & Official Footer Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-md border border-[#dedcd7] shrink-0 flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/logo/ving logo.jpg" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/logo/vins logooo.jpg';
                  }}
                  alt="VINS Official Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-base font-bold font-playfair text-white leading-tight">VINS Christian College</h3>
                <p className="text-xs text-[#d3d1cc] font-semibold uppercase tracking-wider">of Engineering, Nagercoil</p>
              </div>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Approved by AICTE, New Delhi &amp; Affiliated to Anna University, Chennai. College Code: <strong className="text-[#e0dedb] font-bold">4982</strong>. Empowering future engineers with technical competence, research leadership, and high human values.
            </p>
          </div>

          {/* Column 2: Useful Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#c8c6c2] uppercase tracking-widest border-b border-[#b0aea9]/20 pb-2 inline-block font-cinzel">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium text-white/70">
              <li>
                <button onClick={() => onTabChange('about')} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#c8c6c2]">›</span> About VINS & Founder Desk
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('admissions')} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#c8c6c2]">›</span> Admissions 2026-27 (Code: 4982)
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('department')} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#c8c6c2]">›</span> Engineering & MBA Departments
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('placement')} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#c8c6c2]">›</span> Training & Placement Cell (90%+)
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('facilities')} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#c8c6c2]">›</span> Library, Hostels & Laboratories
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('campus')} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#c8c6c2]">›</span> Campus Events & Student Life
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('naac')} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#c8c6c2]">›</span> NAAC SSR & IQAC Quality Reports
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#c8c6c2] uppercase tracking-widest border-b border-[#b0aea9]/20 pb-2 inline-block font-cinzel">
              Campus Location & Info
            </h4>
            <div className="space-y-3 text-xs text-white/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c8c6c2] shrink-0 mt-0.5" />
                <span>{COLLEGE_INFO.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#c8c6c2] shrink-0" />
                <span>{COLLEGE_INFO.phone1} / 231155</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c8c6c2] shrink-0" />
                <span>{COLLEGE_INFO.email}</span>
              </div>
              <div className="pt-1 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#c8c6c2]" />
                <span className="text-[11px] text-white/50">Nearest Railway: Nagercoil Jn (6km)</span>
              </div>
            </div>
          </div>

          {/* Column 4: Opening Hours & Statutory */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#c8c6c2] uppercase tracking-widest border-b border-[#b0aea9]/20 pb-2 inline-block font-cinzel">
              Office Hours & Counseling
            </h4>
            <div className="space-y-3 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#c8c6c2] shrink-0" />
                <div>
                  <p className="font-semibold text-white">Monday - Saturday:</p>
                  <p className="text-white/50">8:30 AM - 4:30 PM IST</p>
                </div>
              </div>
              <div className="bg-[#2c2c2e] border border-[#b0aea9]/20 p-3.5 rounded-xl space-y-1">
                <p className="text-white font-semibold text-xs">Affiliation Notice:</p>
                <p className="text-[11px] text-white/70">
                  Anna University Counselling Code: <strong className="text-[#e0dedb]">4982</strong>
                </p>
              </div>
              <button
                onClick={() => onTabChange('contact')}
                className="w-full py-2.5 bg-white/10 hover:bg-[#3a3a3c] text-white font-bold rounded-full text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer border border-white/20"
              >
                <span>Reach Admissions Helpline</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="bg-[#18181a] border-t border-[#dedcd7]/15 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© 2026 VINS Christian College of Engineering, Chunkankadai, Nagercoil. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => onTabChange('committees')} className="hover:text-white cursor-pointer">Anti-Ragging Policy</button>
            <span>•</span>
            <button onClick={() => onTabChange('naac')} className="hover:text-white cursor-pointer">IQAC & NAAC</button>
            <span>•</span>
            <button onClick={() => onTabChange('contact')} className="hover:text-white cursor-pointer">Contact Us</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
