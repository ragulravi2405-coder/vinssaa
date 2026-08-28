import React, { useState } from 'react';
import { Search, Filter, ArrowRight, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { DEPARTMENTS_DATA } from '../data/departmentsData';
import { useAdminData } from '../context/AdminDataContext';

interface DepartmentListPageProps {
  onSelectDepartment: (id: string) => void;
}

export const DepartmentListPage: React.FC<DepartmentListPageProps> = ({ onSelectDepartment }) => {
  const { departments } = useAdminData();
  const allDepts = departments && departments.length > 0 ? departments : DEPARTMENTS_DATA;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'UG' | 'PG' | 'Management'>('All');

  const filteredDepts = allDepts.filter((dept) => {
    const matchesCategory = selectedCategory === 'All' || dept.category === selectedCategory;
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          dept.degree.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FFFFFF] text-[#0A2540] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header Banner - Strict Magenta Pink + White */}
        <div className="bg-[#0A2540] text-white p-8 sm:p-12 rounded-3xl border border-white/20 shadow-2xl space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 tracking-wider font-cinzel">
            <Sparkles className="w-4 h-4 text-white animate-sparkle" />
            <span>ACADEMIC EXCELLENCE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-white tracking-tight">
            Academic Departments &amp; Courses
          </h1>

          <p className="text-xs sm:text-sm text-white/95 max-w-3xl leading-relaxed font-medium">
            Offering Undergraduate B.E. engineering branches, Postgraduate M.E. research specializations, and the Master of Business Administration (MBA) affiliated to Anna University.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-3xl p-5 border-2 border-[#0A2540]/20 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#0A2540] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search department or degree..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-[#0A2540]/25 rounded-2xl text-sm font-bold text-[#0A2540] placeholder-[#0A2540]/50 focus:outline-none focus:border-[#0A2540]"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <Filter className="w-4 h-4 text-[#0A2540] shrink-0 hidden sm:inline" />
            {(['All', 'UG', 'PG', 'Management'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0A2540] text-white shadow-md border-2 border-[#0A2540]'
                    : 'bg-white text-[#0A2540] hover:bg-[#0A2540]/10 border-2 border-[#0A2540]/20'
                }`}
              >
                {cat === 'All' ? 'All Programs' : cat === 'UG' ? 'UG Engineering (B.E.)' : cat === 'PG' ? 'PG Engineering (M.E.)' : 'MBA Management'}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Department Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepts.map((dept) => (
            <div
              key={dept.id}
              onClick={() => onSelectDepartment(dept.id)}
              className="bg-white rounded-3xl border-2 border-[#0A2540]/20 overflow-hidden shadow-md hover:shadow-2xl hover:border-[#0A2540] transition-all cursor-pointer group flex flex-col justify-between hover:-translate-y-1.5"
            >
              {/* Course Image Banner */}
              <div className="relative h-48 overflow-hidden bg-white">
                {dept.courseImage ? (
                  <img
                    src={dept.courseImage}
                    alt={`${dept.name} course`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-[#0A2540] flex items-center justify-center">
                    <span className="text-white font-black text-2xl">{dept.degree}</span>
                  </div>
                )}

                {/* Degree badge overlay */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-[#0A2540] text-white font-black text-xs shadow-md border border-white/30">
                    {dept.degree} · {dept.category}
                  </span>
                </div>

                {/* Intake badge overlay */}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-white text-[#0A2540] font-black text-xs shadow-md border border-[#0A2540]/30">
                    {dept.intake} Seats
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 bg-white">
                <h3 className="text-lg font-bold text-[#0A2540] group-hover:underline transition-colors leading-snug">
                  {dept.name}
                </h3>

                <p className="text-xs text-[#0A2540]/80 line-clamp-2 leading-relaxed font-medium">
                  {dept.description}
                </p>

                <div className="pt-2 border-t border-[#0A2540]/15">
                  <p className="text-xs font-bold text-[#0A2540]">HOD: {dept.hodName}</p>
                </div>
              </div>

              <div className="p-4 bg-white border-t-2 border-[#0A2540]/15 flex items-center justify-between">
                <span className="text-xs text-[#0A2540] font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0A2540]" />
                  {dept.placementPercentage}% Placed
                </span>
                <span className="text-xs font-black text-[#0A2540] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  View Course
                  <ArrowRight className="w-4 h-4 text-[#0A2540]" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
