import { useEffect, useState, useMemo, useRef } from 'react';
import type { Skill } from '../types/skill';
import { SkillCard } from '../components/SkillCard';
import { loadSkills } from '../services/skillService';

export function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const loaded = await loadSkills();
        setSkills(loaded);
      } catch (error) {
        console.error('Failed to load skills:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const allVendors = useMemo(() => {
    const vendors = new Set<string>();
    skills.forEach((skill) => vendors.add(skill.vendor));
    return Array.from(vendors).sort();
  }, [skills]);

  const filteredSkills = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return skills.filter((skill) => {
      const matchesSearch =
        searchTerm === '' ||
        skill.name.toLowerCase().includes(q) ||
        skill.description.toLowerCase().includes(q) ||
        skill.vendor.toLowerCase().includes(q) ||
        skill.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        skill.categories.some((cat) => cat.toLowerCase().includes(q));

      const matchesVendor = selectedVendor === '' || skill.vendor === selectedVendor;
      return matchesSearch && matchesVendor;
    });
  }, [skills, searchTerm, selectedVendor]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleVendorSelect = (vendor: string) => {
    setSelectedVendor(vendor);
    setIsDropdownOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 via-transparent to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-purple-500/10 via-transparent to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl mb-6 shadow-2xl shadow-emerald-500/25">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent mb-6 leading-tight">
            Skills Catalog
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Curated, vendor-portable skills you can drop into any agent with{' '}
            <code className="text-blue-300">infer skills install</code>.
          </p>
        </div>

        <div className="mb-12 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search skills by name, description, vendor, or tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-2xl shadow-black/20"
              />
            </div>

            <div className="relative min-w-[200px]" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-6 py-4 rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-2xl shadow-black/20 flex items-center justify-between hover:bg-slate-700/50"
              >
                <span className="truncate">{selectedVendor || 'All Vendors'}</span>
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 py-2 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/40 z-50 max-h-64 overflow-y-auto custom-scrollbar">
                  <button
                    onClick={() => handleVendorSelect('')}
                    className={`w-full px-6 py-3 text-left hover:bg-slate-700/50 transition-colors duration-200 flex items-center gap-3 ${
                      selectedVendor === '' ? 'text-blue-400 bg-blue-500/10' : 'text-white'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${selectedVendor === '' ? 'bg-blue-400' : 'bg-transparent border border-slate-600'}`}></div>
                    All Vendors
                  </button>
                  {allVendors.map((vendor) => (
                    <button
                      key={vendor}
                      onClick={() => handleVendorSelect(vendor)}
                      className={`w-full px-6 py-3 text-left hover:bg-slate-700/50 transition-colors duration-200 flex items-center gap-3 ${
                        selectedVendor === vendor ? 'text-blue-400 bg-blue-500/10' : 'text-white'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${selectedVendor === vendor ? 'bg-blue-400' : 'bg-transparent border border-slate-600'}`}></div>
                      {vendor}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-6">
            <span className="text-sm text-slate-400 bg-slate-800/30 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/30">
              {filteredSkills.length} {filteredSkills.length === 1 ? 'skill' : 'skills'} found
            </span>
            {(searchTerm || selectedVendor) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedVendor('');
                }}
                className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors bg-slate-800/30 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/30 hover:border-blue-500/30"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {filteredSkills.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800/50 backdrop-blur-xl rounded-2xl mb-6 border border-slate-700/50">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-300 text-lg">No skills found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredSkills.map((skill) => (
              <SkillCard key={`${skill.vendor}/${skill.name}`} skill={skill} />
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 max-w-3xl mx-auto">
            <p className="text-slate-300">
              The full catalog is also served as JSON at{' '}
              <a
                href="/skills/index.json"
                className="text-blue-400 hover:text-blue-300 transition-colors font-mono text-sm"
              >
                /skills/index.json
              </a>
              . To submit a skill, open a PR against{' '}
              <a
                href="https://github.com/inference-gateway/skills"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                inference-gateway/skills
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
