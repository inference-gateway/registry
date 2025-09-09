import { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Agent } from '../types/agent';
import { AgentCard } from '../components/AgentCard';
import { loadAgents } from '../services/agentService';

export function AgentsPage() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const loadedAgents = await loadAgents();
        setAgents(loadedAgents);
      } catch (error) {
        console.error('Failed to load agents:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  const formatCategoryName = (category: string): string => {
    const specialCases: { [key: string]: string } = {
      'n8n': 'n8n',
      'api': 'API',
      'ai': 'AI',
      'ml': 'ML',
      'llm': 'LLM',
      'ui': 'UI',
      'ux': 'UX',
      'css': 'CSS',
      'html': 'HTML',
      'js': 'JS',
      'ts': 'TS',
      'sql': 'SQL',
      'rest': 'REST',
      'graphql': 'GraphQL',
      'oauth': 'OAuth'
    };
    
    const lowerCategory = category.toLowerCase();
    return specialCases[lowerCategory] || category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    agents.forEach(agent => {
      agent.categories.forEach(cat => categories.add(cat));
    });
    return Array.from(categories).sort();
  }, [agents]);

  const filteredAgents = useMemo(() => {
    return agents.filter(agent => {
      const matchesSearch = searchTerm === '' || 
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === '' || 
        agent.categories.includes(selectedCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [agents, searchTerm, selectedCategory]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
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
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 via-transparent to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-purple-500/10 via-transparent to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6 shadow-2xl shadow-blue-500/25">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent mb-6 leading-tight">
            Agent Registry
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Discover and explore cutting-edge agent-to-agent services in this curated ecosystem
          </p>
          
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/how-to/prerequisites/')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold rounded-2xl transition-all duration-300 shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transform"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>📖 HOW-TO Guide</span>
              <span className="text-emerald-200 text-sm bg-emerald-600/30 px-3 py-1 rounded-full">
                New
              </span>
            </button>
          </div>
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
                placeholder="Search agents by name, description, or tags..."
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
                <span className="truncate">
                  {selectedCategory || 'All Categories'}
                </span>
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
                    onClick={() => handleCategorySelect('')}
                    className={`w-full px-6 py-3 text-left hover:bg-slate-700/50 transition-colors duration-200 flex items-center gap-3 ${
                      selectedCategory === '' ? 'text-blue-400 bg-blue-500/10' : 'text-white'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      selectedCategory === '' ? 'bg-blue-400' : 'bg-transparent border border-slate-600'
                    }`}></div>
                    All Categories
                  </button>
                  {allCategories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`w-full px-6 py-3 text-left hover:bg-slate-700/50 transition-colors duration-200 flex items-center gap-3 ${
                        selectedCategory === category ? 'text-blue-400 bg-blue-500/10' : 'text-white'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        selectedCategory === category ? 'bg-blue-400' : 'bg-transparent border border-slate-600'
                      }`}></div>
                      {formatCategoryName(category)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-6">
            <span className="text-sm text-slate-400 bg-slate-800/30 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/30">
              {filteredAgents.length} {filteredAgents.length === 1 ? 'agent' : 'agents'} found
            </span>
            {(searchTerm || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
                className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors bg-slate-800/30 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/30 hover:border-blue-500/30"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {filteredAgents.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800/50 backdrop-blur-xl rounded-2xl mb-6 border border-slate-700/50">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-300 text-lg">No agents found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}