import React, { useState } from 'react';
import { 
  Award, FileText, CheckCircle2, ShieldCheck, Download, Users, Sparkles, ExternalLink, Play, Video, Image as ImageIcon
} from 'lucide-react';
import { NAAC_CRITERIA, IQAC_MEMBERS, RTI_MEMBERS, DOCUMENTS_LIST } from '../data/collegeData';
import { DocumentViewerModal } from '../components/common/DocumentViewerModal';
import { DocumentItem } from '../types';
import { AssetBadge } from '../components/common/AssetBadge';

interface NaacPageProps {
  initialView?: 'naac' | 'iqac';
}

export const NaacPage: React.FC<NaacPageProps> = ({ initialView = 'naac' }) => {
  const [activeTab, setActiveTab] = useState<'naac' | 'iqac' | 'rti'>('naac');
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  const nirfDoc = DOCUMENTS_LIST.find((d) => d.id === 'doc-nirf') || DOCUMENTS_LIST[3];

  const institutionalRecords = [
    'DVV Clarifications', 'Extended Profile', 'Best Practices', 'Institutional Distinctiveness',
    'Stakeholders Feedback', 'Capacity Building Programs', 'Institutional Perspective Plan', 'Annual Quality Reports'
  ];

  const naacGallery = [
    { title: 'NAAC Inspection & Peer Team Review', path: 'src/assets/images/naac/gallery1.jpg' },
    { title: 'IQAC Quality Enhancement Workshop', path: 'src/assets/images/naac/gallery2.jpg' },
    { title: 'Academic & Administrative Audit (AAA)', path: 'src/assets/images/naac/gallery3.jpg' },
    { title: 'Outcome Based Education (OBE) Seminar', path: 'src/assets/images/naac/gallery4.jpg' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-[#363539]/90 backdrop-blur-xl text-white p-8 sm:p-12 rounded-3xl border border-[#dedcd7]/25 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-white/20 font-cinzel">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Internal Quality Assurance Cell (IQAC)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-white">NAAC Accreditation & Quality Cell (IQAC)</h1>
        <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
          Developing a conscious, consistent, and catalytic system for academic excellence, statutory audits, and quality culture at VINS Christian College of Engineering.
        </p>

        {/* Action Buttons: Official NAAC SSR Portal Link & Tabs */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="https://www.vinsengineeringcollege.org/naac/index.php"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-valer-green text-xs uppercase tracking-wider px-5 py-2.5 shadow-md flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Official NAAC Portal & SSR (Click Here)
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('naac')}
              className={`px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeTab === 'naac' ? 'bg-[#363538] text-white shadow-md' : 'bg-[#dedcd7] text-[#252528] hover:bg-[#c9c7c2]'
              }`}
            >
              NAAC Criteria &amp; SSR
            </button>

            <button
              onClick={() => setActiveTab('iqac')}
              className={`px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeTab === 'iqac' ? 'bg-[#363538] text-white shadow-md' : 'bg-[#dedcd7] text-[#252528] hover:bg-[#c9c7c2]'
              }`}
            >
              IQAC Composition
            </button>

            <button
              onClick={() => setActiveTab('rti')}
              className={`px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeTab === 'rti' ? 'bg-[#363538] text-white shadow-md' : 'bg-[#dedcd7] text-[#252528] hover:bg-[#c9c7c2]'
              }`}
            >
              RTI Committee
            </button>
          </div>
        </div>
      </div>

      {/* Video Embed Section */}
      <div className="bg-[#363539]/90 backdrop-blur-md text-white rounded-3xl p-6 sm:p-8 border border-amber-400/40/30 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#dedcd7]/20 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#28272b] text-[#d3d1cc] flex items-center justify-center font-bold">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">VINS Campus &amp; Academic Video</h2>
              <p className="text-xs text-white/70">Institutional Overview &amp; Accreditation Video Showcase</p>
            </div>
          </div>

          <a
            href="https://youtu.be/LtP5bsUIWew?si=_WX5lBdkREoxqx1B"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            Watch on YouTube
          </a>
        </div>

        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800 relative">
          <iframe
            src="https://www.youtube-nocookie.com/embed/LtP5bsUIWew"
            title="VINS Engineering College Video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* View 1: NAAC Criteria */}
      {activeTab === 'naac' && (
        <div className="space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NAAC_CRITERIA.map((crit) => (
              <div
                key={crit.id}
                className="gold-card rounded-3xl p-6 border border-amber-400/40 shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ebe9e4] text-[#363538] flex items-center justify-center font-bold text-sm">
                    0{crit.id}
                  </div>

                  <h3 className="font-bold text-slate-900 text-base group-hover:text-[#54524e] transition-colors">
                    {crit.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">{crit.description}</p>

                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <p className="text-[11px] font-bold text-slate-700">Key Quality Indicators:</p>
                    <ul className="text-[11px] text-slate-600 space-y-1">
                      {crit.keyIndicators.map((ind, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <AssetBadge path={`src/assets/images/naac/criterion-${crit.id}.pdf`} />
                  <a
                    href="https://www.vinsengineeringcollege.org/naac/index.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
                  >
                    View SSR
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Institutional Records & SSR Links */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                Institutional Quality Reports & Disclosures
              </h3>
              <a
                href="https://www.vinsengineeringcollege.org/naac/index.php"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                NAAC Portal Link
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {institutionalRecords.map((rec, idx) => (
                <a
                  key={idx}
                  href="https://www.vinsengineeringcollege.org/naac/index.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-800 hover:text-amber-800 border border-slate-200 font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-600" />
                  {rec}
                </a>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* View 2: IQAC Overview & Members */}
      {activeTab === 'iqac' && (
        <div className="space-y-8">
          
          {/* About IQAC Text */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <ShieldCheck className="w-6 h-6 text-amber-600" />
              <div>
                <h2 className="text-xl font-bold text-slate-900">ABOUT IQAC</h2>
                <p className="text-xs text-amber-600 font-semibold">Established 2nd July 2019</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                The IQAC of the college was established on <strong>2nd July 2019</strong> after a year's time of inspection of the college. The prime task of the IQAC is to develop a system for conscious, consistent and catalytic improvement in the overall performance of the Institution. The cell precisely plans the quality initiatives of the institution by ensuring the quality culture, institutionalizing and internalizing quality parameters in adherence to the norms of National Assessment and Accreditation Council of India. The IQAC reviews the academic and administrative quality processes of the institution periodically and takes necessary action for the continual improvement of the services offered by the institution.
              </p>
              <p>
                Since quality enhancement is a continuous process, IQAC meets regularly, conducts academic and administrative audits and ensures timely submission of records to accreditation and ranking bodies.
              </p>
              <p>
                We, at VCCE, never compromise in quality, and thus we have established an Internal Quality Assurance Cell (IQAC) as per the requirements and guidelines of the National Assessment and Accreditation Council (NAAC).
              </p>
            </div>
          </div>

          {/* 10 IQAC Members Table */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4 p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-slate-900" />
                <h3 className="font-bold text-slate-900 text-base">Composition of IQAC Members</h3>
              </div>
              <span className="text-xs text-slate-500">AY 2025-26</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-white font-bold">
                  <tr>
                    <th className="p-3.5 rounded-l-xl w-16 text-center">S.No</th>
                    <th className="p-3.5">Member Name</th>
                    <th className="p-3.5">Designation</th>
                    <th className="p-3.5 rounded-r-xl">Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {IQAC_MEMBERS.map((m) => (
                    <tr key={m.sNo} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 text-center font-bold text-slate-400">{m.sNo}</td>
                      <td className="p-3.5 font-bold text-slate-900">{m.name}</td>
                      <td className="p-3.5 text-slate-700">{m.designation}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold text-[11px]">
                          {m.position}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* View 3: RTI Members */}
      {activeTab === 'rti' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Right to Information (RTI) Members</h2>
              <p className="text-xs text-slate-500">Statutory Disclosure & Grievance Cell</p>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-full">
              Statutory Body
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-slate-950 text-white p-4 rounded-2xl space-y-1">
              <span className="text-[10px] text-amber-400 font-bold uppercase">Chairperson</span>
              <p className="font-bold text-sm">{RTI_MEMBERS.chairperson.name}</p>
              <p className="text-slate-400">{RTI_MEMBERS.chairperson.role}</p>
            </div>

            <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-1">
              <span className="text-[10px] text-amber-400 font-bold uppercase">Management Rep</span>
              <p className="font-bold text-sm">{RTI_MEMBERS.managementRep.name}</p>
              <p className="text-slate-400">{RTI_MEMBERS.managementRep.role}</p>
            </div>

            <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-1">
              <span className="text-[10px] text-amber-400 font-bold uppercase">Co-ordinator</span>
              <p className="font-bold text-sm">{RTI_MEMBERS.coordinator.name}</p>
              <p className="text-slate-400">{RTI_MEMBERS.coordinator.role}</p>
            </div>

            <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-1">
              <span className="text-[10px] text-amber-400 font-bold uppercase">Secretary</span>
              <p className="font-bold text-sm">{RTI_MEMBERS.secretary.name}</p>
              <p className="text-slate-400">{RTI_MEMBERS.secretary.role}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Committee Members:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {RTI_MEMBERS.members.map((mem, idx) => (
                <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                  <p className="font-bold text-slate-900">{mem.name}</p>
                  <p className="text-slate-600">{mem.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reports & IQAC Photo Gallery Section */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">IQAC Quality Audit & Review Gallery</h2>
            <p className="text-xs text-slate-500">Inspection Sessions, Workshops & NAAC Review Seminars</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {naacGallery.map((g, idx) => (
            <div key={idx} className="bg-slate-900 rounded-2xl overflow-hidden aspect-video relative group border border-slate-200 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=600"
                alt={g.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-slate-950/60 p-3 flex flex-col justify-end text-white">
                <p className="text-xs font-bold text-amber-400">{g.title}</p>
                <AssetBadge path={g.path} variant="subtle" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Document Modal */}
      <DocumentViewerModal document={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </div>
  );
};
