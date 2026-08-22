import React, { useState } from 'react';
import { Search, Filter, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DEPARTMENTS_DATA } from '../data/departmentsData';
import { AssetBadge } from '../components/common/AssetBadge';

interface DepartmentListPageProps {
  onSelectDepartment: (id: string) => void;
}

export const DepartmentListPage: React.FC<DepartmentListPageProps> = ({ onSelectDepartment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'UG' | 'PG' | 'Management'>('All');

  const filteredDepts = DEPARTMENTS_DATA.filter((dept) => {
    const matchesCategory = selectedCategory === 'All' || dept.category === selectedCategory;
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          dept.degree.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-[#363539]/90 backdrop-blur-md text-white p-6 sm:p-10 lg:p-12 rounded-3xl border border-amber-400/40/30 shadow-xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <span className="text-xs font-bold text-[#d3d1cc] uppercase tracking-widest font-cinzel">Academic Excellence</span>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-playfair font-bold text-white">Academic Departments &amp; Programs</h1>
        <p className="text-sm sm:text-base text-white/80 max-w-3xl leading-relaxed font-medium">
          Offering Undergraduate B.E. engineering branches, Postgraduate M.E. research specializations, and the Master of Business Administration (MBA).
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="gold-card rounded-2xl p-4 border border-amber-400/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8e8c87] absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search department or degree..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#f6f5f2] border border-amber-400/40 rounded-xl text-sm font-semibold text-[#252528] focus:outline-none focus:ring-2 focus:ring-[#9e9c96]"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <Filter className="w-4 h-4 text-[#6B4C14] shrink-0 hidden sm:inline" />
          {(['All', 'UG', 'PG', 'Management'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#363538] text-white shadow-md border border-amber-400/40/30'
                  : 'bg-[#ebe9e4] text-[#54524e] hover:bg-[#dedcd7] border border-amber-400/40'
              }`}
            >
              {cat === 'All' ? 'All Programs' : cat === 'UG' ? 'UG Engineering (B.E.)' : cat === 'PG' ? 'PG Engineering (M.E.)' : 'MBA Management'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 17 Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepts.map((dept) => (
          <div
            key={dept.id}
            onClick={() => onSelectDepartment(dept.id)}
            className="gold-card rounded-3xl border border-amber-400/40 overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer group flex flex-col justify-between hover:-translate-y-1"
          >
            {/* Course Image Banner */}
            <div className="relative h-48 overflow-hidden bg-[#28272b]">
              {dept.courseImage ? (
                <img
                  src={dept.courseImage}
                  alt={`${dept.name} course`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 img-hover-zoom"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#252528] to-[#434247] flex items-center justify-center">
                  <span className="text-[#eceae6] font-black text-xl">{dept.degree}</span>
                </div>
              )}
              {/* Degree badge overlay */}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-[#252528]/90 text-[#f7f6f4] font-black text-xs shadow-md border border-amber-400/40/20 backdrop-blur-md">
                  {dept.degree} · {dept.category}
                </span>
              </div>
              {/* Intake badge overlay */}
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 rounded-full bg-white/90 text-[#252528] font-black text-xs shadow border border-amber-400/40">
                  {dept.intake} Seats
                </span>
              </div>
            </div>

            <div className="p-5 space-y-3 flex-1">
              <h3 className="text-base font-bold text-[#252528] group-hover:text-[#54524e] transition-colors leading-snug">
                {dept.name}
              </h3>

              <p className="text-xs text-[#54524e] line-clamp-2 leading-relaxed">
                {dept.description}
              </p>

              <div className="pt-2 border-t border-[#dedcd7]/60">
                <p className="text-[11px] font-semibold text-[#6B4C14]">HOD: {dept.hodName}</p>
              </div>
            </div>

            <div className="p-4 bg-[#f6f5f2] border-t border-[#dedcd7]/60 flex items-center justify-between">
              <span className="text-xs text-[#54524e] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6B4C14]" />
                {dept.placementPercentage}% Placed
              </span>
              <span className="text-xs font-bold text-[#252528] group-hover:text-[#54524e] flex items-center gap-1">
                View Dept Page
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
