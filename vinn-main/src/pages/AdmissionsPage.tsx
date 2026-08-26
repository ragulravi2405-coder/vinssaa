import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, BookOpen, Download, Phone, Mail, CheckCircle2, 
  Send, Sparkles, AlertCircle, FileText, Clock, MapPin, Building,
  Award, ShieldCheck, HelpCircle
} from 'lucide-react';
import { COLLEGE_INFO, DOCUMENTS_LIST, UG_COURSES_LIST, PG_COURSES_LIST, ELIGIBILITY_CRITERIA_DATA } from '../data/collegeData';
import { DEPARTMENTS_DATA } from '../data/departmentsData';
import { DocumentViewerModal } from '../components/common/DocumentViewerModal';
import { DocumentItem } from '../types';
import { AssetBadge } from '../components/common/AssetBadge';

interface AdmissionsPageProps {
  initialAnchor?: string;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({ initialAnchor = 'eligibility-ug' }) => {
  const [activeSection, setActiveSection] = useState(initialAnchor);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [formCategory, setFormCategory] = useState<'UG' | 'PG'>('UG');

  // Live Online Form State
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    phone: '',
    email: '',
    academicYear: '2027 - 2028',
    preferredCourse: 'be-cse',
    qualification: 'HSC',
    percentage: '',
    city: 'Nagercoil'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const prospectusDoc = DOCUMENTS_LIST.find(d => d.id === 'doc-prospectus') || DOCUMENTS_LIST[0];
  const applicationDoc = DOCUMENTS_LIST.find(d => d.id === 'doc-application') || DOCUMENTS_LIST[1];
  const scholarshipDoc = DOCUMENTS_LIST.find(d => d.id === 'doc-scholarship') || DOCUMENTS_LIST[2];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner - Dark Pink / Magenta Theme */}
      <div className="bg-[#C81E51] text-white p-8 sm:p-12 rounded-3xl border border-white/20 shadow-xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold font-cinzel">
          <Sparkles className="w-4 h-4 text-white" />
          <span>Academic Year 2026 - 2027 Admissions Open</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-playfair text-white tracking-tight">Engineering &amp; Management Admissions</h1>
        <p className="text-xs sm:text-sm text-white/90 max-w-3xl leading-relaxed font-medium">
          VINS Christian College of Engineering (Counselling Code: <span className="text-white font-bold">4982</span>). Approved by AICTE, New Delhi &amp; Affiliated to Anna University, Chennai.
        </p>
        
        {/* Quick Helpline Strip */}
        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-white">
          <div className="flex items-center gap-2 bg-[#A0163E] px-3.5 py-2 rounded-xl border border-white/20">
            <Phone className="w-4 h-4 text-white" />
            <span>Admission Hotline: <strong className="text-white">+91 9787747072 / +91 9787747071</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-[#A0163E] px-3 py-1.5 rounded-xl border border-white/20">
            <Mail className="w-4 h-4 text-white" />
            <span>Email: <strong className="text-white">vinsengg@gmail.com</strong></span>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sub-Nav Sidebar */}
        <div className="lg:col-span-3 sticky top-24 gold-card rounded-2xl border border-amber-400/40 p-4 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-[#6B4C14] uppercase tracking-wider block px-3 py-1 font-cinzel">
            Admissions Directory
          </span>

