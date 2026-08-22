import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, UserCheck, FlaskConical, Award, Briefcase, 
  Calendar, Sparkles, Send, Mail, GraduationCap, Users, Trophy, Target, Compass
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '../data/departmentsData';
import { NavigationTab } from '../types';
import { AssetBadge } from '../components/common/AssetBadge';

interface DepartmentDetailPageProps {
  departmentId: string;
  onBack: () => void;
  onNavigateAdmission: (tab: NavigationTab, anchorId?: string) => void;
}

export const DepartmentDetailPage: React.FC<DepartmentDetailPageProps> = ({
  departmentId,
  onBack,
  onNavigateAdmission
}) => {
  const [selectedLabImg, setSelectedLabImg] = useState<{ name: string; path: string } | null>(null);

  const dept = DEPARTMENTS_DATA.find((d) => d.id === departmentId) || DEPARTMENTS_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Back Navigation */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-[#252528] hover:text-[#54524e] gold-card border border-amber-400/40 px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 text-[#54524e]" />
        Back to All Departments
      </button>

      {/* 1. Wide Banner Header */}
      <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl bg-[#28272b] border border-amber-400/40/30">
        <img
          src={dept.courseImage || dept.bannerPath}
          alt={dept.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#252528] via-[#252528]/70 to-transparent p-6 sm:p-10 flex flex-col justify-end text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider font-cinzel backdrop-blur-md">
                Department of {dept.degree}
              </span>
              <h1 className="text-2xl sm:text-4xl font-playfair font-bold text-white">{dept.name}</h1>
              <p className="text-xs sm:text-sm text-white/80 max-w-2xl">{dept.description}</p>
            </div>
            
            <div className="bg-[#1f1e21]/90 backdrop-blur-md p-4 rounded-2xl border border-amber-400/40/20 text-right shrink-0">
              <p className="text-2xl font-black text-[#f7f6f4] font-playfair">{dept.placementPercentage}%</p>
              <p className="text-[11px] text-[#d3d1cc] font-medium">Verified Placement Record</p>
            </div>
          </div>
          <div className="mt-4">
            <AssetBadge path={dept.courseImage || dept.bannerPath} variant="banner" />
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 8 Columns Content */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Overview & Profile */}
          <div className="gold-card rounded-3xl p-6 sm:p-8 border border-amber-400/40 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-[#dedcd7]/60 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#ebe9e4] text-[#363538] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#252528]">Department Profile</h2>
                <p className="text-xs text-[#6B4C14]">Overview and Campus Infrastructure</p>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-[#3a3936] leading-relaxed">
              {dept.profileText || dept.overviewText}
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2 text-xs text-[#54524e]">
              <div className="bg-[#f6f5f2] p-3 rounded-xl border border-amber-400/40">
                <span className="text-[#6B4C14] block text-[10px]">Sanctioned Intake</span>
                <strong className="text-[#252528] text-sm">{dept.intake} Seats</strong>
              </div>
              <div className="bg-[#f6f5f2] p-3 rounded-xl border border-amber-400/40">
                <span className="text-[#6B4C14] block text-[10px]">Program Duration</span>
                <strong className="text-[#252528] text-sm">{dept.durationYears} Years</strong>
              </div>
              <div className="bg-[#f6f5f2] p-3 rounded-xl border border-amber-400/40">
                <span className="text-[#6B4C14] block text-[10px]">Affiliation</span>
                <strong className="text-[#252528] text-sm">Anna University</strong>
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
          {(dept.vision || dept.mission) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dept.vision && (
                <div className="bg-[#363539]/90 backdrop-blur-md text-white rounded-3xl p-6 border border-amber-400/40/30 space-y-3 shadow-lg">
                  <div className="flex items-center gap-2 text-[#eceae6] border-b border-[#dedcd7]/20 pb-2">
                    <Compass className="w-5 h-5" />
                    <h3 className="font-bold text-sm uppercase tracking-wider">Department Vision</h3>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {dept.vision}
                  </p>
                </div>
              )}

              {dept.mission && (
                <div className="gold-card text-[#252528] rounded-3xl p-6 border border-amber-400/40 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 text-[#363538] border-b border-[#dedcd7]/60 pb-2">
                    <Target className="w-5 h-5" />
                    <h3 className="font-bold text-sm uppercase tracking-wider">Department Mission</h3>
                  </div>
                  <p className="text-xs text-[#3A2A08] leading-relaxed">
                    {dept.mission}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Faculty & Staff Members List */}
          {dept.staffMembers && dept.staffMembers.length > 0 && (
            <div className="gold-card rounded-3xl p-6 sm:p-8 border border-amber-400/40 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#dedcd7]/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#363538] text-white flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#252528]">Faculty &amp; Staff Members</h2>
                    <p className="text-xs text-[#6B4C14]">{dept.staffMembers.length} Experienced Academic Faculty</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-amber-400/40">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#363539] text-white font-bold">
                    <tr>
                      <th className="p-3 w-12 text-center">S.No</th>
                      <th className="p-3">Faculty Name</th>
                      <th className="p-3">Designation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dedcd7] text-[#3a3936]">
                    {dept.staffMembers.map((staff, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white/60' : 'bg-[#f6f5f2]'}>
                        <td className="p-3 text-center font-bold text-[#6B4C14]">{idx + 1}</td>
                        <td className="p-3 font-bold text-[#252528]">{staff.name}</td>
                        <td className="p-3 text-[#54524e]">
                          <span className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-semibold ${
                            staff.designation.includes('Head') || staff.designation.includes('Professor')
                              ? 'bg-[#363538] text-white font-bold'
                              : 'bg-[#ebe9e4] text-[#54524e]'
                          }`}>
                            {staff.designation}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Laboratories List */}
          <div className="gold-card rounded-3xl p-6 sm:p-8 border border-amber-400/40 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-[#dedcd7]/60 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#ebe9e4] text-[#363538] flex items-center justify-center font-bold">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-[#252528]">Laboratories &amp; Practical Labs</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dept.labsList.map((lab, idx) => (
                <div key={idx} className="bg-[#f6f5f2] p-3.5 rounded-xl border border-amber-400/40 flex items-center gap-2.5 text-xs font-semibold text-[#252528]">
                  <CheckCircle2 className="w-4 h-4 text-[#54524e] shrink-0" />
                  <span>{lab}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rank Holders */}
          {dept.rankHolders && dept.rankHolders.length > 0 && (
            <div className="bg-[#363539]/90 backdrop-blur-md text-white rounded-3xl p-6 sm:p-8 border border-amber-400/40/30 shadow-xl space-y-4">
              <div className="flex items-center gap-3 border-b border-[#dedcd7]/20 pb-4">
                <Trophy className="w-6 h-6 text-[#eceae6]" />
                <h2 className="text-xl font-bold text-white">Anna University Rank Holders</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {dept.rankHolders.map((rank, idx) => (
                  <div key={idx} className="bg-[#28272b] p-4 rounded-2xl border border-amber-400/40/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#eceae6] text-sm">{rank.name}</span>
                      <span className="px-2 py-0.5 bg-white/10 text-white rounded-full font-bold text-[10px] border border-white/20">
                        Rank {rank.rank}
                      </span>
                    </div>
                    <p className="text-white/80">{rank.degree}</p>
                    <p className="text-[#d3d1cc] text-[11px]">CGPA Score: <strong className="text-white">{rank.cgpa}</strong></p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4 Photo Gallery Items */}
          <div className="gold-card rounded-3xl p-6 sm:p-8 border border-amber-400/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#dedcd7]/60 pb-4">
              <h2 className="text-xl font-bold text-[#252528]">Lab &amp; Faculty Photo Gallery</h2>
              <span className="text-xs text-[#6B4C14]">4 Visual Gallery Images</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Lab Facility 1', path: dept.labPaths.lab1 },
                { label: 'Lab Facility 2', path: dept.labPaths.lab2 },
                { label: 'Lab Facility 3', path: dept.labPaths.lab3 },
                { label: 'HOD Office Studio', path: dept.labPaths.hod }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedLabImg({ name: item.label, path: item.path })}
                  className="bg-[#28272b] rounded-2xl overflow-hidden aspect-video relative group cursor-pointer border border-amber-400/40 shadow-sm"
                >
                  <img
                    src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800"
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-[#252528]/60 p-3 flex flex-col justify-end text-white opacity-90 group-hover:opacity-100">
                    <p className="text-xs font-bold">{item.label}</p>
                    <AssetBadge path={item.path} variant="subtle" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activities & Symposiums */}
          <div className="gold-card rounded-3xl p-6 sm:p-8 border border-amber-400/40 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-[#dedcd7]/60 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#ebe9e4] text-[#363538] flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-[#252528]">Activities &amp; Symposiums</h2>
            </div>

            <ul className="space-y-3 text-xs text-[#3a3936]">
              {dept.activities.map((act, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-[#f6f5f2] p-3 rounded-xl border border-amber-400/40">
                  <Award className="w-4 h-4 text-[#54524e] shrink-0 mt-0.5" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Right 4 Columns Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* HOD Card */}
          <div className="bg-[#363539]/90 backdrop-blur-md text-white rounded-3xl p-6 border border-amber-400/40/30 shadow-xl space-y-4">
            <div className="flex items-center gap-3 border-b border-[#dedcd7]/20 pb-3">
              <UserCheck className="w-5 h-5 text-[#eceae6]" />
              <h3 className="font-bold text-sm">Head of Department</h3>
            </div>

            <div className="aspect-square rounded-2xl overflow-hidden bg-[#28272b] border border-amber-400/40/20">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
                alt={dept.hodName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-white text-sm">{dept.hodName}</h4>
              <p className="text-[#d3d1cc]">{dept.hodQualification}</p>
              <p className="text-white/80 flex items-center gap-1.5 pt-1">
                <Mail className="w-3.5 h-3.5 text-[#d3d1cc]" />
                {dept.hodEmail}
              </p>
            </div>

            <AssetBadge path={dept.labPaths.hod} variant="banner" />
          </div>

          {/* Key Recruiters */}
          <div className="gold-card rounded-3xl p-6 border border-amber-400/40 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#dedcd7]/60 pb-3">
              <Briefcase className="w-5 h-5 text-[#54524e]" />
              <h3 className="font-bold text-sm text-[#252528]">Key Recruiters</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {dept.topRecruiters.map((company, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-[#ebe9e4] text-[#252528] font-semibold text-xs border border-amber-400/40">
                  {company}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Apply Card */}
          <div className="bg-[#363539] text-white rounded-3xl p-6 shadow-lg space-y-3 border border-amber-400/40/20">
            <h3 className="font-black text-lg">Apply for {dept.name}</h3>
            <p className="text-xs font-medium text-[#d3d1cc]">
              Reserve your seat for academic year 2026 - 2027. Counselling Code: 4982.
            </p>
            <button
              onClick={() => onNavigateAdmission('admissions', 'online-form')}
              className="w-full py-3 bg-[#f6f5f2] hover:bg-[#ebe9e4] text-[#252528] font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4 text-[#252528]" />
              Apply Online Now
            </button>
          </div>

        </div>

      </div>

      {/* Modal for Lab Image Lightbox */}
      {selectedLabImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#28272b] text-white rounded-2xl max-w-xl w-full p-6 space-y-4 border border-amber-400/40/30 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm">{selectedLabImg.name}</h3>
              <button onClick={() => setSelectedLabImg(null)} className="text-[#d3d1cc] hover:text-white cursor-pointer">✕</button>
            </div>
            <div className="aspect-video bg-black rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=1000"
                alt={selectedLabImg.name}
                className="w-full h-full object-cover"
              />
            </div>
            <AssetBadge path={selectedLabImg.path} variant="banner" />
          </div>
        </div>
      )}

    </div>
  );
};
