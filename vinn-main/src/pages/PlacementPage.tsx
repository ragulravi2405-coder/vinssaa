import React from 'react';
import { 
  Briefcase, Award, CheckCircle2, Building2, TrendingUp, Users, Sparkles, Phone, Mail, User, BookOpen, Calendar, Image as ImageIcon
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { PLACEMENT_STATS, PLACEMENT_OFFICER_INFO } from '../data/collegeData';
import { AssetBadge } from '../components/common/AssetBadge';

export const PlacementPage: React.FC = () => {
  const topRecruitersList = [
    'Azentra Global', 'TCS', 'Cognizant', 'Wipro', 'Infosys', 'L&T Construction', 'Nokia', 'Oracle', 
    'Zoho', 'CTS', 'HCL Technologies', 'Accenture', 'Tech Mahindra', 'Hyundai Motors',
    'Brakes India', 'TVS Motors', 'Jain Irrigation', 'Sobha Developers', 'PwC Cyber',
    'Nirmiti Precision', 'PHA India (Korean MNC)', 'Competition Team Tech'
  ];

  const responsibilitiesList = [
    'To invite prospective companies/ organizations to campus for recruitment',
    'To register students for the jobs with prescribed qualifications',
    'To arrange for various facilities required on the date of interview',
    'To collect appointment letters and distribute them to selected students',
    'To provide in-plant training at companies/ organizations',
    'To achieve maximum possible placements for students',
    'To guide students on various interview techniques, group discussions, aptitude tests',
    'Arrange off-campus and campus recruitment process'
  ];

  const otherActivitiesList = [
    'Arrangement of Personality Development Workshops',
    'Training students in aptitude tests, interview techniques, group discussions',
    'Notification regarding various competitive examinations',
    'Organizing industrial visits',
    'Guiding students who desire to pursue Higher Education'
  ];

  const placementFacilitiesList = [
    'Separate cell established with one full time staff incharge for placement',
    'Corporate recruitment data update & industry interface',
    'Guide students to approach companies',
    'Survey on recruiters\' expectations from students',
    'Feedback from employers of past batches',
    'Alumni networking & career guidance',
    'Organizes training sessions on soft skill development'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-[#363539]/90 backdrop-blur-xl text-white p-8 sm:p-12 rounded-3xl border border-[#dedcd7]/25 shadow-2xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Training & Placement Cell</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-white">Placement Activity & Career Guidance</h1>
        <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
          Guided by our strict "One Person One Job" policy, dedicated corporate placement panel, 6-8 week summer internships, and continuous MNC interview preparation.
        </p>
      </div>

      {/* Grid: About Placement Cell & Placement Officer Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 8 Cols: About Department */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">About the Placement Department</h2>
              <p className="text-xs text-slate-500">Guiding Students Towards Successful Careers</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              The Placement cell is one of the important departments in VINS. Knowing that you will be guided after your graduation so that you land a job helps you feel secure. This is the reason why we have a dedicated placement cell that helps, guides, and advises students about the future.
            </p>
            <p>
              In VINS, students come from all walks of lives. They come from different parts of the District including rural areas. Some individuals may not be aware of how things work. Some others may not be confident enough to walk into an interview even though they are skilled. These problems are more common and our skilled placement panel is helping students to get placed in top companies.
            </p>
          </div>

          {/* Functioning Model */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              Functioning Model & 'One Person One Job' Policy
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              For placement a large number of prospective employers are contacted during the year and efforts are made to invite those companies to visit our college and to conduct campus recruitments. The objective of the T&P Cell is to look for a <strong>100% employment of all the students</strong>, therefore it follows the policy of <strong>'One Person One job'</strong>. A candidate selected for one job is further restricted to other recruitment.
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              The Cell is assisted by student placement coordinators who lead a team of placement representatives from various courses of study. The Training & Placement Cell ensures and takes care to provide the best arrangements and hospitality for the visiting companies' officials.
            </p>
          </div>
        </div>

        {/* Right 4 Cols: Placement Officer Contact Card */}
        <div className="lg:col-span-4 bg-[#363539]/90 backdrop-blur-md text-white rounded-3xl p-6 border border-amber-400/40/30 shadow-xl space-y-5">
          <div className="flex items-center gap-3 border-b border-[#dedcd7]/20 pb-3">
            <User className="w-5 h-5 text-[#d3d1cc]" />
            <div>
              <h3 className="font-bold text-sm text-white">Placement Officer Contact</h3>
              <p className="text-[11px] text-[#d3d1cc]">Head of T&P Cell</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-[#28272b]/80 p-4 rounded-2xl border border-amber-400/40/20 space-y-2">
              <p className="font-black text-[#f7f6f4] text-base">{PLACEMENT_OFFICER_INFO.name}</p>
              <p className="text-[#eceae6] font-semibold">{PLACEMENT_OFFICER_INFO.title}</p>
              <p className="text-[#b5b3ad] text-[11px]">{PLACEMENT_OFFICER_INFO.designation}</p>
              <p className="text-[#b5b3ad] text-[11px]">{PLACEMENT_OFFICER_INFO.department}</p>
            </div>

            <div className="space-y-2 pt-2">
              <a 
                href={`tel:${PLACEMENT_OFFICER_INFO.phone.split('/')[0].trim()}`}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#28272b]/80 hover:bg-[#434247] border border-amber-400/40/20 text-[#eceae6] font-bold transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0 text-[#d3d1cc]" />
                <span>{PLACEMENT_OFFICER_INFO.phone}</span>
              </a>

              <a 
                href={`mailto:${PLACEMENT_OFFICER_INFO.email}`}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#28272b]/80 hover:bg-[#434247] border border-amber-400/40/20 text-[#eceae6] transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0 text-[#d3d1cc]" />
                <span>{PLACEMENT_OFFICER_INFO.email}</span>
              </a>
            </div>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[11px] text-amber-300">
            For campus recruitment invitations & corporate partnerships, feel free to contact our T&P Cell.
          </div>
        </div>

      </div>

      {/* Facilities & Summer Training Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Placement Facilities */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <Building2 className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-slate-900 text-base">Placement Facilities & Support</h3>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-700">
            {placementFacilitiesList.map((fac, idx) => (
              <li key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{fac}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Summer Training & PPT */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <BookOpen className="w-5 h-5 text-sky-600" />
            <h3 className="font-bold text-slate-900 text-base">Summer Training & Pre-Placement Talk</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
            <div className="bg-sky-50/60 p-4 rounded-xl border border-sky-100 space-y-1">
              <strong className="text-slate-900 block font-bold">Summer Training (6-8 Weeks):</strong>
              <p>
                Each student undertakes summer training in reputable companies for 6-8 weeks as part of the course curriculum, completing a project report to apply theoretical concepts to real industrial situations.
              </p>
            </div>

            <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-100 space-y-1">
              <strong className="text-slate-900 block font-bold">Pre-Placement Talk (PPT):</strong>
              <p>
                PPT provides an opportunity for recruiting companies and students to interact regarding history, growth potential, future opportunities, job roles, and compensation packages.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Two Column Grid: Objectives & Cell Responsibilities */}
      <div className="bg-[#363539]/90 backdrop-blur-md text-white rounded-3xl p-6 sm:p-8 border border-amber-400/40/30 shadow-xl space-y-6">
        <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white border-b border-[#dedcd7]/20 pb-4">
          Training &amp; Placement Cell Mandate &amp; Student Development
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#d3d1cc] uppercase tracking-wider font-cinzel">Core Objectives</h4>
            <ul className="space-y-2 text-xs text-white/80">
              {otherActivitiesList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-[#28272b]/80 p-3 rounded-xl border border-amber-400/40/15">
                  <span className="w-5 h-5 rounded-full bg-[#54524e] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#d3d1cc] uppercase tracking-wider font-cinzel">Key Responsibilities &amp; Operations</h4>
            <ul className="space-y-2 text-xs text-white/80">
              {responsibilitiesList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-[#28272b]/80 p-3 rounded-xl border border-amber-400/40/15">
                  <span className="text-[#d3d1cc] font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Recharts Placement Record */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">PLACEMENT RECORD</span>
            <h2 className="text-2xl font-bold text-slate-900">Year-wise Placement Statistics & Trends</h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-500 rounded" /> Offers Count</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-sky-500 rounded" /> Highest CTC (LPA)</span>
          </div>
        </div>

        {/* Recharts Bar & Line Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 h-80 bg-[#f6f5f2]/80 p-4 rounded-2xl border border-amber-400/40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PLACEMENT_STATS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dedcd7" />
                <XAxis dataKey="year" stroke="#54524e" fontSize={11} />
                <YAxis stroke="#54524e" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#252528', borderColor: '#54524e', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Legend />
                <Bar dataKey="offersCount" name="Total Offer Letters" fill="#54524e" radius={[6, 6, 0, 0]} />
                <Bar dataKey="placedPercentage" name="Placed Percentage (%)" fill="#8e8c87" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="lg:col-span-4 h-80 bg-[#363539]/90 backdrop-blur-md text-white p-4 rounded-2xl border border-amber-400/40/30 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#eceae6] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#d3d1cc]" />
                Salary Packages Trend
              </h3>
              <p className="text-[11px] text-white/70 mt-1">Highest CTC salary package offered over past academic years.</p>
            </div>

            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={PLACEMENT_STATS}>
                  <XAxis dataKey="year" stroke="#dedcd7" fontSize={10} />
                  <YAxis stroke="#dedcd7" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#252528', color: '#fff', fontSize: '11px', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="highestCTC" name="Highest CTC (LPA)" stroke="#d3d1cc" strokeWidth={3} dot={{ r: 5, fill: '#eceae6' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="p-3 bg-[#28272b]/80 rounded-xl border border-amber-400/40/15 text-[11px] text-[#eceae6]">
              Highest salary package touched <strong className="text-white">12.0 LPA</strong> in campus drives.
            </div>
          </div>

        </div>
      </section>

      {/* Placement Activity Gallery */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Placement Activity Gallery & Campus Drives</h2>
            <p className="text-xs text-slate-500">Recruitment Sessions, Interviews & On-Campus Drives</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[
            'WhatsApp Image 2026-08-13 at 9.07.40 PM (1).jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.40 PM (2).jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.40 PM.jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.41 PM.jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.42 PM (1).jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.42 PM (2).jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.42 PM (3).jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.42 PM.jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.43 PM (1).jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.43 PM (2).jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.43 PM.jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.44 PM (1).jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.44 PM (2).jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.44 PM.jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.45 PM (1).jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.45 PM (2).jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.45 PM.jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.46 PM (1).jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.46 PM (2).jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.46 PM.jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.47 PM (1).jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.47 PM (2).jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.47 PM.jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.48 PM (1).jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.48 PM (2).jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.48 PM.jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.49 PM (1).jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.49 PM (2).jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.49 PM.jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.50 PM (1).jpeg',
            'WhatsApp Image 2026-08-13 at 9.07.50 PM.jpeg',
          ].map((filename, idx) => (
            <div key={idx} className="bg-slate-100 rounded-2xl overflow-hidden aspect-video relative group border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
              <img
                src={`/images/placement imgaes/${filename}`}
                alt={`Placement Drive Photo ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end">
                <p className="text-xs font-bold text-amber-400">Campus Placement Drive</p>
                <p className="text-[10px] text-slate-300">VINS Training & Placement Cell</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Recruiting Companies Grid */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Major Visiting Recruiters</h2>
            <p className="text-xs text-slate-500">Corporate Partners Hiring VINS Engineering Graduates</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {topRecruitersList.map((company, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 text-center font-bold text-slate-800 text-xs shadow-sm hover:shadow transition-all flex items-center justify-center min-h-[60px]"
            >
              {company}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