          <button
            onClick={() => scrollTo('eligibility-ug')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSection === 'eligibility-ug' ? 'bg-[#363538] text-white shadow-sm' : 'text-[#252528] hover:bg-[#ebe9e4]'
            }`}
          >
            1. Eligibility Criteria - UG
          </button>

          <button
            onClick={() => scrollTo('eligibility-pg')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSection === 'eligibility-pg' ? 'bg-[#363538] text-white shadow-sm' : 'text-[#252528] hover:bg-[#ebe9e4]'
            }`}
          >
            2. Eligibility Criteria - PG
          </button>

          <button
            onClick={() => scrollTo('programs')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSection === 'programs' ? 'bg-[#363538] text-white shadow-sm' : 'text-[#252528] hover:bg-[#ebe9e4]'
            }`}
          >
            3. Sanctioned Intake &amp; Courses
          </button>

          <button
            onClick={() => scrollTo('prospectus')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSection === 'prospectus' ? 'bg-[#363538] text-white shadow-sm' : 'text-[#252528] hover:bg-[#ebe9e4]'
            }`}
          >
            4. College Prospectus (PDF)
          </button>

          <button
            onClick={() => scrollTo('online-form')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeSection === 'online-form' ? 'bg-[#363538] text-white shadow-md border border-amber-400/40/30' : 'text-[#252528] bg-[#ebe9e4] hover:bg-[#dedcd7]'
            }`}
          >
            5. Online Application Form Live ★
          </button>

          <button
            onClick={() => scrollTo('helpline')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSection === 'helpline' ? 'bg-[#363538] text-white shadow-sm' : 'text-[#252528] hover:bg-[#ebe9e4]'
            }`}
          >
            6. Admissions Office Helpline
          </button>

          <button
            onClick={() => scrollTo('scholarships')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSection === 'scholarships' ? 'bg-[#363538] text-white shadow-sm' : 'text-[#252528] hover:bg-[#ebe9e4]'
            }`}
          >
            7. Scholarship Schemes
          </button>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-9 space-y-10">
          
          {/* Section 1: UG Eligibility Criteria */}
          <div id="eligibility-ug" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 scroll-mt-28">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">As per Government Norms</span>
              <h2 className="text-2xl font-bold text-slate-900">UG Courses — ELIGIBILITY Criteria</h2>
              <p className="text-xs text-slate-600 mt-1">Qualified Examinations and Minimum Marks for Admission to B.E. Degree Courses</p>
            </div>

            {/* HSC Criteria Table */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-amber-600" />
                <span>1. HSC (10+2) Eligibility</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A pass in the HSC or its equivalent with a minimum average percentage in <strong>Mathematics, Physics and Chemistry</strong> put together as given below:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3 w-16 text-center">S.No.</th>
                      <th className="p-3">Community</th>
                      <th className="p-3">A pass with minimum average marks in Maths, Physics & Chemistry</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {ELIGIBILITY_CRITERIA_DATA.ugHsc.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                        <td className="p-3 text-center font-bold text-slate-500">{idx + 1}</td>
                        <td className="p-3 font-semibold text-slate-900">{row.community}</td>
                        <td className="p-3 font-black text-amber-700 bg-amber-50/50">{row.minMarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Diploma Criteria Table */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>2. Diploma Candidates (Direct 2nd Year Lateral Entry)</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Candidates who have passed <strong>10+3 Diploma</strong> (any stream) recognized by Central / State Governments can join directly in second year of Engineering.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Community Category</th>
                      <th className="p-3">Required Minimum Aggregate Marks in Diploma Semesters</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {ELIGIBILITY_CRITERIA_DATA.ugDiploma.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                        <td className="p-3 font-semibold text-slate-900">{row.community}</td>
                        <td className="p-3 font-bold text-slate-800">{row.minMarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section 2: PG Eligibility Criteria */}
          <div id="eligibility-pg" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 scroll-mt-28">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">As per Government Norms</span>
              <h2 className="text-2xl font-bold text-slate-900">PG Courses — ELIGIBILITY Criteria</h2>
              <p className="text-xs text-slate-600 mt-1">Eligibility Qualifications for admission to M.B.A. / M.E. degree programmes</p>
            </div>

            {/* MBA Criteria */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3">
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                <span>MBA (Master of Business Administration)</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                A pass in a recognized Bachelor's degree of minimum 3 years duration and obtained at least <strong>50% marks</strong> (<strong>45%</strong> in the case of candidates belonging to reserved category) in the qualifying degree examination:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                {ELIGIBILITY_CRITERIA_DATA.mbaPatterns.map((pat, idx) => (
                  <div key={idx} className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700 text-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{pat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* M.E. Programs Criteria */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900">M.E. Degree Programmes Eligibility</h3>
              <p className="text-xs text-slate-600">
                Pass in a recognized Bachelor's degree or equivalent in the relevant field with at least <strong>50% marks</strong> (<strong>45%</strong> for reserved categories):
              </p>

              <div className="space-y-2">
                {ELIGIBILITY_CRITERIA_DATA.mePrograms.map((me, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <p className="text-xs font-bold text-slate-900">{me.program}</p>
                    <p className="text-xs text-slate-600"><strong>Qualifying Degree:</strong> {me.qualifyingDegree}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Programs Offered (Intake & Est Year) */}
          <div id="programs" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 scroll-mt-28">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Sanctioned Intake & Details</span>
              <h2 className="text-2xl font-bold text-slate-900">Courses Offered</h2>
            </div>

            {/* UG Courses List */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-700">Undergraduate (UG) Courses</h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-white font-bold">
                    <tr>
                      <th className="p-3">S.No</th>
                      <th className="p-3">Degree & Branch</th>
                      <th className="p-3 text-center">Est. Year</th>
                      <th className="p-3 text-center">Sanctioned Intake</th>
                      <th className="p-3 text-center">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800">
                    {UG_COURSES_LIST.map((c, idx) => (
                      <tr key={c.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="p-3 text-center font-bold text-slate-500">{idx + 1}</td>
                        <td className="p-3 font-bold text-slate-900">{c.name}</td>
                        <td className="p-3 text-center font-medium">{c.establishmentYear}</td>
                        <td className="p-3 text-center font-black text-amber-700 bg-amber-50/50">{c.sanctionedIntake}</td>
                        <td className="p-3 text-center font-medium">{c.durationYears}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PG Courses List */}
            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-700">Postgraduate (PG) Courses</h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-white font-bold">
                    <tr>
                      <th className="p-3">S.No</th>
                      <th className="p-3">Degree & Branch</th>
                      <th className="p-3 text-center">Est. Year</th>
                      <th className="p-3 text-center">Sanctioned Intake</th>
                      <th className="p-3 text-center">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800">
                    {PG_COURSES_LIST.map((c, idx) => (
                      <tr key={c.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="p-3 text-center font-bold text-slate-500">{idx + 1}</td>
                        <td className="p-3 font-bold text-slate-900">{c.name}</td>
                        <td className="p-3 text-center font-medium">{c.establishmentYear}</td>
                        <td className="p-3 text-center font-black text-amber-700 bg-amber-50/50">{c.sanctionedIntake}</td>
                        <td className="p-3 text-center font-medium">{c.durationYears}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Section 4: Prospectus Downloads & Documents */}
          <div id="prospectus" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 scroll-mt-28">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Official Downloads</span>
                <h2 className="text-2xl font-bold text-slate-900">College Prospectus & Application Forms</h2>
              </div>
              <AssetBadge path="/documents/prospectus.pdf" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">College Official Prospectus</h3>
                  <p className="text-xs text-slate-600">
                    Detailed official prospectus detailing eligibility, campus infrastructure, hostel, bus routes, placement history, and fee structure.
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDoc(prospectusDoc)}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  View & Download Prospectus (PDF)
                </button>
              </div>

              <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base">Printable Application Form</h3>
                  <p className="text-xs text-slate-300">
                    Printable offline application form for B.E., M.E., and MBA courses for direct submission at the campus admission cell.
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDoc(applicationDoc)}
                  className="w-full py-3 bg-white hover:bg-slate-100 text-slate-950 font-black rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Download Application Form (PDF)
                </button>
              </div>
            </div>
          </div>

          {/* Section 5: Live Online Admission Form (UG / PG) */}
          <div id="online-form" className="bg-[#363539]/90 backdrop-blur-md text-white rounded-3xl p-6 sm:p-8 border border-amber-400/40/30 shadow-2xl space-y-6 scroll-mt-28">
            <div className="flex flex-wrap items-center justify-between border-b border-[#dedcd7]/20 pb-4 gap-4">
              <div>
                <span className="text-xs font-bold text-[#d3d1cc] uppercase tracking-widest">Instant Seat Reservation</span>
                <h2 className="text-2xl font-black text-white">Online Application Form</h2>
              </div>

              {/* Form Switcher Buttons */}
              <div className="flex items-center bg-[#28272b] p-1 rounded-xl border border-amber-400/40/20">
                <button
                  onClick={() => setFormCategory('UG')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    formCategory === 'UG' ? 'bg-[#54524e] text-white shadow-md' : 'text-[#d3d1cc] hover:text-white'
                  }`}
                >
                  B.E. Online Form (2027 - 2028)
                </button>
                <button
                  onClick={() => setFormCategory('PG')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    formCategory === 'PG' ? 'bg-[#54524e] text-white shadow-md' : 'text-[#d3d1cc] hover:text-white'
                  }`}
                >
                  M.E. &amp; MBA Form (2027 - 2028)
                </button>
              </div>
            </div>

            {formSubmitted ? (
              <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white">Application Received Successfully!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-amber-400">{formData.fullName}</strong>. Your online application for academic year <strong className="text-white">{formData.academicYear}</strong> has been logged. Our VINS Admission Officer will reach out to you on <strong className="text-amber-400">{formData.phone}</strong> shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs"
                >
                  Submit Another Registration
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-white/90 font-semibold mb-1">Academic Year *</label>
                  <select
                    value={formData.academicYear}
                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#28272b] border border-amber-400/40/30 rounded-xl text-[#eceae6] font-bold focus:outline-none focus:border-[#d3d1cc]"
                  >
                    <option value="2027 - 2028">Academic Year 2027 - 2028</option>
                    <option value="2024 - 2025">Academic Year 2024 - 2025</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/90 font-semibold mb-1">Full Student Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter full student name"
                    className="w-full px-3.5 py-2.5 bg-[#28272b] border border-amber-400/40/30 rounded-xl text-white focus:outline-none focus:border-[#d3d1cc]"
                  />
                </div>

                <div>
                  <label className="block text-white/90 font-semibold mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#28272b] border border-amber-400/40/30 rounded-xl text-white focus:outline-none focus:border-[#d3d1cc]"
                  />
                </div>

                <div>
                  <label className="block text-white/90 font-semibold mb-1">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10 digit mobile phone number"
                    className="w-full px-3.5 py-2.5 bg-[#28272b] border border-amber-400/40/30 rounded-xl text-white focus:outline-none focus:border-[#d3d1cc]"
                  />
                </div>

                <div>
                  <label className="block text-white/90 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#28272b] border border-amber-400/40/30 rounded-xl text-white focus:outline-none focus:border-[#d3d1cc]"
                  />
                </div>

                <div>
                  <label className="block text-white/90 font-semibold mb-1">
                    {formCategory === 'UG' ? 'Select Preferred B.E. / B.Tech Branch *' : 'Select Preferred M.E. / MBA Branch *'}
                  </label>
                  <select
                    value={formData.preferredCourse}
                    onChange={(e) => setFormData({ ...formData, preferredCourse: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#28272b] border border-amber-400/40/30 rounded-xl text-white focus:outline-none focus:border-[#d3d1cc]"
                  >
                    {formCategory === 'UG' ? (
                      UG_COURSES_LIST.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.name} (Intake: {course.sanctionedIntake})
                        </option>
                      ))
                    ) : (
                      PG_COURSES_LIST.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.name} (Intake: {course.sanctionedIntake})
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-white/90 font-semibold mb-1">Aggregate Marks / Cutoff %</label>
                  <input
                    type="text"
                    value={formData.percentage}
                    onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                    placeholder="e.g. 85.5% or Cutoff 165"
                    className="w-full px-3.5 py-2.5 bg-[#28272b] border border-amber-400/40/30 rounded-xl text-white focus:outline-none focus:border-[#d3d1cc]"
                  />
                </div>

                <div>
                  <label className="block text-white/90 font-semibold mb-1">Town / City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Nagercoil / Kanyakumari"
                    className="w-full px-3.5 py-2.5 bg-[#28272b] border border-amber-400/40/30 rounded-xl text-white focus:outline-none focus:border-[#d3d1cc]"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 sm:py-4 btn-valer-green font-black rounded-xl text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer justify-center"
                  >
                    <Send className="w-4 h-4 text-white" />
                    Submit {formCategory} Online Admission Registration
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Section 6: Admission Helpline & Contact Details */}
          <div id="helpline" className="gold-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-amber-400/40 shadow-sm space-y-6 scroll-mt-28">
            <div className="border-b border-[#dedcd7]/60 pb-4">
              <span className="text-[11px] font-bold text-[#54524e] uppercase tracking-wider">Direct Campus Contact</span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#252528]">Admission Helpline &amp; Office Hours</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-3 text-amber-700">
                  <Phone className="w-5 h-5 shrink-0" />
                  <p className="font-bold text-slate-900 text-sm">Admission Hotline Numbers</p>
                </div>
                <div className="space-y-1 text-slate-700 pl-8">
                  <p><strong>Hotline 1:</strong> +91 9787747072</p>
                  <p><strong>Hotline 2:</strong> +91 9787747071</p>
                  <p><strong>Cell Contact:</strong> 9787747072, 9787455000, 9787747740</p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-3 text-amber-700">
                  <Mail className="w-5 h-5 shrink-0" />
                  <p className="font-bold text-slate-900 text-sm">Email Admissions &amp; Queries</p>
                </div>
                <div className="space-y-1 text-slate-700 pl-8">
                  <p><strong>Email:</strong> vinsengg@gmail.com</p>
                  <p><strong>Info Mail:</strong> info@vins.ac.in</p>
                  <p><strong>Counselling Code:</strong> 4982 (Anna University)</p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-3 text-amber-700">
                  <Building className="w-5 h-5 shrink-0" />
                  <p className="font-bold text-slate-900 text-sm">Campus Address</p>
                </div>
                <p className="text-slate-700 leading-relaxed pl-8">
                  Vins Christian College of Engineering,<br />
                  Vins Nagar, Chunkankadai,<br />
                  Nagercoil - 629 807, Kanyakumari District,<br />
                  Tamil Nadu, India.
                </p>
              </div>

              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-3 text-amber-700">
                  <Clock className="w-5 h-5 shrink-0" />
                  <p className="font-bold text-slate-900 text-sm">Admission Cell Working Hours</p>
                </div>
                <div className="space-y-1 text-slate-700 pl-8">
                  <p><strong>Mon - Fri:</strong> 9.00 am - 5.00 pm</p>
                  <p><strong>Sat:</strong> 9.00 am - 12.00 pm</p>
                  <p><strong>Sun:</strong> Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 7: Scholarship Schemes */}
          <div id="scholarships" className="gold-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-amber-400/40 shadow-sm space-y-4 scroll-mt-28">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#dedcd7]/60 pb-3 gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-[#252528]">Scholarships &amp; Fee Waivers</h2>
              <AssetBadge path="src/assets/images/documents/scholarship-form.docx" />
            </div>

            <p className="text-xs text-[#3A2A08] leading-relaxed">
              VINS Engineering offers merit scholarships up to 100% tuition waiver for school toppers, first-generation graduates, sports achievers at state level, and single-parent wards.
            </p>

            <button
              onClick={() => setSelectedDoc(scholarshipDoc)}
              className="btn-gold text-xs font-bold rounded-xl transition-colors flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Scholarship Application Form (DOCX)
            </button>
          </div>

        </div>
      </div>

      {/* Document Modal */}
      <DocumentViewerModal document={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </div>
  );
};
