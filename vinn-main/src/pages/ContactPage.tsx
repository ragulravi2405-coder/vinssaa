import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle2, Building2, Sparkles 
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-[#363539]/90 backdrop-blur-md text-white p-8 sm:p-12 rounded-3xl border border-amber-400/40/30 shadow-xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#d3d1cc] text-xs font-semibold border border-white/20 font-cinzel">
          <Sparkles className="w-3.5 h-3.5 text-[#eceae6]" />
          <span>Get In Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-white">Contact VINS Christian College</h1>
        <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
          Reach our admission desk, principal's office, or campus administration located at Chunkankadai, Nagercoil, Kanyakumari District, Tamil Nadu.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 5 Columns: Address & Phone details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="gold-card rounded-3xl p-8 border border-amber-400/40 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-[#252528] border-b border-[#dedcd7]/60 pb-3">
              Campus Address &amp; Contact
            </h2>

            <div className="space-y-4 text-xs text-[#54524e]">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ebe9e4] text-[#363538] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[#252528] text-sm">VINS Campus Address:</p>
                  <p className="text-[#3A2A08] leading-relaxed">{COLLEGE_INFO.fullAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ebe9e4] text-[#363538] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[#252528] text-sm">Phone Numbers:</p>
                  <p className="text-[#54524e]">{COLLEGE_INFO.phone1} / {COLLEGE_INFO.phone2}</p>
                  <p className="text-[#252528] font-semibold mt-0.5">Helpline: {COLLEGE_INFO.helpline}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ebe9e4] text-[#363538] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[#252528] text-sm">Official Emails:</p>
                  <p className="text-[#54524e]">{COLLEGE_INFO.email}</p>
                  <p className="text-[#54524e]">{COLLEGE_INFO.infoEmail}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#dedcd7]">
                <div className="w-10 h-10 rounded-xl bg-[#ebe9e4] text-[#363538] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[#252528] text-sm">Office Working Hours:</p>
                  <p className="text-[#54524e]">Monday - Saturday: 8:30 AM - 4:30 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transportation & Landmark Info */}
          <div className="bg-[#363539]/90 backdrop-blur-md text-white rounded-3xl p-6 border border-amber-400/40/30 space-y-2 text-xs">
            <h3 className="font-bold text-[#d3d1cc] text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Nearest Directions Landmark
            </h3>
            <p className="text-white/80">
              Situated on the Nagercoil - Trivandrum National Highway (NH 66) at Chunkankadai, 6 km from Nagercoil Junction Railway Station.
            </p>
          </div>
        </div>

        {/* Right 7 Columns: Message Form */}
        <div className="lg:col-span-7 gold-card rounded-3xl p-8 border border-amber-400/40 shadow-sm space-y-6">
          <div className="border-b border-[#dedcd7]/60 pb-3">
            <h2 className="text-2xl font-bold text-[#252528]">Send an Enquiry Message</h2>
            <p className="text-xs text-[#6B4C14]">Fill out the contact form below and our campus team will respond within 24 hours.</p>
          </div>

          {formSubmitted ? (
            <div className="bg-[#f6f5f2] border border-amber-400/40 rounded-2xl p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#54524e] mx-auto" />
              <h3 className="font-bold text-[#252528] text-lg">Thank You for Contacting VINS!</h3>
              <p className="text-xs text-[#54524e]">
                Your enquiry regarding <strong className="text-[#252528]">{contactForm.subject}</strong> has been received. We have sent a confirmation email to <strong className="text-[#252528]">{contactForm.email}</strong>.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="px-6 py-2 bg-[#363538] text-white font-bold rounded-xl text-xs hover:bg-[#48474b] cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#54524e] font-semibold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full px-3.5 py-2.5 bg-[#f6f5f2] border border-amber-400/40 rounded-xl text-[#252528] focus:outline-none focus:ring-2 focus:ring-[#9e9c96]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#54524e] font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#f6f5f2] border border-amber-400/40 rounded-xl text-[#252528] focus:outline-none focus:ring-2 focus:ring-[#9e9c96]"
                  />
                </div>

                <div>
                  <label className="block text-[#54524e] font-semibold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="Mobile number"
                    className="w-full px-3.5 py-2.5 bg-[#f6f5f2] border border-amber-400/40 rounded-xl text-[#252528] focus:outline-none focus:ring-2 focus:ring-[#9e9c96]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#54524e] font-semibold mb-1">Enquiry Subject</label>
                <select
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#f6f5f2] border border-amber-400/40 rounded-xl text-[#252528] focus:outline-none focus:ring-2 focus:ring-[#9e9c96]"
                >
                  <option value="General Enquiry">General Campus Enquiry</option>
                  <option value="Admissions B.E.">B.E. Engineering Admissions</option>
                  <option value="Admissions M.E. / MBA">M.E. / MBA Admissions</option>
                  <option value="Placement Drive">Placement &amp; Recruitment Drives</option>
                  <option value="Hostel & Transport">Hostel &amp; Fleet Transport</option>
                </select>
              </div>

              <div>
                <label className="block text-[#54524e] font-semibold mb-1">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Type your query or message here..."
                  className="w-full px-3.5 py-2.5 bg-[#f6f5f2] border border-amber-400/40 rounded-xl text-[#252528] focus:outline-none focus:ring-2 focus:ring-[#9e9c96]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#48474b] hover:bg-[#59575d] text-white font-black rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer border border-amber-400/40/20"
              >
                <Send className="w-4 h-4 text-white" />
                Send Message
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
